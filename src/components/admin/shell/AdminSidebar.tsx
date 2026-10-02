'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Search,
  Bell,
  Users,
  Building2,
  Contact2,
  Calculator,
  Mail,
  Inbox,
  GitPullRequest,
  Layers,
  Sparkles,
  Cpu,
  Factory,
  Trophy,
  FileText,
  Quote,
  CreditCard,
  Briefcase,
  UserCheck,
  Image,
  FileCode,
  Palette,
  Settings,
  Shield,
  KeyRound,
  History,
  Activity,
  ChevronLeft,
  ChevronRight,
  Compass,
} from 'lucide-react'
import { PulseLogo } from '@/components/brand/PulseLogo'

interface NavItem {
  name: string
  href?: string
  icon: React.ElementType
  badge?: string
  action?: 'search'
}

interface NavSection {
  title: string
  items: NavItem[]
}

const SECTIONS: NavSection[] = [
  {
    title: 'WORKSPACE',
    items: [
      { name: 'Overview', href: '/admin', icon: LayoutDashboard },
      { name: 'Search', icon: Search, badge: '⌘K', action: 'search' },
      { name: 'Notifications', href: '/admin/notifications', icon: Bell },
    ],
  },
  {
    title: 'CRM & GROWTH',
    items: [
      { name: 'Leads', href: '/admin/leads', icon: Users },
      { name: 'Messages & Inquiries', href: '/admin/inquiries', icon: Inbox },
      { name: 'Organizations', href: '/admin/organizations', icon: Building2 },
      { name: 'Contacts', href: '/admin/contacts', icon: Contact2 },
      { name: 'Quote Requests', href: '/admin/quotes', icon: Calculator },
      { name: 'Newsletter', href: '/admin/newsletter', icon: Mail },
      { name: 'Pipeline', href: '/admin/pipeline', icon: GitPullRequest },
    ],
  },
  {
    title: 'CONTENT',
    items: [
      { name: 'Pages', href: '/admin/content/pages', icon: Compass },
      { name: 'Services', href: '/admin/content/services', icon: Cpu },
      { name: 'AI Solutions', href: '/admin/content/ai-solutions', icon: Sparkles },
      { name: 'Industries', href: '/admin/content/industries', icon: Factory },
      { name: 'Products & Solutions', href: '/admin/content/solutions', icon: Layers },
      { name: 'Case Studies', href: '/admin/content/case-studies', icon: Trophy },
      { name: 'Insights', href: '/admin/content/insights', icon: FileText },
      { name: 'Testimonials', href: '/admin/content/testimonials', icon: Quote },
      { name: 'Pricing', href: '/admin/content/pricing', icon: CreditCard },
    ],
  },
  {
    title: 'CAREERS',
    items: [
      { name: 'Open Positions', href: '/admin/careers/jobs', icon: Briefcase },
      { name: 'Applications', href: '/admin/careers/applications', icon: UserCheck },
    ],
  },
  {
    title: 'MEDIA',
    items: [
      { name: 'Media Library', href: '/admin/media', icon: Image },
      { name: 'Documents', href: '/admin/media/documents', icon: FileCode },
      { name: 'Brand Assets', href: '/admin/media/brand', icon: Palette },
    ],
  },
  {
    title: 'SYSTEM',
    items: [
      { name: 'Settings', href: '/admin/settings', icon: Settings },
      { name: 'Admin Users', href: '/admin/users', icon: Shield },
      { name: 'Roles & Permissions', href: '/admin/roles', icon: KeyRound },
      { name: 'Audit Log', href: '/admin/activity', icon: History },
      { name: 'System Health', href: '/admin/system-health', icon: Activity },
    ],
  },
]

export function AdminSidebar({
  mobileOpen,
  onCloseMobile,
  onOpenSearch,
}: {
  mobileOpen: boolean
  onCloseMobile: () => void
  onOpenSearch: () => void
}) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const isActive = (href?: string) => {
    if (!href) return false
    if (href === '/admin') return pathname === '/admin'
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/70 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      {/* Main Sidebar Element */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 bg-[#1E293B] text-slate-200 border-r border-slate-700/80 flex flex-col justify-between transition-all duration-200 ease-in-out lg:static ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${collapsed ? 'w-20' : 'w-64'}`}
      >
        <div className="flex flex-col h-full">
          {/* Top Brand Header */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700/80">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 overflow-hidden group"
              onClick={onCloseMobile}
            >
              <PulseLogo height={collapsed ? 18 : 15} dark iconOnly={collapsed} />
              {!collapsed && (
                <div className="flex flex-col border-l border-slate-700/80 pl-2.5 ml-1">
                  <span className="text-[11px] font-bold text-white tracking-wider uppercase leading-none">
                    Control
                  </span>
                  <span className="text-[9px] text-blue-400 font-medium tracking-tight mt-0.5 leading-none">
                    Ops Console
                  </span>
                </div>
              )}
            </Link>

            {/* Desktop Collapse Toggle */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 cursor-pointer"
              title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Nav Items List */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-700">
            {SECTIONS.map((section) => (
              <div key={section.title} className="space-y-1">
                {!collapsed ? (
                  <p className="px-3 text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-2">
                    {section.title}
                  </p>
                ) : (
                  <div className="h-2" />
                )}

                {section.items.map((item) => {
                  const active = isActive(item.href)
                  const Icon = item.icon

                  if (item.action === 'search') {
                    return (
                      <button
                        key={item.name}
                        onClick={() => {
                          onOpenSearch()
                          onCloseMobile()
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors cursor-pointer ${
                          collapsed ? 'justify-center' : ''
                        }`}
                        title={item.name}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-slate-400" />
                          {!collapsed && <span>{item.name}</span>}
                        </div>
                        {!collapsed && item.badge && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    )
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.href || '#'}
                      onClick={onCloseMobile}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        active
                          ? 'bg-blue-600/20 text-blue-400 font-semibold border-l-2 border-blue-500 rounded-l-none'
                          : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                      } ${collapsed ? 'justify-center' : ''}`}
                      title={item.name}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon
                          className={`w-4 h-4 ${
                            active ? 'text-blue-400' : 'text-slate-400'
                          }`}
                        />
                        {!collapsed && <span>{item.name}</span>}
                      </div>
                      {!collapsed && item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            ))}
          </nav>

          {/* Bottom Sidebar Status */}
          <div className="p-3 border-t border-slate-700/80 bg-slate-900/60">
            <div
              className={`flex items-center gap-2 text-[11px] text-slate-400 ${
                collapsed ? 'justify-center' : 'justify-between px-2'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {!collapsed && <span>Pulse41 Control v2.4</span>}
              </div>
              {!collapsed && (
                <Link
                  href="/"
                  target="_blank"
                  className="text-[10px] text-blue-400 hover:underline"
                >
                  Live Site ↗
                </Link>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
