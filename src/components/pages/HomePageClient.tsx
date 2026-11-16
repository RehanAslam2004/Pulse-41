'use client'

import Link from 'next/link'
import { C } from '@/lib/design/tokens'
import { Reveal } from '@/components/motion/Reveal'
import { ArrowRight } from 'lucide-react'
import { HeroVideo } from '@/components/home/HeroVideo'
import { AnimatedTransitionText } from '@/components/home/AnimatedTransitionText'
import { PaddleStackingSection } from '@/components/home/PaddleStackingSection'
import { ProudClientsSection } from '@/components/home/ProudClientsSection'
import Timeline from '@/components/ui/timeline'
import { InsideStudioSection } from '@/components/home/InsideStudioSection'
import CaseStackScroll, {
  defaultPulseCaseCards,
  type CaseCard,
} from '@/components/ui/case-stack-scroll'
import { FeatureBento } from '@/components/ui/feature-bento'

import type { Industry } from '@/content/industries'
import { fallbackBlogPosts } from '@/content/blog'
import type { BlogPostItem, CaseStudyItem } from '@/lib/supabase/queries'

export function HomePageClient({
  blogPostsData,
  caseStudyData,
}: {
  industriesData?: Industry[]
  blogPostsData?: BlogPostItem[]
  caseStudyData?: CaseStudyItem
} = {}) {
  const allArticles =
    blogPostsData && blogPostsData.length > 0
      ? blogPostsData.slice(0, 3)
      : fallbackBlogPosts.slice(0, 3)

  // If Supabase supplies a live featured case study not already in the default list, prepend it
  const stackCards: CaseCard[] = (() => {
    if (!caseStudyData) return defaultPulseCaseCards
    const targetHref = `/case-studies/${caseStudyData.slug}`
    const alreadyExists = defaultPulseCaseCards.some((c) => c.href === targetHref)
    if (alreadyExists) return defaultPulseCaseCards
    return [
      {
        title: caseStudyData.title,
        category: caseStudyData.industry,
        subtitle: caseStudyData.solution,
        image: caseStudyData.coverImageUrl || undefined,
        face: 'commerce',
        href: targetHref,
      },
      ...defaultPulseCaseCards.slice(0, 9),
    ]
  })()

  return (
    <div className="page-enter">
      {/* ── 1. FULL-VIEWPORT VIDEO HERO ───────────────────────────────── */}
      <HeroVideo />

      {/* ── 2. ANIMATED RIGHT-TO-CENTER TRANSITION STATEMENT ──────────── */}
      <AnimatedTransitionText />

      {/* ── 3. STACKING ADVANTAGE CARDS (MINIMAL DARK VISUALS) ────────── */}
      <PaddleStackingSection />

      {/* ── 4. PROUD TO HAVE WORKED WITH (TECH BACKDROP) ──────────────── */}
      <ProudClientsSection />

      {/* ── 5. OUR PROCESS (WHITE THEME, BLUE LIGHT RAY ANIMATION) ────── */}
      <Timeline />

      {/* ── 6. INSIDE THE STUDIO (SOCIAL MEDIA SHOWCASE) ──────────────── */}
      <InsideStudioSection />

      {/* ── 7. CASE STUDIES (MOVED UP + FULL-BLEED 3D STACKED DRAWER) ─ */}
      <section className="relative bg-white pt-16 sm:pt-24 pb-8 border-b border-slate-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-4 sm:mb-8">
            <Reveal>
              <div>
                <div className="section-label">CASE STUDIES &amp; PLATFORMS</div>
                <h2
                  style={{
                    fontSize: 'clamp(28px,3vw,44px)',
                    fontWeight: 800,
                    color: C.navy,
                    letterSpacing: '-0.025em',
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
                  SOLUTIONS THAT
                  <br />
                  CREATE IMPACT.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Link href="/case-studies" className="btn-secondary" style={{ textDecoration: 'none' }}>
                All Case Studies <span className="arrow">→</span>
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="w-full">
          <CaseStackScroll cards={stackCards} />
        </div>
      </section>

      {/* ── 8. INDUSTRIES — MOVED ONE STEP DOWN (FEATURE BENTO GRID) ──── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-24 border-b border-slate-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-10 sm:mb-12">
            <Reveal>
              <div>
                <div className="section-label">INDUSTRIES</div>
                <h2
                  style={{
                    fontSize: 'clamp(28px,3vw,44px)',
                    fontWeight: 800,
                    color: C.navy,
                    letterSpacing: '-0.025em',
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
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

      {/* ── 9. INSIGHTS ───────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-end gap-6 mb-10 sm:mb-14">
            <Reveal>
              <div>
                <div className="section-label">INSIGHTS</div>
                <h2
                  style={{
                    fontSize: 'clamp(28px,3vw,44px)',
                    fontWeight: 800,
                    color: C.navy,
                    letterSpacing: '-0.025em',
                    margin: 0,
                    lineHeight: 1.1,
                  }}
                >
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

          <Reveal type="stagger" className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            {allArticles.map((a, i) => (
              <Link
                key={a.slug || i}
                href={`/insights/${a.slug}`}
                className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/90 hover:border-blue-400/50 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden cursor-pointer"
                style={{ textDecoration: 'none' }}
              >
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={
                      a.coverImageUrl ||
                      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&fit=crop'
                    }
                    alt={a.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-blue-600 mb-2 tracking-wide">
                      <span>{a.cat}</span>
                      <span className="text-slate-400 font-normal">{a.read}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-2">
                      {a.title}
                    </h3>
                    {a.excerpt && (
                      <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 m-0">
                        {a.excerpt}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                    <span className="text-slate-400 font-medium">{a.date}</span>
                    <span className="flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read Analysis <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 10. FINAL CTA ─────────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-[1140px] mx-auto">
          <Reveal>
            <div
              className="relative rounded-[28px] sm:rounded-[2.5rem] bg-[#0A0F1D] border border-blue-500/25 shadow-2xl p-7 sm:p-14 md:p-20 overflow-hidden text-center"
              style={{
                background: 'linear-gradient(180deg, #0A0F1D 0%, #070B16 100%)',
              }}
            >
              <div
                className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-blue-500/20 blur-[130px] pointer-events-none rounded-full"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.18]"
                style={{
                  backgroundImage:
                    'radial-gradient(rgba(147, 197, 253, 0.5) 1px, transparent 1px)',
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
                  Tell us what you're trying to solve. We'll help you turn it into a practical,
                  resilient, enterprise-grade digital solution.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 group"
                    style={{ textDecoration: 'none' }}
                  >
                    Start a Conversation{' '}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold text-sm sm:text-base transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5"
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
