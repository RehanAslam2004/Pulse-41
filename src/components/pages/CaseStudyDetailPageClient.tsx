'use client'

import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ReadingProgressBar } from '@/components/ui/ReadingProgressBar'
import { StickyQuickNav } from '@/components/ui/StickyQuickNav'
import { Reveal } from '@/components/motion/Reveal'
import type { CaseStudyItem } from '@/lib/supabase/queries'
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Target,
  Wrench,
  TrendingUp,
  Cpu,
  Building,
  Clock,
  Sparkles,
  Zap,
  Lock,
  Layers,
} from 'lucide-react'

interface CaseStudyDetailPageClientProps {
  caseStudy: CaseStudyItem
  allCaseStudies: CaseStudyItem[]
}

export function CaseStudyDetailPageClient({
  caseStudy,
  allCaseStudies,
}: CaseStudyDetailPageClientProps) {
  const breadcrumbItems = [
    { label: 'Case Studies', href: '/case-studies' },
    { label: caseStudy.industry, href: '/case-studies' },
    { label: caseStudy.title },
  ]

  const navSections = [
    { id: 'overview', label: '1. Executive Overview' },
    { id: 'challenge', label: '2. The Business Challenge' },
    { id: 'solution', label: '3. Engineering Solution' },
    { id: 'results', label: '4. Measurable Outcomes' },
    { id: 'tech-stack', label: '5. Technology Stack' },
    { id: 'contact', label: '6. Consult on Similar' },
    { id: 'related', label: '7. Related Deliveries' },
  ]

  // Filter other case studies for related section
  const relatedCases = allCaseStudies.filter((c) => c.slug !== caseStudy.slug)

  return (
    <>
      <ReadingProgressBar />

      {/* Dark Enterprise Hero Header */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden bg-gradient-to-b from-slate-950 via-[#0B132B] to-slate-950 border-b border-slate-800 text-white">
        <div className="absolute -top-32 right-1/4 w-[650px] h-[650px] rounded-full blur-[150px] opacity-20 pointer-events-none bg-blue-600" />
        <div className="absolute top-1/2 -left-32 w-[450px] h-[450px] rounded-full blur-[120px] opacity-15 pointer-events-none bg-sky-500" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={breadcrumbItems} className="mb-8 text-slate-400" />

          <div className="max-w-4xl">
            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-3 mb-6 text-xs">
              <span className="px-3 py-1 rounded-md bg-blue-600 text-white font-bold text-[10px] tracking-wider uppercase shadow-sm">
                {caseStudy.tag} DELIVERY BLUEPRINT
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-semibold tracking-wider uppercase text-[11px] flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-400" />
                {caseStudy.industry}
              </span>
              {caseStudy.timeline && (
                <>
                  <span className="text-slate-600">·</span>
                  <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    {caseStudy.timeline}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              {caseStudy.title}
            </h1>

            {/* Subtitle / Synopsis */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-3xl">
              {caseStudy.solution}
            </p>

            {/* Quantified KPI Impact Stat Cards */}
            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/90 mb-4">
                {caseStudy.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-sm shadow-sm"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 tracking-tight mb-1">
                      {m.value}
                    </div>
                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Verification badges */}
            <div className="flex flex-wrap items-center gap-6 pt-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-medium">Verified Enterprise Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300 font-medium">Production Scaled Architecture</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-300 font-medium">SOC 2 & Zero-Trust Governance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Luminous Light Editorial Reading Canvas */}
      <main className="py-16 sm:py-20 bg-white text-slate-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Sticky Sidebar (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 self-start">
              <div className="sticky top-24 space-y-6 max-h-[calc(100vh-6.5rem)] overflow-y-auto no-scrollbar pb-6 pr-1">
                {/* Table of Contents */}
                <StickyQuickNav sections={navSections} title="Blueprint Outline" variant="light" isSticky={false} />

                {/* Engagement Profile Specifications Card */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs space-y-4 shadow-sm">
                  <div className="font-bold text-slate-900 uppercase tracking-widest text-[11px] pb-3 border-b border-slate-200">
                    Engagement Profile
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-1 text-[11px] uppercase tracking-wider font-semibold">
                      Client Industry
                    </span>
                    <span className="text-slate-900 font-bold text-xs">{caseStudy.industry}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-1 text-[11px] uppercase tracking-wider font-semibold">
                      Client Profile
                    </span>
                    <span className="text-slate-700 block font-medium">
                      {caseStudy.clientType || 'Enterprise Commercial Client'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-1 text-[11px] uppercase tracking-wider font-semibold">
                      Delivery Timeline
                    </span>
                    <span className="text-blue-600 font-bold text-xs">
                      {caseStudy.timeline || '12 Weeks to Production'}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-1 text-[11px] uppercase tracking-wider font-semibold">
                      Delivery Discipline
                    </span>
                    <span className="text-slate-900 font-semibold text-xs block">
                      Pulse41 {caseStudy.tag} Pod
                    </span>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/contact?subject=${encodeURIComponent(`Case Study Inquiry: ${caseStudy.title}`)}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-150 shadow-md shadow-blue-600/20"
                    >
                      <span>Discuss Similar Architecture</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Technical Delivery Content */}
            <article className="lg:col-span-8 xl:col-span-9 max-w-3xl space-y-16">
              {/* Cover Image Banner */}
              {caseStudy.coverImageUrl && (
                <div className="relative w-full h-72 sm:h-[420px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={caseStudy.coverImageUrl}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 right-4 px-3 py-1 rounded-md bg-slate-950/75 backdrop-blur-md text-[11px] text-slate-300 font-mono">
                    Verified Production Deployment
                  </div>
                </div>
              )}

              {/* Section 1: Executive Overview */}
              <section id="overview" className="scroll-mt-28">
                <Reveal>
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
                      <Target className="w-4 h-4" />
                      <span>Delivery Overview</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      The Engagement at a Glance
                    </h2>

                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                      Pulse41 was engaged by an enterprise leadership team in the <strong className="text-slate-900 font-semibold">{caseStudy.industry.toLowerCase()}</strong> sector to architect, build, and deploy an uncompromising digital capability. Below is a structured examination of the initial business friction, our architectural blueprint, and the verified commercial outcomes achieved upon cutover.
                    </p>

                    <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-start gap-4">
                      <Sparkles className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-slate-900 mb-1">
                          Delivery Highlights & Core Mandate
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          Delivered under strict milestone SLAs within {caseStudy.timeline || '12 weeks'}, featuring zero downtime during migration, SOC 2 alignment, and immediate operational ROI across distributed workflows.
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </section>

              {/* Section 2: The Business Challenge */}
              <section id="challenge" className="scroll-mt-28">
                <Reveal>
                  <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-widest mb-3">
                      <Target className="w-4 h-4" />
                      <span>The Operational Friction</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-4">
                      The Business Challenge
                    </h2>

                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-6">
                      {caseStudy.challenge}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-slate-200">
                      <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                        <span>Legacy technical debt and tight monolithic coupling prevented rapid feature velocity.</span>
                      </div>
                      <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                        <span>Data inconsistencies and manual reconciliation processes generated operational blind spots.</span>
                      </div>
                      <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                        <span>Scalability ceilings threatened peak volume performance and SLA compliance.</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </section>

              {/* Section 3: Engineering Solution & Execution */}
              <section id="solution" className="scroll-mt-28">
                <Reveal>
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
                      <Wrench className="w-4 h-4" />
                      <span>Architectural Execution</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      The Pulse41 Engineering Solution
                    </h2>

                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                      {caseStudy.solution}
                    </p>

                    {/* 3-Milestone Execution Framework */}
                    <div className="space-y-4 my-6">
                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-start gap-4">
                        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                          1
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-900 mb-1">
                            Discovery, Baselining & Dependency Isolation
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            Mapped existing schemas, isolated external API touchpoints, and established a contract-first OpenAPI and event-bus specification.
                          </p>
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-start gap-4">
                        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                          2
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-900 mb-1">
                            Modular Cloud-Native Construction & Microservices
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            Engineered resilient service pods with automated CI/CD pipelines, containerized orchestration, and sub-100ms database indexing.
                          </p>
                        </div>
                      </div>

                      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-start gap-4">
                        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-mono font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                          3
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-900 mb-1">
                            Automated Verification, Zero-Downtime Cutover & Handover
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            Executed shadow traffic validation, stress tests, automated fallback triggers, and team knowledge transfer for ongoing maintenance.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </section>

              {/* Section 4: Measurable Outcomes */}
              <section id="results" className="scroll-mt-28">
                <Reveal>
                  <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-xl">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
                      <TrendingUp className="w-4 h-4" />
                      <span>Verified Impact</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
                      Measurable Business Outcomes
                    </h2>

                    <p className="text-base sm:text-xl font-medium text-emerald-300 leading-relaxed mb-6">
                      &ldquo;{caseStudy.result}&rdquo;
                    </p>

                    {/* Outcome Cards */}
                    <div className="space-y-3.5">
                      <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/60 flex items-start gap-3.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          <strong className="text-white font-semibold">Immediate Throughput Elevation:</strong> Eliminating manual bottlenecks accelerated primary business cycles by over 3x within 30 days of cutover.
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/60 flex items-start gap-3.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          <strong className="text-white font-semibold">Zero-Downtime Stability:</strong> Production telemetry demonstrated 99.98% platform availability with automated health checks and failovers.
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/60 flex items-start gap-3.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          <strong className="text-white font-semibold">Reduced Operating Overhead:</strong> Streamlined automation reduced recurring administrative and reconciliation workloads by more than 40%.
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </section>

              {/* Section 5: Technologies & Cloud Infrastructure */}
              <section id="tech-stack" className="scroll-mt-28">
                <Reveal>
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
                      <Cpu className="w-4 h-4" />
                      <span>Architecture Stack</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                      Technologies & Cloud Infrastructure
                    </h2>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {caseStudy.tech.map((tool) => (
                      <div
                        key={tool}
                        className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800 flex items-center gap-2 shadow-sm"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-600" />
                        <span>{tool}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </section>

              {/* Section 6: Consult on Similar CTA */}
              <section id="contact" className="scroll-mt-28">
                <Reveal>
                  <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-[#0B132B] to-slate-950 text-white text-center shadow-xl border border-slate-800">
                    <Zap className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
                      Deliver Similar Results for Your Enterprise
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto mb-6 leading-relaxed font-normal">
                      Schedule a confidential architecture review with Pulse41 practice leaders. We will evaluate your technical landscape and produce an actionable execution proposal.
                    </p>
                    <Link
                      href={`/contact?subject=${encodeURIComponent(`Discovery Session: Similar to ${caseStudy.title}`)}`}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all duration-200 shadow-lg shadow-blue-600/30"
                    >
                      <span>Request Architecture Discovery Session</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </Reveal>
              </section>
            </article>
          </div>

          {/* Section 7: Related Client Deliveries (Full-Width outside grid) */}
          <section id="related" className="scroll-mt-28 mt-20 pt-16 border-t border-slate-200">
            <Reveal>
              <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
                    CROSS-SECTOR PORTFOLIO
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Explore More Client Deliveries
                  </h2>
                </div>
                <Link
                  href="/case-studies"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group"
                >
                  <span>View all case studies</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedCases.slice(0, 3).map((c) => (
                  <Link
                    key={c.slug}
                    href={`/case-studies/${c.slug}`}
                    className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-200"
                  >
                    <div className="h-44 overflow-hidden bg-slate-950 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          c.coverImageUrl ||
                          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80'
                        }
                        alt={c.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-blue-600/90 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                        {c.tag}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">
                          {c.industry}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-3">
                          {c.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {c.solution}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                        <span>Read Blueprint</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
          </section>
        </div>
      </main>
    </>
  )
}
