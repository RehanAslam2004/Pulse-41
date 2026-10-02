'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { C } from '@/lib/design/tokens'
import { PulseLogo } from '@/components/brand/PulseLogo'
import {
  ChevronDown,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react'

type DropdownKey = 'services' | 'solutions' | 'industries' | 'company' | null

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const navRef = useRef<HTMLDivElement | null>(null)

  // Detect scroll for subtle shadow, background elevation, and auto-close dropdowns
  useEffect(() => {
    let lastY = typeof window !== 'undefined' ? window.scrollY : 0
    const handleScroll = () => {
      setScrolled(window.scrollY > 15)
      if (Math.abs(window.scrollY - lastY) > 25) {
        setActiveDropdown(null)
        lastY = window.scrollY
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setActiveDropdown(null)
    setMobileMenuOpen(false)
    setMobileAccordion(null)
  }, [pathname])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null)
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Intent-aware hover handlers
  const handleMouseEnter = (key: DropdownKey) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setActiveDropdown(key)
  }

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 180)
  }

  const isCurrent = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  // Do not render marketing Navbar on administrative portals
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return (
    <>
      <header
        ref={navRef}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: 72,
          background: scrolled ? 'rgba(255, 255, 255, 0.98)' : '#FFFFFF',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${scrolled ? 'rgba(203, 213, 225, 0.8)' : 'rgba(226, 232, 240, 0.75)'}`,
          boxShadow: scrolled ? '0 4px 20px -2px rgba(15, 23, 42, 0.05)' : 'none',
          transition: 'all 0.25s ease',
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            padding: '0 32px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          {/* ── 1. LOGO & BRAND ────────────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 36, flexShrink: 0 }}>
            <Link
              href="/"
              onClick={() => setActiveDropdown(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <PulseLogo height={18} />
            </Link>

            {/* ── 2. DESKTOP NAV ITEMS (HYBRID CLICK + HOVER) ────────────── */}
            <nav
              className="p41-desktop-nav"
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: 72,
                gap: 4,
                flexWrap: 'nowrap',
              }}
            >
              {/* SERVICES */}
              <div
                onMouseEnter={() => handleMouseEnter('services')}
                style={{ height: '100%', display: 'flex', alignItems: 'center', flexShrink: 0 }}
              >
                <Link
                  href="/services"
                  style={{
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    fontSize: 14,
                    fontWeight: isCurrent('/services') || isCurrent('/ai-solutions') || activeDropdown === 'services' ? 700 : 500,
                    color: isCurrent('/services') || isCurrent('/ai-solutions') || activeDropdown === 'services' ? C.navy : '#475569',
                    padding: '0 4px 0 14px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    borderBottom: isCurrent('/services') || isCurrent('/ai-solutions') || activeDropdown === 'services'
                      ? `2px solid ${C.blue}`
                      : '2px solid transparent',
                    transition: 'color 0.15s, border-color 0.15s',
                  }}
                  className="hover:text-blue-600"
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveDropdown(activeDropdown === 'services' ? null : 'services')
                  }}
                  aria-label="Toggle Services menu"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '6px 10px 6px 2px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: isCurrent('/services') || isCurrent('/ai-solutions') || activeDropdown === 'services'
                      ? `2px solid ${C.blue}`
                      : '2px solid transparent',
                  }}
                >
                  <ChevronDown
                    size={14}
                    color={activeDropdown === 'services' ? C.blue : '#94A3B8'}
                    style={{
                      transform: activeDropdown === 'services' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </button>
              </div>

              {/* SOLUTIONS */}
              <div
                onMouseEnter={() => handleMouseEnter('solutions')}
                style={{ height: '100%', display: 'flex', alignItems: 'center', flexShrink: 0 }}
              >
                <Link
                  href="/solutions"
                  style={{
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    fontSize: 14,
                    fontWeight: isCurrent('/solutions') || activeDropdown === 'solutions' ? 700 : 500,
                    color: isCurrent('/solutions') || activeDropdown === 'solutions' ? C.navy : '#475569',
                    padding: '0 4px 0 14px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    borderBottom: isCurrent('/solutions') || activeDropdown === 'solutions'
                      ? `2px solid ${C.blue}`
                      : '2px solid transparent',
                    transition: 'color 0.15s, border-color 0.15s',
                  }}
                  className="hover:text-blue-600"
                >
                  Solutions
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')
                  }}
                  aria-label="Toggle Solutions menu"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '6px 10px 6px 2px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: isCurrent('/solutions') || activeDropdown === 'solutions'
                      ? `2px solid ${C.blue}`
                      : '2px solid transparent',
                  }}
                >
                  <ChevronDown
                    size={14}
                    color={activeDropdown === 'solutions' ? C.blue : '#94A3B8'}
                    style={{
                      transform: activeDropdown === 'solutions' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </button>
              </div>

              {/* INDUSTRIES */}
              <div
                onMouseEnter={() => handleMouseEnter('industries')}
                style={{ height: '100%', display: 'flex', alignItems: 'center', flexShrink: 0 }}
              >
                <Link
                  href="/industries"
                  style={{
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    fontSize: 14,
                    fontWeight: isCurrent('/industries') || activeDropdown === 'industries' ? 700 : 500,
                    color: isCurrent('/industries') || activeDropdown === 'industries' ? C.navy : '#475569',
                    padding: '0 4px 0 14px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    borderBottom: isCurrent('/industries') || activeDropdown === 'industries'
                      ? `2px solid ${C.blue}`
                      : '2px solid transparent',
                    transition: 'color 0.15s, border-color 0.15s',
                  }}
                  className="hover:text-blue-600"
                >
                  Industries
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveDropdown(activeDropdown === 'industries' ? null : 'industries')
                  }}
                  aria-label="Toggle Industries menu"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '6px 10px 6px 2px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: isCurrent('/industries') || activeDropdown === 'industries'
                      ? `2px solid ${C.blue}`
                      : '2px solid transparent',
                  }}
                >
                  <ChevronDown
                    size={14}
                    color={activeDropdown === 'industries' ? C.blue : '#94A3B8'}
                    style={{
                      transform: activeDropdown === 'industries' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </button>
              </div>

              {/* COMPANY */}
              <div
                onMouseEnter={() => handleMouseEnter('company')}
                style={{ height: '100%', display: 'flex', alignItems: 'center', flexShrink: 0 }}
              >
                <Link
                  href="/about"
                  style={{
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    fontSize: 14,
                    fontWeight: isCurrent('/about') || isCurrent('/careers') || isCurrent('/insights') || activeDropdown === 'company' ? 700 : 500,
                    color: isCurrent('/about') || isCurrent('/careers') || isCurrent('/insights') || activeDropdown === 'company' ? C.navy : '#475569',
                    padding: '0 4px 0 14px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    borderBottom: isCurrent('/about') || isCurrent('/careers') || isCurrent('/insights') || activeDropdown === 'company'
                      ? `2px solid ${C.blue}`
                      : '2px solid transparent',
                    transition: 'color 0.15s, border-color 0.15s',
                  }}
                  className="hover:text-blue-600"
                >
                  Company
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveDropdown(activeDropdown === 'company' ? null : 'company')
                  }}
                  aria-label="Toggle Company menu"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '6px 10px 6px 2px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: isCurrent('/about') || isCurrent('/careers') || isCurrent('/insights') || activeDropdown === 'company'
                      ? `2px solid ${C.blue}`
                      : '2px solid transparent',
                  }}
                >
                  <ChevronDown
                    size={14}
                    color={activeDropdown === 'company' ? C.blue : '#94A3B8'}
                    style={{
                      transform: activeDropdown === 'company' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  />
                </button>
              </div>

              {/* PRICING (DIRECT LINK) */}
              <Link
                href="/pricing"
                onClick={() => setActiveDropdown(null)}
                style={{
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  fontSize: 14,
                  fontWeight: isCurrent('/pricing') ? 700 : 500,
                  color: isCurrent('/pricing') ? C.navy : '#475569',
                  padding: '0 14px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  borderBottom: isCurrent('/pricing') ? `2px solid ${C.blue}` : '2px solid transparent',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
                className="hover:text-blue-600"
              >
                Pricing
              </Link>

              {/* CASE STUDIES (DIRECT LINK) */}
              <Link
                href="/case-studies"
                onClick={() => setActiveDropdown(null)}
                style={{
                  fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  fontSize: 14,
                  fontWeight: isCurrent('/case-studies') ? 700 : 500,
                  color: isCurrent('/case-studies') ? C.navy : '#475569',
                  padding: '0 14px',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  borderBottom: isCurrent('/case-studies') ? `2px solid ${C.blue}` : '2px solid transparent',
                  transition: 'color 0.15s, border-color 0.15s',
                }}
                className="hover:text-blue-600"
              >
                Case Studies
              </Link>
            </nav>
          </div>

          {/* ── 3. RIGHT ACTION AREA (LOGIN + CONSULT CTA) ─────────────── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
            {/* Login button next to consult */}
            <Link
              href="/admin/login"
              style={{
                fontFamily: 'var(--font-inter, Inter, sans-serif)',
                fontSize: 14,
                fontWeight: 600,
                color: '#1E293B',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: 8,
                transition: 'color 0.15s, background-color 0.15s',
                display: 'inline-flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
              }}
              className="hover:text-blue-600 hover:bg-slate-100"
            >
              Login
            </Link>

            {/* Primary CTA */}
            <Link
              href="/contact"
              className="btn-primary"
              style={{
                fontSize: 13,
                fontWeight: 600,
                padding: '0 20px',
                height: 40,
                borderRadius: 8,
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 2px 10px rgba(59, 130, 246, 0.25)',
                transition: 'all 0.2s ease',
              }}
            >
              Consult an Architect <ArrowRight size={14} />
            </Link>

            {/* Hamburger for mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="p41-mobile-toggle"
              aria-label="Toggle navigation menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                color: C.navy,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* ── 4. SAFEPAY-STYLE MEGA-MENU DROPDOWN ─────────────────────── */}
        {activeDropdown && (
          <>
            {/* Backdrop */}
            <div
              style={{
                position: 'fixed',
                top: 72,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(15, 23, 42, 0.2)',
                backdropFilter: 'blur(3px)',
                WebkitBackdropFilter: 'blur(3px)',
                zIndex: 205,
              }}
              onClick={() => setActiveDropdown(null)}
            />

            {/* Dropdown Card */}
            <div
              onMouseEnter={() => handleMouseEnter(activeDropdown)}
              onMouseLeave={handleMouseLeave}
              style={{
                position: 'absolute',
                top: 72,
                left: 0,
                right: 0,
                background: '#FFFFFF',
                borderBottom: '1px solid rgba(226, 232, 240, 0.9)',
                boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
                zIndex: 210,
                animation: 'safepay-nav-slide 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <div
                style={{
                  maxWidth: 1200,
                  margin: '0 auto',
                  padding: '38px 40px 42px',
                }}
              >
                {/* ── SERVICES DROPDOWN ──────────────────────────────── */}
                {activeDropdown === 'services' && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.15fr 1.35fr 1.35fr',
                      gap: 52,
                      alignItems: 'start',
                    }}
                  >
                    {/* Left Column: Page Overview & Action */}
                    <div style={{ paddingRight: 12 }}>
                      <h3
                        style={{
                          fontSize: 28,
                          fontWeight: 800,
                          color: C.navy,
                          letterSpacing: '-0.025em',
                          margin: '0 0 12px',
                        }}
                      >
                        Services
                      </h3>
                      <p
                        style={{
                          fontSize: 14,
                          color: '#64748B',
                          lineHeight: 1.65,
                          margin: '0 0 24px',
                        }}
                      >
                        End-to-end software engineering, applied AI, platform architecture, and cybersecurity built to scale across global markets.
                      </p>
                      <Link
                        href="/services"
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          fontSize: 13,
                          fontWeight: 700,
                          color: C.blue,
                          textDecoration: 'none',
                          padding: '10px 18px',
                          borderRadius: 8,
                          background: '#EFF6FF',
                          border: '1px solid rgba(59, 130, 246, 0.2)',
                          transition: 'all 0.2s ease',
                        }}
                        className="hover:bg-blue-600 hover:text-white group"
                      >
                        Explore Services Overview
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Middle Column: Core Engineering */}
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: '#94A3B8',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          marginBottom: 16,
                        }}
                      >
                        Core Engineering
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        <Link
                          href="/ai-solutions"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            AI & Intelligent Automation
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Enterprise RAG, document intelligence & workflow agents with human oversight
                          </div>
                        </Link>

                        <Link
                          href="/services/software-engineering"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            Software & Product Engineering
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Fit-for-purpose web & mobile platforms, resilient microservices, and APIs
                          </div>
                        </Link>

                        <Link
                          href="/services/cloud-devops"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            Cloud & Platform Engineering
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Reliable releases, Kubernetes clusters, multi-region AWS/Azure, and FinOps
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Specialized Practices */}
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: '#94A3B8',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          marginBottom: 16,
                        }}
                      >
                        Specialized Practices
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        <Link
                          href="/services/cybersecurity"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            Cybersecurity & Digital Trust
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Reduced attack exposure, compliance readiness, and zero-trust safeguards
                          </div>
                        </Link>

                        <Link
                          href="/services/data-bi"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            Data & Business Intelligence
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Data pipelines, analytics warehouses, and executive intelligence dashboards
                          </div>
                        </Link>

                        <Link
                          href="/services/consulting"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            Consulting & Assurance
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Technical architecture reviews, delivery governance, and legacy modernization
                          </div>
                        </Link>

                        <div style={{ paddingTop: 8, borderTop: '1px solid rgba(226, 232, 240, 0.7)' }}>
                          <Link
                            href="/services"
                            onClick={() => setActiveDropdown(null)}
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: C.blue,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                            }}
                            className="hover:underline"
                          >
                            View all 8 engineering practices →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── SOLUTIONS DROPDOWN ─────────────────────────────── */}
                {activeDropdown === 'solutions' && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.15fr 1.35fr 1.35fr',
                      gap: 52,
                      alignItems: 'start',
                    }}
                  >
                    {/* Left Column: Page Overview & Action */}
                    <div style={{ paddingRight: 12 }}>
                      <h3
                        style={{
                          fontSize: 28,
                          fontWeight: 800,
                          color: C.navy,
                          letterSpacing: '-0.025em',
                          margin: '0 0 12px',
                        }}
                      >
                        Solutions
                      </h3>
                      <p
                        style={{
                          fontSize: 14,
                          color: '#64748B',
                          lineHeight: 1.65,
                          margin: '0 0 24px',
                        }}
                      >
                        Modular, production-ready software suites engineered to accelerate time-to-market and streamline enterprise operations.
                      </p>
                      <Link
                        href="/solutions"
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          fontSize: 13,
                          fontWeight: 700,
                          color: C.blue,
                          textDecoration: 'none',
                          padding: '10px 18px',
                          borderRadius: 8,
                          background: '#EFF6FF',
                          border: '1px solid rgba(59, 130, 246, 0.2)',
                          transition: 'all 0.2s ease',
                        }}
                        className="hover:bg-blue-600 hover:text-white group"
                      >
                        Explore Solutions Suite
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Middle Column: Operations & Platforms */}
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: '#94A3B8',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          marginBottom: 16,
                        }}
                      >
                        Operations & Platforms
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        <Link
                          href="/solutions/pulse-core"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            PulseCore
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Modern corporate digital presence, structured CMS, and multi-region web architecture
                          </div>
                        </Link>

                        <Link
                          href="/solutions/pulse-engine"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            PulseEngine
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Bespoke SaaS, portal applications, and enterprise workflow engines
                          </div>
                        </Link>

                        <Link
                          href="/solutions/pulse-desk-ai"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            PulseDesk
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            AI-assisted service desk, intelligent ticket routing, and conversational resolution
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Commerce & Trust */}
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: '#94A3B8',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          marginBottom: 16,
                        }}
                      >
                        Commerce & Trust
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        <Link
                          href="/solutions/pulse-store"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            PulseStore
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            High-conversion e-commerce storefronts, stock synchronization, and payment gateways
                          </div>
                        </Link>

                        <Link
                          href="/solutions/pulse-cert"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            PulseCert
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Automated digital credentialing, verified certificates, and compliance tracking
                          </div>
                        </Link>

                        <div style={{ paddingTop: 8, borderTop: '1px solid rgba(226, 232, 240, 0.7)' }}>
                          <Link
                            href="/solutions"
                            onClick={() => setActiveDropdown(null)}
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: C.blue,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                            }}
                            className="hover:underline"
                          >
                            View all 10 platform suites →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── INDUSTRIES DROPDOWN ────────────────────────────── */}
                {activeDropdown === 'industries' && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.15fr 1.35fr 1.35fr',
                      gap: 52,
                      alignItems: 'start',
                    }}
                  >
                    {/* Left Column: Page Overview & Action */}
                    <div style={{ paddingRight: 12 }}>
                      <h3
                        style={{
                          fontSize: 28,
                          fontWeight: 800,
                          color: C.navy,
                          letterSpacing: '-0.025em',
                          margin: '0 0 12px',
                        }}
                      >
                        Industries
                      </h3>
                      <p
                        style={{
                          fontSize: 14,
                          color: '#64748B',
                          lineHeight: 1.65,
                          margin: '0 0 24px',
                        }}
                      >
                        Domain-tailored technology solutions engineered for strict security, international compliance, and high operating velocity.
                      </p>
                      <Link
                        href="/industries"
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          fontSize: 13,
                          fontWeight: 700,
                          color: C.blue,
                          textDecoration: 'none',
                          padding: '10px 18px',
                          borderRadius: 8,
                          background: '#EFF6FF',
                          border: '1px solid rgba(59, 130, 246, 0.2)',
                          transition: 'all 0.2s ease',
                        }}
                        className="hover:bg-blue-600 hover:text-white group"
                      >
                        Explore All Industries
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Middle Column: Enterprise & Financial */}
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: '#94A3B8',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          marginBottom: 16,
                        }}
                      >
                        Enterprise & Financial
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        <Link
                          href="/industries"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            Technology & SaaS
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Multi-tenant platforms, high-throughput APIs, and developer tool ecosystems
                          </div>
                        </Link>

                        <Link
                          href="/industries"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            Financial Services & FinTech
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            PCI-DSS compliant architectures, ledger engines, and payment orchestrations
                          </div>
                        </Link>

                        <Link
                          href="/industries"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            Professional & Legal Services
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Confidential client portals, automated timesheet billing, and document intelligence
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Consumer & Specialized */}
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: '#94A3B8',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          marginBottom: 16,
                        }}
                      >
                        Consumer & Specialized
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        <Link
                          href="/industries"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            Retail & E-commerce
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Omnichannel inventory, automated fulfillment sync, and international checkout
                          </div>
                        </Link>

                        <Link
                          href="/industries"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            Healthcare & Care Services
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            HIPAA-ready clinical workflows, patient record portals, and telemetry data
                          </div>
                        </Link>

                        <div style={{ paddingTop: 8, borderTop: '1px solid rgba(226, 232, 240, 0.7)' }}>
                          <Link
                            href="/industries"
                            onClick={() => setActiveDropdown(null)}
                            style={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: C.blue,
                              textDecoration: 'none',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 6,
                            }}
                            className="hover:underline"
                          >
                            Explore all 10 industry sectors →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── COMPANY DROPDOWN ───────────────────────────────── */}
                {activeDropdown === 'company' && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1.15fr 1.35fr 1.35fr',
                      gap: 52,
                      alignItems: 'start',
                    }}
                  >
                    {/* Left Column: Page Overview & Action */}
                    <div style={{ paddingRight: 12 }}>
                      <h3
                        style={{
                          fontSize: 28,
                          fontWeight: 800,
                          color: C.navy,
                          letterSpacing: '-0.025em',
                          margin: '0 0 12px',
                        }}
                      >
                        About Pulse41
                      </h3>
                      <p
                        style={{
                          fontSize: 14,
                          color: '#64748B',
                          lineHeight: 1.65,
                          margin: '0 0 24px',
                        }}
                      >
                        A technology and digital-growth partner combining software engineering, applied AI, and disciplined delivery for international enterprises.
                      </p>
                      <Link
                        href="/about"
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          fontSize: 13,
                          fontWeight: 700,
                          color: C.blue,
                          textDecoration: 'none',
                          padding: '10px 18px',
                          borderRadius: 8,
                          background: '#EFF6FF',
                          border: '1px solid rgba(59, 130, 246, 0.2)',
                          transition: 'all 0.2s ease',
                        }}
                        className="hover:bg-blue-600 hover:text-white group"
                      >
                        About Our Team & Principles
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    {/* Middle Column: About Pulse41 */}
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: '#94A3B8',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          marginBottom: 16,
                        }}
                      >
                        About Pulse41
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        <Link
                          href="/about"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            Executive Direction & Leadership
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Our leadership team, offshore delivery positioning, and technical standards
                          </div>
                        </Link>

                        <Link
                          href="/careers"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            Careers & Open Roles
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Join our senior engineering and AI pods in Pakistan & Remote
                          </div>
                        </Link>

                        <Link
                          href="/contact"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            Contact Us
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Start a project discussion or request technical advisory
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Right Column: Knowledge & Governance */}
                    <div>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          color: '#94A3B8',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          marginBottom: 16,
                        }}
                      >
                        Knowledge & Legal
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                        <Link
                          href="/insights"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            Insights & Engineering Blog
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Global digital benchmark reports, AI adoption guides, and architecture analysis
                          </div>
                        </Link>

                        <Link
                          href="/privacy"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            Privacy Policy
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Enterprise data safeguards, NDA adherence, and GDPR governance
                          </div>
                        </Link>

                        <Link
                          href="/terms"
                          onClick={() => setActiveDropdown(null)}
                          className="group"
                          style={{ textDecoration: 'none', display: 'block' }}
                        >
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#2563EB', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                            Terms & Conditions
                            <ArrowRight size={13} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div style={{ fontSize: 13, color: '#64748B', lineHeight: 1.45 }}>
                            Service terms, statements of work, and 100% IP transfer on payment
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </header>

      {/* ── 5. MOBILE NAVIGATION DRAWER ──────────────────────────────── */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 72,
            background: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 199,
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: 400,
              background: '#FFFFFF',
              overflowY: 'auto',
              padding: '24px 24px 48px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              boxShadow: '-8px 0 32px rgba(15, 23, 42, 0.15)',
            }}
          >
            {/* Direct Home Link */}
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: C.navy,
                textDecoration: 'none',
                padding: '12px 0',
                borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
              }}
            >
              Home
            </Link>

            {/* Accordion: Services */}
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
                }}
              >
                <Link
                  href="/services"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: C.navy,
                    textDecoration: 'none',
                    padding: '14px 0',
                    flex: 1,
                  }}
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileAccordion(mobileAccordion === 'services' ? null : 'services')}
                  aria-label="Toggle Services submenu"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '14px',
                    color: '#64748B',
                  }}
                >
                  <ChevronDown
                    size={16}
                    style={{
                      transform: mobileAccordion === 'services' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  />
                </button>
              </div>
              {mobileAccordion === 'services' && (
                <div style={{ padding: '10px 0 14px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Link
                    href="/services"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 14, fontWeight: 700, color: C.blue, textDecoration: 'none' }}
                  >
                    Explore Services Overview →
                  </Link>
                  <Link
                    href="/ai-solutions"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 14, fontWeight: 600, color: '#2563EB', textDecoration: 'none' }}
                  >
                    AI & Intelligent Automation
                  </Link>
                  <Link
                    href="/services/software-engineering"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 13, color: '#475569', textDecoration: 'none' }}
                  >
                    Software & Product Engineering
                  </Link>
                  <Link
                    href="/services/cloud-devops"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 13, color: '#475569', textDecoration: 'none' }}
                  >
                    Cloud & Platform Engineering
                  </Link>
                  <Link
                    href="/services/cybersecurity"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 13, color: '#475569', textDecoration: 'none' }}
                  >
                    Cybersecurity & Digital Trust
                  </Link>
                </div>
              )}
            </div>

            {/* Accordion: Solutions */}
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
                }}
              >
                <Link
                  href="/solutions"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: C.navy,
                    textDecoration: 'none',
                    padding: '14px 0',
                    flex: 1,
                  }}
                >
                  Solutions
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileAccordion(mobileAccordion === 'solutions' ? null : 'solutions')}
                  aria-label="Toggle Solutions submenu"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '14px',
                    color: '#64748B',
                  }}
                >
                  <ChevronDown
                    size={16}
                    style={{
                      transform: mobileAccordion === 'solutions' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  />
                </button>
              </div>
              {mobileAccordion === 'solutions' && (
                <div style={{ padding: '10px 0 14px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Link
                    href="/solutions"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 14, fontWeight: 700, color: C.blue, textDecoration: 'none' }}
                  >
                    Explore Solutions Suite →
                  </Link>
                  <Link
                    href="/solutions/pulse-core"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 14, fontWeight: 600, color: '#2563EB', textDecoration: 'none' }}
                  >
                    PulseCore (Digital Presence)
                  </Link>
                  <Link
                    href="/solutions/pulse-engine"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 14, fontWeight: 600, color: '#2563EB', textDecoration: 'none' }}
                  >
                    PulseEngine (Bespoke Software)
                  </Link>
                  <Link
                    href="/solutions/pulse-desk-ai"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 14, fontWeight: 600, color: '#2563EB', textDecoration: 'none' }}
                  >
                    PulseDesk (Service Operations)
                  </Link>
                  <Link
                    href="/solutions/pulse-store"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 14, fontWeight: 600, color: '#2563EB', textDecoration: 'none' }}
                  >
                    PulseStore (E-commerce)
                  </Link>
                </div>
              )}
            </div>

            {/* Accordion: Industries */}
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
                }}
              >
                <Link
                  href="/industries"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: C.navy,
                    textDecoration: 'none',
                    padding: '14px 0',
                    flex: 1,
                  }}
                >
                  Industries
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileAccordion(mobileAccordion === 'industries' ? null : 'industries')}
                  aria-label="Toggle Industries submenu"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '14px',
                    color: '#64748B',
                  }}
                >
                  <ChevronDown
                    size={16}
                    style={{
                      transform: mobileAccordion === 'industries' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  />
                </button>
              </div>
              {mobileAccordion === 'industries' && (
                <div style={{ padding: '10px 0 14px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Link
                    href="/industries"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 14, fontWeight: 700, color: C.blue, textDecoration: 'none' }}
                  >
                    Explore All Industries →
                  </Link>
                  <Link
                    href="/industries"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 13, color: '#475569', textDecoration: 'none' }}
                  >
                    Technology & SaaS
                  </Link>
                  <Link
                    href="/industries"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 13, color: '#475569', textDecoration: 'none' }}
                  >
                    Financial Services & FinTech
                  </Link>
                  <Link
                    href="/industries"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 13, color: '#475569', textDecoration: 'none' }}
                  >
                    Retail & E-commerce
                  </Link>
                  <Link
                    href="/industries"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 13, color: '#475569', textDecoration: 'none' }}
                  >
                    Healthcare & Care Services
                  </Link>
                </div>
              )}
            </div>

            {/* Accordion: Company */}
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
                }}
              >
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: C.navy,
                    textDecoration: 'none',
                    padding: '14px 0',
                    flex: 1,
                  }}
                >
                  Company
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileAccordion(mobileAccordion === 'company' ? null : 'company')}
                  aria-label="Toggle Company submenu"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '14px',
                    color: '#64748B',
                  }}
                >
                  <ChevronDown
                    size={16}
                    style={{
                      transform: mobileAccordion === 'company' ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  />
                </button>
              </div>
              {mobileAccordion === 'company' && (
                <div style={{ padding: '10px 0 14px 12px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 14, fontWeight: 700, color: C.blue, textDecoration: 'none' }}
                  >
                    About Pulse41 Overview →
                  </Link>
                  <Link
                    href="/careers"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 13, color: '#475569', textDecoration: 'none' }}
                  >
                    Careers & Open Positions
                  </Link>
                  <Link
                    href="/insights"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 13, color: '#475569', textDecoration: 'none' }}
                  >
                    Insights & Engineering Blog
                  </Link>
                  <Link
                    href="/privacy"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 13, color: '#475569', textDecoration: 'none' }}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ fontSize: 13, color: '#475569', textDecoration: 'none' }}
                  >
                    Terms & Conditions
                  </Link>
                </div>
              )}
            </div>

            {/* Direct Links */}
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: C.navy,
                textDecoration: 'none',
                padding: '12px 0',
                borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
              }}
            >
              Pricing
            </Link>

            <Link
              href="/case-studies"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: C.navy,
                textDecoration: 'none',
                padding: '12px 0',
                borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
              }}
            >
              Case Studies
            </Link>

            {/* Mobile Actions: Login & Consult */}
            <div style={{ marginTop: 'auto', paddingTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 44,
                  borderRadius: 8,
                  border: '1px solid #CBD5E1',
                  color: C.navy,
                  textDecoration: 'none',
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                Admin Login
              </Link>

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  height: 44,
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                Consult an Architect →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Responsive & Animation Styles */}
      <style>{`
        .p41-desktop-nav {
          display: flex !important;
          flex-direction: row !important;
        }
        .p41-mobile-toggle {
          display: none !important;
        }
        @media (max-width: 1024px) {
          .p41-desktop-nav {
            display: none !important;
          }
          .p41-mobile-toggle {
            display: flex !important;
          }
        }
        @keyframes safepay-nav-slide {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
