'use client'

import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { services, type ServicePractice } from '@/content/services'
import { ServicesStack } from '@/components/ui/services-stack'

const matrix = [
  { challenge: 'Manual & repetitive operational bottlenecks', capability: 'AI & Intelligent Automation', tech: 'GenAI, RPA, Agentic Workflows', result: 'Accelerated processing speed' },
  { challenge: 'Need for high-scale, custom digital products', capability: 'Software, Product & Digital Experience', tech: 'Next.js, React, Node, Mobile, APIs', result: 'Robust product velocity' },
  { challenge: 'Infrastructure scaling & deployment friction', capability: 'Cloud, DevOps & Platform Engineering', tech: 'AWS, Azure, Docker, Kubernetes', result: '99.9% uptime & automated CI/CD' },
  { challenge: 'Vulnerabilities & regulatory compliance', capability: 'Cybersecurity & Digital Trust', tech: 'Zero Trust, Audits, Encryption', result: 'Proactive posture & audit readiness' },
  { challenge: 'Siloed data & lack of decision intelligence', capability: 'Data & Executive Intelligence', tech: 'Data Pipelines, Executive BI, ML Models', result: 'Unified visibility & insights' },
  { challenge: 'Inconsistent brand reach & client conversion', capability: 'Digital Marketing & Growth', tech: 'Performance, SEO, Brand Systems', result: 'Measurable audience growth' },
  { challenge: 'Resource shortages & operational support', capability: 'Managed IT & Outsourcing', tech: 'ODC, 24/7 Monitoring, Staff Augmentation', result: 'Elastic engineering capacity' },
  { challenge: 'Unclear technology roadmap & governance', capability: 'Consulting, Training & Assurance', tech: 'Architecture Audits, Enablement, Advisory', result: 'Strategic architectural clarity' },
]

export function ServicesPageClient({ servicesData }: { servicesData?: ServicePractice[] } = {}) {
  const currentServices = servicesData && servicesData.length > 0 ? servicesData : services

  // Extended 4 practices (complementing the 4 flagship stacking cards)
  const extendedSlugs = ['cloud-devops', 'data-analytics', 'managed-it', 'consulting-assurance']
  const extendedServices = currentServices.filter((s) => extendedSlugs.includes(s.slug))
  const displayExtended = extendedServices.length === 4 ? extendedServices : currentServices.slice(4)

  const flagshipSlugs = ['ai-automation', 'software-engineering', 'cybersecurity', 'digital-marketing']

  return (
    <div className="page-enter bg-[#0F172A] text-white">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 px-4 sm:px-8 border-b border-[#CBD5E1]/10"
        style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #16253f 60%, #0F172A 100%)',
        }}
      >
        {/* Subtle Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#3B82F6]/10 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#93C5FD]/08 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Headline & Intro */}
            <div className="lg:col-span-6 xl:col-span-7">
              <div className="hero-animate hero-d1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#93C5FD] text-xs font-mono font-semibold tracking-wider uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                <span>PRACTICE PORTFOLIO</span>
              </div>
              <h1
                className="hero-animate hero-d2 text-[clamp(2.75rem,5.5vw,5rem)] font-extrabold leading-[1.02] text-white tracking-[-0.035em] mb-6"
              >
                DISCIPLINED
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CBD5E1] to-[#93C5FD]">
                  ENGINEERING.
                </span>
              </h1>
              <p className="hero-animate hero-d3 text-lg sm:text-xl leading-relaxed text-[#CBD5E1] max-w-xl mb-8">
                Eight major practices spanning applied AI, software engineering, cloud platforms, digital trust, data intelligence, and enterprise managed delivery.
              </p>

              {/* Trust Badges */}
              <div className="hero-animate hero-d4 flex flex-wrap items-center gap-6 pt-6 border-t border-[#CBD5E1]/15 text-sm text-[#93C5FD]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-[#CBD5E1]">8 Core Practices</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-[#CBD5E1]">Enterprise SLA Assurance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-[#CBD5E1]">100% Governed Execution</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Practice Directory */}
            <div className="hero-animate hero-d4 lg:col-span-6 xl:col-span-5">
              <div className="rounded-2xl p-6 sm:p-7 bg-[#1E293B]/80 border border-[#CBD5E1]/20 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#CBD5E1]/10">
                  <div className="text-xs font-mono tracking-widest text-[#93C5FD] uppercase font-bold">
                    PRACTICE DIRECTORY (8)
                  </div>
                  <span className="text-[11px] font-mono text-[#CBD5E1]/60">V2.0 ARCHITECTURE</span>
                </div>
                <div className="flex flex-col gap-2">
                  {currentServices.map((s, i) => {
                    const isFlagship = flagshipSlugs.includes(s.slug)
                    return (
                      <Link
                        key={s.slug || i}
                        href={`/services/${s.slug}`}
                        className="group flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-[#3B82F6]/15 border border-[#CBD5E1]/10 hover:border-[#3B82F6]/40 transition-all duration-200 text-decoration-none"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-[#93C5FD] w-6 group-hover:text-white transition-colors">
                            {s.num}
                          </span>
                          <span className="text-sm font-semibold text-[#CBD5E1] group-hover:text-white transition-colors">
                            {s.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                              isFlagship
                                ? 'bg-[#3B82F6]/20 text-[#93C5FD] border border-[#3B82F6]/40'
                                : 'bg-white/5 text-[#CBD5E1]/70 border border-white/10'
                            }`}
                          >
                            {isFlagship ? 'FLAGSHIP' : 'EXTENDED'}
                          </span>
                          <span className="text-xs text-[#93C5FD] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                            →
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 21ST.DEV FLAGSHIP STACKING CARDS ──────────────────────────────── */}
      <section id="flagship-stack" className="relative">
        <ServicesStack eyebrow="Pulse41 Practice Stack" />
      </section>

      {/* ── EXTENDED PRACTICES (FULL-SPECTRUM TECHNOLOGY DELIVERY) ───────── */}
      <section id="extended-practices" className="relative bg-[#F8FAFC] py-24 sm:py-32 border-y border-[#CBD5E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              EXTENDED CAPABILITIES
            </div>
            <h2 className="text-[clamp(1.85rem,3.2vw,2.75rem)] font-extrabold text-[#1E293B] tracking-[-0.025em] mb-4 leading-tight">
              Full-Spectrum Technology Delivery
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] max-w-2xl leading-relaxed">
              Complementing our core stacks with enterprise cloud modernization, business intelligence, 24/7 managed infrastructure, and executive advisory.
            </p>
          </Reveal>

          <Reveal type="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {displayExtended.map((s, i) => (
              <div
                key={s.slug || i}
                className="group relative flex flex-col justify-between bg-white rounded-2xl p-7 sm:p-9 border border-[#CBD5E1] shadow-sm hover:shadow-xl hover:border-[#3B82F6]/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#CBD5E1]/60">
                    <span className="text-xs font-mono font-bold text-[#3B82F6] bg-[#3B82F6]/10 px-2.5 py-1 rounded-md">
                      PRACTICE {s.num}
                    </span>
                    <Link
                      href={`/services/${s.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3B82F6] group-hover:text-[#2563EB] transition-colors"
                    >
                      <span>Practice Blueprint</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#1E293B] mb-3 leading-snug group-hover:text-[#3B82F6] transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-6">
                    {s.description}
                  </p>

                  <div className="text-[11px] font-mono font-bold text-[#1E293B]/70 uppercase tracking-wider mb-3">
                    Key Capabilities
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                    {s.capabilities.slice(0, 6).map((cap, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 text-xs font-medium text-[#1E293B] bg-[#F8FAFC] border border-[#CBD5E1]/70 px-3 py-2 rounded-lg"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] shrink-0" />
                        <span className="truncate">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#CBD5E1]/50 flex items-center justify-between text-xs text-[#64748B]">
                  <span className="font-medium text-[#1E293B]">Enterprise Delivery</span>
                  <Link
                    href={`/services/${s.slug}`}
                    className="font-semibold text-[#3B82F6] hover:underline"
                  >
                    Explore Details & Specifications →
                  </Link>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── SERVICE MATRIX ─────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 bg-[#1E293B] border-b border-[#CBD5E1]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              DIAGNOSTIC MATRIX
            </div>
            <h2 className="text-[clamp(1.85rem,3.2vw,2.75rem)] font-extrabold text-white tracking-[-0.025em] mb-4 leading-tight">
              Match your challenge to our practice capability.
            </h2>
            <p className="text-base sm:text-lg text-[#CBD5E1] max-w-2xl leading-relaxed">
              Every engagement starts with clear technical objectives and measurable operational outcomes.
            </p>
          </Reveal>

          <Reveal type="stagger">
            <div className="overflow-x-auto rounded-2xl border border-[#CBD5E1]/15 bg-[#0F172A]/70 shadow-2xl backdrop-blur-sm">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead>
                  <tr className="bg-white/[0.04] border-b border-[#CBD5E1]/15">
                    <th className="py-4 px-6 text-[11px] font-mono font-bold text-[#93C5FD] tracking-wider uppercase">
                      Business Challenge
                    </th>
                    <th className="py-4 px-6 text-[11px] font-mono font-bold text-[#93C5FD] tracking-wider uppercase">
                      Practice Capability
                    </th>
                    <th className="py-4 px-6 text-[11px] font-mono font-bold text-[#93C5FD] tracking-wider uppercase">
                      Technology Stack
                    </th>
                    <th className="py-4 px-6 text-[11px] font-mono font-bold text-[#93C5FD] tracking-wider uppercase">
                      Delivered Outcome
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#CBD5E1]/10">
                  {matrix.map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-white/[0.03] transition-colors"
                    >
                      <td className="py-5 px-6 text-sm text-[#CBD5E1]">
                        {row.challenge}
                      </td>
                      <td className="py-5 px-6 text-sm font-semibold text-white">
                        {row.capability}
                      </td>
                      <td className="py-5 px-6 text-sm font-mono text-[#93C5FD]">
                        {row.tech}
                      </td>
                      <td className="py-5 px-6 text-sm font-semibold text-[#3B82F6]">
                        <span className="inline-flex items-center gap-1.5 bg-[#3B82F6]/10 px-2.5 py-1 rounded-md border border-[#3B82F6]/20">
                          <span>↑</span>
                          <span>{row.result}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── VAULT CTA ────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-3xl p-8 sm:p-14 border border-[#CBD5E1]/30 shadow-2xl text-center"
              style={{
                background: 'linear-gradient(135deg, #1E293B 0%, #16253f 60%, #0F172A 100%)',
              }}
            >
              {/* Background Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#3B82F6]/15 blur-[120px] rounded-full pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD] text-xs font-mono font-bold uppercase tracking-wider mb-6">
                  ENTERPRISE ARCHITECTURE & ENGAGEMENT
                </div>

                <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-white tracking-[-0.03em] mb-6 leading-tight max-w-2xl mx-auto">
                  Ready to architect your next technical milestone?
                </h2>

                <p className="text-base sm:text-lg text-[#CBD5E1] max-w-xl mx-auto mb-10 leading-relaxed">
                  Let's discuss your organization's technical needs and map out a practical, governed delivery roadmap.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-sm tracking-wide"
                  >
                    <span>Book an Architecture Discovery</span>
                    <span className="text-base">→</span>
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/15 border border-[#CBD5E1]/30 transition-all duration-200 text-sm"
                  >
                    Start a Conversation
                  </Link>
                </div>

                <div className="mt-10 pt-8 border-t border-[#CBD5E1]/10 flex flex-wrap items-center justify-center gap-6 text-xs text-[#93C5FD]">
                  <span>✦ Zero Obligation Discovery</span>
                  <span>✦ Direct Principal Access</span>
                  <span>✦ Governed Delivery Roadmap</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
