'use client'

import { useEffect, useState } from 'react'

export interface NavSection {
  id: string
  label: string
}

interface StickyQuickNavProps {
  sections: NavSection[]
  title?: string
  variant?: 'dark' | 'light'
  className?: string
  isSticky?: boolean
}

export function StickyQuickNav({
  sections,
  title = 'Page Contents',
  variant = 'dark',
  className = '',
  isSticky = false,
}: StickyQuickNavProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || '')

  useEffect(() => {
    if (!sections.length) return

    const handleScroll = () => {
      const scrollPos = window.scrollY + 160

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el) {
          const elementTop = el.getBoundingClientRect().top + window.scrollY
          if (elementTop <= scrollPos) {
            setActiveId(sections[i].id)
            return
          }
        }
      }
      if (sections[0]) {
        setActiveId(sections[0].id)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const navHeight = 90
      const elementTop = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: Math.max(0, elementTop - navHeight),
        behavior: 'smooth',
      })
    }
  }

  const isLight = variant === 'light'

  return (
    <nav
      aria-label="Table of contents"
      className={`p-5 rounded-2xl backdrop-blur-md shadow-xl ${
        isSticky ? 'sticky top-24' : ''
      } ${
        isLight
          ? 'bg-white/95 border border-slate-200/90 shadow-slate-200/50'
          : 'bg-slate-900/70 border border-slate-800/80'
      } ${className}`}
    >
      <div
        className={`flex items-center gap-2 mb-4 pb-3 border-b ${
          isLight ? 'border-slate-100' : 'border-slate-800/60'
        }`}
      >
        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
        <span
          className={`text-xs font-bold tracking-wider uppercase ${
            isLight ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          {title}
        </span>
      </div>

      <ul className="space-y-1.5 text-sm">
        {sections.map((sec) => {
          const isActive = activeId === sec.id

          return (
            <li key={sec.id}>
              <button
                type="button"
                onClick={() => scrollTo(sec.id)}
                className={`w-full text-left py-2 px-3 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                  isActive
                    ? isLight
                      ? 'text-blue-600 bg-blue-50 font-bold border-l-2 border-blue-600 pl-2.5'
                      : 'text-blue-400 bg-blue-500/10 font-semibold border-l-2 border-blue-500 pl-2.5'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span className="truncate">{sec.label}</span>
                <span
                  className={`text-[10px] transition-opacity duration-200 ${
                    isActive
                      ? isLight
                        ? 'opacity-100 text-blue-600 font-bold'
                        : 'opacity-100 text-blue-400'
                      : 'opacity-0 group-hover:opacity-60 text-slate-400'
                  }`}
                >
                  &rarr;
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
