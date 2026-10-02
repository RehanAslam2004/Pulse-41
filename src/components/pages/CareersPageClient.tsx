'use client'

import { useState } from 'react'
import { C } from '@/lib/design/tokens'
import { Reveal } from '@/components/motion/Reveal'
import { BookOpen, Hammer, Users, TrendingUp, MapPin } from 'lucide-react'
import { JobApplicationModal } from '@/components/sections/JobApplicationModal'

type Dept = 'ALL' | 'ENGINEERING' | 'DESIGN' | 'AI' | 'MARKETING' | 'OPERATIONS'

const depts: Dept[] = ['ALL', 'ENGINEERING', 'DESIGN', 'AI', 'MARKETING', 'OPERATIONS']

const defaultRoles = [
  {
    title: 'Senior Full-Stack Engineer (React & Node.js)',
    dept: 'ENGINEERING',
    type: 'Full-Time',
    location: 'Pakistan + Remote',
    desc: 'Architect and build robust, high-performance web applications and cloud integrations. Lead code reviews and mentor engineering peers across global client engagements.',
  },
  {
    title: 'Applied AI & ML Systems Engineer',
    dept: 'AI',
    type: 'Full-Time',
    location: 'Pakistan + Remote',
    desc: 'Design, optimize and deploy enterprise RAG pipelines, fine-tuned agentic models, and automated document extraction engines with rigorous security guardrails.',
  },
  {
    title: 'Product Designer (Design Systems & UI/UX)',
    dept: 'DESIGN',
    type: 'Full-Time',
    location: 'Pakistan + Remote',
    desc: 'Shape digital experience systems across web, enterprise portals, and mobile. Partner with product managers and engineers to turn user research into intuitive interfaces.',
  },
  {
    title: 'Cloud DevOps & Platform Engineer',
    dept: 'ENGINEERING',
    type: 'Full-Time',
    location: 'Pakistan + Remote',
    desc: 'Manage containerized multi-cloud infrastructure on AWS/Azure, build automated CI/CD pipelines, and enforce zero-trust security postures.',
  },
  {
    title: 'Technical Delivery & Project Manager',
    dept: 'OPERATIONS',
    type: 'Full-Time',
    location: 'Pakistan + Remote',
    desc: 'Orchestrate client discovery, scope sprint deliverables, oversee quality assurance checkpoints, and ensure dependable, transparent milestone execution.',
  },
]

const values = [
  {
    Icon: BookOpen,
    label: 'CONTINUOUS MASTERY',
    desc: 'A disciplined learning culture. We invest in research, modern certifications, and mastery over emerging AI and cloud technologies.',
  },
  {
    Icon: Hammer,
    label: 'PRODUCTION IMPACT',
    desc: 'We engineer real, deployed products used by enterprise clients globally. We measure success by software quality and real commercial utility.',
  },
  {
    Icon: Users,
    label: 'RADICAL CANDOR',
    desc: 'We operate with intellectual honesty, flat hierarchy, and clear feedback loops that foster rapid professional growth.',
  },
  {
    Icon: TrendingUp,
    label: 'GLOBAL HORIZONS',
    desc: 'Direct exposure to international engineering standards, high-scale architectures, and enterprise clients across North America and Europe.',
  },
]

export function CareersPageClient({
  initialRoles,
  jobListings,
}: {
  initialRoles?: any[]
  jobListings?: any[]
}) {
  const [activeDept, setActiveDept] = useState<Dept>('ALL')
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState('Senior Full-Stack Engineer')
  const [selectedJobId, setSelectedJobId] = useState<string | undefined>(undefined)

  const activeRoles =
    jobListings && jobListings.length > 0
      ? jobListings
      : initialRoles && initialRoles.length > 0
      ? initialRoles
      : defaultRoles
  const filtered = activeDept === 'ALL'
    ? activeRoles
    : activeRoles.filter((r) => (r.dept || r.department)?.toUpperCase() === activeDept)

  const handleApply = (roleTitle: string, jobId?: string) => {
    setSelectedRole(roleTitle)
    setSelectedJobId(jobId)
    setModalOpen(true)
  }

  return (
    <div className="page-enter">
      {/* Hero */}
      <section style={{ background: C.navyDeep, color: 'white', paddingTop: 68, padding: '140px 32px 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Reveal style={{ maxWidth: 720 }}>
            <div className="section-label" style={{ color: C.lightBlue }}>GLOBAL CAREERS & TALENT BENCH</div>
            <h1
              className="hero-animate hero-d2"
              style={{
                fontSize: 'clamp(40px,5vw,68px)',
                fontWeight: 800,
                lineHeight: 1.05,
                color: 'white',
                letterSpacing: '-0.03em',
                margin: '0 0 24px',
              }}
            >
              BUILD PRODUCTS
              <br />
              THAT MATTER GLOBALLY.
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.75, color: '#8DADC8', maxWidth: 600 }}>
              Join Pakistan&apos;s premier engineering team building high-performance technology for US, UK, and European enterprises. Competitive global compensation and genuine engineering autonomy.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Culture & Values */}
      <section style={{ background: 'white', padding: '80px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: 64 }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>ENGINEERING CULTURE</div>
            <h2 style={{ fontSize: 'clamp(26px,2.8vw,40px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.025em', margin: 0 }}>
              The Standards We Live By
            </h2>
          </Reveal>
          <Reveal type="stagger" className="p41-values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 24 }}>
            {values.map((v, i) => (
              <div key={i} style={{ background: C.offWhite, borderRadius: 16, padding: '36px 28px', border: `1px solid ${C.gray}` }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(59,130,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <v.Icon size={24} color={C.blue} />
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: C.blue, letterSpacing: '0.14em', marginBottom: 12 }}>{v.label}</div>
                <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
        <style>{`.p41-values-grid{display:grid;grid-template-columns:repeat(4,1fr);} @media(max-width:1000px){.p41-values-grid{grid-template-columns:repeat(2,1fr)!important;}} @media(max-width:580px){.p41-values-grid{grid-template-columns:1fr!important;}}`}</style>
      </section>

      {/* Open roles */}
      <section style={{ background: C.offWhite, padding: '80px 0' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
          <Reveal style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div className="section-label">TALENT PIPELINE</div>
              <h2 style={{ fontSize: 'clamp(24px,2.5vw,36px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.02em', margin: 0 }}>
                Active Opportunities & Talent Bench
              </h2>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {depts.map((d) => (
                <button
                  key={d}
                  onClick={() => setActiveDept(d)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 100,
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-inter, Inter, sans-serif)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    background: activeDept === d ? C.navy : 'white',
                    color: activeDept === d ? 'white' : C.textMuted,
                    boxShadow: '0 1px 4px rgba(30,41,59,0.06)',
                    transition: 'all 0.15s',
                  }}
                >
                  {d}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal type="stagger" key={activeDept} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filtered.map((r, i) => (
              <div key={i} className="card-hover" style={{ background: 'white', borderRadius: 16, padding: '32px 36px', border: `1px solid ${C.gray}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 800, color: C.navy, margin: '0 0 8px' }}>{r.title}</h3>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                      <span style={{ background: 'rgba(59,130,246,0.1)', color: C.blue, fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 4 }}>
                        {r.dept || r.department}
                      </span>
                      <span style={{ fontSize: 13, color: C.textLight }}>{r.type}</span>
                      <span style={{ fontSize: 13, color: C.textLight }}>·</span>
                      <span style={{ fontSize: 13, color: C.textMuted, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <MapPin size={13} color={C.blue} /> {r.location}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleApply(r.title, r.id)}
                    className="btn-secondary cursor-pointer"
                    style={{ fontSize: 13, padding: '10px 18px', border: 'none' }}
                  >
                    Apply for Role →
                  </button>
                </div>
                <p style={{ fontSize: 14, color: C.textMuted, lineHeight: 1.7, margin: 0 }}>
                  {r.desc || r.description}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* General Application */}
      <section style={{ background: C.navy, padding: '80px 32px' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <h2 style={{ fontSize: 'clamp(28px,3.5vw,48px)', fontWeight: 800, color: 'white', letterSpacing: '-0.025em', margin: '0 0 20px' }}>
              DON&apos;T SEE YOUR SPECIFIC ROLE?
            </h2>
            <p style={{ fontSize: 17, color: '#8DADC8', margin: '0 0 40px', lineHeight: 1.7 }}>
              We are constantly scouting for exceptional engineers, AI specialists, and delivery architects. Submit your portfolio for consideration.
            </p>
            <button
              type="button"
              onClick={() => handleApply('General Engineering Application (Open Bench)')}
              className="btn-primary cursor-pointer"
              style={{ border: 'none' }}
            >
              Send Open Application <span className="arrow">→</span>
            </button>
          </Reveal>
        </div>
      </section>

      {/* Interactive Application Modal with Drag-and-Drop Resume Upload */}
      <JobApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        roleTitle={selectedRole}
        jobId={selectedJobId}
      />
    </div>
  )
}
