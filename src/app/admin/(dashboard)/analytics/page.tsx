import React from 'react'
import Link from 'next/link'
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Users,
  DollarSign,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Globe2,
  FileSpreadsheet,
} from 'lucide-react'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Business Intelligence & Analytics | Pulse41 Admin',
}

export default async function AdminAnalyticsPage() {
  const supabase = createAdminClient()

  const [contactsRes, quotesRes, newslettersRes] = await Promise.all([
    supabase.from('contact_submissions').select('*'),
    supabase.from('quote_requests').select('*'),
    supabase.from('newsletter_subscriptions').select('*'),
  ])

  const contacts = contactsRes.data || []
  const quotes = quotesRes.data || []
  const newsletters = newslettersRes.data || []

  const totalLeads = contacts.length + quotes.length
  const totalSubscribers = newsletters.length

  // Budget Breakdown
  const budgetBuckets: Record<string, number> = {
    'Under $25k': 0,
    '$25k - $50k': 0,
    '$50k - $100k': 0,
    '$100k+ Enterprise': 0,
    'Custom / Undisclosed': 0,
  }

  const allBudgets = [...contacts.map((c) => c.budget), ...quotes.map((q) => q.budget)]
  for (const b of allBudgets) {
    if (!b) budgetBuckets['Custom / Undisclosed']++
    else if (b.includes('10k') || b.includes('25k') || b.includes('<25')) budgetBuckets['Under $25k']++
    else if (b.includes('50k')) budgetBuckets['$25k - $50k']++
    else if (b.includes('100k')) budgetBuckets['$50k - $100k']++
    else if (b.includes('Enterprise') || b.includes('250k')) budgetBuckets['$100k+ Enterprise']++
    else budgetBuckets['Custom / Undisclosed']++
  }

  // Lead Status Breakdown
  const statusCounts = {
    new: 0,
    contacted: 0,
    converted: 0,
    archived: 0,
  }

  const allStatuses = [...contacts.map((c) => c.status), ...quotes.map((q) => q.status)]
  for (const s of allStatuses) {
    if (s in statusCounts) {
      statusCounts[s as keyof typeof statusCounts]++
    }
  }

  // Practices/Scopes Breakdown
  const scopeCounts: Record<string, number> = {}
  for (const c of contacts) {
    const scope = c.project_type || 'General Technology'
    scopeCounts[scope] = (scopeCounts[scope] || 0) + 1
  }
  for (const q of quotes) {
    const scope = q.tier ? `${q.tier} Tier` : 'Product Platform'
    scopeCounts[scope] = (scopeCounts[scope] || 0) + 1
  }

  return (
    <div className="space-y-8">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Business Intelligence & Performance</h2>
          <p className="text-xs text-slate-400 mt-1">
            Conversion metrics, market demand distribution, and commercial pipeline analytics.
          </p>
        </div>

        <a
          href="/api/admin/leads/export?type=all"
          download
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-colors self-start sm:self-auto"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
          <span>Export Analytics Raw Data</span>
        </a>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Commercial Inquiries</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-3 text-2xl font-bold text-white">{totalLeads}</div>
          <p className="mt-1 text-[11px] text-emerald-400 font-medium">100% Inbound Organic</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Lead Conversion Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3 text-2xl font-bold text-emerald-400">
            {totalLeads > 0 ? `${Math.round((statusCounts.converted / totalLeads) * 100)}%` : '0%'}
          </div>
          <p className="mt-1 text-[11px] text-slate-400">Qualified to Client</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Audience Reach</span>
            <Mail className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-3 text-2xl font-bold text-white">{totalSubscribers}</div>
          <p className="mt-1 text-[11px] text-cyan-400 font-medium">Newsletter Briefing List</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Primary Target Markets</span>
            <Globe2 className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-3 text-2xl font-bold text-white">US, UK, EU</div>
          <p className="mt-1 text-[11px] text-slate-400 font-medium">Delivered from Pakistan</p>
        </div>
      </div>

      {/* Two Column Grid: Pipeline Status & Scope Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pipeline Qualification Status */}
        <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800">
          <h3 className="text-base font-bold text-white mb-1">Pipeline Qualification Funnel</h3>
          <p className="text-xs text-slate-400 mb-6">Status distribution of inbound leads</p>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span className="text-amber-400">New / Uncontacted</span>
                <span className="text-slate-300 font-mono">{statusCounts.new}</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                <div
                  className="h-full bg-amber-400 rounded-full transition-all"
                  style={{ width: `${totalLeads ? (statusCounts.new / totalLeads) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span className="text-blue-400">Contacted / Discovery Call</span>
                <span className="text-slate-300 font-mono">{statusCounts.contacted}</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${totalLeads ? (statusCounts.contacted / totalLeads) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span className="text-emerald-400">Converted / Active Client</span>
                <span className="text-slate-300 font-mono">{statusCounts.converted}</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all"
                  style={{ width: `${totalLeads ? (statusCounts.converted / totalLeads) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1.5">
                <span className="text-slate-400">Archived / Closed</span>
                <span className="text-slate-300 font-mono">{statusCounts.archived}</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                <div
                  className="h-full bg-slate-600 rounded-full transition-all"
                  style={{ width: `${totalLeads ? (statusCounts.archived / totalLeads) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Budget Allocation Breakdown */}
        <div className="p-6 rounded-2xl bg-[#0F172A] border border-slate-800">
          <h3 className="text-base font-bold text-white mb-1">Inquiry Budget Allocation</h3>
          <p className="text-xs text-slate-400 mb-6">Distribution across estimated project sizes</p>

          <div className="space-y-4">
            {Object.entries(budgetBuckets).map(([bucket, count]) => {
              const pct = totalLeads ? Math.round((count / totalLeads) * 100) : 0
              return (
                <div key={bucket}>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300">{bucket}</span>
                    <span className="text-slate-400 font-mono">
                      {count} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
