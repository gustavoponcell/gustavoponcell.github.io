/*
 * Conteúdo do portfólio.
 * Tudo o que se repete (projetos, galerias, competências) vive aqui para facilitar a manutenção:
 * edite os textos/imagens neste arquivo e rode `npm run build`.
 * Regra: nada inventado. Cada item aponta para a fonte verificável (repositório, Behance ou currículo).
 */

export const contacts = {
  whatsappDisplay: '(38) 99724-1391',
  whatsapp: 'https://wa.me/5538997241391',
  email: 'gustavo.poncell40@gmail.com',
  github: 'https://github.com/gustavoponcell',
  behance: 'https://www.behance.net/gustavoponcell',
  instagram: 'https://www.instagram.com/poncell.webp/',
};

/* ------------------------------------------------------------------ */
/* 03 — Projetos de desenvolvimento em destaque                         */
/* ------------------------------------------------------------------ */
export const devProjects = [
  {
    id: 'ana-cleide',
    code: 'P.01',
    name: 'Ana Cleide Imóveis',
    kind: 'Site público + painel de gestão da corretora',
    client: 'Cliente real · Diamantina/MG',
    year: '2026',
    status: { label: 'Interface aprovada · backend em implantação', tone: 'live' },
    problem:
      'Uma corretora que trabalha sozinha precisava vender imóveis urbanos, chácaras e propriedades rurais pela internet — e organizar propriedades, interessados, negociações e visitas sem depender de planilhas.',
    features: [
      'Dashboard com indicadores por período (7, 30, 90 dias), funil de vendas e ranking de imóveis com mais interesse',
      'Gestão de interessados com retornos vencidos e atalho direto para o WhatsApp',
      'Negociações em quadro kanban por etapa, agenda de visitas e ficha completa de cada imóvel',
      'Cadastro com campos específicos por categoria (urbano, chácara, rural)',
      'Backend serverless: API em Cloudflare Pages Functions, banco SQL D1, arquivos no R2 e painel protegido por Cloudflare Access',
      'Backup semanal automático do banco com rotação das cópias (em revisão final)',
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'React Router', 'Cloudflare Pages + Functions', 'D1 (SQL)', 'R2', 'Cloudflare Access', 'Playwright', 'node:test'],
    role: 'Projeto individual, do levantamento de requisitos ao deploy — 108 commits, todos de minha autoria. Protótipo navegável aprovado pela cliente sem ajustes (out/2026).',
    fit: {
      ong: 'O mesmo modelo de painel — indicadores, funil e cadastros relacionados — atende doações, voluntários e beneficiários.',
      cond: 'Agenda, histórico por registro e área administrativa restrita são a base de um controle de acesso.',
    },
    note: 'Telas do painel com dados demonstrativos. Repositório privado (projeto de cliente).',
    links: [],
    shots: [
      { src: 'img/dev/ana-dashboard-top.webp', full: 'img/dev/ana-dashboard.webp', label: 'Visão geral', url: 'painel/visao-geral' },
      { src: 'img/dev/ana-negociacoes.webp', label: 'Negociações', url: 'painel/negociacoes' },
      { src: 'img/dev/ana-interessados.webp', label: 'Interessados', url: 'painel/interessados' },
      { src: 'img/dev/ana-propriedades.webp', label: 'Propriedades', url: 'painel/propriedades' },
      { src: 'img/dev/ana-site.webp', label: 'Site público', url: 'site/inicio' },
    ],
    mobile: { src: 'img/dev/ana-mobile.webp', label: 'Painel no celular' },
  },
  {
    id: 'clinicagenda',
    code: 'P.02',
    name: 'ClinicAgenda',
    kind: 'Agendamento de consultas com área do paciente e painel administrativo',
    client: 'Projeto autoral',
    year: '2026',
    status: { label: 'Protótipo funcional · front + API integrados', tone: 'proto' },
    problem:
      'Clínicas precisam marcar consultas sem conflito de horário e dar a cada pessoa — paciente, recepção e administração — apenas o acesso que lhe cabe, com rastro de tudo o que muda.',
    features: [
      'Login com JWT e três perfis: paciente, recepcionista e administrador; senhas com hash (bcrypt)',
      'Regra de conflito de agenda validada no servidor; horários liberados após cancelamento',
      'Trilha de auditoria (AuditLog) consultável no painel, com filtros por período',
      'Profissionais são desativados, não apagados — o histórico é preservado',
      'Gestão de horários de atendimento e bloqueio de datas',
      'Relatórios por período e por profissional, com gráficos',
    ],
    stack: ['React 18', 'TypeScript', 'React Router 7', 'Tailwind CSS 4', 'Recharts', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'JWT', 'bcrypt', 'Zod'],
    role: 'Desenvolvimento individual. Interface iniciada no Figma Make e reestruturada em React; API em camadas (rotas → controllers → services → repositories).',
    fit: {
      ong: 'Perfis por função (coordenação, voluntário, financeiro) e auditoria de alterações para prestação de contas.',
      cond: 'É o núcleo de um controle de acesso: papéis distintos, regras no servidor e registro imutável do que aconteceu.',
    },
    note: 'Telas capturadas com o sistema rodando localmente, API real e dados de exemplo do próprio projeto.',
    links: [{ label: 'Repositório', href: 'https://github.com/gustavoponcell/ClinicAgenda' }],
    shots: [
      { src: 'img/dev/clinic-dashboard.webp', label: 'Dashboard', url: 'admin/dashboard' },
      { src: 'img/dev/clinic-funcionarios.webp', label: 'Perfis de acesso', url: 'admin/funcionarios' },
      { src: 'img/dev/clinic-historico.webp', label: 'Auditoria', url: 'admin/historico' },
      { src: 'img/dev/clinic-relatorios.webp', label: 'Relatórios', url: 'admin/relatorios' },
      { src: 'img/dev/clinic-horarios.webp', label: 'Horários', url: 'admin/horarios' },
      { src: 'img/dev/clinic-landing.webp', label: 'Área pública', url: '/' },
    ],
  },
  {
    id: 'adriano',
    code: 'P.03',
    name: 'Adriano Azevedo Imóveis',
    kind: 'Plataforma imobiliária: site público + painel do corretor',
    client: 'Cliente real · contrato em andamento',
    year: '2026',
    status: { label: 'Em desenvolvimento', tone: 'dev' },
    problem:
      'Um corretor precisava publicar e retirar imóveis sozinho, receber contatos e anúncios de proprietários com segurança — sem nunca publicar nada sem revisão.',
    features: [
      'Monorepo com site, painel e pacote de dados compartilhado',
      'Catálogo com busca, filtros, ordenação e páginas com URL própria',
      'Painel separado do site, com cada rota da API protegida por middleware que valida a identidade (JWT do Cloudflare Access)',
      'Regra de moderação no escopo: anúncios e fotos de proprietários só vão ao ar após revisão',
      'D1 como fonte de verdade e R2 para fotos; testes de integração do CRUD',
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS 4', 'Cloudflare Pages Functions', 'D1', 'R2', 'Cloudflare Access', 'jose (JWT)'],
    role: 'Responsável técnico pelo projeto — arquitetura, especificação, implementação e testes. 163 commits, todos de minha autoria.',
    fit: {
      ong: 'Formulários públicos com moderação servem para inscrição de voluntários e solicitações de atendimento.',
      cond: 'Separação clara entre área pública e painel restrito, com autorização verificada em cada requisição.',
    },
    note: 'Repositório privado (projeto de cliente). Painel ainda em construção — por isso as telas mostram o site.',
    links: [],
    shots: [
      { src: 'img/dev/adriano-home.webp', label: 'Início', url: 'site/inicio' },
      { src: 'img/dev/adriano-imovel.webp', label: 'Imóvel', url: 'site/imovel' },
    ],
    mobile: { src: 'img/dev/adriano-mobile.webp', label: 'Site no celular' },
  },
];

/* ------------------------------------------------------------------ */
/* 03 — Arquivo (outros repositórios analisados)                        */
/* ------------------------------------------------------------------ */
export const archive = [
  {
    name: 'RentalManager',
    what: 'App desktop de gestão de locações: estoque por data, pedidos, agenda, financeiro com gráficos e tema claro/escuro',
    stack: 'Python · SQLite · PyInstaller',
    status: 'Funcional',
    href: 'https://github.com/gustavoponcell/sistema_de_aluguel',
  },
  {
    name: 'Portfólio CMS',
    what: 'Portfólio com painel administrativo, login, upload de imagens e projetos sincronizados com a API do GitHub',
    stack: 'Next.js · TypeScript · Supabase (PostgreSQL)',
    status: 'Deploy desativado',
    href: 'https://github.com/gustavoponcell/portifolio',
  },
  {
    name: 'Barbearia',
    what: 'Gestão de barbearia: cadastros, agenda, estoque e finanças; CPF armazenado apenas como hash',
    stack: 'Java 17 · Maven · Gson',
    status: 'Acadêmico',
    href: 'https://github.com/gustavoponcell/Barbearia',
  },
  {
    name: 'Oficina Mecânica',
    what: 'Gestão de oficina com login de administrador, POO e estruturas de dados',
    stack: 'Java · Maven',
    status: 'Acadêmico',
    href: 'https://github.com/gustavoponcell/oficina',
  },
  {
    name: 'Rota de Bares',
    what: 'Roteirização otimizada com dados abertos do OpenStreetMap e solvers de caixeiro-viajante',
    stack: 'Python · OR-Tools · Streamlit',
    status: 'Experimento',
    href: 'https://github.com/gustavoponcell/rotadebares',
  },
  {
    name: 'Aurora Wumpus',
    what: 'Agente inteligente com base de conhecimento, inferência lógica e interface gráfica',
    stack: 'Python · Pygame · pytest',
    status: 'Acadêmico',
    href: 'https://github.com/gustavoponcell/aurora-wumpus-ai',
  },
];

/* ------------------------------------------------------------------ */
/* 04 — Design (Behance)                                                */
/* ------------------------------------------------------------------ */
export const designProjects = [
  {
    id: 'lacap',
    code: 'D.01',
    name: 'LACAP',
    full: 'Lagartos, Anuros, Cobras, Aventura e Pesquisa',
    kind: 'Identidade visual · manual de marca',
    year: '2025',
    tools: 'Photoshop · Illustrator · Canva',
    text: 'Identidade para um projeto de pesquisa de campo no Vale do Jequitinhonha: um sapo com chapéu de palha e binóculo, em traço de gravura científica. O manual organiza logo, versão negativa, tipografia, paleta, textura e modelos para o Instagram.',
    href: 'https://www.behance.net/gallery/233830183/Lacap-Lagartos-Anuros-Cobras-Aventura-e-Pesquisa',
    tone: 'olive',
    images: [
      ['lacap-01', 'Capa — assinatura LACAP'],
      ['lacap-04', 'Logo principal'],
      ['lacap-05', 'Logo negativa'],
      ['lacap-07', 'Tipografia display'],
      ['lacap-08', 'Tipografia de apoio'],
      ['lacap-10', 'Paleta de cores'],
      ['lacap-11', 'Textura'],
      ['lacap-13', 'Modelos para o feed'],
      ['lacap-14', 'Avatares e ícones'],
    ],
  },
  {
    id: 'bacanal',
    code: 'D.02',
    name: 'Bacanal da Dionísio’s',
    full: '2ª edição · evento universitário',
    kind: 'Direção criativa · identidade · campanha',
    year: '2025',
    tools: 'Photoshop · Illustrator',
    text: 'Evento idealizado, planejado e dirigido por mim — como designer, diretor criativo e organizador — para uma república tradicional de Diamantina. Identidade mitológica, peças de divulgação e coordenação com parceiros e patrocinadores.',
    metrics: [
      ['130 mil', 'contas alcançadas'],
      ['+500%', 'visitas ao perfil'],
      ['2,1 mil', 'seguidores'],
      ['7–11 mil', 'visualizações médias'],
    ],
    metricsNote: 'Métricas do estudo de caso publicado no Behance.',
    href: 'https://www.behance.net/gallery/228263279/Bacanal-da-Dionisios',
    tone: 'wine',
    images: [
      ['bacanal-01', 'Capa'],
      ['bacanal-06', 'Peças de divulgação'],
      ['bacanal-07', 'Peças de divulgação'],
      ['bacanal-08', 'Peças de divulgação'],
      ['bacanal-09', 'Peças de divulgação'],
      ['bacanal-05', 'Elementos gráficos'],
      ['bacanal-03', 'Paleta de cores'],
      ['bacanal-10', 'Métricas'],
    ],
  },
  {
    id: 'jequitimuu',
    code: 'D.03',
    name: 'Jequitimuu',
    full: 'Marca de laticínios da UFVJM',
    kind: 'Branding · mascote · embalagens',
    year: '2025',
    tools: 'Illustrator · Photoshop',
    text: 'Marca desenvolvida na Diretoria de Comunicação Social da UFVJM para os laticínios produzidos na universidade: mascote em traço vetorial, wordmark, tipografia, cores e aplicações em embalagens de doce de leite e queijo.',
    href: 'https://www.behance.net/gallery/232001675/Jequitimuu',
    tone: 'blue',
    images: [
      ['jequi-06', 'Wordmark'],
      ['jequi-05', 'Logo'],
      ['jequi-02', 'Tipografia'],
      ['jequi-09', 'Versões da marca'],
      ['jequi-10', 'Cores'],
      ['jequi-11', 'Aplicação — queijo'],
      ['jequi-12', 'Aplicação — doce de leite'],
      ['jequi-13', 'Aplicação — sacola'],
      ['jequi-14', 'Aplicações'],
      ['jequi-15', 'Marca em uso'],
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 05 — Competências (somente o que tem evidência)                      */
/* ------------------------------------------------------------------ */
export const skills = [
  { area: 'Frontend', tech: 'React · TypeScript · Next.js · Vite · Tailwind CSS · HTML/CSS · layouts responsivos', proof: 'Ana Cleide, Adriano Azevedo, ClinicAgenda, Portfólio CMS' },
  { area: 'Backend & APIs', tech: 'Node.js · Express · Cloudflare Pages Functions · Python · Java · REST · validação com Zod', proof: 'ClinicAgenda, Ana Cleide, Adriano Azevedo' },
  { area: 'Bancos de dados', tech: 'PostgreSQL · Prisma · Supabase · Cloudflare D1 · SQLite · modelagem e migrations', proof: 'ClinicAgenda, Ana Cleide, Portfólio CMS, RentalManager' },
  { area: 'Acesso & segurança', tech: 'JWT · perfis e permissões · hash de senhas (bcrypt) · Cloudflare Access · auditoria · backups', proof: 'ClinicAgenda, Adriano Azevedo, Ana Cleide, Barbearia' },
  { area: 'Sistemas administrativos', tech: 'Dashboards · CRUD · kanban · agenda · relatórios · fluxos de moderação', proof: 'Ana Cleide, ClinicAgenda, RentalManager' },
  { area: 'Qualidade & entrega', tech: 'Playwright · pytest · node:test · especificação e critérios de aceite · revisão de código · deploy', proof: 'Ana Cleide, Adriano Azevedo, Aurora Wumpus' },
  { area: 'Integrações', tech: 'API do GitHub · OpenStreetMap/Overpass · WhatsApp (links diretos) · armazenamento de arquivos', proof: 'Portfólio CMS, Rota de Bares, Ana Cleide' },
  { area: 'UI/UX', tech: 'Figma · protótipos navegáveis · design tokens · hierarquia de informação', proof: 'Ana Cleide (protótipo aprovado), ClinicAgenda' },
  { area: 'Design gráfico & marca', tech: 'Photoshop · Illustrator · Premiere · Canva · identidade visual · social media', proof: 'LACAP, Bacanal, Jequitimuu, Dicom/UFVJM' },
];
