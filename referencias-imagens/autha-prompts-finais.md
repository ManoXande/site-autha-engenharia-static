# Autha Engenharia — Prompts Finais de Geração de Imagens

> Documento único e consolidado com **todos os prompts prontos para uso** nas 7 seções do site.
> Inclui os novos conceitos para **Manifesto** (sem sequência tríptico) e **Regularização** (sem pessoa).
>
> Cada seção traz: análise crítica → imagem-base recomendada → prompt(s) → parâmetros.

---

## Convenções Globais

Adicione ao final de **todos os prompts**:

```
— cinematic dark-tech editorial photography, color grade with desaturated blues and warm golden accents, ARRI Alexa look, shallow depth of field where applicable, natural film grain, sRGB, 16:9 aspect ratio, ultra-detailed, photorealistic, 4k
```

### Negative prompt padrão (usar em todas)

```
lowres, blurry, pixelated, jpeg artifacts, cartoon, illustration, 3d render look, plastic skin, oversharpened, HDR halo, rainbow chromatic aberration, watermark, signature, text overlay, logo, stock photo feel, studio flash, fluorescent lighting, oversaturated colors, teal-orange filter, instagram filter, fisheye distortion, floating objects, extra fingers, deformed hands, blurred faces
```

### Parâmetros recomendados

| Gerador | Configuração |
|---|---|
| **Midjourney v6/v7** | `--ar 16:9 --style raw --stylize 150 --quality 2` |
| **Flux (Dev/Pro)** | `guidance: 3.5 – 4.5`, `steps: 30 – 50`, `ratio: 16:9` |
| **Nano Banana / Sora img+prompt** | usar imagem de referência listada + prompt principal |
| **DALL-E 3** | ratio 16:9, HD quality, estilo "natural" (não vivid) |

---

## 1. HERO — `hero-drone-cidade.jpg`

### Status do candidato atual

**babana/hero-drone-cidade.png** — ⭐⭐⭐⭐

O que acertou: drone profissional com hélices em motion blur, paisagem rural do Oeste SC, golden hour real, altitude calibrada (~250 m).  
O que ajustar: paleta ligeiramente quente demais para o overlay dark do site; céu com clouds dramáticos clichê; sem LED verde no drone.

### Imagem-base para img2img

- `babana/hero-drone-cidade.png` (estrutura aprovada)
- `base_cartografica_municipio_marema_autha.jpg` (ortofoto real de Marema/SC — referência de terreno autêntico)

### Prompt principal (EN)

```
Ultra-cinematic aerial photograph, high-end professional mapping drone 
(DJI Matrice 350 RTK with LiDAR payload, subtle green status LED glowing) 
hovering in the foreground slightly out of focus with motion-blurred rotors, 
shot from slightly above and behind the drone. Below: vast rolling countryside 
of southern Brazil (western Santa Catarina, Uruguay river basin), mixed rural 
terrain of green pastures and small cultivated fields, a silver winding river 
cutting through the valley, a small town with terracotta rooftops on the 
riverbank in the distance, atmospheric haze adding depth. Golden hour one 
hour before sunset, warm directional side light from the left, long cool 
shadows on the hills. Desaturated editorial color grade — cool blues in the 
shadows, restrained warm amber in the highlights, never orange-teal. 
Shot on ARRI Alexa with Zeiss Master Prime 50mm, shallow depth of field on 
drone foreground, sharp distant landscape, subtle film grain, 35mm 
documentary aesthetic, no lens flare, no dramatic cloud formations, 
clean pale sky with thin high clouds. 16:9, 4K.
```

### Variação urbana

Substituir "small town with terracotta rooftops" por "dense historic town grid with paved streets and a central square" para versão mais próxima ao centro de Chapecó.

---

## 2. MANIFESTO / QUEM SOMOS — `manifesto-authagraph.jpg`

> **Conceito atualizado:** sem sequência tríptico com três estágios competindo.
> O foco é um **único objeto central dominante** que carregue toda a narrativa da ruptura do AuthaGraph.
> Duas direções propostas — escolher uma.

---

### Direção A — Artefato de Museu (preferida)

**Conceito:** O modelo físico em papel dobrado do AuthaGraph fotografado como objeto de museu/design — materialidade que o render digital não tem, remete ao Narukawa que literalmente dobrou o globo com as mãos.

**Imagem-base:** `globo_desmontagem_authagraph.webp` — modelo real de Narukawa em papel azul-turquesa.

```
Minimal editorial still-life photograph of Hajime Narukawa's original 
AuthaGraph physical paper model — a single faceted polyhedral globe 
made of folded matte uncoated paper, pale cream-white with hand-inked 
continental shapes in deep navy blue, mid-unfolding to reveal its 
planar world-map face. Shot on a seamless dark charcoal matte surface, 
single directional window light from upper left creating dramatic 
chiaroscuro shadows that reveal every paper fold crease and texture. 
A few crisp fragments of the map's triangular faces have "peeled" 
open slightly, exposing the interior with latitude-longitude gridlines 
engraved in thin pencil. The overall composition: object in the 
right-center of frame, generous negative space to the left (for 
headline overlay). Subtle emerald-green rim light catching one edge 
of the unfolded face (#4ADE80, very restrained). Color palette: 
charcoal background, warm cream paper, navy ink, a single green accent. 
Shot on Hasselblad X2D with 90mm, f/4, medium depth of field — 
the near folds sharp, the back folds slightly soft. Fine film grain, 
no reflections on the surface. Japanese minimalism meets MIT Press 
monograph cover. No text, no labels, no digital effects, 16:9, 4K.
```

---

### Direção B — Geometria Arquitetônica Abstrata

**Conceito:** Estrutura tetrahedral em vidro ou metal escovado, de grandes proporções, fotografada em ambiente neutro — como uma escultura de atelier. A ruptura geométrica é visual e imediata sem precisar "explicar" o processo.

```
Architectural fine-art photograph of a large-scale tetrahedral geometric 
sculpture, approximately 80cm tall, constructed from thin dark steel 
rods forming a precise triangulated polyhedral skeleton — the faces 
left open, just the wireframe structure. Shot against a pure deep 
charcoal studio background (almost black), single raking directional 
light from the upper right creating clean sharp shadows of the 
triangular geometry projected across the background. A few of the 
faces are covered in thin translucent vellum paper printed with faint 
continental outlines (recognizable but abstract). Reflected in the 
matte black floor below: a ghost of the shape, barely visible. 
Thin emerald-green laser line grazes one edge (#4ADE80), the single 
color accent in the otherwise monochrome scene. Composition: 
sculpture centered-left, breathing room on the right for text overlay. 
Shot on Phase One IQ4 with 80mm, f/8 — everything tack sharp. 
Editorial architecture photography, Dezeen meets Wallpaper* magazine. 
No text, no labels, no people, 16:9, 4K.
```

---

## 3. MAPEAMENTO — `mapeamento-lidar-pointcloud.jpg`

### Status do candidato atual

**babana/mapeamento-lidar-pointcloud.png** — ⭐⭐⭐⭐⭐

Ortofoto rural + planta cadastral 1954 "Gleba Jacuí" sobreposta, rosa-dos-ventos, papel envelhecido, coordenadas UTM. Quase perfeito.  
Ajustes: integração das camadas mais orgânica; trocar nome "Jacuí" por nome local do Oeste SC; vinheting da borda menos pesado.

### Imagens-base para img2img

- `babana/mapeamento-lidar-pointcloud.png` (estrutura)
- `mapa_colonial_lotes_originais.jpg` — mapa colonial autêntico da Autha: papel amarelado, lotes 9/10/23–32, anotações manuscritas "484.000"/"471.000" a tinta. **Referência ouro de textura.**
- `mapa_divisas_coloniais_tracados_originais.png` — ortofoto com divisas coloniais vermelhas.

### Prompt principal (EN)

```
Top-down composite cartographic image merging two layers as a single 
photographic plate: bottom layer is a high-resolution aerial orthomosaic 
of rural southwestern Santa Catarina, Brazil — winding Chapecozinho river, 
irregular colonial farmland parcels, unpaved red-earth roads, scattered 
farmhouses with metal roofs, soft morning light, desaturated greens and 
earth tones. Top layer is a translucent aged 1940s Brazilian surveyor's 
cadastral plan printed on heavily yellowed paper with handwritten ink 
annotations: lot numbers inside circles (9, 10, 23, 24, 25, 26, 29, 30, 
31, 32), plot areas handwritten in Portuguese ("484.000", "471.000", 
"242.000"), thin black ink borders tracing parcel divisions, a compass 
rose labeled "N" in the upper right, a small cartouche at bottom reading 
"GLEBA ÁGUAS DE CHAPECÓ · 1954 · 1:10.000". Thin UTM grid coordinates 
along the edges ("N 6.985.432", "E 356.221"). The two layers are 
organically fused — the paper map is semi-transparent, letting the 
ortho photo show through where the parcel divisions cross the river and 
the roads. Aged paper texture with subtle creases and foxing, not heavy 
grunge. Mild dark vignette on extreme corners only. Editorial cartography 
monograph aesthetic, muted sepia-green palette, no heavy filters, 16:9, 4K.
```

### Alternativa sem IA

Usar `mapa_colonial_lotes_originais.jpg` como textura no Photoshop em blend mode **Multiply a 55%** sobre ortofoto real. Resultado mais autêntico do que qualquer gerador.

---

## 4. REGULARIZAÇÃO FUNDIÁRIA — `regularizacao-golden-hour.jpg`

> **Conceito atualizado:** sem pessoa em cena.
> Três direções propostas — escolher uma.

---

### Direção A — Still-life de Documento + Planta (preferida)

**Conceito:** Escritura original e planta REURB sobre mesa de madeira rústica em golden hour. A dignidade do imóvel regularizado transmitida pelos documentos, não pela pessoa.

```
Close-up editorial still-life photograph shot on a weathered reclaimed 
wood table in warm golden-hour sunlight streaming through a window. 
On the table: an official Brazilian property deed document 
("ESCRITURA PÚBLICA DE COMPRA E VENDA") with crisp visible text, 
a red wax notary seal with embossed brass stamp beside it, and 
an unrolled A3 REURB cadastral survey map showing clearly drawn 
lot boundaries with "LOTE 12 · 483,50 m²" and neighboring lot 
numbers labeled in clean drafting font. A worn leather pencil case, 
one wooden pencil, and a vintage brass compass rest on top of the 
map corner — real surveyor's tools, not decorative. 
Warm amber afternoon light raking across the documents, catching 
the texture of the uncoated drafting paper. Generous dark shadow 
on the right side of the frame (space for headline overlay). 
No hands in frame. Color palette: warm amber, cream paper, dark wood, 
one emerald accent (a single green sticky tab on the deed). 
Shot on Hasselblad H6D with 100mm macro, f/5.6, 
slightly shallow — documents sharp, wood texture softly rendered. 
Fine film grain, Kinfolk meets documentary aesthetic. 
No people, no screens, no text in Portuguese that is garbled or 
mistyped. 16:9, 4K.
```

---

### Direção B — Vista Aérea com Sobreposição REURB

**Conceito:** Ortofoto de loteamento periurbano real com as linhas de regularização sobrepostas — mostra o resultado do processo antes/depois de forma imediata.

```
Top-down aerial composite photograph showing a peri-urban Brazilian 
neighborhood at approximately 80 meters altitude: a grid of modest 
single-story houses with mixed red-tile and metal rooftops, small 
yards with fruit trees and gardens, unpaved reddish-earth streets, 
soft morning light from the left. Overlaid semi-transparently on top 
is a precise REURB cadastral regularization plan: thin bright white 
lot boundary lines defining each parcel, lot numbers in small clean 
sans-serif typography ("L-04", "L-05", "L-06"...), 
a street label ("RUA SETE DE SETEMBRO"), a north arrow in the 
upper right. The overlay is clean vector-style, not hand-drawn. 
Where the new boundary lines diverge from the existing fences 
(showing the actual vs. registered discrepancy), the divergence 
is highlighted with a thin emerald-green #4ADE80 line. 
Color palette: warm earth-greens aerial photo, white/emerald overlay 
lines on dark-translucent plan layer. Editorial GIS/cartography 
aesthetic, no people visible, no cars with faces, 16:9, 4K.
```

---

### Direção C — Marco Geodésico / Piquete de Topografia

**Conceito:** Close extremo em um piquete de madeira cravado no solo com fita métrica ao lado e solo vermelho de SC — símbolo visual limpo e autêntico do trabalho fundiário.

```
Macro editorial photograph of a traditional Brazilian surveying 
reference stake — a sharp-pointed hardwood piquete (wooden stake) 
driven firmly into red-earth clay soil, with a small metal 
identification tag engraved "LOTE 12 · M-07" attached with rusted 
wire, and a partially unrolled yellow fiberglass surveying tape 
measure resting coiled at its base. The surrounding soil shows 
boot tread marks and raw excavation texture. Camera low and close 
(10cm from ground), slight upward angle, stake centered and sharp, 
background an extreme close-up of wild grass blades and red earth 
going soft. Late afternoon golden hour light illuminating the stake 
from the left, warm amber glow on the wood grain, long thin shadow. 
One emerald-green surveying prism reflector resting against the stake 
base adds brand color. Color palette: red earth, warm blonde wood, 
oxidized metal, emerald accent. Shot on Canon R5 with 100mm macro, 
f/2.8. Intimate, documentary, no people, no text except the small tag. 
16:9, 4K.
```

---

## 5. ASSISTÊNCIA TÉCNICA E PERÍCIAS — `assistencia-pericia-mapa.jpg`

### Status do candidato atual

**babana/assistencia-pericia-mapa.png** — ⭐⭐⭐⭐

Aperto de mão sobre mesa com planta cadastral, estante de livros técnicos ao fundo, luz natural de janela — tom de arbitragem técnica, não tribunal.  
Ajustes: planta na mesa está em inglês ("CADASTRAL MAP · PLOT MB") — precisa ser em português; lombadas dos livros em PT-BR.

### Imagens-base para img2img

- `babana/assistencia-pericia-mapa.png` (composição)
- `foto_mapa_original_loteamento.jpg` (planta real em português para referência)

### Prompt principal (EN)

```
Close-up documentary photograph of two professionals reaching across a 
warm oak wood meeting table for a firm respectful handshake — on the 
left a distinguished silver-haired man in his 60s wearing a dark navy 
blazer over a light shirt, on the right a mid-30s woman in a forest-green 
knit sweater with a plain silver ring, hands centered in frame. Between 
them on the table lies an unfolded Brazilian technical cadastral survey 
plan printed on large A1 paper, titled in Portuguese 
"PLANTA CADASTRAL · LOTEAMENTO SÃO PEDRO · ESCALA 1:500", 
showing labeled lot boundaries, street names (RUA SÃO JOÃO, RUA 
SETE DE SETEMBRO), dimensions in meters. Soft natural light streaming 
from a window on the left, warm window-glow on the wooden surface. 
Background out of focus: tall wooden bookshelf with Portuguese-titled 
technical and legal books (spines reading "Direito Imobiliário", 
"Código Civil", "Topografia", "Registro de Imóveis", "Cadastro Urbano"), 
brass binders, a small green plant. Amber and earth-tone color palette, 
editorial documentary style, shot on Sony A7R IV with 35mm f/1.4, 
shallow depth of field on hands and plan, soft film grain, 
Kinfolk meets Monocle aesthetic. No courtroom elements, no gavel, 
no suit-and-tie business formality, 16:9, 4K.
```

---

## 6. INFRAESTRUTURA E BIM — `infraestrutura-bim-lidar.jpg`

### Status do candidato atual

**babana/infraestrutura-bim-lidar.png** — ⭐⭐⭐⭐⭐

Engenheiro em obra rodoviária, capacete branco, colete laranja, tablet com overlay BIM, escavadeira Caterpillar e motoniveladora ao fundo, golden hour, poeira no ar.  
Ajustes: overlay no tablet deve ser verde-esmeralda (#4ADE80), não amarelo; sol descentralizado; capacete sem texto ou com "AUTHA".

### Imagens-base para img2img

- `babana/infraestrutura-bim-lidar.png` (composição)
- `modelo_3d_terraplenagem_via_atacadista_efapi.png` — modelo BIM real da Autha com wireframe verde
- `modelo_3d_terraplenagem_loris_bigolin.png` — modelo 3D em verde-menta

### Prompt principal (EN)

```
Documentary on-site portrait of an experienced Brazilian civil engineer 
in his mid-40s, athletic build, dark hair, short salt-and-pepper beard, 
wearing a clean white hard hat without large logos, an orange high-visibility 
reflective vest over a dark technical polo shirt, work jeans and leather 
boots. He stands confidently on a freshly graded earthworks construction 
site (southern Brazil highway project), holding a rugged field tablet 
displaying a vivid 3D BIM cut-and-fill earthworks model rendered in 
emerald green wireframe lines on dark background (#4ADE80, not yellow, 
not blue). Behind him in atmospheric dust and soft backlight: a yellow 
Caterpillar excavator on the left and a motor grader on the right, 
small figures of workers in reflective vests far in the background. 
Late afternoon golden hour, low sun side-lit from the right 
(not centered behind him), warm dust particles catching the light, 
long soft shadows. Medium shot, slight low camera angle conveying quiet 
authority, sharp focus on engineer and tablet screen. Desaturated 
earth-amber palette with controlled emerald accent only on tablet screen. 
Shot on Canon R5 with 35mm f/1.4, editorial construction photography, 
Edward Burtynsky-meets-documentary style, natural film grain, no lens 
flare starbursts, no stock-photo thumbs-up pose, 16:9, 4K.
```

---

## 7. INTELIGÊNCIA AMBIENTAL — `ambiental-mata-atlantica.jpg`

### Status do candidato atual

**babana/ambiental-mata-atlantica.png** — ⭐⭐⭐⭐⭐

Vista aérea de Araucárias (formato guarda-chuva reconhecível), rio serpenteando, névoa matinal, transição para pastagem no canto. Bioma autêntico de SC.  
Ajuste: regerar em 4K; névoa mais presente na meia-distância; contraste mata preservada × pastagem mais evidente.

### Imagem-base para img2img

- `babana/ambiental-mata-atlantica.png` (composição final aprovada)

### Prompt principal (EN)

```
Ultra-high-resolution aerial drone photograph captured at approximately 
150 meters altitude over pristine Araucaria angustifolia forest 
(Floresta Ombrófila Mista) in southern Brazil (Santa Catarina or 
Rio Grande do Sul). Iconic umbrella-shaped Paraná pine canopies rising 
distinctly above the denser green mid-canopy, a narrow meandering dark 
river cutting diagonally across the frame reflecting the pale sky. 
Low morning mist drifting between the trees in the middle distance, 
adding atmospheric depth. Early golden hour just after sunrise, warm 
directional light from the upper right creating long soft shadows 
through the canopy. On the left edge of the frame, a subtle but 
clearly visible transition from the dense preserved forest to a managed 
rural pasture (soft green grazing land, one distant cattle herd), 
illustrating the contrast between ecological vocation and anthropic use. 
In the far background, rolling hills of the Serra Catarinense. 
Naturalistic color grade — deep greens, amber highlights, cool teal 
shadows — never oversaturated. Shot on DJI Mavic 3 Pro with Hasselblad 
sensor, f/4, sharp throughout. Editorial environmental photography, 
Ramon Pereira meets National Geographic aesthetic. No visible human 
infrastructure within the forest, no buildings, no roads, no powerlines, 
no wildlife in focus. 16:9, 4K.
```

---

## Checklist de Pós-Processamento

Antes de mover qualquer imagem para o projeto:

- [ ] Exportar em `.jpg` qualidade **82–88** (não 100 — não compensa o peso)
- [ ] Redimensionar para **2560 × 1440** mínimo ou **3840 × 2160** ideal
- [ ] Perfil de cor **sRGB**, 8 bits
- [ ] **Teste de overlay:** colocar layer preto 75% opacity por cima no Photoshop — imagem ainda legível? Se não → rejeitar e regenerar
- [ ] Reduzir saturação global em **10%** (o verde de marca #4ADE80 somado a imagem colorida polui)
- [ ] **Shadows –15** no Lightroom para ganhar o "crush" de sombra típico do Cinematic Dark Tech
- [ ] Nome de arquivo exatamente conforme o cabeçalho de cada seção (o código busca por esse path literal)
- [ ] Mover para: `site-autha-engenharia/public/images/sections/`

---

## Matriz de Status e Decisão

| Seção | Arquivo final | Candidato | Ação |
|---|---|---|---|
| Hero | `hero-drone-cidade.jpg` | ⭐⭐⭐⭐ | Regerar com paleta mais fria (prompt acima) |
| Manifesto | `manifesto-authagraph.jpg` | ⭐⭐⭐ | **Novo conceito** — escolher Dir. A ou Dir. B |
| Mapeamento | `mapeamento-lidar-pointcloud.jpg` | ⭐⭐⭐⭐⭐ | Ajuste Photoshop (blend colonial map) ou regeneração pequena |
| Regularização | `regularizacao-golden-hour.jpg` | ⭐⭐⭐⭐⭐ | **Novo conceito sem pessoa** — escolher Dir. A, B ou C |
| Assistência | `assistencia-pericia-mapa.jpg` | ⭐⭐⭐⭐ | Regerar com planta em português |
| Infraestrutura | `infraestrutura-bim-lidar.jpg` | ⭐⭐⭐⭐⭐ | Regerar com overlay verde no tablet |
| Ambiental | `ambiental-mata-atlantica.jpg` | ⭐⭐⭐⭐⭐ | Upscale 4K (Topaz Gigapixel AI) |

**Tempo estimado total:** ~4h de geração + curadoria para ter as 7 imagens finais prontas.

---

## OG-Image (compartilhamento social)

**Path:** `public/images/og-image.jpg`  
**Resolução:** 1200 × 630 (Open Graph padrão)

Recortar o hero final horizontalmente centralizado — drone no primeiro plano à esquerda, paisagem à direita. Adicionar em Photoshop o logotipo Autha sutil no canto inferior direito (branco, 60% opacity).

---

*Todos os prompts escritos em inglês para máxima compatibilidade com Midjourney, Flux, Sora e DALL-E 3.*  
*Negative prompt e sufixo global devem ser adicionados a cada geração sem exceção.*
