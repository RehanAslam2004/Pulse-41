'use client'

import React, { useState } from 'react'
import {
  Inbox,
  Search,
  Filter,
  Mail,
  Building2,
  Calendar,
  DollarSign,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Copy,
  Check,
  Phone,
  MessageSquare,
  Calculator,
  User,
  AlertCircle,
  Tag,
} from 'lucide-react'

export interface ClientMessage {
  id: string
  source: 'consultation' | 'pricing_tier'
  type: 'contact' | 'quote'
  name: string
  email: string
  company: string | null
  scope: string | null
  budget: string | null
  message: string
  status: string
  created_at: string
}

interface MessagesInboxClientProps {
  initialMessages: ClientMessage[]
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function MessagesInboxClient({ initialMessages }: MessagesInboxClientProps) {
  const [messages, setMessages] = useState<ClientMessage[]>(initialMessages)
  const [selectedId, setSelectedId] = useState<string>(
    initialMessages[0]?.id || ''
  )
  const [sourceFilter, setSourceFilter] = useState<'all' | 'consultation' | 'pricing_tier'>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedText, setCopiedText] = useState(false)

  // Status Change Handler
  const handleStatusChange = async (id: string, type: 'contact' | 'quote', newStatus: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
    )

    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type, status: newStatus }),
      })
    } catch (err) {
      console.error('Failed to update message status:', err)
    }
  }

  // Filter messages
  const filteredMessages = messages.filter((m) => {
    if (sourceFilter !== 'all' && m.source !== sourceFilter) return false
    if (statusFilter !== 'all' && m.status !== statusFilter) return false
    if (!searchQuery.trim()) return true

    const term = searchQuery.toLowerCase()
    return (
      m.name.toLowerCase().includes(term) ||
      m.email.toLowerCase().includes(term) ||
      (m.company && m.company.toLowerCase().includes(term)) ||
      (m.scope && m.scope.toLowerCase().includes(term)) ||
      m.message.toLowerCase().includes(term)
    )
  })

  const selectedMessage =
    messages.find((m) => m.id === selectedId) || filteredMessages[0] || null

  const handleCopyMessage = () => {
    if (!selectedMessage) return
    navigator.clipboard.writeText(selectedMessage.message)
    setCopiedText(true)
    setTimeout(() => setCopiedText(false), 2000)
  }

  const consultCount = messages.filter((m) => m.source === 'consultation').length
  const quoteCount = messages.filter((m) => m.source === 'pricing_tier').length
  const newCount = messages.filter((m) => m.status === 'new').length

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Client Messages & Inquiries Inbox
            </h1>
            {newCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700">
                {newCount} New
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Consolidated intake for messages submitted via Consultation Form (/contact) and Pricing Tier Estimator (/pricing).
          </p>
        </div>
      </div>

      {/* Main Dual-Pane Inbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-h-[680px] items-stretch">
        {/* ── Left Pane: Messages List (5 cols) ───────────────────────── */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col overflow-hidden">
          {/* Search & Source Tabs */}
          <div className="p-3.5 border-b border-slate-200 space-y-3 bg-slate-50/50">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages, client, company..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
              />
            </div>

            {/* Source Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              <button
                onClick={() => setSourceFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  sourceFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All ({messages.length})
              </button>
              <button
                onClick={() => setSourceFilter('consultation')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  sourceFilter === 'consultation'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Consultation ({consultCount})
              </button>
              <button
                onClick={() => setSourceFilter('pricing_tier')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  sourceFilter === 'pricing_tier'
                    ? 'bg-purple-600 text-white shadow-2xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Pricing Tier ({quoteCount})
              </button>
            </div>
          </div>

          {/* Messages Scroll List */}
          <div className="divide-y divide-slate-100 overflow-y-auto max-h-[640px] flex-1">
            {filteredMessages.length === 0 ? (
              <div className="py-16 text-center text-slate-400 p-4">
                <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-600">No messages found</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Adjust filters or search parameters.
                </p>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isSelected = selectedMessage?.id === msg.id
                const isNew = msg.status === 'new'

                return (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedId(msg.id)}
                    className={`p-3.5 transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-blue-50/70 border-l-4 border-l-blue-600'
                        : 'hover:bg-slate-50/80 border-l-4 border-l-transparent'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        {isNew && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                        )}
                        <span className="font-bold text-xs text-slate-900 truncate">
                          {msg.name}
                        </span>
                      </div>

                      <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                        {new Date(msg.created_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-1.5">
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                          msg.source === 'pricing_tier'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {msg.source === 'pricing_tier' ? 'Pricing Tier' : 'Consultation'}
                      </span>
                      {msg.company && (
                        <span className="text-[11px] text-slate-500 font-medium truncate">
                          · {msg.company}
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* ── Right Pane: Message Detail Reader (7 cols) ─────────────── */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col justify-between overflow-hidden">
          {selectedMessage ? (
            <div className="flex flex-col h-full">
              {/* Header Info */}
              <div className="p-5 border-b border-slate-200 bg-slate-50/30 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-700 font-bold text-base flex items-center justify-center flex-shrink-0">
                      {selectedMessage.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-slate-900 leading-tight">
                        {selectedMessage.name}
                      </h2>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-0.5 text-xs text-slate-500">
                        <a
                          href={`mailto:${selectedMessage.email}?subject=Pulse41 Inquiry Follow-up`}
                          className="text-blue-600 hover:underline font-medium inline-flex items-center gap-1"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{selectedMessage.email}</span>
                        </a>
                        {selectedMessage.company && (
                          <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>{selectedMessage.company}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-semibold">Status:</span>
                    <select
                      value={selectedMessage.status}
                      onChange={(e) =>
                        handleStatusChange(
                          selectedMessage.id,
                          selectedMessage.type,
                          e.target.value
                        )
                      }
                      className={`text-xs font-bold px-2.5 py-1 rounded-xl border focus:outline-none cursor-pointer ${
                        selectedMessage.status === 'new'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : selectedMessage.status === 'reviewing'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : selectedMessage.status === 'contacted'
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          : selectedMessage.status === 'qualified'
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
                  </div>
                </div>

                {/* Scope & Parameter Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                  <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Origin Channel
                    </span>
                    <span
                      className={`text-xs font-bold inline-block mt-0.5 ${
                        selectedMessage.source === 'pricing_tier'
                          ? 'text-purple-700'
                          : 'text-emerald-700'
                      }`}
                    >
                      {selectedMessage.source === 'pricing_tier'
                        ? 'Pricing Tier Scoping (/pricing)'
                        : 'Consultation Form (/contact)'}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Scope / Focus
                    </span>
                    <span className="text-xs font-bold text-slate-800 truncate block mt-0.5">
                      {selectedMessage.scope || 'Custom Digital Delivery'}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Budget Allocation
                    </span>
                    <span className="text-xs font-bold text-emerald-600 block mt-0.5">
                      {selectedMessage.budget || 'Custom / Undisclosed'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message Body Content */}
              <div className="p-6 flex-1 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Client Inquiry & Message Content
                  </h3>
                  <button
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/90 text-sm text-slate-800 font-medium whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pt-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Submitted on {formatDate(selectedMessage.created_at)}</span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Pulse41 Inquiry: Next Steps&body=Hi ${selectedMessage.name},%0D%0A%0D%0AThank you for reaching out to Pulse41 regarding your inquiry.`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                  </a>

                  <a
                    href="/admin/leads"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-slate-500" />
                    <span>Open in Leads CRM</span>
                  </a>
                </div>

                <span className="text-[11px] text-slate-400 font-mono">
                  ID: {selectedMessage.id.slice(0, 8)}
                </span>
              </div>
            </div>
          ) : (
            <div className="py-24 text-center text-slate-400 p-8 my-auto">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-700">No message selected</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Select an inquiry from the list on the left to read full client requirements and take action.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
