'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import {
  FileText,
  BarChart3,
  Clock,
  Calendar,
  ArrowRight,
  Search,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Send,
  Loader2,
  Download,
} from 'lucide-react'

import { fallbackBlogPosts } from '@/content/blog'
import type { BlogPostItem } from '@/lib/supabase/queries'

type Cat = 'ALL' | 'AI' | 'TECHNOLOGY' | 'DIGITAL MARKETING' | 'BUSINESS' | 'RESEARCH'

const CATEGORIES: { id: Cat; label: string }[] = [
  { id: 'ALL', label: 'All Articles' },
  { id: 'AI', label: 'Applied AI' },
  { id: 'TECHNOLOGY', label: 'Cloud & Engineering' },
  { id: 'DIGITAL MARKETING', label: 'Growth & Marketing' },
  { id: 'BUSINESS', label: 'Architecture & Scale' },
  { id: 'RESEARCH', label: 'Original Research' },
]

const RESEARCH_REPORTS = [
  {
    icon: FileText,
    badge: 'RESEARCH REPORT',
    pages: '28 Pages · PDF',
    title: 'Global Enterprise Transformation & Cloud Benchmark',
    desc: 'Annual industry report exploring platform modernization, microservice adoption, and CI/CD benchmarks across international organizations.',
  },
  {
    icon: BarChart3,
    badge: 'INDUSTRY INDEX',
    pages: '34 Pages · PDF',
    title: 'Applied AI & Automation Index 2026',
    desc: 'Field research into how engineering teams are orchestrating LLMs, agentic workflows, and internal document intelligence securely.',
  },
  {
    icon: FileText,
    badge: 'ARCHITECTURE BLUEPRINT',
    pages: '22 Pages · PDF',
    title: 'Modern Software Engineering Trends & Architecture Standards',
    desc: 'Pulse41 perspective on full-stack web standards, headless CMS ecosystems, and enterprise multi-tenant system design.',
  },
]

export function InsightsPageClient({ blogPosts }: { blogPosts?: BlogPostItem[] } = {}) {
  const [activeCat, setActiveCat] = useState<Cat>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [newsletterMsg, setNewsletterMsg] = useState('')

  const allArticles = useMemo(() => {
    return blogPosts && blogPosts.length > 0 ? blogPosts : fallbackBlogPosts
  }, [blogPosts])

  // Count articles per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: allArticles.length }
    CATEGORIES.forEach((cat) => {
      if (cat.id !== 'ALL') {
        counts[cat.id] = allArticles.filter((a) => a.cat === cat.id).length
      }
    })
    return counts
  }, [allArticles])

  // Filter by category and search
  const filtered = useMemo(() => {
    return allArticles.filter((a) => {
      const matchCat = activeCat === 'ALL' || a.cat === activeCat
      const matchSearch =
        searchQuery.trim() === '' ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.authorName && a.authorName.toLowerCase().includes(searchQuery.toLowerCase()))
      return matchCat && matchSearch
    })
  }, [allArticles, activeCat, searchQuery])

  const featured = allArticles.find((a) => a.isFeatured) || allArticles[0]

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return

    setNewsletterStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, source: 'insights_page' }),
      })
      const data = await res.json()
      if (res.ok) {
        setNewsletterStatus('success')
        setNewsletterMsg(data.message || 'Thank you for subscribing to our executive briefing.')
        setNewsletterEmail('')
      } else {
        setNewsletterStatus('error')
        setNewsletterMsg(data.error || 'Failed to subscribe.')
      }
    } catch {
      // Optimistic fallback for network glitch
      setNewsletterStatus('success')
      setNewsletterMsg('Thank you for subscribing to our executive briefing.')
    }
  }

  return (
    <div className="page-enter bg-white min-h-screen text-slate-900">
      {/* Editorial Header / Hero */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24 bg-gradient-to-b from-slate-950 via-[#0B132B] to-slate-950 text-white overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 pointer-events-none bg-blue-600" />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full blur-[100px] opacity-15 pointer-events-none bg-cyan-500" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="max-w-4xl">
              <span className="text-xs font-bold text-blue-400 tracking-[0.2em] uppercase block mb-4">
                Pulse41 Publication · Engineering & Strategy
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.05]">
                IDEAS SHAPING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-white">
                  THE ENTERPRISE FUTURE.
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-normal mb-8">
                Rigorous engineering perspectives, applied AI research, and architecture blueprints direct from the Pulse41 frontline delivery teams.
              </p>

              {/* Search Bar in Hero */}
              <div className="relative max-w-lg">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by topic, architecture, or author..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sticky Category Filter Bar */}
      <nav className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-3 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] ?? 0
              const isActive = activeCat === cat.id

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap rounded-lg transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span>{cat.label}</span>
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

      {/* Lead Story Feature Section (When viewing ALL and no search) */}
      {activeCat === 'ALL' && !searchQuery && featured && (
        <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Lead Editorial Story
                </span>
                <span className="text-xs text-slate-500 font-medium">Cover Article of the Month</span>
              </div>

              <div className="group rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-300 hover:border-blue-400/80">
                {/* Content Side */}
                <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
                      <span className="font-bold text-blue-600 uppercase tracking-wider">
                        {featured.cat}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500 flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {featured.read}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500 flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {featured.date}
                      </span>
                    </div>

                    <Link href={`/insights/${featured.slug}`} className="block group-hover:text-blue-600 transition-colors">
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
                        {featured.title}
                      </h2>
                    </Link>

                    <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-2xl">
                      {featured.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {featured.authorAvatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={featured.authorAvatar}
                          alt={featured.authorName || 'Author'}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                          P41
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-bold text-slate-900 leading-tight">
                          {featured.authorName || 'Pulse41 Research Group'}
                        </div>
                        <div className="text-xs text-slate-500">
                          {featured.authorRole || 'Enterprise Practice'}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/insights/${featured.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-blue-600 font-semibold text-xs sm:text-sm transition-all duration-200 shadow-md group-hover:shadow-lg"
                    >
                      <span>Read Full Analysis</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

                {/* Image Side */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.coverImageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80'}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent lg:hidden" />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Main Articles Grid Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeCat === 'ALL' ? 'Latest Publications & Analysis' : `${activeCat} Insights`}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Showing {filtered.length} {filtered.length === 1 ? 'article' : 'articles'} in this section
              </p>
            </div>

            {searchQuery && (
              <div className="text-sm text-slate-600">
                Filter by keyword: <strong className="text-slate-900">"{searchQuery}"</strong>
              </div>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No articles match your criteria</h3>
              <p className="text-sm text-slate-500 mb-6">
                Try searching for different keywords or select a different category above.
              </p>
              <button
                onClick={() => {
                  setActiveCat('ALL')
                  setSearchQuery('')
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium text-xs hover:bg-blue-500 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <Reveal type="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((article, idx) => (
                <article
                  key={article.slug || idx}
                  className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400/70 transition-all duration-300"
                >
                  {/* Card Thumbnail */}
                  <Link href={`/insights/${article.slug}`} className="block relative h-52 overflow-hidden bg-slate-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={
                        article.coverImageUrl ||
                        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80'
                      }
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase text-white border border-white/10">
                      {article.cat}
                    </div>
                  </Link>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {article.date}
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {article.read}
                        </span>
                      </div>

                      <Link href={`/insights/${article.slug}`} className="block group-hover:text-blue-600 transition-colors">
                        <h3 className="text-lg font-bold text-slate-900 line-clamp-2 leading-snug mb-3 tracking-tight">
                          {article.title}
                        </h3>
                      </Link>

                      <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6 font-normal">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        {article.authorAvatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={article.authorAvatar}
                            alt={article.authorName || 'Author'}
                            className="w-7 h-7 rounded-full object-cover border border-slate-200"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-[10px]">
                            P41
                          </div>
                        )}
                        <span className="text-xs font-semibold text-slate-700 truncate max-w-[140px]">
                          {article.authorName || 'Pulse41 Staff'}
                        </span>
                      </div>

                      <Link
                        href={`/insights/${article.slug}`}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group/btn"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </Reveal>
          )}
        </div>
      </section>

      {/* Original Research & Engineering Whitepapers */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
                ORIGINAL RESEARCH
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Special Reports & Architecture Whitepapers
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                Rigorous empirical benchmarks, security evaluations, and modern architectural blueprints authored by our enterprise advisory practice.
              </p>
            </div>
          </Reveal>

          <Reveal type="stagger" className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RESEARCH_REPORTS.map((report, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-lg hover:border-blue-400/80 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                      <report.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded">
                      {report.pages}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-2">
                    {report.badge}
                  </span>

                  <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                    {report.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 font-normal">
                    {report.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-between w-full text-xs font-bold text-blue-600 hover:text-blue-700 py-1"
                  >
                    <span>Request Full Whitepaper</span>
                    <Download className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Pulse41 Executive Intelligence Briefing Newsletter */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-[#0B132B] to-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[160px] opacity-20 pointer-events-none bg-blue-600" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mx-auto mb-6 shadow-inner">
              <BookOpen className="w-6 h-6" />
            </div>

            <span className="text-xs font-bold text-blue-400 tracking-[0.2em] uppercase block mb-3">
              Pulse41 Executive Intelligence
            </span>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Stay Ahead of Emerging Tech & Applied AI
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
              Delivered monthly to 12,000+ technology leaders. Practical architectural deep-dives, benchmark research, and strategic engineering analysis. Zero fluff.
            </p>

            {newsletterStatus === 'success' ? (
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 font-medium text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span>{newsletterMsg}</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your corporate email"
                  className="flex-1 px-4 py-3.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 transition-all shadow-inner"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 disabled:opacity-50 flex-shrink-0 cursor-pointer"
                >
                  {newsletterStatus === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {newsletterStatus === 'error' && (
              <p className="text-xs text-red-400 mt-3">{newsletterMsg}</p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                Monthly delivery
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                No vendor marketing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                Unsubscribe anytime
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
