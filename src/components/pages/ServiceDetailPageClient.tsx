'use client'

import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ReadingProgressBar } from '@/components/ui/ReadingProgressBar'
import { Reveal } from '@/components/motion/Reveal'
import type { ServicePractice } from '@/content/services'
import type { Solution } from '@/content/solutions'
import {
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  Boxes,
  Workflow,
  Sparkles,
} from 'lucide-react'
import { HeroIntegrationCard, getServiceNodes } from '@/components/ui/integration-card'
import { HowItWorks, type Step } from '@/components/ui/how-it-works'

interface ServiceDetailPageClientProps {
  service: ServicePractice
  allServices: ServicePractice[]
  relatedSolutions: Solution[]
}

const serviceDeliverySteps: Step[] = [
  {
    title: 'Discover',
    description: 'Map operational bottlenecks, analyze requirement readiness, and model economic feasibility.',
    colorTheme: 'blue',
  },
  {
    title: 'Architecture & Spec',
    description: 'Engineer blueprint schemas, boundary perimeters, and technology stack selection.',
    colorTheme: 'navy',
  },
  {
    title: 'Core Implementation',
    description: 'Deploy sprint pods, build core services, and configure multi-system API integrations.',
    colorTheme: 'sky',
  },
  {
    title: 'Verification & Security',
    description: 'Rigorous QA testing, vulnerability scanning, and compliance audit gating.',
    colorTheme: 'blue',
  },
  {
    title: 'Production Release',
    description: 'Zero-downtime release, automated CI/CD pipelines, and telemetry activation.',
    colorTheme: 'navy',
  },
  {
    title: 'Managed Evolution',
    description: '24/7 SLA monitoring, continuous telemetry tuning, and sustained feature velocity.',
    colorTheme: 'sky',
  },
]

export function ServiceDetailPageClient({
  service,
  allServices,
  relatedSolutions,
}: ServiceDetailPageClientProps) {
  const breadcrumbItems = [
    { label: 'Services', href: '/services' },
    { label: service.title },
  ]

  // Find next/prev service for navigation
  const currentIndex = allServices.findIndex((s) => s.slug === service.slug)
  const prevService = currentIndex > 0 ? allServices[currentIndex - 1] : null
  const nextService = currentIndex < allServices.length - 1 ? allServices[currentIndex + 1] : null

  const serviceNodes = getServiceNodes(service.slug)

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
                Practice {service.num} · Enterprise Blueprint
              </div>

              <h1 className="text-[clamp(2.5rem,4.8vw,4.5rem)] font-extrabold leading-[1.04] text-white tracking-[-0.035em] mb-6">
                {service.title.split('&')[0]}
                {service.title.includes('&') && (
                  <>
                    &amp;{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CBD5E1] to-[#93C5FD]">
                      {service.title.split('&')[1]}
                    </span>
                  </>
                )}
              </h1>

              <p className="text-lg sm:text-xl leading-relaxed text-[#CBD5E1] max-w-xl mb-8">
                {service.tagline || service.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  href={`/contact?subject=${encodeURIComponent(`Practice Inquiry: ${service.title}`)}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-decoration-none"
                >
                  <span>Consult Practice Lead</span>
                  <span className="text-base">→</span>
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-white/15 border border-[#CBD5E1]/30 transition-all duration-200 text-decoration-none"
                >
                  <span>Explore Solutions</span>
                  <span className="text-xs text-[#93C5FD]">→</span>
                </Link>
              </div>

              {/* SLA & Governance Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#CBD5E1]/15 text-xs font-mono text-[#93C5FD]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-[#CBD5E1]">Enterprise SLA Assurance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-[#CBD5E1]">Dedicated Delivery Pods</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-[#CBD5E1]">ISO 27001 / SOC 2 Ready</span>
                </div>
              </div>
            </div>

            {/* Right Column: Tailored Practice Integration Mesh */}
            <div className="lg:col-span-6 xl:col-span-6 flex justify-center">
              <HeroIntegrationCard
                nodes={serviceNodes}
                hubTitle={`P${service.num}`}
                eyebrow={`${service.title.slice(0, 22).toUpperCase()} MESH`}
                subBadge="ENTERPRISE STACK"
                footerPills={
                  service.capabilities && service.capabilities.length >= 3
                    ? [service.capabilities[0], service.capabilities[1], service.capabilities[2]]
                    : ['Dedicated Pods', 'Enterprise SLA', 'Production QA']
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE CAPABILITIES & WORKSTREAMS ──────────────────────────────── */}
      <section className="relative bg-[#F8FAFC] py-24 sm:py-32 border-b border-[#CBD5E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal className="mb-16 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              PRACTICE TECHNICAL DEPTH
            </div>
            <h2 className="text-[clamp(1.85rem,3.2vw,2.75rem)] font-extrabold text-[#1E293B] tracking-[-0.025em] mb-4 leading-tight">
              Engineered Capabilities &amp; Scopes
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              Enterprise-tested capabilities deployed with zero disruption to active business processes and 100% IP ownership.
            </p>
          </Reveal>

          {/* Capabilities Grid */}
          <Reveal type="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {service.coreCapabilities.map((cap, i) => (
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
                      SCOPE 0{i + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1E293B] mb-3 leading-snug group-hover:text-[#3B82F6] transition-colors">
                    {cap}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed mb-4">
                    Architected for enterprise resilience, deterministic execution, and seamless multi-system interoperability.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#CBD5E1]/50 flex items-center justify-between text-xs text-[#3B82F6]">
                  <span className="font-semibold">Enterprise SLA</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </Reveal>

          {/* Detailed Taxonomy Workstreams (if available) */}
          {service.detailedAreas && service.detailedAreas.length > 0 && (
            <div className="mt-16 pt-16 border-t border-[#CBD5E1]">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="text-xs font-mono font-bold text-[#3B82F6] uppercase tracking-wider mb-2">
                  DELIVERY TAXONOMY
                </div>
                <h3 className="text-2xl font-bold text-[#1E293B]">
                  Specialized Workstream Breakdowns
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.detailedAreas.map((area, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-white border border-[#CBD5E1] shadow-xs flex flex-col justify-between"
                  >
                    <div className="font-bold text-sm text-[#1E293B] mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                      <span>{area.area}</span>
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {area.services}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── GOVERNANCE & CONTROL FRAMEWORK ───────────────────────────────── */}
      <section className="relative py-24 sm:py-32 bg-[#1E293B] border-b border-[#CBD5E1]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal type="left" className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD] text-xs font-mono font-bold uppercase tracking-wider mb-6">
                GOVERNANCE &amp; CONTROL
              </div>
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-white tracking-[-0.025em] mb-6 leading-tight">
                Architectural Assurance &amp; Risk Mitigation
              </h2>
              <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed mb-8">
                Every practice engagement operates within strict engineering controls, ensuring auditable checkpoints, data protection, and predictable sprint outcomes.
              </p>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-[#CBD5E1]/10">
                <div className="flex items-center gap-3 text-sm font-semibold text-white mb-2">
                  <ShieldCheck className="w-5 h-5 text-[#3B82F6]" />
                  <span>Demonstrated Delivery Metric</span>
                </div>
                <p className="text-xs text-[#8DADC8] leading-relaxed italic">
                  &ldquo;{service.typicalOutcomes}&rdquo;
                </p>
              </div>
            </Reveal>

            <Reveal type="right" className="lg:col-span-7">
              <div className="flex flex-col gap-4">
                {(service.controlFramework || [
                  'Data minimization and controlled access perimeters',
                  'Security-aware architecture and verified code reviews',
                  'Formal sprint milestone verification and acceptance gates',
                  'ISO 27001, SOC 2 and GDPR compliance alignment',
                ]).map((control, i) => (
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
                          {control}
                        </h3>
                        <p className="text-xs text-[#CBD5E1] leading-relaxed">
                          Enforced continuously across all development pods and deployment environments.
                        </p>
                      </div>
                    </div>
                    <span className="self-start sm:self-center shrink-0 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#3B82F6]/20 text-[#93C5FD] border border-[#3B82F6]/30">
                      VERIFIED
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
              PRACTICE DELIVERY LIFECYCLE
            </div>
            <h2 className="text-[clamp(1.85rem,3.2vw,2.75rem)] font-extrabold text-[#1E293B] tracking-[-0.025em] mb-4 leading-tight">
              From Specification to Production Scale
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              A structured 6-phase engineering lifecycle ensuring zero operational disruption and auditable commercial value.
            </p>
          </Reveal>
        </div>

        <HowItWorks features={serviceDeliverySteps} />
      </section>

      {/* ── RELATED SOLUTION PLATFORMS (IF ANY) ───────────────────────────── */}
      {relatedSolutions && relatedSolutions.length > 0 && (
        <section className="relative py-20 bg-white border-b border-[#CBD5E1]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
              <div>
                <div className="text-xs font-mono font-bold text-[#3B82F6] uppercase tracking-wider mb-2">
                  INTEGRATED PLATFORMS
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
                  Accelerate with Pre-Engineered IP
                </h3>
              </div>
              <Link
                href="/solutions"
                className="mt-4 sm:mt-0 text-sm font-bold text-[#3B82F6] hover:underline flex items-center gap-1.5"
              >
                <span>View all solution suites</span>
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedSolutions.slice(0, 3).map((sol, idx) => (
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

      {/* ── NAVIGATION BETWEEN PRACTICES ─────────────────────────────────── */}
      <section className="py-12 bg-[#F8FAFC] border-b border-[#CBD5E1]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {prevService ? (
            <Link
              href={`/services/${prevService.slug}`}
              className="inline-flex items-center gap-3 text-sm font-semibold text-[#1E293B] hover:text-[#3B82F6] transition-colors text-decoration-none"
            >
              <span>←</span>
              <div>
                <div className="text-[10px] font-mono text-[#64748B] uppercase">Previous Practice</div>
                <div>{prevService.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextService ? (
            <Link
              href={`/services/${nextService.slug}`}
              className="inline-flex items-center gap-3 text-sm font-semibold text-[#1E293B] hover:text-[#3B82F6] transition-colors text-right text-decoration-none"
            >
              <div>
                <div className="text-[10px] font-mono text-[#64748B] uppercase">Next Practice</div>
                <div>{nextService.title}</div>
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
                  PRACTICE CONSULTATION &amp; SCOPING
                </div>

                <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-white tracking-[-0.03em] mb-6 leading-tight max-w-2xl mx-auto">
                  Ready to deploy {service.title}?
                </h2>

                <p className="text-base sm:text-lg text-[#CBD5E1] max-w-xl mx-auto mb-10 leading-relaxed">
                  Engage our principal architects to review your technical requirements and configure a dedicated delivery pod.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href={`/contact?subject=${encodeURIComponent(`Practice Consultation: ${service.title}`)}`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-sm tracking-wide text-decoration-none"
                  >
                    <span>Consult Practice Lead</span>
                    <span className="text-base">→</span>
                  </Link>
                  <Link
                    href="/services"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/15 border border-[#CBD5E1]/30 transition-all duration-200 text-sm text-decoration-none"
                  >
                    View All Practices
                  </Link>
                </div>

                <div className="mt-10 pt-8 border-t border-[#CBD5E1]/10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#93C5FD]">
                  <span>✦ Dedicated Pods &amp; BOT Models</span>
                  <span>✦ Enterprise SLA Assurance</span>
                  <span>✦ 100% IP Ownership &amp; NDAs</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
