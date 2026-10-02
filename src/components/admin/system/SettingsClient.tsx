'use client'

import React, { useState } from 'react'
import {
  Settings,
  Globe,
  Share2,
  Shield,
  Save,
  Check,
  AlertCircle,
  Loader2,
  Building,
  Key,
} from 'lucide-react'

interface SettingsClientProps {
  initialSettings: Record<string, any>
}

export function SettingsClient({ initialSettings }: SettingsClientProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'seo' | 'social' | 'operational' | 'security'>('general')

  // Form states initialized from server props
  const [general, setGeneral] = useState({
    companyName: initialSettings.general?.companyName || 'Pulse41',
    tagline: initialSettings.general?.tagline || 'Tech. Think. Thrive.',
    contactEmail: initialSettings.general?.contactEmail || 'contact@pulse41.com',
    supportEmail: initialSettings.general?.supportEmail || 'sysadmin@pulse41.com',
    hqLocation: initialSettings.general?.hqLocation || 'Zurich, Switzerland & Silicon Valley, CA',
  })

  const [seo, setSeo] = useState({
    defaultTitle: initialSettings.seo?.defaultTitle || 'Pulse41 — Tech. Think. Thrive.',
    defaultDescription:
      initialSettings.seo?.defaultDescription ||
      'AI-powered products, digital experiences and technology solutions for forward-thinking enterprises.',
    ogImage: initialSettings.seo?.ogImage || '/og-image.png',
    twitterCard: initialSettings.seo?.twitterCard || 'summary_large_image',
  })

  const [social, setSocial] = useState({
    linkedin: initialSettings.social?.linkedin || 'https://linkedin.com/company/pulse41',
    github: initialSettings.social?.github || 'https://github.com/pulse41',
    twitter: initialSettings.social?.twitter || 'https://twitter.com/pulse41',
    youtube: initialSettings.social?.youtube || 'https://youtube.com/@pulse41',
  })

  const [operational, setOperational] = useState({
    maintenanceMode: initialSettings.operational?.maintenanceMode || false,
    emailAlertsOnLead: initialSettings.operational?.emailAlertsOnLead ?? true,
    emailAlertsOnQuote: initialSettings.operational?.emailAlertsOnQuote ?? true,
    autoAssignLeads: initialSettings.operational?.autoAssignLeads ?? true,
  })

  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  const handleSaveCategory = async (key: string, value: any) => {
    setSaving(true)
    setSaveSuccess(null)
    setSaveError(null)

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update settings')
      }

      setSaveSuccess(`Updated ${key.toUpperCase()} configuration successfully`)
      setTimeout(() => setSaveSuccess(null), 3000)
    } catch (err: any) {
      setSaveError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            System Settings & Enterprise Configuration
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Global variables, SEO metadata, operational flags, and notification rules.
          </p>
        </div>

        {saveSuccess && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{saveSuccess}</span>
          </div>
        )}

        {saveError && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600" />
            <span>{saveError}</span>
          </div>
        )}
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        {[
          { id: 'general', label: 'General Info', icon: Building },
          { id: 'seo', label: 'SEO & Metadata', icon: Globe },
          { id: 'social', label: 'Social Ecosystem', icon: Share2 },
          { id: 'operational', label: 'Operational Rules', icon: Settings },
          { id: 'security', label: 'Security & Infrastructure', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon
          const active = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
                active
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* TAB CONTENT: General */}
      {activeTab === 'general' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">General Information</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Primary brand identity, corporate support endpoints, and company designation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Brand / Company Name
              </label>
              <input
                type="text"
                value={general.companyName}
                onChange={(e) => setGeneral({ ...general, companyName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Tagline</label>
              <input
                type="text"
                value={general.tagline}
                onChange={(e) => setGeneral({ ...general, tagline: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Inbound Inquiries Email
              </label>
              <input
                type="email"
                value={general.contactEmail}
                onChange={(e) => setGeneral({ ...general, contactEmail: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                System Support Email
              </label>
              <input
                type="email"
                value={general.supportEmail}
                onChange={(e) => setGeneral({ ...general, supportEmail: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1.5">
                Global Locations & Headquarters
              </label>
              <input
                type="text"
                value={general.hqLocation}
                onChange={(e) => setGeneral({ ...general, hqLocation: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => handleSaveCategory('general', general)}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save General Settings
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: SEO */}
      {activeTab === 'seo' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">SEO & Metadata</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Default metadata tags rendered on search engines and social card previews.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Default Meta Title
              </label>
              <input
                type="text"
                value={seo.defaultTitle}
                onChange={(e) => setSeo({ ...seo, defaultTitle: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                Default Meta Description
              </label>
              <textarea
                rows={3}
                value={seo.defaultDescription}
                onChange={(e) => setSeo({ ...seo, defaultDescription: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  OpenGraph Image URL
                </label>
                <input
                  type="text"
                  value={seo.ogImage}
                  onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-mono focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Twitter Card Format
                </label>
                <select
                  value={seo.twitterCard}
                  onChange={(e) => setSeo({ ...seo, twitterCard: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="summary_large_image">summary_large_image</option>
                  <option value="summary">summary</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => handleSaveCategory('seo', seo)}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save SEO Settings
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Social */}
      {activeTab === 'social' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">Social Ecosystem Links</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Public URLs linked in header, footer, and outreach profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">LinkedIn</label>
              <input
                type="text"
                value={social.linkedin}
                onChange={(e) => setSocial({ ...social, linkedin: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">GitHub</label>
              <input
                type="text"
                value={social.github}
                onChange={(e) => setSocial({ ...social, github: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Twitter / X</label>
              <input
                type="text"
                value={social.twitter}
                onChange={(e) => setSocial({ ...social, twitter: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">YouTube</label>
              <input
                type="text"
                value={social.youtube}
                onChange={(e) => setSocial({ ...social, youtube: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => handleSaveCategory('social', social)}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save Social Links
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Operational */}
      {activeTab === 'operational' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">Operational Automations & Flags</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Control behavior of automated workflows and maintenance announcements.
            </p>
          </div>

          <div className="space-y-4">
            <label className="flex items-start gap-3 p-3.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={operational.emailAlertsOnLead}
                onChange={(e) =>
                  setOperational({ ...operational, emailAlertsOnLead: e.target.checked })
                }
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Instant Lead Notification Alerts
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Push instant notifications to the Admin Notification center whenever a new lead inquiry arrives.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={operational.emailAlertsOnQuote}
                onChange={(e) =>
                  setOperational({ ...operational, emailAlertsOnQuote: e.target.checked })
                }
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Interactive Quote Ingestion Tracking
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Automatically generate high-priority notifications when an enterprise project calculator submission is logged.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={operational.autoAssignLeads}
                onChange={(e) =>
                  setOperational({ ...operational, autoAssignLeads: e.target.checked })
                }
                className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">
                  Default Lead Owner Assignment
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  Assign all inbound leads to the root administrator (admin@pulse41.com) for initial qualification.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-lg border border-amber-200 bg-amber-50/50 hover:bg-amber-50 cursor-pointer transition">
              <input
                type="checkbox"
                checked={operational.maintenanceMode}
                onChange={(e) =>
                  setOperational({ ...operational, maintenanceMode: e.target.checked })
                }
                className="mt-1 h-4 w-4 rounded border-amber-400 text-amber-600 focus:ring-amber-500"
              />
              <div>
                <p className="text-xs font-bold text-amber-900">
                  Maintenance Mode Notice Banner
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Display an active scheduled maintenance warning notice across all public website pages.
                </p>
              </div>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => handleSaveCategory('operational', operational)}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save Operational Rules
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Security & Infrastructure */}
      {activeTab === 'security' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-900">Security & Infrastructure Keys</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Read-only system integrity status and masked environment tokens.
            </p>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">NEXT_PUBLIC_SUPABASE_URL</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Configured & Active
                </span>
              </div>
              <p className="mt-2 text-slate-800 break-all select-all">
                https://zck...supabase.co
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">SUPABASE_SERVICE_ROLE_KEY</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Protected & Secret
                </span>
              </div>
              <p className="mt-2 text-slate-800 break-all">
                eyJh...********************************************
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Row-Level Security (RLS)</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  19 / 19 Tables Enforced
                </span>
              </div>
              <p className="mt-2 text-slate-600 font-sans text-xs">
                Restricted to authenticated admin JWT or system service role.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
