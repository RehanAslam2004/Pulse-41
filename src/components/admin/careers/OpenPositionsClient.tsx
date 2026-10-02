'use client'

import React, { useState } from 'react'
import {
  Briefcase,
  Search,
  Plus,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight,
  X,
  Edit3,
} from 'lucide-react'

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

export function OpenPositionsClient({
  initialJobs,
}: {
  initialJobs: JobListing[]
}) {
  const [jobs, setJobs] = useState<JobListing[]>(initialJobs)
  const [searchQuery, setSearchQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<JobListing | null>(null)

  // Form fields
  const [title, setTitle] = useState('')
  const [department, setDepartment] = useState('Engineering')
  const [type, setType] = useState('Full-Time')
  const [location, setLocation] = useState('Pakistan + Remote')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)
  const [saving, setSaving] = useState(false)

  const filtered = jobs.filter((j) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      j.title.toLowerCase().includes(q) ||
      j.department.toLowerCase().includes(q) ||
      j.location.toLowerCase().includes(q)
    )
  })

  const openModal = (job?: JobListing) => {
    if (job) {
      setEditingJob(job)
      setTitle(job.title)
      setDepartment(job.department)
      setType(job.type)
      setLocation(job.location)
      setDescription(job.description)
      setIsActive(job.is_active)
    } else {
      setEditingJob(null)
      setTitle('')
      setDepartment('Engineering')
      setType('Full-Time')
      setLocation('Pakistan + Remote')
      setDescription('')
      setIsActive(true)
    }
    setModalOpen(true)
  }

  const handleSaveJob = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const payload = {
        title,
        department,
        type,
        location,
        description,
        is_active: isActive,
      }

      if (editingJob) {
        const res = await fetch('/api/admin/content/job_listings', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingJob.id, ...payload }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to update job')
        setJobs(jobs.map((j) => (j.id === editingJob.id ? data.data : j)))
      } else {
        const res = await fetch('/api/admin/content/job_listings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to create job')
        setJobs([data.data, ...jobs])
      }
      setModalOpen(false)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (job: JobListing) => {
    const newStatus = !job.is_active
    setJobs(jobs.map((j) => (j.id === job.id ? { ...j, is_active: newStatus } : j)))
    try {
      await fetch('/api/admin/content/job_listings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: job.id, is_active: newStatus }),
      })
    } catch (err) {
      console.error('Toggle job status error:', err)
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Open Career Positions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage engineering, design, AI, and operations requisitions for the Pulse41 team.
          </p>
        </div>

        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Requisition</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles by title, department, location..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900"
          />
        </div>
        <span className="text-xs text-slate-500 font-semibold">{filtered.length} Positions</span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Position Title</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Employment Type</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((j) => (
                <tr key={j.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900">{j.title}</p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{j.description}</p>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {j.department}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-700 font-medium">
                    {j.type}
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{j.location}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleActive(j)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                        j.is_active
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${j.is_active ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      <span>{j.is_active ? 'Active' : 'Closed'}</span>
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openModal(j)}
                        className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg cursor-pointer"
                        title="Edit Job"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 space-y-4 animate-in zoom-in-95 duration-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">
                {editingJob ? 'Edit Career Position' : 'Create Career Requisition'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Position Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Machine Learning Engineer"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Design & UI/UX">Design & UI/UX</option>
                    <option value="Operations & Delivery">Operations & Delivery</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Part-Time">Part-Time</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Location</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Description</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Responsibilities, scope, and engineering expectations..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="job-active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600"
                />
                <label htmlFor="job-active" className="font-bold text-slate-800">
                  Active (accepting applications on careers page)
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs"
                >
                  {saving ? 'Saving...' : 'Save Requisition'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
