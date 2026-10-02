'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Layers,
  Search,
  Plus,
  Eye,
  History,
  CheckCircle2,
  XCircle,
  Edit3,
  Trash2,
  ExternalLink,
  ChevronRight,
  X,
  Sparkles,
  FileText,
  Trophy,
  Cpu,
  Factory,
  Quote,
  RotateCw,
} from 'lucide-react'
import { DevicePreviewModal } from './DevicePreviewModal'
import { RevisionHistoryDrawer } from './RevisionHistoryDrawer'

export type ContentTableKey =
  | 'case_studies'
  | 'blog_posts'
  | 'services'
  | 'solutions'
  | 'industries'
  | 'testimonials'

interface ContentItem {
  id: string
  title?: string
  name?: string
  product_name?: string
  slug?: string
  category?: string
  industry?: string
  tag?: string
  is_published?: boolean
  is_active?: boolean
  excerpt?: string
  description?: string
  created_at: string
  [key: string]: any
}

interface ContentStudioProps {
  initialTable: ContentTableKey
  initialData: Record<ContentTableKey, ContentItem[]>
}

const TABS: { key: ContentTableKey; label: string; icon: React.ElementType }[] = [
  { key: 'case_studies', label: 'Case Studies', icon: Trophy },
  { key: 'blog_posts', label: 'Insights & Blog', icon: FileText },
  { key: 'services', label: '8 Core Services', icon: Cpu },
  { key: 'solutions', label: 'Platform Solutions', icon: Layers },
  { key: 'industries', label: '10 Industries', icon: Factory },
  { key: 'testimonials', label: 'Testimonials', icon: Quote },
]

export function ContentStudioClient({
  initialTable,
  initialData,
}: ContentStudioProps) {
  const [activeTable, setActiveTable] = useState<ContentTableKey>(initialTable)
  const [dataStore, setDataStore] = useState(initialData)
  const [searchQuery, setSearchQuery] = useState('')

  // Device Preview State
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('/')
  const [previewTitle, setPreviewTitle] = useState('')

  // Revision History State
  const [revisionOpen, setRevisionOpen] = useState(false)
  const [revEntityId, setRevEntityId] = useState('')
  const [revEntityTitle, setRevEntityTitle] = useState('')

  // Editor Modal State
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null)
  const [editorTab, setEditorTab] = useState<'content' | 'metadata' | 'seo'>('content')
  const [formFields, setFormFields] = useState<Record<string, any>>({})
  const [saving, setSaving] = useState(false)

  const currentItems = dataStore[activeTable] || []

  const filteredItems = currentItems.filter((item) => {
    if (!searchQuery.trim()) return true
    const term = searchQuery.toLowerCase()
    const titleVal = (item.title || item.name || item.product_name || '').toLowerCase()
    const slugVal = (item.slug || '').toLowerCase()
    const catVal = (item.category || item.industry || '').toLowerCase()
    return titleVal.includes(term) || slugVal.includes(term) || catVal.includes(term)
  })

  // Open Preview Modal
  const openPreview = (item: ContentItem) => {
    let url = '/'
    if (activeTable === 'case_studies' && item.slug) {
      url = `/case-studies/${item.slug}`
    } else if (activeTable === 'blog_posts' && item.slug) {
      url = `/insights/${item.slug}`
    } else if (activeTable === 'services' && item.slug) {
      url = `/services/${item.slug}`
    } else if (activeTable === 'solutions' && item.slug) {
      url = `/solutions/${item.slug}`
    } else if (activeTable === 'industries' && item.slug) {
      url = `/industries/${item.slug}`
    }
    setPreviewUrl(url)
    setPreviewTitle(item.title || item.name || item.product_name || 'Preview')
    setPreviewOpen(true)
  }

  // Open Revision Drawer
  const openRevisions = (item: ContentItem) => {
    setRevEntityId(item.id)
    setRevEntityTitle(item.title || item.name || item.product_name || 'Record')
    setRevisionOpen(true)
  }

  // Toggle Published / Active status
  const handleTogglePublish = async (item: ContentItem) => {
    const isPublishedKey = item.is_published !== undefined ? 'is_published' : 'is_active'
    const newStatus = !item[isPublishedKey]

    // Optimistic update
    setDataStore((prev) => ({
      ...prev,
      [activeTable]: prev[activeTable].map((it) =>
        it.id === item.id ? { ...it, [isPublishedKey]: newStatus } : it
      ),
    }))

    try {
      await fetch(`/api/admin/content/${activeTable}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, [isPublishedKey]: newStatus }),
      })
    } catch (err) {
      console.error('Failed to toggle publish status:', err)
    }
  }

  // Open Edit Modal
  const openEditor = (item?: ContentItem) => {
    if (item) {
      setEditingItem(item)
      setFormFields({ ...item })
    } else {
      setEditingItem(null)
      setFormFields({
        title: '',
        name: '',
        slug: '',
        category: 'Technology',
        industry: 'Technology & Enterprise',
        excerpt: '',
        description: '',
        challenge: '',
        solution_text: '',
        result: '',
        is_published: false,
        is_active: true,
      })
    }
    setEditorTab('content')
    setEditModalOpen(true)
  }

  // Save Item
  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (editingItem) {
        // PATCH
        const res = await fetch(`/api/admin/content/${activeTable}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingItem.id, ...formFields }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to update record')

        setDataStore((prev) => ({
          ...prev,
          [activeTable]: prev[activeTable].map((it) =>
            it.id === editingItem.id ? { ...it, ...data.data } : it
          ),
        }))
      } else {
        // POST (New)
        const res = await fetch(`/api/admin/content/${activeTable}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formFields),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to create record')

        setDataStore((prev) => ({
          ...prev,
          [activeTable]: [data.data, ...prev[activeTable]],
        }))
      }

      setEditModalOpen(false)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Headless Content Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage corporate publications, service offerings, case studies, and industry portfolios with dual-mode preview.
          </p>
        </div>

        <button
          onClick={() => openEditor()}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Entry</span>
        </button>
      </div>

      {/* Module Tabs */}
      <div className="flex items-center gap-1 border-b border-slate-200 overflow-x-auto pb-px">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const active = activeTable === tab.key
          const count = dataStore[tab.key]?.length || 0

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTable(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                active
                  ? 'border-blue-600 text-blue-600 bg-blue-50/20'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  active ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items by title, slug, category..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900"
          />
        </div>
        <span className="text-xs text-slate-500 font-semibold">{filteredItems.length} Records</span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Title / Name</th>
                <th className="py-3 px-4">Slug / Routing</th>
                <th className="py-3 px-4">Category / Industry</th>
                <th className="py-3 px-4">Workflow Status</th>
                <th className="py-3 px-4">Updated</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No items found in this collection
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  const title = item.title || item.name || item.product_name || 'Untitled'
                  const isLive = item.is_published ?? item.is_active ?? true

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                            {title.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 line-clamp-1">{title}</p>
                            {item.excerpt && (
                              <p className="text-[11px] text-slate-500 line-clamp-1">{item.excerpt}</p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                        {item.slug || '—'}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {item.category || item.industry || item.tag || 'Standard'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleTogglePublish(item)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                            isLive
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                          }`}
                          title="Click to toggle publish status"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isLive ? 'bg-emerald-500' : 'bg-amber-500'
                            }`}
                          />
                          <span>{isLive ? 'Published' : 'Draft'}</span>
                        </button>
                      </td>

                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {new Date(item.created_at || Date.now()).toLocaleDateString()}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openPreview(item)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                            title="Dual-mode Device Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => openRevisions(item)}
                            className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                            title="Revision History & Rollback"
                          >
                            <History className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => openEditor(item)}
                            className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Record"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      {editModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
          onClick={() => setEditModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {editingItem ? 'Edit Content Publication' : 'Create New Publication'}
                </h3>
                <p className="text-xs text-slate-500">
                  Collection: {TABS.find((t) => t.key === activeTable)?.label}
                </p>
              </div>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-100 text-xs">
              <button
                onClick={() => setEditorTab('content')}
                className={`pb-2.5 font-bold border-b-2 transition-colors ${
                  editorTab === 'content'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Story & Details
              </button>
              <button
                onClick={() => setEditorTab('metadata')}
                className={`pb-2.5 font-bold border-b-2 transition-colors ${
                  editorTab === 'metadata'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Routing & Taxonomy
              </button>
              <button
                onClick={() => setEditorTab('seo')}
                className={`pb-2.5 font-bold border-b-2 transition-colors ${
                  editorTab === 'seo'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Publishing & SEO
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveItem} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
              {editorTab === 'content' && (
                <div className="space-y-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Publication Title / Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formFields.title || formFields.name || formFields.product_name || ''}
                      onChange={(e) =>
                        setFormFields({
                          ...formFields,
                          title: e.target.value,
                          name: e.target.value,
                          product_name: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {activeTable === 'case_studies' && (
                    <div className="space-y-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Client / Sponsoring Organization
                        </label>
                        <input
                          type="text"
                          value={formFields.client || ''}
                          onChange={(e) =>
                            setFormFields({ ...formFields, client: e.target.value })
                          }
                          placeholder="e.g. FinTrust Global (Optional)"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Challenge
                        </label>
                        <textarea
                          rows={2}
                          value={formFields.challenge || ''}
                          onChange={(e) =>
                            setFormFields({ ...formFields, challenge: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Engineering Approach & Solution
                        </label>
                        <textarea
                          rows={3}
                          value={formFields.solution_text || ''}
                          onChange={(e) =>
                            setFormFields({ ...formFields, solution_text: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Measurable Result / Impact
                        </label>
                        <input
                          type="text"
                          value={formFields.result || ''}
                          onChange={(e) =>
                            setFormFields({ ...formFields, result: e.target.value })
                          }
                          placeholder="e.g. 99.99% Availability & 40% Cost Reduction"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>
                  )}

                  {activeTable === 'blog_posts' && (
                    <div className="space-y-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Excerpt Summary
                        </label>
                        <textarea
                          rows={2}
                          value={formFields.excerpt || ''}
                          onChange={(e) =>
                            setFormFields({ ...formFields, excerpt: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Full Editorial Content (Markdown Supported)
                        </label>
                        <textarea
                          rows={6}
                          value={formFields.content || ''}
                          onChange={(e) =>
                            setFormFields({ ...formFields, content: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {(activeTable === 'services' || activeTable === 'solutions') && (
                    <div className="space-y-3">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Tagline
                        </label>
                        <input
                          type="text"
                          value={formFields.tagline || ''}
                          onChange={(e) =>
                            setFormFields({ ...formFields, tagline: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-200"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">
                          Executive Description
                        </label>
                        <textarea
                          rows={4}
                          value={formFields.description || ''}
                          onChange={(e) =>
                            setFormFields({ ...formFields, description: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-slate-200"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {editorTab === 'metadata' && (
                <div className="space-y-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={formFields.slug || ''}
                      onChange={(e) =>
                        setFormFields({ ...formFields, slug: e.target.value })
                      }
                      placeholder="e.g. ai-customer-experience"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Category / Industry Tag
                    </label>
                    <input
                      type="text"
                      value={formFields.category || formFields.industry || formFields.tag || ''}
                      onChange={(e) =>
                        setFormFields({
                          ...formFields,
                          category: e.target.value,
                          industry: e.target.value,
                          tag: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Cover Image URL
                    </label>
                    <input
                      type="text"
                      value={formFields.cover_image_url || ''}
                      onChange={(e) =>
                        setFormFields({ ...formFields, cover_image_url: e.target.value })
                      }
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                    />
                  </div>
                </div>
              )}

              {editorTab === 'seo' && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">Published to Live Site</span>
                      <span className="text-[11px] text-slate-500">
                        When active, this content is immediately indexed and visible to public visitors.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formFields.is_published ?? formFields.is_active ?? true}
                      onChange={(e) =>
                        setFormFields({
                          ...formFields,
                          is_published: e.target.checked,
                          is_active: e.target.checked,
                        })
                      }
                      className="w-4 h-4 rounded text-blue-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      SEO Meta Title
                    </label>
                    <input
                      type="text"
                      value={formFields.seo_title || formFields.title || ''}
                      onChange={(e) =>
                        setFormFields({ ...formFields, seo_title: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      SEO Meta Description
                    </label>
                    <textarea
                      rows={3}
                      value={formFields.seo_description || formFields.excerpt || ''}
                      onChange={(e) =>
                        setFormFields({ ...formFields, seo_description: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => openPreview(formFields as ContentItem)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-600" />
                  <span>Preview in Frame</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs cursor-pointer"
                  >
                    {saving ? 'Saving...' : 'Save & Record Revision'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Device Preview Modal */}
      <DevicePreviewModal
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        previewUrl={previewUrl}
        title={previewTitle}
      />

      {/* Revision History Drawer */}
      <RevisionHistoryDrawer
        isOpen={revisionOpen}
        onClose={() => setRevisionOpen(false)}
        entityId={revEntityId}
        entityTitle={revEntityTitle}
        onRestored={(snapshot) => {
          setDataStore((prev) => ({
            ...prev,
            [activeTable]: prev[activeTable].map((it) =>
              it.id === snapshot.id ? snapshot : it
            ),
          }))
        }}
      />
    </div>
  )
}
