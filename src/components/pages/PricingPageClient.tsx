'use client'

import { useState } from 'react'
import Link from 'next/link'
import { C } from '@/lib/design/tokens'
import { Reveal } from '@/components/motion/Reveal'
import { Check, ChevronDown, ShieldCheck, Globe2, FileText, Lock, ArrowRight } from 'lucide-react'
import { pricingTiers, faqs, engagementModels } from '@/content/pricing'
import { PricingCalculator } from '@/components/sections/PricingCalculator'

export function PricingPageClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="page-enter">
      {/* Pricing Tiers */}
      <section style={{ background: 'white', padding: '160px 0 80px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>CHOOSE YOUR TIER</div>
            <h2 style={{ fontSize: 'clamp(26px,2.8vw,40px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.025em', margin: '0 0 12px' }}>
              Plans That Fit Your Stage
            </h2>
            <p style={{ fontSize: 15, color: C.textMuted, maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
              Whether you're launching an MVP or running enterprise digital transformation, we have a structured engagement ready.
            </p>
          </Reveal>

          <Reveal type="stagger" className="p41-price-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {pricingTiers.map((plan, i) => (
              <div
                key={i}
                style={{
                  background: plan.highlight ? C.navy : C.offWhite,
                  borderRadius: 20,
                  padding: '48px 36px',
                  border: plan.highlight ? 'none' : `1px solid ${C.gray}`,
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: plan.highlight ? '0 20px 60px rgba(30,41,59,0.25)' : 'none',
                  transform: plan.highlight ? 'scale(1.02)' : 'none',
                }}
              >
                {plan.highlight && (
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${C.blue},${C.lightBlue})` }} />
                )}
                {plan.highlight && (
                  <div style={{ position: 'absolute', top: 20, right: 20, background: C.blue, color: 'white', fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 100, letterSpacing: '0.1em' }}>
                    RECOMMENDED
                  </div>
                )}
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: plan.highlight ? C.lightBlue : C.textMuted, marginBottom: 10 }}>
                  {plan.tier}
                </div>
                <div style={{ fontSize: 12, color: plan.highlight ? '#8DADC8' : C.textMuted, marginBottom: 24 }}>{plan.tag}</div>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: plan.highlight ? 'white' : C.navy, lineHeight: 1.3, margin: '0 0 32px' }}>{plan.headline}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
                  {plan.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 20, height: 20, borderRadius: '50%', background: plan.highlight ? C.blue : 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Check size={11} color={plan.highlight ? 'white' : C.blue} strokeWidth={2.5} />
                      </div>
                      <span style={{ fontSize: 13, color: plan.highlight ? '#CBD5E1' : C.navy }}>{f}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className={plan.highlight ? 'btn-primary' : 'btn-secondary'}
                  style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}
                >
                  {plan.cta} <span className="arrow">→</span>
                </Link>
              </div>
            ))}
          </Reveal>
        </div>
        <style>{`.p41-price-grid{display:grid;grid-template-columns:repeat(3,1fr);} @media(max-width:900px){.p41-price-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Cost Estimator — NOW SECOND */}
      <section style={{ background: 'white', padding: '40px 0 80px' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 32px' }}>
          <PricingCalculator />
        </div>
      </section>

      {/* Engagement Models Overview */}
      <section style={{ background: C.navy, padding: '100px 32px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label" style={{ color: C.lightBlue, justifyContent: 'center' }}>COLLABORATION STRUCTURES</div>
            <h2 style={{ fontSize: 'clamp(26px,2.8vw,40px)', fontWeight: 800, color: 'white', letterSpacing: '-0.025em', margin: '0 0 16px' }}>
              10 Global Delivery & Outsourcing Models
            </h2>
            <p style={{ fontSize: 15, color: '#8DADC8', maxWidth: 640, margin: '0 auto', lineHeight: 1.6 }}>
              Pulse41 provides flexible engagement frameworks tailored to client maturity, project complexity, and commercial preference.
            </p>
          </Reveal>
          <Reveal type="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }} className="p41-eng-models">
            {engagementModels.map((m, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 14, padding: '28px 24px', border: '1px solid rgba(147,197,253,0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: C.blue, letterSpacing: '0.1em' }}>MODEL {m.id || String(i + 1).padStart(2, '0')}</div>
                  <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>Commercial Framework</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'white', margin: '0 0 10px' }}>{m.name}</h3>
                <p style={{ fontSize: 13, color: '#8DADC8', lineHeight: 1.6, margin: 0 }}>{m.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
        <style>{`.p41-eng-models{display:grid;grid-template-columns:repeat(2,1fr);} @media(max-width:768px){.p41-eng-models{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Delivery Standards & IP Assurance */}
      <section style={{ background: C.offWhite, padding: '80px 32px', borderBottom: `1px solid ${C.gray}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>INTERNATIONAL ASSURANCE</div>
            <h2 style={{ fontSize: 'clamp(24px,2.6vw,38px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.025em', margin: '0 0 12px' }}>
              US & European Market Delivery Standards
            </h2>
            <p style={{ fontSize: 15, color: C.textMuted, maxWidth: 600, margin: '0 auto', lineHeight: 1.6 }}>
              Built specifically to satisfy corporate legal, governance, and operational expectations across Western markets.
            </p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="p41-standards-grid">
            {[
              { icon: FileText, title: 'Full IP Assignment', desc: '100% intellectual property assigned to the client upon milestone payment. Pulse41 asserts zero proprietary claims on your custom code.' },
              { icon: Globe2, title: 'English-First Delivery', desc: 'All documentation, sprint reviews, architecture diagrams, code comments, and calls conducted in professional English.' },
              { icon: Lock, title: 'Standard NDAs & Security', desc: 'Robust NDAs, encrypted secrets management, role-based access, and GDPR / privacy compliance safeguards.' },
              { icon: ShieldCheck, title: 'Evidence Standard', desc: 'Tangible deliverables, deployed staging environments, test execution records, and transparent milestone tracking.' },
            ].map((std, idx) => {
              const Icon = std.icon
              return (
                <div key={idx} style={{ background: 'white', borderRadius: 14, padding: '28px 24px', border: `1px solid ${C.gray}` }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <Icon size={22} color={C.blue} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: C.navy, margin: '0 0 10px' }}>{std.title}</h3>
                  <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.65, margin: 0 }}>{std.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
        <style>{`.p41-standards-grid{display:grid;grid-template-columns:repeat(4,1fr);} @media(max-width:1024px){.p41-standards-grid{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:600px){.p41-standards-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* FAQ Accordion */}
      <section style={{ background: 'white', padding: '100px 0' }}>
        <div style={{ maxWidth: 840, margin: '0 auto', padding: '0 32px' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 56 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>FREQUENTLY ASKED QUESTIONS</div>
            <h2 style={{ fontSize: 'clamp(28px,3vw,42px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.025em', margin: 0 }}>
              Commercial & Governance FAQs
            </h2>
          </Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {faqs.map((f, i) => (
              <div
                key={i}
                style={{
                  border: `1px solid ${C.gray}`,
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: openFaq === i ? C.offWhite : 'white',
                  transition: 'background 0.2s',
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%',
                    padding: '22px 24px',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700, color: C.navy, paddingRight: 16 }}>{f.q}</span>
                  <ChevronDown
                    size={18}
                    color={C.blue}
                    style={{
                      transform: openFaq === i ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                      flexShrink: 0,
                    }}
                  />
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 24px 24px', animation: 'ind-fade 0.25s ease' }}>
                    <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.75, margin: 0 }}>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: C.navy, padding: '80px 32px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: 'white', letterSpacing: '-0.025em', margin: '0 0 20px' }}>
              REQUEST A DETAILED PROPOSAL
            </h2>
            <p style={{ fontSize: 17, color: '#8DADC8', margin: '0 0 40px' }}>
              Tell us your requirements and target timeline. We will review your architecture and return a transparent, fixed-scope proposal.
            </p>
            <Link href="/contact" className="btn-primary" style={{ textDecoration: 'none' }}>
              Request Proposal <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
