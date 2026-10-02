import { useState } from 'react'
import { C, type Page } from '../components/tokens'
import { Reveal } from '../components/Reveal'
import { BookOpen, Hammer, Users, TrendingUp, MapPin } from 'lucide-react'

interface Props { navigate: (p: Page) => void }

type Dept = 'ALL'|'ENGINEERING'|'DESIGN'|'AI'|'MARKETING'|'OPERATIONS'

const depts: Dept[] = ['ALL','ENGINEERING','DESIGN','AI','MARKETING','OPERATIONS']

const roles = [
  { title:'[Full-Stack Software Engineer]', dept:'ENGINEERING', type:'Full-Time', location:'Remote / Lagos', desc:'Build scalable web applications and platforms using modern JavaScript frameworks. Contribute to frontend and backend development across a variety of client and internal projects.' },
  { title:'[AI/ML Engineer]', dept:'AI', type:'Full-Time', location:'Remote / Lagos', desc:'Design, build and deploy machine learning models and AI systems. Work on automation pipelines, NLP solutions and AI product integrations for clients across industries.' },
  { title:'[Product & UI/UX Designer]', dept:'DESIGN', type:'Full-Time', location:'Remote', desc:'Lead the design of digital products and interfaces across web and mobile. Combine user research, interaction design and visual craft to create professional and purposeful digital experiences.' },
  { title:'[Digital Marketing Strategist]', dept:'MARKETING', type:'Full-Time', location:'Lagos / Remote', desc:'Develop and execute digital marketing strategies for clients and Pulse41. Expertise in SEO, content strategy, social media and performance marketing is required.' },
  { title:'[Project Delivery Manager]', dept:'OPERATIONS', type:'Full-Time', location:'Lagos', desc:'Lead the delivery of digital and technology projects from scoping through to completion. Manage cross-functional teams, client relationships, timelines and quality assurance.' },
]

const values = [
  { Icon: BookOpen, label:'LEARN', desc:'A culture of continuous learning. Access to courses, tools, research and hands-on experience with emerging technology.' },
  { Icon: Hammer,   label:'BUILD', desc:'Work on real products and systems. Build things that are deployed, used and valued — not just training exercises.' },
  { Icon: Users,    label:'COLLABORATE', desc:'Work alongside designers, engineers, strategists and creatives. Ideas evolve when different disciplines think together.' },
  { Icon: TrendingUp, label:'GROW', desc:'Your career trajectory is shaped by performance, contribution and ambition — not just seniority or time served.' },
]

export function Careers({ navigate }: Props) {
  const [activeDept, setActiveDept] = useState<Dept>('ALL')
  const go = (p: Page) => { navigate(p); window.scrollTo({ top:0, behavior:'smooth' }) }

  const filtered = activeDept === 'ALL' ? roles : roles.filter(r => r.dept === activeDept)

  return (
    <div className="page-enter">
      {/* Hero */}
      <section style={{ background:C.navy, paddingTop:68, padding:'140px 32px 100px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', bottom:-80, right:-80, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div className="p41-careers-hero" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center' }}>
            <div>
              <div className="hero-animate hero-d1 section-label" style={{ color:C.lightBlue }}>CAREERS</div>
              <h1 className="hero-animate hero-d2" style={{ fontSize:'clamp(44px,5vw,68px)', fontWeight:800, lineHeight:1.0, color:'white', letterSpacing:'-0.03em', margin:'0 0 28px' }}>
                BUILD THE<br />FUTURE WITH US.
              </h1>
              <p className="hero-animate hero-d3" style={{ fontSize:18, lineHeight:1.75, color:'#8DADC8', maxWidth:460 }}>
                Pulse41 is looking for people who combine technical excellence with genuine curiosity — and who want to build meaningful things.
              </p>
            </div>
            <div className="hero-animate hero-d4" style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {[
                { label:'Current Open Roles', value:'[XX]+' },
                { label:'Team Size', value:'Growing' },
                { label:'Remote Friendly', value:'Yes' },
                { label:'Location', value:'Lagos, Nigeria + Remote' },
              ].map((stat, i) => (
                <div key={i} style={{ background:'rgba(255,255,255,0.05)', borderRadius:12, padding:'20px 24px', border:`1px solid rgba(147,197,253,0.1)`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:13, color:'#8DADC8' }}>{stat.label}</span>
                  <span style={{ fontSize:15, fontWeight:800, color:'white' }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`.p41-careers-hero{display:grid;grid-template-columns:1fr 1fr;gap:80px;} @media(max-width:900px){.p41-careers-hero{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Values */}
      <section style={{ background:'white', padding:'100px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <Reveal style={{ textAlign:'center', marginBottom:64 }}>
            <div className="section-label" style={{ justifyContent:'center' }}>WHY PULSE41</div>
            <h2 style={{ fontSize:'clamp(26px,2.8vw,40px)', fontWeight:800, color:C.navy, letterSpacing:'-0.025em', margin:0 }}>
              What you'll get when you join.
            </h2>
          </Reveal>
          <Reveal type="stagger" className="p41-values-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24 }}>
              {values.map((v, i) => (
                <div key={i} style={{ background:C.offWhite, borderRadius:16, padding:'36px 28px', border:`1px solid ${C.gray}` }}>
                  <div style={{ width:52, height:52, borderRadius:12, background:'rgba(59,130,246,0.1)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
                    <v.Icon size={24} color={C.blue} />
                  </div>
                  <div style={{ fontSize:12, fontWeight:800, color:C.blue, letterSpacing:'0.14em', marginBottom:12 }}>{v.label}</div>
                  <p style={{ fontSize:14, color:C.textMuted, lineHeight:1.7, margin:0 }}>{v.desc}</p>
                </div>
              ))}
          </Reveal>
        </div>
        <style>{`.p41-values-grid{display:grid;grid-template-columns:repeat(4,1fr);} @media(max-width:1000px){.p41-values-grid{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:580px){.p41-values-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Open roles */}
      <section style={{ background:C.offWhite, padding:'80px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <Reveal style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:40, flexWrap:'wrap', gap:20 }}>
            <h2 style={{ fontSize:'clamp(24px,2.5vw,36px)', fontWeight:800, color:C.navy, letterSpacing:'-0.02em', margin:0 }}>Open roles.</h2>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
              {depts.map(d => (
                <button key={d} onClick={() => setActiveDept(d)} style={{
                  padding:'8px 14px', borderRadius:100, border:'none', cursor:'pointer', fontFamily:'Inter',
                  fontSize:11, fontWeight:700, letterSpacing:'0.08em',
                  background: activeDept===d?C.blue:C.gray,
                  color: activeDept===d?'white':C.navy,
                  transition:'all 0.2s',
                }}>{d}</button>
              ))}
            </div>
          </Reveal>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {filtered.map((role, i) => (
              <Reveal key={i} delay={i*0.05}>
                <div className="card-hover" style={{ background:'white', borderRadius:14, padding:'28px 32px', border:`1px solid ${C.gray}`, cursor:'pointer' }}>
                  <div className="p41-role-row" style={{ display:'flex', gap:24, alignItems:'flex-start', flexWrap:'wrap' }}>
                    <div style={{ flex:1, minWidth:240 }}>
                      <div style={{ display:'flex', gap:10, marginBottom:10, flexWrap:'wrap' }}>
                        <span style={{ background:'rgba(59,130,246,0.1)', color:C.blue, fontSize:10, fontWeight:700, padding:'3px 9px', borderRadius:100 }}>{role.dept}</span>
                        <span style={{ background:C.offWhite, color:C.textMuted, fontSize:10, fontWeight:600, padding:'3px 9px', borderRadius:100 }}>{role.type}</span>
                        <span style={{ background:C.offWhite, color:C.textMuted, fontSize:10, fontWeight:600, padding:'3px 9px', borderRadius:100, display:'inline-flex', alignItems:'center', gap:4 }}><MapPin size={10} />{role.location}</span>
                      </div>
                      <h3 style={{ fontSize:18, fontWeight:700, color:C.navy, margin:'0 0 8px', lineHeight:1.3 }}>{role.title}</h3>
                      <p style={{ fontSize:13, color:C.textMuted, lineHeight:1.65, margin:0 }}>{role.desc}</p>
                    </div>
                    <button onClick={() => go('contact')} className="btn-primary" style={{ fontSize:13, padding:'12px 20px', flexShrink:0, alignSelf:'center' }}>
                      Apply Now →
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign:'center', padding:'64px 0', color:C.textMuted }}>No open roles in this department right now. Check back soon.</div>
            )}
          </div>
        </div>
      </section>

      {/* Internships & Freelance */}
      <section style={{ background:'white', padding:'80px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <div className="p41-intern-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }}>
            <Reveal type="left">
              <div style={{ background:C.navy, borderRadius:20, padding:'48px 40px', height:'100%' }}>
                <div style={{ width:52, height:52, borderRadius:12, background:'rgba(147,197,253,0.15)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                  <BookOpen size={26} color={C.lightBlue} />
                </div>
                <div style={{ fontSize:11, fontWeight:800, color:C.lightBlue, letterSpacing:'0.12em', marginBottom:12 }}>INTERNSHIPS</div>
                <h3 style={{ fontSize:24, fontWeight:800, color:'white', margin:'0 0 16px' }}>Start your career with real impact.</h3>
                <p style={{ fontSize:14, color:'#8DADC8', lineHeight:1.75, margin:'0 0 28px' }}>
                  Pulse41 internships are hands-on, mentored engagements for graduates and students interested in technology, design, marketing and operations. Interns contribute to real projects under senior guidance.
                </p>
                <button onClick={() => go('contact')} className="btn-primary">
                  Apply for Internship <span className="arrow">→</span>
                </button>
              </div>
            </Reveal>
            <Reveal type="right">
              <div style={{ background:C.offWhite, borderRadius:20, padding:'48px 40px', border:`1px solid ${C.gray}`, height:'100%' }}>
                <div style={{ width:52, height:52, borderRadius:12, background:'rgba(59,130,246,0.1)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                  <TrendingUp size={26} color={C.blue} />
                </div>
                <div style={{ fontSize:11, fontWeight:800, color:C.blue, letterSpacing:'0.12em', marginBottom:12 }}>FREELANCE & REMOTE</div>
                <h3 style={{ fontSize:24, fontWeight:800, color:C.navy, margin:'0 0 16px' }}>Work with us on specific engagements.</h3>
                <p style={{ fontSize:14, color:C.textMuted, lineHeight:1.75, margin:'0 0 28px' }}>
                  We engage skilled freelancers and remote contributors for specific project needs. If you have deep expertise in engineering, design, AI or digital marketing — and want to work on high-quality projects — we'd like to hear from you.
                </p>
                <button onClick={() => go('contact')} className="btn-primary">
                  Express Interest <span className="arrow">→</span>
                </button>
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`.p41-intern-grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;} @media(max-width:768px){.p41-intern-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* CTA */}
      <section style={{ background:C.navy, padding:'80px 32px' }}>
        <div style={{ maxWidth:640, margin:'0 auto', textAlign:'center' }}>
          <Reveal>
            <h2 style={{ fontSize:'clamp(28px,3.5vw,48px)', fontWeight:800, color:'white', letterSpacing:'-0.025em', margin:'0 0 16px' }}>
              DON'T SEE YOUR ROLE?
            </h2>
            <p style={{ fontSize:17, color:'#8DADC8', margin:'0 0 36px' }}>We're always open to conversations with exceptional people. Send us a speculative application.</p>
            <button onClick={() => go('contact')} className="btn-primary">
              Get in Touch <span className="arrow">→</span>
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
