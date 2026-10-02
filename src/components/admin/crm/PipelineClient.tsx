'use client'

import React, { useState } from 'react'
import {
  GitPullRequest,
  Search,
  Building2,
  DollarSign,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Mail,
  User,
  Plus,
  GripVertical,
} from 'lucide-react'

interface PipelineItem {
  id: string
  type: 'contact' | 'quote'
  name: string
  email: string
  company: string | null
  scope: string | null
  budget: string | null
  status: string
  created_at: string
}

const STAGES = [
  { key: 'new', label: '1. New Inquiries', color: 'border-blue-400 bg-blue-50/40 text-blue-800' },
  { key: 'reviewing', label: '2. Scoping / Review', color: 'border-amber-400 bg-amber-50/40 text-amber-800' },
  { key: 'contacted', label: '3. Discovery Contact', color: 'border-indigo-400 bg-indigo-50/40 text-indigo-800' },
  { key: 'qualified', label: '4. Qualified / RFP', color: 'border-emerald-400 bg-emerald-50/40 text-emerald-800' },
  { key: 'closed', label: '5. Won / Closed', color: 'border-slate-400 bg-slate-50 text-slate-800' },
]

export function PipelineClient({
  initialLeads,
}: {
  initialLeads: PipelineItem[]
}) {
  const [leads, setLeads] = useState<PipelineItem[]>(initialLeads)
  const [searchQuery, setSearchQuery] = useState('')
  const [draggedItem, setDraggedItem] = useState<PipelineItem | null>(null)
  const [dragOverStage, setDragOverStage] = useState<string | null>(null)

  const handleStageMove = async (id: string, type: 'contact' | 'quote', newStage: string) => {
    // Optimistic update
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStage } : l))
    )

    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, type, status: newStage }),
      })
    } catch (err) {
      console.error('Move stage error:', err)
    }
  }

  const filtered = leads.filter((l) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.company && l.company.toLowerCase().includes(q)) ||
      (l.scope && l.scope.toLowerCase().includes(q))
    )
  })

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Pipeline Progression
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Drag and drop opportunity cards between stages to advance deals through the pipeline.
          </p>
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pipeline cards..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-slate-900 font-medium"
          />
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto min-h-[620px] items-start pb-4">
        {STAGES.map((stage, colIdx) => {
          const stageItems = filtered.filter((l) => l.status === stage.key)
          const prevStage = colIdx > 0 ? STAGES[colIdx - 1].key : null
          const nextStage = colIdx < STAGES.length - 1 ? STAGES[colIdx + 1].key : null
          const isTarget = dragOverStage === stage.key

          return (
            <div
              key={stage.key}
              onDragOver={(e) => {
                e.preventDefault()
                e.dataTransfer.dropEffect = 'move'
                if (dragOverStage !== stage.key) {
                  setDragOverStage(stage.key)
                }
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setDragOverStage(null)
                }
              }}
              onDrop={(e) => {
                e.preventDefault()
                setDragOverStage(null)
                if (draggedItem && draggedItem.status !== stage.key) {
                  handleStageMove(draggedItem.id, draggedItem.type, stage.key)
                }
                setDraggedItem(null)
              }}
              className={`rounded-2xl p-3 flex flex-col min-h-[520px] transition-all duration-150 ${
                isTarget
                  ? 'border-2 border-dashed border-blue-500 bg-blue-50/70 ring-4 ring-blue-500/10 scale-[1.01]'
                  : 'bg-slate-100/70 border border-slate-200/80'
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                  {stage.label}
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border transition-colors ${
                    isTarget
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  {stageItems.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="space-y-2.5 flex-1">
                {stageItems.length === 0 ? (
                  <div
                    className={`py-12 text-center text-[11px] rounded-xl border border-dashed transition-colors ${
                      isTarget
                        ? 'border-blue-400 bg-blue-100/40 text-blue-700 font-bold'
                        : 'border-slate-200 text-slate-400'
                    }`}
                  >
                    {isTarget ? 'Drop card here' : 'No leads in stage'}
                  </div>
                ) : (
                  stageItems.map((item) => {
                    const isDragging = draggedItem?.id === item.id

                    return (
                      <div
                        key={item.id}
                        draggable={true}
                        onDragStart={(e) => {
                          setDraggedItem(item)
                          e.dataTransfer.setData('text/plain', item.id)
                          e.dataTransfer.effectAllowed = 'move'
                        }}
                        onDragEnd={() => {
                          setDraggedItem(null)
                          setDragOverStage(null)
                        }}
                        className={`bg-white rounded-xl p-3.5 border border-slate-200 shadow-2xs hover:shadow-md transition-all duration-150 space-y-2 cursor-grab active:cursor-grabbing select-none group ${
                          isDragging
                            ? 'opacity-40 scale-95 ring-2 ring-blue-500 shadow-lg'
                            : 'hover:border-blue-300'
                        }`}
                      >
                        {/* Card Header & Drag Handle */}
                        <div className="flex items-start justify-between gap-2">
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                              item.type === 'quote'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {item.type}
                          </span>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-slate-400">
                              {new Date(item.created_at).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                            <GripVertical className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600 transition-colors" />
                          </div>
                        </div>

                        {/* Client & Company */}
                        <div>
                          <p className="font-bold text-xs text-slate-900 leading-tight">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-slate-600 font-medium truncate mt-0.5">
                            {item.company || 'Direct Client'}
                          </p>
                        </div>

                        {/* Scope & Budget */}
                        <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                          <p className="truncate font-medium">{item.scope}</p>
                          <p className="font-bold text-emerald-600 mt-0.5">{item.budget}</p>
                        </div>

                        {/* Stage Progression Buttons (Accessible Fallback) */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          {prevStage ? (
                            <button
                              onClick={() => handleStageMove(item.id, item.type, prevStage)}
                              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                              title={`Move to ${prevStage}`}
                            >
                              <ArrowLeft className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <div />
                          )}

                          <span className="text-[10px] text-slate-400 font-medium">
                            Stage {colIdx + 1}/5
                          </span>

                          {nextStage ? (
                            <button
                              onClick={() => handleStageMove(item.id, item.type, nextStage)}
                              className="p-1 rounded-md text-blue-600 hover:text-blue-800 hover:bg-blue-50 cursor-pointer"
                              title={`Advance to ${nextStage}`}
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <div />
                          )}
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
