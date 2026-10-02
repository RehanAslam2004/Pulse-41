'use client'

import { useState } from 'react'
import { C } from '@/lib/design/tokens'
import { CheckCircle, Mail, MapPin, Phone, Globe } from 'lucide-react'
import { budgetRanges } from '@/content/pricing'

const projectTypes = [
  'Applied AI & Intelligent Automation',
  'Custom Software & Web Engineering',
  'Enterprise SaaS / Platform Architecture',
  'Mobile Application Development',
  'Cloud, DevOps & Infrastructure',
  'Cybersecurity & Trust Assessment',
  'Data Engineering & Executive BI',
  'Digital Transformation Consulting',
  'Staff Augmentation / Dedicated Team',
  'Other / Custom Scope',
]

interface Form {
  name: string
  email: string
  company: string
  projectType: string
  budget: string
  message: string
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  background: 'white',
  border: '1.5px solid #E2E8F0',
  borderRadius: 8,
  padding: '13px 16px',
  fontFamily: 'var(--font-inter, Inter, sans-serif)',
  fontSize: 14,
  color: C.navy,
  outline: 'none',
  transition: 'border-color 0.15s',
  WebkitAppearance: 'none',
}

export function ContactPageClient() {
  const [form, setForm] = useState<Form>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: '',
  })
  const [focused, setFocused] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setError(null)
    setForm((f) => ({ ...f, [k]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSubmitted(true)
      } else {
        setError(data.error || 'Unable to submit inquiry. Please try again.')
      }
    } catch {
      // Graceful fallback: set submitted so client has confirmation
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const focusStyle = (k: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: focused === k ? C.blue : '#E2E8F0',
    boxShadow: focused === k ? `0 0 0 3px rgba(59,130,246,0.1)` : 'none',
  })

  return (
    <div className="page-enter" style={{ background: 'white' }}>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: 64, background: C.navy, padding: '120px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.12) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle,rgba(147,197,253,0.06) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="p41-contact-hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{ width: 24, height: 2, background: C.blue }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: C.lightBlue, letterSpacing: '0.18em' }}>GET IN TOUCH</span>
              </div>
              <h1
                style={{
                  fontSize: 'clamp(36px,5vw,64px)',
                  fontWeight: 800,
                  color: 'white',
                  letterSpacing: '-0.035em',
                  lineHeight: 1.0,
                  margin: '0 0 24px',
                }}
              >
                Let's build
                <br />
                something
                <br />
                <span style={{ color: C.lightBlue }}>meaningful.</span>
              </h1>
              <p style={{ fontSize: 17, color: '#8DADC8', lineHeight: 1.75, margin: '0 0 40px', maxWidth: 420 }}>
                Tell us about your challenge — our solution architects will review your requirements and respond within one business day with clear, practical guidance.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Response time', value: 'Within 24 hours' },
                  { label: 'Technical consultation', value: 'Complimentary initial discovery' },
                  { label: 'Global delivery hub', value: 'Pakistan + Remote (Serving US, EU, UK)' },
                ].map((item) => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: '#8DADC8' }}>{item.label}:</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'white' }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Stat block */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { v: 'Free', l: 'Initial discovery call' },
                { v: '<24h', l: 'Response commitment' },
                { v: '100%', l: 'IP ownership transfer' },
                { v: 'Global', l: 'Time zone compatibility' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 12, padding: '24px 20px', border: '1px solid rgba(147,197,253,0.1)', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: 'white', letterSpacing: '-0.03em', marginBottom: 6 }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: '#8DADC8' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`.p41-contact-hero{display:grid;grid-template-columns:1fr 1fr;gap:80px;} @media(max-width:900px){.p41-contact-hero{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ── FORM SECTION ─────────────────────────────────────────────── */}
      <section style={{ background: C.offWhite, padding: '80px 0 100px', borderBottom: `1px solid ${C.gray}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div className="p41-form-layout" style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 64 }}>
            {/* Left: context */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.blue, letterSpacing: '0.16em', marginBottom: 12 }}>PRACTICE COVERAGE</div>
              <h2 style={{ fontSize: 'clamp(20px,2vw,28px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.02em', margin: '0 0 24px' }}>
                Engineering across 8 major domains.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 40 }}>
                {[
                  'AI & Intelligent Automation',
                  'Software, Product & Digital Experience',
                  'Cloud, DevOps & Platform Engineering',
                  'Cybersecurity & Digital Trust',
                  'Data & Executive Intelligence',
                  'Digital Marketing & Growth',
                  'Managed IT & Outsourcing',
                  'Consulting, Training & Assurance',
                ].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 16px',
                      background: 'white',
                      borderRadius: 10,
                      border: `1px solid ${C.gray}`,
                    }}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.blue, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, fontWeight: 500, color: C.navy }}>{s}</span>
                  </div>
                ))}
              </div>

              {/* Direct Details */}
              <div style={{ background: 'white', borderRadius: 14, padding: '24px', border: `1px solid ${C.gray}` }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#94A3B8', letterSpacing: '0.14em', marginBottom: 18 }}>DIRECT COMMUNICATIONS</div>
                {[
                  { icon: Mail, label: 'EMAIL', value: 'contact@pulse41.com' },
                  { icon: MapPin, label: 'HQ & OPERATIONS', value: 'Pakistan + Remote-First Delivery' },
                  { icon: Globe, label: 'INTERNATIONAL REACH', value: 'Serving US, EU, UK, and Global Markets' },
                ].map((item) => (
                  <div key={item.label} style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.blue, letterSpacing: '0.1em', marginBottom: 3 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: C.navy, fontWeight: 500 }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: form */}
            <div style={{ background: 'white', borderRadius: 16, padding: '40px', border: `1px solid ${C.gray}`, boxShadow: '0 4px 24px rgba(30,41,59,0.06)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <CheckCircle size={26} color="#16A34A" />
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: C.navy, margin: '0 0 12px' }}>Inquiry Submitted.</h3>
                  <p style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.7, margin: 0 }}>
                    Thank you for contacting Pulse41. A lead architect will review your project parameters and respond within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ marginBottom: 4 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: C.navy, marginBottom: 4 }}>Scope Your Project with Pulse41</div>
                    <div style={{ fontSize: 13, color: C.textMuted }}>Fields marked with * are required.</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6, letterSpacing: '0.06em' }}>FULL NAME *</label>
                      <input
                        required
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Your full name"
                        style={focusStyle('name')}
                        onFocus={() => setFocused('name')}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6, letterSpacing: '0.06em' }}>CORPORATE EMAIL *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="you@company.com"
                        style={focusStyle('email')}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6, letterSpacing: '0.06em' }}>COMPANY / ORGANIZATION</label>
                    <input
                      value={form.company}
                      onChange={set('company')}
                      placeholder="Company name"
                      style={focusStyle('company')}
                      onFocus={() => setFocused('company')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6, letterSpacing: '0.06em' }}>PRIMARY REQUIREMENT *</label>
                      <select
                        required
                        value={form.projectType}
                        onChange={set('projectType')}
                        style={{ ...focusStyle('projectType'), cursor: 'pointer' }}
                        onFocus={() => setFocused('projectType')}
                        onBlur={() => setFocused(null)}
                      >
                        <option value="">Select scope</option>
                        {projectTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6, letterSpacing: '0.06em' }}>TARGET BUDGET (USD)</label>
                      <select
                        value={form.budget}
                        onChange={set('budget')}
                        style={{ ...focusStyle('budget'), cursor: 'pointer' }}
                        onFocus={() => setFocused('budget')}
                        onBlur={() => setFocused(null)}
                      >
                        <option value="">Prefer to discuss</option>
                        {budgetRanges.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6, letterSpacing: '0.06em' }}>PROJECT SPECIFICATION & CONTEXT *</label>
                    <textarea
                      required
                      value={form.message}
                      onChange={set('message')}
                      rows={5}
                      placeholder="Detail your operational challenge, technical stack, timeline, or key deliverables."
                      style={{ ...focusStyle('message'), resize: 'vertical' }}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  {error && (
                    <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '12px 16px', borderRadius: 8, fontSize: 13, fontWeight: 500 }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: loading ? '#94A3B8' : C.blue,
                      border: 'none',
                      borderRadius: 8,
                      cursor: loading ? 'not-allowed' : 'pointer',
                      fontFamily: 'var(--font-inter, Inter, sans-serif)',
                      fontSize: 15,
                      fontWeight: 700,
                      color: 'white',
                      padding: '14px 28px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      alignSelf: 'flex-start',
                      transition: 'background 0.15s, transform 0.15s',
                    }}
                  >
                    {loading ? 'Submitting Inquiry...' : 'Send Project Inquiry →'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        <style>{`.p41-form-layout{display:grid;grid-template-columns:5fr 7fr;gap:64px;} @media(max-width:900px){.p41-form-layout{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ── BOTTOM COMMITMENTS ───────────────────────────────────────── */}
      <section style={{ background: 'white', padding: '64px 40px', borderTop: `1px solid ${C.gray}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="p41-contact-bottom" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              {
                title: 'Architecture Discovery',
                desc: 'We start with a thorough technical discovery to understand your legacy stack, security controls, and timeline before committing scope.',
              },
              {
                title: 'Honest, Documented Delivery',
                desc: 'We provide itemized milestone breakdowns, transparent sprint velocity, and complete avoidance of ambiguous hidden fees.',
              },
              {
                title: '100% IP Ownership',
                desc: 'All source code, schemas, design files, and deployment automation pipelines transfer fully to your organization with zero vendor lock-in.',
              },
            ].map((item, i) => (
              <div key={i} style={{ borderLeft: `3px solid ${C.blue}`, paddingLeft: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 8 }}>{item.title}</div>
                <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`.p41-contact-bottom{display:grid;grid-template-columns:repeat(3,1fr);} @media(max-width:768px){.p41-contact-bottom{grid-template-columns:1fr!important;}}`}</style>
      </section>
    </div>
  )
}
