'use client'

import React, { useState } from 'react'
import {
  KeyRound,
  Shield,
  Check,
  Minus,
  Info,
  Lock,
} from 'lucide-react'

interface RoleDefinition {
  name: string
  tagline: string
  description: string
  badgeColor: string
  permissions: Record<string, 'Full' | 'Read' | 'None'>
}

const ROLES: RoleDefinition[] = [
  {
    name: 'Super Admin',
    tagline: 'Root Control',
    description: 'Full uninhibited access across all workspaces, database records, and system administration.',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    permissions: {
      'Workspace Overview & Search': 'Full',
      'Leads CRM & Inquiries': 'Full',
      'Organizations & Contacts': 'Full',
      'Quote Requests & Calculator': 'Full',
      'Sales Pipeline Stages': 'Full',
      'Content Studio (CMS)': 'Full',
      'Version Rollbacks & Revisions': 'Full',
      'Careers & Job Requisitions': 'Full',
      'Applicant Tracking & Resumes': 'Full',
      'Media Asset Upload & Deletion': 'Full',
      'Admin Users & Invites': 'Full',
      'Audit Trail Logs': 'Full',
      'System Settings & Config': 'Full',
      'System Telemetry & Health': 'Full',
    },
  },
  {
    name: 'Content Manager',
    tagline: 'Publishing & Editorial',
    description: 'Autonomous control over Case Studies, Insights, Services, Solutions, Industries, and Media Assets.',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    permissions: {
      'Workspace Overview & Search': 'Read',
      'Leads CRM & Inquiries': 'None',
      'Organizations & Contacts': 'None',
      'Quote Requests & Calculator': 'None',
      'Sales Pipeline Stages': 'None',
      'Content Studio (CMS)': 'Full',
      'Version Rollbacks & Revisions': 'Full',
      'Careers & Job Requisitions': 'None',
      'Applicant Tracking & Resumes': 'None',
      'Media Asset Upload & Deletion': 'Full',
      'Admin Users & Invites': 'None',
      'Audit Trail Logs': 'Read',
      'System Settings & Config': 'Read',
      'System Telemetry & Health': 'Read',
    },
  },
  {
    name: 'Lead Manager',
    tagline: 'Sales & Growth',
    description: 'Management of inbound leads, client accounts, organizations, quote calculators, and CRM pipeline.',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    permissions: {
      'Workspace Overview & Search': 'Read',
      'Leads CRM & Inquiries': 'Full',
      'Organizations & Contacts': 'Full',
      'Quote Requests & Calculator': 'Full',
      'Sales Pipeline Stages': 'Full',
      'Content Studio (CMS)': 'Read',
      'Version Rollbacks & Revisions': 'None',
      'Careers & Job Requisitions': 'None',
      'Applicant Tracking & Resumes': 'None',
      'Media Asset Upload & Deletion': 'Read',
      'Admin Users & Invites': 'None',
      'Audit Trail Logs': 'Read',
      'System Settings & Config': 'None',
      'System Telemetry & Health': 'None',
    },
  },
  {
    name: 'Recruiter',
    tagline: 'Talent Acquisition',
    description: 'Dedicated management of job postings, candidate evaluations, resume viewing, and hiring stages.',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    permissions: {
      'Workspace Overview & Search': 'Read',
      'Leads CRM & Inquiries': 'None',
      'Organizations & Contacts': 'None',
      'Quote Requests & Calculator': 'None',
      'Sales Pipeline Stages': 'None',
      'Content Studio (CMS)': 'None',
      'Version Rollbacks & Revisions': 'None',
      'Careers & Job Requisitions': 'Full',
      'Applicant Tracking & Resumes': 'Full',
      'Media Asset Upload & Deletion': 'Read',
      'Admin Users & Invites': 'None',
      'Audit Trail Logs': 'Read',
      'System Settings & Config': 'None',
      'System Telemetry & Health': 'None',
    },
  },
]

const PERMISSION_KEYS = Object.keys(ROLES[0].permissions)

export function RolesClient() {
  const [selectedRole, setSelectedRole] = useState<string>('Super Admin')

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Roles & Permissions (RBAC)
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Role-based authorization policies governing system workspaces and administrative endpoints.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg text-xs text-slate-600 font-mono">
          <Lock className="w-3.5 h-3.5 text-slate-500" />
          <span>Policies Enforced at Supabase RLS Layer</span>
        </div>
      </div>

      {/* Role Cards Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ROLES.map((role) => {
          const isSelected = selectedRole === role.name
          return (
            <div
              key={role.name}
              onClick={() => setSelectedRole(role.name)}
              className={`p-5 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/30 shadow-xs ring-1 ring-blue-600'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${role.badgeColor}`}
                  >
                    {role.tagline}
                  </span>
                  <KeyRound className="w-4 h-4 text-slate-400" />
                </div>
                <h3 className="text-sm font-bold text-slate-900">{role.name}</h3>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  {role.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Granted Areas</span>
                <span className="font-semibold text-slate-700">
                  {Object.values(role.permissions).filter((p) => p !== 'None').length} /{' '}
                  {PERMISSION_KEYS.length}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Permission Comparison Matrix */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Role Permission Access Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Direct comparison of operational capabilities across each role.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Workspace Capability</th>
                {ROLES.map((r) => (
                  <th key={r.name} className="py-3 px-4 text-center">
                    {r.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {PERMISSION_KEYS.map((perm) => (
                <tr key={perm} className="hover:bg-slate-50/70 transition">
                  <td className="py-3 px-4 font-medium text-slate-900">{perm}</td>
                  {ROLES.map((r) => {
                    const access = r.permissions[perm]
                    return (
                      <td key={r.name} className="py-3 px-4 text-center">
                        {access === 'Full' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <Check className="w-3 h-3" />
                            Full
                          </span>
                        ) : access === 'Read' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                            Read
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] text-slate-300">
                            <Minus className="w-3 h-3" />
                            None
                          </span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
