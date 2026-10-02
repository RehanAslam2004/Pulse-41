import { useState } from 'react'
import { C, type Page } from '../components/tokens'
import { Reveal } from '../components/Reveal'
import { GraduationCap, Heart, Landmark, ShoppingBag, Radio, Building2, Rocket } from 'lucide-react'

interface Props { navigate: (p: Page) => void }

const industries = [
  {
    num: '01', name: 'Education',
    headline: 'Smarter learning, stronger outcomes.',
    desc: 'Educational institutions need digital platforms that support modern learning, streamline administration and connect students, educators and communities — at every level from primary school to university.',
    photo: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&q=80',
    caps: ['Learning Management Systems','Student Information Platforms','AI Tutoring & Assessment','Digital Communication Tools','Analytics & Reporting','Mobile Learning Apps'],
  },
  {
    num: '02', name: 'Healthcare',
    headline: 'Technology that supports care delivery.',
    desc: 'Healthcare organizations require reliable, compliant digital systems that improve patient experience, reduce administrative burden and give clinical teams the information they need when they need it.',
    photo: 'https://images.unsplash.com/photo-1516841273335-e39b37888115?w=800&q=80',
    caps: ['Patient Portal & App Development','Appointment & Scheduling Systems','AI-assisted Information Retrieval','Healthcare Analytics Dashboards','Communication & Notification','Staff & Operations Management'],
  },
  {
    num: '03', name: 'Banking & Finance',
    headline: 'Digital experiences that build trust.',
    desc: 'Financial services organizations need modern digital experiences that balance customer satisfaction, operational efficiency and regulatory compliance — across banking, insurance and investment.',
    photo: 'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=800&q=80',
    caps: ['Customer Digital Portals','Process Automation','Financial Analytics Dashboards','Communication & Notifications','Customer Self-Service Tools','Compliance Reporting Systems'],
  },
  {
    num: '04', name: 'Retail & E-commerce',
    headline: 'Sell smarter. Grow faster.',
    desc: 'Retail businesses require end-to-end digital infrastructure — from storefront to fulfillment — combined with marketing intelligence to drive repeat customers and improve every conversion.',
    photo: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80',
    caps: ['E-commerce Platform Development','Customer Experience Optimization','AI Product Recommendations','Marketing Automation','Inventory & Operations Analytics','Social Commerce & Campaigns'],
  },
  {
    num: '05', name: 'Media & Communication',
    headline: 'Reach your audience at every touchpoint.',
    desc: 'Media and communication organizations must produce content, manage audiences and distribute messages across digital channels simultaneously — all at speed and at scale.',
    photo: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?w=800&q=80',
    caps: ['Content Management Platforms','Social Media Management Tools','AI Content Workflows','Broadcast & Distribution Systems','Audience Analytics','Communication Automation'],
  },
  {
    num: '06', name: 'Government & Public Sector',
    headline: 'Public services built around people.',
    desc: 'Government organizations face pressure to modernize services, improve citizen access and operate more efficiently — without compromising on transparency, security or accountability.',
    photo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    caps: ['Digital Service Delivery Platforms','Information Management Systems','Citizen Communication Tools','Internal Workflow Automation','Public Reporting & Transparency','Analytics & Performance Monitoring'],
  },
  {
    num: '07', name: 'SMEs & Startups',
    headline: 'Enterprise capability at startup velocity.',
    desc: 'Small businesses need professional technology without enterprise-level complexity or cost. Startups need to launch fast, learn quickly and scale confidently from day one.',
    photo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    caps: ['Professional Website Development','Custom Software & Applications','Branding & Digital Identity','AI Automation for Small Teams','Digital Marketing & SEO','Mobile App Development'],
  },
]

export function Industries({ navigate }: Props) {
  const [active, setActive] = useState(0)
  const go = (p: Page) => { navigate(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const ind = industries[active]

  return (
    <div className="page-enter" style={{ background: 'white' }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ background: C.navy, padding: '120px 40px 88px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(rgba(147,197,253,0.14) 1px, transparent 1px)', backgroundSize: '36px 36px', opacity: 0.3 }} />
        <div style={{ position: 'absolute', top: -120, right: -80, width: 640, height: 640, borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="p41-ind-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            {/* Left — headline */}
            <div>
              <div className="hero-animate hero-d1" style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                <div style={{ width: 36, height: 2, background: C.blue, borderRadius: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 11, fontWeight: 800, color: C.lightBlue, letterSpacing: '0.2em' }}>INDUSTRIES</span>
              </div>
              <h1 className="hero-animate hero-d2" style={{ fontSize: 'clamp(36px,4.5vw,62px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.06, margin: '0 0 28px' }}>
                Know where your<br />industry stands —<br />and where it's going.
              </h1>
              <p className="hero-animate hero-d3" style={{ fontSize: 17, color: '#8DADC8', lineHeight: 1.8, maxWidth: 460, margin: 0 }}>
                Digital transformation depends on context. Pulse41 builds solutions shaped around the specific workflows and needs of each sector.
              </p>
            </div>
            {/* Right — sector stats grid */}
            <div className="hero-animate hero-d4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { num: '7', label: 'Sectors Covered' },
                { num: '6+', label: 'Capability Areas' },
                { num: 'AI', label: 'Powered Delivery' },
                { num: '100%', label: 'Sector-Specific Solutions' },
              ].map((s, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(147,197,253,0.1)', borderRadius: 16, padding: '28px 24px' }}>
                  <div style={{ fontSize: 36, fontWeight: 800, color: 'white', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 10 }}>{s.num}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#8DADC8', letterSpacing: '0.04em', lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`.p41-ind-hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:72px;} @media(max-width:900px){.p41-ind-hero-grid{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
      </section>

      {/* ── TAB NAVIGATION ───────────────────────────────────────────── */}
      <div style={{ background: 'white', borderBottom: `1px solid ${C.gray}`, position: 'sticky', top: 64, zIndex: 100 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', position: 'relative', minWidth: 700 }}>
            {/* Connecting line: spans from center of first to center of last item (7 items → 100%/14 each side) */}
            <div style={{ position: 'absolute', top: 26, left: 'calc(100% / 14)', right: 'calc(100% / 14)', height: 1, background: C.gray, zIndex: 0 }} />
            {industries.map((ind, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  flex: 1,
                  minWidth: 100,
                  padding: '20px 8px 18px',
                  background: 'none', border: 'none',
                  borderBottom: active === i ? `2px solid ${C.blue}` : '2px solid transparent',
                  cursor: 'pointer',
                  fontFamily: 'Inter', textAlign: 'center',
                  position: 'relative', zIndex: 1,
                  transition: 'border-color 0.2s',
                }}
              >
                <div style={{
                  width: 12, height: 12, borderRadius: '50%', margin: '0 auto 10px',
                  background: active === i ? C.blue : 'white',
                  border: `2px solid ${active === i ? C.blue : '#CBD5E1'}`,
                  transition: 'all 0.25s',
                  boxShadow: active === i ? `0 0 0 5px rgba(59,130,246,0.12)` : 'none',
                }} />
                <div style={{ fontSize: 10, fontWeight: 700, color: active === i ? C.blue : '#94A3B8', letterSpacing: '0.08em', marginBottom: 4 }}>{ind.num}</div>
                <div style={{ fontSize: 12, fontWeight: active === i ? 700 : 500, color: active === i ? C.navy : '#64748B', lineHeight: 1.3 }}>{ind.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── INDUSTRY CONTENT ─────────────────────────────────────────── */}
      <section className="p41-ind-detail-section" style={{ background: 'white', padding: '80px 0 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div
            key={active}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 80,
              alignItems: 'center',
              animation: 'ind-fade 0.3s ease',
            }}
            className="p41-ind-detail"
          >
            {/* Photo */}
            <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3', position: 'relative', background: C.offWhite }}>
              <img
                src={ind.photo}
                alt={ind.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', bottom: 16, left: 16,
                background: 'rgba(15,23,42,0.82)',
                backdropFilter: 'blur(10px)',
                borderRadius: 8, padding: '7px 14px',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#22C55E' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'white', letterSpacing: '0.08em' }}>{ind.name.toUpperCase()}</span>
              </div>
            </div>

            {/* Text */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.blue, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 16 }}>
                {ind.num} · Industry Focus
              </div>
              <h2 style={{ fontSize: 'clamp(24px,2.6vw,38px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.025em', lineHeight: 1.15, margin: '0 0 18px' }}>
                {ind.headline}
              </h2>
              <p style={{ fontSize: 16, color: C.textMuted, lineHeight: 1.82, margin: '0 0 36px' }}>
                {ind.desc}
              </p>

              <div style={{ fontSize: 11, fontWeight: 800, color: '#94A3B8', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>
                What we deliver
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px', marginBottom: 36 }}>
                {ind.caps.map((cap, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.blue, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: C.navy, fontWeight: 500 }}>{cap}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                <button
                  onClick={() => go('contact')}
                  style={{
                    background: C.blue, border: 'none', borderRadius: 8, cursor: 'pointer',
                    fontFamily: 'Inter', fontSize: 14, fontWeight: 700, color: 'white',
                    padding: '12px 24px', display: 'inline-flex', alignItems: 'center', gap: 8,
                    transition: 'background 0.15s, transform 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#2563EB'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = C.blue; (e.currentTarget as HTMLElement).style.transform = 'none' }}
                >
                  Discuss {ind.name} Solutions →
                </button>
                {active < industries.length - 1 && (
                  <button
                    onClick={() => setActive(active + 1)}
                    style={{
                      background: 'none', border: `1px solid ${C.gray}`, borderRadius: 8,
                      cursor: 'pointer', fontFamily: 'Inter', fontSize: 13, fontWeight: 600,
                      color: C.textMuted, padding: '12px 18px', transition: 'border-color 0.15s, color 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = C.navy; (e.currentTarget as HTMLElement).style.color = C.navy }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = C.gray; (e.currentTarget as HTMLElement).style.color = C.textMuted }}
                  >
                    Next: {industries[active + 1].name} →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GRID OVERVIEW ────────────────────────────────────────────── */}
      <section style={{ background: C.navy, padding: '100px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <Reveal style={{ marginBottom: 56, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.lightBlue, letterSpacing: '0.16em', marginBottom: 10 }}>ALL SECTORS</div>
              <h2 style={{ fontSize: 'clamp(24px,2.4vw,36px)', fontWeight: 800, color: 'white', margin: 0, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                Every sector we serve.
              </h2>
            </div>
            <p style={{ fontSize: 14, color: '#8DADC8', maxWidth: 340, lineHeight: 1.7, margin: 0 }}>
              Select any sector to explore the specific solutions and capabilities we bring to it.
            </p>
          </Reveal>
          <Reveal type="stagger" className="p41-ind-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
            {[GraduationCap, Heart, Landmark, ShoppingBag, Radio, Building2, Rocket].map((Icon, i) => {
              const ind = industries[i]
              const isActive = active === i
              return (
                <button
                  key={i}
                  onClick={() => { setActive(i); document.querySelector('.p41-ind-detail-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }}
                  style={{
                    background: isActive ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isActive ? C.blue : 'rgba(203,213,225,0.1)'}`,
                    borderRadius: 16, padding: '28px 24px', cursor: 'pointer',
                    textAlign: 'left', fontFamily: 'Inter', transition: 'all 0.25s',
                    position: 'relative', overflow: 'hidden',
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)' }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)' }}
                >
                  {/* Ghost number */}
                  <div style={{ position: 'absolute', top: 8, right: 14, fontSize: 64, fontWeight: 900, color: isActive ? 'rgba(147,197,253,0.07)' : 'rgba(255,255,255,0.04)', lineHeight: 1, letterSpacing: '-0.04em', pointerEvents: 'none', userSelect: 'none' }}>{ind.num}</div>
                  {/* Icon */}
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: isActive ? 'rgba(147,197,253,0.18)' : 'rgba(59,130,246,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                    <Icon size={20} color={isActive ? C.lightBlue : C.blue} />
                  </div>
                  {/* Name */}
                  <div style={{ fontSize: 15, fontWeight: 800, color: isActive ? 'white' : '#CBD5E1', marginBottom: 7, lineHeight: 1.2, letterSpacing: '-0.01em' }}>{ind.name}</div>
                  {/* Headline */}
                  <div style={{ fontSize: 12, color: isActive ? '#8DADC8' : 'rgba(147,197,253,0.5)', lineHeight: 1.6 }}>{ind.headline}</div>
                  {/* Active indicator */}
                  {isActive && <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: C.blue, borderRadius: '0 0 16px 16px' }} />}
                </button>
              )
            })}
          </Reveal>
        </div>
        <style>{`.p41-ind-grid{display:grid;grid-template-columns:repeat(4,1fr);} @media(max-width:900px){.p41-ind-grid{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:500px){.p41-ind-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ background: '#0F172A', padding: '80px 40px', borderTop: '1px solid rgba(203,213,225,0.08)' }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(26px,3.5vw,46px)', fontWeight: 800, color: 'white', letterSpacing: '-0.025em', margin: '0 0 18px' }}>
            Your industry. Your solution.
          </h2>
          <p style={{ fontSize: 16, color: '#8DADC8', margin: '0 0 36px' }}>
            Whatever sector you operate in — we build the technology that helps you move forward.
          </p>
          <button
            onClick={() => go('contact')}
            style={{
              background: C.blue, border: 'none', borderRadius: 8, cursor: 'pointer',
              fontFamily: 'Inter', fontSize: 15, fontWeight: 700, color: 'white',
              padding: '13px 28px', display: 'inline-flex', alignItems: 'center', gap: 10,
              transition: 'background 0.15s',
            }}
          >
            Get a Quote →
          </button>
        </div>
      </section>

      <style>{`
        @keyframes ind-fade { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .p41-ind-detail { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
        @media(max-width:900px) { .p41-ind-detail { grid-template-columns:1fr!important; gap:40px!important; } }
      `}</style>
    </div>
  )
}
