import { useState } from 'react'
import { C, type Page } from '../components/tokens'
import { Reveal } from '../components/Reveal'
import { TestimonialCarousel } from '../components/TestimonialCarousel'

interface Props { navigate: (p: Page) => void }

type Filter = 'ALL'|'AI'|'SOFTWARE'|'WEB'|'MOBILE'|'DATA'

const filters: Filter[] = ['ALL','AI','SOFTWARE','WEB','MOBILE','DATA']

const cases = [
  { tag:'SOFTWARE', industry:'RETAIL', title:'[Digital Commerce Platform]', challenge:'A growing retailer needed a unified e-commerce and inventory platform to replace fragmented legacy tools across their operations.', solution:'Pulse41 built a custom commerce platform with integrated inventory, customer portal, analytics and mobile app.', result:'[XX]% increase in operational efficiency and improved customer experience across all digital touchpoints.', tech:['React','Node.js','PostgreSQL','AWS'] },
  { tag:'AI', industry:'FINANCE', title:'[AI Analytics Dashboard]', challenge:'A financial services firm needed real-time risk analytics that could surface insights from multi-source data faster than their manual processes allowed.', solution:'Pulse41 deployed an AI-powered analytics engine with automated data pipelines and real-time intelligence dashboards.', result:'[XX]% reduction in report generation time with predictive anomaly detection capabilities.', tech:['Python','TensorFlow','React','Azure'] },
  { tag:'WEB', industry:'EDUCATION', title:'[Learning Management Platform]', challenge:'An educational institution needed a modern LMS that could support blended learning, student tracking and administrative workflows at scale.', solution:'A custom LMS was built with course builder, student progress tracking, assessment tools and parent communication modules.', result:'[XX]% improvement in student engagement and [XX]% reduction in administrative processing time.', tech:['React','Django','PostgreSQL','AWS'] },
  { tag:'MOBILE', industry:'HEALTHCARE', title:'[Patient Mobile Application]', challenge:'A healthcare provider needed a patient-facing mobile app for appointment management, communication and health record access.', solution:'Pulse41 designed and developed a cross-platform mobile app with secure authentication, appointment booking and push notifications.', result:'[XX]% of appointments now self-managed through the app, reducing call volume significantly.', tech:['React Native','Node.js','FHIR API','Firebase'] },
]

export function CaseStudies({ navigate }: Props) {
  const [activeFilter, setActiveFilter] = useState<Filter>('ALL')
  const go = (p: Page) => { navigate(p); window.scrollTo({ top:0, behavior:'smooth' }) }

  const filtered = activeFilter === 'ALL' ? cases : cases.filter(c => c.tag === activeFilter)

  return (
    <div className="page-enter">
      {/* Hero */}
      <section style={{ background:C.navy, paddingTop:68, padding:'140px 32px 100px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', bottom:-60, right:-60, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(59,130,246,0.12) 0%,transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1 }}>
          <Reveal style={{ maxWidth:680 }}>
            <div className="section-label" style={{ color:C.lightBlue }}>CASE STUDIES</div>
            <h1 style={{ fontSize:'clamp(44px,5vw,72px)', fontWeight:800, lineHeight:1.0, color:'white', letterSpacing:'-0.03em', margin:'0 0 28px' }}>
              FROM CHALLENGE<br />TO IMPACT.
            </h1>
            <p style={{ fontSize:18, lineHeight:1.75, color:'#8DADC8', maxWidth:520 }}>
              Explore how technology, design and strategy come together to solve real business problems.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter tabs */}
      <div style={{ background:'white', borderBottom:`1px solid ${C.gray}`, position:'sticky', top:68, zIndex:50 }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', display:'flex', gap:4, overflowX:'auto' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding:'16px 20px', background:'none', border:'none', cursor:'pointer', fontFamily:'Inter',
              fontSize:12, fontWeight:700, letterSpacing:'0.1em', color: activeFilter===f?C.blue:C.textMuted,
              borderBottom: activeFilter===f?`2px solid ${C.blue}`:'2px solid transparent',
              whiteSpace:'nowrap', transition:'color 0.2s',
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Featured case study */}
      <section style={{ background:C.offWhite, padding:'80px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <Reveal>
            <div style={{ background:C.navy, borderRadius:20, overflow:'hidden' }}>
              <div className="p41-featured-case" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:0 }}>
                <div style={{ padding:'56px 48px' }}>
                  <div style={{ display:'flex', gap:10, marginBottom:28, flexWrap:'wrap' }}>
                    <span style={{ background:C.blue, color:'white', fontSize:11, fontWeight:700, padding:'5px 12px', borderRadius:100 }}>FEATURED</span>
                    <span style={{ background:'rgba(147,197,253,0.12)', color:C.lightBlue, fontSize:11, fontWeight:700, padding:'5px 12px', borderRadius:100 }}>SOFTWARE</span>
                  </div>
                  <h2 style={{ fontSize:'clamp(26px,2.8vw,38px)', fontWeight:800, color:'white', margin:'0 0 20px', lineHeight:1.2 }}>
                    [Featured Project Name]
                  </h2>
                  <p style={{ fontSize:15, color:'#8DADC8', lineHeight:1.75, margin:'0 0 36px' }}>
                    A flagship digital transformation engagement representing the depth of Pulse41's end-to-end delivery capability — from discovery through to live deployment and optimization.
                  </p>
                  <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:36 }}>
                    {['React','Node.js','AI/ML','AWS'].map(t=>(
                      <span key={t} style={{ background:'rgba(59,130,246,0.15)', color:C.lightBlue, fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:6 }}>{t}</span>
                    ))}
                  </div>
                  <button onClick={() => go('contact')} className="btn-primary">
                    Start a Similar Project <span className="arrow">→</span>
                  </button>
                </div>
                <div style={{ background:'rgba(255,255,255,0.04)', padding:'56px 40px', borderLeft:`1px solid rgba(147,197,253,0.08)`, display:'flex', flexDirection:'column', gap:20 }}>
                  {[{l:'CHALLENGE',t:'The organization faced operational bottlenecks from fragmented legacy systems that were slowing down team velocity and customer experience.'},
                    {l:'APPROACH',t:'Pulse41 conducted a full discovery, redesigned the core workflows and built a unified platform that replaced four separate legacy systems.'},
                    {l:'SOLUTION',t:'A modular, cloud-native platform with AI automation, real-time analytics, API integrations and a modern user interface.'},
                    {l:'RESULT',t:'[XX]% increase in operational efficiency. [XX]% reduction in support volume. [XX]% improvement in user satisfaction scores.'}
                  ].map(item=>(
                    <div key={item.l} style={{ background:'rgba(255,255,255,0.04)', borderRadius:10, padding:'16px 20px', border:`1px solid rgba(147,197,253,0.08)` }}>
                      <div style={{ fontSize:9, fontWeight:800, color:C.blue, letterSpacing:'0.15em', marginBottom:6 }}>{item.l}</div>
                      <p style={{ fontSize:13, color:'#8DADC8', lineHeight:1.6, margin:0 }}>{item.t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <style>{`.p41-featured-case{display:grid;grid-template-columns:1fr 1fr;} @media(max-width:900px){.p41-featured-case{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Case study cards */}
      <section style={{ background:'white', padding:'80px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <Reveal style={{ marginBottom:40 }}>
            <h2 style={{ fontSize:'clamp(24px,2.5vw,36px)', fontWeight:800, color:C.navy, letterSpacing:'-0.02em', margin:0 }}>
              More projects.
            </h2>
          </Reveal>
          <Reveal type="stagger" key={activeFilter} className="p41-cases-grid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:24 }}>
              {filtered.map((c, i) => (
                <div key={i} className="card-hover" style={{ background:C.offWhite, borderRadius:16, padding:'36px 32px', border:`1px solid ${C.gray}`, cursor:'pointer' }}>
                  <div style={{ display:'flex', gap:10, marginBottom:20, flexWrap:'wrap' }}>
                    <span style={{ background:C.blue, color:'white', fontSize:10, fontWeight:700, padding:'4px 10px', borderRadius:100 }}>{c.tag}</span>
                    <span style={{ background:'rgba(30,41,59,0.07)', color:C.navy, fontSize:10, fontWeight:700, padding:'4px 10px', borderRadius:100 }}>{c.industry}</span>
                  </div>
                  <h3 style={{ fontSize:20, fontWeight:800, color:C.navy, margin:'0 0 16px', lineHeight:1.3 }}>{c.title}</h3>
                  <div style={{ display:'flex', flexDirection:'column', gap:14, marginBottom:24 }}>
                    {[{l:'Challenge',t:c.challenge},{l:'Solution',t:c.solution},{l:'Result',t:c.result}].map(item=>(
                      <div key={item.l}>
                        <div style={{ fontSize:10, fontWeight:800, color:C.blue, letterSpacing:'0.12em', marginBottom:4 }}>{item.l.toUpperCase()}</div>
                        <p style={{ fontSize:13, color:C.textMuted, lineHeight:1.6, margin:0 }}>{item.t}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                    {c.tech.map(t=>(
                      <span key={t} style={{ background:'white', border:`1px solid ${C.gray}`, fontSize:11, fontWeight:600, padding:'3px 8px', borderRadius:6, color:C.navy }}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
          </Reveal>
          {filtered.length === 0 && (
            <div style={{ textAlign:'center', padding:'80px 0', color:C.textMuted }}>
              <div style={{ fontSize:40, marginBottom:16 }}>🔍</div>
              <p>No case studies found for this filter. More coming soon.</p>
            </div>
          )}
        </div>
        <style>{`.p41-cases-grid{display:grid;grid-template-columns:repeat(2,1fr);} @media(max-width:768px){.p41-cases-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Testimonials */}
      <section style={{ background:C.offWhite, padding:'100px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <Reveal style={{ textAlign:'center', marginBottom:64 }}>
            <div className="section-label" style={{ justifyContent:'center' }}>TESTIMONIALS</div>
            <h2 style={{ fontSize:'clamp(26px,2.8vw,40px)', fontWeight:800, color:C.navy, letterSpacing:'-0.025em', margin:'0 0 12px' }}>
              What clients say about Pulse41.
            </h2>
            <p style={{ fontSize:15, color:C.textMuted, margin:0 }}>Placeholder testimonials — replace with verified client feedback.</p>
          </Reveal>
          <Reveal type="scale">
            <TestimonialCarousel />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:C.navy, padding:'80px 32px' }}>
        <div style={{ maxWidth:700, margin:'0 auto', textAlign:'center' }}>
          <Reveal>
            <h2 style={{ fontSize:'clamp(28px,3.5vw,48px)', fontWeight:800, color:'white', letterSpacing:'-0.025em', margin:'0 0 20px' }}>
              HAVE A CHALLENGE<br />WE CAN SOLVE?
            </h2>
            <p style={{ fontSize:17, color:'#8DADC8', margin:'0 0 40px' }}>Tell us about your project — we'll help you scope the right solution.</p>
            <button onClick={() => go('contact')} className="btn-primary">
              Start a Project <span className="arrow">→</span>
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
