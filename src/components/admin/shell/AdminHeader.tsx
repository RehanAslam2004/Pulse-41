'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import {
  Menu,
  Search,
  Command,
  Plus,
  ShieldCheck,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Activity,
  History,
} from 'lucide-react'
import { NotificationCenter } from './NotificationCenter'

export function AdminHeader({
  onOpenMobile,
  onOpenSearch,
  userEmail = 'admin@pulse41.com',
}: {
  onOpenMobile: () => void
  onOpenSearch: () => void
  userEmail?: string
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [profileOpen, setProfileOpen] = useState(false)
  const [quickCreateOpen, setQuickCreateOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  const profileRef = useRef<HTMLDivElement>(null)
  const quickRef = useRef<HTMLDivElement>(null)

  // Close menus on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false)
      }
      if (quickRef.current && !quickRef.current.contains(e.target as Node)) {
        setQuickCreateOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to log out of Pulse41 Control?')) return
    setLoggingOut(true)
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (err) {
      console.error('Logout error:', err)
      setLoggingOut(false)
    }
  }

  // Generate dynamic breadcrumb segment
  const getBreadcrumbTitle = () => {
    if (pathname === '/admin') return 'Overview'
    const parts = pathname.replace('/admin/', '').split('/')
    return parts
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1).replace(/-/g, ' '))
      .join(' · ')
  }

  return (
    <header className="h-16 bg-white border-b border-slate-200/90 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-2xs">
      {/* Left: Mobile Toggle + Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <Link
            href="/admin"
            className="font-bold text-slate-800 hover:text-blue-600 transition-colors"
          >
            Pulse41 Control
          </Link>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-500 truncate max-w-[180px] sm:max-w-none">
            {getBreadcrumbTitle()}
          </span>
        </div>
      </div>

      {/* Center: Global Search Bar */}
      <div className="flex-1 max-w-md hidden md:block">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-xs text-slate-400 hover:text-slate-600 transition-all cursor-pointer shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <span>Search leads, quotes, content, jobs...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono text-slate-500 shadow-2xs">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: Quick Actions, Telemetry, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Create Menu */}
        <div className="relative" ref={quickRef}>
          <button
            onClick={() => setQuickCreateOpen(!quickCreateOpen)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Create</span>
            <ChevronDown className="w-3 h-3 opacity-80" />
          </button>

          {quickCreateOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200 py-1 z-50 animate-in fade-in duration-100">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                New Publication
              </div>
              <Link
                href="/admin/content/insights?action=new"
                onClick={() => setQuickCreateOpen(false)}
                className="block px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
              >
                Insight / Article
              </Link>
              <Link
                href="/admin/content/case-studies?action=new"
                onClick={() => setQuickCreateOpen(false)}
                className="block px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
              >
                Case Study
              </Link>
              <Link
                href="/admin/careers/jobs?action=new"
                onClick={() => setQuickCreateOpen(false)}
                className="block px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
              >
                Job Requisition
              </Link>
              <div className="my-1 border-t border-slate-100" />
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                CRM & Growth
              </div>
              <Link
                href="/admin/leads?action=new"
                onClick={() => setQuickCreateOpen(false)}
                className="block px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
              >
                Lead Inquiry
              </Link>
              <Link
                href="/admin/organizations?action=new"
                onClick={() => setQuickCreateOpen(false)}
                className="block px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
              >
                Organization Account
              </Link>
            </div>
          )}
        </div>

        {/* Telemetry Indicator */}
        <Link
          href="/admin/system-health"
          className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 hover:bg-slate-100 transition-colors"
          title="Inspect Telemetry & System Health"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-slate-700">Healthy</span>
        </Link>

        {/* Mobile Search Button */}
        <button
          onClick={onOpenSearch}
          className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <NotificationCenter />

        {/* User Profile Menu */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="User profile options"
          >
            <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
              P41
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 leading-none">
                {userEmail.split('@')[0]}
              </span>
              <span className="text-[10px] text-blue-600 font-semibold leading-tight mt-0.5">
                Super Admin
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in duration-100">
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900 truncate">Administrator</p>
                <p className="text-[11px] text-slate-500 truncate mt-0.5">{userEmail}</p>
                <span className="inline-block mt-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Full Super Admin Rights
                </span>
              </div>

              <div className="py-1">
                <Link
                  href="/admin/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Platform Settings</span>
                </Link>
                <Link
                  href="/admin/activity"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                >
                  <History className="w-4 h-4 text-slate-400" />
                  <span>Audit Trail</span>
                </Link>
                <Link
                  href="/admin/system-health"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 font-medium"
                >
                  <Activity className="w-4 h-4 text-slate-400" />
                  <span>System Diagnostics</span>
                </Link>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 font-medium cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>{loggingOut ? 'Signing out...' : 'Sign Out'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
