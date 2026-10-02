import { C, type Page } from '../components/tokens'
import { Reveal } from '../components/Reveal'
import { Zap, Sparkles, MessageSquare, FileText, BarChart3, Wrench } from 'lucide-react'

interface Props { navigate: (p: Page) => void }

const solutions = [
  { Icon: Zap,          title:'AI Automation', tagline:'Remove the manual, keep the value.', problem:'Repetitive workflows drain time and introduce errors across every department.', approach:'We map your processes, identify automation opportunities and build intelligent systems that handle volume without fatigue.', impact:'Reduction in manual processing time and operational cost while improving consistency and accuracy.' },
  { Icon: Sparkles,     title:'Generative AI', tagline:'Content, knowledge and creation at scale.', problem:'Organizations struggle to produce high-quality content, documentation and knowledge at the speed business demands.', approach:'We integrate generative AI into content workflows, knowledge management and creative processes — with guardrails built in.', impact:'Accelerated content production, improved knowledge retrieval and AI-assisted creative workflows.' },
  { Icon: MessageSquare,title:'AI Chatbots & Assistants', tagline:'Intelligent conversations that work 24/7.', problem:'Customer support, internal information access and communication are bottlenecked by human availability.', approach:'We design and deploy AI chatbots and intelligent assistants trained on your business data and communication style.', impact:'Faster response times, reduced support load and always-on service capability for customers and teams.' },
  { Icon: FileText,     title:'AI Content Solutions', tagline:'AI that understands your content context.', problem:'Businesses produce massive volumes of documents, reports and communications that are hard to process and act on.', approach:'We build AI content pipelines that generate, transform, summarize and extract intelligence from your content automatically.', impact:'Higher content velocity, smarter document handling and automated insight extraction from existing material.' },
  { Icon: BarChart3,    title:'AI-powered Analytics', tagline:'See patterns humans miss.', problem:'Data exists across systems but turns into insight only slowly, manually and inconsistently.', approach:'We connect your data sources, build AI analytics models and deliver dashboards that surface trends, anomalies and opportunities in real time.', impact:'Faster intelligence cycles, early-warning detection and data-driven decisions at every level.' },
  { Icon: Wrench,       title:'Custom AI Solutions', tagline:'Built for your exact problem, not someone else\'s.', problem:'Off-the-shelf AI tools rarely fit the precise needs of a specific business process, industry or workflow.', approach:'We design and build bespoke AI systems — from models to interfaces — engineered around your specific data, context and outcomes.', impact:'Highly relevant AI performance, competitive differentiation and solutions that genuinely match your operations.' },
]

const aiProcess = ['DISCOVER','DATA','MODEL','INTEGRATION','DEPLOYMENT','OPTIMIZATION']

export function AISolutions({ navigate }: Props) {
  const go = (p: Page) => { navigate(p); window.scrollTo({ top:0, behavior:'smooth' }) }

  return (
    <div className="page-enter">
      {/* Hero – dark navy */}
      <section style={{ background:C.navy, paddingTop:68, padding:'140px 32px 100px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'radial-gradient(rgba(147,197,253,0.18) 1px, transparent 1px)', backgroundSize:'36px 36px', opacity:0.35 }} />
        <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1 }}>
          <div className="p41-ai-hero" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'center' }}>
            <div>
              <div className="hero-animate hero-d1 section-label" style={{ color:C.lightBlue }}>ARTIFICIAL INTELLIGENCE</div>
              <h1 className="hero-animate hero-d2" style={{ fontSize:'clamp(44px,5vw,72px)', fontWeight:800, lineHeight:1.0, color:'white', letterSpacing:'-0.03em', margin:'0 0 28px' }}>
                INTELLIGENCE,<br />ENGINEERED.
              </h1>
              <p className="hero-animate hero-d3" style={{ fontSize:18, lineHeight:1.75, color:'#8DADC8', maxWidth:480, marginBottom:40 }}>
                Practical AI systems designed to automate processes, improve experiences, generate content and turn data into useful intelligence.
              </p>
              <div className="hero-animate hero-d4" style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
                <button onClick={() => go('contact')} className="btn-primary">
                  Discuss an AI Project <span className="arrow">→</span>
                </button>
              </div>
            </div>
            {/* Hero photo */}
            <div className="hero-animate hero-d5" style={{ borderRadius:20, overflow:'hidden', aspectRatio:'4/3', position:'relative', boxShadow:'0 24px 64px rgba(0,0,0,0.4)' }}>
              <img
                src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=85"
                alt="AI technology"
                style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
              />
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(180deg,transparent 50%,rgba(15,23,42,0.7) 100%)' }} />
              <div style={{ position:'absolute', bottom:24, left:24, right:24 }}>
                <div style={{ fontSize:11, fontWeight:800, color:C.lightBlue, letterSpacing:'0.14em', marginBottom:6 }}>PULSE41 AI</div>
                <div style={{ fontSize:15, fontWeight:700, color:'white' }}>Practical intelligence for real business problems.</div>
              </div>
            </div>
          </div>
        </div>
        <style>{`.p41-ai-hero{display:grid;grid-template-columns:1fr 1fr;gap:72px;} @media(max-width:900px){.p41-ai-hero{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* AI Solutions grid */}
      <section style={{ background:'white', padding:'100px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <Reveal style={{ textAlign:'center', marginBottom:64 }}>
            <div className="section-label" style={{ justifyContent:'center' }}>AI CAPABILITIES</div>
            <h2 style={{ fontSize:'clamp(28px,3vw,44px)', fontWeight:800, color:C.navy, letterSpacing:'-0.025em', margin:0 }}>
              Six AI solutions, one integrated platform.
            </h2>
          </Reveal>
          <Reveal type="stagger" className="p41-ai-sol-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
              {solutions.map((s, i) => (
                <div key={i} className="card-hover" style={{ background:C.offWhite, borderRadius:16, padding:'36px 30px', border:`1px solid ${C.gray}`, cursor:'pointer' }}>
                  <div style={{ width:48, height:48, borderRadius:12, background:'rgba(59,130,246,0.12)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:16 }}>
                    <s.Icon size={24} color={C.blue} />
                  </div>
                  <h3 style={{ fontSize:20, fontWeight:800, color:C.navy, margin:'0 0 6px' }}>{s.title}</h3>
                  <div style={{ fontSize:13, fontWeight:600, color:C.blue, marginBottom:20 }}>{s.tagline}</div>
                  <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                    {[{l:'PROBLEM',t:s.problem},{l:'APPROACH',t:s.approach},{l:'POTENTIAL IMPACT',t:s.impact}].map(item=>(
                      <div key={item.l}>
                        <div style={{ fontSize:10, fontWeight:800, color:C.textLight, letterSpacing:'0.1em', marginBottom:4 }}>{item.l}</div>
                        <p style={{ fontSize:13, color:C.textMuted, lineHeight:1.65, margin:0 }}>{item.t}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </Reveal>
        </div>
        <style>{`.p41-ai-sol-grid{display:grid;grid-template-columns:repeat(3,1fr);} @media(max-width:900px){.p41-ai-sol-grid{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:580px){.p41-ai-sol-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* AI Process */}
      <section style={{ background:C.offWhite, padding:'100px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <Reveal style={{ textAlign:'center', marginBottom:64 }}>
            <div className="section-label" style={{ justifyContent:'center' }}>AI PROCESS</div>
            <h2 style={{ fontSize:'clamp(26px,2.8vw,40px)', fontWeight:800, color:C.navy, letterSpacing:'-0.025em', margin:0 }}>
              From idea to deployed AI system.
            </h2>
          </Reveal>
          <Reveal type="stagger" style={{ display:'flex', alignItems:'center', gap:0, overflowX:'auto' }}>
              {aiProcess.map((step, i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', flex:1, minWidth:120 }}>
                  <div style={{ flex:1, textAlign:'center' }}>
                    <div style={{ width:52, height:52, borderRadius:'50%', background: i===0?C.blue: i===aiProcess.length-1?C.navy:'white', border:`2px solid ${i===0||i===aiProcess.length-1?'transparent':C.gray}`, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px', fontSize:11, fontWeight:800, color: i===0||i===aiProcess.length-1?'white':C.navy, boxShadow: i===0?`0 0 0 4px rgba(59,130,246,0.15)`:i===aiProcess.length-1?`0 0 0 4px rgba(30,41,59,0.12)`:'none' }}>
                      {String(i+1).padStart(2,'0')}
                    </div>
                    <div style={{ fontSize:11, fontWeight:800, color:C.navy, letterSpacing:'0.1em' }}>{step}</div>
                  </div>
                  {i < aiProcess.length-1 && (
                    <div style={{ width:24, height:1, background:C.blue, opacity:0.4, flexShrink:0 }}/>
                  )}
                </div>
              ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:C.navy, padding:'80px 32px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-80, width:400, height:400, borderRadius:'50%', background:'radial-gradient(circle,rgba(59,130,246,0.15) 0%,transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:700, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <Reveal>
            <h2 style={{ fontSize:'clamp(30px,4vw,52px)', fontWeight:800, color:'white', letterSpacing:'-0.025em', margin:'0 0 20px' }}>
              HAVE AN AI IDEA?
            </h2>
            <p style={{ fontSize:17, color:'#8DADC8', margin:'0 0 40px' }}>Let's explore what is possible for your organization.</p>
            <button onClick={() => go('contact')} className="btn-primary">
              Discuss an AI Project <span className="arrow">→</span>
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
