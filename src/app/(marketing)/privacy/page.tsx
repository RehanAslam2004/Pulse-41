import type { Metadata } from 'next'
import Link from 'next/link'
import { C } from '@/lib/design/tokens'
import { Reveal } from '@/components/motion/Reveal'
import { Shield, Lock, Eye, FileText, CheckCircle2, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Pulse41 Privacy Policy. Learn how we collect, process, safeguard, and respect enterprise and user data across our engineering services and digital platforms.',
  openGraph: {
    title: 'Privacy Policy | Pulse41',
    description:
      'Learn how Pulse41 collects, processes, and safeguards client data, intellectual property, and visitor information.',
  },
}

export default function PrivacyPage() {
  const sections = [
    {
      icon: Eye,
      title: '1. Information We Collect',
      content: (
        <>
          <p style={{ margin: '0 0 12px', color: C.textMuted, lineHeight: 1.75 }}>
            Pulse41 collects information necessary to deliver software engineering services, consult on technical architecture, evaluate job candidates, and communicate effectively with existing and prospective clients:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, color: C.textMuted, lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li><strong style={{ color: C.navy }}>Business Contact Information:</strong> Name, professional email address, phone number, company name, and job title provided when requesting proposals, schedules, or contacting us.</li>
            <li><strong style={{ color: C.navy }}>Technical & Engagement Data:</strong> High-level project specifications, architectural requirements, scope estimates, and communication logs shared during engagements.</li>
            <li><strong style={{ color: C.navy }}>Candidate & Applicant Data:</strong> Resumes, employment history, portfolios, and contact credentials submitted through our Careers portal.</li>
            <li><strong style={{ color: C.navy }}>Usage & Diagnostic Data:</strong> IP addresses, browser types, operating systems, and page interaction timestamps gathered automatically to optimize site performance and security.</li>
          </ul>
        </>
      ),
    },
    {
      icon: Lock,
      title: '2. Purpose and Legal Basis for Processing',
      content: (
        <>
          <p style={{ margin: '0 0 12px', color: C.textMuted, lineHeight: 1.75 }}>
            We process your personal and enterprise information strictly under legitimate business interests, contractual necessity, and statutory compliance:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, color: C.textMuted, lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li>Fulfilling engineering agreements, statements of work (SOWs), and delivery milestones.</li>
            <li>Responding to technical inquiries, price estimation requests, and partner consultations.</li>
            <li>Securing our digital infrastructure and preventing unauthorized access or cyber threats.</li>
            <li>Complying with applicable global data privacy regulations including GDPR and regional compliance frameworks.</li>
          </ul>
        </>
      ),
    },
    {
      icon: Shield,
      title: '3. Data Security and Safeguards',
      content: (
        <>
          <p style={{ margin: '0 0 12px', color: C.textMuted, lineHeight: 1.75 }}>
            Security and intellectual property integrity are foundational to Pulse41. We enforce rigorous organizational and technical measures:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, color: C.textMuted, lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li><strong style={{ color: C.navy }}>Encryption:</strong> All data in transit is protected using TLS 1.3 encryption. Stored records and backups utilize AES-256 encryption.</li>
            <li><strong style={{ color: C.navy }}>Access Governance:</strong> Role-based access controls (RBAC) and multi-factor authentication (MFA) govern access to internal databases and client workspaces.</li>
            <li><strong style={{ color: C.navy }}>NDA & IP Protection:</strong> All engineering personnel operate under stringent Non-Disclosure Agreements and strict client IP compartmentalization policies.</li>
          </ul>
        </>
      ),
    },
    {
      icon: FileText,
      title: '4. Third-Party Services and Sub-processors',
      content: (
        <p style={{ margin: 0, color: C.textMuted, lineHeight: 1.75 }}>
          Pulse41 does not sell, lease, or monetize client or user information. We engage selected enterprise cloud infrastructure providers (such as Supabase for managed database services and Vercel for frontend hosting) bound by Data Processing Agreements (DPAs) that guarantee equivalent data protection standards.
        </p>
      ),
    },
    {
      icon: CheckCircle2,
      title: '5. Your Rights and Data Control',
      content: (
        <>
          <p style={{ margin: '0 0 12px', color: C.textMuted, lineHeight: 1.75 }}>
            Depending on your jurisdiction, you have statutory rights regarding your personal information, including:
          </p>
          <ul style={{ margin: 0, paddingLeft: 20, color: C.textMuted, lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <li>The right to request access to and a copy of the data we maintain about you.</li>
            <li>The right to request rectification of inaccurate or outdated information.</li>
            <li>The right to request permanent erasure of your personal data ("right to be forgotten").</li>
            <li>The right to withdraw marketing consent at any time without affecting prior lawful processing.</li>
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
          <span style={{ color: C.navy, fontWeight: 600 }}>Privacy Policy</span>
        </div>

        {/* Page Hero */}
        <Reveal type="up">
          <div style={{ marginBottom: 48 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>LEGAL & COMPLIANCE</div>
            <h1 style={{ fontSize: 'clamp(36px, 4.5vw, 54px)', fontWeight: 800, color: C.navy, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 16px' }}>
              Privacy Policy
            </h1>
            <p style={{ fontSize: 17, color: C.textMuted, lineHeight: 1.7, margin: '0 0 12px' }}>
              This Privacy Policy explains how Pulse41 collects, manages, and safeguards client information, application data, and visitor inquiries.
            </p>
            <div style={{ fontSize: 13, color: '#64748B', fontWeight: 500 }}>
              Last Updated: September 2026 · Version 2.1
            </div>
          </div>
        </Reveal>

        {/* Policy Sections */}
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

        {/* Contact & Inquiries Callout */}
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
                Privacy Inquiries & Data Requests
              </h3>
            </div>
            <p style={{ fontSize: 15, color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>
              To exercise your data protection rights, request information deletion, or inquire about our enterprise security procedures, please contact our Data Governance Officer:
            </p>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 4 }}>
              <div>
                <span style={{ fontSize: 12, color: '#64748B', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  Email
                </span>
                <a href="mailto:privacy@pulse41.com" style={{ color: C.lightBlue, textDecoration: 'none', fontSize: 15, fontWeight: 600 }}>
                  privacy@pulse41.com
                </a>
              </div>
              <div>
                <span style={{ fontSize: 12, color: '#64748B', display: 'block', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                  Legal & Compliance
                </span>
                <span style={{ color: '#E2E8F0', fontSize: 15, fontWeight: 600 }}>
                  Pulse41 Global Technology Operations
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
