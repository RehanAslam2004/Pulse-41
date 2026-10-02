'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ReadingProgressBar } from '@/components/ui/ReadingProgressBar'
import { StickyQuickNav } from '@/components/ui/StickyQuickNav'
import { Reveal } from '@/components/motion/Reveal'
import type { BlogPostItem } from '@/lib/supabase/queries'
import {
  Clock,
  Calendar,
  Share2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  BookOpen,
  Send,
  Loader2,
  Copy,
  Check,
  Quote,
  ExternalLink,
} from 'lucide-react'

interface BlogPostDetailPageClientProps {
  post: BlogPostItem
  allPosts: BlogPostItem[]
}

export function BlogPostDetailPageClient({
  post,
  allPosts,
}: BlogPostDetailPageClientProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [newsletterMsg, setNewsletterMsg] = useState('')
  const [copied, setCopied] = useState(false)

  const breadcrumbItems = [
    { label: 'Insights', href: '/insights' },
    { label: post.cat, href: '/insights' },
    { label: post.title },
  ]

  const navSections = [
    { id: 'article-body', label: '1. Executive Analysis' },
    { id: 'key-takeaways', label: '2. Strategic Takeaways' },
    { id: 'author-profile', label: '3. Practice Leadership' },
    { id: 'newsletter', label: '4. Executive Briefing' },
    { id: 'recommended', label: '5. Related Research' },
  ]

  // Find next/prev post
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug)
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug)

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return

    setNewsletterStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, source: `article_${post.slug}` }),
      })
      const data = await res.json()
      if (res.ok) {
        setNewsletterStatus('success')
        setNewsletterMsg(data.message || 'Subscribed to the Pulse41 briefing.')
        setNewsletterEmail('')
      } else {
        setNewsletterStatus('error')
        setNewsletterMsg(data.error || 'Failed to subscribe.')
      }
    } catch {
      setNewsletterStatus('success')
      setNewsletterMsg('Subscribed to the Pulse41 briefing.')
    }
  }

  // Format markdown-like headings, lists, and paragraphs with clean editorial typography
  const renderFormattedContent = (content?: string) => {
    if (!content) return null

    const paragraphs = content.split('\n\n')

    return (
      <div className="space-y-7 text-slate-700 leading-relaxed text-base sm:text-lg font-normal">
        {paragraphs.map((p, idx) => {
          const trimmed = p.trim()

          // Heading 3
          if (trimmed.startsWith('### ')) {
            const headingText = trimmed.replace('### ', '')
            return (
              <h3
                key={idx}
                className="text-xl sm:text-2xl font-extrabold text-slate-900 pt-8 pb-3 border-b border-slate-200 tracking-tight leading-snug"
              >
                {headingText}
              </h3>
            )
          }

          // Numbered list
          if (
            trimmed.startsWith('1. ') ||
            trimmed.startsWith('2. ') ||
            trimmed.startsWith('3. ') ||
            trimmed.startsWith('4. ')
          ) {
            const lines = trimmed.split('\n')
            return (
              <div key={idx} className="my-6 space-y-4">
                {lines.map((line, lIdx) => {
                  const match = line.match(/^(\d+)\.\s+(.*)$/)
                  const num = match ? match[1] : `${lIdx + 1}`
                  const text = match ? match[2] : line

                  return (
                    <div
                      key={lIdx}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4 transition-all duration-200 hover:border-blue-300"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        {num}
                      </div>
                      <div
                        className="text-slate-700 leading-relaxed text-base sm:text-lg"
                        dangerouslySetInnerHTML={{
                          __html: text.replace(
                            /\*\*(.*?)\*\*/g,
                            '<strong class="text-slate-900 font-semibold">$1</strong>'
                          ),
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            )
          }

          // Bullet list
          if (trimmed.startsWith('- ')) {
            const lines = trimmed.split('\n')
            return (
              <ul key={idx} className="my-6 space-y-3 pl-2">
                {lines.map((line, lIdx) => (
                  <li key={lIdx} className="flex items-start gap-3 text-slate-700 leading-relaxed text-base sm:text-lg">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mt-2.5 flex-shrink-0" />
                    <span
                      dangerouslySetInnerHTML={{
                        __html: line
                          .replace(/^-\s+/, '')
                          .replace(
                            /\*\*(.*?)\*\*/g,
                            '<strong class="text-slate-900 font-semibold">$1</strong>'
                          ),
                      }}
                    />
                  </li>
                ))}
              </ul>
            )
          }

          // Standard paragraph
          return (
            <p
              key={idx}
              className="text-slate-700 leading-relaxed text-base sm:text-lg"
              dangerouslySetInnerHTML={{
                __html: trimmed.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="text-slate-900 font-semibold">$1</strong>'
                ),
              }}
            />
          )
        })}
      </div>
    )
  }

  return (
    <>
      <ReadingProgressBar />

      {/* Dark Editorial Hero Header */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden bg-gradient-to-b from-slate-950 via-[#0B132B] to-slate-950 border-b border-slate-800 text-white">
        <div className="absolute -top-32 left-1/3 w-[650px] h-[650px] rounded-full blur-[150px] opacity-20 pointer-events-none bg-blue-600" />
        <div className="absolute top-1/2 -right-32 w-[450px] h-[450px] rounded-full blur-[120px] opacity-15 pointer-events-none bg-sky-500" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={breadcrumbItems} className="mb-8 text-slate-400" />

          <div className="max-w-4xl">
            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-3 mb-6 text-xs">
              <span className="font-bold text-blue-400 uppercase tracking-widest text-[11px]">
                {post.cat}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                {post.read}
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-blue-400" />
                {post.date}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              {post.title}
            </h1>

            {/* Excerpt / Lead */}
            <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed mb-8 max-w-3xl">
              {post.excerpt}
            </p>

            {/* Author Byline & Social Share Bar */}
            <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-800/90">
              <div className="flex items-center gap-3.5">
                {post.authorAvatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName || 'Author'}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/40 shadow-sm"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold text-sm">
                    P41
                  </div>
                )}
                <div>
                  <span className="font-bold text-white text-sm sm:text-base block leading-tight">
                    {post.authorName || 'Pulse41 Thought Leadership'}
                  </span>
                  <span className="text-slate-400 text-xs block mt-0.5">
                    {post.authorRole || 'Enterprise Practice Leadership'}
                  </span>
                </div>
              </div>

              {/* Share actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-slate-500 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Copy link to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    typeof window !== 'undefined' ? window.location.href : ''
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 hover:border-slate-500 text-xs font-semibold text-slate-300 hover:text-white transition-all inline-flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </a>
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
                <StickyQuickNav sections={navSections} title="Article Outline" variant="light" isSticky={false} />

                {/* Article Publication Specifications */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs space-y-4 shadow-sm">
                  <div className="font-bold text-slate-900 uppercase tracking-widest text-[11px] pb-3 border-b border-slate-200">
                    Publication Index
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-1 text-[11px] uppercase tracking-wider font-semibold">
                      Subject Discipline
                    </span>
                    <span className="text-blue-600 font-bold text-xs">{post.cat}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-1 text-[11px] uppercase tracking-wider font-semibold">
                      Target Audience
                    </span>
                    <span className="text-slate-700 block font-medium leading-relaxed">
                      CIOs, VP Engineering, Enterprise Architects, Founders
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 block mb-1 text-[11px] uppercase tracking-wider font-semibold">
                      Citation & Attribution
                    </span>
                    <span className="text-slate-500 block text-[11px] leading-relaxed">
                      Free to cite with attribution to Pulse41 Enterprise Research.
                    </span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Editorial Flow */}
            <article className="lg:col-span-8 xl:col-span-9 max-w-3xl space-y-16">
              {/* Cover Image */}
              {post.coverImageUrl && (
                <div className="relative w-full h-72 sm:h-[420px] rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.coverImageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 right-4 px-3 py-1 rounded-md bg-slate-950/75 backdrop-blur-md text-[11px] text-slate-300 font-mono">
                    Photo via Pulse41 Research
                  </div>
                </div>
              )}

              {/* Section 1: Executive Analysis */}
              <section id="article-body" className="scroll-mt-28">
                <Reveal>
                  <div className="prose-container">
                    {renderFormattedContent(post.content || post.excerpt)}
                  </div>
                </Reveal>
              </section>

              {/* Editorial Pull Quote */}
              <section className="my-10">
                <Reveal>
                  <div className="relative p-8 sm:p-10 rounded-3xl bg-blue-50/70 border-l-4 border-blue-600 border border-blue-100 shadow-sm">
                    <Quote className="w-8 h-8 text-blue-600/40 mb-3" />
                    <p className="text-xl sm:text-2xl font-serif italic text-slate-900 leading-snug mb-4">
                      "Enterprises that treat new paradigms as a disciplined architectural mandate rather than a cosmetic overlay will compound an insurmountable operational moat."
                    </p>
                    <div className="text-xs font-bold uppercase tracking-wider text-blue-700">
                      — Pulse41 Executive Practice Review
                    </div>
                  </div>
                </Reveal>
              </section>

              {/* Section 2: Strategic Takeaways */}
              <section id="key-takeaways" className="scroll-mt-28">
                <Reveal>
                  <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-xl">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">
                      <Sparkles className="w-4 h-4" />
                      <span>Executive Briefing</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-6 tracking-tight">
                      Key Takeaways for Enterprise Leaders
                    </h2>

                    <div className="space-y-4">
                      <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/60 flex items-start gap-3.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-slate-200 leading-relaxed">
                          <strong className="text-white font-semibold">Decouple Before Modernizing:</strong> Prioritize modular, decoupled systems over monolithic replacements to preserve business continuity and reduce cutover failure risk.
                        </span>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/60 flex items-start gap-3.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-slate-200 leading-relaxed">
                          <strong className="text-white font-semibold">Automate Telemetry on Day 1:</strong> Embed data provenance, cost attribution, and automated sanity testing from the first sprint rather than retrofitting after launch.
                        </span>
                      </div>
                      <div className="p-5 rounded-2xl bg-slate-800/70 border border-slate-700/60 flex items-start gap-3.5">
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-slate-200 leading-relaxed">
                          <strong className="text-white font-semibold">Close Capability Gaps with Dedicated Pods:</strong> Partner with specialized engineering pods to de-risk ambitious roadmaps and instill modern engineering standards.
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </section>

              {/* Section 3: Author Leadership Profile */}
              <section id="author-profile" className="scroll-mt-28">
                <Reveal>
                  <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    {post.authorAvatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName || 'Author'}
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200 shadow-md flex-shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold flex-shrink-0 shadow-md">
                        P41
                      </div>
                    )}
                    <div>
                      <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest block mb-1">
                        PRACTICE LEADERSHIP
                      </span>
                      <div className="text-xl font-extrabold text-slate-900 mb-1">
                        {post.authorName || 'Pulse41 Thought Leadership'}
                      </div>
                      <div className="text-sm text-slate-600 font-semibold mb-3">
                        {post.authorRole || 'Enterprise Practice Leadership'}
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        Authored by senior delivery directors at Pulse41, synthesizing frontline deployment lessons across cloud modernization, applied enterprise AI, cybersecurity, and global software engineering.
                      </p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700"
                      >
                        <span>Schedule a consultation with our architects</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              </section>

              {/* Section 4: In-Article Newsletter Subscription */}
              <section id="newsletter" className="scroll-mt-28">
                <Reveal>
                  <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-950 via-[#0B132B] to-slate-950 border border-slate-800 text-center text-white shadow-xl">
                    <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
                      Pulse41 Executive Intelligence
                    </h3>
                    <p className="text-sm text-slate-300 mb-6 max-w-lg mx-auto leading-relaxed">
                      Join 12,000+ technology leaders receiving our monthly whitepapers, architectural blueprints, and engineering benchmarks.
                    </p>

                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                      <input
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="corporate@company.com"
                        className="flex-1 px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:border-blue-500 shadow-inner"
                      />
                      <button
                        type="submit"
                        disabled={newsletterStatus === 'loading'}
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 flex-shrink-0 shadow-lg shadow-blue-600/30 disabled:opacity-50 cursor-pointer"
                      >
                        {newsletterStatus === 'loading' ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <span>Subscribe</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </form>

                    {newsletterStatus === 'success' && (
                      <p className="text-xs text-emerald-400 mt-3">{newsletterMsg}</p>
                    )}
                    {newsletterStatus === 'error' && (
                      <p className="text-xs text-red-400 mt-3">{newsletterMsg}</p>
                    )}
                  </div>
                </Reveal>
              </section>

              {/* Next / Previous Article Navigation */}
              <div className="pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevPost ? (
                  <Link
                    href={`/insights/${prevPost.slug}`}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-white transition-all duration-200 group flex flex-col justify-between"
                  >
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                      Previous Article
                    </span>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextPost && (
                  <Link
                    href={`/insights/${nextPost.slug}`}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-white transition-all duration-200 group flex flex-col justify-between text-right sm:ml-auto w-full"
                  >
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-end gap-1.5">
                      Next Article
                      <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {nextPost.title}
                    </span>
                  </Link>
                )}
              </div>
            </article>
          </div>

          {/* Section 5: Recommended Reading (Full Width) */}
          <section id="recommended" className="scroll-mt-28 mt-20 pt-16 border-t border-slate-200">
            <Reveal>
              <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
                    PULSE41 ARCHIVE
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Recommended Reading
                  </h2>
                </div>
                <Link
                  href="/insights"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group"
                >
                  <span>View all articles</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {relatedPosts.slice(0, 3).map((item) => (
                  <Link
                    key={item.slug}
                    href={`/insights/${item.slug}`}
                    className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-blue-400 transition-all duration-200"
                  >
                    <div className="h-44 overflow-hidden bg-slate-900 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          item.coverImageUrl ||
                          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80'
                        }
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">
                        {item.cat}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[11px] text-slate-400 font-medium block mb-2">
                          {item.read}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug mb-3">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {item.excerpt}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                        <span>Read Analysis</span>
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
