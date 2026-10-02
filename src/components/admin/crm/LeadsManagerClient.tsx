'use client'

import React, { useState, useEffect } from 'react'
import {
  Users,
  Search,
  Filter,
  Download,
  Building2,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  ChevronRight,
  X,
  AlertCircle,
  Briefcase,
  UserPlus,
  MessageSquare,
} from 'lucide-react'

interface ContactSubmission {
  id: string
  name: string
  email: string
  company: string | null
  project_type: string | null
  budget: string | null
  message: string
  status: string
  created_at: string
}

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

interface LeadsManagerProps {
  initialContacts: ContactSubmission[]
  initialQuotes: QuoteRequest[]
}

export interface UnifiedLead {
  id: string
  type: 'contact' | 'quote'
  name: string
  email: string
  company: string | null
  scope: string | null
  budget: string | null
  message: string | null
  status: string
  created_at: string
}

type TabKey = 'all' | 'new' | 'reviewing' | 'contacted' | 'qualified' | 'closed'

export function LeadsManagerClient({
  initialContacts,
  initialQuotes,
}: LeadsManagerProps) {
  const [contacts, setContacts] = useState<ContactSubmission[]>(initialContacts)
  const [quotes, setQuotes] = useState<QuoteRequest[]>(initialQuotes)
  const [activeTab, setActiveTab] = useState<TabKey>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLead, setSelectedLead] = useState<UnifiedLead | null>(null)

  // Promotion Modal State
  const [promoteModalOpen, setPromoteModalOpen] = useState(false)
  const [promoteCompany, setPromoteCompany] = useState('')
  const [promoteName, setPromoteName] = useState('')
  const [promoteEmail, setPromoteEmail] = useState('')
  const [promoteIndustry, setPromoteIndustry] = useState('Technology & Growth')
  const [promoteJobTitle, setPromoteJobTitle] = useState('Primary Contact')
  const [promoting, setPromoting] = useState(false)
  const [promoteSuccess, setPromoteSuccess] = useState<string | null>(null)
  const [promoteError, setPromoteError] = useState<string | null>(null)

  // Manual Add Lead Modal State
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [addName, setAddName] = useState('')
  const [addEmail, setAddEmail] = useState('')
  const [addCompany, setAddCompany] = useState('')
  const [addProjectType, setAddProjectType] = useState('Applied AI & Intelligent Automation')
  const [addBudget, setAddBudget] = useState('$50k - $100k')
  const [addStatus, setAddStatus] = useState('new')
  const [addMessage, setAddMessage] = useState('')
  const [adding, setAdding] = useState(false)
  const [addError, setAddError] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('action') === 'new') {
        setAddModalOpen(true)
      }
    }
  }, [])

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault()
    setAdding(true)
    setAddError(null)

    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          name: addName,
          email: addEmail,
          company: addCompany || null,
          project_type: addProjectType,
          budget: addBudget,
          status: addStatus,
          message: addMessage || 'Manual lead entry from admin control.',
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create lead')

      if (data.data) {
        setContacts((prev) => [data.data, ...prev])
      }

      setAddModalOpen(false)
      setAddName('')
      setAddEmail('')
      setAddCompany('')
      setAddMessage('')
    } catch (err: any) {
      setAddError(err.message)
    } finally {
      setAdding(false)
    }
  }

  // Combined unified lead list
  const unifiedLeads = [
    ...contacts.map((c) => ({
      id: c.id,
      type: 'contact' as const,
      name: c.name,
      email: c.email,
      company: c.company,
      scope: c.project_type || 'General Inquiry',
      budget: c.budget || 'Custom',
      message: c.message,
      status: c.status,
      created_at: c.created_at,
    })),
    ...quotes.map((q) => ({
      id: q.id,
      type: 'quote' as const,
      name: q.name,
      email: q.email,
      company: q.company,
      scope: `${q.tier || 'Custom'} (${q.project_scope || 'Calculator'})`,
      budget: q.budget || 'Scope Estimate',
      message: q.message,
      status: q.status,
      created_at: q.created_at,
    })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  // Filtered Leads
  const filteredLeads = unifiedLeads.filter((l) => {
    if (activeTab !== 'all' && l.status !== activeTab) return false
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.company && l.company.toLowerCase().includes(q)) ||
      (l.scope && l.scope.toLowerCase().includes(q))
    )
  })

  // Update Status handler
  const handleStatusChange = async (id: string, type: 'contact' | 'quote', newStatus: string) => {
    try {
      // Optimistic update
      if (type === 'contact') {
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
        )
      } else {
        setQuotes((prev) =>
          prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
        )
      }

      if (selectedLead && selectedLead.id === id) {
        setSelectedLead({ ...selectedLead, status: newStatus })
      }

      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type, status: newStatus }),
      })
    } catch (err) {
      console.error('Failed to update status:', err)
    }
  }

  // Open Promote Modal
  const openPromoteModal = (lead: UnifiedLead) => {
    setSelectedLead(lead)
    setPromoteCompany(lead.company || `${lead.name} Account`)
    setPromoteName(lead.name)
    setPromoteEmail(lead.email)
    setPromoteIndustry('Technology & Enterprise')
    setPromoteJobTitle('Executive Lead')
    setPromoteError(null)
    setPromoteSuccess(null)
    setPromoteModalOpen(true)
  }

  // Execute Promotion
  const handlePromoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedLead) return
    setPromoting(true)
    setPromoteError(null)

    try {
      const res = await fetch('/api/admin/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: selectedLead.id,
          type: selectedLead.type,
          companyName: promoteCompany,
          contactName: promoteName,
          email: promoteEmail,
          industry: promoteIndustry,
          jobTitle: promoteJobTitle,
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to promote lead.')

      setPromoteSuccess(data.message)
      handleStatusChange(selectedLead.id, selectedLead.type, 'qualified')

      setTimeout(() => {
        setPromoteModalOpen(false)
        setPromoteSuccess(null)
      }, 1500)
    } catch (err: any) {
      setPromoteError(err.message)
    } finally {
      setPromoting(false)
    }
  }

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Company', 'Type', 'Scope', 'Budget', 'Status', 'Date']
    const rows = filteredLeads.map((l) => [
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.company || ''}"`,
      `"${l.type}"`,
      `"${l.scope || ''}"`,
      `"${l.budget || ''}"`,
      `"${l.status}"`,
      `"${new Date(l.created_at).toISOString()}"`,
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `pulse41_leads_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-5">
      {/* ── Page Header ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Leads & Inquiries CRM
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage incoming contact submissions, interactive quote estimators, and enterprise opportunities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white shadow-xs transition-colors cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Lead</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* ── Toolbar: Search & Saved Views ──────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Saved Views Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {(
            [
              { key: 'all', label: 'All Leads', count: unifiedLeads.length },
              {
                key: 'new',
                label: 'New',
                count: unifiedLeads.filter((l) => l.status === 'new').length,
              },
              {
                key: 'reviewing',
                label: 'Reviewing',
                count: unifiedLeads.filter((l) => l.status === 'reviewing').length,
              },
              {
                key: 'contacted',
                label: 'Contacted',
                count: unifiedLeads.filter((l) => l.status === 'contacted').length,
              },
              {
                key: 'qualified',
                label: 'Qualified',
                count: unifiedLeads.filter((l) => l.status === 'qualified').length,
              },
              {
                key: 'closed',
                label: 'Closed',
                count: unifiedLeads.filter((l) => l.status === 'closed').length,
              },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                activeTab === t.key
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{t.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === t.key
                    ? 'bg-blue-700/80 text-white'
                    : 'bg-slate-200/70 text-slate-600'
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by name, company, email..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 placeholder-slate-400"
          />
        </div>
      </div>

      {/* ── Main Production Data Table ─────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Lead / Client</th>
                <th className="py-3 px-4">Organization</th>
                <th className="py-3 px-4">Type / Scope</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No leads matching your current criteria
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    onClick={() => setSelectedLead(lead)}
                  >
                    {/* Lead Name & Email */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {lead.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate">{lead.name}</p>
                          <p className="text-[11px] text-slate-500 truncate">{lead.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {lead.company || <span className="text-slate-400 italic">Direct Client</span>}
                    </td>

                    {/* Type & Scope */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            lead.type === 'quote'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-emerald-100 text-emerald-700'
                          }`}
                        >
                          {lead.type === 'quote' ? 'Quote' : 'Inquiry'}
                        </span>
                        <span className="text-slate-600 truncate max-w-[160px]">{lead.scope}</span>
                      </div>
                    </td>

                    {/* Budget */}
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      {lead.budget}
                    </td>

                    {/* Status Dropdown */}
                    <td
                      className="py-3.5 px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead.id, lead.type, e.target.value)
                        }
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          lead.status === 'new'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : lead.status === 'reviewing'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : lead.status === 'contacted'
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            : lead.status === 'qualified'
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

                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td
                      className="py-3.5 px-4 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        {lead.message && (
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold border border-blue-200 flex items-center gap-1 transition-colors cursor-pointer"
                            title="Read incoming message"
                          >
                            <MessageSquare className="w-3 h-3 text-blue-600" />
                            <span className="hidden sm:inline">Message</span>
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedLead(lead)
                            openPromoteModal(lead)
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-[11px] font-semibold border border-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
                          title="Promote to Organization & Contact Account"
                        >
                          <Building2 className="w-3 h-3 text-blue-600" />
                          <span className="hidden sm:inline">Promote</span>
                        </button>
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
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

        {/* Table Footer */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filteredLeads.length} of {unifiedLeads.length} entries</span>
          <span className="font-semibold text-slate-700">Pulse41 Control · CRM Ledger</span>
        </div>
      </div>

      {/* ── Slide-Over Lead Detail Drawer ──────────────────────────── */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div>
              <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/60">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900">{selectedLead.name}</h2>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        selectedLead.status === 'new'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {selectedLead.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedLead.company || 'Direct Client'} · Received{' '}
                    {new Date(selectedLead.created_at).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="p-5 space-y-5 text-xs">
                {/* Contact Attributes */}
                <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Email</span>
                    <a
                      href={`mailto:${selectedLead.email}`}
                      className="block font-semibold text-blue-600 hover:underline mt-0.5"
                    >
                      {selectedLead.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Company</span>
                    <p className="font-semibold text-slate-900 mt-0.5">
                      {selectedLead.company || 'Not Specified'}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Project Scope</span>
                    <p className="font-semibold text-slate-900 mt-0.5">{selectedLead.scope}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Budget</span>
                    <p className="font-semibold text-emerald-600 mt-0.5">{selectedLead.budget}</p>
                  </div>
                </div>

                {/* Inquiry / Scope Details */}
                <div>
                  <h3 className="font-bold text-slate-900 mb-1.5">Submitted Scope Requirements</h3>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {selectedLead.message || 'No additional custom scope text provided.'}
                  </div>
                </div>

                {/* Promote CTA Banner */}
                <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-blue-950">Promote to Account</p>
                    <p className="text-[11px] text-blue-700 mt-0.5">
                      Link this lead to a formal Organization and Contact record.
                    </p>
                  </div>
                  <button
                    onClick={() => openPromoteModal(selectedLead)}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 flex-shrink-0"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Promote</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <a
                href={`mailto:${selectedLead.email}?subject=Pulse41 Executive Follow-up`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:underline"
              >
                <Mail className="w-4 h-4" />
                <span>Email Client</span>
              </a>

              <div className="flex items-center gap-2">
                <select
                  value={selectedLead.status}
                  onChange={(e) =>
                    handleStatusChange(selectedLead.id, selectedLead.type, e.target.value)
                  }
                  className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-white"
                >
                  <option value="new">Status: New</option>
                  <option value="reviewing">Status: Reviewing</option>
                  <option value="contacted">Status: Contacted</option>
                  <option value="qualified">Status: Qualified</option>
                  <option value="closed">Status: Closed</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Promote Modal ──────────────────────────────────────────── */}
      {promoteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs"
          onClick={() => setPromoteModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in zoom-in-95 duration-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm">
                  Promote Lead to Account
                </h3>
              </div>
              <button
                onClick={() => setPromoteModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {promoteSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{promoteSuccess}</span>
              </div>
            )}

            {promoteError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{promoteError}</span>
              </div>
            )}

            <form onSubmit={handlePromoteSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Organization / Company Name
                </label>
                <input
                  type="text"
                  required
                  value={promoteCompany}
                  onChange={(e) => setPromoteCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Name</label>
                  <input
                    type="text"
                    required
                    value={promoteName}
                    onChange={(e) => setPromoteName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Job Title</label>
                  <input
                    type="text"
                    value={promoteJobTitle}
                    onChange={(e) => setPromoteJobTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Corporate Email</label>
                <input
                  type="email"
                  required
                  value={promoteEmail}
                  onChange={(e) => setPromoteEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Industry Vertical</label>
                <select
                  value={promoteIndustry}
                  onChange={(e) => setPromoteIndustry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
                >
                  <option value="Technology & Artificial Intelligence">Technology & Artificial Intelligence</option>
                  <option value="Digital Products & Software Engineering">Digital Products & Software Engineering</option>
                  <option value="Banking & Financial Services">Banking & Financial Services</option>
                  <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                  <option value="Retail & E-commerce">Retail & E-commerce</option>
                  <option value="General Consulting">General Consulting</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPromoteModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={promoting}
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-xs"
                >
                  {promoting ? 'Promoting...' : 'Create Account & Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Add Lead Modal Dialog ─────────────────────────────────────── */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Add New Lead</h3>
                  <p className="text-xs text-slate-500">Record a new prospective client inquiry directly into CRM.</p>
                </div>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {addError && (
              <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{addError}</span>
              </div>
            )}

            <form onSubmit={handleCreateLead} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Contact Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marc Benioff"
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Corporate Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. marc@salesforce.com"
                    value={addEmail}
                    onChange={(e) => setAddEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Company / Organization Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Salesforce Global Inc."
                  value={addCompany}
                  onChange={(e) => setAddCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Project Scope</label>
                  <select
                    value={addProjectType}
                    onChange={(e) => setAddProjectType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white text-slate-900 font-medium"
                  >
                    <option value="Applied AI & Intelligent Automation">Applied AI & Intelligent Automation</option>
                    <option value="Custom Software & Web Engineering">Custom Software & Web Engineering</option>
                    <option value="Enterprise SaaS / Platform Architecture">Enterprise SaaS / Platform Architecture</option>
                    <option value="Mobile Application Development">Mobile Application Development</option>
                    <option value="Cloud, DevOps & Infrastructure">Cloud, DevOps & Infrastructure</option>
                    <option value="Cybersecurity & Trust Assessment">Cybersecurity & Trust Assessment</option>
                    <option value="Digital Transformation Consulting">Digital Transformation Consulting</option>
                    <option value="Other Scope">Other Scope</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Budget Tier</label>
                  <select
                    value={addBudget}
                    onChange={(e) => setAddBudget(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white text-slate-900 font-medium"
                  >
                    <option value="Under $25k">Under $25k</option>
                    <option value="$25k - $50k">$25k - $50k</option>
                    <option value="$50k - $100k">$50k - $100k</option>
                    <option value="$100k+ Enterprise">$100k+ Enterprise</option>
                    <option value="Custom / Undisclosed">Custom / Undisclosed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Initial Stage / Status</label>
                <select
                  value={addStatus}
                  onChange={(e) => setAddStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white text-slate-900 font-medium"
                >
                  <option value="new">1. New (Uncontacted)</option>
                  <option value="reviewing">2. Reviewing Scope</option>
                  <option value="contacted">3. Initial Discovery Call Held</option>
                  <option value="qualified">4. Qualified Enterprise Lead</option>
                  <option value="closed">5. Closed</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Inquiry Notes / Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="Notes from consultation call, requirements summary, or specific deliverables..."
                  value={addMessage}
                  onChange={(e) => setAddMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding}
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{adding ? 'Creating Lead...' : 'Create Lead'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
