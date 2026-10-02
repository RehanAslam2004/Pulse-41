'use client'

import React, { useState } from 'react'
import {
  UserCheck,
  Search,
  ExternalLink,
  Mail,
  Phone,
  FileText,
  ChevronRight,
  X,
  Linkedin,
  Globe,
  Briefcase,
} from 'lucide-react'

interface Application {
  id: string
  name: string
  job_title: string
  email: string
  phone: string | null
  linkedin_url: string | null
  portfolio_url: string | null
  resume_url: string
  cover_letter: string | null
  status: string
  created_at: string
}

export function ApplicationsTrackerClient({
  initialApplications,
}: {
  initialApplications: Application[]
}) {
  const [applications, setApplications] = useState<Application[]>(initialApplications)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedApp, setSelectedApp] = useState<Application | null>(null)

  const filtered = applications.filter((a) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      a.name.toLowerCase().includes(q) ||
      a.email.toLowerCase().includes(q) ||
      a.job_title.toLowerCase().includes(q)
    )
  })

  const handleStatusChange = async (id: string, newStatus: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    )
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status: newStatus })
    }

    try {
      await fetch('/api/admin/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })
    } catch (err) {
      console.error('Failed to update application status:', err)
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Candidate Applications
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Review candidate resumes, portfolio links, and recruitment pipeline stages.
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
            placeholder="Search applicants by name, role, email..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900"
          />
        </div>
        <span className="text-xs text-slate-500 font-semibold">{filtered.length} Applicants</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Position Applied For</th>
                <th className="py-3 px-4">Resume / CV</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Applied</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No candidate applications submitted yet
                  </td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr
                    key={a.id}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                    onClick={() => setSelectedApp(a)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {a.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{a.name}</p>
                          <p className="text-[11px] text-slate-500">{a.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {a.job_title}
                    </td>

                    <td
                      className="py-3.5 px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <a
                        href={a.resume_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-blue-700 font-semibold text-[11px] transition-colors border border-slate-200"
                      >
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        <span>View PDF</span>
                      </a>
                    </td>

                    <td
                      className="py-3.5 px-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={a.status}
                        onChange={(e) => handleStatusChange(a.id, e.target.value)}
                        className="text-[11px] font-bold px-2 py-1 rounded-lg border bg-white border-slate-200 focus:outline-none cursor-pointer"
                      >
                        <option value="new">New</option>
                        <option value="reviewing">Reviewing</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interview">Interview</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                      {new Date(a.created_at).toLocaleDateString()}
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

      {/* Drawer */}
      {selectedApp && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs"
          onClick={() => setSelectedApp(null)}
        >
          <div
            className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-150 p-6 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">{selectedApp.name}</h2>
                  <p className="text-xs text-slate-500">Applicant for {selectedApp.job_title}</p>
                </div>
                <button
                  onClick={() => setSelectedApp(null)}
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
                      href={`mailto:${selectedApp.email}`}
                      className="block font-semibold text-blue-600 hover:underline mt-0.5"
                    >
                      {selectedApp.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Phone</span>
                    <p className="font-semibold text-slate-800 mt-0.5">{selectedApp.phone || '—'}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
                    <p className="font-semibold text-blue-600 mt-0.5">{selectedApp.status.toUpperCase()}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Submitted</span>
                    <p className="font-semibold text-slate-800 mt-0.5">
                      {new Date(selectedApp.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Profiles & Links */}
                <div className="flex flex-wrap gap-2">
                  <a
                    href={selectedApp.resume_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white font-semibold shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Open Resume PDF</span>
                  </a>

                  {selectedApp.linkedin_url && (
                    <a
                      href={selectedApp.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-semibold border border-slate-200"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                      <span>LinkedIn</span>
                    </a>
                  )}

                  {selectedApp.portfolio_url && (
                    <a
                      href={selectedApp.portfolio_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-semibold border border-slate-200"
                    >
                      <Globe className="w-3.5 h-3.5 text-slate-600" />
                      <span>Portfolio</span>
                    </a>
                  )}
                </div>

                {/* Cover Letter */}
                {selectedApp.cover_letter && (
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1.5">Candidate Cover Message</h3>
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed whitespace-pre-wrap">
                      {selectedApp.cover_letter}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <a
                href={`mailto:${selectedApp.email}?subject=Pulse41 Interview Scheduling`}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
              >
                Schedule Interview
              </a>
              <button
                onClick={() => setSelectedApp(null)}
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
