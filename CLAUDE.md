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

### Tipografia

Fontes customizadas declaradas via `@font-face` em `globals.css` (não via `next/font`):
- `"Atyp Display"` → `font-display` (Tailwind class) — headings
- `"Atyp Text"` → `font-text` (Tailwind class) — corpo
- Arquivos em `public/fonts/` (`.woff2` + `.ttf`)
- `AtypDisplay-Bold.woff2` e `AtypText-Regular.woff2` são preloaded no `<head>` em `layout.tsx`

### Path Alias

`@/*` → `./src/*` (configurado em `tsconfig.json`)

### Utilitário de classes

`cn(...classes)` em `src/lib/utils.ts` — substitui `clsx`/`twMerge` com um `filter(Boolean).join(" ")` simples.

### Provider tree (layout.tsx)

```
LenisProvider
  GSAPScrollProvider
    BackgroundCrossfade   ← fixed z-0, fora do <main>
    grain-fixed div       ← textura de grão, fixed
    LoadingScreenWrapper
    CursorFollower
    ProgressBar
    Header
    <main>{children}</main>
    Footer
    SectionIndicator
    WhatsAppButton
```

### SEO

`layout.tsx` emite Schema.org `LocalBusiness` + `WebSite` via `<script type="application/ld+json">`. Dados puxados de `COMPANY` em `constants.ts`. OG image esperada em `public/images/og-image.jpg` (1200×630).

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

Seções que usam crossfade gerenciado (`crossfadeManaged={true}`): `hero`, `manifesto`, `mapeamento`, `regularizacao`, `assistencia`, `infraestrutura`, `ambiental`.

Seções com fundo sólido (sem imagem): `#impacto`, `#contato`.

### Nomes canônicos dos arquivos (não renomear)

Estes paths são referenciados em `src/lib/constants.ts`, `src/components/ui/BackgroundCrossfade.tsx`, `src/components/sections/HeroSection.tsx`, `src/components/sections/ManifestoSection.tsx` e `src/app/layout.tsx` (preload do hero):

| Seção | Arquivo canônico em `public/images/sections/` |
|---|---|
| hero | `hero-drone-cidade.jpg` |
| manifesto | `manifesto-authagraph.jpg` |
| mapeamento | `mapeamento-lidar-pointcloud.jpg` |
| regularizacao | `regularizacao-golden-hour.jpg` |
| assistencia | `assistencia-pericia-mapa.jpg` |
| infraestrutura | `infraestrutura-bim-lidar.jpg` |
| ambiental | `ambiental-mata-atlantica.jpg` |

### Protocolo para substituir imagens de fundo

Ao receber novas imagens (ex.: pasta `imagens-boas/`), **sempre copiar sobrescrevendo o nome canônico acima** em vez de renomear. Isso evita editar 5+ arquivos de código.

```bash
cp -f "<origem>.jpg" "public/images/sections/<nome-canonico>.jpg"
```

Se a origem vier em outro formato (ex.: `.png`), copiar com `.jpg` na destination funciona — o navegador sniffa os bytes e renderiza. Mas anotar como dívida técnica para limpeza futura (renomear para extensão correta + atualizar `constants.ts` e `BackgroundCrossfade.tsx`).

Após a troca, testar visualmente cada seção via `npm run dev` — se o ponto focal mudou, ajustar `pos` (object-position) em `BackgroundCrossfade.tsx`.

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

- [x] ~~Imagens reais Autha/SC — substituir stock em `public/images/sections/`~~ (17/04/2026 — substituídas a partir de `imagens-boas/`)
- [ ] Dívida técnica: `assistencia-pericia-mapa.jpg` é na verdade um PNG com extensão `.jpg` — converter ou renomear + atualizar `constants.ts:117` e `BackgroundCrossfade.tsx:26`
- [ ] Revisar `pos` (object-position) em `BackgroundCrossfade.tsx` para as imagens novas — pontos focais podem ter mudado
- [ ] Lighthouse audit — `npm run build && npx lighthouse http://localhost:3000`
- [ ] Teste iOS Safari — `position: fixed` tem quirks no Safari (testar crossfade)
