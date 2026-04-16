import type { ImpactStat, NavItem, ServiceSectionData } from "@/types";

export const COMPANY = {
  name: "Autha Engenharia e Mapeamento",
  legalName: "Autha Engenharia e Agrimensura Ltda",
  cnpj: "38.489.344/0001-89",
  slogan: "Engenharia de Precisão Guiada pela Sua Perspectiva",
  tagline: "Mapear melhor é decidir melhor",
  whatsapp: "(49) 99971-9388",
  whatsappLink: "https://wa.me/5549999719388",
  email: "authamapeamento@gmail.com",
  instagram: "@authamap",
  instagramLink: "https://instagram.com/authamap",
  address: "Av. Fernando Machado, 703-D, Sala 01, Centro",
  city: "Chapecó, SC",
  cep: "89802-111",
  siteUrl: "https://autha.com.br",
  founding: "2020",
} as const;

export const NAV_ITEMS: NavItem[] = [
  { label: "Início", href: "#hero" },
  { label: "Serviços", href: "#mapeamento" },
  { label: "Contato", href: "#contato" },
];

export const IMPACT_STATS: ImpactStat[] = [
  { value: 107, suffix: "+", label: "Projetos em andamento", format: "number" },
  { value: 24, suffix: "", label: "Municípios mapeados", format: "number" },
  { value: 50000, suffix: " ha", label: "Hectares mapeados por drone", format: "area" },
  { value: 15, suffix: " M+", prefix: "R$ ", label: "em deságios ambientais recuperados", format: "currency" },
];

export const SERVICES: ServiceSectionData[] = [
  {
    id: "mapeamento",
    eyebrow: "CARTOGRAFIA",
    sectionIndex: 4,
    backgroundImage: "/images/sections/mapeamento-lidar-pointcloud.jpg",
    backgroundAlt:
      "Nuvem de pontos LiDAR em gradiente azul-verde representando digitalização 3D",
    objectPosition: "center center",
    label: "Mapeamento e Cartografia",
    headline:
      "Da aerofotogrametria à base cartográfica validada — com rastreabilidade estatística.",
    lead: "Levantamentos centimétricos com drones e LiDAR processados pelo AuthaGrid — software proprietário de validação estatística sem viés. Cada base cartográfica é juridicamente defensável e tecnicamente rastreável, do campo à entrega.",
    features: [
      {
        icon: "lidar",
        title: "Bases para Gestão Territorial Municipal",
        description:
          "Cartografia de precisão para o Cadastro Imobiliário Brasileiro — maior acurácia cadastral, organização territorial e SIG integrado para gestão imobiliária central e controle patrimonial municipal.",
      },
      {
        icon: "map",
        title: "Ocupação Real vs. Planta Original",
        description:
          "Levantamentos que confrontam a situação existente com o projeto aprovado — identificando sobreposições de terreno, avanços de divisa e irregularidades de ocupação antes que se tornem litígio.",
      },
      {
        icon: "authagrid",
        title: "AuthaGrid — Validação Estatística Sem Viés",
        description:
          "Software proprietário com 7 algoritmos de Machine Learning. Cruza medições de campo com base histórica e elimina interferência humana no resultado — imparcial, auditável, defensável.",
      },
    ],
    proof: { metric: "50K+ ha", label: "mapeados com precisão centimétrica em todo o Brasil" },
    cta: { text: "Quero um mapeamento técnico", href: "https://wa.me/5549999719388" },
    layoutReverse: true,
    mood: "tech",
    imageRevealDirection: "left",
    whatsappMessage: "Olá! Gostaria de saber mais sobre Mapeamento e Cartografia.",
  },
  {
    id: "regularizacao",
    eyebrow: "FUNDIÁRIO",
    sectionIndex: 5,
    backgroundImage: "/images/sections/regularizacao-golden-hour.jpg",
    backgroundAlt:
      "Propriedade rural em golden hour com equipe Autha realizando levantamento topográfico",
    objectPosition: "center 40%",
    label: "Regularização e Parcelamento de Imóveis",
    headline:
      "Da gleba irregular ao lote registrado — processo completo, equipe única.",
    lead: "A Autha conduz regularização fundiária e parcelamento de solo do campo ao cartório — loteamento, desmembramento, REURB e titulação com engenharia, jurídico e ambiental em fluxo integrado. Você entrega o problema. Nós devolvemos cada lote com matrícula no seu nome.",
    features: [
      {
        icon: "cycle",
        title: "Loteamento e Desmembramento",
        description:
          "Projetos técnicos de loteamento, desmembramento e remembramento com aprovação municipal. Urbanismo, quadro de áreas e infraestrutura mínima conforme Lei 6.766/79.",
      },
      {
        icon: "integrate",
        title: "Regularização Fundiária Plena",
        description:
          "REURB-S e REURB-E: levantamento, planta de regularização, CRF e averbação. Adequação ambiental integrada ao fluxo — campo, prefeitura e cartório sob uma única equipe.",
      },
      {
        icon: "result",
        title: "Matrícula Individual por Lote",
        description:
          "O resultado é concreto: cada lote com matrícula própria registrada em cartório. Não relatório, não projeto aprovado — o imóvel no seu nome, pronto para alienar.",
      },
    ],
    proof: { metric: "107+", label: "projetos de regularização e parcelamento em andamento" },
    cta: { text: "Quero regularizar ou parcelar minha área", href: "https://wa.me/5549999719388" },
    layoutReverse: false,
    mood: "warm",
    imageRevealDirection: "up",
    whatsappMessage: "Olá! Gostaria de saber mais sobre Regularização Fundiária e Parcelamento de Solo.",
  },
  {
    id: "assistencia",
    eyebrow: "PERÍCIA",
    sectionIndex: 6,
    backgroundImage: "/images/sections/assistencia-pericia-mapa.jpg",
    backgroundAlt: "Engenheiro analisando mapa técnico — assistência técnica Autha",
    objectPosition: "center 35%",
    label: "Assistência Técnica e Perícias",
    headline:
      "Prova técnica que fortalece tese — não que apenas descreve o terreno.",
    lead: "Atuação técnica especializada em litígios territoriais. Laudos, pareceres e suporte pericial estruturados para fortalecer a defesa jurídica.",
    features: [
      {
        icon: "legal",
        title: "Suporte Técnico Processual",
        description:
          "Quesitos periciais, laudos conclusivos, notas de resposta. Acompanhamento durante todo o rito.",
      },
      {
        icon: "history",
        title: "Reconstrução Cartográfica Histórica",
        description:
          "Provas a partir de documentos coloniais, mapas antigos e levantamentos históricos.",
      },
      {
        icon: "handshake",
        title: "Negociação e Acordos Diretos",
        description:
          "Saneamento de irregularidades sem judicialização. Arbitragem com agilidade técnica.",
      },
    ],
    proof: { metric: "AuthaGrid", label: "7 algoritmos ML para reconstituição imparcial" },
    cta: { text: "Falar com a equipe técnica", href: "https://wa.me/5549999719388" },
    layoutReverse: false,
    mood: "authority",
    imageRevealDirection: "right",
    whatsappMessage: "Olá! Gostaria de saber mais sobre Assistência Técnica e Perícias.",
  },
  {
    id: "infraestrutura",
    eyebrow: "INFRAESTRUTURA",
    sectionIndex: 7,
    backgroundImage: "/images/sections/infraestrutura-bim-lidar.jpg",
    backgroundAlt:
      "Nuvem de pontos LiDAR sobre infraestrutura urbana — projeto BIM Autha",
    objectPosition: "center 50%",
    label: "Infraestrutura e BIM",
    headline: "Cada decisão de obra calculada antes da mobilização.",
    lead: "Quando a terraplenagem deixa de ser feita no 'olho' e passa a ser conduzida com projeto executivo, BIM e LiDAR de alta precisão, a obra ataca onde mais perde dinheiro: o retrabalho representa ~5% do gasto total do setor, e 48% dele vem de dados ruins. Resultados documentados: redução de 2,12% direta no custo de terraplanagem e ROI de 32% com modelos 3D.",
    features: [
      {
        icon: "road",
        title: "Terraplenagem e Rodovias",
        description:
          "Varredura LiDAR e BIM geram MDT de alta densidade. Volumes otimizados antes da mobilização — economia potencial de 5% a 10% no custo de terraplanagem.",
      },
      {
        icon: "water",
        title: "Drenagem Urbana",
        description:
          "Planos Diretores com simulações baseadas em dados reais de campo. Menos change orders, mais previsibilidade de prazo e orçamento.",
      },
      {
        icon: "precision",
        title: "Menos Retrabalho, Mais Controle",
        description:
          "48% do retrabalho em obras vem de dados ruins. Gêmeos digitais e projeto executivo eliminam a imprecisão antes da mobilização.",
      },
    ],
    proof: { metric: "32% ROI", label: "documentado em projetos com modelo BIM 3D — menos change orders, mais previsibilidade" },
    cta: { text: "Solicitar diagnóstico de obra", href: "https://wa.me/5549999719388" },
    layoutReverse: true,
    mood: "power",
    imageRevealDirection: "left",
    whatsappMessage: "Olá! Gostaria de saber mais sobre Infraestrutura e BIM.",
  },
  {
    id: "ambiental",
    eyebrow: "AMBIENTAL",
    sectionIndex: 8,
    backgroundImage: "/images/sections/ambiental-mata-atlantica.jpg",
    backgroundAlt:
      "Mata Atlântica com vegetação exuberante — análise ambiental Autha",
    objectPosition: "center 30%",
    label: "Inteligência Ambiental",
    headline:
      "A real vocação do solo revelada com rigor — não com suposição.",
    lead: "Cruzamento de dados topográficos, geológicos e hídricos para determinar com precisão a natureza real de APPs, nascentes e áreas de preservação.",
    features: [
      {
        icon: "analysis",
        title: "Diagnóstico Multidisciplinar",
        description:
          "Topografia + geologia + hidrologia para determinar a real vocação de cada porção do solo.",
      },
      {
        icon: "embargo",
        title: "Saneamento de Embargos",
        description:
          "Revisão de laudos mal fundamentados, identificando falhas para restabelecer a verdade.",
      },
      {
        icon: "legal-nature",
        title: "Segurança Jurídica Ambiental",
        description:
          "Rigor da agrimensura unido à legislação ambiental para definir perímetros reais.",
      },
    ],
    proof: { metric: "R$ 15M+", label: "recuperados em deságio ambiental" },
    cta: { text: "Agendar análise ambiental", href: "https://wa.me/5549999719388" },
    layoutReverse: false,
    mood: "nature",
    imageRevealDirection: "up",
    whatsappMessage: "Olá! Gostaria de saber mais sobre Inteligência Ambiental.",
  },
];

export const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da Autha Engenharia e gostaria de saber mais sobre os serviços.";

export const SECTION_NAMES: Record<string, string> = {
  hero: "Início",
  manifesto: "Manifesto",
  impacto: "Impacto",
  regularizacao: "Regularização",
  mapeamento: "Mapeamento",
  assistencia: "Assistência",
  infraestrutura: "Infraestrutura",
  ambiental: "Ambiental",
  contato: "Contato",
};
