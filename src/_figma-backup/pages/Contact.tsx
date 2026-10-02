import { useState } from 'react'
import { C, type Page } from '../components/tokens'
import { CheckCircle } from 'lucide-react'

interface Props { navigate: (p: Page) => void }

const projectTypes = [
  'New Website or Web App',
  'Mobile Application',
  'AI / Machine Learning Solution',
  'Process Automation',
  'Digital Transformation',
  'Analytics & Data Platform',
  'Digital Marketing & SEO',
  'Technology Consulting',
  'Other / Not Sure',
]

const budgets = [
  'Under ₦500,000',
  '₦500,000 – ₦2 million',
  '₦2 million – ₦10 million',
  '₦10 million+',
  'Prefer to discuss',
]

interface Form {
  name: string; email: string; company: string
  projectType: string; budget: string; message: string
}

const inputStyle: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box',
  background: 'white',
  border: '1.5px solid #E2E8F0',
  borderRadius: 8,
  padding: '13px 16px',
  fontFamily: 'Inter, sans-serif',
  fontSize: 14, color: C.navy,
  outline: 'none',
  transition: 'border-color 0.15s',
  WebkitAppearance: 'none',
}

export function Contact(_props: Props) {
  const [form, setForm] = useState<Form>({ name:'', email:'', company:'', projectType:'', budget:'', message:'' })
  const [focused, setFocused] = useState<string|null>(null)
  const [submitted, setSubmitted] = useState(false)

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true) }

  const focusStyle = (k: string): React.CSSProperties => ({
    ...inputStyle,
    borderColor: focused === k ? C.blue : '#E2E8F0',
    boxShadow: focused === k ? `0 0 0 3px rgba(59,130,246,0.1)` : 'none',
  })

  return (
    <div className="page-enter" style={{ background: 'white' }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: 64, background: C.navy, padding: '120px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position:'absolute', top:-100, right:-100, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(59,130,246,0.12) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-60, left:-60, width:300, height:300, borderRadius:'50%', background:'radial-gradient(circle,rgba(147,197,253,0.06) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="p41-contact-hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{ width: 24, height: 2, background: C.blue }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: C.lightBlue, letterSpacing: '0.18em' }}>GET IN TOUCH</span>
              </div>
              <h1 style={{ fontSize: 'clamp(36px,5vw,64px)', fontWeight: 800, color: 'white', letterSpacing: '-0.035em', lineHeight: 1.0, margin: '0 0 24px' }}>
                Let's build<br />something<br /><span style={{ color: C.lightBlue }}>meaningful.</span>
              </h1>
              <p style={{ fontSize: 17, color: '#8DADC8', lineHeight: 1.75, margin: '0 0 40px', maxWidth: 400 }}>
                Tell us about your challenge — we'll review your enquiry and respond within one business day with an honest recommendation.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Response time', value: 'Within 24 hours' },
                  { label: 'First consultation', value: 'Free of charge' },
                  { label: 'Location', value: 'Lagos, Nigeria + Remote' },
                ].map(item => (
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
                { v: 'Free', l: 'Initial consultation' },
                { v: '<24h', l: 'Response time' },
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
              <div style={{ fontSize: 11, fontWeight: 800, color: C.blue, letterSpacing: '0.16em', marginBottom: 12 }}>WHAT WE CAN HELP WITH</div>
              <h2 style={{ fontSize: 'clamp(20px,2vw,28px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.02em', margin: '0 0 24px' }}>
                Choose the service area closest to your need.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 40 }}>
                {['AI & Automation','Software & Web Development','Digital Transformation','Data & Analytics','Digital Marketing & Communication','Consultancy & Training','Not Sure Yet'].map((s, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '12px 16px', background: 'white',
                      borderRadius: 10, border: `1px solid ${C.gray}`,
                    }}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.blue, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, fontWeight: 500, color: C.navy }}>{s}</span>
                  </div>
                ))}
              </div>

              {/* Contact details */}
              <div style={{ background: 'white', borderRadius: 14, padding: '24px', border: `1px solid ${C.gray}` }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: '#94A3B8', letterSpacing: '0.14em', marginBottom: 18 }}>DIRECT CONTACT</div>
                {[
                  { label: 'Email', value: '[hello@pulse41.com]' },
                  { label: 'Phone', value: '[+234 XXX XXX XXXX]' },
                  { label: 'Office', value: 'Lagos, Nigeria' },
                ].map(item => (
                  <div key={item.label} style={{ marginBottom: 14 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: C.blue, letterSpacing: '0.1em', marginBottom: 3 }}>{item.label.toUpperCase()}</div>
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
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: C.navy, margin: '0 0 12px' }}>Message sent.</h3>
                  <p style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.7, margin: 0 }}>
                    Thank you for reaching out. A member of the Pulse41 team will review your enquiry and respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ marginBottom: 4 }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: C.navy, marginBottom: 4 }}>Tell us about your project</div>
                    <div style={{ fontSize: 13, color: C.textMuted }}>All fields marked * are required.</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6, letterSpacing: '0.06em' }}>FULL NAME *</label>
                      <input
                        required value={form.name} onChange={set('name')} placeholder="Your name"
                        style={focusStyle('name')}
                        onFocus={() => setFocused('name')} onBlur={() => setFocused(null)}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6, letterSpacing: '0.06em' }}>EMAIL ADDRESS *</label>
                      <input
                        required type="email" value={form.email} onChange={set('email')} placeholder="your@email.com"
                        style={focusStyle('email')}
                        onFocus={() => setFocused('email')} onBlur={() => setFocused(null)}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6, letterSpacing: '0.06em' }}>COMPANY / ORGANIZATION</label>
                    <input
                      value={form.company} onChange={set('company')} placeholder="Company name (optional)"
                      style={focusStyle('company')}
                      onFocus={() => setFocused('company')} onBlur={() => setFocused(null)}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6, letterSpacing: '0.06em' }}>PROJECT TYPE *</label>
                      <select
                        required value={form.projectType} onChange={set('projectType')}
                        style={{ ...focusStyle('projectType'), cursor: 'pointer' }}
                        onFocus={() => setFocused('projectType')} onBlur={() => setFocused(null)}
                      >
                        <option value="">Select type</option>
                        {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6, letterSpacing: '0.06em' }}>APPROXIMATE BUDGET</label>
                      <select
                        value={form.budget} onChange={set('budget')}
                        style={{ ...focusStyle('budget'), cursor: 'pointer' }}
                        onFocus={() => setFocused('budget')} onBlur={() => setFocused(null)}
                      >
                        <option value="">Prefer not to say</option>
                        {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#475569', display: 'block', marginBottom: 6, letterSpacing: '0.06em' }}>YOUR MESSAGE *</label>
                    <textarea
                      required value={form.message} onChange={set('message')} rows={5}
                      placeholder="Describe your project, challenge or question. The more context you provide, the better we can respond."
                      style={{ ...focusStyle('message'), resize: 'vertical' }}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: C.blue, border: 'none', borderRadius: 8, cursor: 'pointer',
                      fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: 'white',
                      padding: '14px 28px', display: 'inline-flex', alignItems: 'center', gap: 10,
                      alignSelf: 'flex-start', transition: 'background 0.15s, transform 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = C.blue; (e.currentTarget as HTMLElement).style.transform = 'none' }}
                  >
                    Send Message →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        <style>{`.p41-form-layout{display:grid;grid-template-columns:5fr 7fr;gap:64px;} @media(max-width:900px){.p41-form-layout{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ── BOTTOM CONTEXT ───────────────────────────────────────────── */}
      <section style={{ background: 'white', padding: '64px 40px', borderTop: `1px solid ${C.gray}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="p41-contact-bottom" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
            {[
              { title: 'Discovery call', desc: 'We start every engagement with a free 30-minute call to understand your challenge, goals and timeline before proposing anything.' },
              { title: 'Honest scoping', desc: 'We give you a clear, itemized proposal — realistic timeline, honest scope, no ambiguous milestones or hidden costs.' },
              { title: 'You own everything', desc: 'All code, designs and deliverables belong to you. No vendor lock-in, no ongoing licensing fees, no strings attached.' },
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
