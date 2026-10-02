/* ── Pulse41 Productized Solution Portfolio — 10 Platforms ──────────── */
/* Matches Supabase Canonical Seed & Corporate Profile V2.0            */

export interface Solution {
  num: string
  title: string
  productName: string
  slug: string
  tagline: string
  businessNeed: string
  coreComponentsText: string
  coreComponents: string[]
  capabilities: string[]
  description: string
  icon: string
}

export const solutionsNotice =
  'Product names describe configurable solution packages. Availability, maturity, integrations, hosting, pricing and implementation scope must be confirmed for each client engagement. All engagements are established only through an approved proposal, agreement and signed Statement of Work (SOW).'

export const solutions: Solution[] = [
  {
    num: '01',
    title: 'AI Customer Experience Suite',
    productName: 'PulseDesk AI / PulseCX',
    slug: 'pulse-desk-ai',
    tagline: 'High inquiry resolution, automated knowledge retrieval and agent assist.',
    businessNeed: 'High inquiry volume, slow responses, repetitive questions, inconsistent service.',
    coreComponentsText: 'Knowledge assistant, chatbot, agent assist, routing, escalation, analytics.',
    coreComponents: [
      'Knowledge assistant & enterprise RAG',
      'AI conversational chatbot (web, WhatsApp, voice)',
      'Agent assist & co-pilot recommendations',
      'Intelligent inquiry routing & SLA escalation',
      'Customer sentiment analytics & service reporting',
    ],
    capabilities: [
      'Instant answers to repetitive client queries',
      'Verified citations from corporate documentation',
      'Seamless human agent escalation',
      'Continuous learning from resolved tickets',
    ],
    description:
      'A governed AI customer experience platform resolving high inquiry volumes and inconsistent responses through unified knowledge retrieval, multichannel chatbots, and intelligent agent escalation.',
    icon: 'MessageSquare',
  },
  {
    num: '02',
    title: 'Omnichannel Contact Centre Platform',
    productName: 'PulseContact',
    slug: 'pulse-contact',
    tagline: 'Unified voice, messaging, CRM routing and workforce QA controls.',
    businessNeed: 'Disconnected voice, email, chat and messaging channels.',
    coreComponentsText: 'Telephony, queues, CRM, recordings, QA, workforce controls, portals, reporting.',
    coreComponents: [
      'Cloud telephony & intelligent skill-based queues',
      'CRM integration & bi-directional sync',
      'Call recording, transcription & QA scoring',
      'Workforce management & shift controls',
      'Customer self-service portals & executive telemetry',
    ],
    capabilities: [
      'Consolidate voice, email, WhatsApp, and live chat',
      'Real-time call transcription and sentiment scoring',
      'Automated CRM customer record updates',
      'Supervisory monitoring, whisper coaching, and barging',
    ],
    description:
      'A unified contact center suite integrating voice, chat, email, and social messaging with bi-directional CRM sync, workforce monitoring, and automated QA scoring.',
    icon: 'Headphones',
  },
  {
    num: '03',
    title: 'Document Intelligence and Workflow Engine',
    productName: 'PulseDoc AI',
    slug: 'pulse-doc-ai',
    tagline: 'Automated document ingestion, OCR extraction, verification and routing.',
    businessNeed: 'Manual data entry, paper forms, slow invoice processing, document errors.',
    coreComponentsText: 'OCR extraction, classification, approval routing, ERP/accounting integration, audit logs.',
    coreComponents: [
      'Multilingual OCR & computer vision ingestion',
      'Intelligent entity classification & field extraction',
      'Automated approval routing & exception flagging',
      'Accounting & ERP bi-directional integrations',
      'Tamper-evident audit trails & archive retention',
    ],
    capabilities: [
      'Process invoices, receipts, and claim forms in seconds',
      'High-confidence extraction with human-in-the-loop validation',
      'Automated two-way and three-way invoice matching',
      'Direct integration with SAP, QuickBooks, and Xero',
    ],
    description:
      'Automated document processing platform using computer vision and machine learning to extract, validate, and route financial and operational documents without manual data entry.',
    icon: 'FileText',
  },
  {
    num: '04',
    title: 'Enterprise Portal & Knowledge Management',
    productName: 'PulseCore',
    slug: 'pulse-core',
    tagline: 'Centralized company portals, team spaces, and verified search.',
    businessNeed: 'Information silos, lost institutional knowledge, fragmented employee tools.',
    coreComponentsText: 'Intranet portal, document management, role-based access, semantic enterprise search.',
    coreComponents: [
      'Modern company intranet & departmental portals',
      'Secure document management & version control',
      'Role-based permissions & SSO authentication',
      'Semantic enterprise search across all repos',
      'Interactive team directories & org charts',
    ],
    capabilities: [
      'Single source of truth for corporate policies and SOPs',
      'Instant AI-powered answers across internal wikis',
      'Granular department and role-level visibility controls',
      'Cross-platform accessibility with mobile support',
    ],
    description:
      'A centralized digital workplace platform bringing together internal communications, document management, team workflows, and semantic search.',
    icon: 'Building2',
  },
  {
    num: '05',
    title: 'Digital Credentialing & Verification Portal',
    productName: 'PulseCert',
    slug: 'pulse-cert',
    tagline: 'Cryptographically verified certificates, badges, and public lookup.',
    businessNeed: 'Certificate fraud, slow manual verification, paper-based credentialing.',
    coreComponentsText: 'Batch certificate generation, QR code verification, blockchain hashing, public registry.',
    coreComponents: [
      'Automated batch certificate generation & dispatch',
      'Tamper-proof QR code & cryptographic hash validation',
      'Public verification registry & social sharing badges',
      'Audit logging, revocation & expiry workflows',
      'API integrations with existing LMS and CRM tools',
    ],
    capabilities: [
      'Eliminate certificate forgery with instant verification',
      'Automate issuance upon course or milestone completion',
      'One-click credential sharing on LinkedIn and social channels',
      'Comprehensive administrative revocation tracking',
    ],
    description:
      'A secure digital credentialing platform enabling educational institutions, certification bodies, and enterprises to issue, manage, and publicly verify tamper-proof certificates.',
    icon: 'Award',
  },
  {
    num: '06',
    title: 'Field Operations & Service Logistics',
    productName: 'PulseWork',
    slug: 'pulse-work',
    tagline: 'Real-time job scheduling, dispatch, technician apps, and telemetry.',
    businessNeed: 'Uncoordinated field technicians, paper work orders, customer delays, missing telemetry.',
    coreComponentsText: 'Dispatch dashboard, mobile technician app, GPS tracking, offline signatures, invoicing.',
    coreComponents: [
      'Intelligent dispatch dashboard & route optimization',
      'Offline-capable mobile app for field engineers',
      'Real-time GPS tracking & customer ETA notifications',
      'Digital job cards, photo capture & customer signatures',
      'Instant post-job invoicing and payment collection',
    ],
    capabilities: [
      'Optimize technician routes to minimize travel time',
      'Full offline functionality in remote job locations',
      'Automated SMS/WhatsApp alerts for customers',
      'Proof-of-service capture with geo-stamped photos',
    ],
    description:
      'An enterprise field service management suite coordinating dispatchers, mobile technicians, and clients with real-time route optimization, digital work orders, and instant invoicing.',
    icon: 'MapPin',
  },
  {
    num: '07',
    title: 'Digital Commerce & Storefront Platform',
    productName: 'PulseStore',
    slug: 'pulse-store',
    tagline: 'High-speed headless commerce, multi-warehouse inventory, and checkout.',
    businessNeed: 'Slow checkout speeds, high cart abandonment, stockouts, fragmented channels.',
    coreComponentsText: 'Headless storefront, inventory sync, multi-currency checkout, promotion engine, analytics.',
    coreComponents: [
      'Ultra-fast headless storefront (Next.js & Edge CDN)',
      'Real-time multi-warehouse inventory synchronization',
      'Multi-currency, localized payment gateway integrations',
      'Automated abandoned cart recovery workflows',
      'Customer lifetime value & cohort retention analytics',
    ],
    capabilities: [
      'Sub-second page loads for maximum conversion',
      'Unified catalog across web, mobile, and marketplace channels',
      'Automated tax, shipping, and duty calculation',
      'Flexible discount rules and personalized promotions',
    ],
    description:
      'A high-performance headless digital commerce platform combining lightning-fast storefronts, synchronized multi-warehouse inventory, and global payment processing.',
    icon: 'ShoppingBag',
  },
  {
    num: '08',
    title: 'API Integration & Workflow Mesh',
    productName: 'PulseNexus',
    slug: 'pulse-nexus',
    tagline: 'Connect disparate enterprise tools with governed pipelines and event queues.',
    businessNeed: 'Data trapped in departmental silos, fragile custom scripts, integration downtime.',
    coreComponentsText: 'Event bus, connector library, transformation pipelines, API gateway, monitoring.',
    coreComponents: [
      'Low-latency enterprise event bus & message queues',
      'Pre-built connectors for ERP, CRM, and cloud services',
      'Visual data transformation & mapping pipeline',
      'Centralized API gateway with rate-limiting & auth',
      'Dead-letter queues, automated retries & error alerts',
    ],
    capabilities: [
      'Eliminate manual data transfers between business systems',
      'Guaranteed at-least-once message delivery',
      'Real-time health monitoring of all enterprise integrations',
      'Strict schema validation and encryption in transit',
    ],
    description:
      'An enterprise integration fabric connecting legacy databases, modern SaaS tools, and internal microservices through resilient event-driven pipelines.',
    icon: 'Workflow',
  },
  {
    num: '09',
    title: 'Learning Management & Cohort Platform',
    productName: 'PulseLearn',
    slug: 'pulse-learn',
    tagline: 'Interactive digital learning, cohort progress tracking, and assessments.',
    businessNeed: 'Disjointed training tools, low course completion rates, lack of compliance evidence.',
    coreComponentsText: 'Course builder, multimedia player, interactive quizzes, progress tracking, certificates.',
    coreComponents: [
      'Modular curriculum & lesson builder',
      'High-definition video streaming & interactive transcripts',
      'Automated quizzes, grading, and rubric assessments',
      'Cohort-based discussion forums & peer reviews',
      'Automated compliance reporting and audit dashboards',
    ],
    capabilities: [
      'Engaging learning experiences that boost completion rates',
      'Automated reminders and nudges for inactive learners',
      'SCORM and xAPI compliance for enterprise integration',
      'Direct integration with PulseCert for instant certification',
    ],
    description:
      'A modern corporate and academic learning management platform designed for high student engagement, automated compliance tracking, and credential issuance.',
    icon: 'GraduationCap',
  },
  {
    num: '10',
    title: 'Zero-Trust Security & Identity Vault',
    productName: 'PulseVault',
    slug: 'pulse-vault',
    tagline: 'Unified identity management, secret rotation, and audit governance.',
    businessNeed: 'Credential leaks, unmanaged access privileges, regulatory audit stress.',
    coreComponentsText: 'Identity provider, secrets vault, access policies, session monitoring, compliance logs.',
    coreComponents: [
      'Centralized identity management & SSO integration',
      'Automated secrets management & key rotation',
      'Just-in-time access provisioning & approvals',
      'Continuous session security & anomaly detection',
      'Immutable audit logs aligned with SOC 2 and ISO 27001',
    ],
    capabilities: [
      'Enforce zero-trust principles across all corporate tools',
      'Prevent credential leakage with automated secret rotation',
      'Streamline security audits with exportable compliance logs',
      'Role-based permissions with time-bound access grants',
    ],
    description:
      'An enterprise zero-trust identity and secrets management vault providing centralized access governance, automated credential rotation, and exportable audit logs.',
    icon: 'Shield',
  },
]
