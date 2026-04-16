# Plano de Performance e Transição de Fundos

Site: Autha Engenharia (`site-glm`)
Data: 2026-04-14

---

## Diagnóstico Atual

### Assets pesados
| Imagem | Tamanho |
|---|---|
| ambiental-mata-atlantica.jpg | 1.27 MB |
| contato-cidade-noturna.jpg | 1.05 MB |
| hero-cidade-grid.jpg | 1.11 MB |
| hero-drone-cidade.jpg | 1.04 MB |
| regularizacao-golden-hour.jpg | 1.03 MB |
| mapeamento-lidar-pointcloud.jpg | 915 KB |
| infraestrutura-bim-lidar.jpg | 836 KB |
| assistencia-pericia-mapa.jpg | 777 KB |
| manifesto-authagraph.jpg | 686 KB |
| **Total** | **~8.5 MB** |

### Problemas identificados

1. **Carregamento eager em todas as seções** — single-page com 9 seções significa 9 imagens fullscreen carregadas quase simultaneamente. O Next/Image apenas lazy-loads quando `priority={false}`, mas sem IntersectionObserver customizado, muitas entram no viewport rápido ao scrollar.
2. **Transição abrupta entre seções** — cada `SectionBackground` é `position: absolute; inset: 0` dentro da sua seção. Ao cruzar o limite da seção, a imagem A sai de tela e a B aparece — não há cross-fade nem compartilhamento de canvas.
3. **Sem AVIF** — `next.config.ts` só especifica `webp`. AVIF entrega 30-50% menos bytes que WebP na mesma qualidade.
4. **Sem blur placeholder** — no primeiro frame antes da imagem carregar, o fundo é preto puro (piora o CLS percebido).
5. **Scroll-snap obrigatório em mobile** — causa saltos abruptos sem transição.
6. **GSAP + Lenis + Framer Motion** todos carregados = ~140 KB de JS. Framer Motion só é usado em mount/unmount simples — poderia ser substituído por CSS puro em vários lugares.
7. **Grain overlay via data-URI SVG** — aplicado em cada seção (9x). Poderia ser uma única camada `position: fixed`.

---

## Must Fix — Performance

### P1. Compressão e formato das imagens
- Converter 9 JPGs → AVIF + WebP (keep JPG como fallback).
- Alvo: cada imagem < 250 KB (redução de ~70%).
- Comando sugerido com `sharp-cli`:
  ```
  npx sharp-cli -i public/images/sections/*.jpg -o public/images/sections/ -f avif --quality 60
  npx sharp-cli -i public/images/sections/*.jpg -o public/images/sections/ -f webp --quality 75
  ```
- Atualizar `next.config.ts`:
  ```ts
  formats: ["image/avif", "image/webp"]
  ```

### P2. Lazy loading agressivo por seção
- `SectionBackground` aceita prop `priority`. Apenas **hero** deve ter `priority={true}`.
- Adicionar `loading="lazy"` explicitamente nas demais (Next/Image já faz isso, mas confirmar).
- Ajustar `sizes="100vw"` para `sizes="(max-width: 768px) 100vw, 100vw"` (padrão já correto).

### P3. Blur placeholder
- Gerar `placeholder="blur"` com `blurDataURL` (10x10 base64) para cada imagem.
- Script `scripts/generate-blur.ts` que lê todas as imagens e gera um mapa `{ [path]: blurDataURL }`.

### P4. Grain overlay único
- Mover `.grain-overlay::after` de cada `.section-bg` para `body::after` com `position: fixed`.
- Ganho: elimina 9 renderizações da textura.

### P5. Reduzir bundle JS
- Avaliar remoção de **Framer Motion** onde for mount/unmount trivial (substituir por `@keyframes` CSS).
- Manter Framer apenas para `WordReveal` (complexo).
- Lenis pode ser carregado via `dynamic(..., { ssr: false })` e só em desktop.

---

## Must Fix — Transições

### T1. Fundos compartilhados cross-fade
A principal mudança arquitetural: **mover imagens para um único canvas fixo** atrás de todo o conteúdo, e fazer cross-fade entre elas conforme a seção ativa.

**Componente novo:** `<BackgroundStack />`
```
Estrutura (pseudo-código):

<div style="position: fixed; inset: 0; z-index: 0">
  {SECTIONS.map(s => (
    <Image
      key={s.id}
      src={s.backgroundImage}
      fill
      style={{
        opacity: activeId === s.id ? 1 : 0,
        transition: 'opacity 800ms ease-out',
      }}
    />
  ))}
</div>
```

- `activeId` é atualizado por um único `IntersectionObserver` que observa todas as seções.
- Apenas a imagem ativa + vizinhas (prev/next) têm `opacity > 0`. As demais ficam `opacity: 0` mas permanecem no DOM para não recarregar.
- Cada seção perde seu `<SectionBackground>` individual — fica só com o overlay e o conteúdo.
- **Ganho visual:** as imagens cross-fade suavemente (800ms) em vez de cortar.
- **Ganho de performance:** apenas 1 ou 2 imagens decodificadas por vez.

### T2. Parallax sutil no canvas único
- Com o canvas fixo, fica trivial aplicar `transform: translateY(scrollY * 0.1)` na imagem ativa = parallax 10% para efeito cinematográfico.
- Desabilitar em mobile / prefers-reduced-motion.

### T3. Overlay gradiente de transição
- Entre duas seções, adicionar um gradiente `linear-gradient(to bottom, transparent 0%, rgba(3,7,18,0.9) 50%, transparent 100%)` que acompanha a troca — dá sensação de "mergulho" entre cenas.
- Implementar como overlay separado no `<BackgroundStack>`.

---

## Should Fix

### S1. Preload estratégico
- No `<head>`: preload apenas do hero (+ segunda imagem visível após scroll inicial: manifesto).
  ```html
  <link rel="preload" as="image" href="/images/sections/hero-drone-cidade.avif" />
  ```

### S2. Pausar animações fora do viewport
- `AnimatedCounter`, `TerritoryMap pulses` — pausar quando a seção sai do viewport (reduz custo de RAF).

### S3. `content-visibility: auto` nas seções
```css
.section-full { content-visibility: auto; contain-intrinsic-size: 100dvh; }
```
Deixa o navegador pular renderização de seções fora do viewport.

### S4. Remover `overflow-x: hidden` do `body`
- Pode impedir otimizações de scroll. Verificar se é realmente necessário; se for, mover para um container específico.

---

## Could Improve

- Converter fontes Atyp para `woff2` otimizado com apenas os glyphs usados (subset `latin` + `latin-ext`).
- `@font-face` com `unicode-range` para reduzir o peso inicial.
- Substituir dot-grid `background-image` radial por SVG estático cached.
- Implementar `<link rel="prefetch">` para a próxima seção quando a atual entra no viewport.

---

## Ordem de Execução Sugerida

1. **P1** — converter imagens (ganho enorme, baixo risco) → 1h
2. **T1** — `<BackgroundStack>` cross-fade (mudança estrutural, maior impacto visual) → 3h
3. **P3** — blur placeholder (polish visual no load) → 30min
4. **P4** — grain overlay único → 15min
5. **S3** — `content-visibility: auto` → 15min
6. **T2** — parallax sutil → 30min
7. **T3** — overlay gradiente de transição → 30min
8. **P5** — avaliar remoção de Framer Motion → investigação, depois execução

**Alvo de métricas (Lighthouse Mobile 4G):**
- LCP: < 2.5s (hoje provavelmente 4-5s devido ao hero de 1 MB)
- Total Blocking Time: < 200ms
- CLS: < 0.05
- Total Weight: < 2 MB (hoje ~8.5 MB só de imagens)
