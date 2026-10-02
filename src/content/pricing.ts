/* ── Pulse41 Engagement Models & Commercial Structures ───────────────── */
/* From: P41-COR-CP-002 Global Corporate Profile V2.0 (Page 15)         */

export interface PricingTier {
  tier: string
  tag: string
  headline: string
  features: string[]
  cta: string
  highlight: boolean
}

export const pricingTiers: PricingTier[] = [
  {
    tier: 'STARTER & MVP',
    tag: 'For small businesses, startups & defined validation scopes',
    headline: 'Launch your digital presence and validate your product.',
    features: [
      'High-conversion corporate website or MVP application',
      'Modern responsive design (desktop, tablet, mobile)',
      'CMS & contact intake integration',
      'Basic analytics & event tracking setup',
      'Production deployment with documentation',
      '30-day post-launch support and warranty',
    ],
    cta: "Let's Talk",
    highlight: false,
  },
  {
    tier: 'PROFESSIONAL PLATFORM',
    tag: 'For growing businesses, SMEs & scale-ups',
    headline: 'Build a production-grade digital platform that scales.',
    features: [
      'Custom web application, SaaS or product platform',
      'Multi-tenant architecture & API integrations',
      'User management, role-based access & authentication',
      'Automated workflows & AI capability integration',
      'Comprehensive QA test suite & performance tuning',
      '60-day hypercare, support & continuous iteration',
    ],
    cta: 'Get a Custom Quote',
    highlight: true,
  },
  {
    tier: 'ENTERPRISE & MANAGED',
    tag: 'For large organisations, institutions & multi-market operations',
    headline: 'End-to-end transformation, dedicated teams and governance.',
    features: [
      'Comprehensive digital transformation or system modernization',
      'Dedicated engineering squad or Offshore Development Centre (ODC)',
      'Enterprise security, GDPR / privacy alignment & audit trails',
      'Multi-system ERP/CRM integration & data pipelines',
      'Strict SLA-backed operational governance & monitoring',
      'Executive escalation paths & regular cadence reviews',
    ],
    cta: 'Book a Consultation',
    highlight: false,
  },
]

export const faqs = [
  {
    q: 'Does Pulse41 provide fixed-price quotes?',
    a: 'Yes. Pulse41 provides fixed-scope, fixed-price proposals on well-defined scopes with specified milestones and acceptance criteria. For evolving, iterative or exploratory scopes, we offer dedicated team, time-and-materials, or managed retainer models.',
  },
  {
    q: 'How are client intellectual property (IP) and data protected?',
    a: 'Pulse41 assigns full intellectual property ownership to the client upon receipt of payment. Standard non-disclosure agreements (NDAs) govern every engagement. All development follows least-privilege access, encrypted data transmission (TLS/HTTPS), encrypted storage at rest, and secure secrets management without repository credentials.',
  },
  {
    q: 'How does Pulse41 handle international time zones and communication?',
    a: 'Pulse41 operates an English-first delivery model with structured overlap windows for US Eastern, Central and Pacific time zones, UK GMT/BST, and Central European Time (CET/CEST). All code comments, sprint reporting, specifications, and meetings are conducted in fluent professional English.',
  },
  {
    q: 'Can Pulse41 work under a white-label arrangement behind our brand?',
    a: 'Yes. White-label delivery is an established engagement model. We frequently deliver software engineering, digital marketing, and product development behind consulting firms, creative agencies, and technology partners with complete brand neutrality and confidentiality.',
  },
  {
    q: 'Can Pulse41 integrate with our existing legacy systems and tech stack?',
    a: 'Yes. Our practice includes legacy system modernization and integration via REST/GraphQL APIs, secure middleware, database synchronization, and event-driven pipelines. We conduct a technical architecture discovery during Stage 1 and 2 to plan seamless integration.',
  },
  {
    q: 'What is Pulse41’s policy regarding marketing and regulatory guarantees?',
    a: 'In accordance with our governance standard, Pulse41 does not provide legal advice, regulated financial advice, or formal statutory compliance audits (such as formal SOC 2 / HIPAA certifications, which require licensed independent auditors). We also do not guarantee search engine ranking positions or viral reach. All work is delivered with rigorous engineering discipline, transparent reporting, and evidence-driven milestones.',
  },
]

export const budgetRanges = [
  'Under $10,000',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  '$50,000 – $100,000',
  '$100,000+',
  'Prefer to discuss scope first',
]

/* ── 10 Global Delivery and Outsourcing Models (Page 15) ───────────── */
export const engagementModels = [
  {
    id: '01',
    name: 'Fixed-Scope Project',
    desc: 'Defined deliverables, fixed schedule and agreed budget. Best for well-specified requirements, website launches and discrete software modules.',
  },
  {
    id: '02',
    name: 'Time and Materials',
    desc: 'Flexible delivery based on actual hours or days worked. Best for evolving requirements, exploratory architecture and prototyping.',
  },
  {
    id: '03',
    name: 'Dedicated Team',
    desc: 'An integrated engineering or digital team dedicated to the client, managed collaboratively or autonomously with agile cadence.',
  },
  {
    id: '04',
    name: 'Staff Augmentation',
    desc: 'Specialist individual contributors embedded directly into the client’s existing engineering, design or digital teams.',
  },
  {
    id: '05',
    name: 'Managed Service',
    desc: 'End-to-end management of a specific digital function (e.g. platform maintenance, campaign operations, infrastructure monitoring) against agreed SLAs.',
  },
  {
    id: '06',
    name: 'Offshore Development Centre (ODC)',
    desc: 'A structured, branded or virtual offshore team operating in Pakistan, serving a single client on an ongoing basis with agreed governance, security and staffing protocols.',
  },
  {
    id: '07',
    name: 'White-Label Delivery',
    desc: 'Pulse41 delivers projects and services behind the brand of agency, consulting or technology partners, with strict confidentiality and brand neutrality.',
  },
  {
    id: '08',
    name: 'Joint Delivery',
    desc: 'Collaborative delivery alongside the client’s internal team, sharing responsibility, tooling, source control and delivery cadences.',
  },
  {
    id: '09',
    name: 'Build, Operate, Transfer (BOT)',
    desc: 'Pulse41 establishes a capability, team or platform, operates it through maturity, and transfers ownership, processes and personnel to the client.',
  },
  {
    id: '10',
    name: 'Training & Enablement Programme',
    desc: 'Structured knowledge-transfer engagements to upskill client teams in AI tools, digital workflows, modern development practices or marketing operations.',
  },
]
