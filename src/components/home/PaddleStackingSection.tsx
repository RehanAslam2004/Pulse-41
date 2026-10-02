'use client'

import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  Server,
  Layers,
  Zap,
  Activity,
  Globe2,
  Terminal,
  Lock,
  Sparkles,
} from 'lucide-react'

interface SlideItem {
  id: string
  tag: string
  title: string
  description: string
  highlight: string
  ctaText: string
  ctaHref: string
  renderVisual: () => React.ReactNode
}

const slides: SlideItem[] = [
  // ── 01. WHY PULSE41 (CORE PHILOSOPHY) ──────────────────────────────────────
  {
    id: 'why-pulse41',
    tag: '01 · CORE PHILOSOPHY',
    title: "We don't just advise — we build and deliver.",
    description:
      'Every Pulse41 engagement ends with deployed, working technology in production — never an expensive slide deck. We engineer for measurable business outcomes with senior delivery pods, fixed-scope certainty, and full intellectual property transfer.',
    highlight: '100% intellectual property transfer, zero vendor lock-in, and guaranteed deployment timelines.',
    ctaText: 'Discover Why Pulse41',
    ctaHref: '/about',
    renderVisual: () => (
      <div className="bg-[#0F172A] rounded-2xl p-6 sm:p-7 text-white shadow-xl border border-slate-800">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800/80 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">
              Live Delivery & SLA Monitor
            </span>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            PROD STATUS: OPTIMAL
          </span>
        </div>

        {/* 4 Metric Tiles */}
        <div className="grid grid-cols-2 gap-3.5 mb-6">
          <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">100%</div>
            <div className="text-xs font-semibold text-blue-400 mt-1">Full IP Ownership</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Code transferred on delivery</div>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight">99.98%</div>
            <div className="text-xs font-semibold text-emerald-300 mt-1">Production Uptime</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Multi-region cloud SLA</div>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">0 Decks</div>
            <div className="text-xs font-semibold text-blue-400 mt-1">Working Software</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Bi-weekly deployed releases</div>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight">8 Pods</div>
            <div className="text-xs font-semibold text-amber-300 mt-1">Senior Engineering</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Cross-functional specialist teams</div>
          </div>
        </div>

        {/* Bottom Status Ticker */}
        <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span className="font-medium">Sprint 42: Deployed on schedule without rollbacks</span>
          </div>
          <span className="text-[11px] text-slate-500 hidden sm:inline">14-day cadence</span>
        </div>
      </div>
    ),
  },

  // ── 02. WHAT WE DO: CORE ENGINEERING ───────────────────────────────────────
  {
    id: 'core-engineering',
    tag: '02 · CORE ENGINEERING',
    title: 'Full-Lifecycle Software & Cloud Architecture',
    description:
      'We engineer enterprise-grade web applications, responsive customer portals, and microservices backends built to sustain high transaction volumes without latency bottlenecks.',
    highlight: 'TypeScript-first architecture, resilient REST & GraphQL APIs, and sub-15ms edge routing.',
    ctaText: 'Explore Engineering Services',
    ctaHref: '/services',
    renderVisual: () => (
      <div className="bg-[#0F172A] rounded-2xl p-6 sm:p-7 text-white shadow-xl border border-slate-800">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800/80 mb-6">
          <div className="flex items-center gap-3">
            <Terminal size={16} className="text-blue-400" />
            <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">
              Microservices Gateway & Edge
            </span>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
            p99: 14ms
          </span>
        </div>

        {/* Microservices Health List */}
        <div className="space-y-3 mb-6">
          <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Server size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">auth-gateway.pulse41.internal</div>
                <div className="text-[11px] text-slate-400">OAuth2.0 / JWT Auth Token Service</div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-emerald-400">99.99%</span>
              <div className="text-[10px] text-slate-500">8ms avg</div>
            </div>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                <Cpu size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">transaction-engine.core</div>
                <div className="text-[11px] text-slate-400">High-throughput ledger sync</div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-emerald-400">99.98%</span>
              <div className="text-[10px] text-slate-500">12ms avg</div>
            </div>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Activity size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-white">telemetry-stream.pipeline</div>
                <div className="text-[11px] text-slate-400">Event-driven Kafka streaming</div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-emerald-400">100.0%</span>
              <div className="text-[10px] text-slate-500">4ms avg</div>
            </div>
          </div>
        </div>

        {/* CI/CD Status */}
        <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-emerald-400 font-mono">✓</span>
            <span className="font-mono text-[11px] text-slate-300">test-suite: 342/342 passed (18s)</span>
          </div>
          <span className="text-[11px] font-mono text-blue-400">build #894 live</span>
        </div>
      </div>
    ),
  },

  // ── 03. AI SOLUTIONS ───────────────────────────────────────────────────────
  {
    id: 'ai-solutions',
    tag: '03 · AI & AUTOMATION',
    title: 'Enterprise AI & Intelligent Automation',
    description:
      'We design and deploy practical artificial intelligence that operates within enterprise workflows. From contextual Retrieval-Augmented Generation (RAG) to autonomous workflow agents with human oversight.',
    highlight: 'Real-time vector embeddings, 98%+ confidence validation, and zero hallucinations with strict guardrails.',
    ctaText: 'Discover AI Solutions',
    ctaHref: '/ai-solutions',
    renderVisual: () => (
      <div className="bg-[#0F172A] rounded-2xl p-6 sm:p-7 text-white shadow-xl border border-slate-800">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800/80 mb-6">
          <div className="flex items-center gap-3">
            <Sparkles size={16} className="text-indigo-400" />
            <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">
              Autonomous Agent & RAG Pipeline
            </span>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            CONFIDENCE: 98.4%
          </span>
        </div>

        {/* Visual Pipeline Steps */}
        <div className="space-y-3.5 mb-6">
          <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Step 1 · Document Ingestion</span>
              <span className="text-[10px] font-mono text-emerald-400">12,480 chunks parsed</span>
            </div>
            <div className="text-xs font-semibold text-white">Multi-modal PDF, S3 & Database sync</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full w-full" />
            </div>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Step 2 · Vector Retrieval</span>
              <span className="text-[10px] font-mono text-indigo-400">12ms hybrid search</span>
            </div>
            <div className="text-xs font-semibold text-white">Semantic indexing + Guardrail validation</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full w-[98%]" />
            </div>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Step 3 · Action Execution</span>
              <span className="text-[10px] font-mono text-emerald-400">Audited & Logged</span>
            </div>
            <div className="text-xs font-semibold text-white">Automated ERP entry with human-in-the-loop</div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-full" />
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
            <span>Strict enterprise NDA & zero data leakage policy</span>
          </div>
          <span className="text-[11px] text-slate-500">SOC 2 compliant</span>
        </div>
      </div>
    ),
  },

  // ── 04. CLOUD & DIGITAL TRUST ──────────────────────────────────────────────
  {
    id: 'cloud-trust',
    tag: '04 · CLOUD & TRUST',
    title: 'Resilient Cloud & Zero-Trust Security',
    description:
      'Engineered for maximum reliability and compliance across AWS, Azure, and Google Cloud. We implement automated Kubernetes clusters, multi-region failover, and continuous vulnerability shielding.',
    highlight: 'Compliance readiness for SOC 2, ISO 27001, HIPAA, and GDPR with round-the-clock defense.',
    ctaText: 'Explore Cloud & Security',
    ctaHref: '/services',
    renderVisual: () => (
      <div className="bg-[#0F172A] rounded-2xl p-6 sm:p-7 text-white shadow-xl border border-slate-800">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800/80 mb-6">
          <div className="flex items-center gap-3">
            <Lock size={16} className="text-emerald-400" />
            <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">
              Zero-Trust Security & Fleet
            </span>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            CVE VULNERABILITIES: 0
          </span>
        </div>

        {/* Cluster Status Box */}
        <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <Globe2 size={14} className="text-blue-400" />
              Global Kubernetes Fleet
            </div>
            <span className="text-[11px] font-mono text-emerald-400">14/14 Nodes Active</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
              <div className="text-[10px] text-slate-400 uppercase">US-EAST</div>
              <div className="font-bold text-white mt-0.5">Primary</div>
            </div>
            <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
              <div className="text-[10px] text-slate-400 uppercase">EU-CENTRAL</div>
              <div className="font-bold text-white mt-0.5">Failover</div>
            </div>
            <div className="bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
              <div className="text-[10px] text-slate-400 uppercase">AP-SOUTHEAST</div>
              <div className="font-bold text-white mt-0.5">Edge PoP</div>
            </div>
          </div>
        </div>

        {/* Compliance Badges Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 flex items-center gap-2.5">
            <ShieldCheck size={18} className="text-blue-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">SOC 2 Type II</div>
              <div className="text-[10px] text-slate-400">Audited Controls</div>
            </div>
          </div>

          <div className="bg-slate-900/70 p-3 rounded-xl border border-slate-800 flex items-center gap-2.5">
            <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">ISO 27001</div>
              <div className="text-[10px] text-slate-400">Certified Security</div>
            </div>
          </div>
        </div>

        {/* Security Alert Footer */}
        <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
            <span>24/7 Automated attack surface monitoring active</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">WAF active</span>
        </div>
      </div>
    ),
  },

  // ── 05. ENTERPRISE PLATFORMS ───────────────────────────────────────────────
  {
    id: 'enterprise-platforms',
    tag: '05 · ENTERPRISE SUITES',
    title: 'Productized Software Platforms, Rapid Velocity',
    description:
      'Accelerate your time-to-market with pre-architected enterprise suites. Whether launching high-conversion e-commerce, custom SaaS, or intelligent internal portals, our modular platforms reduce development cycles by over 60%.',
    highlight: '4.2x faster delivery than bespoke ground-up projects with production stability on day one.',
    ctaText: 'Explore Solutions Suite',
    ctaHref: '/solutions',
    renderVisual: () => (
      <div className="bg-[#0F172A] rounded-2xl p-6 sm:p-7 text-white shadow-xl border border-slate-800">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800/80 mb-6">
          <div className="flex items-center gap-3">
            <Layers size={16} className="text-amber-400" />
            <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">
              Modular Platform Switchboard
            </span>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
            SPEED: 4.2x ACCELERATION
          </span>
        </div>

        {/* 4 Solution Tiles */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 hover:border-blue-500/50 transition-colors">
            <div className="text-xs font-bold text-blue-400 mb-1 flex items-center gap-1.5">
              <Zap size={13} /> PulseCore
            </div>
            <div className="text-xs font-semibold text-white">Headless CMS Engine</div>
            <div className="text-[10px] text-slate-400 mt-1">Multi-tenant site builder</div>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 hover:border-purple-500/50 transition-colors">
            <div className="text-xs font-bold text-purple-400 mb-1 flex items-center gap-1.5">
              <Zap size={13} /> PulseEngine
            </div>
            <div className="text-xs font-semibold text-white">Custom SaaS Workflows</div>
            <div className="text-[10px] text-slate-400 mt-1">Bespoke web applications</div>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 hover:border-emerald-500/50 transition-colors">
            <div className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1.5">
              <Zap size={13} /> PulseStore
            </div>
            <div className="text-xs font-semibold text-white">Omnichannel Commerce</div>
            <div className="text-[10px] text-slate-400 mt-1">Global cart & payments</div>
          </div>

          <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 hover:border-amber-500/50 transition-colors">
            <div className="text-xs font-bold text-amber-400 mb-1 flex items-center gap-1.5">
              <Zap size={13} /> PulseDesk
            </div>
            <div className="text-xs font-semibold text-white">AI-Assisted Help Desk</div>
            <div className="text-[10px] text-slate-400 mt-1">Intelligent ticket routing</div>
          </div>
        </div>

        {/* Velocity Comparison Bar */}
        <div className="bg-slate-900/60 rounded-xl p-3.5 border border-slate-800">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-300 font-medium">Delivery Timeline Comparison</span>
            <span className="text-emerald-400 font-bold">6 weeks vs. 6 months</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex">
            <div className="bg-blue-500 h-full w-[28%]" title="Pulse41 Platform Delivery" />
            <div className="bg-slate-700 h-full w-[72%]" title="Traditional Bespoke Delivery" />
          </div>
        </div>
      </div>
    ),
  },
]

export function PaddleStackingSection() {
  return (
    <section className="relative py-16 lg:py-20 bg-[#F8FAFC] overflow-visible border-b border-slate-200/80">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* ── STICKY STACKING CARDS CONTAINER (NO EXTRA HEADER) ───────────── */}
        <div className="relative flex flex-col gap-10 lg:gap-14 pb-12">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              style={{
                '--card-top': `${84 + index * 14}px`,
                '--card-z': 10 + index,
              } as React.CSSProperties}
              className="p41-paddle-card p41-paddle-card-sticky rounded-[24px] lg:rounded-[28px] bg-[#FFFFFF] border border-[#E2E8F0] p-7 sm:p-10 lg:p-12 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08),0_1px_3px_rgba(15,23,42,0.04)] transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* ── Left Column: Editorial Information ─────────── */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="text-xs font-extrabold tracking-widest text-[#2563EB] uppercase mb-2.5">
                    {slide.tag}
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#0F172A] tracking-tight leading-[1.2] mb-3.5">
                    {slide.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-5">
                    {slide.description}
                  </p>

                  <div className="text-xs sm:text-sm font-medium text-slate-800 bg-[#F8FAFC] p-3.5 rounded-xl border border-slate-200/80 mb-6 leading-normal">
                    <span className="font-bold text-[#2563EB]">Core Standard: </span>
                    {slide.highlight}
                  </div>

                  <div>
                    <Link
                      href={slide.ctaHref}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold bg-[#0F172A] text-white hover:bg-[#2563EB] shadow-sm transition-all group"
                    >
                      {slide.ctaText}
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* ── Right Column: Rich Interactive UI Dashboard ── */}
                <div className="lg:col-span-7">
                  {slide.renderVisual()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .p41-paddle-card-sticky {
            position: sticky !important;
            top: var(--card-top) !important;
            z-index: var(--card-z) !important;
          }
        }
        @media (max-width: 1023px) {
          .p41-paddle-card-sticky {
            position: relative !important;
            top: auto !important;
            z-index: 1 !important;
          }
        }
      `}</style>
    </section>
  )
}
