import { useState } from 'react'
import { C, type Page } from '../components/tokens'
import { Reveal } from '../components/Reveal'
import { FileText, BarChart3 } from 'lucide-react'

interface Props { navigate: (p: Page) => void }

type Cat = 'ALL'|'AI'|'TECHNOLOGY'|'DIGITAL MARKETING'|'BUSINESS'|'RESEARCH'

const cats: Cat[] = ['ALL','AI','TECHNOLOGY','DIGITAL MARKETING','BUSINESS','RESEARCH']

const articles = [
  { cat:'AI', title:'[The State of AI in Business: What Organizations Need to Know in 2025]', excerpt:'Artificial intelligence has crossed a threshold. It is no longer an emerging technology — it is an operational reality. This article explores where AI adoption currently stands and what it means for business leaders.', read:'8 min read', date:'[Date]' },
  { cat:'TECHNOLOGY', title:'[Why Digital Transformation Projects Fail (And How to Avoid the Common Pitfalls)]', excerpt:'The majority of digital transformation initiatives do not deliver their intended outcomes. This piece examines the structural and organizational reasons behind failure — and what successful programs do differently.', read:'6 min read', date:'[Date]' },
  { cat:'DIGITAL MARKETING', title:'[Building a Digital Presence That Actually Converts: Beyond Vanity Metrics]', excerpt:'Visibility without conversion is noise. This piece breaks down what a high-performing digital marketing strategy looks like in practice for B2B and service-based organizations.', read:'5 min read', date:'[Date]' },
  { cat:'BUSINESS', title:'[How to Build Technology That Scales: An Architecture Mindset Shift]', excerpt:'The difference between software that lasts and software that breaks is often not the technology stack — it is how decisions are made during early development. A look at what matters when building for scale.', read:'7 min read', date:'[Date]' },
  { cat:'AI', title:'[Generative AI for Business: The Practical Guide Past the Hype]', excerpt:'Every organization is being told to "implement AI." But few briefs explain how to evaluate use cases, assess readiness, or manage the cultural implications. This article provides a grounded starting point.', read:'9 min read', date:'[Date]' },
  { cat:'RESEARCH', title:'[The Digital Readiness Report: [Year]]', excerpt:'A placeholder summary of key findings from Pulse41\'s annual assessment of digital capability, adoption barriers and investment priorities across industries in Nigeria and across Africa.', read:'12 min read', date:'[Date]' },
]

const research = [
  { Icon: FileText,  title:'[Digital Transformation in Africa: [Year] Report]', desc:'Annual research report covering the state of digital adoption, technology investment and transformation outcomes across sectors.' },
  { Icon: BarChart3, title:'[AI Adoption Index: [Year]]', desc:'Research into how African organizations are investing in, deploying and measuring results from AI systems across industries.' },
  { Icon: FileText,  title:'[Software Development Trends: [Year]]', desc:'Pulse41\'s annual view on technology stack evolution, development practices and platform choices in the regional market.' },
]

export function Insights(_props: Props) {
  const [activeCat, setActiveCat] = useState<Cat>('ALL')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const filtered = activeCat === 'ALL' ? articles : articles.filter(a => a.cat === activeCat)
  const featured = articles[0]

  return (
    <div className="page-enter">
      {/* Hero */}
      <section style={{ background:C.navy, paddingTop:68, padding:'140px 32px 100px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-60, left:-60, width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ maxWidth:1280, margin:'0 auto', position:'relative', zIndex:1 }}>
          <Reveal style={{ maxWidth:700 }}>
            <div className="section-label" style={{ color:C.lightBlue }}>INSIGHTS</div>
            <h1 style={{ fontSize:'clamp(44px,5vw,72px)', fontWeight:800, lineHeight:1.0, color:'white', letterSpacing:'-0.03em', margin:'0 0 28px' }}>
              IDEAS SHAPING<br />THE FUTURE.
            </h1>
            <p style={{ fontSize:18, lineHeight:1.75, color:'#8DADC8', maxWidth:520 }}>
              Articles, research and perspectives on technology, AI, digital marketing and business transformation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filter tabs */}
      <div style={{ background:'white', borderBottom:`1px solid ${C.gray}`, position:'sticky', top:68, zIndex:50 }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px', display:'flex', gap:0, overflowX:'auto' }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActiveCat(c)} style={{
              padding:'16px 18px', background:'none', border:'none', cursor:'pointer', fontFamily:'Inter',
              fontSize:12, fontWeight:700, letterSpacing:'0.1em', color: activeCat===c?C.blue:C.textMuted,
              borderBottom: activeCat===c?`2px solid ${C.blue}`:'2px solid transparent',
              whiteSpace:'nowrap', transition:'color 0.2s',
            }}>{c}</button>
          ))}
        </div>
      </div>

      {/* Featured article */}
      <section style={{ background:C.offWhite, padding:'80px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <Reveal style={{ marginBottom:24 }}>
            <div style={{ fontSize:11, fontWeight:800, color:C.textMuted, letterSpacing:'0.12em' }}>FEATURED ARTICLE</div>
          </Reveal>
          <Reveal>
            <div className="p41-featured-article" style={{ display:'grid', gridTemplateColumns:'5fr 3fr', gap:48, background:C.navy, borderRadius:20, overflow:'hidden', padding:'56px 48px', alignItems:'center' }}>
              <div>
                <div style={{ display:'flex', gap:10, marginBottom:24 }}>
                  <span style={{ background:C.blue, color:'white', fontSize:10, fontWeight:700, padding:'4px 10px', borderRadius:100 }}>{featured.cat}</span>
                  <span style={{ color:'#8DADC8', fontSize:12 }}>{featured.date}</span>
                </div>
                <h2 style={{ fontSize:'clamp(22px,2.5vw,34px)', fontWeight:800, color:'white', lineHeight:1.25, margin:'0 0 16px', letterSpacing:'-0.02em' }}>{featured.title}</h2>
                <p style={{ fontSize:15, color:'#8DADC8', lineHeight:1.75, margin:'0 0 32px', maxWidth:520 }}>{featured.excerpt}</p>
                <button style={{ fontSize:13, fontWeight:700, color:C.lightBlue, background:'none', border:'none', cursor:'pointer', fontFamily:'Inter', padding:0 }}>
                  Read Article →
                </button>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                <div style={{ background:'rgba(255,255,255,0.06)', borderRadius:12, padding:'20px', border:`1px solid rgba(147,197,253,0.1)` }}>
                  <div style={{ fontSize:10, fontWeight:800, color:C.blue, letterSpacing:'0.12em', marginBottom:6 }}>READING TIME</div>
                  <div style={{ fontSize:18, fontWeight:800, color:'white' }}>{featured.read}</div>
                </div>
                <div style={{ background:'rgba(255,255,255,0.06)', borderRadius:12, padding:'20px', border:`1px solid rgba(147,197,253,0.1)` }}>
                  <div style={{ fontSize:10, fontWeight:800, color:C.blue, letterSpacing:'0.12em', marginBottom:6 }}>CATEGORY</div>
                  <div style={{ fontSize:15, fontWeight:700, color:'white' }}>{featured.cat}</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <style>{`.p41-featured-article{display:grid;grid-template-columns:5fr 3fr;} @media(max-width:900px){.p41-featured-article{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Articles grid */}
      <section style={{ background:'white', padding:'80px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <Reveal style={{ marginBottom:40 }}>
            <h2 style={{ fontSize:'clamp(24px,2.5vw,36px)', fontWeight:800, color:C.navy, letterSpacing:'-0.02em', margin:0 }}>All articles.</h2>
          </Reveal>
          <Reveal type="stagger" key={activeCat} className="p41-articles-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24 }}>
              {filtered.map((a, i) => (
                <div key={i} className="card-hover" style={{ background:C.offWhite, borderRadius:16, padding:'32px 28px', border:`1px solid ${C.gray}`, cursor:'pointer', display:'flex', flexDirection:'column' }}>
                  <div style={{ display:'flex', gap:8, marginBottom:16, alignItems:'center' }}>
                    <span style={{ background:C.blue, color:'white', fontSize:10, fontWeight:700, padding:'3px 9px', borderRadius:100 }}>{a.cat}</span>
                    <span style={{ fontSize:11, color:C.textLight }}>{a.date}</span>
                  </div>
                  <h3 style={{ fontSize:16, fontWeight:700, color:C.navy, margin:'0 0 12px', lineHeight:1.4, flex:1 }}>{a.title}</h3>
                  <p style={{ fontSize:13, color:C.textMuted, lineHeight:1.65, margin:'0 0 20px' }}>{a.excerpt.substring(0,140)}...</p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'auto' }}>
                    <span style={{ fontSize:12, color:C.textLight }}>{a.read}</span>
                    <button style={{ fontSize:13, fontWeight:700, color:C.blue, background:'none', border:'none', cursor:'pointer', fontFamily:'Inter', padding:0 }}>Read →</button>
                  </div>
                </div>
              ))}
          </Reveal>
          {filtered.length === 0 && (
            <div style={{ textAlign:'center', padding:'80px 0', color:C.textMuted }}>No articles found for this category.</div>
          )}
        </div>
        <style>{`.p41-articles-grid{display:grid;grid-template-columns:repeat(3,1fr);} @media(max-width:900px){.p41-articles-grid{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:600px){.p41-articles-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Research */}
      <section style={{ background:C.offWhite, padding:'80px 0' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'0 32px' }}>
          <Reveal style={{ marginBottom:48 }}>
            <div className="section-label">RESEARCH & REPORTS</div>
            <h2 style={{ fontSize:'clamp(24px,2.5vw,36px)', fontWeight:800, color:C.navy, letterSpacing:'-0.02em', margin:0 }}>
              In-depth research from Pulse41.
            </h2>
          </Reveal>
          <Reveal type="stagger" className="p41-research-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
              {research.map((r, i) => (
                <div key={i} className="card-hover" style={{ background:'white', borderRadius:14, padding:'28px', border:`1px solid ${C.gray}`, cursor:'pointer' }}>
                  <div style={{ width:48, height:48, borderRadius:12, background:'rgba(59,130,246,0.1)', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                    <r.Icon size={22} color={C.blue} />
                  </div>
                  <h3 style={{ fontSize:16, fontWeight:700, color:C.navy, margin:'0 0 10px', lineHeight:1.4 }}>{r.title}</h3>
                  <p style={{ fontSize:13, color:C.textMuted, lineHeight:1.6, margin:'0 0 20px' }}>{r.desc}</p>
                  <button style={{ fontSize:13, fontWeight:700, color:C.blue, background:'none', border:'none', cursor:'pointer', fontFamily:'Inter', padding:0 }}>
                    Download Report →
                  </button>
                </div>
              ))}
          </Reveal>
        </div>
        <style>{`.p41-research-grid{display:grid;grid-template-columns:repeat(3,1fr);} @media(max-width:900px){.p41-research-grid{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:580px){.p41-research-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Newsletter */}
      <section style={{ background:C.navy, padding:'80px 32px' }}>
        <div style={{ maxWidth:560, margin:'0 auto', textAlign:'center' }}>
          <Reveal>
            <div className="section-label" style={{ color:C.lightBlue, justifyContent:'center' }}>NEWSLETTER</div>
            <h2 style={{ fontSize:'clamp(24px,3vw,40px)', fontWeight:800, color:'white', letterSpacing:'-0.025em', margin:'0 0 12px' }}>
              Stay ahead of the curve.
            </h2>
            <p style={{ fontSize:15, color:'#8DADC8', margin:'0 0 36px' }}>Insights on AI, technology and digital strategy — direct to your inbox.</p>
            {submitted ? (
              <div style={{ background:'rgba(59,130,246,0.15)', border:`1px solid rgba(59,130,246,0.3)`, borderRadius:12, padding:'24px', color:C.lightBlue, fontWeight:600 }}>
                Thanks for subscribing! We'll be in touch.
              </div>
            ) : (
              <form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                <input
                  type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="p41-input"
                  style={{ flex:1, minWidth:240, background:'rgba(255,255,255,0.07)', border:`1px solid rgba(147,197,253,0.18)`, color:'white' }}
                />
                <button type="submit" className="btn-primary">Subscribe →</button>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  )
}
