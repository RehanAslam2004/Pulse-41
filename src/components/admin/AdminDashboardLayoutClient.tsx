'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
  Database,
  Bell,
  Search,
  Sparkles,
} from 'lucide-react'
import { PulseLogo } from '@/components/brand/PulseLogo'

interface AdminLayoutClientProps {
  children: React.ReactNode
  userEmail?: string
}

const NAV_ITEMS = [
  {
    name: 'Command Center',
    href: '/admin',
    icon: LayoutDashboard,
    badge: 'Overview',
  },
  {
    name: 'Inquiries & Leads',
    href: '/admin/leads',
    icon: Users,
    badge: 'CRM',
  },
  {
    name: 'Content CMS',
    href: '/admin/content',
    icon: FileText,
    badge: 'Live',
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    badge: 'Metrics',
  },
]

export function AdminDashboardLayoutClient({ children, userEmail = 'admin@pulse41.com' }: AdminLayoutClientProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    if (!confirm('Are you sure you want to sign out of the Pulse41 Admin Console?')) return
    setIsLoggingOut(true)
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (err) {
      console.error('Logout error:', err)
      setIsLoggingOut(false)
    }
  }

  const getPageTitle = () => {
    if (pathname === '/admin') return 'Executive Command Center'
    if (pathname.startsWith('/admin/leads')) return 'Inquiries & Leads CRM'
    if (pathname.startsWith('/admin/content')) return 'Headless Content Studio'
    if (pathname.startsWith('/admin/analytics')) return 'Business Intelligence & Metrics'
    return 'Admin Console'
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col lg:flex-row antialiased">
      {/* Mobile Top Header */}
      <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#0F172A] border-b border-slate-800 sticky top-0 z-50">
        <Link href="/admin" className="flex items-center gap-2">
          <PulseLogo height={16} dark />
          <span className="text-[10px] font-bold tracking-widest uppercase bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30">
            Admin
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#0F172A] border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo / Header Area */}
          <div className="p-6 border-b border-slate-800/80">
            <div className="flex items-center justify-between">
              <Link href="/admin" className="block">
                <PulseLogo height={18} dark />
              </Link>
              <span className="text-[10px] font-bold tracking-widest uppercase bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30">
                PROD
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Pulse41 Executive Console
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 py-2 text-[10px] font-semibold text-slate-500 tracking-wider uppercase">
              Management
            </div>

            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(item.href)
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                      isActive
                        ? 'bg-blue-500/20 text-blue-300'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {item.badge}
                  </span>
                </Link>
              )
            })}

            <div className="pt-4 px-3 py-2 text-[10px] font-semibold text-slate-500 tracking-wider uppercase">
              Public Interface
            </div>

            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="w-4 h-4 text-slate-400" />
                <span>View Public Site</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            </Link>
          </nav>
        </div>

        {/* Database & User Status Box at Bottom of Sidebar */}
        <div className="p-4 border-t border-slate-800/80 space-y-3">
          {/* PostgreSQL Status Indicator */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-blue-400" />
              <div className="text-[11px]">
                <p className="font-semibold text-slate-300">Supabase DB</p>
                <p className="text-[10px] text-slate-500">PostgreSQL Pooler</p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Live
            </span>
          </div>

          {/* User Account / Sign Out */}
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-xs text-white shadow-sm flex-shrink-0">
                P41
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-slate-200 truncate">{userEmail}</p>
                <p className="text-[10px] text-blue-400 font-medium">Administrator</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-[#0F172A]/70 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold text-white tracking-tight">{getPageTitle()}</h1>
            <span className="text-xs text-slate-500">|</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <span>Pulse41 Core</span>
              <ChevronRight className="w-3 h-3 text-slate-600" />
              <span className="text-slate-300 font-medium">
                {pathname.split('/')[2] ? pathname.split('/')[2].toUpperCase() : 'OVERVIEW'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>RLS Protected</span>
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700"
            >
              <LogOut className="w-3.5 h-3.5 text-slate-400" />
              <span>{isLoggingOut ? 'Signing Out...' : 'Sign Out'}</span>
            </button>
          </div>
        </header>

        {/* Dynamic Route Body */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
