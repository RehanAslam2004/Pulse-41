import type { Metadata } from 'next'
import Link from 'next/link'
import { C } from '@/lib/design/tokens'
import { Reveal } from '@/components/motion/Reveal'
import { Scale, FileCheck, Code2, AlertTriangle, ShieldCheck, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Pulse41 Terms & Conditions. Read the terms governing our digital engineering services, software delivery, intellectual property ownership, and advisory engagements.',
  openGraph: {
    title: 'Terms & Conditions | Pulse41',
    description:
      'Terms and conditions governing Pulse41 software engineering engagements, platform delivery, and enterprise consulting agreements.',
  },
}

export default function TermsPage() {
  const sections = [
    {
      icon: Scale,
      title: '1. Acceptance of Terms',
      content: (
        <p style={{ margin: 0, color: C.textMuted, lineHeight: 1.75 }}>
          By accessing the website at <strong style={{ color: C.navy }}>pulse41.com</strong> or entering into a Statement of Work (SOW), master service agreement (MSA), or trial consultation with Pulse41, you agree to comply with and be bound by these Terms & Conditions. If you do not agree to these terms, you should refrain from using our platforms and service channels.
        </p>
      ),
    },
    {
      icon: Code2,
      title: '2. Engineering Services and Statements of Work',
      content: (
        <>
          <p style={{ margin: '0 0 12px', color: C.textMuted, lineHeight: 1.75 }}>
            Pulse41 provides software engineering, artificial intelligence system integration, cloud infrastructure, and technical consulting. All professional services are governed by formal project agreements:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, color: C.textMuted, lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li><strong style={{ color: C.navy }}>Statements of Work:</strong> Specific project milestones, deliverables, payment schedules, and team pod allocations are detailed in mutually executed SOWs.</li>
            <li><strong style={{ color: C.navy }}>Sprint Cadence & Acceptance:</strong> Deliverables undergo client review cycles as outlined in project schedules. Written acceptance or documented revisions must follow agreed sprint timetables.</li>
            <li><strong style={{ color: C.navy }}>Change Control:</strong> Revisions to project scopes, architectural additions, or accelerated timelines are documented through standard Change Requests.</li>
          </ul>
        </>
      ),
    },
    {
      icon: FileCheck,
      title: '3. Intellectual Property Rights & Work Product',
      content: (
        <>
          <p style={{ margin: '0 0 12px', color: C.textMuted, lineHeight: 1.75 }}>
            Client ownership and transparent licensing are core principles of our client relationships:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, color: C.textMuted, lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li><strong style={{ color: C.navy }}>Client Work Product:</strong> Upon full settlement of corresponding invoices, all bespoke source code, UI designs, and database schemas crafted specifically for the Client become the exclusive property of the Client.</li>
            <li><strong style={{ color: C.navy }}>Pulse41 Pre-existing IP:</strong> Pulse41 retains ownership of its proprietary foundational frameworks, starter kits, and internal tooling. Clients receive a perpetual, royalty-free, non-exclusive license to utilize and modify integrated components within their delivered products.</li>
            <li><strong style={{ color: C.navy }}>Open Source Dependencies:</strong> Third-party libraries and open-source packages incorporated into solutions remain subject to their respective licenses (MIT, Apache 2.0, BSD).</li>
          </ul>
        </>
      ),
    },
    {
      icon: ShieldCheck,
      title: '4. Confidentiality & Non-Disclosure',
      content: (
        <p style={{ margin: 0, color: C.textMuted, lineHeight: 1.75 }}>
          Both parties agree to protect and treat as confidential all proprietary business, financial, and technical information disclosed during discussions or engineering engagements. Confidential information shall not be disclosed to any third party without prior written consent, except where required by lawful judicial order.
        </p>
      ),
    },
    {
      icon: AlertTriangle,
      title: '5. Warranties, Disclaimers, and Limitation of Liability',
      content: (
        <>
          <p style={{ margin: '0 0 12px', color: C.textMuted, lineHeight: 1.75 }}>
            Pulse41 warrants that all engineering work is executed in a professional, workmanlike manner adhering to industry-standard architectural best practices:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, color: C.textMuted, lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li>Except as explicitly stated in an active SOW, web resources and preliminary estimates are provided on an "as-is" basis.</li>
            <li>Neither party shall be liable for indirect, incidental, consequential, or punitive damages arising from the use or inability to use delivered systems.</li>
            <li>Pulse41's total cumulative liability for any claim arising under an engagement shall not exceed the total fees paid by the client under the specific Statement of Work in the six (6) months preceding the claim.</li>
          </ul>
        </>
      ),
    },
  ]

  return (
    <div style={{ background: C.offWhite, minHeight: '100vh', paddingTop: 96, paddingBottom: 112 }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
        {/* Header Breadcrumb */}
        <div style={{ marginBottom: 24, fontSize: 13, color: C.textMuted, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link href="/" style={{ color: C.blue, textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <span style={{ color: C.navy, fontWeight: 600 }}>Terms & Conditions</span>
        </div>

        {/* Page Hero */}
        <Reveal type="up">
          <div style={{ marginBottom: 48 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>LEGAL & AGREEMENTS</div>
            <h1 style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 16px' }}>
              Terms & Conditions
            </h1>
            <p style={{ fontSize: 17, color: C.textMuted, lineHeight: 1.7, margin: '0 0 12px' }}>
              These terms define the mutual obligations, intellectual property rights, and governance standards between Pulse41 and our clients.
            </p>
            <div style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>
              Last Updated: September 2026 · Version 2.1
            </div>
          </div>
        </Reveal>

        {/* Terms Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {sections.map((section, idx) => {
            const Icon = section.icon
            return (
              <Reveal key={idx} type="up" delay={idx * 0.05}>
                <div
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 16,
                    border: '1px solid rgba(203, 213, 225, 0.6)',
                    padding: '36px 40px',
                    boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.04)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: '#EFF6FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: C.blue,
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: C.navy, margin: 0, letterSpacing: '-0.02em' }}>
                      {section.title}
                    </h2>
                  </div>
                  <div>{section.content}</div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Legal Contact Callout */}
        <Reveal type="up" delay={0.3}>
          <div
            style={{
              marginTop: 48,
              background: C.navy,
              borderRadius: 16,
              padding: '36px 40px',
              color: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Mail size={22} color={C.lightBlue} />
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#FFFFFF' }}>
                Legal & Contractual Questions
              </h3>
            </div>
            <p style={{ fontSize: 15, color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>
              For custom master services agreements, enterprise NDAs, or commercial procurement questions:
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 4 }}>
              <div>
                <span style={{ fontSize: 12, color: '#64748B', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  Email
                </span>
                <a href="mailto:legal@pulse41.com" style={{ color: C.lightBlue, textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>
                  legal@pulse41.com
                </a>
              </div>
              <div>
                <span style={{ fontSize: 12, color: '#64748B', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  Enterprise Desk
                </span>
                <span style={{ color: '#E2E8F0', fontSize: 15, fontWeight: 600 }}>
                  contracts@pulse41.com
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
