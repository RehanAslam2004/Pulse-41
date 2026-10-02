/* ── Pulse41 Service Taxonomy — 8 Major Practices ──────────────────── */
/* From: P41-COR-CP-002 Global Corporate Profile V2.0 (Pages 4–11)     */

export interface ServiceAreaDetail {
  area: string
  services: string
}

export interface ServicePractice {
  num: string
  title: string
  slug: string
  tagline: string
  typicalOutcomes: string
  description: string
  coreCapabilities: string[]
  capabilities: string[]
  detailedAreas?: ServiceAreaDetail[]
  controlFramework?: string[]
  color: string
}

interface ServicePracticeRaw extends Omit<ServicePractice, 'capabilities'> {
  capabilities?: string[]
}

const rawServices: ServicePracticeRaw[] = [
  {
    num: '01',
    title: 'AI and Intelligent Automation',
    slug: 'ai-automation',
    tagline: 'Faster service, controlled automation, improved access to knowledge.',
    typicalOutcomes: 'Faster service, controlled automation, improved access to knowledge',
    description:
      'We design and deploy governed AI systems that transform operations — from automated workflows and knowledge retrieval to conversational agents and predictive intelligence.',
    coreCapabilities: [
      'AI strategy & readiness',
      'RAG assistants & enterprise search',
      'Internal copilots & knowledge systems',
      'Workflow agents & WhatsApp/web chatbots',
      'Voice assistants & lead qualification',
      'Document intelligence & OCR extraction',
      'Machine learning & anomaly detection',
      'Automation & RPA system orchestration',
    ],
    detailedAreas: [
      { area: 'AI Strategy and Readiness', services: 'Opportunity assessment, use-case prioritization, data and process readiness, responsible-AI roadmap, pilot planning and business case' },
      { area: 'Generative AI and Knowledge Systems', services: 'RAG assistants, enterprise search, internal copilots, summarization, question answering, proposal and policy assistance' },
      { area: 'AI Agents and Conversational Systems', services: 'Workflow agents, customer-service assistants, website and WhatsApp chatbots, voice assistants, lead qualification and escalation automation' },
      { area: 'Document Intelligence', services: 'OCR, classification, extraction, validation, invoice and form processing, document generation and audit trails' },
      { area: 'Machine Learning and Computer Vision', services: 'Forecasting, anomaly detection, recommendations, image inspection, monitoring, evaluation and lifecycle support' },
      { area: 'Data Engineering and BI', services: 'Migration, cleansing, pipelines, integrations, dashboards, KPI models, reporting, governance and AI-ready data foundations' },
      { area: 'Automation and RPA', services: 'Process mapping, digital forms, approvals, task routing, notifications, low-code automation and system orchestration' },
    ],
    controlFramework: [
      'Data minimization and controlled access',
      'Security-aware architecture and integration',
      'Human approval for high-impact actions',
      'Accuracy, adoption, cost and value measurement',
      'Model, prompt and knowledge-base monitoring',
    ],
    color: '#3B82F6',
  },
  {
    num: '02',
    title: 'Software and Product Engineering',
    slug: 'software-engineering',
    tagline: 'Fit-for-purpose products, integrated workflows and scalable platforms.',
    typicalOutcomes: 'Fit-for-purpose products, integrated workflows and scalable platforms',
    description:
      'We engineer custom software, web platforms, mobile applications and enterprise systems from the ground up, built for scale, resilience and intuitive user experience.',
    coreCapabilities: [
      'Custom software development (web, mobile, portals)',
      'SaaS product engineering (multi-tenant, RBAC, subscriptions)',
      'ERP, CRM & business management systems',
      'Product discovery & architecture (BRD/SRD/SRS)',
      'UI/UX design systems & accessibility',
      'Comprehensive QA & testing (functional, performance, security)',
      'Legacy modernization & API-first integration',
      'Web platforms, CMS & multilingual portals',
    ],
    detailedAreas: [
      { area: 'Custom software development', services: 'Responsive web applications, mobile applications, portals, enterprise systems and workflow platforms' },
      { area: 'SaaS product engineering', services: 'Multi-tenant platforms, subscription management, tenant branding, RBAC, audit trails and usage controls' },
      { area: 'ERP CRM and business systems', services: 'Sales, service, HR, finance, inventory, procurement, projects, documents and operational reporting' },
      { area: 'Product discovery and architecture', services: 'Business analysis, user research, BRD/SRD/SRS, backlog, acceptance criteria, solution, data and integration architecture' },
      { area: 'UI UX and design systems', services: 'User journeys, wireframes, prototypes, responsive interfaces, accessibility and customer, employee and partner portals' },
      { area: 'Quality assurance', services: 'Functional, regression, API, integration, database, performance, security, usability and user-acceptance testing' },
      { area: 'Modernization and integration', services: 'Legacy assessment, refactoring, migration, API-first integration, middleware, payments, messaging and third-party services' },
      { area: 'Web platforms and CMS', services: 'Corporate websites, service portals, content management, landing pages, multilingual structures and governed publishing workflows' },
    ],
    color: '#7C3AED',
  },
  {
    num: '03',
    title: 'Cloud DevOps and Platform Engineering',
    slug: 'cloud-devops',
    tagline: 'Reliable releases, visibility, recoverability and cost control.',
    typicalOutcomes: 'Reliable releases, visibility, recoverability and cost control',
    description:
      'From cloud migration to container orchestration and automated CI/CD pipelines, we engineer secure, resilient platform layers that keep applications running smoothly at scale.',
    coreCapabilities: [
      'Cloud architecture & migration planning',
      'Container orchestration & Kubernetes',
      'Serverless & hybrid deployment',
      'Infrastructure as code (IaC)',
      'CI/CD pipeline automation & gitops',
      'Full-stack observability & logging',
      'Disaster recovery & business continuity',
      'Cloud cost optimization & FinOps',
    ],
    detailedAreas: [
      { area: 'Cloud and platform engineering', services: 'Assessment, architecture, migration planning, hybrid deployment, containers, serverless, infrastructure as code, CI/CD, observability and cost optimization' },
      { area: 'Reliability and resilience', services: 'Backup strategy, disaster recovery, business continuity, performance monitoring, capacity planning and recovery testing' },
    ],
    color: '#0284C7',
  },
  {
    num: '04',
    title: 'Cybersecurity and Digital Trust',
    slug: 'cybersecurity',
    tagline: 'Reduced exposure, stronger controls and audit readiness.',
    typicalOutcomes: 'Reduced exposure, stronger controls and audit readiness',
    description:
      'We embed proactive security and privacy by design into every architecture — covering posture reviews, vulnerability assessments, IAM, and compliance readiness.',
    coreCapabilities: [
      'Security posture reviews & gap analysis',
      'Vulnerability management & mitigation',
      'Application, API and cloud security',
      'Identity and Access Management (IAM)',
      'Secrets management & encryption controls',
      'Secure SDLC integration & code audits',
      'GDPR & US state privacy-readiness activities',
      'Data mapping & retention controls',
    ],
    detailedAreas: [
      { area: 'Cybersecurity and digital trust', services: 'Security posture reviews, vulnerability management, application, API and cloud security, IAM, secrets management and secure SDLC' },
      { area: 'Privacy and compliance readiness', services: 'Data mapping, access controls, retention support, GDPR and US privacy-readiness activities, policy and evidence preparation' },
      { area: 'Specialist security services', services: 'Penetration testing, SOC/MDR and regulated assessments coordinated through vetted specialist partners where required' },
    ],
    color: '#DC2626',
  },
  {
    num: '05',
    title: 'Data and Business Intelligence',
    slug: 'data-analytics',
    tagline: 'Trusted reporting and faster management decisions.',
    typicalOutcomes: 'Trusted reporting and faster management decisions',
    description:
      'We connect disparate databases, engineer automated data pipelines, and deploy live executive dashboards that turn raw business data into actionable decision intelligence.',
    coreCapabilities: [
      'Data engineering & ETL/ELT pipelines',
      'Data warehouse migration & modeling',
      'Executive KPI dashboards & reporting',
      'Business intelligence (PowerBI, Tableau, Looker)',
      'Predictive analytics & ML forecasting',
      'Data governance & quality controls',
      'AI-ready data foundations',
      'Real-time anomaly & performance alerts',
    ],
    color: '#059669',
  },
  {
    num: '06',
    title: 'Digital Marketing and Growth',
    slug: 'digital-marketing',
    tagline: 'Market visibility, qualified demand and measurable digital performance.',
    typicalOutcomes: 'Market visibility, qualified demand and measurable digital performance',
    description:
      'A measurable operating system connecting brand positioning, content, SEO, paid media and customer journeys to drive qualified conversions and commercial growth.',
    coreCapabilities: [
      'Digital strategy & market planning',
      'Technical, local & international SEO',
      'Social media management & content operations',
      'Paid search (Google/Bing) & paid social (Meta/LinkedIn)',
      'B2B demand generation & LinkedIn outreach',
      'E-commerce growth & catalog marketing',
      'Conversion rate optimization (CRO) & A/B testing',
      'GA4 analytics, tag management & attribution',
    ],
    detailedAreas: [
      { area: 'Digital strategy and market planning', services: 'Market and competitor review, audience segmentation, positioning, offer architecture, channel plan, campaign calendar, KPI framework and budget allocation' },
      { area: 'Search engine optimization', services: 'Technical SEO, site architecture, keyword and intent research, on-page optimization, content briefs, internal linking, structured data, backlink strategy, local SEO and international SEO' },
      { area: 'Social media management', services: 'Channel strategy, profile optimization, content calendar, copywriting, creative coordination, publishing, community management, response rules, social listening and monthly reporting' },
      { area: 'Paid media and performance marketing', services: 'Google Ads, Microsoft Ads, Meta, LinkedIn and other platform campaigns; audience, creative, landing page, conversion tracking, testing and optimization' },
      { area: 'Content marketing', services: 'Editorial strategy, blogs, service pages, thought leadership, case-study structure, lead magnets, email content, video scripts and campaign assets' },
      { area: 'Conversion rate optimization', services: 'Landing pages, user journey analysis, form optimization, A/B testing, call-to-action improvement and funnel diagnostics' },
      { area: 'Online reputation and review management', services: 'Review monitoring, response governance, escalation, brand mention tracking and reputation reporting' },
    ],
    color: '#EA580C',
  },
  {
    num: '07',
    title: 'Managed IT and Outsourcing',
    slug: 'managed-it',
    tagline: 'Flexible capacity and dependable operational ownership.',
    typicalOutcomes: 'Flexible capacity and dependable operational ownership',
    description:
      'Flexible offshore development centers, dedicated teams, staff augmentation, and SLA-backed application support that provide elastic engineering bandwidth.',
    coreCapabilities: [
      'Managed application support & defect resolution',
      'Managed infrastructure monitoring & patching',
      'Offshore Development Centre (ODC) setup',
      'Dedicated engineering teams & staff augmentation',
      'White-label delivery for agencies and consultancies',
      '24/7 availability reporting & escalation',
      'Access reviews & backup verification',
      'Build-Operate-Transfer (BOT) models',
    ],
    detailedAreas: [
      { area: 'Managed application support', services: 'Maintenance, incident coordination, defect resolution, configuration, releases, enhancements and documentation updates' },
      { area: 'Managed infrastructure', services: 'Monitoring, administration, patching, backup verification, access reviews, availability reporting and escalation' },
    ],
    color: '#4F46E5',
  },
  {
    num: '08',
    title: 'Consulting Training and Assurance',
    slug: 'consulting-assurance',
    tagline: 'Better investment decisions, delivery control and adoption.',
    typicalOutcomes: 'Better investment decisions, delivery control and adoption',
    description:
      'Strategic technology consulting, architecture audits, project turnaround, digital readiness assessments, and corporate training programmes.',
    coreCapabilities: [
      'Technology strategy & digital roadmapping',
      'Architecture audits & technical due diligence',
      'Project recovery & delivery assurance',
      'AI readiness & ethical governance advisory',
      'Hands-on engineering workshops & cohort training',
      'Requirement baselining (BRD/SRD/SRS)',
      'Vendor evaluation & RFP creation',
      'Adoption & change enablement programmes',
    ],
    color: '#0D9488',
  },
]

export const services: ServicePractice[] = rawServices.map((s) => ({
  ...s,
  capabilities: s.capabilities || s.coreCapabilities,
}))
