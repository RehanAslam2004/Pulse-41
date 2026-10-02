'use client'

import React, { useState, useEffect } from 'react'
import {
  History,
  RotateCcw,
  Clock,
  User,
  CheckCircle2,
  X,
  AlertCircle,
  FileText,
} from 'lucide-react'

interface Revision {
  id: string
  version_number: number
  author_email: string
  summary: string | null
  created_at: string
  snapshot: any
}

interface RevisionHistoryDrawerProps {
  isOpen: boolean
  onClose: () => void
  entityId: string
  entityTitle: string
  onRestored: (newSnapshot: any) => void
}

export function RevisionHistoryDrawer({
  isOpen,
  onClose,
  entityId,
  entityTitle,
  onRestored,
}: RevisionHistoryDrawerProps) {
  const [revisions, setRevisions] = useState<Revision[]>([])
  const [loading, setLoading] = useState(false)
  const [restoringId, setRestoringId] = useState<string | null>(null)
  const [selectedRev, setSelectedRev] = useState<Revision | null>(null)

  useEffect(() => {
    if (!isOpen || !entityId) return
    const fetchRevisions = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/admin/content/revisions?id=${entityId}`)
        if (res.ok) {
          const data = await res.json()
          setRevisions(data.revisions || [])
          if (data.revisions?.length > 0) {
            setSelectedRev(data.revisions[0])
          }
        }
      } catch (err) {
        console.error('Failed to load revisions:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchRevisions()
  }, [isOpen, entityId])

  if (!isOpen) return null

  const handleRestore = async (rev: Revision) => {
    if (
      !confirm(
        `Are you sure you want to restore Version ${rev.version_number}? Current uncommitted changes will be replaced.`
      )
    )
      return

    setRestoringId(rev.id)
    try {
      const res = await fetch('/api/admin/content/revisions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ revisionId: rev.id }),
      })

      const data = await res.json()
      if (res.ok) {
        onRestored(data.data)
        onClose()
      } else {
        alert(data.error || 'Failed to restore revision')
      }
    } catch (err) {
      console.error('Restore error:', err)
    } finally {
      setRestoringId(null)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-950/40 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-150 p-6 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" />
              <div>
                <h2 className="text-base font-bold text-slate-900">Revision History</h2>
                <p className="text-xs text-slate-500 truncate max-w-[280px]">
                  {entityTitle}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="py-12 text-center text-xs text-slate-400">
                Loading version history...
              </div>
            ) : revisions.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No past revisions recorded yet
              </div>
            ) : (
              <div className="space-y-3">
                {revisions.map((rev, idx) => (
                  <div
                    key={rev.id}
                    className={`p-4 rounded-2xl border transition-all text-xs ${
                      selectedRev?.id === rev.id
                        ? 'border-blue-500 bg-blue-50/30'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-2xs">
                          v{rev.version_number}
                        </span>
                        {idx === 0 && (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Current Live
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {new Date(rev.created_at).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-slate-700 font-medium leading-relaxed">
                      {rev.summary || 'Content snapshot saved.'}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>{rev.author_email}</span>
                      </span>

                      {idx > 0 && (
                        <button
                          onClick={() => handleRestore(rev)}
                          disabled={restoringId === rev.id}
                          className="px-2.5 py-1 rounded-lg bg-white hover:bg-blue-50 border border-slate-200 text-blue-600 font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>{restoringId === rev.id ? 'Restoring...' : 'Restore This Version'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Pulse41 Control · Immutable Content Audit</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
