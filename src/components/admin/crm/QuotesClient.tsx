'use client'

import React, { useState } from 'react'
import {
  Calculator,
  Search,
  Filter,
  DollarSign,
  Building2,
  Mail,
  ChevronRight,
  X,
  ExternalLink,
  CheckCircle2,
  MessageSquare,
} from 'lucide-react'

interface QuoteRequest {
  id: string
  name: string
  email: string
  company: string | null
  tier: string | null
  project_scope: string | null
  budget: string | null
  message: string | null
  status: string
  created_at: string
}

export function QuotesClient({
  initialQuotes,
}: {
  initialQuotes: QuoteRequest[]
}) {
  const [quotes, setQuotes] = useState<QuoteRequest[]>(initialQuotes)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null)

  const filteredQuotes = quotes.filter((q) => {
    if (!searchQuery.trim()) return true
    const term = searchQuery.toLowerCase()
    return (
      q.name.toLowerCase().includes(term) ||
      q.email.toLowerCase().includes(term) ||
      (q.company && q.company.toLowerCase().includes(term)) ||
      (q.tier && q.tier.toLowerCase().includes(term))
    )
  })

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      setQuotes((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
      )
      if (selectedQuote && selectedQuote.id === id) {
        setSelectedQuote({ ...selectedQuote, status: newStatus })
      }
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type: 'quote', status: newStatus }),
      })
    } catch (err) {
      console.error('Failed to update quote status:', err)
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Estimator Quote Requests
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Interactive calculator scoping submissions with architecture tiers and budget parameters.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search quotes by client, scope, tier..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900"
          />
        </div>
        <span className="text-xs text-slate-500 font-semibold">{filteredQuotes.length} Quotes</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Client / Contact</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Scope Tier</th>
                <th className="py-3 px-4">Scope Parameters</th>
                <th className="py-3 px-4">Estimated Budget</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Submitted</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No quote requests submitted yet
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((q) => (
                  <tr
                    key={q.id}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    onClick={() => setSelectedQuote(q)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          <Calculator className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{q.name}</p>
                          <a
                            href={`mailto:${q.email}`}
                            className="text-[11px] text-blue-600 hover:underline"
                          >
                            {q.email}
                          </a>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {q.company || <span className="text-slate-400 italic">Enterprise</span>}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                        {q.tier || 'Custom Scope'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 max-w-[200px] truncate">
                      {q.project_scope || 'Interactive Scope Calculator'}
                    </td>

                    <td className="py-3.5 px-4 font-bold text-emerald-600">
                      {q.budget || 'Custom Scope'}
                    </td>

                    <td
                      className="py-3.5 px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q.id, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          q.status === 'new'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : q.status === 'reviewing'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : q.status === 'contacted'
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : q.status === 'qualified'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        <option value="new">1. New</option>
                        <option value="reviewing">2. Reviewing</option>
                        <option value="contacted">3. Contacted</option>
                        <option value="qualified">4. Qualified</option>
                        <option value="closed">5. Closed</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(q.created_at).toLocaleDateString()}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {q.message && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedQuote(q)
                            }}
                            className="px-2 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-[11px] font-semibold border border-purple-200 flex items-center gap-1 transition-colors cursor-pointer"
                            title="Read client message"
                          >
                            <MessageSquare className="w-3 h-3 text-purple-600" />
                            <span className="hidden sm:inline">Message</span>
                          </button>
                        )}
                        <button className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Drawer */}
      {selectedQuote && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs"
          onClick={() => setSelectedQuote(null)}
        >
          <div
            className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-150 p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{selectedQuote.name}</h2>
                  <p className="text-xs text-slate-500">
                    {selectedQuote.company || 'Enterprise'} · Scope Tier: {selectedQuote.tier || 'Custom'}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-5 text-xs">
                <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Email</span>
                    <a
                      href={`mailto:${selectedQuote.email}`}
                      className="block font-semibold text-blue-600 hover:underline mt-0.5"
                    >
                      {selectedQuote.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Budget</span>
                    <p className="font-semibold text-emerald-600 mt-0.5">{selectedQuote.budget}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Scope</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{selectedQuote.project_scope}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
                    <p className="font-semibold text-blue-600 mt-0.5">{selectedQuote.status.toUpperCase()}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-1.5">Submitted Scope Notes</h3>
                  <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedQuote.message || 'No additional custom scope text provided.'}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`mailto:${selectedQuote.email}?subject=Pulse41 Custom Architecture Scope`}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
              >
                Send Proposal / Follow-up
              </a>
              <button
                onClick={() => setSelectedQuote(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700 text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
