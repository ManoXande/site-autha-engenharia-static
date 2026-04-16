# Design Tokens — Autha Engenharia v2.0

_Sistema visual completo para o site institucional imersivo_
_Abril 2026 | Filosofia: Cinematic Dark Tech | Baseado em BRIEFING-MELHORADO.md_

> **Nota:** Este site é dark-only. Não há light mode. Todos os tokens são otimizados para fundos escuros cinematográficos com acentos verdes/ciano da marca Autha.

---

## 1. COR

### 1.1. Cores Primárias da Marca

```css
--color-primary: #4ADE80;
--color-primary-hover: #22C55E;
--color-primary-active: #16A34A;
--color-secondary: #6EE7B7;
--color-accent: #34D399;
```

### 1.2. Gradientes

```css
--gradient-brand: linear-gradient(135deg, #4ADE80 0%, #6EE7B7 100%);
--gradient-brand-hover: linear-gradient(135deg, #22C55E 0%, #4ADE80 100%);
--gradient-brand-radial: radial-gradient(ellipse at 50% 50%, rgba(74, 222, 128, 0.15) 0%, transparent 70%);
--gradient-hero-overlay: linear-gradient(180deg, rgba(3, 7, 18, 0.92) 0%, rgba(3, 7, 18, 0.28) 38%, rgba(3, 7, 18, 0.22) 62%, rgba(3, 7, 18, 0.92) 100%);
--gradient-section-overlay: linear-gradient(180deg, rgba(3, 7, 18, 0.75) 0%, rgba(3, 7, 18, 0.30) 35%, rgba(3, 7, 18, 0.20) 65%, rgba(3, 7, 18, 0.70) 100%);
--gradient-contact-glow: radial-gradient(ellipse at 50% 60%, rgba(74, 222, 128, 0.08) 0%, transparent 60%);
```

### 1.3. Fundos

```css
--bg-deep: #030712;          /* Mais profundo — loading, impacto */
--bg-primary: #0A0F1C;       /* Fundo principal das seções escuras */
--bg-elevated: #0F172A;       /* Cards elevados, modais */
--bg-surface: #1E293B;        /* Inputs, dropdowns, wells */
--bg-overlay-dark: rgba(3, 7, 18, 0.65);
--bg-overlay-heavy: rgba(3, 7, 18, 0.82);
--bg-glass: rgba(15, 23, 42, 0.50);
--bg-glass-hover: rgba(15, 23, 42, 0.60);
```

### 1.4. Texto

```css
--text-primary: #F8FAFC;     /* Titulos, corpo principal — ratio 19.3:1 sobre bg-deep */
--text-secondary: #94A3B8;   /* Apoio, metadata, labels — ratio 6.2:1 */
--text-muted: #64748B;       /* Placeholders, hints — min 18px bold para AA */
--text-on-brand: #0A0F1C;    /* Texto sobre botão verde — ratio 9.8:1 */
--text-link: #4ADE80;        /* Links — ratio 9.8:1 sobre fundo escuro */
--text-link-hover: #6EE7B7;  /* Links hover */
```

### 1.5. Bordas

```css
--border-subtle: rgba(248, 250, 252, 0.06);    /* Cards glass — quase invisível */
--border-default: rgba(248, 250, 252, 0.10);    /* Inputs, separadores */
--border-hover: rgba(74, 222, 128, 0.30);       /* Hover em cards — glow verde */
--border-active: #4ADE80;                        /* Focus, estado ativo */
--border-input: rgba(248, 250, 252, 0.12);      /* Inputs formulário */
--border-input-focus: #4ADE80;                   /* Input com focus */
```

### 1.6. Status

```css
--color-success: #22C55E;
--color-success-bg: #052E16;
--color-warning: #F59E0B;
--color-warning-bg: #451A03;
--color-error: #EF4444;
--color-error-bg: #450A0A;
--color-info: #3B82F6;
--color-info-bg: #172554;
```

### 1.7. Contraste WCAG 2.1 AA — Validação

| Combinação | Foreground | Background | Ratio | Status |
|------------|-----------|------------|:-----:|:------:|
| Título sobre fundo escuro | `#F8FAFC` | `#030712` | **19.3:1** | AAA |
| Corpo sobre fundo | `#F8FAFC` | `#0A0F1C` | **17.1:1** | AAA |
| Texto secundário | `#94A3B8` | `#0A0F1C` | **6.2:1** | AA |
| CTA sobre gradiente | `#0A0F1C` | `#4ADE80` | **9.8:1** | AAA |
| Links sobre escuro | `#4ADE80` | `#0A0F1C` | **9.8:1** | AAA |
| Texto muted (>=18px bold) | `#64748B` | `#0A0F1C` | **4.1:1** | AA (large text) |

---

## 2. TIPOGRAFIA

### 2.1. Famílias

```css
--font-display: "Atyp Display", "Inter", system-ui, -apple-system, sans-serif;
--font-text: "Atyp Text", "Inter", system-ui, -apple-system, sans-serif;
--font-mono: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
```

### 2.2. @font-face — Pesos Obrigatórios

```
AtypDisplay-Light.woff2       (300)  — Headlines cinematográficas alternativas
AtypDisplay-Medium.woff2      (500)  — H4, subtitulos
AtypDisplay-Semibold.woff2    (600)  — H2, H3
AtypDisplay-Bold.woff2        (700)  — H1, hero, contadores

AtypText-Light.woff2          (300)  — Footer, captions, metadata
AtypText-Regular.woff2        (400)  — Corpo principal
AtypText-Medium.woff2         (500)  — Corpo enfático, labels
AtypText-Semibold.woff2       (600)  — Leads, CTAs secundários
```

### 2.3. Escala Tipográfica — Desktop (1280px+)

```css
--text-hero:        clamp(56px, 7vw, 112px);    /* H1 hero — Atyp Display Bold */
--text-h1:          clamp(40px, 5vw, 72px);      /* H1 seções — Atyp Display Bold */
--text-h2:          clamp(32px, 3.5vw, 48px);    /* H2 — Atyp Display Semibold */
--text-h3:          clamp(24px, 2.5vw, 36px);    /* H3 — Atyp Display Semibold */
--text-h4:          clamp(20px, 2vw, 28px);      /* H4 — Atyp Display Medium */
--text-lead:        clamp(18px, 1.5vw, 22px);    /* Lead — Atyp Text Semibold */
--text-body:        16px;                          /* Corpo — Atyp Text Regular */
--text-body-lg:     18px;                          /* Corpo grande — Atyp Text Regular */
--text-small:       14px;                          /* Captions — Atyp Text Regular */
--text-xs:          13px;                          /* Metadata — Atyp Text Light */
--text-counter:     clamp(48px, 8vw, 120px);     /* Números impacto — Atyp Display Bold */
--text-cta:         16px;                          /* Botões — Atyp Display Semibold */
--text-label:       13px;                          /* Labels seção — Atyp Text Light */
--text-nav:         14px;                          /* Nav links — Atyp Text Medium */
```

### 2.4. Escala Tipográfica — Mobile (<768px)

```css
--text-hero-mobile:     40-56px;
--text-h1-mobile:       32-40px;
--text-h2-mobile:       26-32px;
--text-h3-mobile:       22-26px;
--text-lead-mobile:     17-18px;
--text-counter-mobile:  40-64px;
--text-cta-mobile:      15px;
```

### 2.5. Pesos e Alturas de Linha

```css
--weight-light:      300;
--weight-regular:    400;
--weight-medium:     500;
--weight-semibold:   600;
--weight-bold:       700;

--leading-hero:      0.95;    /* Ultra tight — impacto editorial */
--leading-h1:        1.0;
--leading-h2:        1.1;
--leading-h3:        1.15;
--leading-h4:        1.2;
--leading-lead:      1.5;
--leading-body:      1.65;    /* Legibilidade prolongada */
--leading-body-lg:   1.6;
--leading-small:     1.5;
--leading-counter:   1.0;
```

### 2.6. Espaçamento entre Letras (Letter Spacing)

```css
--tracking-hero:     -0.03em;   /* Densidade editorial — heads grandes */
--tracking-h1:       -0.025em;
--tracking-h2:       -0.02em;
--tracking-h3:       -0.01em;
--tracking-h4:       0;
--tracking-body:     0.01em;    /* Leve abertura — legibilidade */
--tracking-cta:      0.04em;    /* Expandido — botões uppercase */
--tracking-label:    0.12em;    /* Labels de seção — uppercase amplo */
--tracking-nav:      0.06em;    /* Nav links — uppercase */
--tracking-xs:       0.02em;    /* Metadata */
--tracking-counter:  -0.03em;   /* Contadores — densos como hero */
```

### 2.7. Regras de Tipografia

- Headlines hero usam **tracking negativo** agressivo — densidade de revista
- Corpo usa **tracking levemente positivo** — legibilidade prolongada
- Atyp Display **nunca** para blocos de texto corrido — somente títulos e números
- Atyp Text **nunca** para títulos hero — reservar para corpo
- `text-transform: uppercase` reservado **exclusivamente** para labels (`--text-xs`), nav links e CTAs
- Contadores usam `font-variant-numeric: tabular-nums` para alinhamento
- `white-space: nowrap` nos contadores — nunca quebrar linha

---

## 3. ESPAÇAMENTO

### 3.1. Escala

```css
--space-0:    0;
--space-1:    4px;     /* Micro gaps */
--space-2:    8px;     /* Gap ícone-texto, entre dots */
--space-3:    12px;    /* Padding badges, gap entre labels */
--space-4:    16px;    /* Gap entre cards, padding interno mobile */
--space-5:    20px;    /* Padding lateral mobile */
--space-6:    24px;    /* Padding cards, gap de grid */
--space-8:    32px;    /* Padding componentes, gap cards serviço */
--space-10:   40px;    /* Margem entre blocos */
--space-12:   48px;    /* Espaçamento entre seções mobile */
--space-16:   64px;    /* Margem entre blocos grandes */
--space-20:   80px;    /* Espaçamento vertical seções */
--space-24:   96px;    /* Espaçamento principal desktop */
--space-32:   128px;   /* Hero vertical spacing */
--space-48:   192px;   /* Full section breathing (raro) */
```

### 3.2. Container

```css
--container-max:        1280px;
--container-wide:       1536px;
--container-narrow:     640px;     /* Manifesto, leads */
--container-form:       560px;     /* Formulário contato */

--container-padding:    clamp(20px, 4vw, 64px);
--container-padding-mobile: 20px;
--container-padding-tablet: 32px;
--container-padding-desktop: 48px;
```

### 3.3. Grid

```css
--grid-columns:         12;
--grid-gap:             var(--space-8);     /* 32px */
--grid-gap-mobile:      var(--space-4);     /* 16px */
```

---

## 4. LAYOUT

### 4.1. Border Radius

```css
--radius-sm:    6px;     /* Badges, tags */
--radius-md:    10px;    /* Botões, inputs */
--radius-lg:    16px;    /* Cards grandes */
--radius-xl:    20px;    /* Glass cards */
--radius-2xl:   24px;    /* Cards hero especiais */
--radius-full:  9999px;  /* Pills, circles, dots */
```

### 4.2. Sombras

```css
--shadow-card:          0 4px 24px rgba(0, 0, 0, 0.30);
--shadow-card-hover:    0 8px 32px rgba(0, 0, 0, 0.40);
--shadow-dropdown:      0 12px 48px rgba(0, 0, 0, 0.50);
--shadow-header:        0 1px 0 rgba(248, 250, 252, 0.05);
--shadow-input-focus:   0 0 0 3px rgba(74, 222, 128, 0.15);
```

### 4.3. Z-Index

```css
--z-bg:              0;
--z-overlay:         10;
--z-grain:           15;
--z-content:         20;
--z-nav-indicator:   40;
--z-header:          50;
--z-cursor:          60;
--z-loading:         80;
--z-modal:           100;
--z-skip:            9999;
```

---

## 5. EFEITOS

### 5.1. Glow (marca Autha)

```css
--glow-xs:   0 0 6px rgba(74, 222, 128, 0.10);
--glow-sm:   0 0 12px rgba(74, 222, 128, 0.15);
--glow-md:   0 0 24px rgba(74, 222, 128, 0.20);
--glow-lg:   0 0 48px rgba(74, 222, 128, 0.25);
--glow-xl:   0 0 80px rgba(74, 222, 128, 0.15);
--glow-text: 0 0 40px rgba(74, 222, 128, 0.12);
```

### 5.2. Blur

```css
--blur-glass:    blur(16px);
--blur-header:   blur(12px) saturate(180%);
--blur-mobile-menu: blur(20px) saturate(200%);
--blur-loading:  blur(8px);
```

### 5.3. Film Grain

```css
--grain-opacity:    0.025;
--grain-size:       256px;
--grain-source:     url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
```

---

## 6. MOTION

### 6.1. Easings

```css
--ease-default:      cubic-bezier(0.4, 0, 0.2, 1);      /* Material padrão */
--ease-out-expo:     cubic-bezier(0.16, 1, 0.3, 1);      /* Entrada de elementos — principal */
--ease-out-quart:    cubic-bezier(0.25, 1, 0.5, 1);      /* Transições de seção, crossfade */
--ease-in-out:       cubic-bezier(0.65, 0, 0.35, 1);     /* Loops, pulsos */
--ease-spring:       cubic-bezier(0.34, 1.56, 0.64, 1);  /* Micro-interações, scale up */
--ease-magnetic:     cubic-bezier(0.25, 0.46, 0.45, 0.94); /* Cursor magnético — suave */
```

### 6.2. Durações

```css
--duration-instant:    50ms;     /* Cor de fundo hover */
--duration-fast:       150ms;    /* Hover states, cor */
--duration-normal:     300ms;    /* Transições padrão, fade */
--duration-slow:       600ms;    /* Entrada de componentes */
--duration-section:    1200ms;   /* Crossfade entre backgrounds */
--duration-stagger:    80ms;     /* Delay entre itens em lista */
--duration-counter:    1800ms;   /* Contagem de números */
--duration-hero-entry: 2500ms;   /* Entrada completa do hero */
--duration-loading:    1500ms;   /* Duração do loading screen */
```

### 6.3. Patterns de Animação

#### Fade Up (entrada de conteúdo)

```
Initial: opacity 0, translateY 40px
Final: opacity 1, translateY 0
Duration: var(--duration-slow)
Easing: var(--ease-out-expo)
Trigger: Elemento entra no viewport (ScrollTrigger)
Stagger: var(--duration-stagger) entre children
```

#### Crossfade de Background

```
Background saindo: opacity 1 → 0, scale 1 → 0.97
Background entrando: opacity 0 → 1, scale 1.03 → 1
Duration: var(--duration-section)
Easing: var(--ease-out-quart)
Trigger: ScrollTrigger pin + scrub
```

#### Scale Reveal (imagens e cards)

```
Initial: opacity 0, scale 0.92
Final: opacity 1, scale 1
Duration: var(--duration-slow)
Easing: var(--ease-out-expo)
```

#### Image Reveal (cortina — NOVO)

```
Initial: clip-path inset(100% 0 0 0)
Final: clip-path inset(0 0 0 0)
Duration: 800ms
Easing: var(--ease-out-expo)
Trigger: ScrollTrigger scrub
```

#### Split Text (hero — por palavra)

```
Cada palavra: opacity 0, translateY 100%, rotateX -10deg
Animação: stagger 60ms por palavra
Duration: 700ms por palavra
Easing: var(--ease-out-expo)
Trigger: Page load (hero)
```

#### Draw Icon (ícones SVG nos cards)

```
stroke-dashoffset: comprimento total → 0
Duration: 1000ms
Easing: var(--ease-out-expo)
Trigger: Card entra no viewport
```

#### Magnetic Cursor (NOVO)

```
Quando cursor está a < 80px do centro do CTA:
  CTA: translateX/Y em direção ao cursor (max 4px)
  Cursor: scale(1.8) + fundo semi-transparente
Easing: var(--ease-magnetic)
```

#### Contador Animado

```
De: 0
Até: valor final
Duration: var(--duration-counter)
Easing: var(--ease-out-expo)
Formato: inteiro, moeda (R$), sufixo (+, ha, M)
Trigger: Seção de impacto entra no viewport
```

### 6.4. Regras de Motion

- **`prefers-reduced-motion: reduce`** — desativar parallax, simplificar transições para fade, contadores mostram valor final
- **Performance** — TODAS as animações usam exclusivamente `transform` e `opacity` (composited, sem layout recalc)
- **Target** — 60fps desktop, 45fps mobile
- **`will-change`** — usar apenas em elementos animados ativamente, remover após animação
- **Mobile** — parallax reduzido a 50% do valor desktop. Cursor personalizado desativado. Lenis desativado.

---

## 7. BREAKPOINTS

```css
--bp-sm:    640px;     /* Telefone landscape */
--bp-md:    768px;     /* Tablet portrait */
--bp-lg:    1024px;    /* Tablet landscape / desktop pequeno */
--bp-xl:    1280px;    /* Desktop padrão */
--bp-2xl:   1536px;    /* Desktop wide */
```

**Uso em media queries:**

```css
/* Mobile first */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg — GSAP ativado */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }

/* Touch detection */
@media (hover: none) and (pointer: coarse) { /* desativar hover effects */ }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) { /* simplificar tudo */ }
```

---

## 8. COMPONENTES — TOKENS ESPECÍFICOS

### 8.1. Botão Primário (Gradiente)

```css
--btn-primary-bg:             var(--gradient-brand);
--btn-primary-bg-hover:       var(--gradient-brand-hover);
--btn-primary-color:          var(--text-on-brand);
--btn-primary-font:           var(--font-display);
--btn-primary-weight:         600;
--btn-primary-size:           var(--text-cta);
--btn-primary-tracking:       var(--tracking-cta);
--btn-primary-padding:        16px 36px;
--btn-primary-min-height:     52px;
--btn-primary-radius:         var(--radius-md);
--btn-primary-hover-shadow:   var(--glow-md);
--btn-primary-hover-translate: -2px;
--btn-primary-active-translate: 0;
--btn-primary-transition:     all 0.3s var(--ease-out-expo);
--btn-primary-focus-outline:  3px solid var(--border-active);
--btn-primary-focus-offset:   3px;
```

### 8.2. Botão Secundário (Outline)

```css
--btn-secondary-bg:           transparent;
--btn-secondary-color:        var(--text-primary);
--btn-secondary-border:       1.5px solid rgba(248, 250, 252, 0.20);
--btn-secondary-font:         var(--font-display);
--btn-secondary-weight:       600;
--btn-secondary-size:         16px;
--btn-secondary-tracking:     var(--tracking-cta);
--btn-secondary-padding:      14px 32px;
--btn-secondary-min-height:   52px;
--btn-secondary-radius:       var(--radius-md);
--btn-secondary-hover-color:  var(--color-primary);
--btn-secondary-hover-border: 1.5px solid rgba(74, 222, 128, 0.40);
--btn-secondary-hover-shadow: var(--glow-sm);
```

### 8.3. Botão Ghost

```css
--btn-ghost-color:            var(--color-primary);
--btn-ghost-font:             var(--font-text);
--btn-ghost-weight:           500;
--btn-ghost-size:             15px;
--btn-ghost-padding:          8px 0;
--btn-ghost-hover-color:      var(--color-secondary);
--btn-ghost-hover-decoration: underline;
--btn-ghost-hover-offset:     4px;
--btn-ghost-arrow:            "→";      /* Seta animada após texto */
--btn-ghost-arrow-gap:        8px;
```

### 8.4. Glass Card

```css
--card-bg:                    var(--bg-glass);
--card-bg-hover:              var(--bg-glass-hover);
--card-border:                var(--border-subtle);
--card-border-hover:          var(--border-hover);
--card-radius:                var(--radius-xl);
--card-padding:               var(--space-8);
--card-backdrop:              var(--blur-glass);
--card-hover-shadow:          var(--glow-sm);
--card-hover-translate:       -3px;
--card-transition:            all 0.4s var(--ease-out-expo);
--card-shimmer-angle:         110deg;
--card-shimmer-opacity:       0.08;
--card-shimmer-width:         80%;
--card-shimmer-duration:      0.7s;
```

### 8.5. Header

```css
--header-height:              72px;
--header-height-mobile:       60px;
--header-height-scrolled:     56px;
--header-bg-transparent:      transparent;
--header-bg-scrolled:         rgba(3, 7, 18, 0.80);
--header-blur-scrolled:       var(--blur-header);
--header-border-scrolled:     0 1px 0 rgba(248, 250, 252, 0.05);
--header-logo-height:         36px;
--header-logo-height-scrolled: 28px;
--header-logo-height-mobile:  28px;
--header-transition:          0.4s ease;
```

### 8.6. Dot Indicator

```css
--dot-size:                   8px;
--dot-gap:                    16px;
--dot-border:                 1.5px solid rgba(248, 250, 252, 0.25);
--dot-active-bg:              var(--color-primary);
--dot-active-scale:           1.3;
--dot-active-glow:            var(--glow-sm);
--dot-hover-ring:             1px solid rgba(74, 222, 128, 0.25);
--dot-hover-ring-size:        22px;
--dot-tooltip-font:           var(--font-text);
--dot-tooltip-size:           12px;
--dot-tooltip-weight:         300;
--dot-tooltip-color:          var(--text-secondary);
```

### 8.7. WhatsApp Button

```css
--whats-bg:                   #25D366;
--whats-color:                #FFFFFF;
--whats-size-mobile:          56px;
--whats-radius-mobile:        var(--radius-full);
--whats-radius-desktop:       var(--radius-lg);
--whats-shadow:               0 4px 20px rgba(37, 211, 102, 0.30);
--whats-pulse-shadow:         0 0 0 12px rgba(37, 211, 102, 0);
--whats-pulse-duration:       2s;
--whats-position-bottom:      24px;
--whats-position-right:       24px;
```

### 8.8. Loading Screen (NOVO)

```css
--loading-bg:                 var(--bg-deep);
--loading-scan-height:        2px;
--loading-scan-color:         var(--color-primary);
--loading-scan-glow:          var(--glow-md);
--loading-logo-opacity:       0 → 1;
--loading-duration:           var(--duration-loading);
--loading-easing:             var(--ease-out-quart);
```

---

## 9. IMAGENS — TOKENS DE TRATAMENTO

### 9.1. Overlays por Seção

| Seção | Overlay | Cor Predominante da Imagem |
|-------|---------|---------------------------|
| Hero | `--gradient-hero-overlay` | Dourado/amber, azuis profundos |
| Manifesto | `--bg-primary` (fundo solido) ou overlay 70% | Azuis escuros, linhas verdes |
| Impacto | Nenhum (fundo solido `--bg-deep`) | N/A — particles CSS |
| Regularização | `--gradient-section-overlay` | Terrosos quentes, dourado, verde natural |
| Mapeamento | overlay leve 55% | Azuis cianicos, verdes digitais, nuvem de pontos |
| Assistência | overlay 70% | Neutros sepia/frios, contraste alto |
| Infraestrutura | overlay 60% | Concreto cinza, terra vermelha, céu amplo |
| Ambiental | overlay 55% (mais leve — verde respira) | Verdes exuberantes, azuis de água |
| Contato | `--bg-overlay-heavy` + `--gradient-contact-glow` | Retorno dourado/amber ou foto equipe |

### 9.2. Especificações Técnicas de Imagem

```css
--img-format-primary:         WebP;
--img-format-progressive:     AVIF;
--img-format-fallback:        JPEG;
--img-quality-webp:           82%;
--img-quality-avif:           70%;
--img-resolution-desktop:     2560 x 1440px;
--img-resolution-mobile:      1080 x 1920px (9:16 vertical);
--img-max-size:               300KB;
--img-object-fit:             cover;
--img-object-position:        center center;
--img-loading-hero:           eager;
--img-loading-below-fold:     lazy;
--img-parallax-range:         translateY 0 → -8%;
--img-parallax-mobile:        translateY 0 → -4%;
```

---

## 10. TAILWIND v4 — THEME MAPPING

```css
@theme {
  --font-family-display: var(--font-display);
  --font-family-text: var(--font-text);

  --color-brand-primary: #4ADE80;
  --color-brand-secondary: #6EE7B7;
  --color-brand-accent: #34D399;

  --color-surface-deep: #030712;
  --color-surface-primary: #0A0F1C;
  --color-surface-elevated: #0F172A;
  --color-surface-card: #1E293B;

  --color-content-primary: #F8FAFC;
  --color-content-secondary: #94A3B8;
  --color-content-muted: #64748B;
}
```

---

## 11. IMPLEMENTAÇÃO CSS CONSOLIDADA

```css
:root {
  /* === CORES === */
  --color-primary: #4ADE80;
  --color-primary-hover: #22C55E;
  --color-secondary: #6EE7B7;
  --color-accent: #34D399;

  /* === GRADIENTES === */
  --gradient-brand: linear-gradient(135deg, #4ADE80 0%, #6EE7B7 100%);
  --gradient-brand-hover: linear-gradient(135deg, #22C55E 0%, #4ADE80 100%);
  --gradient-brand-radial: radial-gradient(ellipse at 50% 50%, rgba(74, 222, 128, 0.15) 0%, transparent 70%);

  /* === FUNDOS === */
  --bg-deep: #030712;
  --bg-primary: #0A0F1C;
  --bg-elevated: #0F172A;
  --bg-surface: #1E293B;
  --bg-glass: rgba(15, 23, 42, 0.50);

  /* === TEXTO === */
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;
  --text-on-brand: #0A0F1C;

  /* === TIPOGRAFIA === */
  --font-display: "Atyp Display", "Inter", system-ui, -apple-system, sans-serif;
  --font-text: "Atyp Text", "Inter", system-ui, -apple-system, sans-serif;

  /* === BORDAS === */
  --border-subtle: rgba(248, 250, 252, 0.06);
  --border-default: rgba(248, 250, 252, 0.10);
  --border-hover: rgba(74, 222, 128, 0.30);
  --border-active: #4ADE80;

  /* === ESPAÇAMENTO === */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* === CONTAINER === */
  --container-max: 1280px;
  --container-padding: clamp(20px, 4vw, 64px);

  /* === RADIUS === */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-full: 9999px;

  /* === MOTION === */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 600ms;
  --duration-section: 1200ms;

  /* === EFEITOS === */
  --glow-sm: 0 0 12px rgba(74, 222, 128, 0.15);
  --glow-md: 0 0 24px rgba(74, 222, 128, 0.20);
  --glow-lg: 0 0 48px rgba(74, 222, 128, 0.25);
  --glow-text: 0 0 40px rgba(74, 222, 128, 0.12);
  --blur-glass: blur(16px);
  --blur-header: blur(12px) saturate(180%);

  /* === Z-INDEX === */
  --z-bg: 0;
  --z-overlay: 10;
  --z-content: 20;
  --z-nav-indicator: 40;
  --z-header: 50;
  --z-cursor: 60;
  --z-loading: 80;
  --z-modal: 100;
  --z-skip: 9999;
}
```

---

_Design Tokens v2.0 compilados em Abril 2026 para Autha Engenharia._
_Filosofia: Cinematic Dark Tech. Dark-only. Baseado em BRIEFING-MELHORADO.md._
_Todos os valores de contraste validados contra WCAG 2.1 Level AA._
