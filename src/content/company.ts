/* ── Pulse41 Corporate Content — Source of Truth ───────────────────── */
/* From: P41-COR-CP-002 Global Corporate Profile V2.0               */
/* Version 2.0 | September 2026 | International Capability Statement */

export const company = {
  name: 'Pulse41',
  legalName: 'Pulse41',
  tagline: 'TECH. THINK. THRIVE.',
  edition: 'US and European Market Edition',
  version: '2.0 (September 2026)',
  hq: 'Pakistan + Remote',
  email: 'contact@pulse41.com',
  website: 'https://pulse41.com',

  // Page 2: Executive Profile
  primaryRole: 'Technology delivery, product engineering and digital-growth partner',
  priorityMarkets: ['United States', 'European Union', 'United Kingdom', 'Selected international markets'],
  clientSegments: [
    'SMEs',
    'Enterprises',
    'Startups',
    'Institutions',
    'Public and social-impact organizations',
  ],
  deliveryModels: [
    'Projects',
    'Retainers',
    'Dedicated teams',
    'Staff augmentation',
    'Managed services',
    'White-label delivery',
    'Offshore development centre (ODC)',
    'Joint delivery',
    'Build-operate-transfer (BOT)',
    'Training programmes',
  ],
  differentiator:
    'One accountable portfolio connecting technology delivery with market visibility, customer acquisition and measurable growth.',

  overview:
    'Pulse41 is a technology and digital-growth partner helping organizations design, build, modernize and market digital products and services. The company combines software engineering, artificial intelligence, automation, cloud, cybersecurity, data, managed delivery and digital marketing in one governed service portfolio.',

  offshorePositioning:
    'For clients in the United States and Europe, Pulse41 is positioned as an offshore and partner-ready delivery organization: commercially flexible, documentation-led and capable of working directly with end clients or behind consulting firms, agencies and technology partners through white-label arrangements.',

  purpose:
    'This profile presents the complete service and productized-solution portfolio available for international marketing. Individual engagements remain subject to discovery, due diligence, scope, data and security requirements, resource confirmation and a signed Statement of Work.',

  // Page 3: Company Positioning
  vision:
    'To become a trusted international technology and digital-growth partner known for practical innovation, responsible AI, dependable delivery and measurable commercial outcomes.',

  mission:
    'To convert business challenges into secure digital products, intelligent workflows, scalable platforms and evidence-led growth programmes through disciplined engineering and transparent collaboration.',

  brandPromise:
    'Pulse41 connects technology capability with commercial momentum — from product strategy and engineering to launch, visibility, customer acquisition and ongoing optimization.',

  operatingPrinciples: [
    {
      principle: 'Business first',
      whatItMeans:
        'Technology and marketing decisions begin with the client problem, customer, economics and expected outcome.',
    },
    {
      principle: 'Documented delivery',
      whatItMeans:
        'Scope, responsibilities, acceptance, risks, changes and decisions are recorded and controlled.',
    },
    {
      principle: 'Responsible AI',
      whatItMeans:
        'AI is proportionate to the use case, governed, monitored and subject to human approval where material.',
    },
    {
      principle: 'Security and privacy by design',
      whatItMeans:
        'Access, data, infrastructure and third-party services are considered throughout delivery.',
    },
    {
      principle: 'Measurable performance',
      whatItMeans:
        'Engineering, operations and marketing use agreed KPIs rather than activity claims alone.',
    },
    {
      principle: 'Partner-ready execution',
      whatItMeans:
        'Pulse41 supports direct, offshore, joint-delivery and white-label models with defined authority and accountability.',
    },
  ],

  get principles() {
    return this.operatingPrinciples.map((p) => ({
      title: p.principle,
      desc: p.whatItMeans,
    }))
  },

  // Page 14: US & European Market Delivery Standards
  marketDeliveryStandards: [
    {
      requirement: 'Privacy and data protection',
      response:
        'Data mapping, least privilege, retention controls, consent-aware marketing, GDPR and applicable US state privacy-readiness support.',
    },
    {
      requirement: 'Security expectations',
      response:
        'Secure SDLC, access control, secrets management, logging, vulnerability management and evidence-based review.',
    },
    {
      requirement: 'Accessibility',
      response:
        'WCAG-aware design and testing for customer-facing websites, portals and documents where included in scope.',
    },
    {
      requirement: 'Commercial clarity',
      response:
        'Defined SOW, milestones, acceptance criteria, change control, IP, confidentiality, third-party costs and support boundaries.',
    },
    {
      requirement: 'Time-zone coverage',
      response:
        'Agreed overlap windows, delivery cadence, escalation contacts and service hours based on the engagement model.',
    },
    {
      requirement: 'Localization',
      response:
        'Market-specific language, content, search intent, currency, tax and regulatory configuration subject to qualified review.',
    },
    {
      requirement: 'Data residency and hosting',
      response:
        'Client-approved hosting architecture, regions, subprocessors, backups and transfer controls.',
    },
    {
      requirement: 'Marketing compliance',
      response:
        'Consent, unsubscribe, cookies, claims, platform rules and campaign approvals incorporated into operating procedures.',
    },
  ],

  // Important Boundaries (Pages 2, 9, 11, 14, 17)
  legalBoundaries: [
    'Pulse41 does not guarantee search rankings, platform approval, viral reach or fixed advertising outcomes.',
    'Pulse41 may support readiness, technical controls, evidence and operational implementation. Legal advice, regulated certification, formal audits and specialist penetration testing are provided only by appropriately qualified parties where required.',
    'Product names describe configurable solution packages. Availability, maturity, integrations, hosting, pricing and implementation scope must be confirmed for each client engagement.',
    'All engagements are established only through an approved proposal, agreement and signed Statement of Work (SOW).',
  ],
}
