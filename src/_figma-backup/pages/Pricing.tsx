import { useState } from 'react'
import { C, type Page } from '../components/tokens'
import { Reveal } from '../components/Reveal'
import { Check, ChevronDown } from 'lucide-react'

interface Props { navigate: (p: Page) => void }

const plans = [
  {
    tier:'STARTER', tag:'For small businesses & early-stage startups',
    headline:'Launch your digital presence.',
    features:['Professional business website','Up to 8 pages','Basic analytics setup','Contact form + CMS integration','Mobile responsive design','30-day post-launch support'],
    cta:'Let\'s Talk', highlight:false,
  },
  {
    tier:'PROFESSIONAL', tag:'For growing businesses & scale-ups',
    headline:'Build a digital platform that performs.',
    features:['Custom web application or platform','Advanced features & integrations','API & third-party connections','User management & authentication','Performance optimization','60-day support & iteration'],
    cta:'Get a Custom Quote', highlight:true,
  },
  {
    tier:'ENTERPRISE', tag:'For large organizations & complex needs',
    headline:'End-to-end transformation at scale.',
    features:['Full digital transformation scope','AI & automation integration','Multi-system integration architecture','Data & analytics platform','Dedicated delivery team','Ongoing partnership & support'],
    cta:'Book a Consultation', highlight:false,
  },
]

const faqs = [
  { q:'Does Pulse41 provide fixed-price quotes?', a:'We provide fixed-price proposals on defined scopes. For exploratory or ongoing engagements, we use retainer or time-and-materials models. Every project starts with a discovery conversation to determine the right structure.' },
  { q:'How long does a typical project take?', a:'Timeline depends heavily on scope. A simple website can be delivered in 2–4 weeks. A custom platform or AI implementation typically runs 3–6 months. Enterprise engagements are scoped individually. We share clear timelines before any project starts.' },
  { q:'Can Pulse41 work with our existing systems?', a:'Yes. Many of our engagements involve integrating new capabilities into existing infrastructure. We conduct a technical assessment early in the process to understand your stack and plan integration accordingly.' },
  { q:'Do you work with organizations outside Nigeria?', a:'Yes. Pulse41 serves clients across Africa and internationally. We work remotely by default and can accommodate on-site collaboration for enterprise clients where required.' },
  { q:'What happens after a project is delivered?', a:'We offer structured support packages post-delivery. Most clients move into an ongoing engagement for maintenance, optimization and additional development. We don\'t disappear after launch.' },
  { q:'How do I get started?', a:'Start by completing the contact form or booking a discovery call. We\'ll review your requirements, scope the engagement, and provide a detailed proposal. There is no cost for an initial consultation.' },
]

export function Pricing({ navigate }: Props) {
  const [openFaq, setOpenFaq] = useState<number|null>(null)
  const go = (p: Page) => { navigate(p); window.scrollTo({ top:0, behavior:'smooth' }) }

  return (
    <div className="page-enter">
      {/* Hero */}
      <section style={{ background:C.offWhite, paddingTop:68, padding:'140px 32px 100px' }}>
        <div style={{ maxWidth:1280, margin:'0 auto' }}>
          <Reveal style={{ maxWidth:700, textAlign:'center', margin:'0 auto' }}>
            <div className="section-label" style={{ justifyContent:'center' }}>PRICING</div>
            <h1 style={{ fontSize:'clamp(40px,5vw,68px)', fontWeight:800, lineHeight:1.0, color:C.navy, letterSpacing:'-0.03em', margin:'0 0 24px' }}>
              SOLUTIONS FOR<br />EVERY STAGE OF GROWTH.
            </h1>
            <p style={{ fontSize:18, lineHeight:1.75, color:C.textMuted, maxWidth:520, margin:'0 auto' }}>
              Flexible engagement models built around your stage, scope and goals — no cookie-cutter packages.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pricing cards */}
      <section style={{ background:'white', padding:'80px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <Reveal type="stagger" className="p41-price-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
              {plans.map((plan, i) => (
                <div key={i} style={{
                  background: plan.highlight?C.navy:C.offWhite,
                  borderRadius:20, padding:'48px 36px',
                  border: plan.highlight?'none':`1px solid ${C.gray}`,
                  position:'relative', overflow:'hidden',
                  boxShadow: plan.highlight?'0 20px 60px rgba(30,41,59,0.25)':'none',
                  transform: plan.highlight?'scale(1.02)':'none',
                }}>
                  {plan.highlight && (
                    <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${C.blue},${C.lightBlue})` }}/>
                  )}
                  {plan.highlight && (
                    <div style={{ position:'absolute', top:20, right:20, background:C.blue, color:'white', fontSize:10, fontWeight:800, padding:'4px 10px', borderRadius:100, letterSpacing:'0.1em' }}>MOST POPULAR</div>
                  )}
                  <div style={{ fontSize:11, fontWeight:800, letterSpacing:'0.14em', color: plan.highlight?C.lightBlue:C.textMuted, marginBottom:10 }}>{plan.tier}</div>
                  <div style={{ fontSize:12, color: plan.highlight?'#8DADC8':C.textMuted, marginBottom:24 }}>{plan.tag}</div>
                  <h3 style={{ fontSize:22, fontWeight:800, color: plan.highlight?'white':C.navy, lineHeight:1.3, margin:'0 0 32px' }}>{plan.headline}</h3>
                  <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:40 }}>
                    {plan.features.map((f, j) => (
                      <div key={j} style={{ display:'flex', alignItems:'center', gap:12 }}>
                        <div style={{ width:20, height:20, borderRadius:'50%', background: plan.highlight?C.blue:'rgba(59,130,246,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          <Check size={11} color={plan.highlight?'white':C.blue} strokeWidth={2.5} />
                        </div>
                        <span style={{ fontSize:13, color: plan.highlight?'#CBD5E1':C.navy }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => go('contact')} className={plan.highlight?'btn-primary':'btn-secondary'} style={{ width:'100%', justifyContent:'center' }}>
                    {plan.cta} <span className="arrow">→</span>
                  </button>
                </div>
              ))}
          </Reveal>
        </div>
        <style>{`.p41-price-grid{display:grid;grid-template-columns:repeat(3,1fr);} @media(max-width:900px){.p41-price-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Custom build block */}
      <section style={{ background:C.navy, padding:'80px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <Reveal>
            <div className="p41-custom-block" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, alignItems:'center' }}>
              <div>
                <div className="section-label" style={{ color:C.lightBlue }}>CUSTOM ENGAGEMENT</div>
                <h2 style={{ fontSize:'clamp(26px,3vw,44px)', fontWeight:800, color:'white', letterSpacing:'-0.025em', margin:'0 0 20px', lineHeight:1.1 }}>
                  Not sure what tier fits? Every project is unique.
                </h2>
                <p style={{ fontSize:16, color:'#8DADC8', lineHeight:1.75, margin:'0 0 36px' }}>
                  We scope every engagement individually — based on your business stage, technical requirements and delivery timeline. Share your challenge and we'll recommend the right approach.
                </p>
                <button onClick={() => go('contact')} className="btn-primary">
                  Request a Custom Quote <span className="arrow">→</span>
                </button>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {[
                  { l:'DISCOVERY', t:'We start with a free consultation to understand your challenge and goals.' },
                  { l:'SCOPING', t:'We define the deliverables, timeline and engagement model for your project.' },
                  { l:'PROPOSAL', t:'A clear, itemized proposal — no hidden costs, no vague milestones.' },
                  { l:'DELIVERY', t:'We build, test, deploy and support. You keep full ownership of the output.' },
                ].map(item => (
                  <div key={item.l} style={{ background:'rgba(255,255,255,0.05)', borderRadius:10, padding:'18px 20px', border:`1px solid rgba(147,197,253,0.08)` }}>
                    <div style={{ fontSize:9, fontWeight:800, color:C.blue, letterSpacing:'0.15em', marginBottom:5 }}>{item.l}</div>
                    <p style={{ fontSize:13, color:'#8DADC8', lineHeight:1.6, margin:0 }}>{item.t}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <style>{`.p41-custom-block{display:grid;grid-template-columns:1fr 1fr;gap:64px;} @media(max-width:900px){.p41-custom-block{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* FAQ */}
      <section style={{ background:C.offWhite, padding:'100px 0' }}>
        <div style={{ maxWidth:800, margin:'0 auto', padding:'0 32px' }}>
          <Reveal style={{ textAlign:'center', marginBottom:64 }}>
            <div className="section-label" style={{ justifyContent:'center' }}>FAQ</div>
            <h2 style={{ fontSize:'clamp(26px,2.8vw,40px)', fontWeight:800, color:C.navy, letterSpacing:'-0.025em', margin:0 }}>
              Common questions answered.
            </h2>
          </Reveal>
          <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i*0.05}>
                <div style={{ background:'white', borderRadius:12, overflow:'hidden', border:`1px solid ${C.gray}`, marginBottom:8 }}>
                  <button
                    onClick={() => setOpenFaq(openFaq===i?null:i)}
                    style={{ width:'100%', padding:'22px 24px', background:'none', border:'none', cursor:'pointer', display:'flex', justifyContent:'space-between', alignItems:'center', fontFamily:'Inter', textAlign:'left', gap:16 }}
                  >
                    <span style={{ fontSize:15, fontWeight:700, color:C.navy, lineHeight:1.4 }}>{faq.q}</span>
                    <span style={{ flexShrink:0, color:C.blue, transform: openFaq===i?'rotate(180deg)':'none', transition:'transform 0.25s', display:'inline-flex' }}>
                      <ChevronDown size={20} />
                    </span>
                  </button>
                  <div className="accordion-body" style={{
                    maxHeight: openFaq===i?'300px':'0',
                    opacity: openFaq===i?1:0,
                    overflow:'hidden',
                    transition:'max-height 0.35s ease, opacity 0.25s ease',
                  }}>
                    <div style={{ padding:'0 24px 22px', fontSize:14, color:C.textMuted, lineHeight:1.75 }}>{faq.a}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background:C.navy, padding:'80px 32px' }}>
        <div style={{ maxWidth:640, margin:'0 auto', textAlign:'center' }}>
          <Reveal>
            <h2 style={{ fontSize:'clamp(28px,3.5vw,48px)', fontWeight:800, color:'white', letterSpacing:'-0.025em', margin:'0 0 20px' }}>
              READY TO START?
            </h2>
            <p style={{ fontSize:17, color:'#8DADC8', margin:'0 0 40px' }}>Tell us about your project and we'll scope the right solution for you.</p>
            <button onClick={() => go('contact')} className="btn-primary">
              Get a Free Consultation <span className="arrow">→</span>
            </button>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
