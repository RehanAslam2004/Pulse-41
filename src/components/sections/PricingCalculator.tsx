'use client'

import React, { useState, useMemo } from 'react'
import {
  Calculator,
  ArrowRight,
  CheckCircle2,
  X,
  Send,
  ChevronDown,
  Sparkles,
  Clock,
  ShieldCheck,
} from 'lucide-react'
import { C } from '@/lib/design/tokens'

/* ── Domain Options ─────────────────────────────────────────────────── */
const DOMAINS = [
  { id: 'fullstack', name: 'Software & Platform Engineering', multiplier: 1.0 },
  { id: 'ai', name: 'Applied AI & Intelligent Systems', multiplier: 1.15 },
  { id: 'cloud', name: 'Cloud Infrastructure & DevOps', multiplier: 1.05 },
  { id: 'data', name: 'Data Platform & Analytics', multiplier: 1.1 },
]

/* ── Budget Ranges ──────────────────────────────────────────────────── */
const BUDGET_RANGES = [
  { id: 'starter', label: '$5K – $10K', midpoint: 7500 },
  { id: 'growth', label: '$10K – $25K', midpoint: 17500 },
  { id: 'scale', label: '$25K – $50K', midpoint: 37500 },
  { id: 'enterprise', label: '$50K – $100K', midpoint: 75000 },
  { id: 'flagship', label: '$100K+', midpoint: 125000 },
]

/* ── Duration Options ───────────────────────────────────────────────── */
const DURATIONS = [
  { months: 3, label: '3 Months' },
  { months: 6, label: '6 Months', discount: 0.05 },
  { months: 12, label: '12 Months', discount: 0.1 },
]

/* ── Add-on Options ─────────────────────────────────────────────────── */
const ADDONS = [
  { id: 'sla', label: '24/7 Priority SLA', price: 1500, unit: '/mo', desc: 'Round-the-clock incident response' },
  { id: 'security', label: 'Security Audit', price: 2000, unit: 'once', desc: 'Full penetration testing & report' },
  { id: 'cicd', label: 'CI/CD Pipeline Setup', price: 1000, unit: 'once', desc: 'Automated deployment workflows' },
]

export function PricingCalculator() {
  const [selectedDomain, setSelectedDomain] = useState('fullstack')
  const [selectedBudget, setSelectedBudget] = useState('growth')
  const [durationMonths, setDurationMonths] = useState(6)
  const [activeAddons, setActiveAddons] = useState<string[]>([])
  const [domainDropdownOpen, setDomainDropdownOpen] = useState(false)
  const [budgetDropdownOpen, setBudgetDropdownOpen] = useState(false)

  // Quote modal state
  const [modalOpen, setModalOpen] = useState(false)
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [clientCompany, setClientCompany] = useState('')
  const [clientMessage, setClientMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const activeDomain = useMemo(
    () => DOMAINS.find((d) => d.id === selectedDomain) || DOMAINS[0],
    [selectedDomain]
  )

  const activeBudget = useMemo(
    () => BUDGET_RANGES.find((b) => b.id === selectedBudget) || BUDGET_RANGES[1],
    [selectedBudget]
  )

  const activeDuration = useMemo(
    () => DURATIONS.find((d) => d.months === durationMonths) || DURATIONS[1],
    [durationMonths]
  )

  function toggleAddon(id: string) {
    setActiveAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    )
  }

  // Calculation
  const calculation = useMemo(() => {
    const baseCost = activeBudget.midpoint * activeDomain.multiplier
    const discount = activeDuration.discount || 0

    // Monthly add-ons
    const monthlyAddons = activeAddons.includes('sla') ? 1500 : 0

    // Monthly total after discount
    const monthlyBase = Math.round((baseCost / activeDuration.months) * (1 - discount))
    const monthlyTotal = monthlyBase + monthlyAddons

    // One-time add-ons
    let oneTimeTotal = 0
    if (activeAddons.includes('security')) oneTimeTotal += 2000
    if (activeAddons.includes('cicd')) oneTimeTotal += 1000

    const totalEstimate = monthlyTotal * activeDuration.months + oneTimeTotal

    return {
      monthlyTotal,
      totalEstimate,
      oneTimeTotal,
      addonCount: activeAddons.length,
    }
  }, [activeBudget, activeDomain, activeDuration, activeAddons])

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)

    try {
      const payload = {
        name: clientName,
        email: clientEmail,
        company: clientCompany,
        tier: activeBudget.label,
        budget: `$${calculation.monthlyTotal.toLocaleString()}/mo ($${calculation.totalEstimate.toLocaleString()} total)`,
        project_scope: `${activeDomain.name} • ${activeDuration.months} Months • Budget: ${activeBudget.label}`,
        message: clientMessage
          ? `Estimated via calculator: ${clientMessage}`
          : `Custom scope from calculator: ${activeDomain.name}, ${activeBudget.label}, ${activeDuration.months} months — ~$${calculation.monthlyTotal.toLocaleString()}/mo.`,
      }

      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setSubmitted(true)
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  /* ── Shared Styles ────────────────────────────────────────────────── */
  const dropdownBtnStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    background: 'white',
    border: `1.5px solid ${C.gray}`,
    borderRadius: 12,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 14,
    fontWeight: 600,
    color: C.navy,
    fontFamily: 'var(--font-inter, Inter, sans-serif)',
    transition: 'border-color 0.15s',
  }

  const dropdownMenuStyle: React.CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 6px)',
    left: 0,
    right: 0,
    background: 'white',
    border: `1.5px solid ${C.gray}`,
    borderRadius: 12,
    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
    zIndex: 20,
    overflow: 'hidden',
  }

  const dropdownItemStyle = (active: boolean): React.CSSProperties => ({
    padding: '12px 16px',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: active ? 700 : 500,
    color: active ? C.blue : C.navy,
    background: active ? 'rgba(59,130,246,0.06)' : 'transparent',
    borderBottom: `1px solid ${C.offWhite}`,
    transition: 'background 0.1s',
    fontFamily: 'var(--font-inter, Inter, sans-serif)',
  })

  return (
    <div style={{ width: '100%' }} id="calculator">
      {/* Two-Column Card */}
      <div
        style={{
          background: C.offWhite,
          border: `1px solid ${C.gray}`,
          borderRadius: 20,
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 0,
        }}
        className="p41-calc-grid"
      >
        {/* ── LEFT: Inputs ──────────────────────────────────────────── */}
        <div style={{ padding: '40px 36px', borderRight: `1px solid ${C.gray}` }} className="p41-calc-left">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Calculator size={18} color={C.blue} />
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: C.textMuted, textTransform: 'uppercase' as const }}>
              Cost Estimator
            </span>
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: C.navy, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            See What It Costs
          </h3>
          <p style={{ fontSize: 14, color: C.textMuted, margin: '0 0 28px', lineHeight: 1.5 }}>
            Pick your project details below and get an instant estimate.
          </p>

          {/* 1. Domain Dropdown */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 8 }}>
              What do you need?
            </label>
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                style={{
                  ...dropdownBtnStyle,
                  borderColor: domainDropdownOpen ? C.blue : C.gray,
                }}
                onClick={() => { setDomainDropdownOpen(!domainDropdownOpen); setBudgetDropdownOpen(false) }}
              >
                <span>{activeDomain.name}</span>
                <ChevronDown
                  size={16}
                  color={C.textMuted}
                  style={{ transform: domainDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
                />
              </button>
              {domainDropdownOpen && (
                <div style={dropdownMenuStyle}>
                  {DOMAINS.map((d) => (
                    <div
                      key={d.id}
                      style={dropdownItemStyle(selectedDomain === d.id)}
                      onClick={() => { setSelectedDomain(d.id); setDomainDropdownOpen(false) }}
                      onMouseEnter={(e) => { if (selectedDomain !== d.id) (e.currentTarget.style.background = C.offWhite) }}
                      onMouseLeave={(e) => { if (selectedDomain !== d.id) (e.currentTarget.style.background = 'transparent') }}
                    >
                      {d.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 2. Budget Range Dropdown */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 8 }}>
              Budget range
            </label>
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                style={{
                  ...dropdownBtnStyle,
                  borderColor: budgetDropdownOpen ? C.blue : C.gray,
                }}
                onClick={() => { setBudgetDropdownOpen(!budgetDropdownOpen); setDomainDropdownOpen(false) }}
              >
                <span>{activeBudget.label}</span>
                <ChevronDown
                  size={16}
                  color={C.textMuted}
                  style={{ transform: budgetDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
                />
              </button>
              {budgetDropdownOpen && (
                <div style={dropdownMenuStyle}>
                  {BUDGET_RANGES.map((b) => (
                    <div
                      key={b.id}
                      style={dropdownItemStyle(selectedBudget === b.id)}
                      onClick={() => { setSelectedBudget(b.id); setBudgetDropdownOpen(false) }}
                      onMouseEnter={(e) => { if (selectedBudget !== b.id) (e.currentTarget.style.background = C.offWhite) }}
                      onMouseLeave={(e) => { if (selectedBudget !== b.id) (e.currentTarget.style.background = 'transparent') }}
                    >
                      {b.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 3. Duration Toggle */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 8 }}>
              Timeline
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {DURATIONS.map((d) => {
                const isActive = durationMonths === d.months
                return (
                  <button
                    key={d.months}
                    type="button"
                    onClick={() => setDurationMonths(d.months)}
                    style={{
                      flex: 1,
                      padding: '12px 10px',
                      borderRadius: 10,
                      border: `1.5px solid ${isActive ? C.blue : C.gray}`,
                      background: isActive ? 'rgba(59,130,246,0.08)' : 'white',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? C.blue : C.navy,
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      transition: 'all 0.15s',
                      position: 'relative',
                    }}
                  >
                    {d.label}
                    {d.discount && (
                      <span
                        style={{
                          display: 'block',
                          fontSize: 10,
                          fontWeight: 700,
                          color: '#10B981',
                          marginTop: 2,
                        }}
                      >
                        Save {d.discount * 100}%
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 4. Add-ons */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 8 }}>
              Add-ons <span style={{ fontWeight: 500, color: C.textMuted }}>(optional)</span>
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ADDONS.map((addon) => {
                const isActive = activeAddons.includes(addon.id)
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => toggleAddon(addon.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 14px',
                      borderRadius: 10,
                      border: `1.5px solid ${isActive ? C.blue : C.gray}`,
                      background: isActive ? 'rgba(59,130,246,0.06)' : 'white',
                      cursor: 'pointer',
                      textAlign: 'left' as const,
                      transition: 'all 0.15s',
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 6,
                        border: `2px solid ${isActive ? C.blue : C.gray}`,
                        background: isActive ? C.blue : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.15s',
                      }}
                    >
                      {isActive && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: C.navy }}>{addon.label}</div>
                      <div style={{ fontSize: 11, color: C.textMuted, marginTop: 1 }}>{addon.desc}</div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: isActive ? C.blue : C.textMuted, whiteSpace: 'nowrap' }}>
                      +${addon.price.toLocaleString()}{addon.unit === '/mo' ? '/mo' : ''}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Live Estimate Summary ───────────────────────────── */}
        <div
          style={{
            padding: '40px 36px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          className="p41-calc-right"
        >
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Sparkles size={16} color={C.blue} />
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: C.textMuted, textTransform: 'uppercase' as const }}>
                Your Estimate
              </span>
            </div>

            {/* Monthly Cost */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, marginBottom: 4 }}>
                Estimated monthly
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span
                  style={{
                    fontSize: 44,
                    fontWeight: 800,
                    color: C.navy,
                    letterSpacing: '-0.03em',
                    lineHeight: 1,
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  }}
                >
                  ${calculation.monthlyTotal.toLocaleString()}
                </span>
                <span style={{ fontSize: 14, color: C.textMuted, fontWeight: 600 }}>/month</span>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: C.gray, margin: '0 0 20px' }} />

            {/* Project Summary Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: C.textMuted, fontWeight: 500 }}>Total project cost</span>
                <span style={{ color: C.navy, fontWeight: 700 }}>
                  ${calculation.totalEstimate.toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: C.textMuted, fontWeight: 500 }}>Duration</span>
                <span style={{ color: C.navy, fontWeight: 700 }}>
                  {activeDuration.months} months
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <span style={{ color: C.textMuted, fontWeight: 500 }}>Domain</span>
                <span style={{ color: C.navy, fontWeight: 700 }}>
                  {activeDomain.name.split('&')[0].trim()}
                </span>
              </div>
              {calculation.oneTimeTotal > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: C.textMuted, fontWeight: 500 }}>One-time add-ons</span>
                  <span style={{ color: C.navy, fontWeight: 700 }}>
                    +${calculation.oneTimeTotal.toLocaleString()}
                  </span>
                </div>
              )}
              {activeDuration.discount && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>Commitment discount</span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>
                    −{activeDuration.discount * 100}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Trust Signals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
            {[
              { icon: ShieldCheck, text: 'Full IP assignment included' },
              { icon: Clock, text: '2-week risk-free pilot' },
              { icon: CheckCircle2, text: 'NDA & confidentiality guaranteed' },
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <item.icon size={14} color={C.blue} />
                <span style={{ fontSize: 12, color: C.textMuted, fontWeight: 500 }}>{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: 12,
              background: C.blue,
              color: 'white',
              fontSize: 15,
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 4px 14px rgba(59,130,246,0.3)',
              transition: 'all 0.15s',
              fontFamily: 'var(--font-inter, Inter, sans-serif)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = C.blue; e.currentTarget.style.transform = 'none' }}
          >
            Talk to Us
            <ArrowRight size={16} />
          </button>

          <p style={{ fontSize: 11, color: C.textLight, textAlign: 'center', marginTop: 10, lineHeight: 1.4 }}>
            No commitment required. We'll send a tailored proposal within 24 hours.
          </p>
        </div>
      </div>

      {/* Responsive grid */}
      <style>{`
        .p41-calc-grid { display: grid; grid-template-columns: 1fr 1fr; }
        @media (max-width: 860px) {
          .p41-calc-grid { grid-template-columns: 1fr !important; }
          .p41-calc-left { border-right: none !important; border-bottom: 1px solid ${C.gray} !important; }
        }
      `}</style>

      {/* ── Quote Modal ─────────────────────────────────────────────── */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={(e) => { if (e.target === e.currentTarget) { setModalOpen(false); setSubmitted(false) } }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: 20,
              padding: '36px 32px',
              maxWidth: 480,
              width: '100%',
              boxShadow: '0 24px 80px rgba(0,0,0,0.15)',
              position: 'relative',
              animation: 'p41-modal-in 0.2s ease',
            }}
          >
            <button
              onClick={() => { setModalOpen(false); setSubmitted(false) }}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                padding: 8,
                borderRadius: 10,
                border: 'none',
                background: C.offWhite,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: C.textMuted,
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.gray)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.offWhite)}
            >
              <X size={18} />
            </button>

            {!submitted ? (
              <>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: C.navy, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                  Get Your Custom Quote
                </h3>
                <p style={{ fontSize: 13, color: C.textMuted, margin: '0 0 20px', lineHeight: 1.5 }}>
                  Share your details and we'll send a tailored proposal.
                </p>

                {/* Scope Summary Chip */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 6,
                    marginBottom: 20,
                    padding: '12px 14px',
                    background: C.offWhite,
                    borderRadius: 10,
                    border: `1px solid ${C.gray}`,
                  }}
                >
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.navy }}>
                    {activeDomain.name.split('&')[0].trim()}
                  </span>
                  <span style={{ fontSize: 12, color: C.textMuted }}>•</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.navy }}>
                    {activeBudget.label}
                  </span>
                  <span style={{ fontSize: 12, color: C.textMuted }}>•</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: C.navy }}>
                    {activeDuration.months} months
                  </span>
                  <span style={{ fontSize: 12, color: C.textMuted }}>•</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.blue }}>
                    ~${calculation.monthlyTotal.toLocaleString()}/mo
                  </span>
                </div>

                {submitError && (
                  <div
                    style={{
                      marginBottom: 16,
                      padding: '10px 14px',
                      borderRadius: 10,
                      background: 'rgba(239,68,68,0.08)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      color: '#DC2626',
                      fontSize: 13,
                    }}
                  >
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmitQuote} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 4 }}>
                      Your name
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Jane Doe"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        border: `1.5px solid ${C.gray}`,
                        borderRadius: 10,
                        fontSize: 14,
                        color: C.navy,
                        background: 'white',
                        outline: 'none',
                        fontFamily: 'var(--font-inter, Inter, sans-serif)',
                        transition: 'border-color 0.15s',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = C.blue)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = C.gray)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 4 }}>
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="jane@company.com"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        border: `1.5px solid ${C.gray}`,
                        borderRadius: 10,
                        fontSize: 14,
                        color: C.navy,
                        background: 'white',
                        outline: 'none',
                        fontFamily: 'var(--font-inter, Inter, sans-serif)',
                        transition: 'border-color 0.15s',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = C.blue)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = C.gray)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 4 }}>
                      Company <span style={{ fontWeight: 400, color: C.textMuted }}>(optional)</span>
                    </label>
                    <input
                      type="text"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      placeholder="Acme Inc."
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        border: `1.5px solid ${C.gray}`,
                        borderRadius: 10,
                        fontSize: 14,
                        color: C.navy,
                        background: 'white',
                        outline: 'none',
                        fontFamily: 'var(--font-inter, Inter, sans-serif)',
                        transition: 'border-color 0.15s',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = C.blue)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = C.gray)}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: C.navy, marginBottom: 4 }}>
                      Anything else? <span style={{ fontWeight: 400, color: C.textMuted }}>(optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      value={clientMessage}
                      onChange={(e) => setClientMessage(e.target.value)}
                      placeholder="Tell us about your project..."
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        border: `1.5px solid ${C.gray}`,
                        borderRadius: 10,
                        fontSize: 14,
                        color: C.navy,
                        background: 'white',
                        outline: 'none',
                        resize: 'vertical' as const,
                        fontFamily: 'var(--font-inter, Inter, sans-serif)',
                        transition: 'border-color 0.15s',
                      }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = C.blue)}
                      onBlur={(e) => (e.currentTarget.style.borderColor = C.gray)}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: '100%',
                      padding: '14px 20px',
                      borderRadius: 10,
                      background: C.blue,
                      color: 'white',
                      fontSize: 14,
                      fontWeight: 700,
                      border: 'none',
                      cursor: submitting ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      opacity: submitting ? 0.7 : 1,
                      boxShadow: '0 4px 14px rgba(59,130,246,0.3)',
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      transition: 'all 0.15s',
                    }}
                  >
                    {submitting ? (
                      <>
                        <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                        <span>On its way!</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Send My Request</span>
                      </>
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'rgba(16,185,129,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 16px',
                    border: '1px solid rgba(16,185,129,0.2)',
                  }}
                >
                  <CheckCircle2 size={24} color="#10B981" />
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: C.navy, margin: '0 0 8px' }}>
                  We've got your request!
                </h3>
                <p style={{ fontSize: 13, color: C.textMuted, margin: '0 0 24px', lineHeight: 1.5, maxWidth: 320, marginLeft: 'auto', marginRight: 'auto' }}>
                  Thanks, <strong style={{ color: C.navy }}>{clientName}</strong>. A Pulse41 team member will reach out to <strong style={{ color: C.blue }}>{clientEmail}</strong> within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => { setModalOpen(false); setSubmitted(false) }}
                  style={{
                    padding: '12px 28px',
                    borderRadius: 10,
                    background: C.offWhite,
                    border: `1px solid ${C.gray}`,
                    color: C.navy,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = C.gray)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = C.offWhite)}
                >
                  Back to Pricing
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal animation */}
      <style>{`
        @keyframes p41-modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
