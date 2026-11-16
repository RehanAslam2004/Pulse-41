"use client"

/**
 * Case Stack Scroll (Pulse41 edition):
 * Renders Pulse41's case studies and productized platforms as an interactive
 * perspective stack of site cards.
 * - Continuous per-card lift interpolation eliminates frame snaps when moving across tabs.
 * - Boundary-aware wheel scrolling lets users roll through every file in the drawer and
 *   naturally continue down/up the homepage at the edges.
 * - Mouse drag, touch horizontal swipe, keyboard arrows, and Prev/Next buttons all roll the stack.
 */

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronUp, ChevronDown } from "lucide-react"
import gsap from "gsap"

export type CaseFaceKind =
  | "commerce"
  | "risk-ai"
  | "edtech"
  | "healthcare"
  | "pulsedesk"
  | "pulsecontact"
  | "pulsedoc"
  | "pulsecore"
  | "pulsecert"
  | "pulsevault"

export type CaseCard = {
  title: string
  category: string
  subtitle?: string
  image?: string
  face?: CaseFaceKind
  href?: string
}

export type CaseStackScrollProps = {
  cards?: CaseCard[]
  tagline?: [string, string]
  ctaLabel?: string
  ctaHref?: string
  countLabel?: string
  cursorLabel?: string
  onSelect?: (card: CaseCard, index: number) => void
  height?: string
  fontHref?: string | null
  className?: string
}

export const defaultPulseCaseCards: CaseCard[] = [
  {
    title: "Digital Commerce & Inventory Engine",
    category: "Retail & E-Commerce",
    subtitle: "Multi-warehouse inventory sync & modular storefront orchestration.",
    face: "commerce",
    href: "/case-studies/digital-commerce-inventory-engine",
  },
  {
    title: "Automated Risk & Intelligence Dashboard",
    category: "Financial Services",
    subtitle: "ML anomaly detection & real-time executive compliance telemetry.",
    face: "risk-ai",
    href: "/case-studies/automated-risk-intelligence-dashboard",
  },
  {
    title: "Enterprise Learning & Assessment Platform",
    category: "Education & EdTech",
    subtitle: "Multi-tenant LMS, curriculum builders & high-concurrency testing.",
    face: "edtech",
    href: "/case-studies/enterprise-learning-assessment-platform",
  },
  {
    title: "Secure Patient Services & Portal App",
    category: "Healthcare",
    subtitle: "HIPAA-aligned patient gateway with FHIR clinical scheduling.",
    face: "healthcare",
    href: "/case-studies/secure-patient-services-portal-app",
  },
  {
    title: "PulseDesk AI Customer Experience Suite",
    category: "Applied AI",
    subtitle: "Cited knowledge assistants, conversational agents & escalation routing.",
    face: "pulsedesk",
    href: "/solutions/pulse-desk-ai",
  },
  {
    title: "PulseContact Omnichannel Platform",
    category: "Customer Experience",
    subtitle: "Unified voice, WhatsApp, email queues, CRM sync & QA controls.",
    face: "pulsecontact",
    href: "/solutions/pulse-contact",
  },
  {
    title: "PulseDoc AI Document Intelligence",
    category: "Intelligent Automation",
    subtitle: "Multilingual OCR extraction, invoice matching & ERP approvals.",
    face: "pulsedoc",
    href: "/solutions/pulse-doc-ai",
  },
  {
    title: "PulseCore Enterprise Portal Suite",
    category: "Digital Workplace",
    subtitle: "Centralized company intranets, SSO, RBAC & semantic search.",
    face: "pulsecore",
    href: "/solutions/pulse-core",
  },
  {
    title: "PulseCert Credential Verification",
    category: "Certification & Trust",
    subtitle: "Tamper-proof QR issuance & instant public verification registry.",
    face: "pulsecert",
    href: "/solutions/pulse-cert",
  },
  {
    title: "PulseVault Zero-Trust Security",
    category: "Governance & Identity",
    subtitle: "Unified IAM, automated secrets rotation & SOC 2 audit logs.",
    face: "pulsevault",
    href: "/solutions/pulse-vault",
  },
]

const FACE_W = 1280
const FACE_H = 800
const FALL = 1.6

export const slotOf = (k: number, roll: number, n: number) =>
  ((((k - roll + FALL) % n) + n) % n) - FALL

/**
 * Computes each card's continuous 3D pose from all per-card lift values so
 * moving between adjacent cards never causes instant 1-frame snaps.
 */
export function cardPoseSmooth(k: number, roll: number, lifts: number[], n: number) {
  const s = slotOf(k, roll, n)
  let y: number
  let z: number
  let rot: number
  if (s >= 0) {
    y = -s * 0.115 - s * s * 0.002
    z = -s * 0.14
    rot = Math.min(s, 1) * 12
  } else {
    y = -s * 0.9
    z = -s * 0.04
    rot = 0
  }

  const selfLift = lifts[k] ?? 0
  let pushDown = 0
  let pushUp = 0

  for (let j = 0; j < n; j++) {
    if (j === k) continue
    const lj = lifts[j] ?? 0
    if (lj <= 0.001) continue
    const sj = slotOf(j, roll, n)
    if (s < sj) pushDown += lj
    else pushUp += lj
  }

  pushDown = Math.min(1, pushDown)
  pushUp = Math.min(1, pushUp)

  if (selfLift > 0.001) {
    rot *= 1 - selfLift
    y -= selfLift * 0.035
    z += selfLift * 0.1
  }
  y += pushDown * 0.58
  y -= pushUp * 0.035

  const back = Math.min(10, n - FALL)
  const opacity =
    s < -1
      ? Math.max(0, (s + FALL) / 0.6)
      : s > back - 1.5
      ? Math.max(0, (back - s) / 1.5)
      : 1

  return { y, z, rot, opacity, slot: s }
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect
const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

function MiniNav({
  brand,
  links,
  cta,
  dark,
  bg,
  ctaBg,
  ctaColor,
  border,
}: {
  brand: string
  links: string[]
  cta: string
  dark?: boolean
  bg?: string
  ctaBg?: string
  ctaColor?: string
  border?: string
}) {
  return (
    <div
      className={"cs-nav" + (dark ? " cs-nav-dark" : "")}
      style={{
        background: bg || "inherit",
        borderBottomColor: border || (dark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.08)"),
      }}
    >
      <span className="cs-nav-logo">{brand}</span>
      <span className="cs-nav-links">
        {links.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </span>
      <span
        className="cs-nav-cta"
        style={{
          background: ctaBg || (dark ? "#FFFFFF" : "#2563EB"),
          color: ctaColor || (dark ? "#0F172A" : "#FFFFFF"),
        }}
      >
        {cta}
      </span>
    </div>
  )
}

function Face({ card }: { card: CaseCard }) {
  const kind = card.face ?? "commerce"

  switch (kind) {
    case "commerce":
      return (
        <div className="cs-face" style={{ background: "#E0F2FE", color: "#0F172A" }}>
          <MiniNav
            brand="pulse.store"
            links={["Architecture", "Inventory", "Checkouts", "Metrics"]}
            cta="Inspect Case"
            bg="#FFFFFF"
            ctaBg="#2563EB"
          />
          <div style={{ padding: "110px 52px 48px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 40, height: "100%", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1D4ED8", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>
                {card.category}
              </div>
              <b style={{ fontSize: 70, lineHeight: 0.98, letterSpacing: "-0.035em", fontWeight: 800, display: "block", marginBottom: 22 }}>
                Digital Commerce &amp; Inventory
              </b>
              <p style={{ fontSize: 22, lineHeight: 1.5, color: "#334155", margin: 0 }}>{card.subtitle}</p>
            </div>
            <div style={{ height: 470, borderRadius: 24, padding: 28, background: "#FFFFFF", boxShadow: "0 28px 60px -15px rgba(15,23,42,0.16)", border: "1px solid rgba(15,23,42,0.08)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#0F172A" }}>Warehouse Sync Matrix</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1D4ED8", background: "#DBEAFE", padding: "6px 12px", borderRadius: 999 }}>Live ERP Feed</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { hub: "US-East Fulfillment", pct: "94%", status: "Synced" },
                  { hub: "EU-Central Hub", pct: "88%", status: "Synced" },
                  { hub: "UK Regional Depot", pct: "79%", status: "Rebalancing" },
                ].map((row) => (
                  <div key={row.hub} style={{ padding: "14px 18px", borderRadius: 14, background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15, fontWeight: 600, marginBottom: 8 }}>
                      <span>{row.hub}</span>
                      <span style={{ color: "#2563EB" }}>{row.status}</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 999, background: "#E2E8F0", overflow: "hidden" }}>
                      <div style={{ width: row.pct, height: "100%", borderRadius: 999, background: "linear-gradient(90deg,#2563EB,#38BDF8)" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ padding: 14, borderRadius: 14, background: "#EFF6FF" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Order Routing</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", marginTop: 4 }}>Automated</div>
                </div>
                <div style={{ padding: 14, borderRadius: 14, background: "#F8FAFC", border: "1px solid #E2E8F0" }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase" }}>Catalog Sync</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", marginTop: 4 }}>Multi-Region</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )

    case "risk-ai":
      return (
        <div className="cs-face" style={{ background: "#0A0F1D", color: "#FFFFFF" }}>
          <MiniNav
            brand="pulse.risk.ai"
            links={["Pipeline", "Models", "Compliance", "Audit"]}
            cta="View Blueprint"
            dark
            bg="#0F172A"
            ctaBg="#3B82F6"
            ctaColor="#FFFFFF"
          />
          <div style={{ padding: "110px 52px 48px", display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 44, height: "100%", alignItems: "center" }}>
            <div style={{ height: 450, borderRadius: 24, padding: 28, background: "#0F172A", border: "1px solid rgba(96,165,250,0.28)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "#F8FAFC" }}>Anomaly Detection Stream</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#93C5FD", background: "rgba(59,130,246,0.18)", padding: "6px 12px", borderRadius: 999 }}>Policy Active</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Cross-border settlement verification",
                  "Real-time fraud rule threshold check",
                  "Human escalation queue governance",
                  "Immutable audit trail append",
                ].map((item, idx) => (
                  <div key={item} style={{ padding: "14px 18px", borderRadius: 14, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", fontSize: 15, color: "#E2E8F0" }}>
                    <span>{item}</span>
                    <span style={{ color: idx === 2 ? "#FBBF24" : "#34D399", fontWeight: 700 }}>{idx === 2 ? "Review" : "Verified"}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#60A5FA", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>
                {card.category}
              </div>
              <b style={{ fontSize: 66, lineHeight: 0.98, letterSpacing: "-0.035em", fontWeight: 800, display: "block", marginBottom: 22 }}>
                Automated Risk &amp; Intelligence
              </b>
              <p style={{ fontSize: 22, lineHeight: 1.5, color: "#94A3B8", margin: 0 }}>{card.subtitle}</p>
            </div>
          </div>
        </div>
      )

    case "edtech":
      return (
        <div className="cs-face" style={{ background: "#2563EB", color: "#FFFFFF" }}>
          <MiniNav
            brand="PulseLearn"
            links={["Curriculum", "Testing", "Cohorts", "Analytics"]}
            cta="Explore Platform"
            dark
            bg="#1D4ED8"
            ctaBg="#FFFFFF"
            ctaColor="#0F172A"
          />
          <div style={{ padding: "105px 52px 48px", display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 44, height: "100%", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#DBEAFE", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>
                {card.category}
              </div>
              <b style={{ fontSize: 68, lineHeight: 0.98, letterSpacing: "-0.035em", fontWeight: 800, display: "block", marginBottom: 22 }}>
                Enterprise Learning Platform
              </b>
              <p style={{ fontSize: 22, lineHeight: 1.5, color: "#DBEAFE", margin: 0 }}>{card.subtitle}</p>
            </div>
            <div style={{ height: 450, borderRadius: 24, padding: 28, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.28)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: "#FFFFFF" }}>Assessment &amp; Cohort Suite</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1E3A8A", background: "#FFFFFF", padding: "6px 12px", borderRadius: 999 }}>Multi-Tenant</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {["Curriculum Builder", "Online Proctored Exam", "Paper Generation", "Cohort Analytics"].map((mod) => (
                  <div key={mod} style={{ padding: "22px 18px", borderRadius: 16, background: "rgba(15,23,42,0.24)", border: "1px solid rgba(255,255,255,0.16)", fontSize: 17, fontWeight: 700, color: "#FFFFFF" }}>
                    {mod}
                  </div>
                ))}
              </div>
              <div style={{ padding: "16px 20px", borderRadius: 16, background: "rgba(255,255,255,0.96)", color: "#0F172A", fontSize: 16, fontWeight: 700, display: "flex", justifyContent: "space-between" }}>
                <span>Role-Based Access Control</span>
                <span style={{ color: "#2563EB" }}>Enabled</span>
              </div>
            </div>
          </div>
        </div>
      )

    case "healthcare":
      return (
        <div className="cs-face" style={{ background: "#FFFFFF", color: "#0F172A" }}>
          <MiniNav
            brand="PulseCare Portal"
            links={["Scheduling", "Intake", "FHIR Sync"]}
            cta="Patient Gateway"
            bg="#F8FAFC"
            ctaBg="#0F172A"
          />
          <div style={{ padding: "110px 52px 48px", display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 44, height: "100%", alignItems: "center" }}>
            <div style={{ height: 460, borderRadius: 24, padding: 28, background: "#F8FAFC", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: "#0F172A" }}>Patient Journey Timeline</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1D4ED8", background: "#EFF6FF", padding: "6px 12px", borderRadius: 999 }}>FHIR Ready</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {["Digital Clinical Intake", "Specialist Slot Scheduling", "Lab Results & Care Summaries", "Encrypted Messaging Portal"].map((step, i) => (
                  <div key={step} style={{ padding: "16px 20px", borderRadius: 14, background: "#FFFFFF", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: 14, fontSize: 17, fontWeight: 600 }}>
                    <span style={{ width: 28, height: 28, borderRadius: 999, background: "#2563EB", color: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>{i + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#2563EB", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>
                {card.category}
              </div>
              <b style={{ fontSize: 66, lineHeight: 0.98, letterSpacing: "-0.035em", fontWeight: 800, display: "block", marginBottom: 22 }}>
                Secure Patient Portal App
              </b>
              <p style={{ fontSize: 22, lineHeight: 1.5, color: "#475569", margin: 0 }}>{card.subtitle}</p>
            </div>
          </div>
        </div>
      )

    case "pulsedesk":
      return (
        <div className="cs-face" style={{ background: "#091311", color: "#ECFDF5" }}>
          <MiniNav
            brand="PULSEDESK.AI"
            links={["RAG Assistants", "Channels", "Escalation"]}
            cta="Open Suite"
            dark
            bg="#061A17"
            ctaBg="#34D399"
            ctaColor="#06281E"
          />
          <div style={{ padding: "120px 56px 56px", position: "relative", height: "100%" }}>
            <div style={{ position: "absolute", inset: "64px 0 0", background: "linear-gradient(rgba(52,211,153,0.06) 1px,transparent 1px) 0 0/48px 48px,linear-gradient(90deg,rgba(52,211,153,0.06) 1px,transparent 1px) 0 0/48px 48px" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#34D399", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 22 }}>
                {card.category}
              </div>
              <b style={{ fontSize: 78, lineHeight: 0.98, letterSpacing: "-0.035em", fontWeight: 800, display: "block", maxWidth: 960, marginBottom: 28 }}>
                AI Customer Experience Suite
              </b>
              <p style={{ fontSize: 24, color: "#A7F3D0", maxWidth: 740, lineHeight: 1.45, margin: 0 }}>{card.subtitle}</p>
            </div>
          </div>
        </div>
      )

    case "pulsecontact":
      return (
        <div className="cs-face" style={{ background: "#F8FAFC", color: "#0F172A" }}>
          <MiniNav
            brand="PulseContact"
            links={["Telephony", "Queues", "CRM Sync", "QA"]}
            cta="Explore Suite"
            bg="#1E293B"
            dark
            ctaBg="#3B82F6"
            ctaColor="#FFFFFF"
          />
          <div style={{ padding: "110px 52px 48px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 44, height: "100%", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#2563EB", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>
                {card.category}
              </div>
              <b style={{ fontSize: 72, lineHeight: 0.98, letterSpacing: "-0.035em", fontWeight: 800, display: "block", marginBottom: 22 }}>
                Omnichannel Contact Centre
              </b>
              <p style={{ fontSize: 22, color: "#475569", lineHeight: 1.5, margin: 0 }}>{card.subtitle}</p>
            </div>
            <div style={{ height: 450, borderRadius: 24, padding: 28, background: "#FFFFFF", border: "1px solid #E2E8F0", boxShadow: "0 20px 50px -15px rgba(15,23,42,0.14)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: "#0F172A" }}>Unified Queue Monitor</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", background: "#E2E8F0", padding: "6px 12px", borderRadius: 999 }}>Voice + WhatsApp</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {["Cloud Telephony & IVR Routing", "Live Agent Assist Copilots", "CRM Case Auto-Logging", "Supervisor QA Controls"].map((q) => (
                  <div key={q} style={{ padding: "16px 20px", borderRadius: 14, background: "#F8FAFC", border: "1px solid #E2E8F0", fontSize: 17, fontWeight: 600, color: "#0F172A" }}>
                    {q}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )

    case "pulsedoc":
      return (
        <div className="cs-face" style={{ background: "#1E1B4B", color: "#FFFFFF" }}>
          <MiniNav
            brand="PulseDoc AI"
            links={["OCR Extraction", "Classification", "ERP Routing"]}
            cta="Document Engine"
            dark
            bg="#312E81"
            ctaBg="#818CF8"
            ctaColor="#0F172A"
          />
          <div style={{ padding: "120px 56px 56px", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 44, height: "100%", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#A5B4FC", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>
                {card.category}
              </div>
              <b style={{ fontSize: 70, lineHeight: 0.98, letterSpacing: "-0.035em", fontWeight: 800, display: "block", marginBottom: 22 }}>
                Document Intelligence Engine
              </b>
              <p style={{ fontSize: 22, color: "#C7D2FE", lineHeight: 1.5, margin: 0 }}>{card.subtitle}</p>
            </div>
            <div style={{ height: 440, borderRadius: 24, padding: 28, background: "#312E81", border: "1px solid rgba(165,180,252,0.3)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 17, fontWeight: 700, color: "#FFFFFF" }}>Extraction Pipeline</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A", background: "#A5B4FC", padding: "6px 12px", borderRadius: 999 }}>Schema Validated</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {["Multilingual OCR Capture", "Line-Item Classification", "PO & ERP Rule Validation", "Human Approval Routing"].map((s) => (
                  <div key={s} style={{ padding: "16px 20px", borderRadius: 14, background: "rgba(15,23,42,0.32)", border: "1px solid rgba(165,180,252,0.22)", fontSize: 17, fontWeight: 600, color: "#E0E7FF" }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )

    case "pulsecore":
      return (
        <div className="cs-face" style={{ background: "#DBEAFE", color: "#0F172A" }}>
          <MiniNav
            brand="PulseCore"
            links={["Intranet", "Team Spaces", "SSO Search"]}
            cta="Enterprise Portal"
            bg="#EFF6FF"
            ctaBg="#0F172A"
          />
          <div style={{ padding: "125px 56px 56px" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1D4ED8", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20 }}>
              {card.category}
            </div>
            <b style={{ fontSize: 78, lineHeight: 0.98, letterSpacing: "-0.035em", fontWeight: 800, display: "block", maxWidth: 960, marginBottom: 26 }}>
              Enterprise Portal &amp; Knowledge Management
            </b>
            <p style={{ fontSize: 24, color: "#1E293B", maxWidth: 740, margin: 0 }}>{card.subtitle}</p>
          </div>
        </div>
      )

    case "pulsecert":
      return (
        <div className="cs-face" style={{ background: "#0F172A", color: "#FFFFFF" }}>
          <MiniNav
            brand="PulseCert"
            links={["Credentialing", "QR Lookup", "Audit Logs"]}
            cta="Verify Portal"
            dark
            bg="#020617"
            ctaBg="#FFFFFF"
            ctaColor="#0F172A"
          />
          <div style={{ padding: "125px 56px 56px" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#93C5FD", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20 }}>
              {card.category}
            </div>
            <b style={{ fontSize: 78, lineHeight: 0.98, letterSpacing: "-0.035em", fontWeight: 800, display: "block", maxWidth: 960, marginBottom: 26 }}>
              Digital Credentialing &amp; QR Verification
            </b>
            <p style={{ fontSize: 24, color: "#CBD5E1", maxWidth: 760, margin: 0 }}>{card.subtitle}</p>
          </div>
        </div>
      )

    case "pulsevault":
      return (
        <div className="cs-face" style={{ background: "#FFFFFF", color: "#0F172A" }}>
          <MiniNav
            brand="PulseVault"
            links={["SSO & IAM", "Secrets Rotation", "Compliance"]}
            cta="Security Suite"
            bg="#FFFFFF"
            ctaBg="#2563EB"
          />
          <div style={{ padding: "110px 56px 56px", display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 44, alignItems: "center", height: "100%" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#2563EB", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>
                {card.category}
              </div>
              <b style={{ fontSize: 72, lineHeight: 0.98, letterSpacing: "-0.035em", fontWeight: 800, display: "block", marginBottom: 22 }}>
                Zero-Trust Security &amp; Governance
              </b>
              <p style={{ fontSize: 22, color: "#475569", lineHeight: 1.5, margin: 0 }}>{card.subtitle}</p>
            </div>
            <div style={{ padding: 40, borderRadius: 24, background: "#0F172A", color: "#FFFFFF", display: "flex", flexDirection: "column", gap: 18 }}>
              {["Centralized IAM & SSO", "Automated Secret Rotation", "Continuous Audit Logging"].map((row) => (
                <div key={row} style={{ padding: "18px 22px", borderRadius: 14, background: "rgba(255,255,255,0.06)", fontSize: 21, fontWeight: 600 }}>
                  {row}
                </div>
              ))}
            </div>
          </div>
        </div>
      )
  }
}

export default function CaseStackScroll({
  cards = defaultPulseCaseCards,
  tagline = ["Engineered for scale.", "Delivered to production."],
  ctaLabel = "View all case studies",
  ctaHref = "/case-studies",
  countLabel = "projects",
  cursorLabel = "View project",
  onSelect,
  height = "min(88svh, 820px)",
  fontHref = null,
  className = "",
}: CaseStackScrollProps) {
  const router = useRouter()
  const rootRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const cursorRef = useRef<HTMLDivElement>(null)
  const hoverLeaveTimer = useRef<number | null>(null)
  const lastPointerMoveRef = useRef<{ x: number; y: number; at: number }>({ x: 0, y: 0, at: 0 })

  const state = useRef({
    roll: 0,
    target: 0,
    hover: -1,
    lifts: [] as number[],
    slots: [] as number[],
    opacities: [] as number[],
    ch: 300,
    cw: 480,
    front: 0,
    boundaryReachedAt: 0,
  })
  const [front, setFront] = useState(0)
  const [hover, setHover] = useState(-1)
  const n = cards.length

  useIsoLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const st = state.current
    st.lifts = cards.map((_, i) => st.lifts[i] ?? 0)

    const size = () => {
      const w = root.clientWidth
      const h = root.clientHeight
      const narrow = w < 720
      st.cw = Math.min(narrow ? w * 0.86 : w * 0.45, (h * 0.48 * FACE_W) / FACE_H)
      st.ch = (st.cw * FACE_H) / FACE_W
      root.style.setProperty("--cs-cw", st.cw + "px")
      root.style.setProperty("--cs-ch", st.ch + "px")
      root.style.setProperty("--cs-k", String(st.cw / FACE_W))
    }

    const place = () => {
      for (let k = 0; k < n; k++) {
        const el = cardRefs.current[k]
        if (!el) continue
        const p = cardPoseSmooth(k, st.roll, st.lifts, n)
        st.slots[k] = p.slot
        st.opacities[k] = p.opacity
        el.style.transform =
          "translate3d(-50%," +
          (p.y * st.ch).toFixed(2) +
          "px," +
          (p.z * st.ch).toFixed(2) +
          "px) rotateX(" +
          (-p.rot).toFixed(2) +
          "deg)"
        el.style.opacity = p.opacity.toFixed(3)
        el.style.zIndex = String(Math.round(1000 - p.slot * 10))
        el.style.visibility = p.opacity <= 0 ? "hidden" : "visible"
        const shade = Math.min(0.2, Math.max(0, (p.slot - 3) * 0.024)) * (1 - (st.lifts[k] ?? 0))
        el.style.setProperty("--cs-shade", shade.toFixed(3))
      }
    }

    const tick = () => {
      const dr = Math.min(3, Math.max(0.25, gsap.ticker.deltaRatio(60)))
      const ease = reduced() ? 1 : 1 - Math.pow(1 - 0.13, dr)
      st.roll += (st.target - st.roll) * ease
      if (Math.abs(st.target - st.roll) < 0.0005) {
        st.roll = st.target
        // Keep unwrapped transitions modularly normalized inside [0, n - 1]
        if (st.roll >= n || st.roll < 0) {
          const shift = Math.floor(st.roll / n) * n
          st.roll -= shift
          st.target -= shift
        }
      }

      const liftEase = reduced() ? 1 : 1 - Math.pow(1 - 0.16, dr)
      for (let k = 0; k < n; k++) {
        const goal = k === st.hover ? 1 : 0
        st.lifts[k] += (goal - st.lifts[k]) * liftEase
        if (Math.abs(goal - st.lifts[k]) < 0.001) st.lifts[k] = goal
      }

      const f = ((Math.round(st.roll) % n) + n) % n
      if (f !== st.front) {
        st.front = f
        setFront(f)
      }
      place()
    }

    size()
    place()
    const ro = new ResizeObserver(() => {
      size()
      place()
    })
    ro.observe(root)
    gsap.ticker.add(tick)
    return () => {
      ro.disconnect()
      gsap.ticker.remove(tick)
    }
  }, [n])

  // Boundary-aware wheel scrolling + desktop drag + mobile horizontal swipe
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const st = state.current
    let snap = 0

    const onWheel = (e: WheelEvent) => {
      const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      if (d === 0) return

      // Let page scroll smoothly when section is not substantially framed in viewport
      const rect = root.getBoundingClientRect()
      const visibleTop = Math.max(0, rect.top)
      const visibleBottom = Math.min(window.innerHeight, rect.bottom)
      const visibleH = Math.max(0, visibleBottom - visibleTop)
      if (rect.height > 0 && visibleH / Math.min(rect.height, window.innerHeight) < 0.72) {
        return
      }

      // Normalize target/roll into [0, n) silently if user wrapped via Prev/Next or drag
      if (st.target < 0 || st.target >= n) {
        const shift = Math.floor(st.target / n) * n
        st.target -= shift
        st.roll -= shift
      }

      const atStart = st.target <= 0.01 && st.roll <= 0.15
      const atEnd = st.target >= n - 1 - 0.01 && st.roll >= n - 1 - 0.15
      const now = Date.now()

      if ((d < 0 && atStart) || (d > 0 && atEnd)) {
        if (now - st.boundaryReachedAt > 180) {
          return
        }
        e.preventDefault()
        return
      }

      e.preventDefault()
      const px = e.deltaMode === 1 ? d * 32 : d
      const next = Math.max(0, Math.min(n - 1, st.target + px / 150))
      if ((next === 0 && st.target > 0) || (next === n - 1 && st.target < n - 1)) {
        st.boundaryReachedAt = now
      }
      st.target = next

      clearTimeout(snap)
      snap = window.setTimeout(() => {
        st.target = Math.max(0, Math.min(n - 1, Math.round(st.target)))
      }, 170)
    }

    let drag: { id: number; x: number; y: number; t: number; moved: boolean } | null = null
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return
      drag = { id: e.pointerId, x: e.clientX, y: e.clientY, t: st.target, moved: false }
    }
    const onMove = (e: PointerEvent) => {
      if (!drag || drag.id !== e.pointerId) return
      const dx = drag.x - e.clientX
      const dy = drag.y - e.clientY
      // On touch devices, use horizontal drag cleanly so vertical page scrolling stays native
      const delta = e.pointerType === "mouse" ? dy : dx
      if (!drag.moved && Math.abs(delta) > 8) {
        if (e.pointerType !== "mouse" && Math.abs(dy) > Math.abs(dx)) {
          drag = null
          return
        }
        drag.moved = true
        try {
          root.setPointerCapture(e.pointerId)
        } catch {
          // Ignore if capture is unsupported
        }
      }
      if (drag.moved) st.target = drag.t + delta / (st.ch * 0.42)
    }
    const onUp = (e: PointerEvent) => {
      if (!drag || drag.id !== e.pointerId) return
      if (drag.moved) {
        st.target = Math.round(st.target)
        root.addEventListener("click", (c) => c.stopPropagation(), { capture: true, once: true })
      }
      drag = null
    }

    root.addEventListener("wheel", onWheel, { passive: false })
    root.addEventListener("pointerdown", onDown)
    root.addEventListener("pointermove", onMove)
    root.addEventListener("pointerup", onUp)
    root.addEventListener("pointercancel", onUp)
    return () => {
      root.removeEventListener("wheel", onWheel)
      root.removeEventListener("pointerdown", onDown)
      root.removeEventListener("pointermove", onMove)
      root.removeEventListener("pointerup", onUp)
      root.removeEventListener("pointercancel", onUp)
      clearTimeout(snap)
    }
  }, [n])

  // Smooth floating "View project" disc cursor when hovering lifted cards
  useEffect(() => {
    const root = rootRef.current
    const cur = cursorRef.current
    if (!root || !cur) return
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let initialized = false

    const syncCursor = () => {
      if (!initialized) return
      const dr = Math.min(3, Math.max(0.25, gsap.ticker.deltaRatio(60)))
      const ease = reduced() ? 1 : 1 - Math.pow(1 - 0.22, dr)
      cx += (tx - cx) * ease
      cy += (ty - cy) * ease
      cur.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const r = root.getBoundingClientRect()
      tx = e.clientX - r.left
      ty = e.clientY - r.top
      if (!initialized) {
        cx = tx
        cy = ty
        initialized = true
        cur.style.opacity = "1"
        cur.style.transform = `translate3d(${cx.toFixed(1)}px,${cy.toFixed(1)}px,0)`
      }
    }

    const onLeave = () => {
      initialized = false
      cur.style.opacity = "0"
    }

    root.addEventListener("pointermove", onMove)
    root.addEventListener("pointerleave", onLeave)
    gsap.ticker.add(syncCursor)
    return () => {
      root.removeEventListener("pointermove", onMove)
      root.removeEventListener("pointerleave", onLeave)
      gsap.ticker.remove(syncCursor)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (hoverLeaveTimer.current) window.clearTimeout(hoverLeaveTimer.current)
    }
  }, [])

  const isInteractiveSlot = (k: number) => {
    const slot = state.current.slots[k] ?? slotOf(k, state.current.roll, n)
    const opacity = state.current.opacities[k] ?? 1
    return slot >= -0.25 && opacity > 0.15
  }

  const applyLift = (k: number) => {
    if (hoverLeaveTimer.current) {
      window.clearTimeout(hoverLeaveTimer.current)
      hoverLeaveTimer.current = null
    }
    if (k >= 0 && !isInteractiveSlot(k)) return
    if (state.current.hover === k) return
    state.current.hover = k
    setHover(k)
  }

  const handleCardLeave = (k: number) => {
    if (state.current.hover !== k) return
    if (hoverLeaveTimer.current) window.clearTimeout(hoverLeaveTimer.current)
    hoverLeaveTimer.current = window.setTimeout(() => {
      if (state.current.hover === k) {
        state.current.hover = -1
        setHover(-1)
      }
    }, 55)
  }

  const handleCardEnter = (k: number, e: React.PointerEvent<HTMLButtonElement>) => {
    // Prevent DOM animation sliding a card under a stationary cursor from stealing focus
    const now = Date.now()
    const movedRecently = now - lastPointerMoveRef.current.at < 140
    const deltaMove = Math.abs(e.movementX) + Math.abs(e.movementY)
    if (state.current.hover >= 0 && !movedRecently && deltaMove === 0) {
      return
    }
    applyLift(k)
  }

  const handleCardMove = (k: number, e: React.PointerEvent<HTMLButtonElement>) => {
    const prev = lastPointerMoveRef.current
    if (Math.hypot(e.clientX - prev.x, e.clientY - prev.y) >= 1.2) {
      lastPointerMoveRef.current = { x: e.clientX, y: e.clientY, at: Date.now() }
      applyLift(k)
    }
  }

  const go = (d: number) => {
    const st = state.current
    st.target = Math.round(st.target) + d
  }

  const shown = hover >= 0 ? hover : front
  const activeCard = cards[shown]

  return (
    <div
      ref={rootRef}
      className={"cs-root" + (hover >= 0 ? " cs-lifting" : "") + (className ? " " + className : "")}
      style={{ "--cs-h": height } as CSSProperties}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") {
          e.preventDefault()
          go(1)
        } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
          e.preventDefault()
          go(-1)
        }
      }}
    >
      <style>{CSS}</style>
      {fontHref && <link rel="stylesheet" href={fontHref} />}

      <div
        className="cs-stage"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return
          const prev = lastPointerMoveRef.current
          if (Math.hypot(e.clientX - prev.x, e.clientY - prev.y) >= 1.2) {
            lastPointerMoveRef.current = { x: e.clientX, y: e.clientY, at: Date.now() }
          }
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") applyLift(-1)
        }}
      >
        {cards.map((c, k) => (
          <button
            key={c.title + k}
            ref={(el) => {
              cardRefs.current[k] = el
            }}
            type="button"
            className={"cs-card" + (k === hover ? " cs-on" : "")}
            aria-label={`${c.title}, ${c.category}`}
            tabIndex={k === front ? 0 : -1}
            onPointerEnter={(e) => {
              if (e.pointerType === "mouse") handleCardEnter(k, e)
            }}
            onPointerMove={(e) => {
              if (e.pointerType === "mouse") handleCardMove(k, e)
            }}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") handleCardLeave(k)
            }}
            onFocus={() => applyLift(k)}
            onBlur={() => applyLift(-1)}
            onClick={(e) => {
              if (e.detail === 0 || hover === k) {
                onSelect?.(c, k)
                if (c.href) router.push(c.href)
                return
              }
              applyLift(k)
            }}
          >
            <span className="cs-card-in">
              {c.image ? <img src={c.image} alt={c.title} draggable={false} /> : <Face card={c} />}
            </span>
          </button>
        ))}
      </div>

      <div className="cs-label cs-left" aria-live="polite">
        <span className="cs-mono">{hover >= 0 ? activeCard?.category : `${shown + 1} / ${n}`}</span>
        <span className="cs-big">{hover >= 0 ? activeCard?.title : activeCard?.category}</span>
      </div>

      <div className="cs-label cs-right">
        <span className="cs-big">
          {n} {countLabel}
        </span>
        <div className="cs-controls" style={{ pointerEvents: "auto" }}>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous project"
            className="cs-ctrl-btn"
          >
            <ChevronUp className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next project"
            className="cs-ctrl-btn"
          >
            <ChevronDown className="size-4" />
          </button>
        </div>
      </div>

      <div className="cs-mono cs-tag">
        {tagline[0]}
        <br />
        {tagline[1]}
      </div>

      <Link className="cs-mono cs-cta" href={ctaHref}>
        <span aria-hidden="true">↳</span> {ctaLabel}
      </Link>

      <div ref={cursorRef} className="cs-cursor" aria-hidden="true">
        <span>
          {cursorLabel}
          <svg viewBox="0 0 12 12" width="12" height="12">
            <path d="M2 1l9 5-4 1-2 4z" fill="currentColor" />
          </svg>
        </span>
      </div>
    </div>
  )
}

const CSS = `
.cs-root{position:relative;height:var(--cs-h);min-height:540px;width:100%;overflow:hidden;background:#FFFFFF;color:#0F172A;font-family:var(--font-inter,'Inter',ui-sans-serif,system-ui,sans-serif);container:cs/inline-size;user-select:none;-webkit-user-select:none}
.cs-root img{max-width:none}
.cs-stage{position:absolute;inset:0;z-index:1;isolation:isolate;perspective:1100px;perspective-origin:50% 0%;touch-action:pan-y}
.cs-card{position:absolute;left:50%;top:84%;width:var(--cs-cw);height:var(--cs-ch);margin-top:calc(var(--cs-ch) / -2);padding:0;border:1px solid rgba(15,23,42,0.1);border-bottom:0;border-radius:10px 10px 0 0;overflow:hidden;background:#FFFFFF;cursor:pointer;transform-origin:50% 50%;backface-visibility:hidden;will-change:transform;outline:none;box-shadow:0 -4px 16px rgba(15,23,42,0.06),0 22px 46px -18px rgba(15,23,42,0.28)}
.cs-card::after{content:"";position:absolute;inset:0;background:#0F172A;opacity:var(--cs-shade,0);pointer-events:none;transition:opacity .2s}
.cs-card:focus-visible{outline:2px solid #2563EB;outline-offset:4px}
.cs-card-in{position:absolute;inset:0;overflow:hidden;display:block}
.cs-card-in img{width:100%;height:100%;object-fit:cover;object-position:top;display:block}
.cs-root.cs-lifting .cs-card.cs-on{cursor:none}
.cs-label{position:absolute;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:.35rem;pointer-events:none;z-index:20;max-width:22%}
.cs-left{left:clamp(18px,3cqw,48px)}
.cs-right{right:clamp(18px,3cqw,48px);text-align:right;align-items:flex-end}
.cs-big{font-size:clamp(15px,1.3cqw,22px);font-weight:700;letter-spacing:-.015em;line-height:1.15;color:#0F172A}
.cs-mono{font-size:clamp(10px,.75cqw,12px);font-weight:700;letter-spacing:.08em;text-transform:uppercase;line-height:1.45;color:#2563EB}
.cs-controls{display:flex;gap:6px;margin-top:6px}
.cs-ctrl-btn{width:32px;height:32px;border-radius:9999px;border:1px solid #CBD5E1;background:#FFFFFF;color:#0F172A;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .18s}
.cs-ctrl-btn:hover{border-color:#2563EB;color:#2563EB;background:#EFF6FF}
.cs-tag{position:absolute;left:clamp(18px,3cqw,48px);bottom:clamp(16px,2.6cqw,34px);z-index:20;pointer-events:none;color:#64748B}
.cs-cta{position:absolute;right:clamp(18px,3cqw,48px);bottom:clamp(14px,2.4cqw,30px);z-index:20;color:#0F172A;text-decoration:none;padding:.55em 1em;background:rgba(15,23,42,0.06);border-radius:6px;transition:background-color .2s, color .2s}
.cs-cta:hover{background:#2563EB;color:#FFFFFF}
.cs-cursor{position:absolute;left:0;top:0;z-index:30;pointer-events:none;width:0;height:0;opacity:0;transition:opacity .15s}
.cs-cursor span{position:absolute;left:-36px;top:-36px;width:72px;height:72px;border-radius:50%;background:#2563EB;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;text-align:center;line-height:1.2;padding:0 12px;transform:scale(0);transition:transform .3s cubic-bezier(.2,.8,.2,1);box-shadow:0 10px 30px -10px rgba(37,99,235,0.65)}
.cs-root.cs-lifting .cs-cursor span{transform:scale(1)}
@media (hover: none){.cs-cursor{display:none}}

.cs-face{position:absolute;left:0;top:0;width:1280px;height:800px;transform:scale(var(--cs-k,.4));transform-origin:0 0;overflow:hidden;text-align:left;font-family:var(--font-inter,'Inter',ui-sans-serif,system-ui,sans-serif)}
.cs-nav{position:absolute;left:0;right:0;top:0;height:64px;display:flex;align-items:center;gap:40px;padding:0 40px;font-size:17px;border-bottom:1px solid rgba(15,23,42,0.08);background:inherit;z-index:2}
.cs-nav-dark{color:#f2f2f2;border-color:rgba(255,255,255,0.12)}
.cs-nav-logo{font-weight:700;font-size:21px;letter-spacing:-.02em;display:flex;align-items:center}
.cs-nav-links{display:flex;gap:28px;margin:0 auto;opacity:.75}
.cs-nav-cta{padding:10px 18px;border-radius:8px;font-size:15px;font-weight:600}

@container cs (max-width: 720px){
  .cs-stage{top:64px;bottom:68px;overflow:hidden}
  .cs-card{top:82%}
  .cs-label{top:16px;transform:none;max-width:58%}
  .cs-right{max-width:38%}
  .cs-big{font-size:14px}
  .cs-tag{display:none}
  .cs-cta{left:16px;right:auto;bottom:14px}
}
@media (prefers-reduced-motion: reduce){
  .cs-cursor span,.cs-card::after,.cs-cta{transition:none}
}
`
