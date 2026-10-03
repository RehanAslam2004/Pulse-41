'use client'

import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ReadingProgressBar } from '@/components/ui/ReadingProgressBar'
import { Reveal } from '@/components/motion/Reveal'
import type { Solution } from '@/content/solutions'
import type { Industry } from '@/content/industries'
import { solutionsNotice } from '@/content/solutions'
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Server,
  Boxes,
  Workflow,
  Sparkles,
  Building2,
} from 'lucide-react'
import { HeroIntegrationCard, getSolutionNodes } from '@/components/ui/integration-card'
import { HowItWorks, type Step } from '@/components/ui/how-it-works'

interface SolutionDetailPageClientProps {
  solution: Solution
  allSolutions: Solution[]
  industries: Industry[]
}

const solutionDeploymentSteps: Step[] = [
  {
    title: 'Needs Assessment',
    description: 'Assess business friction, evaluate existing tools, and specify architecture requirements.',
    colorTheme: 'blue',
  },
  {
    title: 'Platform Config',
    description: 'Configure microservices, data schemas, and role-based enterprise access controls.',
    colorTheme: 'navy',
  },
  {
    title: 'API & System Mesh',
    description: 'Connect enterprise ERP, CRM, databases, and automated bi-directional webhooks.',
    colorTheme: 'sky',
  },
  {
    title: 'Security Lock',
    description: 'Conduct penetration testing, encryption audits, and compliance validation.',
    colorTheme: 'blue',
  },
  {
    title: 'Production Rollout',
    description: 'Zero-downtime system deployment, user enablement, and full operational cutover.',
    colorTheme: 'navy',
  },
  {
    title: 'SLA Telemetry',
    description: 'Continuous uptime monitoring, latency telemetry, and dedicated pod support.',
    colorTheme: 'sky',
  },
]

export function SolutionDetailPageClient({
  solution,
  allSolutions,
  industries,
}: SolutionDetailPageClientProps) {
  const breadcrumbItems = [
    { label: 'Solutions', href: '/solutions' },
    { label: solution.productName || solution.title },
  ]

  // Find next/prev solutions for navigation
  const currentIndex = allSolutions.findIndex((s) => s.slug === solution.slug)
  const prevSolution = currentIndex > 0 ? allSolutions[currentIndex - 1] : null
  const nextSolution = currentIndex < allSolutions.length - 1 ? allSolutions[currentIndex + 1] : null

  // Find relevant industries for this solution
  const relevantIndustries = industries.filter((ind) =>
    ind.relevantSolutions?.some(
      (rel) =>
        solution.productName.toLowerCase().includes(rel.toLowerCase()) ||
        rel.toLowerCase().includes(solution.productName.toLowerCase())
    )
  )

  const solutionNodes = getSolutionNodes(solution.slug, solution.productName)

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
              <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.16em] uppercase text-blue-400 mb-4">
                <span>Platform {solution.num}</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300">{solution.productName}</span>
              </div>

              <h1 className="text-[clamp(2.5rem,4.8vw,4.5rem)] font-extrabold leading-[1.04] text-white tracking-[-0.035em] mb-6">
                {solution.title.split('&')[0]}
                {solution.title.includes('&') && (
                  <>
                    &amp;{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CBD5E1] to-[#93C5FD]">
                      {solution.title.split('&')[1]}
                    </span>
                  </>
                )}
              </h1>

              <p className="text-lg sm:text-xl leading-relaxed text-[#CBD5E1] max-w-xl mb-8">
                {solution.tagline || solution.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  href={`/contact?subject=${encodeURIComponent(`Solution Inquiry: ${solution.productName}`)}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-decoration-none"
                >
                  <span>Request Walkthrough</span>
                  <span className="text-base">→</span>
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-white/15 border border-[#CBD5E1]/30 transition-all duration-200 text-decoration-none"
                >
                  <span>All Solutions</span>
                  <span className="text-xs text-[#93C5FD]">→</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#CBD5E1]/15 text-xs font-mono text-[#93C5FD]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-[#CBD5E1]">Configurable Microservices</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-[#CBD5E1]">Full IP Ownership</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-[#CBD5E1]">Zero Vendor Lock-In</span>
                </div>
              </div>
            </div>

            {/* Right Column: Tailored Solution Architecture Mesh */}
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center">
              <HeroIntegrationCard
                nodes={solutionNodes}
                hubTitle={`S${solution.num}`}
                eyebrow={`${solution.productName.slice(0, 20).toUpperCase()} MESH`}
                subBadge="ENTERPRISE PLATFORM"
                footerPills={[
                  solution.productName.split(' ')[0] || 'Platform',
                  'REST & Event APIs',
                  'SLA Guaranteed',
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE COMPONENTS & FRICTION ELIMINATED ────────────────────────── */}
      <section className="relative bg-[#F8FAFC] py-24 sm:py-32 border-b border-[#CBD5E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal className="mb-16 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              SYSTEM ARCHITECTURE &amp; SCOPE
            </div>
            <h2 className="text-[clamp(1.85rem,3.2vw,2.75rem)] font-extrabold text-[#1E293B] tracking-[-0.025em] mb-4 leading-tight">
              Modular Components &amp; Operational Capabilities
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              Designed as configurable building blocks that plug cleanly into your existing cloud infrastructure, authentication providers, and data warehouses.
            </p>
          </Reveal>

          {/* Business Friction Solved Card */}
          <Reveal className="mb-12">
            <div className="p-8 sm:p-10 rounded-2xl bg-white border border-[#CBD5E1] shadow-sm">
              <div className="text-xs font-mono font-bold text-[#3B82F6] uppercase tracking-wider mb-2">
                OPERATIONAL FRICTION ELIMINATED
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1E293B] mb-3">
                The Challenge This Architecture Solves
              </h3>
              <p className="text-base text-[#64748B] leading-relaxed mb-6">
                {solution.businessNeed}
              </p>
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1]/60 flex items-center gap-3 text-sm text-[#1E293B] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                <span>Engineered Core Scope: {solution.coreComponentsText}</span>
              </div>
            </div>
          </Reveal>

          {/* Core Components Grid */}
          <Reveal type="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {solution.coreComponents.map((comp, i) => (
              <div
                key={i}
                className="group relative flex flex-col justify-between bg-white rounded-2xl p-7 sm:p-8 border border-[#CBD5E1] shadow-sm hover:shadow-xl hover:border-[#3B82F6]/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#CBD5E1]/50">
                    <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center group-hover:bg-[#3B82F6] transition-colors duration-300">
                      <Boxes className="w-5 h-5 text-[#3B82F6] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#64748B] bg-[#F8FAFC] border border-[#CBD5E1]/70 px-2 py-0.5 rounded-md">
                      MODULE 0{i + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1E293B] mb-3 leading-snug group-hover:text-[#3B82F6] transition-colors">
                    {comp}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Production-grade microservice equipped with bi-directional sync, event triggers, and audit logging.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#CBD5E1]/50 flex items-center justify-between text-xs text-[#3B82F6]">
                  <span className="font-semibold">Enterprise Ready</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── GOVERNANCE & PACKAGING NOTICE ─────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 bg-[#1E293B] border-b border-[#CBD5E1]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal type="left" className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD] text-xs font-mono font-bold uppercase tracking-wider mb-6">
                PACKAGING &amp; GOVERNANCE
              </div>
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-white tracking-[-0.025em] mb-6 leading-tight">
                Enterprise Commercial &amp; SOW Framework
              </h2>
              <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed mb-8">
                {solutionsNotice}
              </p>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-[#CBD5E1]/10">
                <div className="flex items-center gap-3 text-sm font-semibold text-white mb-2">
                  <ShieldCheck className="w-5 h-5 text-[#3B82F6]" />
                  <span>SOW Assurance Guarantee</span>
                </div>
                <p className="text-xs text-[#8DADC8] leading-relaxed">
                  Every deployment milestone, acceptance gate, and IP transfer clause is formally executed in your enterprise Statement of Work.
                </p>
              </div>
            </Reveal>

            <Reveal type="right" className="lg:col-span-7">
              <div className="flex flex-col gap-4">
                {[
                  {
                    title: 'Configurable Deployment Scopes',
                    desc: 'Deploy on dedicated VPC, private cloud, or fully managed enterprise infrastructure.',
                    badge: 'FLEXIBLE INFRA',
                  },
                  {
                    title: '100% IP Transfer & Zero Platform Lock-in',
                    desc: 'Your organization owns the production code, data models, and custom workflows.',
                    badge: 'IP PROTECTED',
                  },
                  {
                    title: 'Enterprise SLAs & 24/7 Monitoring',
                    desc: 'Guaranteed response times, uptime commitments, and proactive incident response.',
                    badge: 'SLA BACKED',
                  },
                  {
                    title: 'Security Compliance & Data Residency',
                    desc: 'Built to conform to SOC2, ISO 27001, and international data privacy regulations.',
                    badge: 'COMPLIANT',
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
              DEPLOYMENT &amp; INTEGRATION LIFECYCLE
            </div>
            <h2 className="text-[clamp(1.85rem,3.2vw,2.75rem)] font-extrabold text-[#1E293B] tracking-[-0.025em] mb-4 leading-tight">
              From Configuration to Enterprise Scale
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              A structured 6-phase engineering lifecycle ensuring zero operational disruption and auditable commercial value.
            </p>
          </Reveal>
        </div>

        <HowItWorks features={solutionDeploymentSteps} />
      </section>

      {/* ── RELEVANT INDUSTRY DEPLOYMENTS (IF ANY) ────────────────────────── */}
      {relevantIndustries && relevantIndustries.length > 0 && (
        <section className="relative py-20 bg-white border-b border-[#CBD5E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
              <div>
                <div className="text-xs font-mono font-bold text-[#3B82F6] uppercase tracking-wider mb-2">
                  SECTOR APPLICATIONS
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
                  Tailored for Industry Realities
                </h3>
              </div>
              <Link
                href="/industries"
                className="mt-4 sm:mt-0 text-sm font-bold text-[#3B82F6] hover:underline flex items-center gap-1.5"
              >
                <span>View all industry domains</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relevantIndustries.slice(0, 3).map((ind, idx) => (
                <Link
                  key={idx}
                  href={`/industries/${ind.slug}`}
                  className="group p-6 rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#3B82F6]/50 hover:shadow-lg transition-all text-decoration-none"
                >
                  <div className="flex items-center justify-between mb-3 text-xs font-mono text-[#3B82F6] font-bold">
                    <span>{ind.name}</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#1E293B] mb-2 group-hover:text-[#3B82F6] transition-colors">
                    {ind.tagline}
                  </h4>
                  <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                    {ind.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── NAVIGATION BETWEEN SOLUTIONS ─────────────────────────────────── */}
      <section className="py-12 bg-[#F8FAFC] border-b border-[#CBD5E1]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {prevSolution ? (
            <Link
              href={`/solutions/${prevSolution.slug}`}
              className="inline-flex items-center gap-3 text-sm font-semibold text-[#1E293B] hover:text-[#3B82F6] transition-colors text-decoration-none"
            >
              <span>←</span>
              <div>
                <div className="text-[10px] font-mono text-[#64748B] uppercase">Previous Platform</div>
                <div>{prevSolution.productName}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextSolution ? (
            <Link
              href={`/solutions/${nextSolution.slug}`}
              className="inline-flex items-center gap-3 text-sm font-semibold text-[#1E293B] hover:text-[#3B82F6] transition-colors text-right text-decoration-none"
            >
              <div>
                <div className="text-[10px] font-mono text-[#64748B] uppercase">Next Platform</div>
                <div>{nextSolution.productName}</div>
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
                  PLATFORM CONSULTATION &amp; SCOPING
                </div>

                <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-white tracking-[-0.03em] mb-6 leading-tight max-w-2xl mx-auto">
                  Ready to deploy {solution.productName}?
                </h2>

                <p className="text-base sm:text-lg text-[#CBD5E1] max-w-xl mx-auto mb-10 leading-relaxed">
                  Schedule a technical discovery session to review platform architecture, APIs, data mapping, and custom integration requirements.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href={`/contact?subject=${encodeURIComponent(`Platform Walkthrough: ${solution.productName}`)}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-sm tracking-wide text-decoration-none"
                  >
                    <span>Request Walkthrough</span>
                    <span className="text-base">→</span>
                  </Link>
                  <Link
                    href="/solutions"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/15 border border-[#CBD5E1]/30 transition-all duration-200 text-sm text-decoration-none"
                  >
                    View All Solutions
                  </Link>
                </div>

                <div className="mt-10 pt-8 border-t border-[#CBD5E1]/10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#93C5FD]">
                  <span>✦ Configurable Microservice Architecture</span>
                  <span>✦ 100% IP Ownership &amp; Code Access</span>
                  <span>✦ Enterprise SLAs &amp; Telemetry</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
