import { useState, useEffect, useCallback } from 'react'
import { C, type Page } from '../components/tokens'
import { Reveal } from '../components/Reveal'
import { GraduationCap, Heart, Landmark, ShoppingBag, Radio, Building2, Rocket } from 'lucide-react'

interface Props { navigate: (p: Page) => void }

const heroSlides = [
  { src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=85', alt: 'Technology team collaborating', label: 'COLLABORATION' },
  { src: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&q=85', alt: 'AI and data analytics', label: 'AI & DATA' },
  { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=85', alt: 'Digital transformation', label: 'INNOVATION' },
  { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85', alt: 'Business analytics dashboard', label: 'ANALYTICS' },
]

const marqueeItems = [
  'AI & AUTOMATION','SOFTWARE DEVELOPMENT','DATA & ANALYTICS',
  'DIGITAL TRANSFORMATION','DIGITAL MARKETING','CONSULTANCY & TRAINING',
  'MOBILE APPS','BRANDING & DESIGN','AI CHATBOTS','GENERATIVE AI',
  'AI & AUTOMATION','SOFTWARE DEVELOPMENT','DATA & ANALYTICS',
  'DIGITAL TRANSFORMATION','DIGITAL MARKETING','CONSULTANCY & TRAINING',
  'MOBILE APPS','BRANDING & DESIGN','AI CHATBOTS','GENERATIVE AI',
]

const industries = [
  { name:'Education',        Icon: GraduationCap, tagline:'Learning platforms & AI-assisted education', caps:['LMS / Student Platforms','AI Tutoring Assistants','Digital Communication','Analytics & Reporting'] },
  { name:'Healthcare',       Icon: Heart,          tagline:'Digital systems built around care delivery',  caps:['Patient Portals','Appointment Systems','AI Information Retrieval','Healthcare Analytics'] },
  { name:'Banking & Finance',Icon: Landmark,       tagline:'Digital financial experiences that build trust',caps:['Customer Portals','Process Automation','Financial Analytics','Compliance Systems'] },
  { name:'Retail',           Icon: ShoppingBag,    tagline:'From storefront to fulfillment — unified',     caps:['E-commerce Platforms','Customer Experience','AI Recommendations','Marketing Automation'] },
  { name:'Media & Comms',    Icon: Radio,          tagline:'Content, audience and distribution at scale',  caps:['CMS Platforms','Social Media Tools','AI Content Workflows','Audience Analytics'] },
  { name:'Government',       Icon: Building2,      tagline:'Public services built around citizens',        caps:['Digital Service Delivery','Information Management','Citizen Communication','Public Analytics'] },
  { name:'SMEs & Startups',  Icon: Rocket,         tagline:'Enterprise capability at startup velocity',    caps:['Professional Websites','Custom Software','AI Automation','Mobile App Development'] },
]

const steps = [
  { num:'01', title:'DISCOVER', desc:'Deep-dive into the challenge, context and goals before writing a single line of code.' },
  { num:'02', title:'DESIGN', desc:'Define the user experience, architecture and delivery blueprint.' },
  { num:'03', title:'BUILD', desc:'Engineer the technology with precision, performance and craft.' },
  { num:'04', title:'DEPLOY', desc:'Launch, integrate and ensure a smooth, reliable transition.' },
  { num:'05', title:'EVOLVE', desc:'Measure, learn and optimize continuously after delivery.' },
]

const articles = [
  { cat:'AI', title:'What Generative AI Means for Modern Businesses', date:'Sep 2026', read:'5 min read' },
  { cat:'Technology', title:'The Rise of Intelligent Automation in Enterprise', date:'Sep 2026', read:'4 min read' },
  { cat:'Strategy', title:'Building Digital Products That Scale', date:'Aug 2026', read:'6 min read' },
]

export function Home({ navigate }: Props) {
  const [activeInd, setActiveInd] = useState(0)
  const [heroSlide, setHeroSlide] = useState(0)
  const [heroFading, setHeroFading] = useState(false)

  const goToSlide = useCallback((idx: number) => {
    setHeroFading(true)
    setTimeout(() => {
      setHeroSlide(idx)
      setHeroFading(false)
    }, 350)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide(prev => {
        const next = (prev + 1) % heroSlides.length
        setHeroFading(true)
        setTimeout(() => setHeroFading(false), 350)
        return next
      })
    }, 4500)
    return () => clearInterval(timer)
  }, [])
  const go = (p: Page) => { navigate(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return (
    <div className="page-enter">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section style={{ background: C.offWhite, paddingTop: 68, minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 32px', width: '100%' }}>
          <div className="p41-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>
            <div>
              <div className="section-label hero-animate hero-d1">TECH · THINK · THRIVE</div>
              <h1 className="hero-animate hero-d2" style={{
                fontSize: 'clamp(52px,6vw,88px)', fontWeight: 800, lineHeight: 0.95,
                color: '#0F172A', letterSpacing: '-0.04em', margin: '0 0 28px',
              }}>
                BUILDING<br />WHAT'S<br /><span style={{ color: C.blue }}>NEXT.</span>
              </h1>
              <p className="hero-animate hero-d3" style={{ fontSize: 18, lineHeight: 1.78, color: C.textMuted, maxWidth: 480, margin: '0 0 44px' }}>
                Pulse41 builds AI-powered products, digital experiences and technology solutions
                for organizations ready to move from complexity to measurable progress.
              </p>
              <div className="hero-animate hero-d4" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <button onClick={() => go('solutions')} className="btn-primary">
                  Explore Solutions <span className="arrow">→</span>
                </button>
                <button onClick={() => go('contact')} className="btn-secondary">
                  Start a Project <span className="arrow">→</span>
                </button>
              </div>
              <div className="hero-animate hero-d5" style={{ display: 'flex', gap: 40, marginTop: 56, paddingTop: 32, borderTop: `1px solid ${C.gray}` }}>
                {[['AI-Powered','Products'],['End-to-End','Delivery'],['6+','Service Areas']].map(([v,l]) => (
                  <div key={l}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: C.navy, letterSpacing: '-0.02em' }}>{v}</div>
                    <div style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-animate hero-d6" style={{ position: 'relative' }}>
              <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3', boxShadow: '0 32px 80px rgba(30,41,59,0.18)', position: 'relative' }}>
                {/* Slides */}
                {heroSlides.map((slide, i) => (
                  <img
                    key={i}
                    src={slide.src}
                    alt={slide.alt}
                    style={{
                      position: i === 0 ? 'relative' : 'absolute',
                      inset: 0, width: '100%', height: '100%',
                      objectFit: 'cover', display: 'block',
                      opacity: i === heroSlide ? (heroFading ? 0 : 1) : 0,
                      transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1)',
                      zIndex: i === heroSlide ? 1 : 0,
                    }}
                  />
                ))}
                {/* Gradient overlay */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 50%,rgba(15,23,42,0.55) 100%)', zIndex: 2 }} />
                {/* Slide label + dots */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.16em' }}>{heroSlides[heroSlide].label}</span>
                  <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                    {heroSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => goToSlide(i)}
                        style={{
                          width: i === heroSlide ? 22 : 7,
                          height: 7, borderRadius: 4, border: 'none', cursor: 'pointer', padding: 0,
                          background: i === heroSlide ? C.lightBlue : 'rgba(255,255,255,0.4)',
                          transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {/* Slide counter */}
              <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(15,23,42,0.72)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '5px 12px', zIndex: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'white', letterSpacing: '0.1em' }}>{String(heroSlide + 1).padStart(2,'0')} / {String(heroSlides.length).padStart(2,'0')}</span>
              </div>
            </div>
          </div>
        </div>
        <style>{`.p41-hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:72px;} @media(max-width:900px){.p41-hero-grid{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
      </section>

      {/* ── CAPABILITY MARQUEE ──────────────────────────────────────────── */}
      <div style={{ background: C.navy, padding: '14px 0', overflow: 'hidden', borderTop: `3px solid ${C.blue}` }}>
        <div className="marquee-track">
          {marqueeItems.map((c, i) => (
            <span key={i} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', color: C.lightBlue, padding: '0 32px', textTransform: 'uppercase', flexShrink: 0 }}>
              {c} <span style={{ color: C.blue, margin: '0 4px' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── STATISTICS ─────────────────────────────────────────────────── */}
      <section style={{ background: C.offWhite, borderBottom: `1px solid ${C.gray}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <Reveal type="stagger" className="p41-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
            {[['[XX]+','Projects Delivered'],['[XX]+','Digital Solutions'],['7','Industries Served'],['100%','Delivery Commitment']].map(([v,l],i) => (
              <div key={i} style={{ padding: '52px 32px', textAlign: 'center', borderRight: i<3?`1px solid ${C.gray}`:'none' }}>
                <div style={{ fontSize: 52, fontWeight: 800, color: C.navy, letterSpacing: '-0.04em', lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.textMuted, marginTop: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</div>
              </div>
            ))}
          </Reveal>
        </div>
        <style>{`.p41-stats-grid{display:grid;grid-template-columns:repeat(4,1fr);} @media(max-width:768px){.p41-stats-grid{grid-template-columns:repeat(2,1fr)!important;}}`}</style>
      </section>

      {/* ── WHAT WE DO — editorial layout ──────────────────────────────── */}
      <section style={{ background: 'white', padding: '100px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
            <Reveal>
              <div>
                <div className="section-label">WHAT WE DO</div>
                <h2 style={{ fontSize: 'clamp(28px,3.2vw,46px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.08 }}>
                  TECHNOLOGY THAT MOVES<br />BUSINESS FORWARD.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <button onClick={() => go('services')} className="btn-secondary">
                All Services <span className="arrow">→</span>
              </button>
            </Reveal>
          </div>

          {/* Editorial: large feature + supporting grid */}
          <div className="p41-whatwedo-layout" style={{ display: 'grid', gridTemplateColumns: '5fr 4fr', gap: 24 }}>
            {/* Large featured service */}
            <Reveal type="left">
              <div className="card-hover" onClick={() => go('ai-solutions')} style={{
                background: C.navy, borderRadius: 20, padding: '52px 44px', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', minHeight: 420, position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position:'absolute', bottom:-60, right:-60, width:280, height:280, borderRadius:'50%', background:'radial-gradient(circle,rgba(59,130,246,0.18) 0%,transparent 70%)' }}/>
                <div style={{ fontSize:11, fontWeight:800, color:C.blue, letterSpacing:'0.14em', marginBottom:16 }}>PRIMARY CAPABILITY · 01</div>
                <h3 style={{ fontSize:'clamp(22px,2.2vw,32px)', fontWeight:800, color:'white', margin:'0 0 16px', lineHeight:1.2, letterSpacing:'-0.02em' }}>
                  AI & Automation
                </h3>
                <p style={{ fontSize:15, color:'#8DADC8', lineHeight:1.78, margin:'0 0 28px', maxWidth:400, flex:1 }}>
                  From intelligent process automation to generative AI systems, Pulse41 engineers AI capabilities that genuinely transform how organizations operate — removing bottlenecks and surfacing intelligence.
                </p>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:32 }}>
                  {['AI Automation','Generative AI','Chatbots','Analytics'].map(t=>(
                    <span key={t} style={{ background:'rgba(147,197,253,0.12)', color:C.lightBlue, fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:6 }}>{t}</span>
                  ))}
                </div>
                <span style={{ fontSize:14, fontWeight:700, color:C.lightBlue }}>Explore AI Solutions →</span>
              </div>
            </Reveal>

            {/* Supporting 3-block grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { num:'02', title:'Software & Web', desc:'Custom websites, web apps, mobile applications and enterprise software.', page:'services' as Page, color:C.blue },
                { num:'03', title:'Data & Analytics', desc:'Data systems, dashboards and AI-powered analytics that drive decisions.', page:'services' as Page, color:'#7C3AED' },
                { num:'04', title:'Digital Marketing', desc:'Branding, SEO, content strategy and corporate communication.', page:'services' as Page, color:'#059669' },
              ].map((s, i) => (
                <Reveal key={i} type="right" delay={i*0.08}>
                  <div className="card-hover" onClick={() => go(s.page)} style={{
                    background:C.offWhite, borderRadius:14, padding:'24px 28px', cursor:'pointer',
                    display:'flex', gap:20, alignItems:'center', border:`1px solid ${C.gray}`,
                  }}>
                    <div style={{ width:44, height:44, borderRadius:10, background:`${s.color}15`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <div style={{ fontSize:10, fontWeight:900, color:s.color, letterSpacing:'-0.02em' }}>{s.num}</div>
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:15, fontWeight:700, color:C.navy, marginBottom:4 }}>{s.title}</div>
                      <p style={{ fontSize:13, color:C.textMuted, lineHeight:1.6, margin:0 }}>{s.desc}</p>
                    </div>
                    <span style={{ color:C.blue, fontSize:16, flexShrink:0 }}>→</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Bottom 2 services */}
          <div className="p41-svc-bottom" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24, marginTop:24 }}>
            {[
              { num:'05', title:'Digital Transformation', desc:'Process modernization, digital platform development and end-to-end transformation initiatives that update how your organization works.', page:'services' as Page },
              { num:'06', title:'Consultancy & Training', desc:'Technology consulting, digital strategy, AI advisory and hands-on training programs for organizations at any stage of their digital journey.', page:'services' as Page },
            ].map((s, i) => (
              <Reveal key={i} delay={i*0.06}>
                <div className="card-hover" onClick={() => go(s.page)} style={{ background:C.offWhite, borderRadius:14, padding:'28px 32px', cursor:'pointer', border:`1px solid ${C.gray}` }}>
                  <div style={{ fontSize:10, fontWeight:800, color:C.blue, letterSpacing:'0.12em', marginBottom:12 }}>{s.num}</div>
                  <h3 style={{ fontSize:17, fontWeight:700, color:C.navy, margin:'0 0 10px' }}>{s.title}</h3>
                  <p style={{ fontSize:13, color:C.textMuted, lineHeight:1.68, margin:'0 0 16px' }}>{s.desc}</p>
                  <span style={{ fontSize:13, fontWeight:700, color:C.blue }}>Learn more →</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <style>{`
          .p41-whatwedo-layout{display:grid;grid-template-columns:5fr 4fr;gap:24px;}
          .p41-svc-bottom{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
          @media(max-width:900px){
            .p41-whatwedo-layout,.p41-svc-bottom{grid-template-columns:1fr!important;}
          }
        `}</style>
      </section>

      {/* ── WHY PULSE41 ─────────────────────────────────────────────────── */}
      <section style={{ background: C.navy, padding: '100px 0', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-200, right:-100, width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(59,130,246,0.08) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', position:'relative', zIndex:1 }}>
          <div className="p41-proof-layout" style={{ display:'grid', gridTemplateColumns:'5fr 6fr', gap:80, alignItems:'center' }}>
            <Reveal type="left">
              <div className="section-label" style={{ color:C.lightBlue }}>WHY PULSE41</div>
              <h2 style={{ fontSize:'clamp(28px,3vw,44px)', fontWeight:800, color:'white', letterSpacing:'-0.025em', margin:'0 0 24px', lineHeight:1.08 }}>
                We don't just advise —<br />we build and deliver.
              </h2>
              <p style={{ fontSize:16, color:'#8DADC8', lineHeight:1.82, margin:'0 0 40px' }}>
                Every Pulse41 engagement ends with deployed, working technology — not a slide deck. We own delivery from strategy through to post-launch support.
              </p>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {[
                  'End-to-end delivery — strategy to deployment',
                  'AI-native approach across every service area',
                  'Built for African markets, ready for global scale',
                  'Fixed scope, honest timelines, full ownership transfer',
                ].map((item, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <div style={{ width:20, height:20, borderRadius:'50%', background:'rgba(59,130,246,0.2)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <div style={{ width:6, height:6, borderRadius:'50%', background:C.blue }} />
                    </div>
                    <span style={{ fontSize:14, color:'#B8CDD9', fontWeight:500 }}>{item}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => go('about')} className="btn-ghost" style={{ marginTop:36 }}>
                About Pulse41 <span className="arrow">→</span>
              </button>
            </Reveal>
            <Reveal type="right">
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                {[
                  { v:'6+', l:'Service areas', sub:'AI to consultancy' },
                  { v:'7', l:'Industries', sub:'From health to gov' },
                  { v:'100%', l:'Delivery focus', sub:'We ship, not pitch' },
                  { v:'Free', l:'First consult', sub:'No commitment needed' },
                ].map((s, i) => (
                  <div key={i} style={{
                    background:'rgba(255,255,255,0.05)', border:'1px solid rgba(147,197,253,0.1)',
                    borderRadius:16, padding:'28px 24px',
                    borderTop: i<2?`3px solid ${C.blue}`:`3px solid rgba(147,197,253,0.2)`,
                  }}>
                    <div style={{ fontSize:34, fontWeight:800, color:'white', letterSpacing:'-0.03em', marginBottom:6 }}>{s.v}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:C.lightBlue, marginBottom:4 }}>{s.l}</div>
                    <div style={{ fontSize:12, color:'#64748B' }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`.p41-proof-layout{display:grid;grid-template-columns:5fr 6fr;gap:80px;} @media(max-width:900px){.p41-proof-layout{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ── AI FEATURE ─────────────────────────────────────────────────── */}
      <section style={{ background: C.navy, padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position:'absolute', top:-120, right:-80, width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:-80, left:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(147,197,253,0.05) 0%,transparent 70%)', pointerEvents:'none' }} />
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>
          <div className="p41-ai-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div>
              <Reveal>
                <div className="section-label" style={{ color: C.lightBlue }}>AI SOLUTIONS</div>
                <h2 style={{ fontSize: 'clamp(32px,3.8vw,58px)', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', margin: '0 0 24px', lineHeight: 1.0 }}>
                  INTELLIGENCE,<br />ENGINEERED.
                </h2>
                <p style={{ fontSize: 17, color: '#8DADC8', lineHeight: 1.78, margin: '0 0 36px', maxWidth: 440 }}>
                  From intelligent automation to generative AI, Pulse41 helps organizations transform complex processes into smarter digital systems that perform better at scale.
                </p>
              </Reveal>
              <Reveal type="stagger" delay={0.1}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 36 }}>
                  {['AI Automation','Generative AI','AI Chatbots','AI Content Solutions','AI Analytics','Custom AI'].map(s => (
                    <div key={s} className="ai-tag" onClick={() => go('ai-solutions')} style={{ cursor:'pointer', border:`1px solid rgba(147,197,253,0.2)`, borderRadius:8, padding:'8px 14px', fontSize:13, fontWeight:600, color:C.lightBlue, background:'rgba(147,197,253,0.06)' }}>
                      {s}
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <button onClick={() => go('ai-solutions')} className="btn-primary">
                  Explore AI Solutions <span className="arrow">→</span>
                </button>
              </Reveal>
            </div>
            <Reveal type="right">
              <div style={{ borderRadius: 20, overflow: 'hidden', aspectRatio: '4/3', position: 'relative', boxShadow: '0 24px 64px rgba(0,0,0,0.35)' }}>
                <img
                  src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=900&q=85"
                  alt="AI analytics"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,transparent 40%,rgba(15,23,42,0.6) 100%)' }} />
                <div style={{ position:'absolute', bottom:24, left:24, right:24 }}>
                  <div style={{ fontSize:11, fontWeight:800, color:C.lightBlue, letterSpacing:'0.14em', marginBottom:8 }}>AI & AUTOMATION</div>
                  <div style={{ fontSize:16, fontWeight:700, color:'white', lineHeight:1.4 }}>
                    Intelligence built into every workflow.
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
        <style>{`.p41-ai-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;} @media(max-width:900px){.p41-ai-grid{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
      </section>

      {/* ── PROCESS ────────────────────────────────────────────────────── */}
      <section style={{ background: C.offWhite, padding: '100px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <Reveal style={{ marginBottom: 72 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:24 }}>
              <div>
                <div className="section-label">OUR PROCESS</div>
                <h2 style={{ fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.1 }}>
                  FROM IDEA TO IMPACT.
                </h2>
              </div>
              <p style={{ fontSize:15, color:C.textMuted, maxWidth:360, lineHeight:1.7 }}>
                Every Pulse41 project follows a structured delivery methodology — from discovery through to post-launch optimization.
              </p>
            </div>
          </Reveal>
          {/* Connector line behind the circles */}
          <Reveal>
          <div style={{ position:'relative' }}>
            <div className="p41-process-line" style={{ position:'absolute', top:27, left:'10%', right:'10%', height:1, background:`linear-gradient(90deg,transparent,${C.blue}50,${C.lightBlue}60,${C.blue}50,transparent)` }} />
            <div className="p41-process-grid" style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:0 }}>
              {steps.map((s, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div style={{ textAlign:'center', padding:'0 20px' }}>
                    <div style={{
                      width:54, height:54, borderRadius:'50%',
                      background: i===0?C.blue:i===4?C.navy:'white',
                      border:`2px solid ${i===0?C.blue:i===4?C.navy:C.gray}`,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      margin:'0 auto 28px', fontSize:12, fontWeight:800,
                      color: i===0||i===4?'white':C.navy,
                      position:'relative', zIndex:1,
                      boxShadow: i===0?`0 0 0 8px rgba(59,130,246,0.12)`:i===4?`0 0 0 8px rgba(30,41,59,0.08)`:'none',
                    }}>{s.num}</div>
                    <div style={{ fontSize:11, fontWeight:800, color:C.navy, letterSpacing:'0.1em', marginBottom:10 }}>{s.title}</div>
                    <p style={{ fontSize:13, color:C.textMuted, lineHeight:1.7, margin:0 }}>{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          </Reveal>
        </div>
        <style>{`
          .p41-process-grid{display:grid;grid-template-columns:repeat(5,1fr);}
          .p41-process-line{display:block;transform:scaleX(0);transform-origin:left center;}
          .reveal.visible .p41-process-line{transform:scaleX(1);transition:transform 1.2s 0.15s cubic-bezier(0.22,1,0.36,1);}
          @media(max-width:768px){
            .p41-process-grid{grid-template-columns:1fr!important;gap:40px!important;}
            .p41-process-line{display:none!important;}
          }
        `}</style>
      </section>

      {/* ── INDUSTRIES — interactive selector ──────────────────────────── */}
      <section style={{ background: 'white', padding: '100px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:56, flexWrap:'wrap', gap:24 }}>
            <Reveal>
              <div>
                <div className="section-label">INDUSTRIES</div>
                <h2 style={{ fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.1 }}>
                  TECHNOLOGY ACROSS<br />INDUSTRIES.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <button onClick={() => go('industries')} className="btn-secondary">
                All Industries <span className="arrow">→</span>
              </button>
            </Reveal>
          </div>
          <Reveal>
            <div className="p41-ind-selector" style={{ display:'grid', gridTemplateColumns:'3fr 4fr', gap:24 }}>
              {/* Left: selector list */}
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {industries.map((ind, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveInd(i)}
                    style={{
                      background: activeInd===i?C.navy:C.offWhite,
                      border: `1px solid ${activeInd===i?C.navy:C.gray}`,
                      borderRadius:12, padding:'16px 20px', cursor:'pointer', fontFamily:'Inter',
                      display:'flex', alignItems:'center', gap:14, textAlign:'left',
                      transition:'all 0.2s',
                    }}
                  >
                    <div style={{ width:36, height:36, borderRadius:8, background: activeInd===i?'rgba(147,197,253,0.2)':'rgba(59,130,246,0.08)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <ind.Icon size={18} color={activeInd===i?C.lightBlue:C.blue} />
                    </div>
                    <div>
                      <div style={{ fontSize:14, fontWeight:700, color: activeInd===i?'white':C.navy, marginBottom:2 }}>{ind.name}</div>
                      <div style={{ fontSize:12, color: activeInd===i?'#8DADC8':C.textMuted }}>{ind.tagline}</div>
                    </div>
                    {activeInd===i && <span style={{ marginLeft:'auto', color:C.lightBlue }}>→</span>}
                  </button>
                ))}
              </div>
              {/* Right: detail panel */}
              <div key={activeInd} style={{ background:C.offWhite, borderRadius:20, padding:'40px', border:`1px solid ${C.gray}`, animation:'page-in 0.3s ease' }}>
                <div style={{ width:56, height:56, borderRadius:14, background:`rgba(59,130,246,0.1)`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:20 }}>
                  {(() => { const Ic = industries[activeInd].Icon; return <Ic size={28} color={C.blue} />; })()}
                </div>
                <h3 style={{ fontSize:28, fontWeight:800, color:C.navy, margin:'0 0 8px', letterSpacing:'-0.02em' }}>{industries[activeInd].name}</h3>
                <div style={{ fontSize:15, fontWeight:600, color:C.blue, marginBottom:24 }}>{industries[activeInd].tagline}</div>
                <div style={{ fontSize:12, fontWeight:800, color:C.textMuted, letterSpacing:'0.12em', marginBottom:16 }}>RELEVANT CAPABILITIES</div>
                <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                  {industries[activeInd].caps.map((cap, j) => (
                    <div key={j} style={{ display:'flex', alignItems:'center', gap:12, padding:'12px 16px', background:'white', borderRadius:10, border:`1px solid ${C.gray}` }}>
                      <div style={{ width:6, height:6, borderRadius:'50%', background:C.blue, flexShrink:0 }} />
                      <span style={{ fontSize:14, fontWeight:500, color:C.navy }}>{cap}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => go('industries')} className="btn-primary" style={{ marginTop:28, fontSize:14, padding:'11px 20px' }}>
                  Explore {industries[activeInd].name} Solutions →
                </button>
              </div>
            </div>
          </Reveal>
        </div>
        <style>{`.p41-ind-selector{display:grid;grid-template-columns:3fr 4fr;gap:24px;} @media(max-width:900px){.p41-ind-selector{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ── CASE STUDY PREVIEW ─────────────────────────────────────────── */}
      <section style={{ background: C.offWhite, padding: '100px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <Reveal style={{ marginBottom: 48 }}>
            <div className="section-label">CASE STUDIES</div>
            <h2 style={{ fontSize: 'clamp(28px,3vw,44px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.025em', margin: 0, lineHeight: 1.1 }}>
              SOLUTIONS THAT<br />CREATE IMPACT.
            </h2>
          </Reveal>
          <Reveal type="scale">
            <div className="p41-case-layout" style={{ background:C.navy, borderRadius:20, padding:'56px 48px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
              <div>
                <div style={{ display:'flex', gap:10, marginBottom:28, flexWrap:'wrap' }}>
                  <span style={{ background:C.blue, color:'white', fontSize:11, fontWeight:700, padding:'5px 12px', borderRadius:100 }}>SOFTWARE</span>
                  <span style={{ background:'rgba(147,197,253,0.12)', color:C.lightBlue, fontSize:11, fontWeight:700, padding:'5px 12px', borderRadius:100 }}>[INDUSTRY]</span>
                </div>
                <h3 style={{ fontSize:34, fontWeight:800, color:'white', margin:'0 0 20px', lineHeight:1.15, letterSpacing:'-0.02em' }}>[PROJECT NAME]</h3>
                <p style={{ fontSize:15, color:'#8DADC8', lineHeight:1.78, margin:'0 0 36px' }}>
                  A comprehensive digital platform built to address complex business challenges. Replace this with a real Pulse41 project story — challenge, approach and result.
                </p>
                <button onClick={() => go('case-studies')} className="btn-primary">
                  View Case Study <span className="arrow">→</span>
                </button>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {[
                  {l:'CHALLENGE',t:'The organization needed to modernize its systems and create a unified digital experience.'},
                  {l:'SOLUTION',t:'Pulse41 designed and delivered a custom digital platform integrating AI automation and modern UX.'},
                  {l:'RESULT',t:'[Metric] improvement in operational efficiency — replace with actual project results.'},
                ].map(item=>(
                  <div key={item.l} style={{ background:'rgba(255,255,255,0.05)', borderRadius:12, padding:'20px 24px', border:`1px solid rgba(147,197,253,0.1)` }}>
                    <div style={{ fontSize:10, fontWeight:800, color:C.blue, letterSpacing:'0.15em', marginBottom:8 }}>{item.l}</div>
                    <p style={{ fontSize:14, color:'#8DADC8', lineHeight:1.65, margin:0 }}>{item.t}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal style={{ textAlign:'center', marginTop:40 }}>
            <button onClick={() => go('case-studies')} className="btn-secondary">
              View All Case Studies <span className="arrow">→</span>
            </button>
          </Reveal>
        </div>
        <style>{`.p41-case-layout{display:grid;grid-template-columns:1fr 1fr;} @media(max-width:900px){.p41-case-layout{grid-template-columns:1fr!important;padding:36px 28px!important;}}`}</style>
      </section>

      {/* ── INSIGHTS ───────────────────────────────────────────────────── */}
      <section style={{ background: 'white', padding: '100px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:56, flexWrap:'wrap', gap:24 }}>
            <Reveal>
              <div>
                <div className="section-label">INSIGHTS</div>
                <h2 style={{ fontSize:'clamp(28px,3vw,44px)', fontWeight:800, color:C.navy, letterSpacing:'-0.025em', margin:0, lineHeight:1.1 }}>
                  IDEAS SHAPING<br />THE FUTURE.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <button onClick={() => go('insights')} className="btn-secondary">
                All Insights <span className="arrow">→</span>
              </button>
            </Reveal>
          </div>
          <Reveal type="stagger" className="p41-insight-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
              {articles.map((a, i) => (
                <div key={i} className="card-hover" onClick={() => go('insights')} style={{
                  background:C.offWhite, borderRadius:16, overflow:'hidden', border:`1px solid ${C.gray}`, cursor:'pointer',
                }}>
                  <div style={{ height:180, background:`linear-gradient(135deg,${C.navy} 0%,#1A3350 100%)`, position:'relative', display:'flex', alignItems:'flex-end', padding:24 }}>
                    <div style={{ position:'absolute', top:0, right:0, width:120, height:120, borderRadius:'0 0 0 100%', background:'rgba(59,130,246,0.08)' }} />
                    <span style={{ background:C.blue, color:'white', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:6, position:'relative', zIndex:1 }}>{a.cat}</span>
                  </div>
                  <div style={{ padding:24 }}>
                    <h3 style={{ fontSize:16, fontWeight:700, color:C.navy, margin:'0 0 16px', lineHeight:1.4 }}>{a.title}</h3>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <span style={{ fontSize:12, color:C.textLight }}>{a.date} · {a.read}</span>
                      <span style={{ fontSize:13, fontWeight:700, color:C.blue }}>Read →</span>
                    </div>
                  </div>
                </div>
              ))}
          </Reveal>
        </div>
        <style>{`.p41-insight-grid{display:grid;grid-template-columns:repeat(3,1fr);} @media(max-width:900px){.p41-insight-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────── */}
      <section style={{ background:C.navy, padding:'120px 32px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'radial-gradient(rgba(147,197,253,0.2) 1px, transparent 1px)', backgroundSize:'32px 32px', opacity:0.4 }} />
        <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <Reveal>
            <div className="section-label" style={{ color:C.lightBlue, justifyContent:'center' }}>GET STARTED</div>
            <h2 style={{ fontSize:'clamp(40px,5.5vw,72px)', fontWeight:800, color:'white', letterSpacing:'-0.035em', margin:'0 0 24px', lineHeight:1.0 }}>
              HAVE AN IDEA<br />WORTH BUILDING?
            </h2>
            <p style={{ fontSize:18, color:'#8DADC8', lineHeight:1.7, margin:'0 auto 48px', maxWidth:460 }}>
              Tell us what you're trying to solve. We'll help you turn it into a practical, well-engineered digital solution.
            </p>
            <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
              <button onClick={() => go('contact')} className="btn-primary">
                Start a Conversation <span className="arrow">→</span>
              </button>
              <button onClick={() => go('services')} className="btn-ghost">
                Explore Services <span className="arrow">→</span>
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
