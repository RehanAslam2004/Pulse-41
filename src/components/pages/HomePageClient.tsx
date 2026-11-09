'use client'

import { useState } from 'react'
import Link from 'next/link'
import { C } from '@/lib/design/tokens'
import { Reveal } from '@/components/motion/Reveal'
import {
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'
import { HeroVideo } from '@/components/home/HeroVideo'
import { AnimatedTransitionText } from '@/components/home/AnimatedTransitionText'
import { PaddleStackingSection } from '@/components/home/PaddleStackingSection'
import { ProudClientsSection } from '@/components/home/ProudClientsSection'
import Timeline from '@/components/ui/timeline'
import { FeatureBento } from '@/components/ui/feature-bento'
import { TiltCard } from '@/components/ui/tilt-card'

import type { Industry } from '@/content/industries'
import { fallbackBlogPosts } from '@/content/blog'
import { fallbackCaseStudies } from '@/content/case-studies'
import type { BlogPostItem, CaseStudyItem } from '@/lib/supabase/queries'

export function HomePageClient({
  industriesData,
  blogPostsData,
  caseStudyData,
}: {
  industriesData?: Industry[]
  blogPostsData?: BlogPostItem[]
  caseStudyData?: CaseStudyItem
} = {}) {
  const allArticles = blogPostsData && blogPostsData.length > 0 ? blogPostsData.slice(0, 3) : fallbackBlogPosts.slice(0, 3)
  const allCases = caseStudyData
    ? [caseStudyData, ...fallbackCaseStudies.filter((c) => c.slug !== caseStudyData.slug)]
    : fallbackCaseStudies
  const [activeCaseIdx, setActiveCaseIdx] = useState(0)
  const activeCase = allCases[activeCaseIdx] || allCases[0]

  return (
    <div className="page-enter">
      {/* ── FULL-VIEWPORT CLEAN VIDEO HERO (WEBPHASE-STYLE) ───────────── */}
      <HeroVideo />

      {/* ── ANIMATED RIGHT-TO-CENTER TRANSITION STATEMENT ─────────────── */}
      <AnimatedTransitionText />

      {/* ── PADDLE-STYLE 5-SLIDE STACKING ADVANTAGE SECTION ────────────── */}
      <PaddleStackingSection />

      {/* ── PROUD TO HAVE WORKED WITH (WEBPHASE / MORLUTO/REA STYLE) ──── */}
      <ProudClientsSection />

      {/* ── OUR PROCESS (21ST.DEV PINNED HORIZONTAL TIMELINE) ────────── */}
      <Timeline />

      {/* ── INDUSTRIES — 21ST.DEV FEATURE BENTO GRID ──────────────────── */}
      <section style={{ background: '#F8FAFC', padding: '100px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 24 }}>
            <Reveal>
              <div>
                <div className="section-label">INDUSTRIES</div>
                <h2 style={{ fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.1 }}>
                  TECHNOLOGY ACROSS
                  <br />
                  INDUSTRIES.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/industries" className="btn-secondary" style={{ textDecoration: 'none' }}>
                All Industries <span className="arrow">→</span>
              </Link>
            </Reveal>
          </div>
          <Reveal>
            <FeatureBento />
          </Reveal>
        </div>
      </section>

      {/* ── CASE STUDY PREVIEW ─────────────────────────────────────────── */}
      <section style={{ background: C.offWhite, padding: '100px 0' }} className="relative overflow-hidden">
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <Reveal>
              <div>
                <div className="section-label">CASE STUDIES</div>
                <h2 style={{ fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.1 }}>
                  SOLUTIONS THAT
                  <br />
                  CREATE IMPACT.
                </h2>
              </div>
            </Reveal>

            {/* Interactive Sector Switcher Tabs */}
            <Reveal delay={0.1}>
              <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-200/70 backdrop-blur-sm rounded-2xl border border-slate-300/60 shadow-inner">
                {allCases.map((cs, idx) => {
                  const isActive = activeCaseIdx === idx
                  const label =
                    cs.industry.includes('RETAIL') ? 'Retail & Commerce' :
                    cs.industry.includes('FINANCIAL') ? 'Financial Services' :
                    cs.industry.includes('EDUCATION') ? 'EdTech' :
                    cs.industry.includes('HEALTHCARE') ? 'Healthcare' :
                    cs.industry
                  return (
                    <button
                      key={cs.slug || idx}
                      onClick={() => setActiveCaseIdx(idx)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#1D4ED8] text-white shadow-md shadow-blue-700/20 scale-[1.02]'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </Reveal>
          </div>

          <Reveal type="scale">
            <TiltCard
              maxTilt={5}
              perspective={1400}
              scale={1.01}
              glare={true}
              className="rounded-3xl shadow-2xl border border-blue-500/20 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0A0F1D 0%, #0F172A 60%, #111D35 100%)',
              }}
            >
              {/* Subtle architectural radial glow */}
              <div
                className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/10 blur-[100px] pointer-events-none rounded-full"
                aria-hidden="true"
              />

              <div className="relative z-30 p-8 sm:p-12 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Column: Solution & Action */}
                <div className="lg:col-span-6 flex flex-col justify-center">
                  <div className="flex gap-2.5 mb-6 flex-wrap items-center">
                    {/* Clickable Tag 1: Services */}
                    <Link
                      href="/services"
                      title="Explore related services"
                      className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold tracking-wider uppercase bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 shadow-sm cursor-pointer"
                      style={{ textDecoration: 'none' }}
                    >
                      <span>{activeCase.tag}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>

                    {/* Clickable Tag 2: Industries */}
                    <Link
                      href="/industries"
                      title="Explore industry vertical"
                      className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-blue-950/60 hover:bg-blue-900/80 text-blue-200 border border-blue-400/20 hover:border-blue-300/40 transition-all duration-200 cursor-pointer"
                      style={{ textDecoration: 'none' }}
                    >
                      <span>{activeCase.industry}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight leading-[1.18]">
                    {activeCase.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed mb-6">
                    {activeCase.solution}
                  </p>

                  {/* Tech stack badges if available */}
                  {'tech' in activeCase && Array.isArray((activeCase as any).tech) && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {(activeCase as any).tech.map((t: string) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400 text-xs font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div>
                    <Link
                      href={`/case-studies/${activeCase.slug}`}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 group"
                      style={{ textDecoration: 'none' }}
                    >
                      View Delivery Blueprint <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Right Column: Structured Execution Cards */}
                <div className="lg:col-span-6 flex flex-col gap-4">
                  {[
                    { l: 'CHALLENGE', t: activeCase.challenge, color: 'text-amber-400' },
                    { l: 'SOLUTION', t: activeCase.solution, color: 'text-blue-400' },
                    { l: 'RESULT', t: activeCase.result, color: 'text-emerald-400' },
                  ].map((item) => (
                    <div
                      key={item.l}
                      className="bg-white/[0.04] backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-blue-400/30 hover:bg-white/[0.07] transition-all duration-200"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-[10px] font-extrabold tracking-widest ${item.color}`}>
                          {item.l}
                        </span>
                      </div>
                      <p className="text-sm text-slate-300/90 leading-relaxed m-0">
                        {item.t}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <Reveal style={{ textAlign: 'center', marginTop: 44 }}>
            <Link href="/case-studies" className="btn-secondary" style={{ textDecoration: 'none' }}>
              View All Case Studies <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── INSIGHTS ───────────────────────────────────────────────────── */}
      <section style={{ background: 'white', padding: '100px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
            <Reveal>
              <div>
                <div className="section-label">INSIGHTS</div>
                <h2 style={{ fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.1 }}>
                  IDEAS SHAPING
                  <br />
                  THE FUTURE.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href="/insights" className="btn-secondary" style={{ textDecoration: 'none' }}>
                All Insights <span className="arrow">→</span>
              </Link>
            </Reveal>
          </div>

          <Reveal type="stagger" className="p41-insight-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 28 }}>
            {allArticles.map((a, i) => (
              <Link
                key={a.slug || i}
                href={`/insights/${a.slug}`}
                className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden cursor-pointer"
                style={{ textDecoration: 'none' }}
              >
                {/* Photo Header with zoom effect & floating category pills */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={a.coverImageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&fit=crop'}
                    alt={a.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-slate-950/85 backdrop-blur-md text-blue-300 border border-white/10 shadow-sm">
                    {a.cat}
                  </span>

                  {/* Reading Time Pill */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-950/70 backdrop-blur-md text-slate-300 border border-white/10 shadow-sm">
                    {a.read}
                  </span>
                </div>

                {/* Article Body */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 mb-2.5 tracking-wide">
                      {a.date} {a.authorName ? `· ${a.authorName}` : ''}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2.5">
                      {a.title}
                    </h3>
                    {a.excerpt && (
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 m-0">
                        {a.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                    <span className="flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Analysis <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
        <style>{`.p41-insight-grid{display:grid;grid-template-columns:repeat(3,1fr);} @media(max-width:960px){.p41-insight-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────── */}
      <section style={{ background: '#F8FAFC', padding: '100px 24px 120px' }}>
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <Reveal>
            <div
              className="relative rounded-[2.5rem] bg-[#0A0F1D] border border-blue-500/25 shadow-2xl p-8 sm:p-14 md:p-20 overflow-hidden text-center"
              style={{
                background: 'linear-gradient(180deg, #0A0F1D 0%, #070B16 100%)',
              }}
            >
              {/* Architectural Glow Effect */}
              <div
                className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-blue-500/20 blur-[130px] pointer-events-none rounded-full"
                aria-hidden="true"
              />
              {/* High-tech dot matrix pattern overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.18]"
                style={{
                  backgroundImage: 'radial-gradient(rgba(147, 197, 253, 0.5) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
                aria-hidden="true"
              />

              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
                  HAVE AN IDEA
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                    WORTH BUILDING?
                  </span>
                </h2>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-10 max-w-xl mx-auto">
                  Tell us what you're trying to solve. We'll help you turn it into a practical, resilient, enterprise-grade digital solution.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base transition-all duration-200 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 group"
                    style={{ textDecoration: 'none' }}
                  >
                    Start a Conversation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold text-base transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5"
                    style={{ textDecoration: 'none' }}
                  >
                    Explore Services <ArrowRight className="w-4 h-4 opacity-70" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
