import { useState } from 'react'
import { C, type Page } from '../components/tokens'
import { Check } from 'lucide-react'

interface Props { navigate: (p: Page) => void }

const services = [
  {
    num: '01',
    title: 'AI & Automation',
    short: 'Intelligent systems that remove bottlenecks.',
    desc: 'We design and deploy AI systems that transform how businesses operate — automating repetitive workflows, analyzing data at speed and enabling teams to focus on the work that drives real value.',
    photo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
    caps: ['AI Workflow Automation','Intelligent Process Automation','Machine Learning Products','Generative AI Integration','AI Chatbots & Assistants','Custom AI Solutions'],
    deliverables: ['Deployed AI system','Automation scripts','Integration layer','Ongoing optimization'],
    page: 'ai-solutions' as Page,
  },
  {
    num: '02',
    title: 'Software & Web Development',
    short: 'Custom software built for your exact requirements.',
    desc: 'We build websites, web applications, mobile apps and enterprise software from the ground up. Every line of code is written for performance, reliability and the people who use it every day.',
    photo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80',
    caps: ['Website Development','Web Application Development','Mobile App Development','Enterprise Software','Custom Digital Products','API & Integration Development'],
    deliverables: ['Live application','Source code','Documentation','Post-launch support'],
    page: 'contact' as Page,
  },
  {
    num: '03',
    title: 'Digital Transformation',
    short: 'Strategy and execution for organizations moving forward.',
    desc: 'From modernizing legacy systems to building new digital capabilities, Pulse41 helps organizations rethink how technology supports their operations, customer experience and competitive position.',
    photo: 'https://images.unsplash.com/photo-1758876021739-d7c60b8742a5?w=900&q=80',
    caps: ['Process Modernization','Digital Platform Development','System Integration','Enterprise Architecture','Customer Experience Transformation','Change Management'],
    deliverables: ['Digital roadmap','Modernized systems','Team training','Performance metrics'],
    page: 'contact' as Page,
  },
  {
    num: '04',
    title: 'Data & Analytics',
    short: 'Turn raw data into strategic decisions.',
    desc: 'We design data infrastructure, build analytics dashboards and deploy AI-powered insight systems that help organizations understand their operations, customers and opportunities in real time.',
    photo: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=900&q=80',
    caps: ['Data System Design','Analytics Dashboards','Business Intelligence','Reporting Platforms','AI-powered Analytics','Decision Support Systems'],
    deliverables: ['Unified data layer','Live dashboards','Analytics reports','AI insight models'],
    page: 'contact' as Page,
  },
  {
    num: '05',
    title: 'Digital Marketing & Communication',
    short: 'Visibility, voice and digital presence at scale.',
    desc: 'We help organizations build and communicate their brand through strategic digital marketing, content, SEO, social media management and corporate communication programs that drive real engagement.',
    photo: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&q=80',
    caps: ['Branding & Identity','Corporate Communication','Digital Media Marketing','Search Engine Optimization','Social Media Management','Content Strategy & Production'],
    deliverables: ['Brand identity','Content strategy','Campaign execution','Performance reporting'],
    page: 'contact' as Page,
  },
  {
    num: '06',
    title: 'Consultancy & Training',
    short: 'The knowledge and direction to move forward.',
    desc: 'Not every challenge needs a new system — sometimes it needs the right strategy. We provide technology consulting, digital roadmapping, AI advisory and training programs for teams at every level.',
    photo: 'https://images.unsplash.com/photo-1590650516494-0c8e4a4dd67e?w=900&q=80',
    caps: ['Technology Consulting','Digital Strategy','AI & ML Advisory','Training Workshops','Implementation Guidance','Digital Readiness Assessment'],
    deliverables: ['Strategic roadmap','Workshop delivery','Advisory reports','Actionable recommendations'],
    page: 'contact' as Page,
  },
]

export function Solutions({ navigate }: Props) {
  const [active, setActive] = useState(0)
  const go = (p: Page) => { navigate(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  const svc = services[active]

  return (
    <div className="page-enter" style={{ background: 'white' }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: 64, padding: '120px 40px 72px', textAlign: 'center', background: 'white', borderBottom: `1px solid ${C.gray}` }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <div style={{ width: 28, height: 2, background: C.blue }} />
            <span style={{ fontSize: 11, fontWeight: 800, color: C.blue, letterSpacing: '0.18em' }}>SERVICES & SOLUTIONS</span>
            <div style={{ width: 28, height: 2, background: C.blue }} />
          </div>
          <h1 style={{ fontSize: 'clamp(30px,4vw,54px)', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', lineHeight: 1.08, margin: '0 0 20px' }}>
            Six service areas.<br />One capable team.
          </h1>
          <p style={{ fontSize: 17, color: C.textMuted, lineHeight: 1.75, margin: '0 auto', maxWidth: 520 }}>
            Explore the full range of Pulse41 capabilities. Select a service area to see what we deliver, how we work and what you receive.
          </p>
        </div>
      </section>

      {/* ── SERVICE TAB NAVIGATION ───────────────────────────────────── */}
      <div style={{ background: 'white', borderBottom: `1px solid ${C.gray}`, position: 'sticky', top: 64, zIndex: 100 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', position: 'relative', minWidth: 600 }}>
            {/* Connecting line: spans center-to-center across 6 equal items (100%/12 each side) */}
            <div style={{ position: 'absolute', top: 26, left: 'calc(100% / 12)', right: 'calc(100% / 12)', height: 1, background: C.gray, zIndex: 0 }} />
            {services.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  flex: 1,
                  minWidth: 100,
                  padding: '20px 10px 18px',
                  background: 'none', border: 'none',
                  borderBottom: active === i ? `2px solid ${C.blue}` : '2px solid transparent',
                  cursor: 'pointer',
                  fontFamily: 'Inter', textAlign: 'center',
                  position: 'relative', zIndex: 1,
                  transition: 'border-color 0.2s',
                }}
              >
                <div style={{
                  width: 12, height: 12, borderRadius: '50%',
                  margin: '0 auto 10px',
                  background: active === i ? C.blue : 'white',
                  border: `2px solid ${active === i ? C.blue : '#CBD5E1'}`,
                  transition: 'all 0.25s',
                  boxShadow: active === i ? `0 0 0 5px rgba(59,130,246,0.12)` : 'none',
                }} />
                <div style={{ fontSize: 10, fontWeight: 700, color: active === i ? C.blue : '#94A3B8', letterSpacing: '0.08em', marginBottom: 4 }}>{s.num}</div>
                <div style={{ fontSize: 12, fontWeight: active === i ? 700 : 500, color: active === i ? C.navy : '#64748B', lineHeight: 1.3 }}>{s.title}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICE CONTENT ──────────────────────────────────────────── */}
      <section style={{ background: 'white', padding: '80px 0 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div
            key={active}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', animation: 'svc-fade 0.35s ease' }}
            className="p41-svc-detail"
          >
            {/* Photo */}
            <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4/3', position: 'relative', background: C.offWhite }}>
              <img
                src={svc.photo}
                alt={svc.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', bottom: 16, left: 16,
                background: 'rgba(15,23,42,0.82)',
                backdropFilter: 'blur(10px)',
                borderRadius: 8, padding: '7px 14px',
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.blue }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'white', letterSpacing: '0.08em' }}>{svc.num} · {svc.title.toUpperCase()}</span>
              </div>
            </div>

            {/* Content */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 800, color: C.blue, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 16 }}>
                Service Area {svc.num}
              </div>
              <h2 style={{ fontSize: 'clamp(24px,2.6vw,38px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.025em', lineHeight: 1.15, margin: '0 0 10px' }}>
                {svc.title}
              </h2>
              <div style={{ fontSize: 15, fontWeight: 600, color: C.blue, marginBottom: 18 }}>{svc.short}</div>
              <p style={{ fontSize: 15, color: C.textMuted, lineHeight: 1.82, margin: '0 0 32px' }}>{svc.desc}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 32 }}>
                {svc.caps.map((cap, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.blue, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: C.navy, fontWeight: 500 }}>{cap}</span>
                  </div>
                ))}
              </div>

              {/* Deliverables */}
              <div style={{ background: C.offWhite, borderRadius: 12, padding: '16px 20px', marginBottom: 28, border: `1px solid ${C.gray}` }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: '#94A3B8', letterSpacing: '0.12em', marginBottom: 12 }}>WHAT YOU GET</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {svc.deliverables.map((d, j) => (
                    <span key={j} style={{ background: 'white', border: `1px solid ${C.gray}`, borderRadius: 6, padding: '5px 10px', fontSize: 12, fontWeight: 600, color: C.navy, display:'inline-flex', alignItems:'center', gap:5 }}>
                      <Check size={11} color={C.blue} strokeWidth={2.5} />{d}
                    </span>
                  ))}
                </div>
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
                  Start with {svc.title} →
                </button>
                {active < services.length - 1 && (
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
                    Next: {services[active + 1].title} →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE MATRIX ───────────────────────────────────────────── */}
      <section style={{ background: C.navy, padding: '80px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 40px' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: C.lightBlue, letterSpacing: '0.16em', marginBottom: 12 }}>SERVICE MATRIX</div>
            <h2 style={{ fontSize: 'clamp(22px,2.4vw,36px)', fontWeight: 800, color: 'white', letterSpacing: '-0.025em', margin: 0 }}>
              Match your challenge to our capability.
            </h2>
          </div>
          <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(147,197,253,0.1)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 2fr', padding: '14px 24px', background: 'rgba(147,197,253,0.06)', borderBottom: '1px solid rgba(147,197,253,0.08)' }}>
              {['BUSINESS CHALLENGE','PULSE41 CAPABILITY','TECHNOLOGY','RESULT'].map(h => (
                <div key={h} style={{ fontSize: 9, fontWeight: 800, color: C.lightBlue, letterSpacing: '0.14em' }}>{h}</div>
              ))}
            </div>
            {[
              { ch:'Manual & repetitive processes', cap:'AI & Automation', tech:'ML, RPA, APIs', res:'Time savings & accuracy' },
              { ch:'Outdated legacy systems', cap:'Digital Transformation', tech:'Cloud, microservices', res:'Speed & scalability' },
              { ch:'No digital product or platform', cap:'Software & Web Development', tech:'React, Node, mobile', res:'Digital reach & revenue' },
              { ch:'Data siloed across systems', cap:'Data & Analytics', tech:'BI tools, AI models', res:'Unified intelligence' },
              { ch:'Low brand visibility', cap:'Digital Marketing', tech:'SEO, content, social', res:'Reach & engagement' },
              { ch:'Unclear technology direction', cap:'Consultancy', tech:'Assessment, roadmap', res:'Strategic clarity' },
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 2fr 2fr', padding: '18px 24px', background: i%2===0?'rgba(255,255,255,0.03)':'transparent', borderTop: '1px solid rgba(147,197,253,0.06)' }}>
                <div style={{ fontSize: 13, color: '#8DADC8' }}>{row.ch}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{row.cap}</div>
                <div style={{ fontSize: 12, color: C.lightBlue }}>{row.tech}</div>
                <div style={{ fontSize: 12, color: C.blue, fontWeight: 600 }}>↑ {row.res}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ background: C.offWhite, padding: '80px 40px', borderTop: `1px solid ${C.gray}` }}>
        <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(26px,3.5vw,44px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.025em', margin: '0 0 18px' }}>
            Not sure what you need?
          </h2>
          <p style={{ fontSize: 16, color: C.textMuted, margin: '0 0 32px', lineHeight: 1.7 }}>
            Tell us your challenge — we'll scope the right solution and give you an honest recommendation.
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
            Get a Free Consultation →
          </button>
        </div>
      </section>

      <style>{`
        @keyframes svc-fade { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .p41-svc-detail { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
        @media(max-width:900px) { .p41-svc-detail { grid-template-columns:1fr!important; gap:40px!important; } }
      `}</style>
    </div>
  )
}
