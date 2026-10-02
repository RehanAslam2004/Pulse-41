'use client'

import React, { useState, useMemo } from 'react'
import {
  Users,
  MessageSquare,
  FileSpreadsheet,
  Search,
  Filter,
  Eye,
  Trash2,
  CheckCircle,
  Clock,
  Mail,
  Building,
  DollarSign,
  Calendar,
  X,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  Briefcase,
  Download,
  Phone,
  Globe,
  FileText,
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

interface NewsletterSubscription {
  id: string
  email: string
  source: string
  is_active: boolean
  subscribed_at: string
  unsubscribed_at: string | null
}

interface JobApplication {
  id: string
  job_id: string | null
  job_title: string
  name: string
  email: string
  phone: string | null
  linkedin_url: string | null
  portfolio_url: string | null
  resume_url: string
  cover_letter: string | null
  status: string
  created_at: string
  updated_at: string
}

interface LeadsCRMClientProps {
  initialContacts: ContactSubmission[]
  initialQuotes: QuoteRequest[]
  initialNewsletters: NewsletterSubscription[]
  initialApplications?: JobApplication[]
}

type TabType = 'contacts' | 'quotes' | 'newsletters' | 'applications'

export function LeadsCRMClient({
  initialContacts,
  initialQuotes,
  initialNewsletters,
  initialApplications = [],
}: LeadsCRMClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>('contacts')
  const [contacts, setContacts] = useState(initialContacts)
  const [quotes, setQuotes] = useState(initialQuotes)
  const [newsletters, setNewsletters] = useState(initialNewsletters)
  const [applications, setApplications] = useState<JobApplication[]>(initialApplications)

  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Selected lead for modal inspection
  const [selectedLead, setSelectedLead] = useState<{
    type: 'contact' | 'quote' | 'newsletter' | 'application'
    data: any
  } | null>(null)

  const refreshData = async () => {
    setIsRefreshing(true)
    try {
      const res = await fetch('/api/admin/leads')
      const json = await res.json()
      if (json.success && json.data) {
        setContacts(json.data.contacts || [])
        setQuotes(json.data.quotes || [])
        setNewsletters(json.data.newsletters || [])
        if (json.data.applications) {
          setApplications(json.data.applications || [])
        }
      }
    } catch (err) {
      console.error('Failed to refresh leads:', err)
    } finally {
      setIsRefreshing(false)
    }
  }

  // Handle status update
  const handleUpdateStatus = async (
    type: 'contacts' | 'quotes' | 'newsletters' | 'applications',
    id: string,
    newStatus: string | boolean
  ) => {
    try {
      const body =
        type === 'newsletters'
          ? { is_active: newStatus }
          : { status: newStatus }

      const res = await fetch(`/api/admin/leads/${type}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) throw new Error('Status update failed')

      if (type === 'contacts') {
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status: newStatus as string } : c))
        )
      } else if (type === 'quotes') {
        setQuotes((prev) =>
          prev.map((q) => (q.id === id ? { ...q, status: newStatus as string } : q))
        )
      } else if (type === 'newsletters') {
        setNewsletters((prev) =>
          prev.map((n) => (n.id === id ? { ...n, is_active: Boolean(newStatus) } : n))
        )
      } else if (type === 'applications') {
        setApplications((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: newStatus as string } : a))
        )
      }

      if (selectedLead && selectedLead.data.id === id) {
        setSelectedLead({
          ...selectedLead,
          data: {
            ...selectedLead.data,
            ...(type === 'newsletters' ? { is_active: newStatus } : { status: newStatus }),
          },
        })
      }
    } catch (err) {
      console.error('Status change error:', err)
      alert('Could not update status. Please try again.')
    }
  }

  // Handle delete lead
  const handleDeleteLead = async (
    type: 'contacts' | 'quotes' | 'newsletters' | 'applications',
    id: string
  ) => {
    if (!confirm('Are you sure you want to permanently delete this record?')) return

    try {
      const res = await fetch(`/api/admin/leads/${type}/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Delete failed')

      if (type === 'contacts') {
        setContacts((prev) => prev.filter((c) => c.id !== id))
      } else if (type === 'quotes') {
        setQuotes((prev) => prev.filter((q) => q.id !== id))
      } else if (type === 'newsletters') {
        setNewsletters((prev) => prev.filter((n) => n.id !== id))
      } else if (type === 'applications') {
        setApplications((prev) => prev.filter((a) => a.id !== id))
      }

      if (selectedLead && selectedLead.data.id === id) {
        setSelectedLead(null)
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert('Failed to delete record.')
    }
  }

  // Filtered lists
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.company && c.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.project_type && c.project_type.toLowerCase().includes(searchQuery.toLowerCase())) ||
        c.message.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus =
        statusFilter === 'all' ? true : c.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [contacts, searchQuery, statusFilter])

  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      const matchesSearch =
        q.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.company && q.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (q.tier && q.tier.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (q.message && q.message.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesStatus =
        statusFilter === 'all' ? true : q.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [quotes, searchQuery, statusFilter])

  const filteredNewsletters = useMemo(() => {
    return newsletters.filter((n) => {
      const matchesSearch =
        n.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.source.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesStatus =
        statusFilter === 'all'
          ? true
          : statusFilter === 'active'
          ? n.is_active
          : !n.is_active

      return matchesSearch && matchesStatus
    })
  }, [newsletters, searchQuery, statusFilter])

  const filteredApplications = useMemo(() => {
    return applications.filter((a) => {
      const matchesSearch =
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.phone && a.phone.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (a.cover_letter && a.cover_letter.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesStatus =
        statusFilter === 'all' ? true : a.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [applications, searchQuery, statusFilter])

  return (
    <div className="space-y-6">
      {/* Top Title & Actions Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Inquiries & Leads CRM</h2>
          <p className="text-xs text-slate-400 mt-1">
            Track, qualify, and manage client submissions from all contact and engagement channels.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={refreshData}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <a
            href={`/api/admin/leads/export?type=${activeTab}`}
            download
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-6">
        <button
          onClick={() => {
            setActiveTab('contacts')
            setStatusFilter('all')
          }}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 relative transition-colors ${
            activeTab === 'contacts'
              ? 'text-blue-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Contact Submissions</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            {contacts.length}
          </span>
          {activeTab === 'contacts' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('quotes')
            setStatusFilter('all')
          }}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 relative transition-colors ${
            activeTab === 'quotes'
              ? 'text-purple-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Quote Requests</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            {quotes.length}
          </span>
          {activeTab === 'quotes' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('newsletters')
            setStatusFilter('all')
          }}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 relative transition-colors ${
            activeTab === 'newsletters'
              ? 'text-cyan-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Newsletter Subscribers</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            {newsletters.length}
          </span>
          {activeTab === 'newsletters' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab('applications')
            setStatusFilter('all')
          }}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 relative transition-colors ${
            activeTab === 'applications'
              ? 'text-emerald-400'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Job Applications</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            {applications.length}
          </span>
          {activeTab === 'applications' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
          )}
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#0F172A] border border-slate-800/80 p-3 rounded-2xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, email, company, scope, role..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {activeTab === 'applications' ? (
            <>
              {['all', 'new', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`text-xs capitalize px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap ${
                    statusFilter === status
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {status}
                </button>
              ))}
            </>
          ) : activeTab === 'newsletters' ? (
            <>
              {['all', 'active', 'unsubscribed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`text-xs capitalize px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {status}
                </button>
              ))}
            </>
          ) : (
            <>
              {['all', 'new', 'contacted', 'converted', 'archived'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`text-xs capitalize px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    statusFilter === status
                      ? activeTab === 'quotes'
                        ? 'bg-purple-600 text-white'
                        : 'bg-blue-600 text-white'
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {status}
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Tables based on Active Tab */}
      <div className="bg-[#0F172A] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        {/* Tab 1: Contact Submissions */}
        {activeTab === 'contacts' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold">
                  <th className="py-3 px-4">Contact / Lead</th>
                  <th className="py-3 px-4">Project Scope</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No contact submissions match the selected criteria.
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-900/40 transition-colors group"
                    >
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-200">{c.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{c.email}</div>
                        {c.company && (
                          <div className="text-[10px] text-blue-400 flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3" />
                            <span>{c.company}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                          {c.project_type || 'General'}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-emerald-400">
                        {c.budget || 'Custom'}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={c.status}
                          onChange={(e) =>
                            handleUpdateStatus('contacts', c.id, e.target.value)
                          }
                          className={`text-[10px] font-semibold px-2 py-1 rounded-full border cursor-pointer focus:outline-none ${
                            c.status === 'new'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : c.status === 'contacted'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                              : c.status === 'converted'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          <option value="new" className="bg-[#0F172A] text-amber-400">NEW</option>
                          <option value="contacted" className="bg-[#0F172A] text-blue-400">CONTACTED</option>
                          <option value="converted" className="bg-[#0F172A] text-emerald-400">CONVERTED</option>
                          <option value="archived" className="bg-[#0F172A] text-slate-400">ARCHIVED</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                        {new Date(c.created_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() =>
                              setSelectedLead({ type: 'contact', data: c })
                            }
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                            title="View Full Dossier"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteLead('contacts', c.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Custom Quote Requests */}
        {activeTab === 'quotes' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold">
                  <th className="py-3 px-4">Client / Company</th>
                  <th className="py-3 px-4">Tier & Scope</th>
                  <th className="py-3 px-4">Budget</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredQuotes.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No custom quote requests match the selected criteria.
                    </td>
                  </tr>
                ) : (
                  filteredQuotes.map((q) => (
                    <tr
                      key={q.id}
                      className="hover:bg-slate-900/40 transition-colors group"
                    >
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-200">{q.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{q.email}</div>
                        {q.company && (
                          <div className="text-[10px] text-purple-400 flex items-center gap-1 mt-0.5">
                            <Building className="w-3 h-3" />
                            <span>{q.company}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-medium">
                          {q.tier || 'Enterprise'}
                        </span>
                        <div className="text-[11px] text-slate-400 mt-1 truncate max-w-xs">
                          {q.project_scope || 'Custom Scope'}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-emerald-400">
                        {q.budget || 'Custom'}
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={q.status}
                          onChange={(e) =>
                            handleUpdateStatus('quotes', q.id, e.target.value)
                          }
                          className={`text-[10px] font-semibold px-2 py-1 rounded-full border cursor-pointer focus:outline-none ${
                            q.status === 'new'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : q.status === 'contacted'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                              : q.status === 'converted'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          <option value="new" className="bg-[#0F172A] text-amber-400">NEW</option>
                          <option value="contacted" className="bg-[#0F172A] text-blue-400">CONTACTED</option>
                          <option value="converted" className="bg-[#0F172A] text-emerald-400">CONVERTED</option>
                          <option value="archived" className="bg-[#0F172A] text-slate-400">ARCHIVED</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                        {new Date(q.created_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() =>
                              setSelectedLead({ type: 'quote', data: q })
                            }
                            className="p-1.5 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-purple-500/10 transition-colors"
                            title="View Quote Dossier"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteLead('quotes', q.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 3: Newsletter Subscribers */}
        {activeTab === 'newsletters' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold">
                  <th className="py-3 px-4">Subscriber Email</th>
                  <th className="py-3 px-4">Subscription Source</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Subscribed Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredNewsletters.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      No subscribers match the selected criteria.
                    </td>
                  </tr>
                ) : (
                  filteredNewsletters.map((n) => (
                    <tr
                      key={n.id}
                      className="hover:bg-slate-900/40 transition-colors group"
                    >
                      <td className="py-3 px-4 font-mono font-medium text-slate-200">
                        {n.email}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-medium">
                          {n.source}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${
                            n.is_active
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          }`}
                        >
                          {n.is_active ? 'ACTIVE' : 'UNSUBSCRIBED'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                        {new Date(n.subscribed_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              handleUpdateStatus('newsletters', n.id, !n.is_active)
                            }
                            className="text-[10px] font-medium text-slate-400 hover:text-white px-2 py-1 bg-slate-800 rounded border border-slate-700"
                          >
                            {n.is_active ? 'Deactivate' : 'Reactivate'}
                          </button>
                          <button
                            onClick={() => handleDeleteLead('newsletters', n.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete Subscriber"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        {/* Tab 4: Candidate Job Applications */}
        {activeTab === 'applications' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold">
                  <th className="py-3 px-4">Candidate Profile</th>
                  <th className="py-3 px-4">Target Role</th>
                  <th className="py-3 px-4">Resume Asset</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No candidate applications match the selected criteria.
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((a) => (
                    <tr
                      key={a.id}
                      className="hover:bg-slate-900/40 transition-colors group"
                    >
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-200">{a.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{a.email}</div>
                        {a.phone && (
                          <div className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5 font-mono">
                            <Phone className="w-3 h-3 text-slate-400" />
                            <span>{a.phone}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium inline-block">
                          {a.job_title}
                        </span>
                        <div className="flex items-center gap-2 mt-1.5 text-[10px]">
                          {a.linkedin_url && (
                            <a
                              href={a.linkedin_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 flex items-center gap-0.5"
                            >
                              <span>LinkedIn</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                          {a.portfolio_url && (
                            <a
                              href={a.portfolio_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-400 hover:text-purple-300 flex items-center gap-0.5"
                            >
                              <span>Portfolio</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <a
                          href={a.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 font-medium transition-colors"
                        >
                          <Download className="w-3 h-3 text-emerald-400" />
                          <span>PDF / Resume</span>
                        </a>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={a.status}
                          onChange={(e) =>
                            handleUpdateStatus('applications', a.id, e.target.value)
                          }
                          className={`text-[10px] font-semibold px-2 py-1 rounded-full border cursor-pointer focus:outline-none ${
                            a.status === 'new'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : a.status === 'reviewing'
                              ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                              : a.status === 'shortlisted'
                              ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                              : a.status === 'interviewed'
                              ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                              : a.status === 'offered'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                          }`}
                        >
                          <option value="new" className="bg-[#0F172A] text-amber-400">NEW</option>
                          <option value="reviewing" className="bg-[#0F172A] text-blue-400">REVIEWING</option>
                          <option value="shortlisted" className="bg-[#0F172A] text-purple-400">SHORTLISTED</option>
                          <option value="interviewed" className="bg-[#0F172A] text-indigo-400">INTERVIEWED</option>
                          <option value="offered" className="bg-[#0F172A] text-emerald-400">OFFERED</option>
                          <option value="rejected" className="bg-[#0F172A] text-rose-400">REJECTED</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                        {new Date(a.created_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() =>
                              setSelectedLead({ type: 'application', data: a })
                            }
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                            title="View Candidate Dossier"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteLead('applications', a.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete Candidate Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead / Applicant Dossier Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedLead(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${
                  selectedLead.type === 'application'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : selectedLead.type === 'quote'
                    ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                    : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                }`}
              >
                {selectedLead.type.toUpperCase()} DOSSIER
              </span>
              <span className="text-xs text-slate-500">ID: {selectedLead.data.id}</span>
            </div>

            <h3 className="text-xl font-bold text-white mb-1">
              {selectedLead.type === 'application'
                ? selectedLead.data.name
                : selectedLead.data.name || selectedLead.data.email}
            </h3>

            {selectedLead.type === 'application' ? (
              <p className="text-xs text-emerald-400 mb-6 flex items-center gap-1.5 font-medium">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Target Position: {selectedLead.data.job_title}</span>
              </p>
            ) : selectedLead.data.company ? (
              <p className="text-xs text-slate-400 mb-6 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-blue-400" />
                <span>{selectedLead.data.company}</span>
              </p>
            ) : null}

            {/* Information Grid */}
            {selectedLead.type === 'application' ? (
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-500 block mb-0.5">Candidate Email</span>
                    <a
                      href={`mailto:${selectedLead.data.email}`}
                      className="text-blue-400 hover:underline font-mono"
                    >
                      {selectedLead.data.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">Phone Number</span>
                    {selectedLead.data.phone ? (
                      <a
                        href={`tel:${selectedLead.data.phone}`}
                        className="text-slate-200 hover:underline font-mono"
                      >
                        {selectedLead.data.phone}
                      </a>
                    ) : (
                      <span className="text-slate-500">Not provided</span>
                    )}
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">Date Applied</span>
                    <span className="text-slate-300 font-mono">
                      {new Date(selectedLead.data.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block mb-0.5">Resume File</span>
                    <a
                      href={selectedLead.data.resume_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-emerald-400 font-semibold hover:underline"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Resume</span>
                    </a>
                  </div>
                </div>

                {/* External links */}
                {(selectedLead.data.linkedin_url || selectedLead.data.portfolio_url) && (
                  <div className="flex flex-wrap gap-3 px-1 text-xs">
                    {selectedLead.data.linkedin_url && (
                      <a
                        href={selectedLead.data.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400 hover:text-white hover:bg-blue-600/20 transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>LinkedIn Profile</span>
                      </a>
                    )}
                    {selectedLead.data.portfolio_url && (
                      <a
                        href={selectedLead.data.portfolio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-400 hover:text-white hover:bg-purple-600/20 transition-colors"
                      >
                        <Globe className="w-3 h-3" />
                        <span>Portfolio / GitHub</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs">
                <div>
                  <span className="text-slate-500 block mb-0.5">Email Address</span>
                  <a
                    href={`mailto:${selectedLead.data.email}`}
                    className="text-blue-400 hover:underline font-mono"
                  >
                    {selectedLead.data.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Budget Allocation</span>
                  <span className="text-emerald-400 font-semibold">
                    {selectedLead.data.budget || 'Custom'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">
                    {selectedLead.type === 'quote' ? 'Tier / Platform' : 'Project Type'}
                  </span>
                  <span className="text-slate-200">
                    {selectedLead.data.tier || selectedLead.data.project_type || 'Direct Inquiry'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-0.5">Date Submitted</span>
                  <span className="text-slate-300 font-mono">
                    {new Date(selectedLead.data.created_at).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Message Body / Cover Letter */}
            <div className="mb-6">
              <span className="text-xs font-semibold text-slate-300 block mb-2">
                {selectedLead.type === 'application'
                  ? 'Cover Letter / Candidate Note'
                  : 'Inquiry Message / Scope Details'}
              </span>
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-850 text-xs text-slate-300 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {selectedLead.type === 'application'
                  ? selectedLead.data.cover_letter || 'No cover note submitted with application.'
                  : selectedLead.data.message || 'No additional message text provided.'}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Update Status:</span>
                {selectedLead.type === 'application' ? (
                  <select
                    value={selectedLead.data.status}
                    onChange={(e) =>
                      handleUpdateStatus('applications', selectedLead.data.id, e.target.value)
                    }
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1 focus:outline-none"
                  >
                    <option value="new">New</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="interviewed">Interviewed</option>
                    <option value="offered">Offered</option>
                    <option value="rejected">Rejected</option>
                  </select>
                ) : (
                  <select
                    value={selectedLead.data.status}
                    onChange={(e) =>
                      handleUpdateStatus(
                        selectedLead.type === 'contact' ? 'contacts' : 'quotes',
                        selectedLead.data.id,
                        e.target.value
                      )
                    }
                    className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1 focus:outline-none"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted</option>
                    <option value="archived">Archived</option>
                  </select>
                )}
              </div>

              <a
                href={
                  selectedLead.type === 'application'
                    ? `mailto:${selectedLead.data.email}?subject=Pulse41 Application - ${encodeURIComponent(selectedLead.data.job_title)}`
                    : `mailto:${selectedLead.data.email}?subject=Pulse41 Inbound Follow-up`
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>
                  {selectedLead.type === 'application' ? 'Email Candidate' : 'Compose Direct Email'}
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

