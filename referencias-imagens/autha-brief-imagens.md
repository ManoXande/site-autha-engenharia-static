# Brief Visual — Site Autha Engenharia

> Documento de contextualização e direção de arte para geração / captação de imagens das seções do site institucional da **Autha Engenharia e Mapeamento** (Chapecó/SC).
>
> Audiência: agente de IA generativa, fotógrafo, diretor de arte, ou equipe interna de conteúdo.

---

## 1. Contexto do projeto

**Empresa:** Autha Engenharia e Mapeamento — fundada em 2020, sediada em Chapecó/SC, atende todo o Brasil.

**O que faz:**
Engenharia territorial de precisão com LiDAR, drones, aerofotogrametria e software proprietário **AuthaGrid** (7 algoritmos de Machine Learning). Atua em 5 frentes:

1. **Mapeamento e Cartografia** — bases cartográficas validadas estatisticamente
2. **Regularização e Parcelamento de Imóveis** — REURB, loteamento, desmembramento até matrícula individual
3. **Assistência Técnica e Perícias** — laudos, quesitos, reconstrução cartográfica histórica, arbitragem
4. **Infraestrutura e BIM** — projeto executivo, modelagem 3D, varredura LiDAR para obra
5. **Inteligência Ambiental** — APPs, nascentes, vocação real do solo, saneamento de embargos

**Diferencial:** onde o mercado fragmenta processos em três empresas (topografia / jurídico / ambiental), a Autha integra tudo em um único fluxo — do campo ao cartório. O nome vem da projeção cartográfica **AuthaGraph** de **Hajime Narukawa**, que rompeu 450 anos de hegemonia do Mapa de Mercator usando geometria tridimensional (tetraedro). Esse espírito de **ruptura + método novo** é a espinha da marca.

**Fundadores:** Carlos Alexandre de Oliveira e Sandro Serafini.

---

## 2. Filosofia visual — "Cinematic Dark Tech"

Todas as imagens devem dialogar com esta filosofia, que mistura **rigor técnico + estética cinematográfica + tom tecnológico contido**.

### Princípios

- **Dark-first** — o site é 100% dark mode; todas as fotos são exibidas sobre fundo `#030712` com overlays escuros por cima. Imagens muito claras ou pastéis ficam "apagadas" pelo overlay e perdem força.
- **Dramático, não saturado** — luz direcional (golden hour, blue hour, rasante), contraste alto, sombras profundas. Evitar luz de meio-dia chapada.
- **Tecnologia real, não sci-fi** — equipamentos de campo reais (drones, estações totais, tablets com software, receptores GNSS). Nada de holografias, HUDs futuristas exagerados, neon.
- **Humano quando cabe** — pessoas reais em contexto de trabalho (não sorriso de stock photo). Quando aparecem, devem parecer profissionais em ação, não posando.
- **Território brasileiro / Sul** — preferir paisagens reconhecíveis do Brasil (especialmente Oeste de SC, Serra, rural Sul). Evitar skyline de cidade americana (hero atual usa San Francisco — precisa trocar).

### Não usar

- Cores saturadas demais (laranjas, azuis, vermelhos gritantes)
- Filtros Instagram, luz rosa/teal cinematográfica exagerada
- Gente sorrindo para câmera em pose
- Skylines de cidade estrangeira reconhecíveis
- Ícones vetoriais renderizados em 3D (mascotes, UI-art)
- Mapas fictícios genéricos (tipo Google Maps stock)

---

## 3. Sistema de marca

### Paleta

| Token | Valor | Onde aparece |
|---|---|---|
| `--bg-deep` | `#030712` | Fundo principal (azul-preto) |
| `--bg-primary` | `#0A0F1C` | Superfícies primárias |
| `--color-primary` | `#4ADE80` | Verde brand — accent |
| `--color-secondary` | `#6EE7B7` | Verde claro — gradiente |
| `--text-primary` | `#F8FAFC` | Texto branco |
| `--text-secondary` | `#94A3B8` | Texto cinza-azulado |

**Gradiente de marca:** `linear-gradient(135deg, #4ADE80 → #6EE7B7)`

**Tradução para fotografia:**
- Sombras: azul-preto profundo, nunca preto puro
- Altas-luzes: branco levemente frio
- Acento/highlight: apenas onde houver tecnologia — LEDs verdes dos drones, tela de software, nuvem de pontos LiDAR renderizada em verde/ciano

### Tipografia (para referência, não para embutir nas imagens)

- Headings: **Atyp Display** Bold, tracking negativo (-3%)
- Corpo: **Atyp Text** Regular

> **Regra:** nenhuma imagem deve ter texto embutido (título, watermark, legenda). Texto é sempre overlay HTML/CSS no frontend.

---

## 4. Diretrizes técnicas gerais

### Formato e resolução

| Item | Valor |
|---|---|
| **Aspect ratio** | **16:9 horizontal** (a seção é 100dvh, mas a foto é enquadrada em tela cheia de desktop widescreen) |
| **Resolução mínima** | 2560 × 1440 px |
| **Resolução ideal** | 3840 × 2160 px (4K) |
| **Formato final** | `.jpg` qualidade 82–88 (peso alvo < 450 KB após otimização) |
| **Espaço de cor** | sRGB |
| **Bits** | 8 bits |

### Composição

- Centro visual da imagem deve estar entre **35% e 60% da altura** (o overlay escurece topo e base — meio fica mais visível)
- Evitar elementos críticos nas bordas horizontais (Lenis smooth-scroll e crossfade podem causar leve clipping em transição)
- **Respirar** — sobrar céu, neblina, campo aberto onde possível. O overlay gradient escurece muito o resultado final, então a imagem "crua" deve parecer mais clara/arejada do que o normal
- Objeto principal ligeiramente descentrado (regra dos terços), quando possível no lado oposto ao texto da seção (o código define `layoutReverse` por seção)

### Tratamento visual obrigatório

- Reduzir saturação global em ~15% (o overlay verde sutil do site somado a cores vivas causa "poluição")
- Crush de sombras moderado (Shadows -20 no Lightroom ou equivalente)
- Contrast +10~15
- Manter granulação natural leve (o site já adiciona `grain-fixed` sobre tudo — não duplicar em exagero)

---

## 5. Brief por seção

Cada seção abaixo traz: **conceito → cena → mood → o que incluir → o que evitar → prompt sugerido → arquivo alvo**.

---

### 5.1. `#hero` — Abertura

**Headline atual:** *"Mapear melhor e decidir melhor."*
**Arquivo alvo:** `public/images/sections/hero-drone-cidade.jpg`

**Conceito:** Primeira impressão que resume toda a empresa — engenharia aérea de precisão sobre território real. Deve transmitir **visão estratégica + tecnologia + Brasil**.

**Cena proposta:**
Drone profissional (DJI Matrice 350 RTK, Mavic 3 Enterprise ou similar — com payload LiDAR ou câmera RGB aparente) em **primeiro plano ligeiramente desfocado** (motion blur leve nas hélices, mostrando que está voando), pairando em plano aberto. Ao fundo, território real do Sul do Brasil: mescla de cidade + campo, relevo ondulado característico do Oeste Catarinense, rio no meio (Rio Uruguai ou afluente). **Golden hour (1h antes do pôr do sol)**, sol baixo à esquerda, sombras longas no relevo.

**Incluir:**
- Drone com LED aceso (ponto verde discreto = marca)
- Luz lateral/contraluz dramática
- Atmosfera com névoa baixa (aérea) para profundidade
- Sensação de altitude — deve parecer "250 m acima do solo"

**Evitar:**
- Skyline de cidade estrangeira (a foto atual é SF — trocar)
- Drone brinquedo / minúsculo
- Céu azul chapado sem textura
- Lens flare exagerado

**Prompts sugeridos (para geradores):**
- EN: *"Cinematic aerial photograph, professional mapping drone with LiDAR payload hovering in foreground slightly out of focus, vast rolling countryside of southern Brazil below — mixed rural terrain and small city by a river, golden hour side-lit landscape, atmospheric haze, dramatic long shadows, desaturated color grade, dark teal and amber palette, 35mm documentary aesthetic, Zeiss lens look, 16:9"*
- Variação: *"...shot on ARRI Alexa, shallow depth of field on drone, sharp landscape, editorial tech photography"*

---

### 5.2. `#manifesto` — Quem Somos / AuthaGraph

**Headline:** *"Não medimos áreas. Enxergamos territórios."*
**Arquivo alvo:** `public/images/sections/manifesto-authagraph.jpg`

**Conceito:** Homenagem visual à **ruptura de Hajime Narukawa com o Mapa de Mercator**. Tem que ser uma imagem **abstrata/conceitual**, não documental — é o único ponto da home onde o visual tem função filosófica.

#### Direção A — AuthaGraph literal (preferida)

**Cena:**
Representação abstrata da projeção AuthaGraph: globo terrestre sendo **desdobrado em tetraedro** e depois em plano, flutuando em espaço escuro profundo. Linhas finas de triangulação conectando vértices, continentes representados em **tons graphite/bronze**, oceanos em verde-azul profundo (`#0A0F1C` a `#0F172A`). Grid cartográfico translúcido por trás (meridianos + paralelos).

**Incluir:**
- Geometria tetraédrica clara — o conceito precisa ser legível
- Sutil highlight verde nas arestas (marca)
- Profundidade (atmosfera espacial, partículas leves)

**Evitar:**
- Globo terrestre Pixar/cartoon
- Emoji-world
- Cores de bandeira

**Prompt sugerido:**
- EN: *"Abstract conceptual image, Earth globe unfolding into tetrahedron then into flat map (AuthaGraph projection by Hajime Narukawa), floating in deep black-blue cosmic space, fine triangulated mesh lines, continents in graphite and bronze tones, oceans deep teal, subtle green edge-light highlights, latitude-longitude grid translucent overlay, atmospheric dust particles, minimalist, editorial, 16:9, dark elegant composition"*

#### Direção B — AuthaGraph tátil (alternativa)

**Cena:**
Mãos de arquiteto sobre mesa escura segurando a **projeção AuthaGraph física** (papel impresso, desdobrada como origami). Luz lateral dramática, dedo apontando para o continente sul-americano. Lápis, compasso, régua de arquiteto ao lado. Textura de papel visível.

**Prompt sugerido:**
- EN: *"Close-up top-down shot of architect's hands unfolding a paper AuthaGraph world map on a dark workspace, single dramatic side light, finger pointing at South America, drafting tools nearby (pencil, compass, ruler), paper texture visible, editorial photography, Wes Anderson composition flatness with cinematic lighting, 16:9"*

---

### 5.3. `#mapeamento` — Cartografia

**Headline:** *"Da aerofotogrametria à base cartográfica validada."*
**Mood do site:** `tech`
**Arquivo alvo:** `public/images/sections/mapeamento-lidar-pointcloud.jpg`

**Conceito:** **Diálogo entre cartografia histórica e ortomosaico atual** — referência direta aos mapas dos engenheiros cartógrafos **Kantu e Spironello** (históricos do Oeste Catarinense), reconstituídos com ortofoto moderna por baixo. Mostrar que a Autha honra o legado cartográfico da região **e** o atualiza com precisão centimétrica.

**Cena proposta:**
Composição em **duas camadas sobrepostas**, vista de cima (top-down):

1. **Camada base (embaixo, 60% opacidade):** ortomosaico aéreo real de uma área rural do Oeste SC — **Águas de Chapecó** ou propriedade rural típica: lavouras retangulares, cursos d'água meandrantes, estradas vicinais.
2. **Camada superior (sobreposta, 40% opacidade):** planta cartográfica histórica em papel envelhecido (papel bege-amarelado, linhas a nanquim, letras manuscritas em itálico), mostrando limites originais de lotes coloniais, denominações antigas, norte magnético com rosa-dos-ventos clássica.

O "encontro" entre as duas é a imagem. Cantos podem mostrar texturas de folha de caderno técnico (Kantu/Spironello referência).

**Incluir:**
- Coordenadas UTM discretas em algum canto (ex: "N 6.985.432 / E 356.221")
- Marcas de lote (letras A, B, C)
- Rio real (curva característica do Rio Uruguai ou Chapecozinho)
- Leve desalinhamento entre as camadas (o ponto é que a Autha corrigiu isso)

**Evitar:**
- Mapa Google Maps stock
- Planta CAD limpa sem carga histórica
- Cor sépia saturada tipo filtro vintage

**Prompt sugerido:**
- EN: *"Top-down composite cartographic image: bottom layer is high-resolution aerial orthomosaic of rural Southern Brazil (winding river, farmland parcels, dirt roads) in desaturated greens and browns; top layer is a translucent overlay of an aged hand-drawn 1950s surveyor's cadastral map in sepia ink on yellowed paper, lot boundaries labeled A/B/C, compass rose, UTM coordinates, handwritten italic annotations; two layers slightly misaligned, dark vignette edges, moody documentary aesthetic, 16:9"*

---

### 5.4. `#regularizacao` — Regularização Fundiária

**Headline:** *"Da gleba irregular ao lote registrado."*
**Mood do site:** `warm`
**Arquivo alvo:** `public/images/sections/regularizacao-golden-hour.jpg`

**Conceito:** **Dignidade humana através do documento.** REURB muda vida — família que antes não tinha matrícula agora tem o imóvel no próprio nome. Deve evocar **ascensão social, conquista, chão**.

**Cena proposta:**

**Direção A — Documento humano (principal)**
Homem ou mulher (agricultor/a ou trabalhador/a urbano, 40-60 anos, roupas simples dignas, traços do Sul do Brasil), em pé em frente à casa simples de alvenaria, segurando **documento físico (matrícula do imóvel, carta da prefeitura)** nas mãos. Pôr do sol ao fundo (golden hour verdadeiro). Expressão serena, não sorriso largo — **orgulho silencioso**. Casa em foco médio atrás, com pequeno quintal.

**Direção B — Planta REURB sobre território**
Planta técnica de REURB (limites de lote, logradouro, numeração predial) impressa em papel, **parcialmente sobreposta** ao território real (casa simples + rua de chão + cerca). Mão segurando a planta. Luz dourada.

**Incluir (A):**
- Documento bem visível, legível o suficiente para parecer oficial (carimbo, assinatura)
- Chinelo / sapato gasto / mão calejada — detalhes que humanizam
- Casa simples mas cuidada (varanda, plantas, portão)

**Evitar:**
- Stock photo "família feliz EUA"
- Modelo bonito demais em pose de catálogo imobiliário
- Casa de classe média alta moderna (foge da narrativa REURB-S)

**Prompt sugerido (direção A):**
- EN: *"Documentary portrait, middle-aged Southern Brazilian agricultural worker standing in front of modest but well-kept brick home, holding an official property deed document in both hands, quiet proud expression (not smiling), golden hour side light, shallow depth of field, small front yard with plants, wooden fence, unpretentious rural dignity, shot on Leica, editorial documentary photography, 16:9"*

---

### 5.5. `#assistencia` — Assistência Técnica e Perícia

**Headline:** *"Prova técnica que fortalece tese."*
**Mood do site:** `authority`
**Arquivo alvo:** `public/images/sections/assistencia-pericia-mapa.jpg`

**Conceito:** Corrigindo a leitura do user — a Autha reposicionou essa frente para **resolução de conflitos e arbitragem**. Imagem deve gerar sensação de **harmonia reconquistada, diálogo técnico, acordo**. Não tribunal, não briga.

**Cena proposta:**

**Direção A — Acordo sobre o mapa (principal)**
Duas mãos (homem e mulher, ou duas pessoas com idades diferentes) se encontrando em **aperto de mão firme sobre uma mesa de reunião com planta técnica desdobrada**. Planta é cartografia real (lote, matrícula, confrontantes). Luz natural entrando por janela lateral, quente mas não exagerada. Segundo plano desfocado — sala de reunião com estante, livros técnicos.

**Direção B — Diálogo técnico**
Engenheiro/a da Autha e cliente (ou duas partes em conflito) sentados **lado a lado** (não frente a frente — lado a lado = aliados), ambos olhando para tablet/planta compartilhada, expressões concentradas e construtivas. Luz de janela.

**Incluir:**
- Mapa técnico/planta como elemento central
- Caneta, lápis, laser pointer
- Ambiente profissional mas acolhedor (madeira clara, não aço frio)

**Evitar:**
- Martelo de juiz, toga, tribunal
- Expressões tensas ou de confronto
- Aperto de mão "deal fechado" corporativo com terno de gravata engomado

**Prompt sugerido (direção A):**
- EN: *"Close-up documentary shot of two hands (man and woman, different ages) meeting in a firm respectful handshake over an unfolded technical cadastral map on a warm wooden meeting table, natural window side light, blurred background with bookshelf and law/engineering books, amber and earth tones, harmony and resolution feeling, editorial photography, shallow depth of field, 16:9"*

---

### 5.6. `#infraestrutura` — Infraestrutura e BIM

**Headline:** *"Cada decisão de obra calculada antes da mobilização."*
**Mood do site:** `power`
**Arquivo alvo:** `public/images/sections/infraestrutura-bim-lidar.jpg`

**Conceito:** Interpretando "Imagens Sandro" como fotografias reais do **Sandro Serafini (co-fundador)** em campo, coordenando obra com tecnologia. Imagem de **autoridade técnica em contexto real**.

**Cena proposta:**

**Direção A — Sandro em obra (se houver acesso ao fundador)**
Sandro em obra (terraplenagem, canteiro rodoviário ou infraestrutura urbana), **capacete branco Autha + colete refletivo**, tablet robusto nas mãos mostrando modelo BIM 3D / nuvem de pontos LiDAR. Máquinas ao fundo (escavadeira, motoniveladora) desfocadas. Sol baixo, poeira no ar, luz dramática. Plano médio-americano, ângulo ligeiramente baixo (conferindo autoridade).

**Direção B — Tecnologia sobre obra (alternativa sem pessoa)**
Canteiro de obra ao entardecer com overlay **translúcido** de nuvem de pontos LiDAR e mesh BIM projetado por cima do terreno real. Como se a tecnologia estivesse "lendo" o mundo físico. Cores: terra + verde-brand discreto no overlay.

**Incluir:**
- Equipamento Autha de verdade (se houver identidade visual em capacete/colete, usar)
- Tablet com software aberto visível (não precisa detalhe, só sugerido)
- Canteiro brasileiro reconhecível (não obra EUA/Europa)

**Evitar:**
- Renderização BIM pura sem contexto físico
- Capacete/colete de outra marca/cor
- Obra "limpa demais" (obra real tem poeira, barro, desordem controlada)

**Prompt sugerido (direção A, caso não haja foto real do Sandro):**
- EN: *"Documentary on-site portrait, experienced male civil engineer mid-40s, white hard hat and reflective vest, holding rugged tablet displaying 3D BIM model overlay, standing confidently on a Brazilian highway earthworks construction site, low sun backlight creating dust atmosphere, excavator and grader blurred in background, dramatic low-angle medium shot, amber-earth palette with subtle green tech accent, editorial construction photography, 16:9"*

> **Nota:** Se possível, **fazer sessão fotográfica real com o Sandro** em uma obra Autha em andamento. Sai mais forte que IA.

---

### 5.7. `#ambiental` — Inteligência Ambiental

**Headline:** *"A real vocação do solo revelada com rigor."*
**Mood do site:** `nature`
**Arquivo alvo:** `public/images/sections/ambiental-mata-atlantica.jpg`

**Conceito:** **Natureza protegida com precisão**. Foto aérea de drone sobre bioma autêntico do Sul do Brasil. Mostrar que a Autha entende o território antes de mapeá-lo.

**Cena proposta:**
Plano aéreo (drone ~150 m) sobre **Mata Atlântica com Araucárias (Floresta Ombrófila Mista)** — bioma nativo de Chapecó/SC e região. Rio ou nascente serpenteando a floresta, copas densas de araucárias altas se destacando acima do dossel (o formato "guarda-chuva" característico). **Golden hour ou blue hour**, névoa baixa entre árvores (amanhecer), luz lateral.

Variação: **APP (Área de Preservação Permanente) real** — área de mata ciliar preservada margeando rio/nascente, transição clara entre mata e pastagem/lavoura adjacente (contraste natureza preservada × uso antrópico — conceito "vocação real do solo").

**Incluir:**
- Araucárias reconhecíveis (destacam-se da paisagem = identidade do Sul)
- Curso d'água claro
- Névoa / atmosfera viva
- Sinal sutil de humanidade (estradinha rural distante, pequena propriedade) para escala

**Evitar:**
- Amazônia (bioma errado — Autha é Sul)
- Floresta tropical genérica de stock
- Drone / equipamento aparente (a atmosfera é contemplativa, não técnica)
- Over-processamento HDR

**Prompt sugerido:**
- EN: *"Aerial drone photograph at 150m altitude over pristine Araucária forest (Southern Brazilian Mixed Ombrophilous Forest), iconic umbrella-shaped Paraná pines rising above dense canopy, small meandering river through the green, low morning mist between trees, golden hour side light, subtle transition to rural pasture at one edge, naturalistic color grade, dark greens and warm light contrast, editorial landscape photography, no visible human infrastructure, 16:9"*

---

### 5.8. `#impacto` — (sem foto)

**Observação:** Esta seção usa **fundo sólido escuro + visualização vetorial de mapa do Brasil** com pins animados dos municípios atendidos. Não precisa de imagem fotográfica — é data-driven. Ignorar para este brief.

### 5.9. `#contato` — (sem foto)

**Observação:** Fundo sólido com glows radiais verdes. Sem imagem. Ignorar.

---

## 6. Checklist de entrega

Para cada imagem gerada/fotografada:

- [ ] Aspect 16:9, mínimo 2560×1440 (ideal 3840×2160)
- [ ] Exportar em `.jpg` qualidade 82–88
- [ ] Espaço de cor sRGB, 8 bits
- [ ] Nome do arquivo exato conforme coluna "Arquivo alvo" (o código em `BackgroundCrossfade.tsx` busca por esse path)
- [ ] Testar sob overlay escuro (simular: aplicar camada preta 75% opacidade por cima — se a imagem ficar ilegível, está clara demais)
- [ ] Submeter com **variação A/B** quando possível (duas opções por seção)
- [ ] Salvar versão raw/PSD/TIFF do master para futuros ajustes

### Paths finais

```
public/images/sections/hero-drone-cidade.jpg
public/images/sections/manifesto-authagraph.jpg
public/images/sections/mapeamento-lidar-pointcloud.jpg
public/images/sections/regularizacao-golden-hour.jpg
public/images/sections/assistencia-pericia-mapa.jpg
public/images/sections/infraestrutura-bim-lidar.jpg
public/images/sections/ambiental-mata-atlantica.jpg
```

E a OG para compartilhamento em redes sociais:
```
public/images/og-image.jpg  (1200 × 630, usar recorte do hero)
```

---

## 7. Prioridade de troca

Se não for possível trocar todas de uma vez, esta é a ordem recomendada:

1. **Hero** — é a primeira impressão, e a atual mostra San Francisco (fere "brasilidade")
2. **Manifesto** — imagem AuthaGraph precisa ser única/autoral, stock não funciona
3. **Regularização** — narrativa humana forte, merece foto real (fotógrafo local em REURB)
4. **Infraestrutura** — sessão com Sandro em obra reforça autoridade
5. **Ambiental** — foto aérea local (drone Autha pode produzir internamente)
6. **Mapeamento** — composição em camadas pode ser feita em pós-produção (Photoshop) com orto real + planta Kantu/Spironello escaneada
7. **Assistência** — mais flexível, pode rodar stock bem-curado por mais tempo

---

## 8. Referências visuais (para pesquisa)

- **Hajime Narukawa / AuthaGraph** — site oficial: narukawa-lab.jp
- **Sebastião Salgado** — tom documental e dignidade humana (regularização)
- **Edward Burtynsky** — fotografia aérea industrial/territorial (hero, infraestrutura)
- **Folha do Meio / O Eco / ((o))eco** — fotos jornalísticas de Mata Atlântica autênticas (ambiental)
- **Arquivo histórico IBGE / Fundação Catarinense de Cultura** — plantas Kantu/Spironello (mapeamento)

---

**Fim do brief.** Qualquer dúvida de escopo, consultar `src/lib/constants.ts` (conteúdo editorial por seção) e `src/components/ui/BackgroundCrossfade.tsx` (ordem e paths das imagens).
