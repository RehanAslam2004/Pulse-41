/* ── Pulse41 Delivery Methodology, Quality & Security ────────────────── */
/* From: P41-COR-CP-002 Global Corporate Profile V2.0 (Page 16)         */

export interface MethodologyStep {
  num: string
  title: string
  description: string
  focus: string
}

export const methodology: MethodologyStep[] = [
  {
    num: '01',
    title: 'DISCOVER',
    description: 'Objectives, constraints, stakeholders, systems and business context.',
    focus: 'Stakeholder interviews, legacy audit, business economics and requirement scope.',
  },
  {
    num: '02',
    title: 'DEFINE',
    description: 'Scope, user journeys, requirements, acceptance criteria and metrics.',
    focus: 'Detailed functional specs, acceptance criteria, KPIs, risk log and boundary setting.',
  },
  {
    num: '03',
    title: 'ARCHITECT',
    description: 'Solution, data, integration, security and hosting architecture.',
    focus: 'High-availability infrastructure, schema design, security model and API mapping.',
  },
  {
    num: '04',
    title: 'PLAN',
    description: 'Roadmap, sprints, milestones, risk register and resource allocation.',
    focus: 'Sprint cadence, communication schedule, mitigation paths and sign-off gates.',
  },
  {
    num: '05',
    title: 'BUILD OR CONFIGURE',
    description: 'Software, integrations, automations, content and data pipeline.',
    focus: 'Disciplined code craft, clean components, automated tests and integration hooks.',
  },
  {
    num: '06',
    title: 'VERIFY',
    description: 'Quality assurance, regression, performance, security review and UAT support.',
    focus: 'End-to-end testing, performance audits, vulnerability scans and client UAT.',
  },
  {
    num: '07',
    title: 'ACCEPT AND DEPLOY',
    description: 'Client acceptance, release management, production launch and rollback readiness.',
    focus: 'Formal acceptance sign-off, zero-downtime deployment and rollback validation.',
  },
  {
    num: '08',
    title: 'ENABLE',
    description: 'Knowledge transfer, documentation, team training and handover checklist.',
    focus: 'Technical runbooks, admin user training, code repository transfer and operational readiness.',
  },
  {
    num: '09',
    title: 'SUPPORT AND IMPROVE',
    description: 'Hypercare, ongoing support, monitoring and optimization cycles.',
    focus: 'SLA-backed maintenance, uptime telemetry, continuous feature iterations and marketing sync.',
  },
]

export const qualityAssuranceControls = [
  'Automated code quality checks and peer review for all software commits.',
  'Structured test plans covering functional, regression, integration and user-acceptance scenarios.',
  'Formal deployment checklists, version control discipline and rollback procedures.',
  'Cross-browser, cross-device and performance verification on representative environments.',
  'Accessibility-aware development practices aligned with current web standards (WCAG).',
]

export const informationSecurityPractices = [
  'Role-based access control, least-privilege principles and multi-factor authentication on all project infrastructure.',
  'Secure secrets management; no credentials in source repositories or uncontrolled channels.',
  'Encrypted data transmission (TLS/HTTPS) and industry-standard encryption for data at rest.',
  'Regular dependency vulnerability scanning and patch management.',
  'NDAs, IP assignment agreements and confidentiality controls with all personnel and contractors.',
  'Data protection practices aligned with GDPR, UK GDPR and applicable privacy regulations.',
]

export const evidenceStandard = [
  'Tested, documented code in client-accessible repositories.',
  'Test execution records and acceptance sign-offs.',
  'Architecture, integration, and configuration documentation.',
  'Deployment and runbook documentation for operational continuity.',
  'Regular status reporting against agreed milestones, deliverables and SLAs.',
]
