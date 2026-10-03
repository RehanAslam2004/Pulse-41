'use client'

import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ReadingProgressBar } from '@/components/ui/ReadingProgressBar'
import { Reveal } from '@/components/motion/Reveal'
import type { Industry } from '@/content/industries'
import type { Solution } from '@/content/solutions'
import {
  Building2,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  ArrowRight,
  Boxes,
  Lock,
} from 'lucide-react'
import { HeroIntegrationCard, getIndustryNodes } from '@/components/ui/integration-card'
import { HowItWorks, type Step } from '@/components/ui/how-it-works'

interface IndustryDetailPageClientProps {
  industry: Industry
  allIndustries: Industry[]
  solutions: Solution[]
}

const industryDeploymentSteps: Step[] = [
  {
    title: 'Sector Discovery',
    description: 'Map domain workflows, evaluate operational friction, and model economic feasibility.',
    colorTheme: 'blue',
  },
  {
    title: 'Regulatory Audit',
    description: 'Audit compliance perimeters, data privacy boundaries, and statutory reporting needs.',
    colorTheme: 'navy',
  },
  {
    title: 'Custom Architecture',
    description: 'Design tailored data schemas, secure microservices, and legacy ERP/core system connectors.',
    colorTheme: 'sky',
  },
  {
    title: 'Compliance Gating',
    description: 'Conduct security penetration testing, audit log validation, and governance sign-off.',
    colorTheme: 'blue',
  },
  {
    title: 'Enterprise Rollout',
    description: 'Phased zero-downtime deployment, staff enablement, and operational cutover.',
    colorTheme: 'navy',
  },
  {
    title: 'Operational Scaling',
    description: 'Continuous compliance telemetry, automated audit trails, and dedicated SLA pods.',
    colorTheme: 'sky',
  },
]

export function IndustryDetailPageClient({
  industry,
  allIndustries,
  solutions,
}: IndustryDetailPageClientProps) {
  const breadcrumbItems = [
    { label: 'Industries', href: '/industries' },
    { label: industry.name },
  ]

  // Find next/prev industry for navigation
  const currentIndex = allIndustries.findIndex((ind) => ind.slug === industry.slug)
  const prevIndustry = currentIndex > 0 ? allIndustries[currentIndex - 1] : null
  const nextIndustry = currentIndex < allIndustries.length - 1 ? allIndustries[currentIndex + 1] : null

  // Find relevant solutions for this industry
  const mappedSolutions = solutions.filter((sol) =>
    industry.relevantSolutions?.some(
      (rel) =>
        sol.productName.toLowerCase().includes(rel.toLowerCase()) ||
        rel.toLowerCase().includes(sol.productName.toLowerCase())
    )
  )

  const industryNodes = getIndustryNodes(industry.slug, industry.name)

  return (
    <div className="page-enter bg-[#0F172A] text-white">
      <ReadingProgressBar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 px-4 sm:px-8 border-b border-[#CBD5E1]/10"
        style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #16253f 60%, #0F172A 100%)',
        }}
      >
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#3B82F6]/12 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#93C5FD]/08 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          <Breadcrumbs items={breadcrumbItems} className="mb-8 text-[#93C5FD]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Headline & Intro */}
            <div className="lg:col-span-6 xl:col-span-6">
              <div className="text-xs font-semibold tracking-[0.16em] uppercase text-blue-400 mb-4">
                Industry Domain · Tailored Architecture
              </div>

              <h1 className="text-[clamp(2.5rem,4.8vw,4.5rem)] font-extrabold leading-[1.04] text-white tracking-[-0.035em] mb-6">
                {industry.name.split('&')[0]}
                {industry.name.includes('&') && (
                  <>
                    &amp;{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CBD5E1] to-[#93C5FD]">
                      {industry.name.split('&')[1]}
                    </span>
                  </>
                )}
              </h1>

              <p className="text-lg sm:text-xl leading-relaxed text-[#CBD5E1] max-w-xl mb-4">
                {industry.tagline}
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[#8DADC8] max-w-xl mb-8">
                {industry.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  href={`/contact?subject=${encodeURIComponent(`Industry Inquiry: ${industry.name}`)}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-decoration-none"
                >
                  <span>Consult Domain Architect</span>
                  <span className="text-base">→</span>
                </Link>
                <Link
                  href="/industries"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-white/15 border border-[#CBD5E1]/30 transition-all duration-200 text-decoration-none"
                >
                  <span>All Industries</span>
                  <span className="text-xs text-[#93C5FD]">→</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#CBD5E1]/15 text-xs font-mono text-[#93C5FD]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-[#CBD5E1]">Industry Compliance Gating</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-[#CBD5E1]">Legacy Core Connectors</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-[#CBD5E1]">Zero Operational Disruption</span>
                </div>
              </div>
            </div>

            {/* Right Column: Tailored Industry Mesh */}
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center">
              <HeroIntegrationCard
                nodes={industryNodes}
                hubTitle="P41"
                eyebrow={`${industry.name.slice(0, 20).toUpperCase()} MESH`}
                subBadge="SECTOR DOMAIN"
                footerPills={
                  industry.capabilities.length >= 3
                    ? [industry.capabilities[0], industry.capabilities[1], industry.capabilities[2]]
                    : ['Compliance Gated', 'Custom Schemas', 'SLA Protected']
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTOR CAPABILITIES & SCOPES ─────────────────────────────────── */}
      <section className="relative bg-[#F8FAFC] py-24 sm:py-32 border-b border-[#CBD5E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal className="mb-16 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              DOMAIN EXPERTISE &amp; SCOPE
            </div>
            <h2 className="text-[clamp(1.85rem,3.2vw,2.75rem)] font-extrabold text-[#1E293B] tracking-[-0.025em] mb-4 leading-tight">
              Tailored Delivery for {industry.name}
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              Domain-specific technology delivery mapped to the exact statutory regulations, security classifications, and workflow realities of the sector.
            </p>
          </Reveal>

          {/* Capabilities Grid */}
          <Reveal type="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {industry.capabilities.map((cap, i) => (
              <div
                key={i}
                className="group relative flex flex-col justify-between bg-white rounded-2xl p-7 sm:p-8 border border-[#CBD5E1] shadow-sm hover:shadow-xl hover:border-[#3B82F6]/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#CBD5E1]/50">
                    <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center group-hover:bg-[#3B82F6] transition-colors duration-300">
                      <Cpu className="w-5 h-5 text-[#3B82F6] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#64748B] bg-[#F8FAFC] border border-[#CBD5E1]/70 px-2 py-0.5 rounded-md">
                      WORKSTREAM 0{i + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1E293B] mb-3 leading-snug group-hover:text-[#3B82F6] transition-colors">
                    {cap}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Engineered to comply with institutional governance mandates and integrate cleanly with existing core databases.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#CBD5E1]/50 flex items-center justify-between text-xs text-[#3B82F6]">
                  <span className="font-semibold">Sector Compliant</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── REGULATORY & GOVERNANCE ASSURANCE ─────────────────────────────── */}
      <section className="relative py-24 sm:py-32 bg-[#1E293B] border-b border-[#CBD5E1]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal type="left" className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD] text-xs font-mono font-bold uppercase tracking-wider mb-6">
                REGULATORY &amp; COMPLIANCE
              </div>
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-white tracking-[-0.025em] mb-6 leading-tight">
                Sector Compliance &amp; Risk Mitigation
              </h2>
              <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed mb-8">
                Operating within high-stakes environments demands rigorous verification. We implement formal security boundaries, audit logging, and automated compliance checks.
              </p>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-[#CBD5E1]/10">
                <div className="flex items-center gap-3 text-sm font-semibold text-white mb-2">
                  <ShieldCheck className="w-5 h-5 text-[#3B82F6]" />
                  <span>Sector Architecture Guarantee</span>
                </div>
                <p className="text-xs text-[#8DADC8] leading-relaxed">
                  All solution pipelines are certified against applicable statutory requirements prior to production cutover.
                </p>
              </div>
            </Reveal>

            <Reveal type="right" className="lg:col-span-7">
              <div className="flex flex-col gap-4">
                {[
                  {
                    title: 'Statutory Data Protection & Residency',
                    desc: 'Encrypted storage at rest and in transit conforming to regional data residency mandates.',
                    badge: 'DATA RESIDENCY',
                  },
                  {
                    title: 'Comprehensive Audit Logs & Role-Based Access',
                    desc: 'Granular access controls with tamper-evident audit trails for all critical transactions.',
                    badge: 'AUDIT VERIFIED',
                  },
                  {
                    title: 'Legacy Interoperability with Zero Downtime',
                    desc: 'Engineered to communicate safely with core banking, clinical EHR, ERP, and municipal mainframes.',
                    badge: 'API SAFEGUARD',
                  },
                  {
                    title: 'Formal Acceptance Gating & Certification',
                    desc: 'Independent code verification and security penetration testing before institutional sign-off.',
                    badge: 'SOC2 / ISO READY',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-[#0F172A]/70 border border-[#CBD5E1]/15 hover:border-[#3B82F6]/40 transition-colors shadow-lg backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-5 h-5 text-[#93C5FD]" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#CBD5E1] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <span className="self-start sm:self-center shrink-0 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#3B82F6]/20 text-[#93C5FD] border border-[#3B82F6]/30">
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 21ST.DEV 6-PHASE ROADMAP ─────────────────────────────────────── */}
      <section className="relative pt-20 sm:pt-28 pb-10 bg-[#F8FAFC] border-b border-[#CBD5E1] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-4">
          <Reveal className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              SECTOR DEPLOYMENT LIFECYCLE
            </div>
            <h2 className="text-[clamp(1.85rem,3.2vw,2.75rem)] font-extrabold text-[#1E293B] tracking-[-0.025em] mb-4 leading-tight">
              From Sector Discovery to Production Scale
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              A structured 6-phase engineering lifecycle ensuring zero operational disruption and auditable commercial value.
            </p>
          </Reveal>
        </div>

        <HowItWorks features={industryDeploymentSteps} />
      </section>

      {/* ── RELEVANT SOLUTIONS FOR THIS SECTOR ────────────────────────────── */}
      {mappedSolutions && mappedSolutions.length > 0 && (
        <section className="relative py-20 bg-white border-b border-[#CBD5E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
              <div>
                <div className="text-xs font-mono font-bold text-[#3B82F6] uppercase tracking-wider mb-2">
                  APPLICABLE PLATFORMS
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
                  Pre-Configured for {industry.name}
                </h3>
              </div>
              <Link
                href="/solutions"
                className="mt-4 sm:mt-0 text-sm font-bold text-[#3B82F6] hover:underline flex items-center gap-1.5"
              >
                <span>View all solutions</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mappedSolutions.map((sol, idx) => (
                <Link
                  key={idx}
                  href={`/solutions/${sol.slug}`}
                  className="group p-6 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#3B82F6]/50 hover:shadow-lg transition-all text-decoration-none"
                >
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#3B82F6] font-bold">
                    <span>{sol.productName}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#1E293B] mb-2 group-hover:text-[#3B82F6] transition-colors">
                    {sol.title}
                  </h4>
                  <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                    {sol.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NAVIGATION BETWEEN INDUSTRIES ─────────────────────────────────── */}
      <section className="py-12 bg-[#F8FAFC] border-b border-[#CBD5E1]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {prevIndustry ? (
            <Link
              href={`/industries/${prevIndustry.slug}`}
              className="inline-flex items-center gap-3 text-sm font-semibold text-[#1E293B] hover:text-[#3B82F6] transition-colors text-decoration-none"
            >
              <span>←</span>
              <div>
                <div className="text-[10px] font-mono text-[#64748B] uppercase">Previous Sector</div>
                <div>{prevIndustry.name}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextIndustry ? (
            <Link
              href={`/industries/${nextIndustry.slug}`}
              className="inline-flex items-center gap-3 text-sm font-semibold text-[#1E293B] hover:text-[#3B82F6] transition-colors text-right text-decoration-none"
            >
              <div>
                <div className="text-[10px] font-mono text-[#64748B] uppercase">Next Sector</div>
                <div>{nextIndustry.name}</div>
              </div>
              <span>→</span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      {/* ── VAULT CTA ────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 bg-[#0F172A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-3xl p-8 sm:p-14 border border-[#CBD5E1]/20 shadow-2xl text-center"
              style={{
                background: 'linear-gradient(135deg, #1E293B 0%, #16253f 60%, #0F172A 100%)',
              }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#3B82F6]/15 blur-[120px] rounded-full pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD] text-xs font-mono font-bold uppercase tracking-wider mb-6">
                  DOMAIN CONSULTATION &amp; SCOPING
                </div>

                <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-white tracking-[-0.03em] mb-6 leading-tight max-w-2xl mx-auto">
                  Architecting for {industry.name}?
                </h2>

                <p className="text-base sm:text-lg text-[#CBD5E1] max-w-xl mx-auto mb-10 leading-relaxed">
                  Engage our sector practice leads to evaluate your regulatory boundaries, integration interfaces, and delivery scope.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href={`/contact?subject=${encodeURIComponent(`Sector Inquiry: ${industry.name}`)}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-sm tracking-wide text-decoration-none"
                  >
                    <span>Consult Domain Architect</span>
                    <span className="text-base">→</span>
                  </Link>
                  <Link
                    href="/industries"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/15 border border-[#CBD5E1]/30 transition-all duration-200 text-sm text-decoration-none"
                  >
                    All Industry Domains
                  </Link>
                </div>

                <div className="mt-10 pt-8 border-t border-[#CBD5E1]/10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#93C5FD]">
                  <span>✦ Sector Regulatory Alignment</span>
                  <span>✦ 100% IP Ownership &amp; NDAs</span>
                  <span>✦ Guaranteed Enterprise SLAs</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
