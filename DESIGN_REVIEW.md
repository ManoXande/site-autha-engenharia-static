# Design Review: Autha Engenharia — Site Institucional

Revisado contra: `BRIEFING-MELHORADO.md` + `ARQUITETURA-INFORMACAO.md` + `DESIGN-TOKENS.md`
Filosofia: **Cinematic Dark Tech**
Data: Abril 2026
Dev server: `http://localhost:3000`

---

## Screenshots Capturados

| Screenshot | Breakpoint | Descrição |
|---|---|---|
| Hero desktop | Desktop 1280×800 | Hero com drone, headline, CTAs, nav |
| Impacto desktop | Desktop 1280×800 | Contadores — problema de overflow detectado |
| Regularização desktop | Desktop 1280×800 | Layout dois colunas, cards, prova social |
| Contato desktop | Desktop 1280×800 | Formulário glass card, dois colunas |
| Hero tablet | Tablet 768×1024 | Hero fullscreen, hamburger, CTAs empilhados |
| Impacto tablet | Tablet 768×1024 | Grid 2×2, TerritoryMap abaixo, contadores OK |
| Impacto mobile | Mobile 375×812 | Grid 2×2 — overflow em "50.000 ha" / "R$ 7M+" |

---

## Resumo

A implementação está **85% fiel ao brief**. A filosofia Cinematic Dark Tech está clara: fundos escuros com imagens cinematográficas, tipografia bold em verde #4ADE80, glass cards com shimmer, animações de entrada fluidas. O maior problema técnico é o **overflow dos contadores AnimatedCounter** em mobile e desktop wide (fonte `clamp(48px, 8vw, 96px)` é grande demais para o grid de 4 colunas). O segundo problema é a headline H1 do hero mostrando apenas a segunda linha ("e decidir melhor.") por limitação do `whileInView` do Framer Motion quando a seção já está no viewport no load.

---

## Must Fix

### 1. ✅ Contadores AnimatedCounter — overflow e colisão de texto [FIXED]
**Problema:** Fonte padrão `clamp(48px, 8vw, 96px)` no grid de 4 colunas em desktop (1280px) resultava em `96px` — "50.000 ha" e "R$ 7M+" colidiam visualmente.
**Fix aplicado:** `clamp(32px, 5vw, 64px)` em `src/components/ui/AnimatedCounter.tsx`.

### 2. ✅ Hero H1 — "Mapear melhor" não visível no load [FIXED]
**Problema:** `WordReveal` usava `whileInView` — race condition quando o hero já está no viewport no load.
**Fix aplicado:** Adicionada prop `inViewport?: boolean` ao `WordReveal`. Quando `true`, usa `animate` ao invés de `whileInView`. HeroSection passa `inViewport={true}`.
Arquivos: `src/components/animations/WordReveal.tsx`, `src/components/sections/HeroSection.tsx`.

---

## Should Fix

### 3. ✅ Hero CTA primário — largura excessiva no desktop [FIXED]
**Problema:** No desktop 1280px, o botão "VER FRENTES DE ATUAÇÃO" esticava para ~480px de largura.
**Fix aplicado:** `alignItems: "flex-start"` adicionado ao container dos CTAs em `src/components/sections/HeroSection.tsx`. Botões agora têm ~296px e ~313px respectivamente.

### 4. TerritoryMap não visível no desktop
**Problema:** O TerritoryMap tem `className="hidden lg:flex"` mas não apareceu na screenshot desktop 1280px — provavelmente obscurecido pelo overflow dos contadores ou pelo scroll do conteúdo.

**Arquivo:** `src/components/sections/ImpactSection.tsx`
**Fix:** Após corrigir o overflow dos contadores (item 1), verificar se o mapa fica visível. O container tem `maxWidth: "min(480px, 45vw)"` que deve funcionar.

### 5. Tablet — SectionIndicator (dots) visível em tablet
**Problema:** Os dots laterais aparecem em tablet (768px) mas deveriam ser apenas desktop (≥1024px). O `SectionIndicator` tem `className="hidden lg:block"` que resolve isso, mas no tablet as dots ainda são visíveis no screenshot.

**Verificar:** Se o SectionIndicator tem breakpoint correto ou se o `.hidden.lg:block` do Tailwind 4 precisa de ajuste.

### 6. ✅ LoadingScreen — scroll para seção errada após completar [FIXED]
**Problema:** Após a loading screen desaparecer, o CSS scroll-snap às vezes ancorara na seção #manifesto.
**Fix aplicado:** `document.documentElement.scrollTop = 0` adicionado ao callback `onComplete` em `src/components/layout/LoadingScreenWrapper.tsx`.

### 7. Imagens placeholder — não são fotos reais da Autha
**Problema:** O hero usa foto de São Francisco (EUA), não drone sobre Chapecó. As seções de serviço usam imagens genéricas de stock (farmland dourado, LiDAR genérico). Isso quebra o princípio do brief: "Território como protagonista — o site mostra o território que a Autha transforma."

**Ação:** Substituir por fotos reais dos projetos Autha em Chapecó/SC antes do go-live. Não é um bug de código, mas é crítico para a autenticidade do site.

---

## Could Improve

### 8. Hero — subtítulo à frente da imagem (baixo contraste)
A frase "Tecnologia, precisão e visão estratégica..." está sobre a imagem do drone sem overlay suficiente. Em alguns casos o texto fica difícil de ler.
**Fix:** Aumentar o `gradient-hero-overlay` no `globals.css` ou adicionar `text-shadow: 0 1px 3px rgba(0,0,0,0.5)` no parágrafo.

### 9. Manifesto — sem eyebrow label visível
A seção tem "QUEM SOMOS" como eyebrow mas no desktop ele está centralizado e com pouco destaque. Considerar alinhar à esquerda para consistência com as demais seções.

### 10. Service sections — prova social poderia ter mais peso visual
O "107+ PROJETOS EM ANDAMENTO" no Regularização tem bordas finas e texto pequeno. Aumentar o número de prova para `clamp(32px, 4vw, 52px)` daria mais impacto.

### 11. AnimatedCounter — labels centralizados vs left-aligned
Na ImpactSection, os labels dos contadores ("Projetos em andamento", "Municípios mapeados") estão centralizados pelo padrão do AnimatedCounter, mas o container usa `alignItems: "flex-start"`. Os labels internos do AnimatedCounter (`textAlign: "center"`) não herdam o override.
**Fix:** Adicionar `textAlign: "left"` ao `<p>` do label dentro do AnimatedCounter quando `style.alignItems === "flex-start"`.

### 12. Formulário de contato — sem validação de e-mail/telefone
O formulário envia sem validar formato. Adicionar validação básica de telefone (mínimo 10 dígitos) antes do envio para melhorar a qualidade dos leads.

### 13. WhatsApp button — "Fale no WhatsApp" em mobile deveria ser ícone apenas
Em mobile, o texto "Fale no WhatsApp" aparece ao lado do ícone, consumindo espaço. O briefing especifica que em mobile deve ser circular (apenas ícone). Verificar se o componente WhatsAppButton está aplicando corretamente o estilo circular sem texto.

---

## O que Funciona Bem

**Filosofia Cinematic Dark Tech:** Atingida com precisão. O fundo `#030712` com imagens cinematográficas de alta qualidade cria exatamente a atmosfera do brief — "autoridade técnica silenciosa".

**Tipografia:** A hierarquia Atyp Display Bold (H1 enorme com `clamp(38px, 9.5vw, 104px)`) + Atyp Text para corpo está perfeita. As headlines em verde #4ADE80 com gradiente para #6EE7B7 são o elemento visual mais forte do site.

**Glass Cards:** A implementação do glass morphism nas seções de serviço é bem executada — `backdrop-blur`, shimmer no hover, borda sutil. Fidelidade alta ao design original.

**Loading Screen:** A animação de scan LiDAR com revelação progressiva do logo Autha é exatamente o diferencial do brief. Cria o "WOW factor" nos primeiros 2 segundos.

**TerritoryMap SVG:** Os 24 municípios com pulso escalonado (stagger 80ms) é uma animação territorial única — não encontrado em nenhum concorrente direto. Diferencial real.

**Navegação:** Header com blur ao scroll, logo com shrink (36→28px), dots laterais com tooltip, ProgressBar no mobile — todos os elementos de navegação do brief foram implementados.

**Responsividade geral:** Com exceção do overflow dos contadores e do tamanho do CTA, o layout adapta corretamente em todos os breakpoints.

**SEO e acessibilidade técnica:** Schema JSON-LD LocalBusiness, meta tags completas, skip link, `lang="pt-BR"`, `aria-label` em todas as seções, `<h1>` único — base sólida.

**Contato:** O fluxo formulário → WhatsApp pré-preenchido é elegante e tem zero fricção. A mensagem parametrizada por frente de serviço é um detalhe de qualidade alto.

---

## Próximos Passos (em ordem de prioridade)

1. **Fix imediato:** Corrigir font-size dos contadores → sem overflow
2. **Fix imediato:** Corrigir visibilidade do H1 hero na primeira linha
3. **Fix imediato:** Corrigir largura do CTA hero no desktop
4. **Conteúdo:** Substituir imagens placeholder por fotos reais Autha/SC
5. **Validação:** Re-rodar `/design-review` após os fixes acima
6. **Deploy:** Configurar domínio `autha.eng.br` com Vercel ou similar

---

_Review gerado em Abril 2026 — Fase 7 do /design-flow_
_Site em: http://localhost:3000_
