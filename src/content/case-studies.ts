export interface CaseStudy {
  id?: string
  tag: string
  industry: string
  title: string
  slug: string
  challenge: string
  solution: string
  result: string
  metrics?: { label: string; value: string }[]
  timeline?: string
  clientType?: string
  tech: string[]
  coverImageUrl?: string
  isFeatured?: boolean
}

export const fallbackCaseStudies: CaseStudy[] = [
  {
    tag: 'SOFTWARE',
    industry: 'RETAIL & ECOMMERCE',
    title: 'Digital Commerce & Inventory Engine',
    slug: 'digital-commerce-inventory-engine',
    challenge: 'A fast-growing multi-channel merchant required a centralized inventory and order orchestration platform to replace siloed legacy tools and eliminate stock sync delays.',
    solution: 'Pulse41 engineered a modular commerce architecture with automated multi-warehouse synchronization, real-time event streaming, and customer self-service portals.',
    result: 'Streamlined order fulfillment cycle, reduced manual reconciliation bottlenecks, and improved customer satisfaction across global digital channels.',
    metrics: [
      { label: 'Fulfillment Velocity', value: '3.4x Faster' },
      { label: 'Inventory Sync Delay', value: '< 2.5s' },
      { label: 'Peak Order Throughput', value: '+140%' },
    ],
    timeline: '14 Weeks to Production',
    clientType: 'Omni-Channel Retail Enterprise',
    tech: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS Cloud', 'Redis'],
    coverImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    isFeatured: true,
  },
  {
    tag: 'AI',
    industry: 'FINANCIAL SERVICES',
    title: 'Automated Risk & Intelligence Dashboard',
    slug: 'automated-risk-intelligence-dashboard',
    challenge: 'A cross-border financial institution needed accelerated transaction anomaly detection and risk scoring across high-volume daily feeds without increasing false-positive rates.',
    solution: 'Pulse41 deployed an automated ML-powered analytics pipeline with real-time anomaly alerts, model governance, and role-based executive dashboards.',
    result: 'Accelerated audit reporting cycle, real-time risk flag generation, and unified compliance visibility for executive governance committees.',
    metrics: [
      { label: 'Anomaly Detection', value: 'Sub-Second' },
      { label: 'Audit Lead Time', value: '-65%' },
      { label: 'Daily Stream Capacity', value: '12M+ Events' },
    ],
    timeline: '10 Weeks to Production',
    clientType: 'Cross-Border Financial Institution',
    tech: ['Python', 'TensorFlow', 'FastAPI', 'Azure Cloud', 'Kafka'],
    coverImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
    isFeatured: true,
  },
  {
    tag: 'WEB',
    industry: 'EDUCATION & EDTECH',
    title: 'Enterprise Learning & Assessment Platform',
    slug: 'enterprise-learning-assessment-platform',
    challenge: 'An educational organization required an accredited digital learning environment supporting blended curriculum, progress evaluation, and high-concurrency test taking.',
    solution: 'Pulse41 built a multi-tenant learning platform featuring modular curriculum builders, automated grading verification, and low-latency student analytics.',
    result: 'Seamless scale to tens of thousands of active learners with significant reductions in administrative support overhead and zero server downtime.',
    metrics: [
      { label: 'Active Learners Scaled', value: '45,000+' },
      { label: 'Administrative Overhead', value: '-42%' },
      { label: 'Platform Availability', value: '99.98%' },
    ],
    timeline: '16 Weeks to Production',
    clientType: 'Accredited Higher Education Network',
    tech: ['React', 'TypeScript', 'PostgreSQL', 'Docker', 'GraphQL'],
    coverImageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&auto=format&fit=crop&q=80',
    isFeatured: true,
  },
  {
    tag: 'MOBILE',
    industry: 'HEALTHCARE',
    title: 'Secure Patient Services & Portal App',
    slug: 'secure-patient-services-portal-app',
    challenge: 'A regional healthcare provider needed an accessible, HIPAA-aligned mobile gateway for appointment management, telehealth links, and biometric records retrieval.',
    solution: 'Pulse41 architected an encrypted cross-platform mobile application with biometric authentication, automated reminders, and FHIR interoperability.',
    result: 'High patient adoption of digital self-service booking, reducing call-center queues and improving clinical appointment adherence.',
    metrics: [
      { label: 'Self-Service Adoption', value: '78%' },
      { label: 'Call Center Volume', value: '-35%' },
      { label: 'HIPAA & SOC 2 Audit', value: '100% Pass' },
    ],
    timeline: '12 Weeks to Production',
    clientType: 'Regional Hospital & Outpatient Group',
    tech: ['React Native', 'Node.js', 'FHIR API', 'AWS Cloud', 'PostgreSQL'],
    coverImageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
    isFeatured: true,
  },
]
