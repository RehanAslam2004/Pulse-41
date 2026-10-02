import Link from 'next/link'
import { ArrowRight, ShieldCheck, Sparkles, MessageSquare } from 'lucide-react'

interface ConversionCTAProps {
  title?: string
  description?: string
  badge?: string
  primaryCtaText?: string
  primaryCtaHref?: string
  secondaryCtaText?: string
  secondaryCtaHref?: string
  accentColor?: string
}

export function ConversionCTA({
  title = 'Ready to Architect Your Enterprise Solution?',
  description = 'Schedule a confidential architecture briefing with our senior technical partners. We review your current stack, baseline requirements, and engineer a pilot blueprint within 10 business days.',
  badge = 'PARTNER WITH PULSE41',
  primaryCtaText = 'Request Architecture Briefing',
  primaryCtaHref = '/contact',
  secondaryCtaText = 'Explore All Solutions',
  secondaryCtaHref = '/solutions',
  accentColor = '#3B82F6',
}: ConversionCTAProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-8 sm:p-12 lg:p-16 my-16 shadow-2xl">
      {/* Background ambient lighting */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: accentColor }}
      />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none bg-blue-600" />

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{badge}</span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4 leading-tight">
          {title}
        </h2>

        <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <Link
            href={primaryCtaHref}
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 group"
          >
            <span>{primaryCtaText}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          {secondaryCtaHref && (
            <Link
              href={secondaryCtaHref}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-medium text-sm transition-all duration-200"
            >
              <span>{secondaryCtaText}</span>
            </Link>
          )}
        </div>

        {/* Corporate Trust Badges */}
        <div className="mt-8 pt-8 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
          <div className="inline-flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>NDA Protected & Confidential</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span>Direct Partner Consultation</span>
          </div>
          <div className="text-slate-500">
            Official Brand Tagline: <span className="text-slate-300 font-semibold">TECH. THINK. THRIVE.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
