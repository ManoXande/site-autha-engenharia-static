# Build Tasks: Autha Engenharia — Site Institucional Imersivo

_Gerado de: BRIEFING-MELHORADO.md, ARQUITETURA-INFORMACAO.md, DESIGN-TOKENS.md_
_Data: Abril 2026_

---

## Inventario de Componentes Existentes

| Componente | Arquivo | Status | Acao |
|------------|---------|--------|------|
| SectionBackground | `ui/SectionBackground.tsx` | Existe | **Modificar** — adicionar parallax 3 camadas + ImageReveal |
| Header | `layout/Header.tsx` | Existe | **Modificar** — shrink logo ao scroll + mobile menu fullscreen blur |
| HeroSection | `sections/HeroSection.tsx` | Existe | **Modificar** — loading "mapa vivo" + split text + sequencia de entrada |
| ManifestoSection | `sections/ManifestoSection.tsx` | Existe | **Manter** — texto AuthaGraph |
| ImpactSection | `sections/ImpactSection.tsx` | Existe | **Modificar** — TerritoryMap SVG animado + contadores melhorados |
| ServiceSection | `sections/ServiceSection.tsx` | Existe | **Modificar** — draw-icon SVG + layout alternado + ImageReveal |
| ContactSection | `sections/ContactSection.tsx` | Existe | **Manter** — formulario glass card |
| ServiceSection (data) | `lib/constants.ts` | Existe | **Modificar** — adicionar campos para novos recursos |
| GlassCard | `ui/GlassCard.tsx` | Existe | **Manter** — shimmer já funciona |
| AnimatedCounter | `ui/AnimatedCounter.tsx` | Existe | **Modificar** — sufixo animado + formato moeda |
| Button | `ui/Button.tsx` | Existe | **Manter** — já tem primary/secondary/ghost |
| SectionIndicator | `layout/SectionIndicator.tsx` | Existe | **Modificar** — tooltip + barra progresso mobile |
| CursorFollower | `ui/CursorFollower.tsx` | Existe | **Modificar** — efeito magnético em CTAs |
| WhatsAppButton | `layout/WhatsAppButton.tsx` | Existe | **Manter** |
| Footer | `layout/Footer.tsx` | Existe | **Manter** |
| ScrollIndicator | `ui/ScrollIndicator.tsx` | Existe | **Manter** |
| ServiceIcon | `ui/ServiceIcon.tsx` | Existe | **Modificar** — draw-on-scroll (stroke-dashoffset) |
| FadeUp | `animations/FadeUp.tsx` | Existe | **Manter** |
| WordReveal | `animations/WordReveal.tsx` | Existe | **Manter** |
| GSAPScrollProvider | `animations/GSAPScrollProvider.tsx` | Existe | **Modificar** — sincronizar com novo loading screen |
| LenisProvider | `animations/LenisProvider.tsx` | Existe | **Manter** |
| globals.css | `app/globals.css` | Existe | **Modificar** — atualizar tokens conforme DESIGN-TOKENS.md |
| types/index.ts | `types/index.ts` | Existe | **Modificar** — novos campos |
| LoadingScreen | — | Nao existe | **Novo** |
| TerritoryMap | — | Nao existe | **Novo** |
| ParallaxLayers | — | Nao existe | **Novo** |
| ProgressBar | — | Nao existe | **Novo** — indicador mobile |

---

## Foundation

- [ ] **Atualizar tokens CSS:** Substituir o bloco `:root` em `globals.css` com os tokens consolidados de `DESIGN-TOKENS.md`. Incluir novos tokens (glow-xs, blur-mobile-menu, loading, parallax). Atualizar `@theme` do Tailwind. Adicionar novos `@keyframes` (scanLoading, magneticPulse, drawIn). _Modifica: `src/app/globals.css`._

- [ ] **Atualizar tipos TypeScript:** Adicionar novos campos em `types/index.ts`: `ServiceSectionData.mood`, `ServiceSectionData.imageRevealDirection`, `ImpactStat.format` (string: "number" | "currency" | "area"). Adicionar tipo `LoadingState`. _Modifica: `src/types/index.ts`._

- [ ] **Atualizar constants.ts:** Adicionar campo `mood` em cada service (warm, tech, authority, power, nature). Adicionar `format` nos impact stats (currency para R$7M, area para 50.000ha). Adicionar campo `imageRevealDirection` ("up", "left", "right"). Adicionar `whatsappMessage` parametrizado por frente. _Modifica: `src/lib/constants.ts`._

## Core UI — Novos Componentes

- [ ] **LoadingScreen:** Criar componente de loading com animação "scanning LiDAR" — linha verde horizontal (2px) percorrendo a tela de cima a baixo em 1.5s, revelando o logo Autha progressivamente (opacity 0→1). Ao completar, fade-out do loading (opacity 1→0, pointer-events none). Usar `useState` + `useEffect` com timer. Z-index `var(--z-loading)`. Fundo `var(--bg-deep)`. _Novo componente: `src/components/ui/LoadingScreen.tsx`._

- [ ] **TerritoryMap:** Criar componente SVG do mapa do oeste de Santa Catarina com 24 pontos representando municípios mapeados. Cada ponto pulsa em verde com delay escalonado (stagger 80ms). Mapa estilizado (simplificado, não detalhado). Tamanho: max 480px largura. Labels dos municípios visíveis no hover. Animado via GSAP — pontos acendem um a um em sincronia com AnimatedCounter. _Novo componente: `src/components/ui/TerritoryMap.tsx`._

- [ ] **ProgressBar:** Criar barra de progresso fina (3px altura) fixa no topo da viewport (abaixo do header). Cor: `var(--gradient-brand)`. Largura proporcional ao scroll (0% no topo, 100% no final). Z-index `var(--z-header) + 1`. Desktop: oculto (usa dots). Mobile/tablet: visível. Transição suave via ScrollTrigger. _Novo componente: `src/components/ui/ProgressBar.tsx`._

- [ ] **ParallaxLayers:** Criar wrapper que aceita 3 children (fundo, centro, frente) e aplica parallax em velocidades diferentes durante scroll. Fundo: translateY 0 → -4%. Centro: translateY 0 → -8%. Frente: translateY 0 → -12%. Desktop only (≥1024px). Usar GSAP ScrollTrigger com scrub. Em mobile: sem parallax, children empilhados normalmente. _Novo componente: `src/components/ui/ParallaxLayers.tsx`._

## Core UI — Modificar Existentes

- [ ] **SectionBackground + ImageReveal:** Adicionar suporte a animação "cortina" de revelação de imagem. Prop `imageReveal` com direção ("up", "left", "right"). Usa `clip-path: inset()` animado via GSAP ScrollTrigger scrub. Adicionar suporte a parallax em 3 camadas (integrando ParallaxLayers). Adicionar prop `parallax` boolean. _Modifica: `src/components/ui/SectionBackground.tsx`._

- [ ] **Header com shrink + mobile menu:** Adicionar shrink do logo ao scroll (36px → 28px). Adicionar estado `isScrolled` via IntersectionObserver no hero. Mobile: criar menu fullscreen com blur pesado (`blur(20px) saturate(200%)`), fundo `rgba(3,7,18,0.95)`, links empilhados verticalmente centralizados (24px). Hamburger animado (3 linhas → X, 0.3s). CTA WhatsApp destacado no final do menu. _Modifica: `src/components/layout/Header.tsx`._

- [ ] **ServiceIcon com draw-on-scroll:** Adicionar animação de stroke-dashoffset nos SVGs dos ícones. Quando o card entra no viewport, o traço do ícone desenha de 0 ao comprimento total (1000ms, ease-out-expo). Adicionar prop `animate` boolean. Implementar via hook useGSAP com ScrollTrigger trigger no card pai. _Modifica: `src/components/ui/ServiceIcon.tsx`._

- [ ] **AnimatedCounter com formatos:** Adicionar suporte a `format` prop: "number" (padrão), "currency" (prefixo R$, 2 casas decimais para milhões), "area" (sufixo ha com separador de milhar brasileiro: 50.000). Sufixo animado — aparece após contagem completar (fade-in). Usar `Intl.NumberFormat('pt-BR')` para formatação. _Modifica: `src/components/ui/AnimatedCounter.tsx`._

- [ ] **CursorFollower magnético:** Adicionar efeito magnético em CTAs primários. Quando o cursor está a < 80px do centro de um botão com `data-magnetic="true"`, o cursor escala para 1.8x com fundo semi-transparente, e o botão faz translate suave (max 4px) em direção ao cursor. Usar `mousemove` listener com `requestAnimationFrame`. Easing: `var(--ease-magnetic)`. Desativado em touch devices. _Modifica: `src/components/ui/CursorFollower.tsx`._

- [ ] **SectionIndicator + tooltip + mobile:** Adicionar tooltip no hover de cada dot — nome da seção em `Atyp Text 300 12px`, cor `var(--text-secondary)`. Tooltip aparece à esquerda do dot com fade-in (150ms). Mobile: ocultar dots completamente. O componente `ProgressBar` assume a função indicadora em mobile. _Modifica: `src/components/layout/SectionIndicator.tsx`._

## Seções — Modificar Conteúdo

- [ ] **HeroSection — entrada cinematográfica:** Reescrever sequência de entrada: (1) tela escura 0.3s, (2) pontos verdes aparecendo (dados LiDAR estilizados via CSS animation), (3) pontos formam contorno, (4) headline entra por split-text palavra a palavra (stagger 60ms), (5) subtitulo fade-up (delay 1.0s), (6) CTAs fade-up stagger (delay 1.2s), (7) scroll indicator aparece (delay 2.5s). Background: imagem com overlay + parallax suave. _Modifica: `src/components/sections/HeroSection.tsx`. Depende de: tokens atualizados._

- [ ] **ImpactSection — mapa + contadores melhorados:** Adicionar TerritoryMap como background visual da seção (posição: direita, 50% opacidade). Contadores usam AnimatedCounter melhorado com formatos (currency para R$7M, area para 50.000ha). Nota "1.100 Vaticanos" entra com fade-up após contadores. Fundo: `var(--bg-deep)` com gradient radial sutil verde + grid de pontos CSS (opacidade 4%). _Modifica: `src/components/sections/ImpactSection.tsx`. Depende de: TerritoryMap, AnimatedCounter modificado._

- [ ] **ServiceSection — layout alternado + imageReveal + draw icons:** Integrar ImageReveal no background (prop `imageReveal` por serviço). Integrar ParallaxLayers no fundo (desktop). Cards entram com stagger da lateral (translateX 40px→0 para layout normal, -40px→0 para invertido). Ícones SVG com draw-on-scroll. Prova social entra por último (delay extra). CTA ghost com seta animada ("→" que se move 4px para direita no hover). _Modifica: `src/components/sections/ServiceSection.tsx`. Depende de: SectionBackground modificado, ParallaxLayers, ServiceIcon modificado._

## Integração

- [ ] **Integrar LoadingScreen no layout:** Adicionar LoadingScreen em `layout.tsx`. Estado controlado por `useState` no client component wrapper. LoadingScreen aparece no mount, desaparece após 1.5s com fade-out. Após desaparecer, inicia a sequência de entrada do HeroSection. Usar `AnimatePresence` do Framer Motion para transição. _Modifica: `src/app/layout.tsx`. Depende de: LoadingScreen._

- [ ] **Integrar ProgressBar no layout:** Adicionar ProgressBar em `layout.tsx`, posicionada logo abaixo do Header. Conectada ao scroll via ScrollTrigger progress (0-1). Visível apenas em mobile/tablet (<1024px). Desktop: `display: none`. _Modifica: `src/app/layout.tsx`. Depende de: ProgressBar._

- [ ] **Integrar GSAP scroll system:** Configurar ScrollTrigger para crossfade entre seções. Registrar triggers para cada par de seções adjacentes. Cada seção: pin + scrub + crossfade BG + fade-up conteúdo. Integrar Lenis com GSAP ticker. Mobile: desativar pin/scrub, usar CSS snap nativo. _Modifica: `src/components/animations/GSAPScrollProvider.tsx`. Depende de: todas as seções atualizadas._

## Responsive & Polish

- [ ] **Pass mobile completa:** Testar todas as 9 seções em 375px e 390px (iPhone). Verificar: stack vertical, imagens 9:16, cards full-width, header hamburger, sem scroll horizontal, touch targets >= 48px, sem parallax, sem cursor custom, scroll snap nativo. Ajustar paddings, fontes e espaçamentos conforme escala mobile dos tokens. _Breakpoints: 375px, 640px, 768px._

- [ ] **Pass tablet:** Testar em 768px e 1024px. Verificar: cards em grid 2 colunas, parallax a 50%, sem cursor magnético, layout de serviço em 2 colunas funcionando. _Breakpoints: 768px, 1024px._

- [ ] **Pass desktop wide:** Testar em 1536px e 1920px. Verificar: container centralizado (max 1280px), espaçamento generoso, full parallax, cursor magnético, dots laterais. _Breakpoints: 1280px, 1536px, 1920px._

- [ ] **Pass de acessibilidade:** Executar checklist WCAG 2.1 AA: (1) contraste de todas as combinações de cor, (2) tab order lógico com skip link, (3) focus visível em todos os interativos, (4) alt text em todas as imagens, (5) aria-label em seções e nav, (6) prefers-reduced-motion simplifica animações, (7) lang="pt-BR", (8) h1 unico, hierarquia sem pulos. Ferramentas: Lighthouse + axe DevTools.

## Performance & SEO

- [ ] **Otimizar imagens:** Converter todas as imagens de fundo para WebP (82%) + AVIF (70%). Gerar versões mobile (1080x1920) e desktop (2560x1440). Tamanho alvo: <300KB por imagem. Usar `<link rel="preload">` para hero. Lazy loading nas demais. Verificar que `next/image` gera srcset correto. _Gera arquivos em: `public/images/sections/`._

- [ ] **Converter fontes para woff2:** Usar script `ttf2woff2` para converter as 8 fontes Atyp de TTF para WOFF2. Colocar em `public/fonts/`. Verificar que os @font-face apontam para woff2 com fallback ttf. Confirmar preload das 2 fontes criticas (Display-Bold, Text-Regular). _Gera arquivos em: `public/fonts/`._

- [ ] **SEO metadata e Schema:** Verificar metadata em `layout.tsx` (title, description, keywords, OG, twitter card, canonical). Verificar Schema JSON-LD LocalBusiness. Adicionar Schema Service para cada frente (via script tags dinâmicos). Criar `robots.txt` e `sitemap.xml`. Verificar que cada seção tem aria-label e heading hierarchy correta. _Modifica: `src/app/layout.tsx` + arquivos em `public/`._

- [ ] **Lighthouse audit:** Rodar Lighthouse em produção (build). Meta: Performance >= 90, Accessibility >= 95, SEO >= 95, Best Practices >= 95. Corrigir quaisquer problemas encontrados (CLS, LCP, unused CSS, etc.).

## Review

- [ ] **Design review:** Rodar `/design-review` contra o `BRIEFING-MELHORADO.md`. Verificar: fidelidade à filosofia Cinematic Dark Tech, WOW factor nas primeiras seções, consistência visual entre seções, prova social visível, CTAs acessíveis, mobile não quebrado.

---

_Tasks geradas em Abril 2026 para Autha Engenharia._
_28 tasks organizadas em 7 fases: Foundation → Core UI → Seções → Integração → Responsive → Performance → Review._
