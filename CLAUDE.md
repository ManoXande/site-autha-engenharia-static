# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Projeto

Site institucional imersivo da **Autha Engenharia e Mapeamento** — Chapecó/SC.
Single-page com 9 seções fullscreen, filosofia **Cinematic Dark Tech**.

**Stack:** Next.js 15 + TypeScript + Tailwind CSS 4 + GSAP + Lenis + Framer Motion

---

## Comandos

```bash
npm run dev          # servidor de desenvolvimento (localhost:3000)
npm run build        # build de produção
npm run start        # serve o build de produção
npm run type-check   # tsc --noEmit (sem lint separado)
```

> Não há script de lint configurado. Type-checking é a verificação estática disponível.

---

## Arquitetura Principal

### Background Crossfade System

O sistema de fundo é um **dual-layer fixo** gerenciado por `BackgroundCrossfade`:

- Dois `<div>` com `position: fixed; z-index: 0` animam `opacity` alternadamente via `IntersectionObserver`
- O `BASE_OVERLAY` (gradiente escuro) está **baked** no `background-image` do CSS — overlay e foto animam como uma unidade, eliminando dessincronização
- Mobile (< 1024px) e `prefers-reduced-motion`: `fadeDuration = 0ms` (swap instantâneo), mas o observer ainda roda para trocar a imagem de cada seção
- `SectionBackground` com `crossfadeManaged={true}` **não renderiza** `<Image>` — o layer fixo já provê a foto. Usar `crossfadeManaged` em todas as seções listadas em `SECTIONS` dentro de `BackgroundCrossfade.tsx`

### Animações — Divisão de Responsabilidades

| Biblioteca | Uso |
|---|---|
| **GSAP** | Animações de scroll (ScrollTrigger) |
| **Framer Motion** | Mount/unmount de componentes apenas |
| **Lenis** | Smooth scroll — somente desktop (≥ 1024px), via `requestAnimationFrame` diretamente (não usa `gsap.ticker`) |
| **CSS scroll-snap** | Mobile — sem JS scroll hijacking |

### Dados e Conteúdo

Todo conteúdo editorial fica em `src/lib/constants.ts`:
- `COMPANY` — dados da empresa
- `SERVICES: ServiceSectionData[]` — array das 5 seções de serviço (ordem = ordem de exibição)
- `IMPACT_STATS: ImpactStat[]` — métricas da seção #impacto
- `NAV_ITEMS: NavItem[]` — 3 itens do header

Para **adicionar/editar um serviço**, editar o array `SERVICES` em `constants.ts` e adicionar a entrada correspondente em `SECTIONS` em `BackgroundCrossfade.tsx`.

### Path Alias

`@/*` → `./src/*` (configurado em `tsconfig.json`)

---

## Regras Arquiteturais

- **Dark-mode only** — sem light mode, sem toggle
- **Mobile-first** — 375px base
- **GSAP para scroll**, Framer Motion apenas para mount/unmount
- **Lenis** somente em desktop (≥ 1024px)
- **Sem cursor custom** em touch devices
- **`prefers-reduced-motion`** desativa todas as animações complexas

---

## Imagens

Imagens de fundo das seções ficam em `public/images/sections/[nome].jpg`.
As 9 seções usam stock temporariamente — substituir por fotos reais da Autha/SC.

Seções que usam crossfade gerenciado (`crossfadeManaged={true}`): `hero`, `manifesto`, `mapeamento`, `regularizacao`, `assistencia`, `infraestrutura`, `ambiental`.

Seções com fundo sólido (sem imagem): `#impacto`, `#contato`.

---

## Seções (ordem)

| # | ID | Eyebrow |
|---|---|---|
| 1 | `#hero` | — |
| 2 | `#manifesto` | — |
| 3 | `#impacto` | — |
| 4 | `#mapeamento` | CARTOGRAFIA |
| 5 | `#regularizacao` | FUNDIÁRIO |
| 6 | `#assistencia` | PERÍCIA |
| 7 | `#infraestrutura` | INFRAESTRUTURA |
| 8 | `#ambiental` | AMBIENTAL |
| 9 | `#contato` | — |

---

## Dados da Empresa

| Campo | Valor |
|---|---|
| Nome | Autha Engenharia e Mapeamento |
| CNPJ | 38.489.344/0001-89 |
| WhatsApp | (49) 99971-9388 |
| WhatsApp Link | https://wa.me/5549999719388 |
| E-mail | authamapeamento@gmail.com |
| Endereço | Av. Fernando Machado, 703-D, Sala 01, Centro, Chapecó/SC |
| CEP | 89802-111 |
| Instagram | @authamap |
| Site | autha.com.br |

---

## Pendente

- [ ] Imagens reais Autha/SC — substituir stock em `public/images/sections/`
- [ ] Lighthouse audit — `npm run build && npx lighthouse http://localhost:3000`
- [ ] Teste iOS Safari — `position: fixed` tem quirks no Safari (testar crossfade)
