import pg from 'pg';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local manually
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const idx = trimmed.indexOf('=');
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('ERROR: DATABASE_URL is not set');
  process.exit(1);
}

const pool = new pg.Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

// Data definitions
const servicesData = [
  {
    num: '01',
    title: 'AI and Intelligent Automation',
    slug: 'ai-automation',
    tagline: 'Faster service, controlled automation, improved access to knowledge.',
    typicalOutcomes: 'Faster service, controlled automation, improved access to knowledge',
    description: 'We design and deploy governed AI systems that transform operations — from automated workflows and knowledge retrieval to conversational agents and predictive intelligence.',
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
    color: '#2563EB',
  },
  {
    num: '02',
    title: 'Software, Web and Mobile Engineering',
    slug: 'software-engineering',
    tagline: 'Working software, clean architecture, predictable releases.',
    typicalOutcomes: 'Working software, clean architecture, predictable releases',
    description: 'Full-lifecycle software, web and mobile development combining rigorous engineering practices, modern architectures, and secure deployment pipelines.',
    coreCapabilities: [
      'Custom web application development',
      'Cross-platform iOS & Android mobile apps',
      'Microservices & modular monolithic architecture',
      'REST & GraphQL API design & integration',
      'Cloud-native deployment on AWS & Azure',
      'Zero-trust security & data protection',
      'Automated testing & CI/CD deployment pipelines',
      'Legacy system modernization & migration',
    ],
    detailedAreas: [
      { area: 'Discovery and Architecture', services: 'Requirements engineering (BRD/SRD/SRS), tech stack selection, domain modeling, API contracts, security baseline and delivery plan' },
      { area: 'Web Applications', services: 'Single-page apps, progressive web apps, corporate portals, admin panels, dashboards, customer portals and e-commerce platforms' },
      { area: 'Mobile Applications', services: 'iOS and Android development, cross-platform apps, offline-first architectures, biometric security and app store publication' },
      { area: 'Backend Systems and APIs', services: 'Microservices, modular monoliths, REST and GraphQL APIs, event-driven architectures, third-party integrations and database design' },
      { area: 'Cloud and DevOps', services: 'AWS and Azure cloud setup, containerization (Docker, Kubernetes), CI/CD pipelines, infrastructure as code and zero-trust security' },
      { area: 'Quality and Testing', services: 'Automated unit, integration and end-to-end testing, load and stress testing, vulnerability scanning, security audits and code quality reviews' },
    ],
    controlFramework: [
      'Traceable requirement mapping across delivery',
      'Structured sprint cadences with demo milestones',
      'Automated regression testing before every release',
      'Security scans and dependency vulnerability checks',
      'Comprehensive technical documentation and handover',
    ],
    color: '#0891B2',
  },
  {
    num: '03',
    title: 'Cloud, Infrastructure and DevOps',
    slug: 'cloud-devops',
    tagline: 'Reliable hosting, secure infrastructure, rapid delivery pipelines.',
    typicalOutcomes: 'Reliable hosting, secure infrastructure, rapid delivery pipelines',
    description: 'Enterprise cloud architectures, container orchestration, CI/CD automation, and 24/7 site reliability engineering across AWS, Azure, and Google Cloud.',
    coreCapabilities: [
      'Multi-cloud strategy & cloud migration',
      'Infrastructure as Code (Terraform, Pulumi)',
      'Kubernetes & container orchestration',
      'Automated CI/CD build & release pipelines',
      'Observability, logging & APM monitoring',
      'Cost optimization & cloud spend governance',
      'Disaster recovery & backup automation',
      'Zero-downtime deployment strategies',
    ],
    detailedAreas: [
      { area: 'Cloud Architecture & Migration', services: 'Workload assessment, cloud migration roadmap, multi-region architecture, hybrid cloud connectivity, and landing zones' },
      { area: 'DevOps & CI/CD Automation', services: 'Automated build pipelines, canary and blue/green deployments, environment provisioning, and automated testing hooks' },
      { area: 'Site Reliability Engineering', services: 'SLO/SLA definition, 24/7 monitoring, incident response automation, capacity planning, and post-mortem workflows' },
      { area: 'FinOps & Cost Governance', services: 'Resource tagging, unused asset elimination, reserved instance strategy, and monthly spend anomaly alerts' },
    ],
    color: '#0284C7',
  },
  {
    num: '04',
    title: 'Cybersecurity, Governance and Privacy',
    slug: 'cybersecurity-governance',
    tagline: 'Reduced risk, verified compliance, defensible security posture.',
    typicalOutcomes: 'Reduced risk, verified compliance, defensible security posture',
    description: 'Comprehensive information security advisory, vulnerability assessments, penetration testing, compliance readiness (ISO 27001, SOC 2, GDPR, HIPAA), and identity governance.',
    coreCapabilities: [
      'Vulnerability assessment & penetration testing',
      'Compliance readiness (ISO 27001, SOC 2, GDPR, HIPAA)',
      'Identity & access management (IAM, SSO, MFA)',
      'Zero-trust network architecture design',
      'Security posture review & risk registers',
      'Incident response planning & tabletop exercises',
      'Third-party vendor risk assessments',
      'Security awareness training & phishing simulations',
    ],
    detailedAreas: [
      { area: 'Security Audits & Pen Testing', services: 'Application security testing, network penetration testing, API vulnerability assessment, and remediation verification' },
      { area: 'Compliance & Governance', services: 'Gap analysis for SOC 2, ISO 27001, GDPR, and HIPAA; policy authoring; evidence gathering; and audit facilitation' },
      { area: 'Identity & Access Controls', services: 'Role-based access control (RBAC), multi-factor authentication, privileged access management, and automated provisioning' },
    ],
    color: '#DC2626',
  },
  {
    num: '05',
    title: 'Data Engineering, Analytics and BI',
    slug: 'data-analytics',
    tagline: 'Trusted data, real-time insights, accelerated executive decisions.',
    typicalOutcomes: 'Trusted data, real-time insights, accelerated executive decisions',
    description: 'End-to-end data pipelines, modern data warehouses, real-time streaming analytics, and executive business intelligence dashboards.',
    coreCapabilities: [
      'Modern data warehouse design (Snowflake, BigQuery)',
      'ETL/ELT pipeline engineering (dbt, Airflow)',
      'Real-time streaming (Kafka, AWS Kinesis)',
      'Business intelligence dashboards (Power BI, Tableau)',
      'Data quality frameworks & schema validation',
      'Master data management & customer 360',
      'Predictive analytics & forecasting models',
      'Data governance & catalog implementation',
    ],
    detailedAreas: [
      { area: 'Data Pipeline Engineering', services: 'Batch and streaming data ingestion, transformation pipelines, data lakehouse architecture, and data cleansing' },
      { area: 'BI & Executive Dashboards', services: 'C-suite KPI dashboards, self-service reporting portals, interactive visualization, and automated email alerts' },
      { area: 'Data Quality & Governance', services: 'Automated anomaly alerts, data lineage tracking, cataloging, and access auditing' },
    ],
    color: '#7C3AED',
  },
  {
    num: '06',
    title: 'Digital Marketing, Growth and Creative',
    slug: 'digital-marketing',
    tagline: 'Measurable audience growth, brand authority, high-intent conversions.',
    typicalOutcomes: 'Measurable audience growth, brand authority, high-intent conversions',
    description: 'Data-driven growth strategies, brand identity engineering, search authority, content marketing, performance advertising, and full-funnel conversion optimization.',
    coreCapabilities: [
      'Performance marketing & paid media (Google, Meta, LinkedIn)',
      'Technical SEO & search authority strategy',
      'Conversion rate optimization (CRO) & A/B testing',
      'Brand identity systems & creative direction',
      'Marketing automation & CRM pipeline setup',
      'Content strategy & thought leadership publishing',
      'Attribution modeling & full-funnel analytics',
      'Email lifecycle marketing & lead nurturing',
    ],
    detailedAreas: [
      { area: 'Search & Content Authority', services: 'Technical SEO audits, keyword gap analysis, high-intent editorial content, backlink strategy, and search ranking tracking' },
      { area: 'Performance Advertising', services: 'Paid search, display retargeting, LinkedIn B2B lead generation, ad creative design, and ROAS optimization' },
      { area: 'Conversion Optimization', services: 'Landing page heatmapping, multivariate testing, copy optimization, checkout friction reduction, and behavioral analytics' },
    ],
    color: '#EA580C',
  },
  {
    num: '07',
    title: 'Managed Delivery and Team Augmentation',
    slug: 'managed-delivery',
    tagline: 'Guaranteed capacity, senior technical leadership, transparent delivery control.',
    typicalOutcomes: 'Guaranteed capacity, senior technical leadership, transparent delivery control',
    description: 'Dedicated engineering pods, staff augmentation, offshore development centers (ODC), and 24/7 managed application and infrastructure support.',
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
    description: 'Strategic technology consulting, architecture audits, project turnaround, digital readiness assessments, and corporate training programmes.',
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
    detailedAreas: [
      { area: 'Strategy & Architecture Audits', services: 'System architecture review, tech debt evaluation, security audit, scalability assessment, and roadmap authoring' },
      { area: 'Project Recovery & Assurance', services: 'Troubled project triage, timeline reset, code audit, vendor dispute resolution, and milestone restructuring' },
      { area: 'Training & Enablement', services: 'Executive AI briefings, engineering team upskilling, DevOps bootcamps, and modern practices workshops' },
    ],
    color: '#0D9488',
  },
];

const solutionsData = [
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
    description: 'A governed AI customer experience platform resolving high inquiry volumes and inconsistent responses through unified knowledge retrieval, multichannel chatbots, and intelligent agent escalation.',
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
    description: 'A unified contact center suite integrating voice, chat, email, and social messaging with bi-directional CRM sync, workforce monitoring, and automated QA scoring.',
    icon: 'PhoneCall',
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
    description: 'Automated document processing platform using computer vision and machine learning to extract, validate, and route financial and operational documents without manual data entry.',
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
    description: 'A centralized digital workplace platform bringing together internal communications, document management, team workflows, and semantic search.',
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
    description: 'A secure digital credentialing platform enabling educational institutions, certification bodies, and enterprises to issue, manage, and publicly verify tamper-proof certificates.',
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
    description: 'An enterprise field service management suite coordinating dispatchers, mobile technicians, and clients with real-time route optimization, digital work orders, and instant invoicing.',
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
    description: 'A high-performance headless digital commerce platform combining lightning-fast storefronts, synchronized multi-warehouse inventory, and global payment processing.',
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
    description: 'An enterprise integration fabric connecting legacy databases, modern SaaS tools, and internal microservices through resilient event-driven pipelines.',
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
    description: 'A modern corporate and academic learning management platform designed for high student engagement, automated compliance tracking, and credential issuance.',
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
      'Instant global revocation of compromised user accounts',
    ],
    description: 'An enterprise security and identity control center providing zero-trust access management, automated secrets rotation, and immutable audit logs for regulatory compliance.',
    icon: 'ShieldCheck',
  },
];

const industriesData = [
  {
    name: 'Technology & SaaS',
    slug: 'technology',
    icon_name: 'Monitor',
    tagline: 'Engineering for technology companies and high-growth SaaS platforms',
    description: 'SaaS product engineering, multi-tenant architecture, integrations, developer support and operational scaling.',
    capabilities: [
      'Multi-tenant architecture & cloud infrastructure',
      'API design, development & third-party integrations',
      'Continuous deployment, DevOps & automated QA',
      'Data pipeline & analytics engineering',
      'Platform security & operational scaling',
    ],
    relevant_solutions: ['PulseCore', 'PulseEngine', 'PulseNexus'],
    is_primary: true,
  },
  {
    name: 'Professional Services',
    slug: 'professional-services',
    icon_name: 'Briefcase',
    tagline: 'Digital platforms & automated workflows for client-centric service firms',
    description: 'Practice websites, client onboarding, practice management workflows, secure client portals and CRM.',
    capabilities: [
      'High-conversion practice & authority websites',
      'Automated client onboarding & intake flows',
      'Secure client portals & document exchange',
      'Billing, invoicing & practice management integrations',
      'Client relationship management (CRM) workflows',
    ],
    relevant_solutions: ['PulseCore', 'PulseWork', 'PulseEngage'],
    is_primary: true,
  },
  {
    name: 'Retail & E-commerce',
    slug: 'retail',
    icon_name: 'ShoppingBag',
    tagline: 'Unified digital commerce from storefront to fulfilment and loyalty',
    description: 'Headless and platform-based stores, catalog and inventory workflows, customer journey optimization, automated campaigns.',
    capabilities: [
      'Headless & unified e-commerce architecture',
      'Catalog, inventory & order management workflows',
      'Cart recovery & automated retention campaigns',
      'Customer journey & conversion rate optimization',
      'Payment gateway & logistics API integrations',
    ],
    relevant_solutions: ['PulseStore', 'PulseEngage', 'PulseNexus'],
    is_primary: true,
  },
  {
    name: 'Education & Training',
    slug: 'education',
    icon_name: 'GraduationCap',
    tagline: 'Modern learning systems, student portals and verified credentialing',
    description: 'Learning platforms, student portals, course delivery, certificate management and assessment workflows.',
    capabilities: [
      'Custom LMS & student portal engineering',
      'Interactive course delivery & multimedia streaming',
      'Automated assessment & grading workflows',
      'Digital credential issuance & verification',
      'Multi-campus analytics & student engagement tracking',
    ],
    relevant_solutions: ['PulseLearn', 'PulseCert', 'PulseDesk'],
    is_primary: true,
  },
  {
    name: 'Certification & Compliance',
    slug: 'certification',
    icon_name: 'ClipboardCheck',
    tagline: 'Tamper-proof credentialing, audit trails and verification portals',
    description: 'Certificate lifecycle management, public verification portals, audit trails and secure issuance.',
    capabilities: [
      'Certificate lifecycle & issuance platforms',
      'Instant public verification with QR & cryptographic proofs',
      'Comprehensive audit trails & compliance logging',
      'Secure template design & automated batch generation',
      'Document security & revocation management',
    ],
    relevant_solutions: ['PulseCert', 'PulseCore', 'PulseVault'],
    is_primary: true,
  },
  {
    name: 'Healthcare & Care Services',
    slug: 'healthcare',
    icon_name: 'Heart',
    tagline: 'Secure digital patient touchpoints and care coordination systems',
    description: 'Patient and client portals, scheduling, intake workflows, information security alignment and service communication.',
    capabilities: [
      'Confidential patient & client self-service portals',
      'Automated appointment scheduling & intake forms',
      'HIPAA & GDPR data protection architecture',
      'Clinical workflow & care coordination tools',
      'Telehealth & multi-channel care communication',
    ],
    relevant_solutions: ['PulseCore', 'PulseWork', 'PulseDesk'],
    is_primary: true,
  },
  {
    name: 'Manufacturing & Logistics',
    slug: 'manufacturing',
    icon_name: 'Factory',
    tagline: 'Operational visibility, job tracking and legacy systems integration',
    description: 'Internal tools, job tracking, inventory and supplier workflows, operational dashboards and legacy integration.',
    capabilities: [
      'Real-time operational dashboards & telemetry',
      'Job tracking, work-order & dispatch management',
      'Supplier & inventory management workflows',
      'Legacy ERP & factory systems integration',
      'Quality assurance & compliance logging',
    ],
    relevant_solutions: ['PulseEngine', 'PulseWork', 'PulseNexus'],
    is_primary: false,
  },
  {
    name: 'Government & Public Service',
    slug: 'government',
    icon_name: 'Building2',
    tagline: 'Accessible, citizen-first digital services and secure governance',
    description: 'Citizen service workflows, accessible portals, records management and secure inter-department tools.',
    capabilities: [
      'WCAG-compliant, citizen-friendly digital services',
      'Secure records management & audit trails',
      'Inter-departmental workflow automation',
      'Citizen inquiry & support routing (PulseDesk)',
      'High-security hosting & data residency alignment',
    ],
    relevant_solutions: ['PulseCore', 'PulseDesk', 'PulseVault'],
    is_primary: false,
  },
  {
    name: 'Non-profit & Social Impact',
    slug: 'nonprofit',
    icon_name: 'HandHeart',
    tagline: 'Technology to amplify donor impact, volunteer reach and transparency',
    description: 'Beneficiary tracking, impact reporting platforms, fundraising websites and volunteer coordination.',
    capabilities: [
      'High-trust fundraising & donor management platforms',
      'Beneficiary tracking & field data collection',
      'Transparent impact reporting & data visualization',
      'Volunteer coordination & onboarding portals',
      'Grant lifecycle management & reporting',
    ],
    relevant_solutions: ['PulseCore', 'PulseEngage', 'PulseDesk'],
    is_primary: false,
  },
  {
    name: 'Startups & Growing SMEs',
    slug: 'startups',
    icon_name: 'Rocket',
    tagline: 'Fast MVP delivery, rapid launch velocity and scalable foundations',
    description: 'MVP delivery, rapid brand and website launch, automated operations and scalable foundation.',
    capabilities: [
      'Rapid prototype & MVP full-stack delivery',
      'High-impact corporate brand & website launch',
      'Automated back-office & lead generation workflows',
      'Scalable cloud architecture designed for growth',
      'Offshore engineering teams with high velocity',
    ],
    relevant_solutions: ['PulseCore', 'PulseEngine', 'PulseGrowth'],
    is_primary: false,
  },
];

const caseStudiesData = [
  {
    tag: 'SOFTWARE',
    industry: 'RETAIL & ECOMMERCE',
    title: 'Digital Commerce & Inventory Engine',
    slug: 'digital-commerce-inventory-engine',
    challenge: 'A fast-growing multi-channel merchant required a centralized inventory and order orchestration platform to replace siloed legacy tools.',
    solution_text: 'Pulse41 engineered a modular commerce architecture with automated multi-warehouse synchronization, customer self-service portals, and live analytics.',
    result: 'Streamlined order fulfillment cycle, reduced manual reconciliation bottlenecks, and improved customer satisfaction across digital channels.',
    tech_stack: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS'],
    cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&fit=crop',
    is_featured: true,
    is_published: true,
  },
  {
    tag: 'AI',
    industry: 'FINANCIAL SERVICES',
    title: 'Automated Risk & Intelligence Dashboard',
    slug: 'automated-risk-intelligence-dashboard',
    challenge: 'A financial institution needed accelerated transaction anomaly detection and risk scoring across high-volume daily feeds.',
    solution_text: 'Pulse41 deployed an automated ML-powered analytics pipeline with real-time anomaly alerts and role-based executive dashboards.',
    result: 'Accelerated audit reporting cycle, real-time risk flag generation, and unified visibility for governance committees.',
    tech_stack: ['Python', 'TensorFlow', 'FastAPI', 'Azure Cloud'],
    cover_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&fit=crop',
    is_featured: true,
    is_published: true,
  },
  {
    tag: 'WEB',
    industry: 'EDUCATION & EDTECH',
    title: 'Enterprise Learning & Assessment Platform',
    slug: 'enterprise-learning-assessment-platform',
    challenge: 'An educational organization required an accredited digital learning environment supporting blended curriculum, progress evaluation, and administrative workflows.',
    solution_text: 'Pulse41 built a multi-tenant learning platform featuring modular curriculum builders, automated grading verification, and student analytics.',
    result: 'Seamless scale to tens of thousands of active learners with significant reductions in administrative support overhead.',
    tech_stack: ['React', 'TypeScript', 'PostgreSQL', 'Docker'],
    cover_image_url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&fit=crop',
    is_featured: true,
    is_published: true,
  },
  {
    tag: 'MOBILE',
    industry: 'HEALTHCARE',
    title: 'Secure Patient Services & Portal App',
    slug: 'secure-patient-services-portal-app',
    challenge: 'A regional healthcare provider needed an accessible, HIPAA-aligned mobile gateway for appointment management, telehealth links, and records retrieval.',
    solution_text: 'Pulse41 architected an encrypted cross-platform mobile application with biometric authentication, automated reminders, and FHIR interoperability.',
    result: 'High patient adoption of digital self-service booking, reducing call-center queues and improving appointment adherence.',
    tech_stack: ['React Native', 'Node.js', 'FHIR API', 'AWS Cloud'],
    cover_image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&fit=crop',
    is_featured: true,
    is_published: true,
  },
];

const blogPostsData = [
  {
    title: 'The State of Applied AI in Modern Enterprises: Moving from Proof of Concept to Production',
    slug: 'applied-ai-modern-enterprises-poc-to-production',
    category: 'AI',
    excerpt: 'Artificial intelligence has crossed a threshold. It is no longer an experimental hobby — it is an operational mandate. This deep dive explores production architectures, RAG patterns, and cost-governance for business leaders.',
    content: 'Artificial intelligence has crossed a threshold. It is no longer an experimental hobby — it is an operational mandate. In this practical analysis, we evaluate the architectural shifts separating enterprise prototypes from resilient, auditable production AI. We cover retrieval-augmented generation (RAG) pipelines, latency trade-offs, vector database indexing, evaluation benchmarks, and privacy controls needed for compliance.',
    cover_image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&fit=crop',
    read_time: '8 min read',
    author_name: 'Pulse41 AI Practice',
    author_role: 'Applied AI Leadership',
    is_published: true,
    is_featured: true,
  },
  {
    title: 'Why Digital Transformation Projects Stumble (And the Architectural Principles That Ensure Success)',
    slug: 'why-digital-transformation-projects-stumble',
    category: 'TECHNOLOGY',
    excerpt: 'The majority of transformation initiatives fail due to organizational misalignment or legacy lock-in. This piece examines why modular API-first designs and disciplined delivery prevent costly failures.',
    content: 'Transformation initiatives fail not because of technology limitations, but because of rigid dependencies and organizational silos. We outline the core architectural disciplines: domain-driven modularity, strict API contracts, incremental migration strategies, and continuous stakeholder transparency that ensure multi-quarter projects deliver demonstrable ROI.',
    cover_image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&fit=crop',
    read_time: '6 min read',
    author_name: 'Pulse41 Architecture Team',
    author_role: 'Solutions Engineering',
    is_published: true,
    is_featured: false,
  },
  {
    title: 'Engineering Digital Growth Engines: Beyond Vanity Metrics into Full-Funnel Conversion',
    slug: 'engineering-digital-growth-engines',
    category: 'DIGITAL MARKETING',
    excerpt: 'Audience visibility without conversion is noise. We break down the quantitative approach to growth — connecting modern brand identity with automated CRM pipelines and attribution models.',
    content: 'Generating traffic is easy; converting that attention into qualified pipeline requires intentional engineering. We break down the end-to-end growth funnel: programmatic SEO, high-velocity landing page experimentation, multi-touch attribution modeling, and CRM automation that connects marketing spend directly to customer lifetime value.',
    cover_image_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&fit=crop',
    read_time: '5 min read',
    author_name: 'Pulse41 Growth Practice',
    author_role: 'Digital Marketing & Analytics',
    is_published: true,
    is_featured: false,
  },
  {
    title: 'Building Technology That Scales Across Borders: Architecture Decisions That Matter Early',
    slug: 'building-technology-scales-across-borders',
    category: 'BUSINESS',
    excerpt: 'The difference between software that lasts and software that breaks is rarely the framework — it is early data design, multitenancy structuring, and infrastructure isolation.',
    content: 'Expanding internationally introduces data sovereignty, currency compliance, localization latency, and cross-border regulatory friction. This article shares architectural design principles for multi-tenant applications to scale seamlessly across US, European, and Asian markets without costly rewrites.',
    cover_image_url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&fit=crop',
    read_time: '7 min read',
    author_name: 'Pulse41 Engineering Leadership',
    author_role: 'Enterprise Architecture',
    is_published: true,
    is_featured: false,
  },
  {
    title: 'Generative AI for Corporate Operations: The Practical Handbook Beyond the Hype',
    slug: 'generative-ai-corporate-operations-handbook',
    category: 'AI',
    excerpt: 'Every enterprise is urged to adopt AI. Here is how to realistically evaluate use cases, assess data cleanliness, and establish secure private enterprise knowledge systems.',
    content: 'A pragmatic roadmap for corporate executives: assessing enterprise data readiness, managing hallucination risks, enforcing private VPC deployment boundaries, calculating total cost of ownership (TCO), and establishing measurable success metrics before committing engineering headcount.',
    cover_image_url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&fit=crop',
    read_time: '9 min read',
    author_name: 'Pulse41 AI Practice',
    author_role: 'Intelligent Systems',
    is_published: true,
    is_featured: false,
  },
  {
    title: 'The Global Digital Readiness & Engineering Benchmark: 2026 Report',
    slug: 'global-digital-readiness-engineering-benchmark-2026',
    category: 'RESEARCH',
    excerpt: 'A comprehensive evaluation of digital capability, automation barriers, and platform investments across international mid-market enterprises.',
    content: 'Our annual benchmark synthesizes findings from mid-market technology leaders across manufacturing, finance, health, and retail sectors. We examine automation adoption rates, tech-debt burdens, talent constraints, and investment allocations for the upcoming fiscal years.',
    cover_image_url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&fit=crop',
    read_time: '12 min read',
    author_name: 'Pulse41 Research Group',
    author_role: 'Strategic Advisory',
    is_published: true,
    is_featured: false,
  },
];

const jobListingsData = [
  {
    title: 'Senior Full-Stack Engineer (React & Node.js)',
    department: 'ENGINEERING',
    type: 'Full-Time',
    location: 'Pakistan + Remote',
    description: 'Architect and build robust, high-performance web applications and cloud integrations. Lead code reviews and mentor engineering peers across global client engagements.',
    requirements: [
      '5+ years experience in production web engineering (TypeScript, React/Next.js, Node.js)',
      'Experience with PostgreSQL, Redis, and containerized deployments (Docker)',
      'Strong architectural intuition regarding API design, state management, and performance',
      'Demonstrated experience collaborating with international cross-functional teams',
    ],
    benefits: [
      'Competitive compensation package with performance incentives',
      'Flexible hybrid/remote working culture with modern equipment allowance',
      'Generous paid annual leave, health coverage, and wellness support',
      'Continuous education stipend for certifications and international conferences',
    ],
    apply_url: '/contact?ref=careers&role=senior-fullstack',
    is_active: true,
  },
  {
    title: 'Applied AI & ML Systems Engineer',
    department: 'AI',
    type: 'Full-Time',
    location: 'Pakistan + Remote',
    description: 'Design, optimize and deploy enterprise RAG pipelines, fine-tuned agentic models, and automated document extraction engines with rigorous security guardrails.',
    requirements: [
      '3+ years experience building production ML/AI applications with Python',
      'Hands-on experience with LLM orchestration (LangChain, LlamaIndex), embeddings, and vector DBs',
      'Solid grounding in API development (FastAPI), cloud deployment, and model latency profiling',
      'Familiarity with responsible AI frameworks, prompt security, and data privacy principles',
    ],
    benefits: [
      'Access to dedicated GPU compute and enterprise AI research resources',
      'Direct contribution to cutting-edge enterprise customer deployments',
      'Flexible working arrangements and learning stipends',
      'Comprehensive health coverage and paid leave',
    ],
    apply_url: '/contact?ref=careers&role=applied-ai-engineer',
    is_active: true,
  },
  {
    title: 'Product Designer (Design Systems & UI/UX)',
    department: 'DESIGN',
    type: 'Full-Time',
    location: 'Pakistan + Remote',
    description: 'Shape digital experience systems across web, enterprise portals, and mobile. Partner with product managers and engineers to turn user research into intuitive interfaces.',
    requirements: [
      '4+ years UX/UI design experience for complex web applications and SaaS products',
      'Advanced Figma proficiency with mastery of variables, auto-layout, and tokens',
      'Strong portfolio demonstrating design system governance and interaction craft',
      'Understanding of front-end capabilities (HTML/CSS/Tailwind) and responsive layout constraints',
    ],
    benefits: [
      'Work alongside elite engineers building state-of-the-art software',
      'High-impact creative ownership over client brand and product experiences',
      'Flexible remote schedule and high-end hardware setup',
      'Competitive compensation and wellness benefits',
    ],
    apply_url: '/contact?ref=careers&role=product-designer',
    is_active: true,
  },
  {
    title: 'Cloud DevOps & Platform Engineer',
    department: 'ENGINEERING',
    type: 'Full-Time',
    location: 'Pakistan + Remote',
    description: 'Manage containerized multi-cloud infrastructure on AWS/Azure, build automated CI/CD pipelines, and enforce zero-trust security postures.',
    requirements: [
      '3+ years managing AWS or Azure cloud environments with Infrastructure as Code (Terraform)',
      'Deep knowledge of Kubernetes, Docker, Linux administration, and network routing',
      'Experience setting up end-to-end CI/CD workflows (GitHub Actions, GitLab CI)',
      'Understanding of security baselines (SOC 2, ISO 27001) and incident response',
    ],
    benefits: [
      'Opportunity to design and run scalable infrastructure for global brands',
      'Comprehensive cloud certification sponsorship and examination support',
      'Competitive salary and flexible remote options',
      'Health insurance and wellness stipends',
    ],
    apply_url: '/contact?ref=careers&role=cloud-devops',
    is_active: true,
  },
  {
    title: 'Technical Delivery & Project Manager',
    department: 'OPERATIONS',
    type: 'Full-Time',
    location: 'Pakistan + Remote',
    description: 'Orchestrate client discovery, scope sprint deliverables, oversee quality assurance checkpoints, and ensure dependable, transparent milestone execution.',
    requirements: [
      '4+ years managing software engineering project deliveries using Agile / Scrum',
      'Technical fluency to converse with senior software architects and client C-suite',
      'Proven track record delivering client projects on schedule with tight budget control',
      'Superb verbal and written English communication skills',
    ],
    benefits: [
      'Lead pivotal client engagements with international exposure',
      'Transparent bonus incentives tied to delivery success',
      'Flexible remote schedule and supportive team culture',
      'Comprehensive health coverage and annual leave allowance',
    ],
    apply_url: '/contact?ref=careers&role=delivery-manager',
    is_active: true,
  },
];

const testimonialsData = [
  {
    name: 'Michael Chen',
    title: 'Senior Software Engineer, Cloud Infrastructure (Client Representative)',
    description: 'Working with Pulse41 completely transformed our infrastructure. The engineering discipline and architecture support were exceptional — they delivered beyond our expectations and helped us scale seamlessly.',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=470&h=470&fit=crop',
    is_active: true,
  },
  {
    name: 'Jessica Roberts',
    title: 'Lead Data Scientist, Global Analytics (Client Representative)',
    description: 'The executive intelligence and data pipelines Pulse41 architected gave our team the confidence and capability needed for real-time decision-making. Their practical AI delivery sets them apart.',
    image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=470&h=470&fit=crop',
    is_active: true,
  },
  {
    name: 'William Carter',
    title: 'VP Product Engineering, Enterprise Tech (Client Representative)',
    description: 'Pulse41 helped our product teams accelerate release velocity while tightening security controls. Their engineering leadership exceeded delivery milestones across every phase of the engagement.',
    image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=470&h=470&fit=crop',
    is_active: true,
  },
];

async function seed() {
  const client = await pool.connect();
  try {
    console.log('Seeding Supabase database...');

    // 1. Services
    console.log('Seeding services...');
    for (let i = 0; i < servicesData.length; i++) {
      const s = servicesData[i];
      await client.query(`
        INSERT INTO public.services (
          num, title, slug, tagline, typical_outcomes, description,
          core_capabilities, capabilities, detailed_areas, control_framework,
          color, sort_order, is_active
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true)
        ON CONFLICT (slug) DO UPDATE SET
          num = EXCLUDED.num,
          title = EXCLUDED.title,
          tagline = EXCLUDED.tagline,
          typical_outcomes = EXCLUDED.typical_outcomes,
          description = EXCLUDED.description,
          core_capabilities = EXCLUDED.core_capabilities,
          capabilities = EXCLUDED.capabilities,
          detailed_areas = EXCLUDED.detailed_areas,
          control_framework = EXCLUDED.control_framework,
          color = EXCLUDED.color,
          sort_order = EXCLUDED.sort_order;
      `, [
        s.num, s.title, s.slug, s.tagline, s.typicalOutcomes, s.description,
        s.coreCapabilities, s.coreCapabilities, JSON.stringify(s.detailedAreas || []),
        s.controlFramework || [], s.color, i,
      ]);
    }
    console.log(` Seeded ${servicesData.length} services.`);

    // 2. Solutions
    console.log('Seeding solutions...');
    for (let i = 0; i < solutionsData.length; i++) {
      const s = solutionsData[i];
      await client.query(`
        INSERT INTO public.solutions (
          num, title, product_name, slug, tagline, business_need,
          core_components_text, core_components, capabilities, description,
          icon, sort_order, is_active
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true)
        ON CONFLICT (slug) DO UPDATE SET
          num = EXCLUDED.num,
          title = EXCLUDED.title,
          product_name = EXCLUDED.product_name,
          tagline = EXCLUDED.tagline,
          business_need = EXCLUDED.business_need,
          core_components_text = EXCLUDED.core_components_text,
          core_components = EXCLUDED.core_components,
          capabilities = EXCLUDED.capabilities,
          description = EXCLUDED.description,
          icon = EXCLUDED.icon,
          sort_order = EXCLUDED.sort_order;
      `, [
        s.num, s.title, s.productName, s.slug, s.tagline, s.businessNeed,
        s.coreComponentsText, s.coreComponents, s.capabilities, s.description,
        s.icon, i,
      ]);
    }
    console.log(` Seeded ${solutionsData.length} solutions.`);

    // 3. Industries
    console.log('Seeding industries...');
    for (let i = 0; i < industriesData.length; i++) {
      const ind = industriesData[i];
      await client.query(`
        INSERT INTO public.industries (
          name, slug, icon_name, tagline, description,
          capabilities, relevant_solutions, is_primary, sort_order, is_active
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true)
        ON CONFLICT (slug) DO UPDATE SET
          name = EXCLUDED.name,
          icon_name = EXCLUDED.icon_name,
          tagline = EXCLUDED.tagline,
          description = EXCLUDED.description,
          capabilities = EXCLUDED.capabilities,
          relevant_solutions = EXCLUDED.relevant_solutions,
          is_primary = EXCLUDED.is_primary,
          sort_order = EXCLUDED.sort_order;
      `, [
        ind.name, ind.slug, ind.icon_name, ind.tagline, ind.description,
        ind.capabilities, ind.relevant_solutions, ind.is_primary, i,
      ]);
    }
    console.log(` Seeded ${industriesData.length} industries.`);

    // 4. Case Studies
    console.log('Seeding case studies...');
    for (let i = 0; i < caseStudiesData.length; i++) {
      const c = caseStudiesData[i];
      await client.query(`
        INSERT INTO public.case_studies (
          tag, industry, title, slug, challenge, solution_text,
          result, tech_stack, cover_image_url, is_featured, is_published, sort_order
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (slug) DO UPDATE SET
          tag = EXCLUDED.tag,
          industry = EXCLUDED.industry,
          title = EXCLUDED.title,
          challenge = EXCLUDED.challenge,
          solution_text = EXCLUDED.solution_text,
          result = EXCLUDED.result,
          tech_stack = EXCLUDED.tech_stack,
          cover_image_url = EXCLUDED.cover_image_url,
          is_featured = EXCLUDED.is_featured,
          is_published = EXCLUDED.is_published,
          sort_order = EXCLUDED.sort_order;
      `, [
        c.tag, c.industry, c.title, c.slug, c.challenge, c.solution_text,
        c.result, c.tech_stack, c.cover_image_url, c.is_featured, c.is_published, i,
      ]);
    }
    console.log(` Seeded ${caseStudiesData.length} case studies.`);

    // 5. Blog Posts
    console.log('Seeding blog posts...');
    for (let i = 0; i < blogPostsData.length; i++) {
      const b = blogPostsData[i];
      await client.query(`
        INSERT INTO public.blog_posts (
          title, slug, category, excerpt, content, cover_image_url,
          read_time, author_name, author_role, is_published, is_featured
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (slug) DO UPDATE SET
          title = EXCLUDED.title,
          category = EXCLUDED.category,
          excerpt = EXCLUDED.excerpt,
          content = EXCLUDED.content,
          cover_image_url = EXCLUDED.cover_image_url,
          read_time = EXCLUDED.read_time,
          author_name = EXCLUDED.author_name,
          author_role = EXCLUDED.author_role,
          is_published = EXCLUDED.is_published,
          is_featured = EXCLUDED.is_featured;
      `, [
        b.title, b.slug, b.category, b.excerpt, b.content, b.cover_image_url,
        b.read_time, b.author_name, b.author_role, b.is_published, b.is_featured,
      ]);
    }
    console.log(` Seeded ${blogPostsData.length} blog posts.`);

    // 6. Job Listings
    console.log('Seeding job listings...');
    // Clear existing for clean reload
    await client.query('DELETE FROM public.job_listings;');
    for (let i = 0; i < jobListingsData.length; i++) {
      const j = jobListingsData[i];
      await client.query(`
        INSERT INTO public.job_listings (
          title, department, type, location, description,
          requirements, benefits, apply_url, is_active, sort_order
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
      `, [
        j.title, j.department, j.type, j.location, j.description,
        j.requirements, j.benefits, j.apply_url, j.is_active, i,
      ]);
    }
    console.log(` Seeded ${jobListingsData.length} job listings.`);

    // 7. Testimonials
    console.log('Seeding testimonials...');
    await client.query('DELETE FROM public.testimonials;');
    for (let i = 0; i < testimonialsData.length; i++) {
      const t = testimonialsData[i];
      await client.query(`
        INSERT INTO public.testimonials (
          name, title, description, image_url, is_active, sort_order
        ) VALUES ($1, $2, $3, $4, $5, $6);
      `, [
        t.name, t.title, t.description, t.image_url, t.is_active, i,
      ]);
    }
    console.log(` Seeded ${testimonialsData.length} testimonials.`);

    // Verify row counts
    const tables = ['services', 'solutions', 'industries', 'case_studies', 'blog_posts', 'job_listings', 'testimonials'];
    console.log('\n--- VERIFICATION ROW COUNTS ---');
    for (const tbl of tables) {
      const res = await client.query(`SELECT COUNT(*)::int as count FROM public.${tbl}`);
      console.log(`${tbl}: ${res.rows[0].count} rows`);
    }

  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
