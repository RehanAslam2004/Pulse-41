'use client'

import React, { useState } from 'react'
import {
  Building2,
  Search,
  Plus,
  Filter,
  ExternalLink,
  Users,
  ChevronRight,
  X,
  CheckCircle2,
  AlertCircle,
  Globe,
  MapPin,
  Tag,
} from 'lucide-react'

interface Organization {
  id: string
  name: string
  industry: string | null
  website: string | null
  country: string | null
  tier: string | null
  status: string
  owner: string | null
  notes: string | null
  created_at: string
  contacts?: { id: string; name: string; email: string; job_title: string | null }[]
}

export function OrganizationsClient({
  initialOrganizations,
}: {
  initialOrganizations: Organization[]
}) {
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations)
  const [searchQuery, setSearchQuery] = useState('')
  const [tierFilter, setTierFilter] = useState('all')
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)

  // Create Modal
  const [modalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const [industry, setIndustry] = useState('Technology & Artificial Intelligence')
  const [website, setWebsite] = useState('')
  const [country, setCountry] = useState('United States')
  const [tier, setTier] = useState('Enterprise')
  const [status, setStatus] = useState('prospect')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const filteredOrgs = organizations.filter((org) => {
    if (tierFilter !== 'all' && org.tier !== tierFilter) return false
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      org.name.toLowerCase().includes(q) ||
      (org.industry && org.industry.toLowerCase().includes(q)) ||
      (org.country && org.country.toLowerCase().includes(q))
    )
  })

  const handleCreateOrg = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/organizations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, industry, website, country, tier, status, notes }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create organization.')

      setOrganizations([data.data, ...organizations])
      setModalOpen(false)
      setName('')
      setWebsite('')
      setNotes('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      setOrganizations((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
      )
      if (selectedOrg && selectedOrg.id === id) {
        setSelectedOrg({ ...selectedOrg, status: newStatus })
      }
      await fetch('/api/admin/organizations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })
    } catch (err) {
      console.error('Update org status error:', err)
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Organizations & Accounts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Enterprise corporate accounts, subsidiaries, and client relationships.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Organization</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search accounts by name or vertical..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Tier:</span>
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 font-semibold text-slate-700 cursor-pointer"
          >
            <option value="all">All Tiers</option>
            <option value="Enterprise">Enterprise</option>
            <option value="Growth">Growth</option>
            <option value="Standard">Standard</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Organization Name</th>
                <th className="py-3 px-4">Industry Vertical</th>
                <th className="py-3 px-4">Region</th>
                <th className="py-3 px-4">Tier</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Contacts</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrgs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No organizations matching your criteria
                  </td>
                </tr>
              ) : (
                filteredOrgs.map((org) => (
                  <tr
                    key={org.id}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    onClick={() => setSelectedOrg(org)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{org.name}</p>
                          {org.website && (
                            <a
                              href={org.website.startsWith('http') ? org.website : `https://${org.website}`}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[10px] text-blue-600 hover:underline flex items-center gap-0.5 mt-0.5"
                            >
                              <span>{org.website.replace('https://', '')}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {org.industry || 'General Industry'}
                    </td>

                    <td className="py-3.5 px-4 text-slate-600">
                      {org.country || 'International'}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                        {org.tier || 'Standard'}
                      </span>
                    </td>

                    <td
                      className="py-3.5 px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={org.status}
                        onChange={(e) => handleStatusChange(org.id, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                          org.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : org.status === 'prospect'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        <option value="prospect">Prospect</option>
                        <option value="active">Active Client</option>
                        <option value="partner">Strategic Partner</option>
                        <option value="churned">Archived</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-slate-600 font-semibold flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{org.contacts?.length || 0}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button className="p-1 text-slate-400 hover:text-slate-700">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Drawer: Organization Details */}
      {selectedOrg && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs"
          onClick={() => setSelectedOrg(null)}
        >
          <div
            className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-150 p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">{selectedOrg.name}</h2>
                    <p className="text-xs text-slate-500">{selectedOrg.industry}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedOrg(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-5 text-xs">
                <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Country</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{selectedOrg.country || 'International'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Account Tier</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{selectedOrg.tier}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
                    <p className="font-semibold text-blue-600 mt-0.5">{selectedOrg.status.toUpperCase()}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Created</span>
                    <p className="font-semibold text-slate-800 mt-0.5">
                      {new Date(selectedOrg.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Linked Contacts ({selectedOrg.contacts?.length || 0})</h3>
                  {selectedOrg.contacts && selectedOrg.contacts.length > 0 ? (
                    <div className="space-y-2">
                      {selectedOrg.contacts.map((c) => (
                        <div key={c.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                          <div>
                            <p className="font-bold text-slate-900">{c.name}</p>
                            <p className="text-[11px] text-slate-500">{c.job_title || 'Contact'} · {c.email}</p>
                          </div>
                          <a
                            href={`mailto:${c.email}`}
                            className="text-xs font-semibold text-blue-600 hover:underline"
                          >
                            Email
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-400 italic">No direct individual contacts linked yet.</p>
                  )}
                </div>

                {selectedOrg.notes && (
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1.5">Internal Account Notes</h3>
                    <p className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                      {selectedOrg.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-slate-400 text-xs">Pulse41 Control · CRM Account</span>
              <button
                onClick={() => setSelectedOrg(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: New Organization */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in zoom-in-95 duration-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">Add New Organization Account</h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateOrg} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Company / Organization Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Acme Corporation"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Industry Vertical</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
                >
                  <option value="Technology & Artificial Intelligence">Technology & Artificial Intelligence</option>
                  <option value="Digital Products & Software Engineering">Digital Products & Software Engineering</option>
                  <option value="Banking & Financial Services">Banking & Financial Services</option>
                  <option value="Healthcare & Life Sciences">Healthcare & Life Sciences</option>
                  <option value="Retail & E-commerce">Retail & E-commerce</option>
                  <option value="Education & Assessment">Education & Assessment</option>
                  <option value="General Consulting">General Consulting</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Country / Region</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tier</label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
                  >
                    <option value="Enterprise">Enterprise</option>
                    <option value="Growth">Growth</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Website URL</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors shadow-xs"
                >
                  {submitting ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
