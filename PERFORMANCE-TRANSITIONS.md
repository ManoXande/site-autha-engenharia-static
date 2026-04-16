# Ultra-Plano: Performance + Transições Cinematográficas
## Site Autha Engenharia — Fase 9

> Criado em: 15/04/2026  
> Contexto: Site single-page 9 seções, scroll-snap, GSAP + Lenis + Framer Motion  
> Meta: Lighthouse ≥ 90 Performance + transições de background imperceptíveis  

---

## Diagnóstico Atual

| Métrica | Status atual | Meta |
|---------|-------------|------|
| LCP (Largest Contentful Paint) | ~3.2s (imagem hero sem AVIF) | < 1.8s |
| CLS (Cumulative Layout Shift) | ~0.05 (fontes FOUT) | < 0.01 |
| TBT (Total Blocking Time) | ~180ms (GSAP + Framer no load) | < 100ms |
| Bundle JS | ~890KB gzip estimado | < 500KB |
| Transições de seção | Corte abrupto (scroll-snap) | Crossfade 400ms imperceptível |
| Imagens | JPG 85%, sem AVIF | WebP + AVIF, < 200KB/seção |

---

## PARTE 1 — PERFORMANCE

### P1. Imagens — Impacto máximo, esforço médio

**Problema:** Cada seção carrega uma JPG de fundo. Sem AVIF = 40% de bytes desnecessários. Sem `sizes` correto = browser baixa imagem maior que necessária.

**Ação:**

```bash
# Converter todas as imagens em public/images/sections/
# Para cada hero-drone-cidade.jpg:
npx sharp-cli -i input.jpg -o output.avif --format avif -q 65
npx sharp-cli -i input.jpg -o output.webp --format webp -q 80

# Gerar variantes mobile (1080w) e desktop (2560w)
npx sharp-cli -i input.jpg -o output-mobile.webp -w 1080
npx sharp-cli -i input.jpg -o output-desktop.webp -w 2560
```

**Em `SectionBackground.tsx`**, adicionar `sizes` correto:
```tsx
sizes="(max-width: 768px) 100vw, 100vw"
// Next.js gera automaticamente srcset com WebP e AVIF
```

**Preload apenas o hero** — já existe `priority={true}` no HeroSection ✅  
**Demais seções:** `loading="lazy"` com `fetchPriority="low"` (padrão do Next.js)

**Ganho estimado:** LCP -1.2s, transferência total -65%

---

### P2. Fontes — FOUT zero

**Problema:** Fonte Atyp sem `font-display: optional` causa FOUT (flash sem estilo) → CLS.

**Ação em `globals.css`:**
```css
@font-face {
  font-family: "Atyp Display";
  font-weight: 700;
  font-display: optional; /* Não bloqueia render. Se não carregou, usa fallback */
  src: url("/fonts/AtypDisplay-Bold.woff2") format("woff2");
}
```

**Apenas para Bold e Regular** (as duas fontes críticas visíveis above-the-fold). As demais podem manter `swap`.

**Size-adjust para eliminar CLS do fallback:**
```css
@font-face {
  font-family: "Atyp Display Fallback";
  src: local("Arial");
  size-adjust: 98%;          /* Calibrar contra a fonte real */
  ascent-override: 95%;
  descent-override: 20%;
  line-gap-override: 0%;
}
```

**Ganho estimado:** CLS → 0.00, elimina reflow visible

---

### P3. Bundle JS — Lazy-load animações

**Problema:** GSAP (~140KB) e Framer Motion (~90KB) carregam no bundle principal mesmo antes do usuário scrollar.

**Ação em `LenisProvider.tsx` e `GSAPScrollProvider.tsx`:**
```tsx
// Ao invés de import estático:
import { gsap } from "gsap";

// Dynamic import depois do LCP:
useEffect(() => {
  const loadGSAP = async () => {
    const { gsap } = await import("gsap");
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);
    // ... inicializar
  };
  
  // Esperar idle ou 2s após mount
  if ("requestIdleCallback" in window) {
    requestIdleCallback(loadGSAP);
  } else {
    setTimeout(loadGSAP, 2000);
  }
}, []);
```

**Framer Motion** — já é usado só para mount/unmount. Manter, mas verificar se `AnimatePresence` do LoadingScreen está no bundle do servidor (deve ser `"use client"`).

**Ganho estimado:** TBT -80ms, FID melhora

---

### P4. CSS — Purge e Critical CSS

**Tailwind 4** já faz purge automático. Verificar se há tokens não-utilizados.

**Critical CSS inline** para above-the-fold (Next.js faz automaticamente com App Router):
- Garantir que `globals.css` não excede 50KB
- Remover variáveis CSS nunca referenciadas

**Ação:** Auditar com DevTools Coverage tab após build de produção.

---

### P5. next.config.js — Otimizações

```js
// next.config.ts
const config = {
  images: {
    formats: ["image/avif", "image/webp"], // AVIF primeiro
    minimumCacheTTL: 31536000,             // 1 ano de cache
    deviceSizes: [375, 768, 1280, 1920],
    imageSizes: [16, 32, 64, 128],
  },
  experimental: {
    optimizeCss: true,   // Lightning CSS no build
    turbo: {             // Turbopack (mais rápido em dev)
      rules: {}
    }
  },
  compress: true,
  poweredByHeader: false,
};
```

---

## PARTE 2 — TRANSIÇÕES CINEMATOGRÁFICAS

### T1. Estratégia: Dual-Layer Crossfade

**Problema central:** CSS `scroll-snap` faz cut abrupto entre seções. O usuário vê:
1. Seção A (background X)
2. Flash escuro (~50ms)  
3. Seção B (background Y)

**Solução:** Sistema de duas camadas de background globais que cruzam fade enquanto o scroll-snap acontece. Inspirado na técnica de Apple.com e agências premium.

```
┌─────────────────────────────────┐
│  Viewport                       │
│  ┌───────────────────────────┐  │
│  │ Layer B (next bg)  z:1   │  │  opacity: 0 → 1
│  │ Layer A (curr bg)  z:0   │  │  opacity: 1 → 0
│  └───────────────────────────┘  │
│  Section content       z:10    │
└─────────────────────────────────┘
```

**Implementação em `src/components/ui/BackgroundCrossfade.tsx`:**

```tsx
"use client";
import { useEffect, useRef, useState, useCallback } from "react";

interface BgLayer {
  src: string;
  position?: string;
}

// Lista ordenada das backgrounds — mesma ordem das seções
const SECTION_BACKGROUNDS: BgLayer[] = [
  { src: "/images/sections/hero-drone-cidade.jpg",    position: "center 40%" },
  { src: "/images/sections/manifesto-authagraph.jpg", position: "center center" },
  { src: "",                                           position: "" }, // #impacto (sem bg)
  { src: "/images/sections/regularizacao-rural.jpg",  position: "center 60%" },
  { src: "/images/sections/mapeamento-lidar.jpg",     position: "center center" },
  { src: "/images/sections/assistencia-tecnica.jpg",  position: "center 40%" },
  { src: "/images/sections/infraestrutura-bim.jpg",   position: "center center" },
  { src: "/images/sections/ambiental-floresta.jpg",   position: "center 60%" },
  { src: "",                                           position: "" }, // #contato (sem bg)
];

const SECTIONS = [
  "hero","manifesto","impacto","regularizacao",
  "mapeamento","assistencia","infraestrutura","ambiental","contato"
];

export function BackgroundCrossfade() {
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const activeLayer = useRef<"A" | "B">("A");
  const currentIndex = useRef<number>(0);

  const crossfadeTo = useCallback((index: number) => {
    if (index === currentIndex.current) return;
    currentIndex.current = index;

    const bg = SECTION_BACKGROUNDS[index];
    const A = layerARef.current;
    const B = layerBRef.current;
    if (!A || !B) return;

    const incoming = activeLayer.current === "A" ? B : A;
    const outgoing = activeLayer.current === "A" ? A : B;

    // Preparar incoming com nova imagem
    incoming.style.backgroundImage = bg.src ? `url(${bg.src})` : "none";
    incoming.style.backgroundPosition = bg.position ?? "center";
    incoming.style.opacity = "0";

    // Crossfade
    requestAnimationFrame(() => {
      incoming.style.transition = "opacity 450ms cubic-bezier(0.4, 0, 0.2, 1)";
      outgoing.style.transition = "opacity 450ms cubic-bezier(0.4, 0, 0.2, 1)";
      incoming.style.opacity = "1";
      outgoing.style.opacity = "0";
    });

    activeLayer.current = activeLayer.current === "A" ? "B" : "A";
  }, []);

  useEffect(() => {
    // Pré-carregar todas as imagens na ordem de scroll
    SECTION_BACKGROUNDS.forEach(({ src }) => {
      if (!src) return;
      const img = new window.Image();
      img.src = src;
    });

    // IntersectionObserver por seção
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            crossfadeTo(index);
          }
        },
        {
          threshold: 0.45,
          rootMargin: "0px",
        }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [crossfadeTo]);

  const sharedStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    zIndex: 0,
    willChange: "opacity",
    pointerEvents: "none",
  };

  return (
    <>
      <div
        ref={layerARef}
        aria-hidden="true"
        style={{
          ...sharedStyle,
          backgroundImage: `url(/images/sections/hero-drone-cidade.jpg)`,
          backgroundPosition: "center 40%",
          opacity: 1,
        }}
      />
      <div
        ref={layerBRef}
        aria-hidden="true"
        style={{
          ...sharedStyle,
          opacity: 0,
        }}
      />
    </>
  );
}
```

**Integração em `page.tsx`:**
```tsx
// Adicionar BackgroundCrossfade antes das seções
// Cada seção muda para background "none" ou overlay only
// O crossfade global assume o papel do background
```

---

### T2. Pré-carregamento Preditivo (Preload on Hover/Scroll)

Para zero latência na troca, pré-carregar a próxima imagem quando o usuário chegar a 60% da seção atual:

```tsx
// Dentro do crossfade system:
const preloadNext = (index: number) => {
  const next = SECTION_BACKGROUNDS[index + 1];
  if (!next?.src) return;
  
  const img = new window.Image();
  img.src = next.src;
  // Browser cacheia automaticamente
};
```

---

### T3. Cada Seção vira "transparente" no Background

Com o sistema dual-layer ativo, cada seção **não precisa mais do `<SectionBackground>` com imagem**. Só mantém o overlay e o grain:

```tsx
// SectionBackground.tsx — modo "crossfade-managed"
// Quando prop crossfadeManaged={true}:
// - Não renderiza <Image>
// - Mantém overlay + grain
// - O background vem da camada global

<SectionBackground
  overlayVariant="heavy"
  crossfadeManaged={true}  // nova prop
/>
```

**Benefício:** Elimina 8 imagens do DOM simultâneo. Apenas 2 camadas ativas a qualquer momento → -60% de uso de memória GPU.

---

### T4. Transição com Grain Texture Unificado

O `grain-overlay` atual está em cada seção (repetido 9x). Mover para uma camada global fixa:

```tsx
// Em layout.tsx, uma vez:
<div
  aria-hidden="true"
  style={{
    position: "fixed",
    inset: 0,
    zIndex: 5,   // Acima dos backgrounds, abaixo do conteúdo
    backgroundImage: "url(/textures/grain.png)",
    opacity: 0.035,
    pointerEvents: "none",
    mixBlendMode: "screen",
  }}
/>
```

Isso também elimina o "flash do grain" durante as transições.

---

### T5. Overlay Dinâmico por Seção

Cada seção tem um overlay com opacidade diferente (hero = gradiente, service = heavy, contato = sólido). Com o sistema global, o overlay deve ser animado também:

```tsx
const SECTION_OVERLAYS = [
  "var(--gradient-hero-overlay)",        // hero
  "rgba(3,7,18,0.82)",                   // manifesto
  "transparent",                          // impacto (bg sólido)
  "var(--gradient-section-overlay)",     // regularizacao
  "var(--gradient-section-overlay)",     // mapeamento
  "rgba(3,7,18,0.80)",                   // assistencia
  "var(--gradient-section-overlay)",     // infraestrutura
  "rgba(3,7,18,0.75)",                   // ambiental
  "transparent",                          // contato (bg sólido)
];

// Camada de overlay separada com transição CSS
overlayRef.current.style.transition = "background 500ms ease";
overlayRef.current.style.background = SECTION_OVERLAYS[index];
```

---

## PARTE 3 — ORDEM DE IMPLEMENTAÇÃO

### Prioridade por Impacto/Esforço

| # | Item | Impacto | Esforço | Sprint |
|---|------|---------|---------|--------|
| 1 | P1: Imagens WebP + AVIF | ★★★★★ | Médio | Sprint 1 |
| 2 | T1: BackgroundCrossfade component | ★★★★★ | Alto | Sprint 1 |
| 3 | T4: Grain global | ★★★★ | Baixo | Sprint 1 |
| 4 | P2: font-display: optional | ★★★★ | Baixo | Sprint 1 |
| 5 | T3: Seções transparentes | ★★★★ | Médio | Sprint 2 |
| 6 | T5: Overlay dinâmico | ★★★ | Médio | Sprint 2 |
| 7 | P3: GSAP lazy-load | ★★★ | Médio | Sprint 2 |
| 8 | T2: Preload preditivo | ★★★ | Baixo | Sprint 2 |
| 9 | P5: next.config otimizações | ★★ | Baixo | Sprint 3 |
| 10 | P4: CSS audit coverage | ★★ | Baixo | Sprint 3 |

---

## PARTE 4 — METAS DE VALIDAÇÃO

Após implementação, validar com:

```bash
# Build de produção
npm run build && npm run start

# Lighthouse CLI
npx lighthouse http://localhost:3000 \
  --only-categories=performance,accessibility,seo \
  --output=html --output-path=lighthouse-report.html

# WebPageTest (real devices)
# https://www.webpagetest.org — testar em Nexus 5 + 3G Fast
```

### Checklist de transições (visual QA):
- [ ] Scroll hero → manifesto: crossfade suave, sem flash escuro
- [ ] Scroll manifesto → impacto: desvanece para background sólido
- [ ] Scroll impacto → regularizacao: imagem aparece gradualmente
- [ ] Scroll entre todas as 5 service sections: crossfade contínuo
- [ ] Scroll ambiental → contato: desvanece para fundo escuro
- [ ] Mobile (375px): sem crossfade (performance), corte instantâneo OK
- [ ] prefers-reduced-motion: crossfade desativado, corte imediato

---

## PARTE 5 — CONSIDERAÇÕES TÉCNICAS

### GPU Compositing
- `will-change: opacity` nas duas camadas → força layer própria na GPU
- Evitar `transform` nos layers de background durante crossfade (cria novo stacking context)
- Testar com DevTools > Layers panel para confirmar que não há layer explosion

### Memória
- Máximo 2 imagens ativas na GPU a qualquer momento
- Imagens pré-carregadas ficam no CPU cache do browser, não na GPU VRAM
- Em dispositivos com < 4GB RAM (mobile), considerar desativar crossfade

### iOS Safari Gotchas
- `position: fixed` em iOS Safari tem comportamento especial com scroll
- Testar em iPhone físico — não apenas DevTools
- Alternativa para iOS: `position: absolute` com altura manual via JS

### Fallback sem JS
- Seções mantêm `<SectionBackground>` como fallback quando CrossfadeProvider não montar
- Ou: envolver em `<Suspense>` com fallback de background sólido

---

_Plano criado: 15/04/2026_  
_Referências: TASKS.md (P & SEO section), DESIGN_REVIEW.md, codebase atual_  
_Próxima ação: Sprint 1 — Converter imagens + criar BackgroundCrossfade component_
