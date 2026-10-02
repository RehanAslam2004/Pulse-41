import { C, type Page } from '../components/tokens'
import { Reveal } from '../components/Reveal'

interface Props { navigate: (p: Page) => void }

const primary = [
  {
    num:'01', title:'AI & Automation', color:C.blue,
    tagline:'Intelligent systems that remove bottlenecks and surface intelligence.',
    desc:'We design and deploy AI systems that transform how businesses operate — automating repetitive workflows, analyzing data at speed, and enabling teams to focus on the work that matters most.',
    caps:['AI Workflow Automation','Intelligent Process Automation (IPA)','Machine Learning Products','AI Integration & Deployment','Robotic Process Automation (RPA)','Business Process Automation'],
    visual: { label:'AI AUTOMATION WORKFLOW', nodes:['DATA INPUT','PROCESSING','AI ANALYSIS','OUTPUT','ACTION'] },
    page:'ai-solutions' as Page, cta:'Explore AI Solutions',
  },
  {
    num:'02', title:'Software & Web Solutions', color:'#7C3AED',
    tagline:'Custom software built for your exact requirements — not adapted from a template.',
    desc:'We build websites, web applications, mobile apps and enterprise software from the ground up. Every line of code is written for performance, scale and the people who will use it every day.',
    caps:['Website Development','Web Application Development','Mobile App Development (iOS/Android)','Enterprise Software Solutions','Custom Digital Products','API & Integration Development'],
    visual: { label:'PLATFORM DELIVERY PIPELINE', nodes:['DESIGN','FRONTEND','BACKEND','DATABASE','DEPLOY'] },
    page:'contact' as Page, cta:'Start a Project',
  },
  {
    num:'03', title:'Digital Transformation', color:'#059669',
    tagline:'Strategy and execution for organizations moving from legacy to modern.',
    desc:'From modernizing aging systems to building entirely new digital capabilities, Pulse41 helps organizations rethink how technology supports their operations, customer experience and competitive position.',
    caps:['Process Modernization','Digital Platform Development','System Integration','Enterprise Architecture','Customer Experience Transformation','Change Management & Adoption'],
    visual: { label:'TRANSFORMATION ROADMAP', nodes:['DISCOVERY','STRATEGY','ARCHITECTURE','BUILD','LAUNCH'] },
    page:'contact' as Page, cta:'Start a Transformation',
  },
]

const secondary = [
  { num:'04', title:'Data & Analytics', desc:'Data systems, dashboards and AI-powered analytics that convert raw information into strategic decisions at every level of the organization.', caps:['Data System Design','Analytics Dashboards','Business Intelligence','AI-powered Analytics','Reporting Platforms'], page:'contact' as Page },
  { num:'05', title:'Digital Marketing & Communication', desc:'Branding, SEO, social media management, content strategy, video and corporate communication that creates real audience engagement.', caps:['Branding & Identity','SEO & Content Strategy','Social Media Management','Corporate Communication','Video Editing & Graphic Design'], page:'contact' as Page },
  { num:'06', title:'Consultancy & Training', desc:'Technology consulting, digital strategy, AI advisory and practical training programs for organizations at any stage of their digital journey.', caps:['Technology Consulting','Digital Strategy & Roadmapping','AI & ML Advisory','Training Workshops','Digital Readiness Assessment'], page:'contact' as Page },
]

const matrix = [
  { challenge:'Manual & repetitive processes', capability:'AI & Automation', tech:'ML, RPA, APIs', result:'Saved time, improved accuracy' },
  { challenge:'Outdated legacy systems', capability:'Digital Transformation', tech:'Cloud, microservices', result:'Speed and scalability' },
  { challenge:'No digital presence or product', capability:'Software & Web Solutions', tech:'React, Node, mobile', result:'Digital reach & revenue' },
  { challenge:'Data siloed across systems', capability:'Data & Analytics', tech:'BI tools, AI models', result:'Unified intelligence' },
  { challenge:'Low brand visibility', capability:'Digital Marketing', tech:'SEO, content, social', result:'Reach & engagement' },
  { challenge:'Unclear technology direction', capability:'Consultancy', tech:'Assessment, roadmap', result:'Strategic clarity' },
]

export function Services({ navigate }: Props) {
  const go = (p: Page) => { navigate(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className="page-enter">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ background:`linear-gradient(140deg,${C.navy} 0%,#1A3050 100%)`, paddingTop:68, padding:'140px 32px 100px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <div className="p41-svc-hero" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
            <div>
              <div className="hero-animate hero-d1 section-label" style={{ color:C.lightBlue }}>SERVICES</div>
              <h1 className="hero-animate hero-d2" style={{ fontSize:'clamp(44px,5.5vw,76px)', fontWeight:800, lineHeight:0.96, color:'white', letterSpacing:'-0.035em', margin:'0 0 28px' }}>
                FROM STRATEGY<br />TO EXECUTION.
              </h1>
              <p className="hero-animate hero-d3" style={{ fontSize:18, lineHeight:1.78, color:'#B8CDD9', maxWidth:460 }}>
                Six integrated service areas — AI, software, data, transformation, marketing and consultancy — each contributing to one coherent outcome for your organization.
              </p>
            </div>
            <div className="hero-animate hero-d4">
              <div style={{ background:'rgba(255,255,255,0.04)', border:`1px solid rgba(147,197,253,0.1)`, borderRadius:16, padding:'28px', display:'flex', flexDirection:'column', gap:10 }}>
                {['01 · AI & Automation','02 · Software & Web Solutions','03 · Digital Transformation','04 · Data & Analytics','05 · Digital Marketing','06 · Consultancy & Training'].map((s, i) => (
                  <div key={i} style={{
                    padding:'14px 18px', borderRadius:10,
                    background: i===0?C.blue:i===1?'rgba(124,58,237,0.2)':i===2?'rgba(5,150,105,0.15)':'rgba(255,255,255,0.04)',
                    border: `1px solid ${i===0?'transparent':i===1?'rgba(124,58,237,0.25)':i===2?'rgba(5,150,105,0.25)':'rgba(147,197,253,0.08)'}`,
                    display:'flex', alignItems:'center', justifyContent:'space-between',
                  }}>
                    <span style={{ fontSize:13, fontWeight:700, color: i<3?'white':'#8DADC8' }}>{s}</span>
                    {i<3 && <span style={{ fontSize:10, fontWeight:700, color: i===0?'rgba(255,255,255,0.7)':i===1?'#A78BFA':'#6EE7B7', letterSpacing:'0.1em' }}>PRIMARY</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`.p41-svc-hero{display:grid;grid-template-columns:1fr 1fr;gap:80px;} @media(max-width:900px){.p41-svc-hero{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ── PRIMARY SERVICES — editorial alternating ──────────────────── */}
      {primary.map((svc, i) => (
        <section key={i} style={{ background: i%2===0?'white':C.offWhite, padding:'96px 0', borderBottom:`1px solid ${C.gray}` }}>
          <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
            <div className="p41-svc-editorial" style={{ display:'flex', flexDirection: i%2===1?'row-reverse':'row', gap:80, alignItems:'start' }}>
              <div style={{ flex:1 }}>
                <Reveal type={i%2===0?'left':'right'}>
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
                    <div style={{ width:40, height:40, borderRadius:10, background:`${svc.color}18`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <span style={{ fontSize:11, fontWeight:900, color:svc.color }}>{svc.num}</span>
                    </div>
                    <div style={{ width:1, height:28, background:C.gray }}/>
                    <span style={{ fontSize:11, fontWeight:800, color:svc.color, letterSpacing:'0.1em' }}>SERVICE AREA</span>
                  </div>
                  <h2 style={{ fontSize:'clamp(28px,3vw,46px)', fontWeight:800, color:C.navy, letterSpacing:'-0.025em', margin:'0 0 12px', lineHeight:1.1 }}>{svc.title}</h2>
                  <div style={{ fontSize:16, fontWeight:600, color:svc.color, marginBottom:20 }}>{svc.tagline}</div>
                  <p style={{ fontSize:16, color:C.textMuted, lineHeight:1.82, margin:'0 0 32px' }}>{svc.desc}</p>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:36 }}>
                    {svc.caps.map((cap, j) => (
                      <span key={j} style={{ background: i%2===0?C.offWhite:'white', border:`1px solid ${C.gray}`, fontSize:13, fontWeight:500, padding:'6px 12px', borderRadius:8, color:C.navy }}>
                        {cap}
                      </span>
                    ))}
                  </div>
                  <button onClick={() => go(svc.page)} className="btn-primary" style={{ fontSize:14 }}>
                    {svc.cta} <span className="arrow">→</span>
                  </button>
                </Reveal>
              </div>
              <Reveal type={i%2===0?'right':'left'} style={{ flex:1 }}>
                <div style={{ background: i%2===0?C.offWhite:'white', borderRadius:20, padding:'36px 32px', border:`1px solid ${C.gray}` }}>
                  <div style={{ fontSize:10, fontWeight:800, color:svc.color, letterSpacing:'0.14em', marginBottom:28 }}>{svc.visual.label}</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                    {svc.visual.nodes.map((node, j) => (
                      <div key={j}>
                        <div style={{
                          padding:'16px 20px', borderRadius:10,
                          background: j===0?svc.color: j===svc.visual.nodes.length-1?C.navy:'white',
                          border:`1px solid ${j===0||j===svc.visual.nodes.length-1?'transparent':C.gray}`,
                          display:'flex', alignItems:'center', gap:12,
                        }}>
                          <div style={{ width:28, height:28, borderRadius:'50%', background: j===0||j===svc.visual.nodes.length-1?'rgba(255,255,255,0.15)':C.offWhite, display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:800, color: j===0||j===svc.visual.nodes.length-1?'white':svc.color, flexShrink:0 }}>
                            {String(j+1).padStart(2,'0')}
                          </div>
                          <span style={{ fontSize:14, fontWeight:700, color: j===0||j===svc.visual.nodes.length-1?'white':C.navy }}>{node}</span>
                          {j===0 && <span style={{ marginLeft:'auto', fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.6)' }}>START</span>}
                          {j===svc.visual.nodes.length-1 && <span style={{ marginLeft:'auto', fontSize:10, fontWeight:700, color:'rgba(255,255,255,0.6)' }}>OUTPUT</span>}
                        </div>
                        {j < svc.visual.nodes.length-1 && (
                          <div style={{ marginLeft:22, height:16, borderLeft:`1px dashed ${svc.color}60` }}/>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:24 }}>
                    {[{l:'Efficiency gain',v:'↑ [XX]%'},{l:'Manual work',v:'↓ [XX]%'}].map(m=>(
                      <div key={m.l} style={{ background:i%2===0?'white':C.offWhite, borderRadius:10, padding:'14px', border:`1px solid ${C.gray}`, textAlign:'center' }}>
                        <div style={{ fontSize:18, fontWeight:800, color:svc.color, marginBottom:4 }}>{m.v}</div>
                        <div style={{ fontSize:11, color:C.textMuted }}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
          <style>{`.p41-svc-editorial{display:flex;gap:80px;} @media(max-width:900px){.p41-svc-editorial{flex-direction:column!important;}}`}</style>
        </section>
      ))}

      {/* ── SECONDARY SERVICES — 3-column ────────────────────────────── */}
      <section style={{ background: C.offWhite, padding:'96px 0', borderBottom:`1px solid ${C.gray}` }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <Reveal style={{ marginBottom:56 }}>
            <div className="section-label">ADDITIONAL CAPABILITIES</div>
            <h2 style={{ fontSize:'clamp(26px,2.8vw,40px)', fontWeight:800, color:C.navy, letterSpacing:'-0.025em', margin:0, lineHeight:1.1 }}>
              Depth across the full digital stack.
            </h2>
          </Reveal>
          <Reveal type="stagger" className="p41-sec-svc" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
              {secondary.map((s, i) => (
                <div key={i} className="card-hover" style={{ background:'white', borderRadius:16, padding:'36px 32px', border:`1px solid ${C.gray}`, cursor:'pointer' }} onClick={() => go(s.page)}>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:20 }}>
                    <span style={{ fontSize:11, fontWeight:800, color:C.blue, letterSpacing:'0.1em' }}>{s.num}</span>
                    <span style={{ fontSize:18, color:C.blue }}>→</span>
                  </div>
                  <h3 style={{ fontSize:20, fontWeight:800, color:C.navy, margin:'0 0 14px', lineHeight:1.25 }}>{s.title}</h3>
                  <p style={{ fontSize:14, color:C.textMuted, lineHeight:1.75, margin:'0 0 24px' }}>{s.desc}</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {s.caps.map((cap, j) => (
                      <div key={j} style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <div style={{ width:5, height:5, borderRadius:'50%', background:C.blue, flexShrink:0 }} />
                        <span style={{ fontSize:13, color:C.navy, fontWeight:500 }}>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </Reveal>
        </div>
        <style>{`.p41-sec-svc{display:grid;grid-template-columns:repeat(3,1fr);} @media(max-width:900px){.p41-sec-svc{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ── SERVICE MATRIX ─────────────────────────────────────────────── */}
      <section style={{ background:C.navy, padding:'100px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <Reveal style={{ marginBottom:56 }}>
            <div className="section-label" style={{ color:C.lightBlue }}>SERVICE MATRIX</div>
            <h2 style={{ fontSize:'clamp(26px,2.8vw,40px)', fontWeight:800, color:'white', letterSpacing:'-0.025em', margin:0 }}>
              Match your challenge to our capability.
            </h2>
          </Reveal>
          <Reveal type="stagger" style={{ borderRadius:16, overflow:'hidden', border:`1px solid rgba(147,197,253,0.1)` }}>
              <div style={{ display:'grid', gridTemplateColumns:'2fr 2fr 2fr 2fr', padding:'14px 24px', background:'rgba(147,197,253,0.06)', borderBottom:`1px solid rgba(147,197,253,0.08)` }}>
                {['BUSINESS CHALLENGE','PULSE41 CAPABILITY','TECHNOLOGY','RESULT'].map(h=>(
                  <div key={h} style={{ fontSize:10, fontWeight:800, color:C.lightBlue, letterSpacing:'0.14em' }}>{h}</div>
                ))}
              </div>
              {matrix.map((row, i) => (
                <div key={i} style={{ display:'grid', gridTemplateColumns:'2fr 2fr 2fr 2fr', padding:'20px 24px', background: i%2===0?'rgba(255,255,255,0.03)':'transparent', borderTop:`1px solid rgba(147,197,253,0.06)` }}>
                  <div style={{ fontSize:14, color:'#8DADC8' }}>{row.challenge}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:'white' }}>{row.capability}</div>
                  <div style={{ fontSize:13, color:C.lightBlue }}>{row.tech}</div>
                  <div style={{ fontSize:13, color:C.blue, fontWeight:600 }}>↑ {row.result}</div>
                </div>
              ))}
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ background: C.offWhite, padding:'80px 32px' }}>
        <div style={{ maxWidth:700, margin:'0 auto', textAlign:'center' }}>
          <Reveal>
            <h2 style={{ fontSize:'clamp(28px,3.5vw,48px)', fontWeight:800, color:C.navy, letterSpacing:'-0.025em', margin:'0 0 16px' }}>
              NOT SURE WHAT YOU NEED?
            </h2>
            <p style={{ fontSize:17, color:C.textMuted, margin:'0 0 36px' }}>
              Let's discuss your challenge — we'll identify the right solution and scope it properly.
            </p>
            <button onClick={() => go('contact')} className="btn-primary">
              Get a Free Consultation <span className="arrow">→</span>
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
