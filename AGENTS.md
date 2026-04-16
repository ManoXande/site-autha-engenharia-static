# AGENTS.md — Site Autha Engenharia (site-glm)

> Fonte única da verdade para este repositório.
> Atualizar este arquivo a cada fase maior vencida do /design-flow.

---

## Projeto

Site institucional imersivo da **Autha Engenharia e Mapeamento** — Chapecó/SC.
Single-page com 9 seções fullscreen, filosofia **Cinematic Dark Tech**.

**Stack:** Next.js 15 + TypeScript + Tailwind CSS 4 + GSAP + Lenis + Framer Motion

---

## Status do Design Flow

| Fase | Status | Arquivo |
|------|--------|---------|
| 1. Grill Me | ✅ Concluída | — |
| 2. Design Brief | ✅ Concluída | `BRIEFING-MELHORADO.md` |
| 3. Information Architecture | ✅ Concluída | `ARQUITETURA-INFORMACAO.md` |
| 4. Design Tokens | ✅ Concluída | `DESIGN-TOKENS.md` |
| 5. Brief to Tasks | ✅ Concluída | `TASKS.md` |
| 6. Frontend Design | 🔄 Em andamento | `src/` |
| 7. Design Review | ⏳ Pendente | — |

**Fase atual: 6 — Frontend Design**
**Sub-fase atual: Scaffold do projeto + Foundation (tokens, types, constants)**

---

## Regras Arquiteturais

- **Dark-mode only** — sem light mode, sem toggle
- **Mobile-first** — 375px base, escalar para cima
- **GSAP para scroll** (não Framer Motion para scroll)
- **Framer Motion apenas** para mount/unmount de componentes
- **Lenis** apenas em desktop (≥1024px)
- **CSS scroll-snap** em mobile (sem hijacking)
- **Sem cursor custom** em touch devices
- **prefers-reduced-motion** desativa todas as animações complexas

## Estrutura de Pastas

```
src/
  app/           # Next.js App Router (layout.tsx, page.tsx, globals.css)
  components/
    animations/  # GSAPScrollProvider, LenisProvider, FadeUp, WordReveal
    layout/      # Header, Footer, SectionIndicator, WhatsAppButton
    sections/    # HeroSection, ManifestoSection, ImpactSection, ServiceSection, ContactSection
    ui/          # Button, GlassCard, AnimatedCounter, SectionBackground, CursorFollower,
                 # ServiceIcon, LoadingScreen, TerritoryMap, ProgressBar, ParallaxLayers,
                 # ScrollIndicator
  hooks/         # useMediaQuery, useReducedMotion
  lib/           # constants.ts, utils.ts, fonts.ts
  types/         # index.ts
public/
  fonts/         # Atyp Display + Atyp Text (woff2 + ttf)
  images/
    sections/    # 9 imagens de fundo (jpg)
  logo/          # Logo Autha (png)
  textures/      # grain overlay
```

## Dados da Empresa

| Campo | Valor |
|-------|-------|
| Nome | Autha Engenharia e Mapeamento |
| CNPJ | 38.489.344/0001-89 |
| WhatsApp | (49) 99971-9388 |
| WhatsApp Link | https://wa.me/5549999719388 |
| E-mail | authamapeamento@gmail.com |
| Endereço | Av. Fernando Machado, 703-D, Sala 01, Centro, Chapecó/SC |
| CEP | 89802-111 |
| Instagram | @authamap |
| Site | autha.com.br |
| Slogan | Engenharia de Precisão Guiada pela Sua Perspectiva |

## Seções (ordem)

1. `#hero` — Hero cinematográfico
2. `#manifesto` — AuthaGraph, filosofia
3. `#impacto` — Números + TerritoryMap
4. `#regularizacao` — Frente 1
5. `#mapeamento` — Frente 2
6. `#assistencia` — Frente 3
7. `#infraestrutura` — Frente 4
8. `#ambiental` — Frente 5
9. `#contato` — CTA Final + Formulário

---

_Última atualização: Abril 2026 — Fase 6 iniciada_
