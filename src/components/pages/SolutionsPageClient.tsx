'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  MessageSquare,
  Headphones,
  FileText,
  BookOpen,
  Award,
  Truck,
  ShoppingBag,
  Workflow,
  GraduationCap,
  ShieldCheck,
  Shield,
  Search,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Send,
  Check,
  Compass,
  Layers,
  Cpu,
  BarChart3,
  Settings,
  Inbox,
  Share2,
  Users,
  Database,
  RefreshCw,
  FolderGit2,
} from 'lucide-react'
import { solutions, type Solution } from '@/content/solutions'
import { Reveal } from '@/components/motion/Reveal'

// Platform category mappings and visual tokens matching the 21st.dev reference
const platformMetadata: Record<
  string,
  {
    category: 'cx' | 'operations' | 'commerce' | 'security'
    categoryLabel: string
    tags: string[]
    icon: typeof MessageSquare
  }
> = {
  'pulse-desk-ai': {
    category: 'cx',
    categoryLabel: 'Customer experience',
    tags: ['Customer experience', 'AI & automation'],
    icon: MessageSquare,
  },
  'pulse-contact': {
    category: 'cx',
    categoryLabel: 'Customer experience',
    tags: ['Contact centre', 'Workforce management'],
    icon: Headphones,
  },
  'pulse-doc-ai': {
    category: 'operations',
    categoryLabel: 'Operations',
    tags: ['Document processing', 'Workflow automation'],
    icon: FileText,
  },
  'pulse-core': {
    category: 'operations',
    categoryLabel: 'Operations',
    tags: ['Knowledge management', 'Enterprise portals'],
    icon: BookOpen,
  },
  'pulse-cert': {
    category: 'security',
    categoryLabel: 'Security',
    tags: ['Identity & verification', 'Digital credentials'],
    icon: Award,
  },
  'pulse-work': {
    category: 'operations',
    categoryLabel: 'Operations',
    tags: ['Field operations', 'Service logistics'],
    icon: Truck,
  },
  'pulse-store': {
    category: 'commerce',
    categoryLabel: 'Commerce',
    tags: ['Digital commerce', 'Storefronts'],
    icon: ShoppingBag,
  },
  'pulse-nexus': {
    category: 'operations',
    categoryLabel: 'Operations',
    tags: ['Integrations', 'API management'],
    icon: Workflow,
  },
  'pulse-learn': {
    category: 'operations',
    categoryLabel: 'Operations',
    tags: ['Learning management', 'Cohort programs'],
    icon: GraduationCap,
  },
  'pulse-vault': {
    category: 'security',
    categoryLabel: 'Security',
    tags: ['Identity management', 'Zero-trust security'],
    icon: ShieldCheck,
  },
}

export function SolutionsPageClient({ solutionsData }: { solutionsData?: Solution[] } = {}) {
  const currentSolutions = solutionsData && solutionsData.length > 0 ? solutionsData : solutions
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cx' | 'operations' | 'commerce' | 'security'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [mockResponseInserted, setMockResponseInserted] = useState(false)

  // Filtered platforms based on category & real-time search
  const filteredPlatforms = useMemo(() => {
    return currentSolutions.filter((item) => {
      const meta = platformMetadata[item.slug] || {
        category: 'operations',
        tags: [],
      }

      const matchesCategory =
        selectedCategory === 'all' || meta.category === selectedCategory

      const query = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.productName.toLowerCase().includes(query) ||
        meta.tags.some((t) => t.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [currentSolutions, selectedCategory, searchQuery])

  return (
    <div className="page-enter bg-white text-[#0F172A] selection:bg-[#3B82F6]/20">
      {/* ── 1. HERO SECTION (DARK COMMAND THEME) ────────────────────────── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 px-4 sm:px-8 bg-[#0F172A] text-white border-b border-slate-800 overflow-hidden">
        {/* Subtle background glow & mesh */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(rgba(147,197,253,0.12)_1px,transparent_1px)] bg-[size:36px_36px] opacity-25" />
        <div className="absolute top-1/4 -right-20 w-[550px] h-[550px] bg-[#3B82F6]/10 blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            <div className="lg:col-span-6 xl:col-span-7">
              <div className="hero-animate hero-d1 text-xs font-semibold tracking-[0.16em] uppercase text-blue-400 mb-4">
                Enterprise Product Suites
              </div>

              <h1 className="hero-animate hero-d2 text-[clamp(2.75rem,5vw,4.5rem)] font-extrabold leading-[1.04] text-white tracking-[-0.035em] mb-6">
                A faster start.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#CBD5E1] to-[#93C5FD]">
                  A stronger foundation.
                </span>
              </h1>

              <p className="hero-animate hero-d3 text-lg sm:text-xl leading-relaxed text-[#94A3B8] max-w-xl mb-8">
                10 configurable platforms built around your workflows, integrations and delivery goals.
              </p>

              {/* CTAs */}
              <div className="hero-animate hero-d4 flex flex-wrap items-center gap-4 mb-8">
                <a
                  href="#platform-catalog"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-md shadow-[#2563EB]/25 hover:shadow-lg transition-all duration-200"
                >
                  <span>Explore platforms</span>
                  <ArrowRight size={16} />
                </a>

                <Link
                  href="/contact?subject=Scope%20Solution%20Platform"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500 font-semibold text-sm transition-all duration-200"
                >
                  Scope your solution
                </Link>
              </div>

              {/* Trust Badge */}
              <div className="hero-animate hero-d4 inline-flex items-center gap-2.5 text-xs text-[#94A3B8]">
                <ShieldCheck size={16} className="text-[#3B82F6] shrink-0" />
                <span>
                  <strong className="text-white font-semibold">Configured to your needs.</strong> Scope and integrations agreed before delivery.
                </span>
              </div>
            </div>

            {/* Right Column: 3D/Isometric Visualizer (Dark Container) */}
            <div className="hero-animate hero-d4 lg:col-span-6 xl:col-span-5 relative">
              <div className="relative mx-auto max-w-[480px] p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl backdrop-blur-md">
                {/* Floating Squircle Cards (Isometric Layer) */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Card 1: Experience */}
                  <div className="group p-5 rounded-2xl bg-slate-950/90 text-white border border-slate-700/70 shadow-lg hover:-translate-y-1 hover:border-[#3B82F6]/50 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center text-[#93C5FD] mb-3">
                      <MessageSquare size={20} />
                    </div>
                    <div className="text-base font-bold text-white mb-0.5">Experience</div>
                    <div className="text-xs text-slate-400">Conversational AI & CX</div>
                  </div>

                  {/* Card 2: Operations */}
                  <div className="group p-5 rounded-2xl bg-slate-950/90 text-white border border-slate-700/70 shadow-lg hover:-translate-y-1 hover:border-[#3B82F6]/50 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center text-[#93C5FD] mb-3">
                      <Cpu size={20} />
                    </div>
                    <div className="text-base font-bold text-white mb-0.5">Operations</div>
                    <div className="text-xs text-slate-400">Automated Dispatch & Portals</div>
                  </div>

                  {/* Card 3: Intelligence */}
                  <div className="group p-5 rounded-2xl bg-slate-950/90 text-white border border-slate-700/70 shadow-lg hover:-translate-y-1 hover:border-[#3B82F6]/50 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center text-[#93C5FD] mb-3">
                      <BarChart3 size={20} />
                    </div>
                    <div className="text-base font-bold text-white mb-0.5">Intelligence</div>
                    <div className="text-xs text-slate-400">OCR, Analytics & RAG</div>
                  </div>

                  {/* Card 4: Security */}
                  <div className="group p-5 rounded-2xl bg-slate-950/90 text-white border border-slate-700/70 shadow-lg hover:-translate-y-1 hover:border-[#3B82F6]/50 transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center text-[#93C5FD] mb-3">
                      <ShieldCheck size={20} />
                    </div>
                    <div className="text-base font-bold text-white mb-0.5">Security</div>
                    <div className="text-xs text-slate-400">Zero-Trust & Vaults</div>
                  </div>
                </div>

                {/* Layered Blueprint Foundation */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 shadow-sm">
                  <div className="text-[11px] font-mono font-bold text-[#93C5FD] uppercase tracking-wider mb-2.5">
                    Core Delivery Ecosystem
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200">
                      <Share2 size={13} className="text-[#93C5FD]" />
                      <span>Integrations</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200">
                      <Workflow size={13} className="text-[#93C5FD]" />
                      <span>Workflows</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200">
                      <Database size={13} className="text-[#93C5FD]" />
                      <span>Your Data</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/90 border border-slate-800 text-slate-200">
                      <Users size={13} className="text-[#93C5FD]" />
                      <span>Your Team</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PLATFORM CATALOG SECTION (MATCHING INSPO) ─────────────────── */}
      <section id="platform-catalog" className="py-20 sm:py-28 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#2563EB] text-xs font-mono font-bold tracking-wider uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              <span>PLATFORM CATALOG</span>
            </div>
            <h2 className="text-[clamp(2rem,3.5vw,3rem)] font-extrabold text-[#0F172A] tracking-[-0.03em] mb-2 leading-tight">
              Find the right foundation
            </h2>
            <p className="text-base sm:text-lg text-[#64748B]">
              Explore platforms by the challenge you need to solve.
            </p>
          </div>

          {/* Filter Bar & Search Input (Unified Row) */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E2E8F0]">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All platforms' },
                { id: 'cx', label: 'Customer experience' },
                { id: 'operations', label: 'Operations' },
                { id: 'commerce', label: 'Commerce' },
                { id: 'security', label: 'Security' },
              ].map((tab) => {
                const isActive = selectedCategory === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id as any)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/25'
                        : 'bg-[#F8FAFC] text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] border border-[#E2E8F0]'
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
              />
              <input
                type="text"
                placeholder="Search platforms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-medium text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8] hover:text-[#0F172A]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* 10-Platform 2-Column Grid */}
          {filteredPlatforms.length === 0 ? (
            <div className="text-center py-16 px-4 rounded-2xl bg-[#F8FAFC] border border-dashed border-[#CBD5E1]">
              <div className="w-12 h-12 rounded-full bg-[#3B82F6]/10 text-[#2563EB] flex items-center justify-center mx-auto mb-4">
                <Search size={20} />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-1">No platforms found</h3>
              <p className="text-sm text-[#64748B] mb-4">
                No solution platform matches your filter &apos;{searchQuery}&apos;.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSearchQuery('')
                }}
                className="px-4 py-2 rounded-lg bg-[#2563EB] text-white text-xs font-semibold"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {filteredPlatforms.map((item) => {
                const meta = platformMetadata[item.slug] || {
                  category: 'operations',
                  categoryLabel: 'Operations',
                  tags: ['Platform Engineering'],
                  icon: MessageSquare,
                }
                const IconComponent = meta.icon

                return (
                  <div
                    key={item.slug}
                    className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#3B82F6]/40 transition-all duration-200"
                  >
                    <div>
                      {/* Top: Icon + Platform Number Badge */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] group-hover:scale-105 transition-transform duration-200">
                          <IconComponent size={22} />
                        </div>
                        <span className="text-[11px] font-mono font-bold text-[#2563EB] tracking-wider uppercase">
                          PLATFORM {item.num}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] mb-2 leading-snug group-hover:text-[#2563EB] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                        {item.description}
                      </p>
                    </div>

                    {/* Footer: Tags + Direct Link to Slug Blueprint */}
                    <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9] gap-2 flex-wrap">
                      <div className="flex flex-wrap gap-1.5">
                        {meta.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-[#F1F5F9] text-[#475569] text-[11px] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/solutions/${item.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors"
                      >
                        <span>Explore platform</span>
                        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── 3. FEATURED PLATFORM SPOTLIGHT (MATCHING INSPO) ─────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 bg-[#0F172A] text-white border-y border-slate-800 relative overflow-hidden">
        {/* Subtle Ambient Background Light */}
        <div className="absolute top-1/3 left-1/3 w-[550px] h-[550px] bg-[#3B82F6]/08 blur-[140px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* Eyebrow */}
          <div className="text-xs font-semibold tracking-[0.16em] uppercase text-blue-400 mb-8">
            Featured Platform Architecture
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Pulse41 Customer Support CRM Mockup */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-md">
                {/* CRM Header Bar */}
                <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-xs font-bold text-white tracking-wider">PULSE41</span>
                    <span className="text-xs text-slate-500">/</span>
                    <span className="text-xs font-medium text-slate-300">Customer Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>RAG Mesh Active</span>
                  </div>
                </div>

                {/* CRM Main Workspace (3 Panes) */}
                <div className="grid grid-cols-1 sm:grid-cols-12 min-h-[360px]">
                  {/* Left Rail */}
                  <div className="sm:col-span-3 p-3 bg-slate-950/40 border-r border-slate-800 flex flex-col gap-1 text-xs">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-[#3B82F6]/20 text-[#93C5FD] font-semibold">
                      <div className="flex items-center gap-2">
                        <Inbox size={14} />
                        <span>Inbox</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.2 bg-[#3B82F6] text-white rounded-full">5</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg text-slate-400 hover:text-white">
                      <BookOpen size={14} />
                      <span>Knowledge</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg text-slate-400 hover:text-white">
                      <BarChart3 size={14} />
                      <span>Analytics</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg text-slate-400 hover:text-white">
                      <Cpu size={14} />
                      <span>Automation</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 rounded-lg text-slate-400 hover:text-white mt-auto">
                      <Settings size={14} />
                      <span>Settings</span>
                    </div>
                  </div>

                  {/* Middle Ticket List */}
                  <div className="sm:col-span-4 p-3 border-r border-slate-800 bg-slate-900/40 flex flex-col gap-2">
                    <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-1">
                      Recent Inquiries
                    </div>
                    {[
                      { name: 'Sarah Chen', query: 'What are your delivery times?', time: '2m', active: true },
                      { name: 'James Miller', query: 'I need help with my account', time: '15m', active: false },
                      { name: 'Priya Shah', query: 'Can you update my order?', time: '28m', active: false },
                      { name: 'Michael Torres', query: 'Refund for cancelled order', time: '1h', active: false },
                      { name: 'Emma Wilson', query: 'Integration questions', time: '2h', active: false },
                    ].map((ticket, i) => (
                      <div
                        key={i}
                        className={`p-2.5 rounded-lg border transition-all text-xs ${
                          ticket.active
                            ? 'bg-[#3B82F6]/15 border-[#3B82F6]/40 text-white'
                            : 'bg-slate-800/30 border-slate-700/40 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between font-semibold mb-0.5">
                          <span className={ticket.active ? 'text-[#93C5FD]' : 'text-slate-300'}>
                            {ticket.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{ticket.time}</span>
                        </div>
                        <p className="text-[11px] truncate opacity-90">{ticket.query}</p>
                      </div>
                    ))}
                  </div>

                  {/* Right Panel: Knowledge Assistant Conversation */}
                  <div className="sm:col-span-5 p-4 flex flex-col justify-between bg-slate-950/60">
                    <div>
                      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800 text-xs font-semibold text-[#93C5FD]">
                        <Sparkles size={14} className="text-[#3B82F6]" />
                        <span>Knowledge Assistant</span>
                      </div>

                      {/* Customer Question Bubble */}
                      <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-200 mb-3">
                        <span className="text-[10px] font-mono text-slate-400 block mb-1">Sarah Chen:</span>
                        What are your delivery times for international enterprise shipments?
                      </div>

                      {/* AI Suggestion Box */}
                      <div className="p-3.5 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-xs text-slate-100">
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#93C5FD] font-semibold mb-1.5">
                          <Sparkles size={12} />
                          <span>GROUNDED RAG SUGGESTION</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                          Based on your knowledge base, standard international enterprise shipping is 2–3 business days with automated customs tracking.
                        </p>
                        <button
                          onClick={() => setMockResponseInserted(!mockResponseInserted)}
                          className={`w-full py-1.5 px-3 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all ${
                            mockResponseInserted
                              ? 'bg-emerald-500 text-white'
                              : 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-sm'
                          }`}
                        >
                          <Check size={12} />
                          <span>{mockResponseInserted ? 'Response Inserted ✓' : 'Insert Response'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Chat Input Bar */}
                    <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={mockResponseInserted ? 'Standard enterprise shipping is 2–3 business days.' : 'Type a reply or use AI...'}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
                      />
                      <button className="p-2 rounded-lg bg-[#2563EB] text-white shrink-0">
                        <Send size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Platform 01 Specifications (Matching Inspo) */}
            <div className="lg:col-span-5">
              <div className="text-xs font-mono font-bold text-[#93C5FD] tracking-wider uppercase mb-2">
                — PLATFORM 01
              </div>
              <h3 className="text-[clamp(1.85rem,3vw,2.5rem)] font-extrabold text-white tracking-[-0.03em] mb-4 leading-tight">
                AI Customer Experience Suite
              </h3>
              <p className="text-base text-slate-300 leading-relaxed mb-6">
                Help customers get answers. Give your team room to focus.
              </p>

              {/* 3 Checkmark Items */}
              <div className="flex flex-col gap-3.5 mb-8">
                {[
                  'Answers grounded in your knowledge',
                  'Seamless escalation to your team',
                  'Insights from every conversation',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#2563EB] flex items-center justify-center text-white shrink-0">
                      <Check size={13} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-medium text-slate-200">{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/solutions/pulse-desk-ai"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-xs transition-all shadow-md shadow-[#2563EB]/25"
                >
                  <span>View platform details</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  href="/contact?subject=Architecture%20Discussion%3A%20AI%20Customer%20Experience%20Suite"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-xs transition-all"
                >
                  Discuss architecture →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CLEAR SCOPE & CONFIDENT DELIVERY (MATCHING INSPO) ─────────── */}
      <section className="py-12 px-4 sm:px-8 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto">
          <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#CBD5E1] shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#DBEAFE] flex items-center justify-center text-[#2563EB] shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#0F172A] mb-1">
                Clear scope. Confident delivery.
              </h4>
              <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
                Availability, integrations, hosting and implementation scope are confirmed during discovery and documented in your statement of work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. GET STARTED CTA SECTION (MATCHING INSPO) ─────────────────── */}
      <section className="py-20 sm:py-24 px-4 sm:px-8 bg-white border-t border-[#E2E8F0]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="text-xs font-mono font-bold text-[#2563EB] tracking-wider uppercase mb-2">
              — GET STARTED
            </div>
            <h2 className="text-[clamp(1.75rem,2.8vw,2.5rem)] font-extrabold text-[#0F172A] tracking-[-0.03em] mb-2 leading-tight">
              Let&apos;s configure your next advantage.
            </h2>
            <p className="text-sm sm:text-base text-[#64748B] max-w-xl leading-relaxed">
              Book a scoping consultation to review integration requirements, infrastructure prerequisites, and a tailored delivery roadmap.
            </p>
          </div>

          <Link
            href="/contact?subject=Book%20a%20Scoping%20Call"
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm shadow-md shadow-[#2563EB]/25 hover:shadow-lg transition-all shrink-0"
          >
            <span>Book a scoping call</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
