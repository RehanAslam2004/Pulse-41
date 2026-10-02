/* ── Pulse41 Industry Applications ─────────────────────────────────── */
/* From: P41-COR-CP-002 Global Corporate Profile V2.0 (Page 13)       */
/* 10 Industry Sectors with direct solution mappings                  */

import {
  Monitor,
  Briefcase,
  ShoppingBag,
  GraduationCap,
  ClipboardCheck,
  Heart,
  Factory,
  Building2,
  HandHeart,
  Rocket,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Industry {
  name: string
  slug: string
  Icon?: LucideIcon
  iconName?: string
  tagline: string
  description: string
  capabilities: string[]
  relevantSolutions: string[]
  primary: boolean
}

export const industries: Industry[] = [
  {
    name: 'Technology & SaaS',
    slug: 'technology',
    Icon: Monitor,
    tagline: 'Engineering for technology companies and high-growth SaaS platforms',
    description: 'SaaS product engineering, multi-tenant architecture, integrations, developer support and operational scaling.',
    capabilities: [
      'Multi-tenant architecture & cloud infrastructure',
      'API design, development & third-party integrations',
      'Continuous deployment, DevOps & automated QA',
      'Data pipeline & analytics engineering',
      'Platform security & operational scaling',
    ],
    relevantSolutions: ['PulseCore', 'PulseEngine', 'PulseNexus'],
    primary: true,
  },
  {
    name: 'Professional Services',
    slug: 'professional-services',
    Icon: Briefcase,
    tagline: 'Digital platforms & automated workflows for client-centric service firms',
    description: 'Practice websites, client onboarding, practice management workflows, secure client portals and CRM.',
    capabilities: [
      'High-conversion practice & authority websites',
      'Automated client onboarding & intake flows',
      'Secure client portals & document exchange',
      'Billing, invoicing & practice management integrations',
      'Client relationship management (CRM) workflows',
    ],
    relevantSolutions: ['PulseCore', 'PulseWork', 'PulseEngage'],
    primary: true,
  },
  {
    name: 'Retail & E-commerce',
    slug: 'retail',
    Icon: ShoppingBag,
    tagline: 'Unified digital commerce from storefront to fulfilment and loyalty',
    description: 'Headless and platform-based stores, catalog and inventory workflows, customer journey optimization, automated campaigns.',
    capabilities: [
      'Headless & unified e-commerce architecture',
      'Catalog, inventory & order management workflows',
      'Cart recovery & automated retention campaigns',
      'Customer journey & conversion rate optimization',
      'Payment gateway & logistics API integrations',
    ],
    relevantSolutions: ['PulseStore', 'PulseEngage', 'PulseNexus'],
    primary: true,
  },
  {
    name: 'Education & Training',
    slug: 'education',
    Icon: GraduationCap,
    tagline: 'Modern learning systems, student portals and verified credentialing',
    description: 'Learning platforms, student portals, course delivery, certificate management and assessment workflows.',
    capabilities: [
      'Custom LMS & student portal engineering',
      'Interactive course delivery & multimedia streaming',
      'Automated assessment & grading workflows',
      'Digital credential issuance & verification',
      'Multi-campus analytics & student engagement tracking',
    ],
    relevantSolutions: ['PulseLearn', 'PulseCert', 'PulseDesk'],
    primary: true,
  },
  {
    name: 'Certification & Compliance',
    slug: 'certification',
    Icon: ClipboardCheck,
    tagline: 'Tamper-proof credentialing, audit trails and verification portals',
    description: 'Certificate lifecycle management, public verification portals, audit trails and secure issuance.',
    capabilities: [
      'Certificate lifecycle & issuance platforms',
      'Instant public verification with QR & cryptographic proofs',
      'Comprehensive audit trails & compliance logging',
      'Secure template design & automated batch generation',
      'Document security & revocation management',
    ],
    relevantSolutions: ['PulseCert', 'PulseCore', 'PulseVault'],
    primary: true,
  },
  {
    name: 'Healthcare & Care Services',
    slug: 'healthcare',
    Icon: Heart,
    tagline: 'Secure digital patient touchpoints and care coordination systems',
    description: 'Patient and client portals, scheduling, intake workflows, information security alignment and service communication.',
    capabilities: [
      'Confidential patient & client self-service portals',
      'Automated appointment scheduling & intake forms',
      'HIPAA & GDPR data protection architecture',
      'Clinical workflow & care coordination tools',
      'Telehealth & multi-channel care communication',
    ],
    relevantSolutions: ['PulseCore', 'PulseWork', 'PulseDesk'],
    primary: true,
  },
  {
    name: 'Manufacturing & Logistics',
    slug: 'manufacturing',
    Icon: Factory,
    tagline: 'Operational visibility, job tracking and legacy systems integration',
    description: 'Internal tools, job tracking, inventory and supplier workflows, operational dashboards and legacy integration.',
    capabilities: [
      'Real-time operational dashboards & telemetry',
      'Job tracking, work-order & dispatch management',
      'Supplier & inventory management workflows',
      'Legacy ERP & factory systems integration',
      'Quality assurance & compliance logging',
    ],
    relevantSolutions: ['PulseEngine', 'PulseWork', 'PulseNexus'],
    primary: false,
  },
  {
    name: 'Government & Public Service',
    slug: 'government',
    Icon: Building2,
    tagline: 'Accessible, citizen-first digital services and secure governance',
    description: 'Citizen service workflows, accessible portals, records management and secure inter-department tools.',
    capabilities: [
      'WCAG-compliant, citizen-friendly digital services',
      'Secure records management & audit trails',
      'Inter-departmental workflow automation',
      'Citizen inquiry & support routing (PulseDesk)',
      'High-security hosting & data residency alignment',
    ],
    relevantSolutions: ['PulseCore', 'PulseDesk', 'PulseVault'],
    primary: false,
  },
  {
    name: 'Non-profit & Social Impact',
    slug: 'nonprofit',
    Icon: HandHeart,
    tagline: 'Technology to amplify donor impact, volunteer reach and transparency',
    description: 'Beneficiary tracking, impact reporting platforms, fundraising websites and volunteer coordination.',
    capabilities: [
      'High-trust fundraising & donor management platforms',
      'Beneficiary tracking & field data collection',
      'Transparent impact reporting & data visualization',
      'Volunteer coordination & onboarding portals',
      'Grant lifecycle management & reporting',
    ],
    relevantSolutions: ['PulseCore', 'PulseEngage', 'PulseDesk'],
    primary: false,
  },
  {
    name: 'Startups & Growing SMEs',
    slug: 'startups',
    Icon: Rocket,
    tagline: 'Fast MVP delivery, rapid launch velocity and scalable foundations',
    description: 'MVP delivery, rapid brand and website launch, automated operations and scalable foundation.',
    capabilities: [
      'Rapid prototype & MVP full-stack delivery',
      'High-impact corporate brand & website launch',
      'Automated back-office & lead generation workflows',
      'Scalable cloud architecture designed for growth',
      'Offshore engineering teams with high velocity',
    ],
    relevantSolutions: ['PulseCore', 'PulseEngine', 'PulseGrowth'],
    primary: false,
  },
]
