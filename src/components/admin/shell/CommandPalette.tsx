'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import {
  Search,
  Command,
  FileText,
  Users,
  Briefcase,
  Building2,
  Settings,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles,
  ArrowRight,
  X,
  FilePlus,
  Compass,
} from 'lucide-react'

interface SearchResult {
  id: string
  title: string
  subtitle: string
  category: 'CRM' | 'Content' | 'Careers' | 'System' | 'Action'
  url: string
  badge?: string
}

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Standard Quick Actions
  const staticActions: SearchResult[] = [
    {
      id: 'act-leads',
      title: 'Review Inbound Leads & Pipeline',
      subtitle: 'Open CRM pipeline with all client inquiries',
      category: 'Action',
      url: '/admin/leads',
      badge: 'CRM',
    },
    {
      id: 'act-new-lead',
      title: 'Add New Inbound Lead',
      subtitle: 'Create prospective client record directly in CRM',
      category: 'Action',
      url: '/admin/leads?action=new',
      badge: 'CRM',
    },
    {
      id: 'act-inquiries',
      title: 'Client Messages & Inquiries Inbox',
      subtitle: 'Read incoming messages from consultation and pricing forms',
      category: 'Action',
      url: '/admin/inquiries',
      badge: 'Inbox',
    },
    {
      id: 'act-new-post',
      title: 'Create New Insight / Article',
      subtitle: 'Draft a thought leadership or research publication',
      category: 'Action',
      url: '/admin/content/insights?action=new',
      badge: 'CMS',
    },
    {
      id: 'act-new-case',
      title: 'Create Evidence-Based Case Study',
      subtitle: 'Add verified engineering outcome or transformation',
      category: 'Action',
      url: '/admin/content/case-studies?action=new',
      badge: 'CMS',
    },
    {
      id: 'act-new-job',
      title: 'Post New Career Opportunity',
      subtitle: 'Open position requisition for engineering or design',
      category: 'Action',
      url: '/admin/careers/jobs?action=new',
      badge: 'Talent',
    },
    {
      id: 'act-quotes',
      title: 'Review Estimator Quote Requests',
      subtitle: 'Assess custom scope and architectural inquiries',
      category: 'Action',
      url: '/admin/quotes',
      badge: 'Growth',
    },
    {
      id: 'act-system-health',
      title: 'Inspect Live Telemetry & Health',
      subtitle: 'Check PostgreSQL pooler latency and service posture',
      category: 'Action',
      url: '/admin/system-health',
      badge: 'System',
    },
    {
      id: 'act-audit',
      title: 'View Immutable Audit Trail',
      subtitle: 'Inspect administrative actions and revision logs',
      category: 'Action',
      url: '/admin/activity',
      badge: 'Security',
    },
  ]

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setSelectedIndex(0)
    } else {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  // Fetch search results from server when query changes
  useEffect(() => {
    if (!query.trim()) {
      setResults(staticActions)
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/admin/search?q=${encodeURIComponent(query.trim())}`)
        if (res.ok) {
          const data = await res.json()
          setResults(data.results || [])
        }
      } catch (err) {
        console.error('Search failed:', err)
      } finally {
        setLoading(false)
        setSelectedIndex(0)
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [query])

  // Keyboard navigation inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (results[selectedIndex]) {
        router.push(results[selectedIndex].url)
        onClose()
      }
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search leads, quotes, content, jobs, or run an action..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-200/60"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">
            ESC
          </span>
        </div>

        {/* Results Container */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-100 flex-1">
          {loading ? (
            <div className="p-8 text-center text-xs text-slate-400">
              Querying database indices...
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center">
              <Compass className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">No matching records found</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for a client name, solution title, or action like &quot;lead&quot;
              </p>
            </div>
          ) : (
            <div className="py-1">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {query ? 'Search Results' : 'Recommended Quick Actions'}
              </div>
              {results.map((item, idx) => {
                const isSelected = idx === selectedIndex
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      router.push(item.url)
                      onClose()
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-blue-50 text-blue-900'
                        : 'text-slate-700 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          item.category === 'Action'
                            ? 'bg-blue-100 text-blue-600'
                            : item.category === 'CRM'
                            ? 'bg-emerald-100 text-emerald-700'
                            : item.category === 'Content'
                            ? 'bg-purple-100 text-purple-700'
                            : item.category === 'Careers'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.category === 'Action' && <FilePlus className="w-4 h-4" />}
                        {item.category === 'CRM' && <Users className="w-4 h-4" />}
                        {item.category === 'Content' && <Layers className="w-4 h-4" />}
                        {item.category === 'Careers' && <Briefcase className="w-4 h-4" />}
                        {item.category === 'System' && <ShieldCheck className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-900 truncate">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      {item.badge && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                          {item.badge}
                        </span>
                      )}
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>esc to dismiss</span>
          </div>
          <span className="font-semibold text-slate-500">Pulse41 Control · Command Palette</span>
        </div>
      </div>
    </div>
  )
}
