'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  FileText,
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  ExternalLink,
  Layers,
  Sparkles,
  Briefcase,
  BookOpen,
  Eye,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

interface CaseStudy {
  id: string
  title: string
  slug: string
  tag: string
  industry: string
  challenge: string
  solution_text: string
  result: string
  tech_stack: string[]
  is_published: boolean
  is_featured: boolean
  created_at: string
}

interface BlogPost {
  id: string
  title: string
  slug: string
  category: string
  excerpt: string
  content: string
  read_time: string
  author_name: string
  author_role: string
  is_published: boolean
  is_featured: boolean
  created_at: string
}

interface JobListing {
  id: string
  title: string
  department: string
  type: string
  location: string
  description: string
  requirements: string[]
  benefits: string[]
  is_active: boolean
  created_at: string
}

interface ContentCMSClientProps {
  initialCaseStudies: CaseStudy[]
  initialBlogPosts: BlogPost[]
  initialJobs: JobListing[]
}

type ContentTab = 'case_studies' | 'blog_posts' | 'job_listings'

export function ContentCMSClient({
  initialCaseStudies,
  initialBlogPosts,
  initialJobs,
}: ContentCMSClientProps) {
  const [activeTab, setActiveTab] = useState<ContentTab>('case_studies')
  const [caseStudies, setCaseStudies] = useState(initialCaseStudies)
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts)
  const [jobs, setJobs] = useState(initialJobs)

  const [searchQuery, setSearchQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  // Form State
  const [formData, setFormData] = useState<any>({})

  const showNotification = (text: string, type: 'success' | 'error') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 4000)
  }

  // Open modal for new entry
  const handleOpenCreate = () => {
    setEditingItem(null)
    if (activeTab === 'case_studies') {
      setFormData({
        title: '',
        slug: '',
        tag: 'AI & Automation',
        industry: 'FinTech',
        challenge: '',
        solution_text: '',
        result: '',
        tech_stack: 'Python, Next.js, PostgreSQL',
        is_published: true,
        is_featured: false,
      })
    } else if (activeTab === 'blog_posts') {
      setFormData({
        title: '',
        slug: '',
        category: 'Applied AI',
        read_time: '6 min read',
        author_name: 'Pulse41 Engineering',
        author_role: 'Solutions Architecture Group',
        excerpt: '',
        content: '',
        is_published: true,
        is_featured: false,
      })
    } else if (activeTab === 'job_listings') {
      setFormData({
        title: '',
        department: 'Engineering',
        type: 'Full-time / Remote',
        location: 'Pakistan + Remote (International)',
        description: '',
        requirements: '5+ years experience, Next.js, TypeScript, Cloud Architecture',
        benefits: 'Competitive USD parity salary, Health coverage, Remote stipend',
        is_active: true,
      })
    }
    setModalOpen(true)
  }

  // Open modal for editing existing item
  const handleOpenEdit = (item: any) => {
    setEditingItem(item)
    if (activeTab === 'case_studies') {
      setFormData({
        title: item.title,
        slug: item.slug,
        tag: item.tag,
        industry: item.industry,
        challenge: item.challenge,
        solution_text: item.solution_text,
        result: item.result,
        tech_stack: Array.isArray(item.tech_stack) ? item.tech_stack.join(', ') : item.tech_stack || '',
        is_published: item.is_published,
        is_featured: item.is_featured,
      })
    } else if (activeTab === 'blog_posts') {
      setFormData({
        title: item.title,
        slug: item.slug,
        category: item.category,
        read_time: item.read_time,
        author_name: item.author_name,
        author_role: item.author_role,
        excerpt: item.excerpt,
        content: item.content,
        is_published: item.is_published,
        is_featured: item.is_featured,
      })
    } else if (activeTab === 'job_listings') {
      setFormData({
        title: item.title,
        department: item.department,
        type: item.type,
        location: item.location,
        description: item.description,
        requirements: Array.isArray(item.requirements) ? item.requirements.join('\n') : item.requirements || '',
        benefits: Array.isArray(item.benefits) ? item.benefits.join('\n') : item.benefits || '',
        is_active: item.is_active,
      })
    }
    setModalOpen(true)
  }

  // Handle Form Submit (POST or PATCH)
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare payload
      const payload = { ...formData }
      if (activeTab === 'case_studies' && typeof payload.tech_stack === 'string') {
        payload.tech_stack = payload.tech_stack.split(',').map((s: string) => s.trim()).filter(Boolean)
      }
      if (activeTab === 'job_listings') {
        if (typeof payload.requirements === 'string') {
          payload.requirements = payload.requirements.split('\n').map((s: string) => s.trim()).filter(Boolean)
        }
        if (typeof payload.benefits === 'string') {
          payload.benefits = payload.benefits.split('\n').map((s: string) => s.trim()).filter(Boolean)
        }
      }

      if (editingItem) {
        // PATCH
        const res = await fetch(`/api/admin/content/${activeTab}/${editingItem.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Failed to update entry')

        if (activeTab === 'case_studies') {
          setCaseStudies((prev) => prev.map((c) => (c.id === editingItem.id ? json.data : c)))
        } else if (activeTab === 'blog_posts') {
          setBlogPosts((prev) => prev.map((b) => (b.id === editingItem.id ? json.data : b)))
        } else if (activeTab === 'job_listings') {
          setJobs((prev) => prev.map((j) => (j.id === editingItem.id ? json.data : j)))
        }
        showNotification('Content entry updated successfully!', 'success')
      } else {
        // POST
        const res = await fetch(`/api/admin/content/${activeTab}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Failed to create entry')

        if (activeTab === 'case_studies') {
          setCaseStudies((prev) => [json.data, ...prev])
        } else if (activeTab === 'blog_posts') {
          setBlogPosts((prev) => [json.data, ...prev])
        } else if (activeTab === 'job_listings') {
          setJobs((prev) => [json.data, ...prev])
        }
        showNotification('New content entry created successfully!', 'success')
      }

      setModalOpen(false)
    } catch (err: any) {
      console.error('Submit error:', err)
      showNotification(err.message || 'Error saving content item', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle Delete
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      const res = await fetch(`/api/admin/content/${activeTab}/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete item')

      if (activeTab === 'case_studies') {
        setCaseStudies((prev) => prev.filter((c) => c.id !== id))
      } else if (activeTab === 'blog_posts') {
        setBlogPosts((prev) => prev.filter((b) => b.id !== id))
      } else if (activeTab === 'job_listings') {
        setJobs((prev) => prev.filter((j) => j.id !== id))
      }
      showNotification('Content deleted successfully.', 'success')
    } catch (err: any) {
      console.error('Delete error:', err)
      showNotification(err.message || 'Failed to delete item', 'error')
    }
  }

  // 1-Click Toggle Published/Active
  const handleTogglePublish = async (item: any) => {
    const isCurrentlyActive =
      activeTab === 'job_listings' ? item.is_active : item.is_published
    const newStatus = !isCurrentlyActive

    try {
      const payload =
        activeTab === 'job_listings'
          ? { is_active: newStatus }
          : { is_published: newStatus }

      const res = await fetch(`/api/admin/content/${activeTab}/${item.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Toggle failed')

      if (activeTab === 'case_studies') {
        setCaseStudies((prev) =>
          prev.map((c) => (c.id === item.id ? { ...c, is_published: newStatus } : c))
        )
      } else if (activeTab === 'blog_posts') {
        setBlogPosts((prev) =>
          prev.map((b) => (b.id === item.id ? { ...b, is_published: newStatus } : b))
        )
      } else if (activeTab === 'job_listings') {
        setJobs((prev) =>
          prev.map((j) => (j.id === item.id ? { ...j, is_active: newStatus } : j))
        )
      }
      showNotification(`Status updated to ${newStatus ? 'Live' : 'Draft'}.`, 'success')
    } catch (err: any) {
      showNotification('Failed to toggle status.', 'error')
    }
  }

  // Filtered queries
  const filteredCaseStudies = caseStudies.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredBlogPosts = blogPosts.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredJobs = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {message && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 border animate-fadeIn ${
            message.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Headless Content Studio</h2>
          <p className="text-xs text-slate-400 mt-1">
            Author, edit, and publish case study deliverables, whitepapers, and career openings.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Entry</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab('case_studies')}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 relative transition-colors ${
            activeTab === 'case_studies' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Case Studies</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            {caseStudies.length}
          </span>
          {activeTab === 'case_studies' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('blog_posts')}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 relative transition-colors ${
            activeTab === 'blog_posts' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Insights & Whitepapers</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            {blogPosts.length}
          </span>
          {activeTab === 'blog_posts' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('job_listings')}
          className={`pb-3 text-sm font-semibold flex items-center gap-2 relative transition-colors ${
            activeTab === 'job_listings' ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Career Openings</span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
            {jobs.length}
          </span>
          {activeTab === 'job_listings' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
          )}
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#0F172A] border border-slate-800/80 p-3 rounded-2xl">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search content by title, tags, or author..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Content Table */}
      <div className="bg-[#0F172A] border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
        {/* Case Studies Table */}
        {activeTab === 'case_studies' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold">
                  <th className="py-3 px-4">Case Study Title</th>
                  <th className="py-3 px-4">Industry / Tag</th>
                  <th className="py-3 px-4">Tech Stack</th>
                  <th className="py-3 px-4">Publication</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredCaseStudies.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-200">{item.title}</div>
                      <div className="text-[11px] text-blue-400 font-mono">/case-studies/{item.slug}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 font-medium">
                        {item.industry}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {Array.isArray(item.tech_stack) ? item.tech_stack.slice(0, 3).join(', ') : item.tech_stack}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleTogglePublish(item)}
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border transition-colors ${
                          item.is_published
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {item.is_published ? 'LIVE' : 'DRAFT'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/case-studies/${item.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                          title="View Live Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Blog Posts Table */}
        {activeTab === 'blog_posts' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold">
                  <th className="py-3 px-4">Article Title</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Author</th>
                  <th className="py-3 px-4">Publication</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredBlogPosts.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-200">{item.title}</div>
                      <div className="text-[11px] text-indigo-400 font-mono">/insights/{item.slug}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {item.author_name} ({item.read_time})
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleTogglePublish(item)}
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border transition-colors ${
                          item.is_published
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        }`}
                      >
                        {item.is_published ? 'LIVE' : 'DRAFT'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/insights/${item.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                          title="View Live Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Job Listings Table */}
        {activeTab === 'job_listings' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/60 text-slate-400 font-semibold">
                  <th className="py-3 px-4">Job Title</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Location & Type</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredJobs.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-200">{item.title}</div>
                      <div className="text-[11px] text-slate-400">{item.department}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                        {item.department}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {item.type} • {item.location}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleTogglePublish(item)}
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border transition-colors ${
                          item.is_active
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {item.is_active ? 'OPEN' : 'CLOSED'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href="/careers"
                          target="_blank"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                          title="View Careers Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.title)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0F172A] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">
              {editingItem ? 'Edit Entry' : 'Create New Entry'}
            </h3>
            <p className="text-xs text-slate-400 mb-6 capitalize">
              Target Entity: {activeTab.replace('_', ' ')}
            </p>

            <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
              {/* Common Title */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Slug for Case Studies and Blog Posts */}
              {activeTab !== 'job_listings' && (
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    URL Slug (auto-formatted)
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g. enterprise-growth-engine"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-blue-400 font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              )}

              {/* Case Studies Specific Fields */}
              {activeTab === 'case_studies' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Industry</label>
                      <input
                        type="text"
                        required
                        value={formData.industry || ''}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Tag / Practice</label>
                      <input
                        type="text"
                        required
                        value={formData.tag || ''}
                        onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Challenge Summary</label>
                    <textarea
                      rows={2}
                      required
                      value={formData.challenge || ''}
                      onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Solution Architecture</label>
                    <textarea
                      rows={2}
                      required
                      value={formData.solution_text || ''}
                      onChange={(e) => setFormData({ ...formData, solution_text: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Measurable Results</label>
                    <textarea
                      rows={2}
                      required
                      value={formData.result || ''}
                      onChange={(e) => setFormData({ ...formData, result: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Tech Stack (comma-separated)</label>
                    <input
                      type="text"
                      value={formData.tech_stack || ''}
                      onChange={(e) => setFormData({ ...formData, tech_stack: e.target.value })}
                      placeholder="Next.js, Python, PostgreSQL, AWS"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* Blog Posts Specific Fields */}
              {activeTab === 'blog_posts' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Category</label>
                      <input
                        type="text"
                        required
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Read Time</label>
                      <input
                        type="text"
                        value={formData.read_time || '5 min read'}
                        onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Author Name</label>
                      <input
                        type="text"
                        value={formData.author_name || 'Pulse41 Architecture Group'}
                        onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Author Role</label>
                      <input
                        type="text"
                        value={formData.author_role || 'Executive Engineering'}
                        onChange={(e) => setFormData({ ...formData, author_role: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Executive Summary / Excerpt</label>
                    <textarea
                      rows={2}
                      required
                      value={formData.excerpt || ''}
                      onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Full Article Content (Markdown)</label>
                    <textarea
                      rows={6}
                      required
                      value={formData.content || ''}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* Job Listings Specific Fields */}
              {activeTab === 'job_listings' && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Department</label>
                      <input
                        type="text"
                        required
                        value={formData.department || ''}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Employment Type</label>
                      <input
                        type="text"
                        value={formData.type || 'Full-time / Remote'}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Location</label>
                    <input
                      type="text"
                      value={formData.location || 'Pakistan + Remote'}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Role Description</label>
                    <textarea
                      rows={3}
                      required
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Requirements (one per line)</label>
                    <textarea
                      rows={3}
                      value={formData.requirements || ''}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* Status Toggles */}
              <div className="flex items-center gap-6 pt-2">
                {activeTab !== 'job_listings' ? (
                  <>
                    <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={Boolean(formData.is_published)}
                        onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                        className="rounded border-slate-800 bg-slate-900 text-blue-600 focus:ring-0"
                      />
                      <span>Published Live</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={Boolean(formData.is_featured)}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="rounded border-slate-800 bg-slate-900 text-blue-600 focus:ring-0"
                      />
                      <span>Featured Showcase</span>
                    </label>
                  </>
                ) : (
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={Boolean(formData.is_active)}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="rounded border-slate-800 bg-slate-900 text-emerald-600 focus:ring-0"
                    />
                    <span>Active Opening (Accepting Applications)</span>
                  </label>
                )}
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : editingItem ? 'Save Changes' : 'Create Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
