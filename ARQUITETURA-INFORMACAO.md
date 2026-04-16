# Arquitetura de Informação: Autha Engenharia

_Estrutura narrativa, navegação e fluxos do site institucional imersivo_
_Abril 2026 | Baseado em BRIEFING-MELHORADO.md e código existente em site-autha-cursor/_

---

## Mapa do Site

O site é uma **single-page application** — todas as seções vivem na homepage `/`. Não há rotas internas na versão atual. A navegação acontece por scroll vertical entre seções fullscreen.

```
/ (Homepage — Single Page)
│
├── #hero                    Seção 1 — Abertura cinematográfica
├── #manifesto               Seção 2 — Origem AuthaGraph, filosofia
├── #impacto                 Seção 3 — Números de impacto + mapa territorial
├── #regularizacao           Seção 4 — Frente 1: Regularização Fundiária
├── #mapeamento              Seção 5 — Frente 2: Mapeamento Aéreo e Cartografia
├── #assistencia             Seção 6 — Frente 3: Assistência Técnica e Perícias
├── #infraestrutura          Seção 7 — Frente 4: Infraestrutura e BIM
├── #ambiental               Seção 8 — Frente 5: Inteligência Ambiental
└── #contato                 Seção 9 — CTA Final + Formulário de contato
```

### Rotas futuras (fora do escopo atual, mas previstas na IA)

```
/quem-somos/                 Página institucional expandida
/servicos/                   Índice das 6 frentes
/servicos/[slug]/            Landing page individual por frente
/tecnologias/                AuthaGrid, LiDAR, equipamentos
/blog/                       Artigos SEO
/blog/[slug]/                Artigo individual
/contato/                    Página de contato dedicada
/politica-de-privacidade/    LGPD obrigatório
```

---

## Modelo de Navegação

### Navegação Primária — Header (fixo, topo)

| Item | Âncora | Ordem |
|------|--------|:-----:|
| Início | `#hero` | 1 |
| Serviços | `#regularizacao` | 2 |
| Tecnologia | `#mapeamento` | 3 |
| Contato | `#contato` | 4 |

**Comportamento:**
- Estado inicial (sobre hero): totalmente transparente, logo e links brancos
- Estado scroll (após hero): `rgba(3, 7, 18, 0.80)` + `backdrop-filter: blur(12px) saturate(180%)`
- Transição entre estados: 0.4s ease
- Logo encolhe de 36px para 28px ao scroll (shrink sutil)
- Máximo 4 itens — cabe em qualquer viewport

### Navegação Secundária — Section Indicator (dots laterais)

| Propriedade | Valor |
|-------------|-------|
| Posição | Fixed, margem direita 24px, centro vertical |
| Itens | 9 dots circulares (8px cada), gap 16px |
| Dot inativo | Border 1.5px `rgba(248,250,252,0.25)`, fundo transparent |
| Dot ativo | Fundo `#4ADE80`, glow, scale 1.3x |
| Interatividade | Clicável com scroll suave. Tooltip com nome da seção no hover |
| Desktop | Visível (≥1024px) |
| Mobile | Oculto. Substituído por barra de progresso no topo |

### Navegação Terciária — WhatsApp Button (fixo, bottom-right)

- Sempre visível após scroll do hero
- Mobile: circular 56px com ícone
- Desktop: pill com "WhatsApp" + ícone
- Pulse suave a cada 8 segundos
- Intensifica pulse na seção de contato

### Navegação Mobile — Hamburger Menu

- Ícone hamburger (3 linhas) animado para X (0.3s)
- Abre menu fullscreen com `backdrop-filter: blur(20px)`
- Links grandes (24px) empilhados verticalmente, centralizados
- Fundo `rgba(3, 7, 18, 0.95)`
- CTA "Fale no WhatsApp" destacado no final

---

## Hierarquia de Conteúdo por Seção

### Seção 1 — Hero (`#hero`)

| Prioridade | Conteúdo | Justificativa |
|:----------:|----------|---------------|
| 1 | Headline "Mapear melhor / e decidir melhor." | Impacto emocional imediato — define a promessa |
| 2 | Subtítulo com slogan da empresa | Contextualiza o que a Autha faz |
| 3 | CTA duplo: "Conheça Nossos Serviços" + "Fale no WhatsApp" | Do caminhos: explorar ou converter |
| 4 | Scroll indicator "Role para explorar" | Ação esperada para sair do hero |
| 5 | Label "ENGENHARIA DE PRECISÃO" | Contexto institucional sutil |

### Seção 2 — Manifesto (`#manifesto`)

| Prioridade | Conteúdo | Justificativa |
|:----------:|----------|---------------|
| 1 | Headline "Não medimos áreas. Enxergamos territórios." | Declaração de filosofia — diferencia de concorrentes |
| 2 | Texto da história AuthaGraph | Narra a origem do nome e posiciona como visão |
| 3 | Assinatura dos fundadores | Humaniza, dá rosto à empresa |
| 4 | Label "QUEM SOMOS" | Contexto de navegação |

### Seção 3 — Impacto (`#impacto`)

| Prioridade | Conteúdo | Justificativa |
|:----------:|----------|---------------|
| 1 | 4 contadores com números de impacto | Prova social massiva — "eles são grandes de verdade" |
| 2 | Mini-mapa SVG animado de SC | Contexto territorial aos números |
| 3 | Nota "50 mil ha = 1.100 Vaticanos" | Traduz número abstrato para concreto |
| 4 | Headline "Números que falam por nós" | Ancora a seção |

### Seções 4-8 — Frentes de Serviço (`#regularizacao` a `#ambiental`)

Cada frente segue a mesma hierarquia interna:

| Prioridade | Conteúdo | Justificativa |
|:----------:|----------|---------------|
| 1 | Label da frente + Headline principal | Identifica o serviço e sua promessa |
| 2 | Lead (parágrafo de abertura) | Explica o que a Autha faz nesta frente |
| 3 | 3 glass cards com sub-serviços | Detalha capacidades específicas |
| 4 | Prova social (métrica ou case) | Validador — "não é promessa, é resultado" |
| 5 | CTA contextual | Próximo passo direcionado por frente |

**Ordem das frentes e racional:**

| # | Frente | Por que nesta posição |
|:-:|--------|-----------------------|
| 4 | Regularização Fundiária | Porta de entrada principal. Maior volume de buscas. Fala com o maior público. |
| 5 | Mapeamento Aéreo | Momento "WOW tecnológico" — LiDAR, AuthaGrid, nuvem de pontos. Mantém o visitante impressionado. |
| 6 | Assistência Técnica | Para um público mais específico (advogados). Mostra autoridade técnica e profundidade. |
| 7 | Infraestrutura BIM | Ticket alto, projetos de grande porte. Economia comprovada R$ 200K. |
| 8 | Ambiental | Fecha as frentes com a dimensão regulatória. R$ 7M em APP é o argumento mais forte para fechar. |

**Alternância de layout (ritmo visual):**

| Seção | Layout | Coluna Texto | Coluna Cards |
|:------:|--------|:------------:|:------------:|
| 4 — Regularização | Normal | Esquerda 55% | Direita 45% |
| 5 — Mapeamento | Invertido | Direita 55% | Esquerda 45% |
| 6 — Assistência | Normal | Esquerda 55% | Direita 45% |
| 7 — Infraestrutura | Invertido | Direita 55% | Esquerda 45% |
| 8 — Ambiental | Normal | Esquerda 55% | Direita 45% |

### Seção 9 — Contato (`#contato`)

| Prioridade | Conteúdo | Justificativa |
|:----------:|----------|---------------|
| 1 | Headline "Pronto para proteger seu patrimônio?" | Pergunta de conversão — direta |
| 2 | Formulário de contato | Canal de conversão principal |
| 3 | Dados de contato (endereço, WhatsApp, e-mail) | Alternativa ao formulário |
| 4 | CTA "Solicitar Diagnóstico Gratuito" | Remove barreira — não é "venda", é diagnóstico |

---

## Fluxos do Usuário

### Fluxo 1 — Proprietário de Terreno (Principal — 60% dos visitantes)

```
1. Usuário chega por Google ("topógrafo Chapecó") ou indicação
2. Vê o hero — impacto visual imediato
3. Rola para manifesto — entende a filosofia
4. Vê números de impacto — valida que a empresa é real
5. Chega na Seção 4 (Regularização) — RECONHECE SEU PROBLEMA
   └─ "Do levantamento à matrícula registrada"
6. Clica em CTA "Quero regularizar minha área"
   └─ Abre WhatsApp com mensagem pré-formatada
7. Fim do fluxo → lead gerado
```

### Fluxo 2 — Advogado/Escritório (B2B — 20% dos visitantes)

```
1. Usuário chega por busca ("perícia judicial agrimensura SC") ou referência
2. Scrolling até Seção 6 (Assistência Técnica)
   └─ Pode usar nav dots para ir direto
3. Lê "Prova técnica que fortalece tese" — identifica valor
4. Vê menção ao AuthaGrid — diferenciador exclusivo
5. Clica "Falar com a equipe técnica"
   └─ Abre WhatsApp
6. Fim do fluxo → lead B2B qualificado
```

### Fluxo 3 — Prefeitura/Governo (B2B — 10% dos visitantes)

```
1. Usuário chega por indicação ou busca ("mapeamento drone prefeitura")
2. Vê hero (drone/território) — conexão visual
3. Pula para Seção 5 (Mapeamento) via nav dots
4. Lê "24 municípios com áreas urbanas mapeadas"
5. Vê menção ao AuthaGrid — validação tecnológica
6. Rola até contato ou clica CTA
7. Fim do fluxo → lead institucional
```

### Fluxo 4 — Visitante Curioso/Explorador (10% dos visitantes)

```
1. Chega por redes sociais ou referência de design
2. Percorre o site completo (todas as 9 seções)
3. Não converte na primeira visita
4. Memoriza a marca — retorno futuro quando tiver necessidade
5. KPI: tempo na página > 90s
```

---

## Convenções de Nomenclatura

| Conceito | Label na UI | Notas |
|----------|-------------|-------|
| Regularização Fundiária | "Regularização Fundiária" | Sempre completo, nunca abreviar para "Reg." |
| Mapeamento Aéreo | "Mapeamento e Cartografia" | "Cartografia" adiciona peso técnico |
| Assistência Técnica | "Assistência Técnica e Perícias" | Incluir "Perícias" — termo de busca |
| Infraestrutura BIM | "Infraestrutura e BIM" | BIM é keyword reconhecida |
| Inteligência Ambiental | "Inteligência Ambiental" | Nunca "Consultoria Ambiental" sozinho |
| AuthaGrid | "AuthaGrid" | Uma palavra, capital A e G |
| WhatsApp | "WhatsApp" | Nunca "Zap" ou "WPP" |
| CTA diagnóstico | "Solicitar Diagnóstico Gratuito" | "Gratuito" remove barreira |
| CTA regularizar | "Quero regularizar minha área" | Primeira pessoa, ação concreta |
| Números de impacto | "Resultados" | Label da seção — nunca "Estatísticas" |
| Scroll indicator | "Role para explorar" | Nunca "Scroll down" |

---

## Mapa de Reutilização de Componentes

| Componente | Usado em | Variações |
|------------|----------|-----------|
| `SectionBackground` | Todas as 9 seções | Overlay variants: default, heavy, light, solid-dark. Parallax on/off. |
| `ServiceSection` | Seções 4-8 | Props de `SERVICES` em constants.ts. Layout alternado via `layoutReverse`. |
| `GlassCard` | Seções 4-8 (sub-serviços), Seção 3 (contadores) | Versão contador: sem hover, número grande. Versão serviço: com shimmer hover. |
| `AnimatedCounter` | Seção 3 (impacto) | Diferentes formatos: inteiro, moeda, sufixo personalizado |
| `Button` | Header, Hero, CTAs de serviço, Contato, WhatsApp | Variantes: primary (gradiente), secondary (outline), ghost (texto) |
| `FadeUp` | Todas as seções (wrapper de animação) | Configurável: delay, duration, offset |
| `Header` | Layout global (fixo) | Estado transparent vs blur. Desktop vs mobile. |
| `SectionIndicator` | Layout global (fixo lateral) | Desktop only. Mobile: oculto. |
| `WhatsAppButton` | Layout global (fixo bottom-right) | Circular (mobile) vs pill (desktop). Pulse variável. |
| `Footer` | Layout global (após seção 9) | Único layout, responsivo |
| `LoadingScreen` (novo) | Preload do site | Única instância, animação 1.5-2s |
| `TerritoryMap` (novo) | Seção 3 (impacto) | SVG animado dos municípios mapeados |
| `CursorFollower` | Layout global (desktop only) | Estados: default, hover link, hover CTA (magnético) |

---

## Plano de Crescimento de Conteúdo

### Conteúdo Fixo (não cresce)

- 9 seções da homepage
- Dados da empresa (constants.ts)
- 5 frentes de serviço com copy

### Conteúdo Futuro (cresce com o tempo)

| Tipo | Onde viverá | Padrão de crescimento |
|------|-------------|-----------------------|
| **Cases de sucesso** | Seção dedicada ou seção 3 expandida | 1-2 por trimestre. Adicionar como cards no impacto ou página própria |
| **Depoimentos de clientes** | Incorporados nas seções de serviço | Coletar via Google Reviews. Exibir como mini-quote nos glass cards |
| **Blog/artigos SEO** | `/blog/[slug]` | 2-4 artigos/mês. Página de índice com paginação |
| **Landing pages por frente** | `/servicos/[slug]/` | 6 páginas, conteúdo expandido de cada frente |
| **Vídeos institucionais** | Seção hero ou tecnologia | Substituir imagem do hero por vídeo quando disponível |

### Previsão na IA atual

- Homepage é self-contained — funciona sem conteúdo futuro
- Dots de navegação escalam para até 12 seções (3 novas sem redesign)
- Footer já tem links para páginas futuras (blog, quem-somos, tecnologias)
- `constants.ts` é fonte única — adicionar novo serviço = novo item no array

---

## Estratégia de URLs

### Padrão atual (single-page)

```
/                    Homepage (todas as seções via âncoras)
/#hero               Âncora para seção específica
/#contato            Âncora para formulário
```

### Padrão futuro (multi-page, quando expandido)

```
/                    Homepage mantém as 9 seções
/servicos/           Índice das 6 frentes
/servicos/regularizacao-fundiaria/    Landing page dedicada
/servicos/mapeamento-cartografia/     Landing page dedicada
/servicos/assistencia-tecnica-pericias/
/servicos/infraestrutura-bim/
/servicos/ambiental-analise-territorial/
/quem-somos/        Página institucional
/tecnologias/       AuthaGrid + stack
/blog/              Índice de artigos
/blog/[slug]/       Artigo individual (slug = keyword principal)
/contato/           Página de contato dedicada
```

### Regras de construção de URLs

- Slug em português, lowercase, hífens entre palavras
- Sem acentos (removidos, não substituídos)
- Máximo 4 segmentos de profundidade
- Keyword principal da frente no slug (SEO)
- Canonical sempre apontando para URL sem trailing slash

---

_Arquitetura de informação definida em Abril 2026 para Autha Engenharia e Mapeamento._
_Baseada no BRIEFING-MELHORADO.md, código existente e documentação de SEO._
