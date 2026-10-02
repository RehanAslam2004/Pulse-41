'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import {
  Bell,
  CheckCheck,
  Users,
  Calculator,
  UserCheck,
  Sparkles,
  Info,
  ExternalLink,
  Clock,
} from 'lucide-react'

export interface AdminNotification {
  id: string
  title: string
  message: string
  type: string
  link: string | null
  is_read: boolean
  created_at: string
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export function NotificationsPageClient({
  initialNotifications,
}: {
  initialNotifications: AdminNotification[]
}) {
  const [notifications, setNotifications] = useState<AdminNotification[]>(initialNotifications)
  const [filterType, setFilterType] = useState<string>('all')

  const unreadCount = notifications.filter((n) => !n.is_read).length

  const handleMarkAllRead = async () => {
    try {
      await fetch('/api/admin/notifications?action=mark-all-read', {
        method: 'POST',
      })
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
    } catch (err) {
      console.error('Failed to mark all as read', err)
    }
  }

  const handleMarkOneRead = async (id: string) => {
    try {
      await fetch(`/api/admin/notifications?id=${id}`, {
        method: 'PATCH',
      })
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      )
    } catch (err) {
      console.error('Failed to mark notification read', err)
    }
  }

  const filtered = notifications.filter((n) => {
    if (filterType === 'all') return true
    if (filterType === 'unread') return !n.is_read
    return n.type === filterType
  })

  const getIcon = (type: string) => {
    switch (type) {
      case 'lead':
        return <Users className="w-4 h-4 text-blue-600" />
      case 'quote':
        return <Calculator className="w-4 h-4 text-indigo-600" />
      case 'application':
        return <UserCheck className="w-4 h-4 text-emerald-600" />
      case 'content':
        return <Sparkles className="w-4 h-4 text-amber-600" />
      default:
        return <Info className="w-4 h-4 text-slate-600" />
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Notification Center
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Real-time operational alerts for leads, quote inquiries, candidate applications, and system audits.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 shadow-xs transition"
          >
            <CheckCheck className="w-4 h-4 text-blue-600" />
            Mark all as read ({unreadCount})
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'unread', label: `Unread (${unreadCount})` },
          { id: 'lead', label: 'Leads' },
          { id: 'quote', label: 'Quotes' },
          { id: 'application', label: 'Talent' },
          { id: 'system', label: 'System' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filterType === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification List */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Bell className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900">No notifications</h3>
          <p className="mt-1 text-xs text-slate-500">
            You are completely caught up with all operational updates.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-100 shadow-xs overflow-hidden">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => !item.is_read && handleMarkOneRead(item.id)}
              className={`p-4 flex items-start justify-between gap-4 transition hover:bg-slate-50/80 ${
                !item.is_read ? 'bg-blue-50/30' : ''
              }`}
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  {getIcon(item.type)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm font-semibold ${
                        !item.is_read ? 'text-slate-900 font-bold' : 'text-slate-700'
                      }`}
                    >
                      {item.title}
                    </h4>
                    {!item.is_read && (
                      <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    {item.message}
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-[11px] text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(item.created_at)}
                    </span>
                    <span className="capitalize font-medium text-slate-500">
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>

              {item.link && (
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition flex-shrink-0"
                >
                  <span>View</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
