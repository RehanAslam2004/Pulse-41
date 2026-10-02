'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { TestimonialCarousel } from '@/components/sections/TestimonialCarousel'
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Clock,
  Building,
  Layers,
  Award,
  Zap,
} from 'lucide-react'

import { fallbackCaseStudies } from '@/content/case-studies'
import type { CaseStudyItem } from '@/lib/supabase/queries'

type Filter = 'ALL' | 'AI' | 'SOFTWARE' | 'WEB' | 'MOBILE' | 'DATA'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'ALL', label: 'All Deliveries' },
  { id: 'AI', label: 'Applied AI' },
  { id: 'SOFTWARE', label: 'Software Engineering' },
  { id: 'WEB', label: 'Web Platforms' },
  { id: 'MOBILE', label: 'Mobile Apps' },
  { id: 'DATA', label: 'Data & Analytics' },
]

const PROOF_METRICS = [
  { value: '100+', label: 'Production Deployments', desc: 'Across 12 enterprise sectors' },
  { value: '99.9%', label: 'Delivery On-Time Rate', desc: 'Guaranteed milestone SLAs' },
  { value: '14+', label: 'Global Markets Scaled', desc: 'Compliant cross-border ops' },
  { value: 'Zero', label: 'Critical Security Breaches', desc: 'SOC 2 & zero-trust posture' },
]

export function CaseStudiesPageClient({ caseStudies }: { caseStudies?: CaseStudyItem[] } = {}) {
  const [activeFilter, setActiveFilter] = useState<Filter>('ALL')

  const allCases = useMemo(() => {
    return caseStudies && caseStudies.length > 0 ? caseStudies : fallbackCaseStudies
  }, [caseStudies])

  // Count items per filter
  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: allCases.length }
    FILTERS.forEach((f) => {
      if (f.id !== 'ALL') {
        counts[f.id] = allCases.filter((c) => c.tag === f.id).length
      }
    })
    return counts
  }, [allCases])

  // Filtered case studies
  const filtered = useMemo(() => {
    return activeFilter === 'ALL' ? allCases : allCases.filter((c) => c.tag === activeFilter)
  }, [allCases, activeFilter])

  const featured = allCases.find((c) => c.isFeatured) || allCases[0]

  return (
    <div className="page-enter bg-white min-h-screen text-slate-900">
      {/* Enterprise Dark Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 bg-gradient-to-b from-slate-950 via-[#0B132B] to-slate-950 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 pointer-events-none bg-blue-600" />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 pointer-events-none bg-cyan-500" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="max-w-4xl">
              <span className="text-xs font-bold text-blue-400 tracking-[0.2em] uppercase block mb-4">
                Client Case Studies & Engineering Blueprints
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.05]">
                FROM CHALLENGE TO <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white">
                  MEASURABLE IMPACT.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal mb-10">
                Explore how disciplined engineering, practical AI, and UX design converge to solve mission-critical operational challenges for ambitious enterprises.
              </p>
            </div>
          </Reveal>

          {/* Delivery Proof Metrics Strip */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-slate-800/80">
              {PROOF_METRICS.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm"
                >
                  <div className="text-2xl sm:text-4xl font-extrabold text-white mb-1 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-blue-400 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-400 font-normal">
                    {stat.desc}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sticky Filter Navigation Bar */}
      <nav className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-3 no-scrollbar">
            {FILTERS.map((f) => {
              const count = filterCounts[f.id] ?? 0
              const isActive = activeFilter === f.id

              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{f.label}</span>
                  <span
                    className={`text-[11px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-blue-700/80 text-blue-100' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Featured Blueprint Spotlight Section (When viewing ALL) */}
      {activeFilter === 'ALL' && featured && (
        <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Featured Delivery Blueprint
                </span>
                <span className="text-xs text-slate-500 font-medium">Enterprise Modernization</span>
              </div>

              <div className="group rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-300 hover:border-blue-500/50">
                {/* Content Side */}
                <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
                      <span className="px-3 py-1 rounded-md bg-blue-600 text-white font-bold text-[10px] uppercase tracking-wider">
                        {featured.tag}
                      </span>
                      <span className="text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                        {featured.industry}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-slate-400 font-medium">
                        {featured.timeline || '14 Weeks Delivery'}
                      </span>
                    </div>

                    <Link href={`/case-studies/${featured.slug}`} className="block group-hover:text-blue-400 transition-colors">
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight">
                        {featured.title}
                      </h2>
                    </Link>

                    <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-8 max-w-2xl">
                      {featured.solution}
                    </p>

                    {/* KPI Metric Chips */}
                    {featured.metrics && featured.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 mb-8">
                        {featured.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center"
                          >
                            <div className="text-base sm:text-xl font-extrabold text-blue-400">
                              {m.value}
                            </div>
                            <div className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider mt-0.5">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {featured.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/case-studies/${featured.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm transition-all duration-200 shadow-lg shadow-blue-600/30"
                      >
                        <span>View Blueprint</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Platform Screenshot Side */}
                <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-full overflow-hidden bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      featured.coverImageUrl ||
                      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80'
                    }
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:hidden" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Sector Delivery Profiles (2-Column Grid) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeFilter === 'ALL' ? 'Sector Delivery Profiles' : `${activeFilter} Case Studies`}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Showing {filtered.length} verified production delivery {filtered.length === 1 ? 'profile' : 'profiles'}
              </p>
            </div>
          </div>

          <Reveal type="stagger" className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((cs) => (
              <article
                key={cs.slug}
                className="group flex flex-col bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400/80 transition-all duration-300"
              >
                {/* Photo Thumbnail */}
                <Link href={`/case-studies/${cs.slug}`} className="block relative h-64 overflow-hidden bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      cs.coverImageUrl ||
                      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80'
                    }
                    alt={cs.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Badges on Image */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-blue-600/90 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-white shadow-sm">
                      {cs.tag}
                    </span>
                    <span className="px-3 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-slate-200 border border-white/10">
                      {cs.industry}
                    </span>
                  </div>

                  {cs.timeline && (
                    <div className="absolute bottom-3 right-4 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[11px] font-medium text-slate-300">
                      {cs.timeline}
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/case-studies/${cs.slug}`} className="block group-hover:text-blue-600 transition-colors">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug mb-3">
                        {cs.title}
                      </h3>
                    </Link>

                    {/* KPI Metrics Chips */}
                    {cs.metrics && cs.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-2.5 my-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                        {cs.metrics.map((m, idx) => (
                          <div key={idx} className="text-center">
                            <div className="text-sm sm:text-base font-extrabold text-blue-600 leading-tight">
                              {m.value}
                            </div>
                            <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5 truncate">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Challenge & Solution */}
                    <div className="space-y-3 mb-6">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                          Initial Challenge
                        </span>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {cs.challenge}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-1">
                          Engineered Solution
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                          {cs.solution}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-slate-100">
                      {cs.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-mono font-medium text-slate-600"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Bottom CTA Link */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">
                        Verified Production Deployment
                      </span>
                      <Link
                        href={`/case-studies/${cs.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 group/link"
                      >
                        <span>View Delivery Blueprint</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              What Clients Value in Our Delivery
            </h2>
            <p className="text-base text-slate-600 max-w-xl mx-auto font-normal">
              Direct reviews from engineering directors, CTOs, and founders across enterprise software and AI implementations.
            </p>
          </Reveal>

          <Reveal type="scale">
            <TestimonialCarousel />
          </Reveal>
        </div>
      </section>

      {/* Project Kickoff CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-[#0B132B] to-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] opacity-20 pointer-events-none bg-blue-600" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto mb-6 shadow-inner">
              <Zap className="w-6 h-6" />
            </div>

            <span className="text-xs font-bold text-blue-400 tracking-[0.2em] uppercase block mb-3">
              Start Your Delivery
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              HAVE A COMPLEX CHALLENGE WE CAN SOLVE?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
              Tell us about your technical requirements. Our principal architects will review your legacy constraints and propose a structured delivery blueprint.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all duration-200 shadow-xl shadow-blue-600/30 inline-flex items-center gap-2"
              >
                <span>Schedule an Architecture Review</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/services"
                className="px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 transition-all duration-200"
              >
                Explore Engineering Practices
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
