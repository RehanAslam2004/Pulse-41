import { C, type Page } from '../components/tokens'
import { Reveal } from '../components/Reveal'

interface Props { navigate: (p: Page) => void }

const team = [
  { name:'[Founder / CEO]', role:'Founder & Chief Executive', bio:'Visionary leader driving Pulse41\'s strategy and growth across technology, AI and digital transformation.', img:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop' },
  { name:'[Technology Lead]', role:'Head of Engineering', bio:'Leads the engineering team, overseeing architecture, development standards and technical delivery excellence.', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop' },
  { name:'[AI / ML Lead]', role:'Head of AI & Machine Learning', bio:'Drives AI product development, machine learning research and intelligent automation across client engagements.', img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop' },
  { name:'[Design Lead]', role:'Head of Design & Experience', bio:'Leads UX strategy, product design and digital experience across all Pulse41 solutions and client platforms.', img:'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=300&fit=crop' },
  { name:'[Digital Strategy Lead]', role:'Digital Strategy Director', bio:'Guides clients through digital transformation with practical strategy, roadmaps and change management.', img:'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop' },
]

const pillars = [
  { num:'01', title:'INTELLIGENCE', desc:'We apply AI, data science and intelligent systems to solve complex business problems with clarity and precision.' },
  { num:'02', title:'INNOVATION', desc:'We challenge conventions, explore emerging technologies and design solutions that are ahead of the curve.' },
  { num:'03', title:'EXECUTION', desc:'Great ideas only matter when they are built and delivered. We are engineers, designers and strategists who execute.' },
  { num:'04', title:'PARTNERSHIP', desc:'We work alongside our clients as long-term partners, invested in their outcomes, not just their projects.' },
]

export function About({ navigate }: Props) {
  const go = (p: Page) => { navigate(p); window.scrollTo({ top:0, behavior:'smooth' }) }

  return (
    <div className="page-enter">
      {/* Hero */}
      <section style={{ background: C.offWhite, paddingTop: 68, minHeight: '70vh', display:'flex', alignItems:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', right:0, top:0, width:'45%', height:'100%', background:`linear-gradient(135deg,${C.navy} 0%,#1A3050 100%)`, clipPath:'polygon(12% 0,100% 0,100% 100%,0% 100%)', pointerEvents:'none' }} />
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'80px 32px', width:'100%', position:'relative', zIndex:1 }}>
          <div style={{ maxWidth:640 }}>
            <div className="hero-animate hero-d1 section-label">ABOUT PULSE41</div>
            <h1 className="hero-animate hero-d2" style={{ fontSize:'clamp(44px,5.5vw,76px)', fontWeight:800, lineHeight:1.0, color:C.navy, letterSpacing:'-0.03em', margin:'0 0 28px' }}>
              TECHNOLOGY<br />WITH PURPOSE.
            </h1>
            <p className="hero-animate hero-d3" style={{ fontSize:18, lineHeight:1.75, color:C.textMuted, maxWidth:500 }}>
              A modern technology company combining intelligence, engineering and creativity to solve real-world business challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section style={{ background:'white', padding:'100px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <div className="p41-about-split" style={{ display:'grid', gridTemplateColumns:'3fr 2fr', gap:80, alignItems:'center' }}>
            <Reveal type="left">
              <div className="section-label">WHO WE ARE</div>
              <h2 style={{ fontSize:'clamp(28px,3vw,42px)', fontWeight:800, color:C.navy, letterSpacing:'-0.025em', margin:'0 0 28px', lineHeight:1.15 }}>
                Pulse41 is a technology and software company building AI-powered products, digital experiences and intelligent solutions for organizations that want to move faster.
              </h2>
              <p style={{ fontSize:16, color:C.textMuted, lineHeight:1.8, margin:'0 0 20px' }}>
                We operate at the intersection of engineering, design, AI and digital strategy — working with businesses to turn complex challenges into practical, scalable digital solutions. From AI automation to software development, from digital transformation to communication strategy, Pulse41 brings the full technology stack under one roof.
              </p>
              <p style={{ fontSize:16, color:C.textMuted, lineHeight:1.8 }}>
                We believe great technology is invisible — it just works. And that the best digital products are built by teams who understand both the business problem and the engineering solution.
              </p>
            </Reveal>
            <Reveal type="right">
              <div style={{ background:C.offWhite, borderRadius:20, padding:'40px 32px', border:`1px solid ${C.gray}` }}>
                {[['Founded','Technology & AI Company'],['Focus','AI, Software, Digital Transformation'],['Approach','Engineering + Design + Strategy'],['Coverage','Full-Stack Technology Solutions']].map(([k,v])=>(
                  <div key={k} style={{ padding:'20px 0', borderBottom:`1px solid ${C.gray}` }}>
                    <div style={{ fontSize:11, fontWeight:700, color:C.blue, letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:6 }}>{k}</div>
                    <div style={{ fontSize:15, fontWeight:600, color:C.navy }}>{v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`.p41-about-split{display:grid;grid-template-columns:3fr 2fr;gap:80px;} @media(max-width:900px){.p41-about-split{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
      </section>

      {/* Vision */}
      <section style={{ background:C.navy, padding:'80px 32px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <Reveal>
            <div style={{ display:'flex', gap:24, alignItems:'flex-start', flexWrap:'wrap' }}>
              <div style={{ flex:1, minWidth:200 }}>
                <div className="section-label" style={{ color:C.lightBlue }}>VISION</div>
                <div style={{ width:48, height:3, background:C.blue, borderRadius:2, marginTop:8 }}/>
              </div>
              <div style={{ flex:4, minWidth:300 }}>
                <p style={{ fontSize:'clamp(22px,2.8vw,38px)', fontWeight:700, color:'white', lineHeight:1.45, margin:0, letterSpacing:'-0.015em' }}>
                  "To help organizations use technology to create meaningful and measurable progress — building digital systems that last, adapt and deliver real outcomes."
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section style={{ background:C.offWhite, padding:'100px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <Reveal style={{ textAlign:'center', marginBottom:64 }}>
            <div className="section-label" style={{ justifyContent:'center' }}>MISSION</div>
            <h2 style={{ fontSize:'clamp(28px,3vw,42px)', fontWeight:800, color:C.navy, letterSpacing:'-0.025em', margin:0 }}>
              Guided by four principles.
            </h2>
          </Reveal>
          <Reveal type="stagger" className="p41-mission-grid" style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:24 }}>
              {[
                { word:'Technology.', desc:'We believe technology is the most powerful lever for business transformation. We use the right tools, not the trendiest ones.' },
                { word:'Intelligence.', desc:'Every solution we build is designed to be smart — collecting data, learning from it and making systems progressively better.' },
                { word:'Innovation.', desc:'We explore new approaches, build new ideas and challenge what is considered standard in every engagement we take on.' },
                { word:'Execution.', desc:'We are a company that builds and delivers. Our measure of success is working software, not presentations or proposals.' },
              ].map((m,i)=>(
                <div key={i} style={{ background:'white', borderRadius:16, padding:'40px 36px', border:`1px solid ${C.gray}` }}>
                  <div style={{ fontSize:'clamp(28px,3vw,40px)', fontWeight:800, color:C.blue, marginBottom:16, letterSpacing:'-0.02em' }}>{m.word}</div>
                  <p style={{ fontSize:16, color:C.textMuted, lineHeight:1.7, margin:0 }}>{m.desc}</p>
                </div>
              ))}
          </Reveal>
        </div>
        <style>{`.p41-mission-grid{display:grid;grid-template-columns:repeat(2,1fr);} @media(max-width:700px){.p41-mission-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Team */}
      <section style={{ background:'white', padding:'100px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <Reveal style={{ marginBottom:56 }}>
            <div className="section-label">LEADERSHIP</div>
            <h2 style={{ fontSize:'clamp(26px,2.8vw,40px)', fontWeight:800, color:C.navy, letterSpacing:'-0.025em', margin:0 }}>
              The team behind Pulse41.
            </h2>
          </Reveal>
          <Reveal type="stagger" className="p41-team-grid" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:20 }}>
              {team.map((m, i) => (
                <div key={i} className="card-hover" style={{ background:C.offWhite, borderRadius:16, overflow:'hidden', border:`1px solid ${C.gray}` }}>
                  <div style={{ height:220, overflow:'hidden' }}>
                    <img src={m.img} alt={m.name} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                  </div>
                  <div style={{ padding:'20px 20px' }}>
                    <div style={{ fontWeight:700, fontSize:14, color:C.navy, marginBottom:4 }}>{m.name}</div>
                    <div style={{ fontSize:12, color:C.blue, fontWeight:600, marginBottom:10 }}>{m.role}</div>
                    <p style={{ fontSize:12, color:C.textMuted, lineHeight:1.6, margin:0 }}>{m.bio}</p>
                  </div>
                </div>
              ))}
          </Reveal>
        </div>
        <style>{`.p41-team-grid{display:grid;grid-template-columns:repeat(5,1fr);} @media(max-width:1100px){.p41-team-grid{grid-template-columns:repeat(3,1fr)!important;}} @media(max-width:680px){.p41-team-grid{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
      </section>

      {/* Why Pulse41 */}
      <section style={{ background:C.navy, padding:'100px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <Reveal style={{ textAlign:'center', marginBottom:64 }}>
            <div className="section-label" style={{ color:C.lightBlue, justifyContent:'center' }}>WHY PULSE41</div>
            <h2 style={{ fontSize:'clamp(28px,3vw,44px)', fontWeight:800, color:'white', letterSpacing:'-0.025em', margin:0 }}>
              Four pillars that define us.
            </h2>
          </Reveal>
          <Reveal type="stagger" className="p41-pillars-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24 }}>
              {pillars.map((p, i) => (
                <div key={i} style={{ background:'rgba(255,255,255,0.04)', borderRadius:16, padding:'36px 28px', border:`1px solid rgba(147,197,253,0.1)` }}>
                  <div style={{ fontSize:11, fontWeight:800, color:C.blue, letterSpacing:'0.12em', marginBottom:16 }}>{p.num}</div>
                  <div style={{ fontSize:20, fontWeight:800, color:'white', marginBottom:16, letterSpacing:'0.04em' }}>{p.title}</div>
                  <p style={{ fontSize:14, color:'#8DADC8', lineHeight:1.7, margin:0 }}>{p.desc}</p>
                </div>
              ))}
          </Reveal>
        </div>
        <style>{`.p41-pillars-grid{display:grid;grid-template-columns:repeat(4,1fr);} @media(max-width:900px){.p41-pillars-grid{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:560px){.p41-pillars-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* CTA */}
      <section style={{ background:C.blue, padding:'80px 32px' }}>
        <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center' }}>
          <Reveal>
            <h2 style={{ fontSize:'clamp(30px,4vw,52px)', fontWeight:800, color:'white', letterSpacing:'-0.025em', margin:'0 0 20px' }}>
              BUILD WHAT'S NEXT WITH US.
            </h2>
            <p style={{ fontSize:17, color:'rgba(255,255,255,0.8)', margin:'0 0 40px' }}>
              Whether you're starting a new digital product, transforming an existing process, or exploring AI — we're ready.
            </p>
            <button onClick={() => go('contact')} style={{ background:'white', color:C.blue, padding:'14px 32px', borderRadius:8, fontWeight:800, fontSize:16, border:'none', cursor:'pointer' }}>
              Start a Conversation →
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
