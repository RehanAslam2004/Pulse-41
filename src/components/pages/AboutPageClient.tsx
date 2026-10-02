'use client'

import Link from 'next/link'
import { C } from '@/lib/design/tokens'
import { Reveal } from '@/components/motion/Reveal'
import { company } from '@/content/company'
import { ImageAutoSlider } from '@/components/ui/image-auto-slider'
import { TestimonialCarousel } from '@/components/sections/TestimonialCarousel'
import { CheckCircle2, ArrowRight } from 'lucide-react'

const team = [
  {
    name: 'Rehan & Leadership Team',
    role: 'Executive Leadership & Direction',
    bio: 'Guiding Pulse41 strategy and execution across enterprise software, AI integration, and global delivery.',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
  },
  {
    name: 'Engineering Practice Lead',
    role: 'Head of Software & Architecture',
    bio: 'Directs cloud architecture, development standards, API integration and technical quality assurance.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    name: 'AI & Data Lead',
    role: 'Head of Applied AI & Automation',
    bio: 'Drives practical generative AI implementation, RAG knowledge systems and workflow orchestration.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  },
  {
    name: 'Product Experience Lead',
    role: 'Head of Design & UX Systems',
    bio: 'Oversees design systems, responsive interfaces, user accessibility and commercial product conversion.',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
  },
  {
    name: 'Client Engagement Lead',
    role: 'Director of Delivery & Client Success',
    bio: 'Ensures structured delivery, transparent milestones, SLA adherence and long-term client enablement.',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
  },
]

export function AboutPageClient() {
  return (
    <div className="page-enter bg-white text-[#0F172A] selection:bg-[#3B82F6]/20">
      {/* ── 1. HERO SECTION ────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 min-h-[72vh] flex items-center bg-[#F8FAFC] border-b border-[#E2E8F0] overflow-hidden">
        {/* Right Polygon Image Container */}
        <div
          className="hidden md:block absolute right-0 top-0 w-[46%] lg:w-[48%] h-full pointer-events-none"
          style={{
            clipPath: 'polygon(14% 0, 100% 0, 100% 100%, 0% 100%)',
          }}
        >
          {/* Engineering workspace photo */}
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80"
            alt="Pulse41 Engineering & Delivery"
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay to blend into the brand */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/35 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative z-10">
          <div className="max-w-xl lg:max-w-2xl">
            <div className="hero-animate hero-d1 text-xs font-bold tracking-[0.2em] text-[#2563EB] uppercase mb-4">
              ABOUT PULSE41
            </div>

            <h1 className="hero-animate hero-d2 text-[clamp(2.75rem,5.5vw,5rem)] font-extrabold leading-[1.02] text-[#0F172A] tracking-[-0.035em] mb-6">
              TECH. THINK.
              <br />
              <span className="text-[#2563EB]">THRIVE.</span>
            </h1>

            <p className="hero-animate hero-d3 text-lg sm:text-xl leading-relaxed text-[#475569] mb-8 max-w-xl">
              A technology and digital-growth partner converting complex business challenges into secure digital products, intelligent workflows, and scalable platforms.
            </p>

            <div className="hero-animate hero-d4 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-md shadow-[#2563EB]/25 hover:shadow-lg transition-all"
              >
                <span>Consult an Architect</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/case-studies"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] font-semibold text-sm transition-all"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. EXECUTIVE PROFILE ────────────────────────────────────────── */}
      <section className="py-24 sm:py-28 px-4 sm:px-8 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Narrative */}
            <div className="lg:col-span-7">
              <Reveal type="left">
                <div className="text-xs font-bold tracking-[0.2em] text-[#2563EB] uppercase mb-3">
                  EXECUTIVE PROFILE
                </div>

                <h2 className="text-[clamp(1.85rem,3.2vw,2.75rem)] font-extrabold text-[#0F172A] tracking-[-0.025em] mb-6 leading-tight">
                  {company.primaryRole}
                </h2>

                <p className="text-base sm:text-lg text-[#475569] leading-relaxed mb-5">
                  {company.offshorePositioning}
                </p>

                <p className="text-base sm:text-lg text-[#475569] leading-relaxed mb-6">
                  {company.brandPromise}
                </p>

                {/* Core Differentiator Callout (Clean Editorial Quote) */}
                <div className="border-l-4 border-[#2563EB] pl-5 py-2 my-6 bg-[#EFF6FF]/60 rounded-r-xl">
                  <p className="text-sm sm:text-base font-semibold text-[#0F172A] leading-relaxed italic">
                    &ldquo;{company.differentiator}&rdquo;
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Executive Specification Card */}
            <div className="lg:col-span-5">
              <Reveal type="right">
                <div className="p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-[#CBD5E1] shadow-sm">
                  <div className="text-xs font-bold tracking-widest text-[#2563EB] uppercase pb-4 mb-4 border-b border-[#E2E8F0]">
                    ORGANIZATIONAL SPECIFICATION
                  </div>

                  <div className="flex flex-col divide-y divide-[#E2E8F0]">
                    {[
                      ['Brand Tagline', company.tagline],
                      ['Profile Edition', company.edition],
                      ['Headquarters', company.hq],
                      ['Priority Markets', company.priorityMarkets.join(', ')],
                      ['Service Scope', '8 Major Practices · 10 Solution Platforms'],
                      ['Delivery Models', 'Fixed-Scope, Retainer, Dedicated Teams, ODC, BOT'],
                    ].map(([k, v]) => (
                      <div key={k} className="py-3.5 first:pt-0 last:pb-0">
                        <div className="text-[11px] font-mono font-bold text-[#64748B] uppercase tracking-wider mb-1">
                          {k}
                        </div>
                        <div className="text-sm font-semibold text-[#0F172A] leading-snug">
                          {v}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. VISION & MISSION (PROPER HEADINGS & STRUCTURE) ───────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 bg-[#0F172A] text-white relative overflow-hidden border-b border-slate-800">
        {/* Ambient radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#3B82F6]/08 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Vision Card */}
              <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold tracking-[0.2em] text-[#93C5FD] uppercase mb-3">
                    OUR VISION
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight tracking-[-0.02em]">
                    Practical Innovation & Measurable Growth
                  </h3>
                  <p className="text-base text-slate-300 leading-relaxed font-normal">
                    To become a trusted international technology and digital-growth partner known for practical innovation, responsible AI, dependable delivery, and measurable commercial outcomes.
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold tracking-[0.2em] text-[#93C5FD] uppercase mb-3">
                    OUR MISSION
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 leading-tight tracking-[-0.02em]">
                    Converting Challenges into Scalable Platforms
                  </h3>
                  <p className="text-base text-slate-300 leading-relaxed font-normal">
                    To convert business challenges into secure digital products, intelligent workflows, scalable platforms, and evidence-led growth programmes through disciplined engineering and transparent collaboration.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4. CULTURAL PERSPECTIVE GALLERY ─────────────────────────────── */}
      <section className="py-24 sm:py-28 bg-[#0F172A] text-white border-b border-slate-800 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#3B82F6]/10 blur-[140px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <Reveal className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="text-xs font-bold tracking-[0.2em] text-[#93C5FD] uppercase mb-3">
              OUR PERSPECTIVE
            </div>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-white tracking-[-0.03em] mb-4 leading-tight">
              Global Vision &amp; Disciplined Craft
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              A look into the environments, mindset, and standards powering Pulse41 engineering and strategic delivery.
            </p>
          </Reveal>
        </div>

        {/* 21st.dev Infinite Scroll Auto Slider */}
        <ImageAutoSlider speedSeconds={35} />
      </section>

      {/* ── 5. US & EUROPEAN MARKET DELIVERY STANDARDS ──────────────────── */}
      <section className="py-24 sm:py-28 px-4 sm:px-8 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-bold tracking-[0.2em] text-[#2563EB] uppercase mb-3">
              INTERNATIONAL GOVERNANCE
            </div>
            <h2 className="text-[clamp(2rem,3.2vw,2.75rem)] font-extrabold text-[#0F172A] tracking-[-0.025em] mb-4 leading-tight">
              US &amp; European Market Delivery Standards
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              Pulse41 is structured to meet the strict legal, operational and compliance standards expected by enterprises in the United States, European Union and United Kingdom.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {company.marketDeliveryStandards.map((std, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#CBD5E1] transition-all flex items-start gap-4 shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] shrink-0 mt-0.5">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A] mb-1.5 leading-snug">
                    {std.requirement}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {std.response}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. THE TEAM POWERING DELIVERY (PRACTICE LEADERSHIP) ─────────── */}
      <section className="py-24 sm:py-28 px-4 sm:px-8 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-14">
            <div className="text-xs font-bold tracking-[0.2em] text-[#2563EB] uppercase mb-3">
              PRACTICE LEADERSHIP
            </div>
            <h2 className="text-[clamp(2rem,3.2vw,2.75rem)] font-extrabold text-[#0F172A] tracking-[-0.025em] mb-2 leading-tight">
              The Team Powering Delivery
            </h2>
            <p className="text-base text-[#64748B]">
              Principal architects, practice directors, and delivery leads orchestrating each engagement.
            </p>
          </Reveal>

          {/* 5-Column Grid with Uniform Height & Fixed Aspect Ratios */}
          <Reveal type="stagger" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
            {team.map((m, i) => (
              <div
                key={i}
                className="group flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-sm hover:shadow-lg hover:border-[#3B82F6]/40 transition-all duration-300"
              >
                <div>
                  <div className="h-56 sm:h-52 w-full overflow-hidden bg-slate-100 relative">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-sm text-[#0F172A] mb-1 leading-snug">
                      {m.name}
                    </h3>
                    <div className="text-xs font-semibold text-[#2563EB] mb-3 leading-tight">
                      {m.role}
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {m.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── 7. CLIENT TESTIMONIALS (FROM CASE STUDY PAGE) ───────────────── */}
      <section className="py-24 sm:py-28 px-4 sm:px-8 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-bold tracking-[0.2em] text-[#2563EB] uppercase mb-3">
              CLIENT TESTIMONIALS
            </div>
            <h2 className="text-[clamp(2rem,3.2vw,2.75rem)] font-extrabold text-[#0F172A] tracking-[-0.03em] mb-3 leading-tight">
              What Clients Value in Our Delivery
            </h2>
            <p className="text-sm sm:text-base text-[#64748B]">
              Representative client reviews across enterprise software, applied AI, and global technology partnerships.
            </p>
          </Reveal>

          <Reveal type="scale">
            <TestimonialCarousel />
          </Reveal>
        </div>
      </section>

      {/* ── 8. LEGAL & GOVERNANCE BOUNDARIES ─────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 bg-[#0F172A] text-white border-b border-slate-800">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-xs font-bold tracking-[0.2em] text-[#93C5FD] uppercase mb-8 text-center">
              LEGAL &amp; DELIVERY BOUNDARIES
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {company.legalBoundaries.map((b, i) => (
                <div
                  key={i}
                  className="p-5 rounded-xl bg-slate-900/60 border border-slate-800"
                >
                  <div className="text-xs font-semibold text-[#93C5FD] mb-1.5">
                    PROVISION 0{i + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {b}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 9. BOTTOM CONVERSION CTA ─────────────────────────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-white tracking-[-0.025em] mb-4 leading-tight">
              BUILD WHAT&apos;S NEXT WITH US.
            </h2>
            <p className="text-base sm:text-lg text-blue-100 max-w-xl mx-auto mb-8 leading-relaxed">
              Whether you&apos;re scoping a new software platform, deploying applied AI, or expanding your offshore delivery capacity — we&apos;re ready.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#2563EB] hover:bg-slate-50 font-extrabold text-sm shadow-xl transition-all"
            >
              <span>Start a Conversation</span>
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
