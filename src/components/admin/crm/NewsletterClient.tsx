'use client'

import React, { useState } from 'react'
import { Mail, Search, Download, CheckCircle2, XCircle } from 'lucide-react'

interface Subscriber {
  id: string
  email: string
  source: string
  is_active: boolean
  subscribed_at: string
}

export function NewsletterClient({
  initialSubscribers,
}: {
  initialSubscribers: Subscriber[]
}) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>(initialSubscribers)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = subscribers.filter((s) => {
    if (!searchQuery.trim()) return true
    return s.email.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const exportCSV = () => {
    const headers = ['Email', 'Source', 'Active', 'Subscribed At']
    const rows = filtered.map((s) => [
      `"${s.email}"`,
      `"${s.source}"`,
      `"${s.is_active ? 'Yes' : 'No'}"`,
      `"${new Date(s.subscribed_at).toISOString()}"`,
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `subscribers_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Newsletter Subscribers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Verified email subscriptions across executive briefing and editorial updates.
          </p>
        </div>

        <button
          onClick={exportCSV}
          disabled={subscribers.length === 0}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer disabled:opacity-50"
        >
          <Download className="w-3.5 h-3.5 text-slate-500" />
          <span>Export Subscriber List</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subscribers by email..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900"
          />
        </div>
        <span className="text-xs text-slate-500 font-semibold">{filtered.length} Subscribers</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Subscriber Email</th>
                <th className="py-3 px-4">Acquisition Source</th>
                <th className="py-3 px-4">Subscription Status</th>
                <th className="py-3 px-4 text-right">Subscribed Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    No active newsletter subscribers in registry
                  </td>
                </tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {s.email}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">
                      {s.source}
                    </td>
                    <td className="py-3.5 px-4">
                      {s.is_active ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Active Opt-In</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          <XCircle className="w-3 h-3" />
                          <span>Unsubscribed</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right text-slate-500">
                      {new Date(s.subscribed_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
