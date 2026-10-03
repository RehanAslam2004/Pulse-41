'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Monitor,
  Briefcase,
  ShoppingCart,
  GraduationCap,
  ClipboardCheck,
  Heart,
  Box,
  Building2,
  Users,
  Rocket,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCode,
  Cloud,
  Shield,
  FileText,
  Workflow,
  Sparkles,
  Database,
  Truck,
  Landmark,
  HandHeart,
  BarChart3,
  Award,
} from 'lucide-react'
import { industries as defaultIndustries, type Industry } from '@/content/industries'

// High-resolution photography matching reference and domain context
const industryPhotos: Record<string, string> = {
  technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'professional-services': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  retail: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
  education: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
  certification: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&q=80',
  healthcare: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=800&q=80',
  manufacturing: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
  government: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  nonprofit: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
  startups: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
}

// Tailored 3-pillar engineering breakdown per sector matching the inspo layout
interface Pillar {
  title: string
  desc: string
  icon: typeof FileCode
}

const sectorShowcaseDetails: Record<
  string,
  {
    headline: string
    description: string
    pillars: Pillar[]
  }
> = {
  technology: {
    headline: 'Technology that scales with your ambition.',
    description:
      'We help SaaS and technology companies design, build and scale secure, resilient platforms — from product engineering and cloud infrastructure to integrations, data and operational tooling.',
    pillars: [
      {
        title: 'Product & platform engineering',
        desc: 'Multi-tenant architecture, modern web and mobile applications, and developer tooling.',
        icon: FileCode,
      },
      {
        title: 'Cloud infrastructure & DevOps',
        desc: 'Scalable, cost-efficient infrastructure with automated deployment, monitoring and operations.',
        icon: Cloud,
      },
      {
        title: 'Integrations, data & security',
        desc: 'Third-party integrations, data pipelines and analytics, with security and compliance built in.',
        icon: Shield,
      },
    ],
  },
  'professional-services': {
    headline: 'Digital platforms for modern practice excellence.',
    description:
      'We build client intake portals, practice management automations, and secure document vaults tailored to advisory, legal, accounting, and consulting firms.',
    pillars: [
      {
        title: 'Client intake & engagement portals',
        desc: 'Frictionless onboarding flows, identity verification, and collaborative engagement workspaces.',
        icon: FileCode,
      },
      {
        title: 'Practice workflow automation',
        desc: 'Automated billing, document lifecycle management, and bi-directional CRM integration.',
        icon: Workflow,
      },
      {
        title: 'Confidentiality & compliance vaults',
        desc: 'Encrypted document repositories with audit logging and SOC 2 / GDPR adherence.',
        icon: Shield,
      },
    ],
  },
  retail: {
    headline: 'High-conversion commerce and unified operations.',
    description:
      'We engineer fast headless storefronts, multi-warehouse inventory synchronization, and omnichannel customer retention engines.',
    pillars: [
      {
        title: 'Sub-second headless storefronts',
        desc: 'Lightning-fast Next.js digital storefronts optimized for maximum conversion and mobile checkout.',
        icon: ShoppingCart,
      },
      {
        title: 'Unified inventory & logistics mesh',
        desc: 'Real-time multi-location inventory synchronization across e-commerce and retail channels.',
        icon: Database,
      },
      {
        title: 'Retention & customer lifetime value',
        desc: 'Personalized recommendation engines, automated cart recovery, and VIP customer loyalty.',
        icon: Users,
      },
    ],
  },
  education: {
    headline: 'Scalable digital learning and student engagement.',
    description:
      'We develop modern LMS platforms, cohort learning environments, and verifiable academic credential systems.',
    pillars: [
      {
        title: 'Interactive LMS & cohort spaces',
        desc: 'Modular curriculum delivery, interactive assessments, and real-time student telemetry.',
        icon: FileCode,
      },
      {
        title: 'Elastic video & streaming infra',
        desc: 'Low-latency multimedia streaming, automated transcripts, and offline study support.',
        icon: Cloud,
      },
      {
        title: 'Tamper-evident credential issuance',
        desc: 'Instant cryptographic certificates and public lookup registries aligned with SCORM/xAPI.',
        icon: Award,
      },
    ],
  },
  certification: {
    headline: 'Cryptographic trust and automated verification.',
    description:
      'We engineer tamper-proof digital credential registries, automated audit trails, and instant public validation portals.',
    pillars: [
      {
        title: 'Cryptographic badge issuance',
        desc: 'Batch generation of verifiable credentials with QR-based cryptographic signatures.',
        icon: Award,
      },
      {
        title: 'Real-time verification registry',
        desc: 'Public lookup engines and API endpoints for instant third-party validation.',
        icon: Shield,
      },
      {
        title: 'Revocation & compliance lifecycle',
        desc: 'Automated expiry alerts, administrative revocation workflows, and audit logging.',
        icon: Workflow,
      },
    ],
  },
  healthcare: {
    headline: 'Compliant digital health and clinical telemetry.',
    description:
      'We build HIPAA-compliant patient portals, remote care coordination tools, and secure clinical data integration pipelines.',
    pillars: [
      {
        title: 'HIPAA & GDPR clinical portals',
        desc: 'Secure telehealth scheduling, patient records access, and encrypted physician messaging.',
        icon: Heart,
      },
      {
        title: 'EHR / EMR interoperability',
        desc: 'HL7 and FHIR data pipelines connecting diagnostic tools and hospital management systems.',
        icon: Database,
      },
      {
        title: 'Zero-trust health data security',
        desc: 'End-to-end encryption at rest and in transit with comprehensive clinical audit logging.',
        icon: Shield,
      },
    ],
  },
  manufacturing: {
    headline: 'Connected operations and intelligent field logistics.',
    description:
      'We engineer IoT telemetry dashboards, automated work-order dispatch systems, and predictive supply chain tracking.',
    pillars: [
      {
        title: 'Real-time field service logistics',
        desc: 'Intelligent dispatch dashboards, mobile technician offline apps, and GPS route optimization.',
        icon: Truck,
      },
      {
        title: 'Telemetry & predictive maintenance',
        desc: 'Edge sensor ingestion, anomaly detection, and automated machinery service schedules.',
        icon: Cloud,
      },
      {
        title: 'Supply chain visibility pipelines',
        desc: 'End-to-end inventory telemetry from raw materials to final customer delivery.',
        icon: Database,
      },
    ],
  },
  government: {
    headline: 'Accessible citizen services and secure governance.',
    description:
      'We deliver WCAG 2.1 AA accessible public portals, sovereign cloud deployments, and multi-departmental data workflows.',
    pillars: [
      {
        title: 'Accessible citizen web portals',
        desc: 'Mobile-first, multilingual civic services with verified digital identity authentication.',
        icon: Landmark,
      },
      {
        title: 'Sovereign cloud & zero-trust posture',
        desc: 'Government-grade data segregation, FedRAMP/ISO alignment, and air-gapped backups.',
        icon: Shield,
      },
      {
        title: 'Inter-agency workflow orchestration',
        desc: 'Secure API mesh connecting legacy municipal registries and modern civic tools.',
        icon: Workflow,
      },
    ],
  },
  nonprofit: {
    headline: 'Impact measurement and donor engagement platforms.',
    description:
      'We build secure fundraising platforms, volunteer coordination tools, and transparent impact reporting dashboards.',
    pillars: [
      {
        title: 'Donor retention & recurring giving',
        desc: 'High-conversion donation funnels with automated tax receipts and pledge tracking.',
        icon: HandHeart,
      },
      {
        title: 'Volunteer mobilization tools',
        desc: 'Event scheduling, volunteer onboarding, and decentralized field communication apps.',
        icon: Users,
      },
      {
        title: 'Impact telemetry & public reporting',
        desc: 'Real-time philanthropic metrics and grant compliance tracking dashboards.',
        icon: BarChart3,
      },
    ],
  },
  startups: {
    headline: 'Rapid MVP execution and scalable cloud foundations.',
    description:
      'We help founders accelerate from idea to production-ready market launch with modern architecture, CI/CD, and rapid product velocity.',
    pillars: [
      {
        title: 'Fast-track product engineering',
        desc: 'High-velocity Next.js/React development with production-ready authentication and billing.',
        icon: Rocket,
      },
      {
        title: 'Elastic cloud infrastructure',
        desc: 'Serverless architectures and automated CI/CD pipelines designed to scale cost-effectively.',
        icon: Cloud,
      },
      {
        title: 'Product telemetry & growth stack',
        desc: 'Event analytics, onboarding funnels, and customer feedback loops built in from day one.',
        icon: Database,
      },
    ],
  },
}

// 10 Sector definitions matching the selector icons
const sectorIcons: Record<string, typeof Monitor> = {
  technology: Monitor,
  'professional-services': Briefcase,
  retail: ShoppingCart,
  education: GraduationCap,
  certification: ClipboardCheck,
  healthcare: Heart,
  manufacturing: Box,
  government: Building2,
  nonprofit: Users,
  startups: Rocket,
}

export function IndustriesPageClient({ industriesData }: { industriesData?: Industry[] } = {}) {
  const allIndustries = industriesData && industriesData.length > 0 ? industriesData : defaultIndustries
  const [active, setActive] = useState(0)
  const currentSector = allIndustries[active] || allIndustries[0]
  const currentPhoto = industryPhotos[currentSector.slug] || industryPhotos['technology']
  const showcaseData = sectorShowcaseDetails[currentSector.slug] || sectorShowcaseDetails['technology']

  return (
    <div className="page-enter bg-white text-[#0F172A] selection:bg-[#3B82F6]/20">
      {/* ── 1. HERO SECTION (DARK NAVY MATCHING INSPO) ───────────────────── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-8 bg-[#0F172A] text-white border-b border-slate-800 overflow-hidden">
        {/* Subtle mesh background */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(147,197,253,0.12)_1px,transparent_1px)] bg-[size:36px_36px] opacity-25" />
        <div className="absolute top-1/4 -right-20 w-[550px] h-[550px] bg-[#3B82F6]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Headline Column */}
            <div className="lg:col-span-7">
              <div className="hero-animate hero-d1 text-xs font-semibold tracking-[0.16em] uppercase text-blue-400 mb-4">
                Industry Sectors & Expertise
              </div>

              <h1 className="hero-animate hero-d2 text-[clamp(2.75rem,5vw,4.5rem)] font-extrabold leading-[1.04] text-white tracking-[-0.035em] mb-6">
                Built for your industry.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CBD5E1] to-[#93C5FD]">
                  Engineered for what&apos;s next.
                </span>
              </h1>

              <p className="hero-animate hero-d3 text-lg sm:text-xl leading-relaxed text-[#94A3B8] max-w-xl mb-8">
                Domain-specific software, data and digital experiences to help you operate more efficiently, stay compliant and create meaningful impact.
              </p>

              <div className="hero-animate hero-d4 flex flex-wrap items-center gap-4">
                <a
                  href="#find-your-industry"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-md shadow-[#2563EB]/25 hover:shadow-lg transition-all"
                >
                  <span>Explore industries</span>
                  <ArrowRight size={16} />
                </a>

                <Link
                  href="/contact?subject=Industry%20Consultation"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#CBD5E1] hover:text-white transition-colors px-4 py-3"
                >
                  <span>Talk to an architect</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Column: Hardware/Macro Chip Photo + Floating Badge (Matching Inspo) */}
            <div className="hero-animate hero-d4 lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 aspect-[4/3] bg-slate-900 group">
                <img
                  src={industryPhotos.technology}
                  alt="Domain expertise"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                {/* Floating Bottom Badge */}
                <div className="absolute bottom-5 left-5 p-3.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-800 text-left">
                  <div className="text-xs font-bold text-white tracking-wide">Domain expertise.</div>
                  <div className="text-[11px] text-slate-400">Practical delivery.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 3-Metric Stats Bar (Matching Inspo) */}
          <div className="hero-animate hero-d4 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 mt-14 border-t border-slate-800/80">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#93C5FD]">
                <Layers size={22} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">10</div>
                <div className="text-xs text-[#94A3B8] font-medium">Industry sectors</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#93C5FD]">
                <Users size={22} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">8</div>
                <div className="text-xs text-[#94A3B8] font-medium">Practice areas</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/15 border border-[#3B82F6]/30 flex items-center justify-center text-[#93C5FD]">
                <Box size={22} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white">10</div>
                <div className="text-xs text-[#94A3B8] font-medium">Solution platforms</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. "FIND YOUR INDUSTRY" SELECTOR GRID (MATCHING INSPO) ───────── */}
      <section id="find-your-industry" className="py-20 sm:py-28 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs font-mono font-bold text-[#2563EB] tracking-wider uppercase mb-3">
              OUR INDUSTRIES
            </div>
            <h2 className="text-[clamp(2.25rem,4vw,3.25rem)] font-extrabold text-[#0F172A] tracking-[-0.03em] mb-4 leading-tight">
              Find your industry.
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              Tailored software, data and digital experiences for the unique needs and regulatory realities of each sector.
            </p>
          </div>

          {/* 10-Sector Selector Cards (2 Rows of 5) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 mb-16">
            {allIndustries.map((item, idx) => {
              const isSelected = active === idx
              const IconComponent = sectorIcons[item.slug] || Monitor

              return (
                <button
                  key={item.slug || idx}
                  onClick={() => setActive(idx)}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl text-center transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#EFF6FF] border-2 border-[#2563EB] shadow-md shadow-[#2563EB]/10'
                      : 'bg-white border border-[#E2E8F0] hover:border-[#93C5FD] hover:shadow-sm'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                      isSelected ? 'text-[#2563EB]' : 'text-[#2563EB]'
                    }`}
                  >
                    <IconComponent size={24} />
                  </div>
                  <span
                    className={`text-xs font-bold leading-tight ${
                      isSelected ? 'text-[#0F172A]' : 'text-[#334155]'
                    }`}
                  >
                    {item.name}
                  </span>
                </button>
              )
            })}
          </div>

          {/* ── 3. SELECTED INDUSTRY SHOWCASE (MATCHING INSPO) ─────────────── */}
          <div className="pt-8 border-t border-[#E2E8F0]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Sector Photography */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-[#CBD5E1]/60 aspect-[3/4] sm:aspect-[4/5] bg-slate-100 relative group">
                  <img
                    src={currentPhoto}
                    alt={currentSector.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-slate-800 text-white flex items-center justify-between">
                    <span className="text-xs font-bold">{currentSector.name}</span>
                    <span className="text-[10px] font-mono text-[#93C5FD]">PRODUCTION DEPLOYED</span>
                  </div>
                </div>
              </div>

              {/* Right Column: 3 Structured Engineering Pillars & Actions */}
              <div className="lg:col-span-7">
                {/* Sector Eyebrow */}
                <div className="text-xs font-mono font-bold text-[#2563EB] tracking-wider uppercase mb-3">
                  INDUSTRY {String(active + 1).padStart(2, '0')} / {currentSector.name.toUpperCase()}
                </div>

                <h3 className="text-[clamp(1.85rem,3vw,2.75rem)] font-extrabold text-[#0F172A] tracking-[-0.03em] mb-4 leading-tight">
                  {showcaseData.headline}
                </h3>

                <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-8">
                  {showcaseData.description}
                </p>

                {/* 3 Pillar Cards */}
                <div className="flex flex-col gap-3.5 mb-8">
                  {showcaseData.pillars.map((pillar, pIdx) => {
                    const PillarIcon = pillar.icon
                    return (
                      <div
                        key={pIdx}
                        className="flex items-start gap-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-colors"
                      >
                        <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] shrink-0 mt-0.5">
                          <PillarIcon size={18} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-[#0F172A] mb-1">
                            {pillar.title}
                          </div>
                          <div className="text-xs text-[#64748B] leading-relaxed">
                            {pillar.desc}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Related Platform Solutions Badges */}
                <div className="mb-8">
                  <div className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider mb-2.5">
                    RELATED PLATFORM SOLUTIONS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentSector.relevantSolutions.map((sol, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1.5 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-semibold text-[#1D4ED8]"
                      >
                        {sol}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link
                    href={`/contact?subject=Discuss%20Project%3A%20${encodeURIComponent(currentSector.name)}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs shadow-md shadow-[#2563EB]/25 hover:shadow-lg transition-all"
                  >
                    <span>Discuss your project</span>
                    <ArrowRight size={14} />
                  </Link>

                  <Link
                    href={`/industries/${currentSector.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                  >
                    <span>Explore {currentSector.name} Blueprint & Roadmap</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. BOTTOM CTA BANNER ("LET'S BUILD TOGETHER" MATCHING INSPO) ──── */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-3xl p-8 sm:p-12 lg:p-14 bg-[#0F172A] text-white overflow-hidden shadow-2xl border border-slate-800">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-bl from-[#3B82F6]/20 to-transparent blur-[120px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <div className="text-xs font-mono font-bold text-[#93C5FD] tracking-wider uppercase mb-3">
                  LET&apos;S BUILD TOGETHER
                </div>
                <h2 className="text-[clamp(1.85rem,3vw,2.75rem)] font-extrabold text-white tracking-[-0.03em] mb-3 leading-tight">
                  Your industry. Our engineering expertise.
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Speak with our solution architects about how we can help you solve industry-specific challenges and accelerate what&apos;s next.
                </p>
              </div>

              <Link
                href="/contact?subject=Consult%20an%20Architect"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-lg shadow-[#2563EB]/30 hover:shadow-xl transition-all shrink-0"
              >
                <span>Consult an Architect</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
