'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useScroll, useSpring, useTransform, type MotionStyle, type MotionValue } from 'framer-motion'
import {
  ArrowRight,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Globe2,
  Layers,
  Lock,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
  FileCheck2,
  CheckCircle2,
  Bot,
} from 'lucide-react'

interface VisualRow {
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  detail: string
}

interface SlideItem {
  id: string
  category: string
  title: string
  description: string
  highlight: string
  ctaText: string
  ctaHref: string
  panelTitle: string
  rows: VisualRow[]
}

const slides: SlideItem[] = [
  {
    id: 'why-pulse41',
    category: 'Core Philosophy',
    title: "We don't just advise — we build and deliver.",
    description:
      'Every Pulse41 engagement ends with deployed, working software in production — never just strategy decks. We engineer for measurable outcomes with senior delivery teams and full intellectual property transfer.',
    highlight: 'Full IP ownership transferred cleanly upon delivery with clear milestone governance.',
    ctaText: 'Discover Why Pulse41',
    ctaHref: '/about',
    panelTitle: 'Governed Engineering Delivery',
    rows: [
      {
        icon: FileCheck2,
        label: 'Full IP Ownership',
        detail: 'Source code and architecture transferred on handoff',
      },
      {
        icon: Code2,
        label: 'Production Software',
        detail: 'Documented releases verified in staging and production',
      },
      {
        icon: Workflow,
        label: 'Senior Delivery Pods',
        detail: 'Dedicated engineering, design and QA specialists',
      },
    ],
  },
  {
    id: 'core-engineering',
    category: 'Software & Cloud',
    title: 'Full-Lifecycle Software & Cloud Architecture',
    description:
      'We build responsive web applications, portals, SaaS products, and enterprise integrations designed for long-term reliability and clean maintainability.',
    highlight: 'TypeScript-first architecture, API integrations, and automated testing discipline.',
    ctaText: 'Explore Engineering Services',
    ctaHref: '/services',
    panelTitle: 'Modern Application Architecture',
    rows: [
      {
        icon: Globe2,
        label: 'Web & Portals',
        detail: 'Fast Next.js interfaces and accessible design systems',
      },
      {
        icon: Server,
        label: 'API & Integrations',
        detail: 'Structured middleware across CRM, ERP and payments',
      },
      {
        icon: GitBranch,
        label: 'Automated QA & CI/CD',
        detail: 'Controlled release pipelines and regression checks',
      },
    ],
  },
  {
    id: 'ai-solutions',
    category: 'AI & Automation',
    title: 'Enterprise AI & Intelligent Automation',
    description:
      'We design practical artificial intelligence inside everyday business workflows — from enterprise RAG assistants to document processing and human-in-the-loop automation.',
    highlight: 'Controlled access, data minimization, and human oversight for high-impact actions.',
    ctaText: 'Discover AI Solutions',
    ctaHref: '/ai-solutions',
    panelTitle: 'Applied AI Systems',
    rows: [
      {
        icon: Sparkles,
        label: 'Knowledge & RAG Systems',
        detail: 'Cited answers grounded in approved company records',
      },
      {
        icon: Bot,
        label: 'Conversational Agents',
        detail: 'Web, WhatsApp and support routing workflows',
      },
      {
        icon: Database,
        label: 'Document Intelligence',
        detail: 'Automated extraction, validation and system sync',
      },
    ],
  },
  {
    id: 'cloud-trust',
    category: 'Security & Infrastructure',
    title: 'Resilient Cloud & Privacy-Ready Security',
    description:
      'Architected for stability and governance across cloud environments with least-privilege access controls, secrets management, and US/EU privacy alignment.',
    highlight: 'Security and privacy built into every stage of delivery and managed operations.',
    ctaText: 'Explore Cloud & Security',
    ctaHref: '/services',
    panelTitle: 'Security & Cloud Governance',
    rows: [
      {
        icon: Lock,
        label: 'Least-Privilege Access',
        detail: 'Role-based permissions and encrypted secrets handling',
      },
      {
        icon: ShieldCheck,
        label: 'Privacy-Aware Design',
        detail: 'GDPR and US state privacy readiness controls',
      },
      {
        icon: CheckCircle2,
        label: 'Continuity & Recovery',
        detail: 'Verified backups, monitoring and patching schedules',
      },
    ],
  },
  {
    id: 'enterprise-platforms',
    category: 'Productized Solutions',
    title: 'Configurable Solution Suites, Faster Launch',
    description:
      'Accelerate delivery using modular solution accelerators across customer experience, portals, workflow automation, credential verification, and business intelligence.',
    highlight: 'Tailored to your operational scope, integrations and governance requirements.',
    ctaText: 'Explore Solutions Suite',
    ctaHref: '/solutions',
    panelTitle: 'Modular Solution Accelerators',
    rows: [
      {
        icon: Layers,
        label: 'PulseCore & PulseEngine',
        detail: 'Corporate web platforms and multi-tenant operations',
      },
      {
        icon: Zap,
        label: 'PulseDesk & PulseWork',
        detail: 'Service desk routing and automated approvals',
      },
      {
        icon: ShieldCheck,
        label: 'PulseCert & PulseVault',
        detail: 'Digital verification and audit-ready compliance',
      },
    ],
  },
]

function StackingPhilosophyCard({
  slide,
  index,
  total,
  progress,
}: {
  slide: SlideItem
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const targetScale = 1 - (total - 1 - index) * 0.024
  const start = index / Math.max(1, total)
  const scale = useTransform(progress, [start, 1], [1, targetScale])

  const cardStyle: MotionStyle = {
    ['--card-top-mobile' as string]: `${74 + index * 10}px`,
    ['--card-top-desktop' as string]: `${84 + index * 14}px`,
    ['--card-z' as string]: 10 + index,
    scale,
    transformOrigin: 'top center',
  }

  return (
    <motion.div
      style={cardStyle}
      className="p41-paddle-card p41-paddle-card-sticky rounded-[20px] sm:rounded-[24px] lg:rounded-[28px] bg-[#FFFFFF] border border-[#E2E8F0] p-5 sm:p-9 lg:p-12 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.08),0_1px_3px_rgba(15,23,42,0.04)] will-change-transform"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-7 lg:gap-12 items-center">
        {/* ── Left Column: Editorial Information ─────────── */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="text-[11px] sm:text-xs font-bold tracking-[0.14em] text-[#2563EB] uppercase mb-1.5 sm:mb-2.5">
            {slide.category}
          </div>

          <h3 className="text-[21px] sm:text-3xl lg:text-[32px] font-extrabold text-[#0F172A] tracking-tight leading-[1.16] sm:leading-[1.18] mb-2 sm:mb-3.5">
            {slide.title}
          </h3>

          <p className="text-[13px] sm:text-base text-slate-600 leading-relaxed mb-3 sm:mb-5">
            {slide.description}
          </p>

          <p className="text-xs sm:text-sm font-medium text-slate-700 border-l-2 border-[#2563EB] pl-3 sm:pl-3.5 mb-4 sm:mb-6 leading-snug sm:leading-normal">
            {slide.highlight}
          </p>

          <div>
            <Link
              href={slide.ctaHref}
              className="inline-flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold bg-[#0F172A] text-white hover:bg-[#2563EB] shadow-sm transition-all group"
            >
              {slide.ctaText}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── Right Column: Minimal Dark Architecture Panel ── */}
        <div className="lg:col-span-6">
          <div className="relative overflow-hidden rounded-xl sm:rounded-2xl bg-[#0F172A] p-4 sm:p-7 text-white border border-slate-800 shadow-xl">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-blue-500/10 blur-3xl"
            />
            <div className="relative z-10">
              <div className="text-xs sm:text-sm font-semibold text-white tracking-tight pb-2.5 mb-2.5 sm:pb-4 sm:mb-4 border-b border-slate-800">
                {slide.panelTitle}
              </div>

              <div className="space-y-2 sm:space-y-3">
                {slide.rows.map((row) => {
                  const Icon = row.icon
                  return (
                    <div
                      key={row.label}
                      className="flex items-start gap-2.5 sm:gap-3.5 rounded-lg sm:rounded-xl bg-slate-900/75 p-2.5 sm:p-3.5 border border-slate-800/80"
                    >
                      <div className="flex size-7 sm:size-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <Icon size={15} />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-semibold text-white leading-snug">
                          {row.label}
                        </div>
                        <div className="text-[11px] sm:text-xs text-slate-400 mt-0.5 leading-snug sm:leading-relaxed">
                          {row.detail}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function PaddleStackingSection() {
  const deckRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 115,
    damping: 26,
    restDelta: 0.001,
  })

  return (
    <section
      aria-label="Core Philosophy and Capabilities"
      className="relative py-12 sm:py-16 lg:py-20 bg-[#F8FAFC] overflow-visible border-b border-slate-200/80"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={deckRef}
          className="relative flex flex-col gap-8 sm:gap-10 lg:gap-14 pb-6 sm:pb-12"
        >
          {slides.map((slide, index) => (
            <StackingPhilosophyCard
              key={slide.id}
              slide={slide}
              index={index}
              total={slides.length}
              progress={smoothProgress}
            />
          ))}
        </div>
      </div>

      <style>{`
        .p41-paddle-card-sticky {
          position: sticky;
          top: var(--card-top-mobile);
          z-index: var(--card-z);
        }
        @media (min-width: 1024px) {
          .p41-paddle-card-sticky {
            top: var(--card-top-desktop);
          }
        }
      `}</style>
    </section>
  )
}
