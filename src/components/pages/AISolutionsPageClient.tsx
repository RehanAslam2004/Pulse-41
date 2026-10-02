'use client'

import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import {
  Zap,
  Sparkles,
  MessageSquare,
  FileText,
  BarChart3,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { HeroIntegrationCard } from '@/components/ui/integration-card'
import { HowItWorks } from '@/components/ui/how-it-works'

const solutions = [
  {
    Icon: Zap,
    title: 'Intelligent Automation & RPA',
    tagline: 'Remove manual bottlenecks, accelerate processing speed.',
    problem: 'Repetitive document and approval workflows drain hours and introduce operational errors.',
    approach: 'We map operational workflows, identify orchestration bottlenecks, and deploy automated multi-step pipelines.',
    impact: 'Drastic reduction in manual cycle times and operational friction while improving data accuracy.',
  },
  {
    Icon: Sparkles,
    title: 'Generative AI & Enterprise RAG',
    tagline: 'Private knowledge systems and enterprise copilots.',
    problem: 'Organizations struggle to find and synthesize knowledge locked across disparate document silos.',
    approach: 'We engineer retrieval-augmented generation (RAG) architectures with strict data security and verifiable citations.',
    impact: 'Instant enterprise knowledge retrieval, accurate synthesis, and contextual internal copilots.',
  },
  {
    Icon: MessageSquare,
    title: 'Conversational Agents & Multichannel Bots',
    tagline: 'Intelligent 24/7 client & operational interactions.',
    problem: 'Customer inquiries and internal service requests are bottlenecked by human availability.',
    approach: 'We build conversational AI agents trained on corporate data, integrated with WhatsApp, web chat, and voice portals.',
    impact: 'Instant resolution of routine inquiries, reduced support tickets, and continuous service availability.',
  },
  {
    Icon: FileText,
    title: 'Document Intelligence & Extraction',
    tagline: 'Context-aware extraction from unstructured files.',
    problem: 'Invoices, compliance documents, and applications require time-consuming manual data entry.',
    approach: 'We deploy OCR and deep NLP pipelines to parse, classify, and extract structured data straight into ERP/CRM systems.',
    impact: 'Near-instant document processing with auditable validation and automated error flags.',
  },
  {
    Icon: BarChart3,
    title: 'Predictive & Executive Analytics',
    tagline: 'Detect patterns and forecast outcomes.',
    problem: 'Data exists across disconnected databases without forward-looking insights.',
    approach: 'We develop machine learning forecasting models and executive dashboards that surface risks and anomalies in real time.',
    impact: 'Evidence-based decision-making, trend forecasting, and proactive operational adjustments.',
  },
  {
    Icon: Wrench,
    title: 'Custom AI Engineering',
    tagline: 'Tailored models built for your proprietary workflows.',
    problem: 'Generic off-the-shelf AI services fail to address domain-specific edge cases.',
    approach: 'We design bespoke AI architectures — from custom model tuning to secure API integrations and human-in-the-loop interfaces.',
    impact: 'High domain precision, proprietary IP ownership, and competitive technological advantage.',
  },
]



const responsibleAIPillars = [
  {
    title: 'Human oversight & auditable validation loops',
    desc: 'Dual-confirmation triggers for high-impact decisions and transparent revision history.',
    badge: 'AUDIT READY',
  },
  {
    title: 'Data privacy, encryption, and zero data leakage',
    desc: 'Zero model retention agreements, isolated virtual private clouds, and encrypted storage.',
    badge: 'ENCRYPTION ACTIVE',
  },
  {
    title: 'Transparent, citation-backed outputs without hallucination',
    desc: 'Strict source attribution with confidence scoring and deterministic guardrails.',
    badge: 'DETERMINISTIC',
  },
  {
    title: 'Compliance with international privacy frameworks',
    desc: 'Engineered from day one for full GDPR compliance, HIPAA controls, and SOC2 readiness.',
    badge: 'SOC2 READY',
  },
]

export function AISolutionsPageClient() {
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
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#3B82F6]/12 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#93C5FD]/08 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Headline & Intro */}
            <div className="lg:col-span-6 xl:col-span-6">
              <div className="hero-animate hero-d1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#93C5FD] text-xs font-mono font-semibold tracking-wider uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                <span>ENTERPRISE COGNITIVE ARCHITECTURE</span>
              </div>

              <h1 className="hero-animate hero-d2 text-[clamp(2.75rem,5.2vw,4.75rem)] font-extrabold leading-[1.02] text-white tracking-[-0.035em] mb-6">
                INTELLIGENCE,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CBD5E1] to-[#93C5FD]">
                  ENGINEERED.
                </span>
              </h1>

              <p className="hero-animate hero-d3 text-lg sm:text-xl leading-relaxed text-[#CBD5E1] max-w-xl mb-8">
                Practical, production-grade AI systems designed to automate complex workflows, synthesize unstructured data, and power intelligent enterprise software.
              </p>

              {/* Action Buttons */}
              <div className="hero-animate hero-d4 flex flex-wrap items-center gap-4 mb-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-decoration-none"
                >
                  <span>Discuss an AI Project</span>
                  <span className="text-base">→</span>
                </Link>
                <Link
                  href="/solutions"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/10 hover:bg-white/15 border border-[#CBD5E1]/30 transition-all duration-200 text-decoration-none"
                >
                  <span>View Solution Suites</span>
                  <span className="text-xs text-[#93C5FD]">→</span>
                </Link>
              </div>

              {/* Security & Reliability Badges */}
              <div className="hero-animate hero-d4 flex flex-wrap items-center gap-6 pt-6 border-t border-[#CBD5E1]/15 text-xs font-mono text-[#93C5FD]">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-[#CBD5E1]">Zero Data Leakage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-[#CBD5E1]">Deterministic Citations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-[#CBD5E1]">SOC2 & GDPR Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Column: 21st.dev Contained High-Tech AI Integration Visualizer */}
            <div className="hero-animate hero-d5 lg:col-span-6 xl:col-span-6 flex justify-center">
              <HeroIntegrationCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── AI CAPABILITIES GRID ─────────────────────────────────────────── */}
      <section className="relative bg-[#F8FAFC] py-24 sm:py-32 border-b border-[#CBD5E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <Reveal className="mb-16 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              AI PRACTICE CAPABILITIES
            </div>
            <h2 className="text-[clamp(1.85rem,3.2vw,2.75rem)] font-extrabold text-[#1E293B] tracking-[-0.025em] mb-4 leading-tight">
              Practical AI Built for Measurable Impact
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              From retrieval-augmented copilots to autonomous multi-system pipelines, every architecture is engineered for enterprise performance and auditable reliability.
            </p>
          </Reveal>

          <Reveal type="stagger" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {solutions.map((s, i) => (
              <div
                key={i}
                className="group relative flex flex-col justify-between bg-white rounded-2xl p-7 sm:p-8 border border-[#CBD5E1] shadow-sm hover:shadow-xl hover:border-[#3B82F6]/50 transition-all duration-300"
              >
                <div>
                  {/* Icon & Category Header */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#CBD5E1]/50">
                    <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center group-hover:bg-[#3B82F6] transition-colors duration-300">
                      <s.Icon className="w-6 h-6 text-[#3B82F6] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#64748B] bg-[#F8FAFC] border border-[#CBD5E1]/70 px-2.5 py-1 rounded-md">
                      PRACTICE 0{i + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#1E293B] mb-2 leading-snug group-hover:text-[#3B82F6] transition-colors">
                    {s.title}
                  </h3>

                  <div className="text-xs font-semibold text-[#3B82F6] mb-5 leading-normal">
                    {s.tagline}
                  </div>

                  {/* Problem vs Approach vs Impact */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="text-[10px] font-mono font-bold text-[#64748B] tracking-wider uppercase mb-1">
                        Operational Friction
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#64748B] leading-relaxed">
                        {s.problem}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1]/60">
                      <div className="text-[10px] font-mono font-bold text-[#1E293B] tracking-wider uppercase mb-1">
                        Engineering Approach
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#1E293B] leading-relaxed font-medium">
                        {s.approach}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Commercial Impact Badge */}
                <div className="pt-4 border-t border-[#CBD5E1]/60">
                  <div className="text-[10px] font-mono font-bold text-[#3B82F6] tracking-wider uppercase mb-1 flex items-center gap-1">
                    <span>↑</span>
                    <span>Commercial Impact</span>
                  </div>
                  <p className="text-xs text-[#1E293B] font-semibold leading-relaxed">
                    {s.impact}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── RESPONSIBLE AI & GOVERNANCE ───────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 bg-[#1E293B] border-b border-[#CBD5E1]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <Reveal type="left" className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD] text-xs font-mono font-bold uppercase tracking-wider mb-6">
                GOVERNANCE & TRUST
              </div>
              <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-white tracking-[-0.025em] mb-6 leading-tight">
                Responsible AI by Design
              </h2>
              <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed mb-8">
                We believe enterprise AI must be accountable, auditable, and secure. We avoid unverified &ldquo;black box&rdquo; models in high-stakes environments and build rigorous verification checkpoints into every deployment.
              </p>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-[#CBD5E1]/10">
                <div className="flex items-center gap-3 text-sm font-semibold text-white mb-2">
                  <CheckCircle2 className="w-5 h-5 text-[#3B82F6]" />
                  <span>Zero-Trust AI Guardrails</span>
                </div>
                <p className="text-xs text-[#8DADC8] leading-relaxed">
                  Every pipeline includes prompt injection defense, output validation schemas, and automated hallucination filters before data reaches end-users.
                </p>
              </div>
            </Reveal>

            <Reveal type="right" className="lg:col-span-7">
              <div className="flex flex-col gap-4">
                {responsibleAIPillars.map((pillar, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-[#0F172A]/70 border border-[#CBD5E1]/15 hover:border-[#3B82F6]/40 transition-colors shadow-lg backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck className="w-5 h-5 text-[#93C5FD]" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">
                          {pillar.title}
                        </h3>
                        <p className="text-xs text-[#CBD5E1] leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                    <span className="self-start sm:self-center shrink-0 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#3B82F6]/20 text-[#93C5FD] border border-[#3B82F6]/30">
                      {pillar.badge}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── DEPLOYMENT METHODOLOGY ────────────────────────────────────────── */}
      <section className="relative pt-20 sm:pt-28 pb-10 bg-[#F8FAFC] border-b border-[#CBD5E1] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-4">
          <Reveal className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-xs font-mono font-bold uppercase tracking-wider mb-4">
              DEPLOYMENT METHODOLOGY
            </div>
            <h2 className="text-[clamp(1.85rem,3.2vw,2.75rem)] font-extrabold text-[#1E293B] tracking-[-0.025em] mb-4 leading-tight">
              From Data Architecture to Production AI
            </h2>
            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
              A structured 6-phase engineering lifecycle ensuring zero operational disruption and auditable commercial value.
            </p>
          </Reveal>
        </div>

        {/* 21st.dev Zig-Zag Animated Pinned Card Roadmap */}
        <HowItWorks />
      </section>

      {/* ── VAULT CTA ────────────────────────────────────────────────────── */}
      <section className="relative py-24 sm:py-32 bg-[#0F172A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-3xl p-8 sm:p-14 border border-[#CBD5E1]/20 shadow-2xl text-center"
              style={{
                background: 'linear-gradient(135deg, #1E293B 0%, #16253f 60%, #0F172A 100%)',
              }}
            >
              {/* Background Ambient Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#3B82F6]/15 blur-[120px] rounded-full pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#93C5FD] text-xs font-mono font-bold uppercase tracking-wider mb-6">
                  ENTERPRISE ARCHITECTURE CONSULTATION
                </div>

                <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-extrabold text-white tracking-[-0.03em] mb-6 leading-tight max-w-2xl mx-auto">
                  Ready to integrate production-grade AI?
                </h2>

                <p className="text-base sm:text-lg text-[#CBD5E1] max-w-xl mx-auto mb-10 leading-relaxed">
                  Schedule a technical discovery session to review feasibility, model selection, data readiness, and integration architecture.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-sm tracking-wide text-decoration-none"
                  >
                    <span>Discuss an AI Project</span>
                    <span className="text-base">→</span>
                  </Link>
                  <Link
                    href="/solutions"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/15 border border-[#CBD5E1]/30 transition-all duration-200 text-sm text-decoration-none"
                  >
                    View Solution Suites
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
