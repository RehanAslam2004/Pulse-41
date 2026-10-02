'use client'

import React, { useState } from 'react'
import {
  History,
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Shield,
  Layers,
  ChevronDown,
  ChevronUp,
  FileCode,
  Tag,
  ArrowRight,
  Code,
} from 'lucide-react'

export interface AuditLog {
  id: string
  admin_email: string
  action: string
  entity_type: string
  entity_id: string | null
  details: any
  ip_address: string | null
  created_at: string
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function AuditLogClient({ initialLogs }: { initialLogs: AuditLog[] }) {
  const [logs] = useState<AuditLog[]>(initialLogs)
  const [searchQuery, setSearchQuery] = useState('')
  const [entityFilter, setEntityFilter] = useState('all')
  const [actionFilter, setActionFilter] = useState('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredLogs = logs.filter((log) => {
    const matchesEntity =
      entityFilter === 'all' || log.entity_type === entityFilter
    const matchesAction =
      actionFilter === 'all' || log.action === actionFilter
    const matchesSearch =
      !searchQuery.trim() ||
      log.admin_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entity_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      JSON.stringify(log.details || {}).toLowerCase().includes(searchQuery.toLowerCase())

    return matchesEntity && matchesAction && matchesSearch
  })

  const handleExportCSV = () => {
    const headers = ['ID', 'Admin', 'Action', 'Entity Type', 'Entity ID', 'Details', 'Timestamp']
    const rows = filteredLogs.map((log) => [
      log.id,
      log.admin_email,
      log.action,
      log.entity_type,
      log.entity_id || '',
      JSON.stringify(log.details || {}).replace(/"/g, '""'),
      log.created_at,
    ])

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.map((f) => `"${f}"`).join(','))].join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `pulse41_audit_log_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200'
      case 'UPDATE':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'DELETE':
        return 'bg-rose-50 text-rose-700 border-rose-200'
      case 'CONVERT_LEAD':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'SETTINGS_UPDATE':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            System Audit Log
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Immutable chronicle of all state mutations, CRM conversions, content publishes, and administrative operations.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-xs transition"
        >
          <Download className="w-4 h-4 text-blue-600" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-4 border border-slate-200 rounded-xl shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search details, admin email or entity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">Entity:</span>
            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">All Entities</option>
              <option value="lead">Lead</option>
              <option value="quote">Quote</option>
              <option value="organization">Organization</option>
              <option value="contact">Contact</option>
              <option value="case_study">Case Study</option>
              <option value="blog_post">Blog Post</option>
              <option value="service">Service</option>
              <option value="job">Job Listing</option>
              <option value="application">Application</option>
              <option value="media">Media Asset</option>
              <option value="system">System / Settings</option>
              <option value="admin_user">Admin User</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500 font-medium">Action:</span>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
            >
              <option value="all">All Actions</option>
              <option value="CREATE">CREATE</option>
              <option value="UPDATE">UPDATE</option>
              <option value="DELETE">DELETE</option>
              <option value="CONVERT_LEAD">CONVERT_LEAD</option>
              <option value="SETTINGS_UPDATE">SETTINGS_UPDATE</option>
            </select>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Timestamp</th>
                <th className="py-3.5 px-4">Operator</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Entity Type</th>
                <th className="py-3.5 px-4">Summary</th>
                <th className="py-3.5 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No activity logs recorded matching current filters.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const isExpanded = expandedId === log.id
                  return (
                    <React.Fragment key={log.id}>
                      <tr
                        className={`hover:bg-slate-50/70 transition cursor-pointer ${
                          isExpanded ? 'bg-slate-50' : ''
                        }`}
                        onClick={() => setExpandedId(isExpanded ? null : log.id)}
                      >
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                          {formatDate(log.created_at)}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                            <span className="font-medium text-slate-900 truncate max-w-xs">
                              {log.admin_email}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getActionBadge(
                              log.action
                            )}`}
                          >
                            {log.action}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-700 capitalize">
                          {log.entity_type.replace('_', ' ')}
                        </td>

                        <td className="py-3.5 px-4 text-slate-600 max-w-sm truncate">
                          {log.details?.name ||
                            log.details?.file_name ||
                            log.details?.title ||
                            log.details?.email ||
                            log.details?.key ||
                            JSON.stringify(log.details).slice(0, 40)}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            type="button"
                            className="text-slate-400 hover:text-slate-700 p-1"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr>
                          <td colSpan={6} className="bg-slate-900 text-slate-100 p-4 border-b border-slate-200">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                                <span>Entity ID: {log.entity_id || 'N/A'}</span>
                                <span>IP: {log.ip_address || 'Internal/Loopback'}</span>
                              </div>
                              <pre className="text-[11px] font-mono bg-slate-950 p-3 rounded-lg overflow-x-auto text-emerald-400 leading-relaxed">
                                {JSON.stringify(log.details, null, 2)}
                              </pre>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
