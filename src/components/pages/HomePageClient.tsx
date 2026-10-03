'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { C } from '@/lib/design/tokens'
import { Reveal } from '@/components/motion/Reveal'
import {
  GraduationCap,
  Heart,
  Landmark,
  ShoppingBag,
  Radio,
  Building2,
  Rocket,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'
import { PaddleStackingSection } from '@/components/home/PaddleStackingSection'
import Timeline from '@/components/ui/timeline'
import { FeatureBento } from '@/components/ui/feature-bento'
import { TiltCard } from '@/components/ui/tilt-card'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { VideoShowcaseSection } from '@/components/home/VideoShowcaseSection'

const heroSlides = [
  { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=85', alt: 'Technology team collaborating', label: 'COLLABORATION' },
  { src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&q=85', alt: 'AI and data analytics', label: 'AI & DATA' },
  { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=85', alt: 'Digital transformation', label: 'INNOVATION' },
  { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85', alt: 'Business analytics dashboard', label: 'ANALYTICS' },
]

const marqueeItems = [
  'AI & INTELLIGENT AUTOMATION',
  'SOFTWARE & PRODUCT ENGINEERING',
  'CLOUD & DEVOPS PLATFORMS',
  'CYBERSECURITY & DIGITAL TRUST',
  'DATA & EXECUTIVE INTELLIGENCE',
  'DIGITAL MARKETING & GROWTH',
  'MANAGED IT & OUTSOURCING',
  'CONSULTING & ASSURANCE',
  'AI CUSTOMER EXPERIENCE',
  'ENTERPRISE OPERATIONS',
  'AI & INTELLIGENT AUTOMATION',
  'SOFTWARE & PRODUCT ENGINEERING',
  'CLOUD & DEVOPS PLATFORMS',
  'CYBERSECURITY & DIGITAL TRUST',
  'DATA & EXECUTIVE INTELLIGENCE',
  'DIGITAL MARKETING & GROWTH',
  'MANAGED IT & OUTSOURCING',
  'CONSULTING & ASSURANCE',
]

const clientLogos = [
  { name: 'Nintendo', src: '/logos/nintendo_logo.svg' },
  { name: 'jQuery', src: '/logos/jquery_logo.svg' },
  { name: 'Prada', src: '/logos/prada_logo.svg' },
  { name: 'Apple Music', src: '/logos/apple_music_logo.svg' },
  { name: 'Chrome', src: '/logos/chrome_logo.svg' },
  { name: 'Strava', src: '/logos/strava_logo.svg' },
]

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
  const [heroSlide, setHeroSlide] = useState(0)
  const [heroFading, setHeroFading] = useState(false)

  const goToSlide = useCallback((idx: number) => {
    setHeroFading(true)
    setTimeout(() => {
      setHeroSlide(idx)
      setHeroFading(false)
    }, 350)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => {
        const next = (prev + 1) % heroSlides.length
        setHeroFading(true)
        setTimeout(() => setHeroFading(false), 350)
        return next
      })
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="page-enter">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ background: C.offWhite, paddingTop: 88, minHeight: 'calc(100vh - 40px)', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 32px 56px', width: '100%' }}>
          <div className="p41-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            <div>
              <div className="section-label hero-animate hero-d1">TECH · THINK · THRIVE</div>
              <h1
                className="hero-animate hero-d2"
                style={{
                  fontSize: 'clamp(52px,6vw,88px)',
                  fontWeight: 800,
                  lineHeight: 0.95,
                  color: '#0F172A',
                  letterSpacing: '-0.04em',
                  margin: '0 0 28px',
                }}
              >
                BUILDING
                <br />
                WHAT'S
                <br />
                <span style={{ color: C.blue }}>NEXT.</span>
              </h1>
              <p
                className="hero-animate hero-d3"
                style={{ fontSize: 18, lineHeight: 1.78, color: C.textMuted, maxWidth: 480, margin: '0 0 44px' }}
              >
                Pulse41 builds AI-powered products, digital experiences and technology solutions for organizations ready to move from complexity to measurable progress.
              </p>
              <div className="hero-animate hero-d4" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/solutions" className="btn-primary" style={{ textDecoration: 'none' }}>
                  Explore Solutions <span className="arrow">→</span>
                </Link>
                <Link href="/contact" className="btn-secondary" style={{ textDecoration: 'none' }}>
                  Start a Project <span className="arrow">→</span>
                </Link>
              </div>

              <div
                className="hero-animate hero-d5"
                style={{ display: 'flex', gap: 40, marginTop: 56, paddingTop: 32, borderTop: `1px solid ${C.gray}` }}
              >
                {[
                  ['8 Major', 'Practices'],
                  ['10 Enterprise', 'Platforms'],
                  ['Global', 'Delivery'],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: C.navy, letterSpacing: '-0.02em' }}>{v}</div>
                    <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-animate hero-d6" style={{ position: 'relative' }}>
              <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 32px 80px rgba(30,41,59,0.18)', position: 'relative' }}>
                {heroSlides.map((slide, i) => (
                  <img
                    key={i}
                    src={slide.src}
                    alt={slide.alt}
                    style={{
                      position: i === 0 ? 'relative' : 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      opacity: i === heroSlide ? (heroFading ? 0 : 1) : 0,
                      transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1)',
                      zIndex: i === heroSlide ? 1 : 0,
                    }}
                  />
                ))}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 50%,rgba(15,23,42,0.55) 100%)', zIndex: 2 }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.16em' }}>
                    {heroSlides[heroSlide].label}
                  </span>
                  <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                    {heroSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        aria-label={`Slide ${i + 1}`}
                        style={{
                          width: i === heroSlide ? 22 : 7,
                          height: 7,
                          borderRadius: 4,
                          border: 'none',
                          cursor: 'pointer',
                          padding: 0,
                          background: i === heroSlide ? C.lightBlue : 'rgba(255,255,255,0.4)',
                          transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(15,23,42,0.72)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '5px 12px', zIndex: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'white', letterSpacing: '0.1em' }}>
                  {String(heroSlide + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
        <style>{`.p41-hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:72px;} @media(max-width:900px){.p41-hero-grid{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
      </section>

      {/* ── CLIENT INFINITE SLIDER (HARMONIZED #F8FAFC BACKGROUND) ────── */}
      <section className="relative overflow-hidden bg-[#F8FAFC] py-8 sm:py-10 border-t border-b border-slate-200/60">
        <div className="relative w-full overflow-hidden">
          {/* Edge gradient masks for seamless off-white transition */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

          <InfiniteSlider gap={56} duration={35} durationOnHover={70} className="w-full items-center">
            {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, idx) => (
              <div key={idx} className="flex items-center justify-center px-4">
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  className="h-[52px] sm:h-[65px] w-auto object-contain transition-transform duration-300 hover:scale-105"
                  loading="eager"
                />
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </section>

      {/* ── STATISTICS ─────────────────────────────────────────────────── */}
      <section style={{ background: C.offWhite, borderBottom: `1px solid ${C.gray}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <Reveal type="stagger" className="p41-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {[
              ['8', 'Major Practices'],
              ['10', 'Productized Solutions'],
              ['12+', 'Sectors Served'],
              ['100%', 'Delivery Commitment'],
            ].map(([v, l], i) => (
              <div key={i} style={{ padding: '52px 32px', textAlign: 'center', borderRight: i < 3 ? `1px solid ${C.gray}` : 'none' }}>
                <div style={{ fontSize: 52, fontWeight: 800, color: C.navy, letterSpacing: '-0.04em', lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, marginTop: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</div>
              </div>
            ))}
          </Reveal>
        </div>
        <style>{`.p41-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);} @media(max-width:768px){.p41-stats-grid{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
      </section>

      {/* ── PADDLE-STYLE 5-SLIDE STACKING ADVANTAGE SECTION ────────────── */}
      <PaddleStackingSection />

      {/* ── PULSE41 INTRO VIDEO SHOWCASE ─────────────────────────────── */}
      <VideoShowcaseSection />

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
