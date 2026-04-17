# Design Brief: Autha Engenharia — Site Institucional Imersivo

_Versão 2.0 — Briefing melhorado e ampliado | Abril 2026_

---

## Problema

A Autha Engenharia é uma empresa com tecnologia de ponta (LiDAR, drones, software proprietário AuthaGrid com 7 algoritmos de Machine Learning), mas **não existe digitalmente**. Quando alguém busca "topógrafo Chapecó" ou "regularização fundiária SC", a Autha simplesmente não aparece. O fundador depende 100% de indicações pessoais e trava ao explicar o que a empresa faz — são tantas frentes que parece genérico.

O visitante que chega ao site precisa sentir em 3 segundos: "essa empresa é diferente de qualquer escritório de topografia que eu já vi." Não é um site de serviços. É uma **declaração de capacidade tecnológica e visão territorial**.

## Solução

Uma experiência imersiva de página única com 9 seções fullscreen. Cada seção é um "capítulo" visual da história da Autha — abrindo com uma imagem cinematográfica de fundo que transiciona suavemente conforme o usuário rola. A narrativa flui de "quem somos" para "o que fazemos" para "fale conosco", com cada frente de serviço recebendo seu próprio momento visual dedicado.

**A grande melhoria sobre o conceito original:** Em vez de apenas crossfade de backgrounds estáticos, propomos um sistema de **camadas visuais progressivas** — cada seção revela seu conteúdo em ondas (fundo → overlay → headline → detalhes → prova), criando ritmo cinematográfico. O site não apenas muda de imagem; ele **encena** cada frente de serviço.

### Ideias disruptivas incorporadas

1. **"Mapa Vivo" no Hero** — Em vez de uma foto estática de drone, usar uma visualização estilizada do território de Chapecó em dados (pontos LiDAR que se formam no load), criando a metáfora visual: "a Autha transforma dados em território"

2. **Contadores com contexto visual** — Ao mostrar "50.000 ha mapeados", um mini-mapa SVG de SC com os municípios mapeados pulsa em verde, um por um, criando uma animação territorial

3. **Parallax de profundidade em camadas** — Cada seção de serviço tem 3 camadas de parallax (fundo distante, elemento central, conteúdo próximo), criando ilusão de profundidade 3D sem WebGL

4. **Som do território (opcional)** — Efeito sonoro ambiente sutil (vento, drone) ativado por user interaction, criando imersão total. Desativado por padrão (respeitando acessibilidade)

5. **Cursor magnético em CTAs** — Nos botões de conversão, o cursor exibe um efeito magnético (atração suave quando próximo), aumentando taxa de clique

6. **Loading "scanning"** — Enquanto o site carrega, uma animação de varredura LiDAR estilizada percorre a tela, reforçando a identidade tecnológica

## Princípios de Experiência

1. **Impacto imediato sobre explicação gradual** — Nos primeiros 5 segundos, o visitante deve sentir "WOW". A explicação vem depois. O hero não começa com texto — começa com uma imagem/visual que para o scroll.

2. **Território como protagonista** — O site não mostra a Autha. Mostra o **território** que a Autha transforma. Cada seção tem como "astro principal" o resultado do trabalho — o terreno regularizado, a cidade mapeada, a obra otimizada — não os escritórios ou equipamentos.

3. **Confiança por prova, não por promessa** — Números reais, casos reais, tecnologia real. Cada afirmação é acompanhada de dado concreto. Zero adjetivos vazios ("inovadora", "líder"). Deixar os fatos falarem.

## Direção Estética

- **Filosofia:** Cinematic Dark Tech — a intersecção entre cinema editorial (dsgngroup.it) e interface de tecnologia avançada (Vercel, Stripe). Fundos escuros dramáticos com momentos de luz verde/ciano que funcionam como "janelas de dados" sobre o território.
- **Tom:** Autoridade técnica silenciosa. Não grita — ilumina. Engenharia premium com calor humano. "Nós dominamos a tecnologia, mas servimos pessoas."
- **Referências principais:**
  - **dsgngroup.it** — narrativa cinematográfica, transições fluidas, tipografia editorial
  - **InfoJets (CSS Design Awards)** — fullscreen imersivo, scroll-driven storytelling
  - **DroneDeploy** — hero com vídeo aéreo, prova social com logos, CTA duplo
  - **Stripe** — tipografia hierárquica impecável, gradientes sofisticados, micro-interações
  - **Vercel** — dark mode perfeito, grid system limpo, velocidade visual
  - **Locomotive.ca** — parallax em camadas, transições entre seções com personalidade
- **Anti-referências (o que NÃO deve ser):**
  - Sites de escritório de engenharia genérico (foto de prédio + lista de serviços)
  - Templates WordPress com hero slider
  - Landing pages de infoproduto com gatilhos mentais agressivos
  - Qualquer coisa que pareça "agência de marketing fez"
  - Cores corporativas azuis/vermelhas tradicionais

## Padrões Existentes

O projeto já possui um scaffold em `site-autha-cursor/` com:

- **Tipografia:** Atyp Display (300, 500, 600, 700) para títulos; Atyp Text (300, 400, 500, 600) para corpo. Fallback: Inter.
- **Cores (tokens CSS em globals.css):**
  - Primária: `#4ADE80` (verde Autha)
  - Secundária: `#6EE7B7` (ciano)
  - Fundos: `#030712` (deep), `#0A0F1C` (primary), `#0F172A` (elevated)
  - Texto: `#F8FAFC` (primário), `#94A3B8` (secundário), `#64748B` (muted)
  - Gradiente: `linear-gradient(135deg, #4ADE80, #6EE7B7)`
- **Espaçamento:** Escala de 4px a 96px (space-1 a space-24)
- **Componentes existentes:** Header (transparent→blur), Footer, SectionIndicator (dots), WhatsAppButton, GlassCard, AnimatedCounter, SectionBackground, Button (primary/secondary/ghost), FadeUp, WordReveal
- **Stack:** Next.js 15 + GSAP ScrollTrigger + Lenis + Framer Motion + Tailwind CSS 4

## Inventário de Componentes

| Componente | Status | Notas |
|------------|--------|-------|
| SectionBackground | Existe (melhorar) | Adicionar suporte a parallax em 3 camadas |
| Header | Existe (melhorar) | Adicionar efeito de shrink com logo menor ao scroll |
| HeroSection | Existe (melhorar) | Incorporar visualização "mapa vivo" com dados LiDAR estilizados |
| ManifestoSection | Existe | Texto da história AuthaGraph — manter |
| ImpactSection | Existe (melhorar) | Adicionar mini-mapa SVG animado dos municípios |
| ServiceSection | Existe (melhorar) | Adicionar variação de layout com imagem principal (não só cards) |
| ContactSection | Existe | Formulário com glass card — manter |
| GlassCard | Existe | Efeito shimmer no hover — manter |
| AnimatedCounter | Existe (melhorar) | Adicionar sufixo animado e formato de moeda |
| SectionIndicator | Existe | Dots laterais — manter |
| CursorFollower | Existe (melhorar) | Adicionar efeito magnético em CTAs |
| WhatsAppButton | Existe | Manter, adicionar pulse mais pronunciado na seção contato |
| Footer | Existe | Manter |
| **LoadingScreen** | Novo | Animação de "scanning LiDAR" no carregamento inicial |
| **TerritoryMap** | Novo | Mini-mapa SVG animado de SC com municípios mapeados pulsando |
| **ParallaxLayers** | Novo | Sistema de 3 camadas de parallax para seções de serviço |
| **ImageReveal** | Novo | Animação de "cortina" que revela imagens de fundo ao scroll |

## Interações Chave

### 1. Entrada do Hero (load da página)
O visitante vê uma tela escura com pontos verdes aparecendo lentamente (simulando dados LiDAR). Os pontos se agrupam formando o contorno de uma cidade vista de cima. Quando a imagem se forma, o headline entra palavra por palavra: "Mapear melhor / e decidir melhor." Duração total: 2.5s.

### 2. Crossfade entre seções de serviço
Ao sair de uma seção: conteúdo faz fade-out, background faz zoom-out sutil (scale 1→0.97). Ao entrar na próxima: novo background faz reveal com animação "cortina" (clip-path de baixo para cima), conteúdo entra com stagger fade-up. O resultado é uma transição que parece "virar a página de um atlas".

### 3. Contadores de impacto
Quando a seção de impacto entra no viewport, cada número conta de 0 até o valor final em 1.8s. Simultaneamente, no fundo, um mapa SVG do oeste de SC acende pontos verdes nos municípios mapeados, um por um, em sincronia com os contadores. Efeito: "os dados ganham vida territorial".

### 4. Glass Cards nas seções de serviço
Ao entrar na seção, os 3 cards de sub-serviço entram em stagger da lateral (direita ou esquerda conforme layout). Cada card tem um ícone SVG com traço animado (draw-on-scroll). No hover, o card faz shimmer (luz percorrendo a superfície) e a borda fica verde com glow sutil.

### 5. Cursor personalizado (desktop)
Um círculo verde semi-transparente de 12px segue o cursor com delay suave. Sobre links e botões: expande para 40px com fundo semi-transparente. Sobre CTAs principais: efeito magnético — o cursor é suavemente atraído para o centro do botão quando está dentro de 80px de distância.

### 6. Loading screen
Antes do conteúdo, uma animação de 1.5-2s mostra uma linha de varredura verde percorrendo a tela horizontalmente (como um scanner LiDAR), revelando o logo Autha progressivamente. Após completar, faz fade para o hero.

### 7. Navegação por dots
Dots fixos na lateral direita (desktop). O dot ativo pulsa com glow verde. Ao hover, mostra tooltip com nome da seção. Clicavel com scroll suave. No mobile, substituído por barra de progresso fina no topo.

## Comportamento Responsivo

| Breakpoint | Comportamento |
|------------|--------------|
| **Mobile** (<640px) | Stack vertical. Scroll snap nativo. Sem cursor personalizado. Sem parallax. Imagens em formato vertical (9:16). Cards full-width. Menu hamburger com overlay fullscreen blur. Barra de progresso no topo. |
| **Tablet** (640-1023px) | Layout adaptado. Scroll snap nativo. Sem cursor personalizado. Parallax reduzido (50%). Cards em grid 2 colunas. |
| **Desktop** (1024-1535px) | Experiência completa: GSAP scroll, Lenis smooth, parallax 3 camadas, cursor personalizado, dots laterais. |
| **Desktop wide** (1536px+) | Container com max-width 1280px centralizado. Espaçamento lateral generoso. Full parallax. |

### Mudanças de comportamento (não apenas tamanho)

- **Mobile:** WhatsApp button muda de pill para circular. SectionIndicator muda de dots laterais para barra de progresso. ServiceSection layout muda de 2 colunas para stack com imagem acima do texto.
- **Touch devices:** Todos os hover effects desativados. Glass cards sem transform no hover. Cursor personalizado oculto.
- **Reduced motion:** Crossfades simplificados para fade direto. Parallax desativado. Contadores mostram valor final sem animação. Texto aparece sem split.

## Requisitos de Acessibilidade

WCAG 2.1 Level AA (obrigatório por lei brasileira LBI 13.146/2015):

- **Contraste:** Texto `#F8FAFC` sobre fundo `#030712` = 19.3:1 (AAA). Botão CTA: texto `#0A0F1C` sobre `#4ADE80` = 9.8:1 (AAA). Texto secundário `#94A3B8` sobre `#0A0F1C` = 6.2:1 (AA).
- **Navegação por teclado:** Skip link no topo. Focus visível com outline verde `#4ADE80` (3px, offset 3px). Tab order lógico. Todos os dots, botões e links acessíveis via Tab.
- **Semântica HTML:** `<html lang="pt-BR">`. Um `<h1>` por página. Hierarquia sem pular níveis. `<section aria-label>` em cada seção fullscreen. Imagens de fundo via CSS (decorativas). Ícones com `aria-hidden="true"`.
- **Touch targets:** Mínimo 48x48px. Espaçamento mínimo 8px entre alvos. Botões CTA: min-height 52px.
- **Reduced motion:** `prefers-reduced-motion: reduce` desativa todas as animações complexas. Scroll behavior volta a `auto`. Crossfades viram fade simples.

## Fora do Escopo

Este briefing **NÃO** cobre:

- Páginas internas do site (/quem-somos, /servicos/*, /blog, /tecnologias) — o foco é a homepage single-page
- Sistema de blog ou CMS
- Integração com backend/CRM (formulário envia para WhatsApp/email apenas)
- Dark mode toggle (o site é dark-only)
- Internacionalização (português brasileiro apenas)
- Otimização para SEO avançado além do essencial (meta tags, Schema, headings)
- Produção de vídeo original (usa acervo existente ou imagens estáticas)
- Loja virtual ou e-commerce
- Área do cliente / portal

## Dados da Empresa (referência rápida)

| Campo | Valor |
|-------|-------|
| Nome | Autha Engenharia e Mapeamento |
| CNPJ | 38.489.344/0001-89 |
| WhatsApp | (49) 99971-9388 |
| Endereço | Av. Fernando Machado, 703-D, Sala 01, Centro, Chapecó/SC |
| Instagram | @authamap |
| Site | autha.eng.br |
| Slogan | Engenharia de Precisão Guiada pela Sua Perspectiva |
| Lema | Mapear melhor é decidir melhor |

### Números de impacto para exibição

- **107+** projetos em andamento
- **24** municípios com áreas urbanas mapeadas
- **50.000 ha** mapeados por drone
- **R$ 7M+** recuperados em APP ambiental

### 5 Frentes de serviço (ordem de apresentação no site)

1. **Regularização Fundiária** — porta de entrada principal, maior volume
2. **Mapeamento Aéreo e Cartografia** — prova de capacidade tecnológica
3. **Assistência Técnica e Perícias** — autoridade técnica, margem alta
4. **Infraestrutura e BIM** — projetos de grande porte
5. **Inteligência Ambiental** — demanda emergente

---

_Briefing compilado em Abril 2026 para Autha Engenharia e Mapeamento._
_Versão 2.0 com melhorias disruptivas e direção criativa expandida._
_Baseado em: dossiê completo, padrão de marca, 12 sites de referência, análise de concorrência, SEO strategy._
