"use client";

import React, { useId } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Cloud,
  Server,
  Shield,
  Database,
  Cpu,
  Code2,
  Workflow,
  Boxes,
  Layers,
  Lock,
  Terminal,
  Search,
  Key,
  FileCheck,
  Activity,
  Gauge,
  LineChart,
  Building2,
  HeartPulse,
  GraduationCap,
  Store,
  Briefcase,
  GitBranch,
  Zap,
} from "lucide-react";

/* ── Base Enterprise Ecosystem SVG Logos ───────────────────────────── */

const ClaudeLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 28 28" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.488 18.62L11.004 15.54L11.088 15.26L11.004 15.12H10.724L9.8 15.064L6.664 14.98L3.92 14.84L1.26 14.7L0.588 14.56L0 13.72L0.056 13.3L0.616 12.936L1.428 12.992L3.192 13.132L5.852 13.3L7.784 13.412L10.64 13.748H11.088L11.144 13.552L11.004 13.44L10.892 13.328L8.12 11.48L5.152 9.52L3.584 8.372L2.744 7.812L2.324 7.252L2.156 6.076L2.912 5.236L3.948 5.32L4.2 5.376L5.236 6.188L7.476 7.896L10.36 10.08L10.78 10.416L10.948 10.304L10.976 10.22L10.78 9.912L9.24 7L7.56 4.088L6.804 2.884L6.608 2.156C6.524 1.876 6.496 1.596 6.496 1.316L7.336 0.14L7.84 0L9.016 0.168L9.464 0.56L10.192 2.24L11.34 4.844L13.16 8.372L13.72 9.436L14 10.388L14.084 10.668H14.28V10.528L14.42 8.512L14.7 6.076L14.98 2.94L15.064 2.044L15.512 0.98L16.352 0.42L17.08 0.728L17.64 1.54L17.556 2.044L17.248 4.2L16.52 7.588L16.1 9.884H16.352L16.632 9.576L17.78 8.064L19.712 5.656L20.552 4.676L21.56 3.64L22.204 3.136H23.408L24.276 4.452L23.884 5.824L22.652 7.392L21.616 8.708L20.132 10.696L19.236 12.292L19.32 12.404H19.516L22.876 11.676L24.668 11.368L26.796 11.004L27.776 11.452L27.888 11.9L27.496 12.852L25.2 13.412L22.512 13.972L18.508 14.896L18.452 14.924L18.508 15.008L20.3 15.176L21.084 15.232H22.988L26.516 15.512L27.44 16.072L27.972 16.828L27.888 17.388L26.46 18.116L24.556 17.668L20.076 16.604L18.564 16.24H18.34V16.352L19.628 17.612L21.952 19.712L24.92 22.428L25.06 23.1L24.696 23.66L24.304 23.604L21.728 21.644L20.72 20.804L18.48 18.9H18.34V19.096L18.844 19.852L21.588 23.968L21.728 25.228L21.532 25.62L20.804 25.9L20.048 25.732L18.424 23.492L16.744 20.972L15.428 18.676L15.288 18.788L14.476 27.244L14.112 27.664L13.272 28L12.572 27.44L12.18 26.6L12.572 24.864L13.02 22.624L13.384 20.832L13.72 18.62L13.916 17.892V17.836H13.72L12.04 20.16L9.52 23.604L7.504 25.732L7.028 25.928L6.188 25.508L6.272 24.724L6.72 24.08L9.52 20.496L11.2 18.284L12.32 16.996L12.292 16.856H12.208L4.816 21.672L3.5 21.84L2.94 21.28L2.996 20.44L3.276 20.16L5.516 18.62H5.488Z"
      fill="currentColor"
    />
  </svg>
);

const OpenAILogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a4 4 0 0 0-3.8 2.76A4.5 4.5 0 0 0 4.5 9a4.5 4.5 0 0 0 .5 3 4.5 4.5 0 0 0-.5 3 4.5 4.5 0 0 0 3.7 4.24A4 4 0 0 0 12 22a4 4 0 0 0 3.8-2.76A4.5 4.5 0 0 0 19.5 15a4.5 4.5 0 0 0-.5-3 4.5 4.5 0 0 0 .5-3 4.5 4.5 0 0 0-3.7-4.24A4 4 0 0 0 12 2z" />
    <path d="M12 6.5v11" />
    <path d="M7.5 9l9 6" />
    <path d="M7.5 15l9-6" />
  </svg>
);

/* ── Central Pulse41 Cognitive Intelligence Logo ────────────────────── */
const Pulse41Mark = ({ title = "P41", className }: { title?: string; className?: string }) => (
  <div className={cn("relative flex items-center justify-center font-bold text-white tracking-tighter", className)}>
    <div className="flex items-center gap-0.5">
      <span className="text-xs sm:text-sm font-black text-white">{title.slice(0, 2)}</span>
      <span className="text-xs sm:text-sm font-extrabold text-[#3B82F6]">{title.slice(2) || "41"}</span>
    </div>
    <div className="absolute -bottom-1 w-2.5 h-0.5 bg-[#3B82F6] rounded-full" />
  </div>
);

export interface IntegrationItem {
  id: string;
  name: string;
  category?: string;
  icon: React.ComponentType<{ className?: string }>;
  x: number;
  y: number;
  path: string;
  delay: number;
}

// Canonical 6 positions & paths
const DEFAULT_PATHS = [
  "M 270 205 V 105 Q 270 85 250 85 H 110", // Top-Left
  "M 294 205 V 95 Q 294 75 314 75 H 375",  // Top-Right
  "M 250 205 H 145",                       // Mid-Left
  "M 314 205 H 485",                       // Mid-Right
  "M 282 205 V 360",                       // Bottom-Center
  "M 314 215 V 320 Q 314 335 329 335 H 460", // Bottom-Right
];

const DEFAULT_COORDS = [
  { x: 110, y: 85 },
  { x: 375, y: 75 },
  { x: 145, y: 205 },
  { x: 485, y: 205 },
  { x: 282, y: 360 },
  { x: 460, y: 335 },
];

export const defaultAiNodes: IntegrationItem[] = [
  { id: "claude", name: "Claude 3.5 Sonnet", icon: ClaudeLogo, delay: 0.1, ...DEFAULT_COORDS[0], path: DEFAULT_PATHS[0] },
  { id: "openai", name: "OpenAI GPT-4o", icon: OpenAILogo, delay: 0.25, ...DEFAULT_COORDS[1], path: DEFAULT_PATHS[1] },
  { id: "vectordb", name: "pgvector / Pinecone", icon: Database, delay: 0.4, ...DEFAULT_COORDS[2], path: DEFAULT_PATHS[2] },
  { id: "python", name: "Python / PyTorch", icon: Terminal, delay: 0.55, ...DEFAULT_COORDS[3], path: DEFAULT_PATHS[3] },
  { id: "agentic", name: "Agentic Workflows", icon: Workflow, delay: 0.7, ...DEFAULT_COORDS[4], path: DEFAULT_PATHS[4] },
  { id: "enterprise", name: "Enterprise ERP / APIs", icon: Boxes, delay: 0.85, ...DEFAULT_COORDS[5], path: DEFAULT_PATHS[5] },
];

/** Service-Specific Technology Mesh Generator */
export function getServiceNodes(slug: string): IntegrationItem[] {
  switch (slug) {
    case "software-engineering":
      return [
        { id: "react", name: "Next.js & React 19", icon: Code2, delay: 0.1, ...DEFAULT_COORDS[0], path: DEFAULT_PATHS[0] },
        { id: "node", name: "Node.js & Go APIs", icon: Server, delay: 0.25, ...DEFAULT_COORDS[1], path: DEFAULT_PATHS[1] },
        { id: "postgres", name: "PostgreSQL & Prisma", icon: Database, delay: 0.4, ...DEFAULT_COORDS[2], path: DEFAULT_PATHS[2] },
        { id: "mobile", name: "Native & Flutter", icon: Cpu, delay: 0.55, ...DEFAULT_COORDS[3], path: DEFAULT_PATHS[3] },
        { id: "cicd", name: "Automated CI/CD", icon: GitBranch, delay: 0.7, ...DEFAULT_COORDS[4], path: DEFAULT_PATHS[4] },
        { id: "docker", name: "Docker Containerization", icon: Boxes, delay: 0.85, ...DEFAULT_COORDS[5], path: DEFAULT_PATHS[5] },
      ];
    case "cloud-devops":
      return [
        { id: "aws", name: "AWS & Azure Cloud", icon: Cloud, delay: 0.1, ...DEFAULT_COORDS[0], path: DEFAULT_PATHS[0] },
        { id: "k8s", name: "Kubernetes (K8s)", icon: Boxes, delay: 0.25, ...DEFAULT_COORDS[1], path: DEFAULT_PATHS[1] },
        { id: "terraform", name: "Terraform IaC", icon: Code2, delay: 0.4, ...DEFAULT_COORDS[2], path: DEFAULT_PATHS[2] },
        { id: "docker", name: "Container Mesh", icon: Server, delay: 0.55, ...DEFAULT_COORDS[3], path: DEFAULT_PATHS[3] },
        { id: "ci", name: "Zero-Downtime CI/CD", icon: GitBranch, delay: 0.7, ...DEFAULT_COORDS[4], path: DEFAULT_PATHS[4] },
        { id: "monitoring", name: "Prometheus & Datadog", icon: Activity, delay: 0.85, ...DEFAULT_COORDS[5], path: DEFAULT_PATHS[5] },
      ];
    case "cybersecurity":
      return [
        { id: "iam", name: "Zero Trust IAM", icon: Key, delay: 0.1, ...DEFAULT_COORDS[0], path: DEFAULT_PATHS[0] },
        { id: "soc2", name: "SOC 2 & ISO 27001", icon: Shield, delay: 0.25, ...DEFAULT_COORDS[1], path: DEFAULT_PATHS[1] },
        { id: "pen", name: "Penetration Testing", icon: Lock, delay: 0.4, ...DEFAULT_COORDS[2], path: DEFAULT_PATHS[2] },
        { id: "enc", name: "End-to-End Encryption", icon: Key, delay: 0.55, ...DEFAULT_COORDS[3], path: DEFAULT_PATHS[3] },
        { id: "secops", name: "24/7 SIEM & Detection", icon: Activity, delay: 0.7, ...DEFAULT_COORDS[4], path: DEFAULT_PATHS[4] },
        { id: "audit", name: "Auditable Access Logs", icon: FileCheck, delay: 0.85, ...DEFAULT_COORDS[5], path: DEFAULT_PATHS[5] },
      ];
    case "data-analytics":
      return [
        { id: "dw", name: "Snowflake & BigQuery", icon: Database, delay: 0.1, ...DEFAULT_COORDS[0], path: DEFAULT_PATHS[0] },
        { id: "kafka", name: "Apache Kafka Streaming", icon: Workflow, delay: 0.25, ...DEFAULT_COORDS[1], path: DEFAULT_PATHS[1] },
        { id: "bi", name: "Executive BI Dashboards", icon: LineChart, delay: 0.4, ...DEFAULT_COORDS[2], path: DEFAULT_PATHS[2] },
        { id: "dbt", name: "dbt Data Modeling", icon: Code2, delay: 0.55, ...DEFAULT_COORDS[3], path: DEFAULT_PATHS[3] },
        { id: "ml", name: "Predictive Analytics", icon: Cpu, delay: 0.7, ...DEFAULT_COORDS[4], path: DEFAULT_PATHS[4] },
        { id: "gov", name: "Enterprise Data Governance", icon: FileCheck, delay: 0.85, ...DEFAULT_COORDS[5], path: DEFAULT_PATHS[5] },
      ];
    case "digital-marketing":
      return [
        { id: "seo", name: "Technical SEO & Schema", icon: Search, delay: 0.1, ...DEFAULT_COORDS[0], path: DEFAULT_PATHS[0] },
        { id: "analytics", name: "Attribution & GA4", icon: LineChart, delay: 0.25, ...DEFAULT_COORDS[1], path: DEFAULT_PATHS[1] },
        { id: "crm", name: "HubSpot & Salesforce", icon: Boxes, delay: 0.4, ...DEFAULT_COORDS[2], path: DEFAULT_PATHS[2] },
        { id: "cro", name: "A/B Testing & Funnels", icon: Gauge, delay: 0.55, ...DEFAULT_COORDS[3], path: DEFAULT_PATHS[3] },
        { id: "omni", name: "Paid Acquisition Engine", icon: Zap, delay: 0.7, ...DEFAULT_COORDS[4], path: DEFAULT_PATHS[4] },
        { id: "content", name: "Headless Content CMS", icon: Layers, delay: 0.85, ...DEFAULT_COORDS[5], path: DEFAULT_PATHS[5] },
      ];
    case "managed-it":
      return [
        { id: "helpdesk", name: "24/7 Operations Desk", icon: Activity, delay: 0.1, ...DEFAULT_COORDS[0], path: DEFAULT_PATHS[0] },
        { id: "sla", name: "99.9% SLA Assurance", icon: Gauge, delay: 0.25, ...DEFAULT_COORDS[1], path: DEFAULT_PATHS[1] },
        { id: "cloud", name: "Managed Cloud VPC", icon: Cloud, delay: 0.4, ...DEFAULT_COORDS[2], path: DEFAULT_PATHS[2] },
        { id: "endpoint", name: "Endpoint MDM & Security", icon: Lock, delay: 0.55, ...DEFAULT_COORDS[3], path: DEFAULT_PATHS[3] },
        { id: "backup", name: "Automated Disaster Recovery", icon: Database, delay: 0.7, ...DEFAULT_COORDS[4], path: DEFAULT_PATHS[4] },
        { id: "infra", name: "Infrastructure Telemetry", icon: Server, delay: 0.85, ...DEFAULT_COORDS[5], path: DEFAULT_PATHS[5] },
      ];
    case "consulting-assurance":
      return [
        { id: "audit", name: "Architecture Audits", icon: FileCheck, delay: 0.1, ...DEFAULT_COORDS[0], path: DEFAULT_PATHS[0] },
        { id: "roadmap", name: "Technology Roadmaps", icon: Workflow, delay: 0.25, ...DEFAULT_COORDS[1], path: DEFAULT_PATHS[1] },
        { id: "due_diligence", name: "Tech Due Diligence", icon: Search, delay: 0.4, ...DEFAULT_COORDS[2], path: DEFAULT_PATHS[2] },
        { id: "enablement", name: "Team Training & Enablement", icon: GraduationCap, delay: 0.55, ...DEFAULT_COORDS[3], path: DEFAULT_PATHS[3] },
        { id: "gov", name: "IT Governance Models", icon: Shield, delay: 0.7, ...DEFAULT_COORDS[4], path: DEFAULT_PATHS[4] },
        { id: "exec", name: "Fractional CTO Advisory", icon: Briefcase, delay: 0.85, ...DEFAULT_COORDS[5], path: DEFAULT_PATHS[5] },
      ];
    default:
      return defaultAiNodes;
  }
}

/** Solution-Specific Technology Mesh Generator */
export function getSolutionNodes(slug: string, productName?: string): IntegrationItem[] {
  return [
    { id: "core", name: `${productName || "PulseCore"} Engine`, icon: Cpu, delay: 0.1, ...DEFAULT_COORDS[0], path: DEFAULT_PATHS[0] },
    { id: "api", name: "REST & GraphQL APIs", icon: Boxes, delay: 0.25, ...DEFAULT_COORDS[1], path: DEFAULT_PATHS[1] },
    { id: "sec", name: "Enterprise IAM & RBAC", icon: Shield, delay: 0.4, ...DEFAULT_COORDS[2], path: DEFAULT_PATHS[2] },
    { id: "db", name: "Multi-Tenant Data Store", icon: Database, delay: 0.55, ...DEFAULT_COORDS[3], path: DEFAULT_PATHS[3] },
    { id: "pipe", name: "Asynchronous Queue", icon: Workflow, delay: 0.7, ...DEFAULT_COORDS[4], path: DEFAULT_PATHS[4] },
    { id: "cloud", name: "Cloud Native Deployment", icon: Cloud, delay: 0.85, ...DEFAULT_COORDS[5], path: DEFAULT_PATHS[5] },
  ];
}

/** Industry-Specific Technology Mesh Generator */
export function getIndustryNodes(slug: string, industryName?: string): IntegrationItem[] {
  switch (slug) {
    case "healthcare":
      return [
        { id: "hipaa", name: "HIPAA Compliant Vault", icon: Shield, delay: 0.1, ...DEFAULT_COORDS[0], path: DEFAULT_PATHS[0] },
        { id: "ehr", name: "EHR / HL7 FHIR APIs", icon: HeartPulse, delay: 0.25, ...DEFAULT_COORDS[1], path: DEFAULT_PATHS[1] },
        { id: "tele", name: "Telehealth Workflows", icon: Activity, delay: 0.4, ...DEFAULT_COORDS[2], path: DEFAULT_PATHS[2] },
        { id: "enc", name: "Encrypted Patient Data", icon: Lock, delay: 0.55, ...DEFAULT_COORDS[3], path: DEFAULT_PATHS[3] },
        { id: "diag", name: "Diagnostic AI Pipelines", icon: Cpu, delay: 0.7, ...DEFAULT_COORDS[4], path: DEFAULT_PATHS[4] },
        { id: "audit", name: "Clinical Audit Trails", icon: FileCheck, delay: 0.85, ...DEFAULT_COORDS[5], path: DEFAULT_PATHS[5] },
      ];
    case "retail":
      return [
        { id: "ecom", name: "Headless E-Commerce", icon: Store, delay: 0.1, ...DEFAULT_COORDS[0], path: DEFAULT_PATHS[0] },
        { id: "pos", name: "Omnichannel POS Sync", icon: Boxes, delay: 0.25, ...DEFAULT_COORDS[1], path: DEFAULT_PATHS[1] },
        { id: "inv", name: "Real-Time Inventory Mesh", icon: Database, delay: 0.4, ...DEFAULT_COORDS[2], path: DEFAULT_PATHS[2] },
        { id: "pay", name: "PCI-DSS Payment Gateways", icon: Lock, delay: 0.55, ...DEFAULT_COORDS[3], path: DEFAULT_PATHS[3] },
        { id: "crm", name: "Customer Loyalty Engine", icon: Workflow, delay: 0.7, ...DEFAULT_COORDS[4], path: DEFAULT_PATHS[4] },
        { id: "rec", name: "AI Recommendation Grid", icon: Cpu, delay: 0.85, ...DEFAULT_COORDS[5], path: DEFAULT_PATHS[5] },
      ];
    case "education":
      return [
        { id: "lms", name: "LMS & SIS Integration", icon: GraduationCap, delay: 0.1, ...DEFAULT_COORDS[0], path: DEFAULT_PATHS[0] },
        { id: "portal", name: "Student & Faculty Portal", icon: Server, delay: 0.25, ...DEFAULT_COORDS[1], path: DEFAULT_PATHS[1] },
        { id: "ferpa", name: "FERPA Compliance Guard", icon: Shield, delay: 0.4, ...DEFAULT_COORDS[2], path: DEFAULT_PATHS[2] },
        { id: "assess", name: "Automated Assessment AI", icon: Cpu, delay: 0.55, ...DEFAULT_COORDS[3], path: DEFAULT_PATHS[3] },
        { id: "video", name: "Interactive Streaming", icon: Activity, delay: 0.7, ...DEFAULT_COORDS[4], path: DEFAULT_PATHS[4] },
        { id: "data", name: "Institutional Analytics", icon: LineChart, delay: 0.85, ...DEFAULT_COORDS[5], path: DEFAULT_PATHS[5] },
      ];
    default:
      return [
        { id: "spec", name: `${industryName || "Sector"} Architecture`, icon: Building2, delay: 0.1, ...DEFAULT_COORDS[0], path: DEFAULT_PATHS[0] },
        { id: "reg", name: "Regulatory Compliance", icon: Shield, delay: 0.25, ...DEFAULT_COORDS[1], path: DEFAULT_PATHS[1] },
        { id: "flow", name: "Automated Workflows", icon: Workflow, delay: 0.4, ...DEFAULT_COORDS[2], path: DEFAULT_PATHS[2] },
        { id: "int", name: "Legacy System Connectors", icon: Boxes, delay: 0.55, ...DEFAULT_COORDS[3], path: DEFAULT_PATHS[3] },
        { id: "sec", name: "Enterprise Data Isolation", icon: Lock, delay: 0.7, ...DEFAULT_COORDS[4], path: DEFAULT_PATHS[4] },
        { id: "dash", name: "Operational Telemetry", icon: LineChart, delay: 0.85, ...DEFAULT_COORDS[5], path: DEFAULT_PATHS[5] },
      ];
  }
}

const AnimatedPath = ({ d, id }: { d: string; id: string }) => {
  return (
    <>
      <path
        d={d}
        stroke="#93C5FD"
        strokeOpacity="0.2"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />
      <motion.path
        d={d}
        stroke={`url(#${id})`}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="40 160"
        initial={{ strokeDashoffset: 200 }}
        animate={{ strokeDashoffset: -200 }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 2,
        }}
      />
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
          <stop offset="50%" stopColor="#93C5FD" stopOpacity="1" />
          <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </linearGradient>
      </defs>
    </>
  );
};

export function Integration({
  nodes = defaultAiNodes,
  hubTitle = "P41",
}: {
  nodes?: IntegrationItem[];
  hubTitle?: string;
}) {
  const containerId = useId();

  return (
    <div className="relative h-full w-full select-none">
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 564 410"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {nodes.map((integration) => (
          <AnimatedPath
            key={integration.id}
            d={integration.path}
            id={`${containerId}-${integration.id}`}
          />
        ))}
      </svg>

      {/* Center Intelligence Hub */}
      <div className="absolute top-1/2 left-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-[#93C5FD]/30 bg-[#1E293B] p-1.5 sm:p-2 shadow-2xl shadow-blue-500/20 backdrop-blur-md">
        <div className="relative flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-b from-[#1E293B] to-[#0F172A] border border-[#3B82F6]/40 p-2 shadow-inner">
          <Pulse41Mark title={hubTitle} className="size-full" />
        </div>
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-[#3B82F6]/40"
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 rounded-2xl border border-[#93C5FD]/20"
          animate={{ scale: [1, 1.45, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      {/* Peripheral Connected Ecosystem Nodes */}
      {nodes.map((integration) => {
        const Icon = integration.icon;
        return (
          <motion.div
            key={integration.id}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: integration.delay, duration: 0.5 }}
            style={{
              left: `${(integration.x / 564) * 100}%`,
              top: `${(integration.y / 410) * 100}%`,
            }}
            className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center"
          >
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-[#CBD5E1]/20 bg-[#1E293B]/90 text-[#93C5FD] shadow-lg shadow-black/40 backdrop-blur-md transition-all duration-300 group-hover:border-[#3B82F6] group-hover:bg-[#1E293B] group-hover:text-white group-hover:scale-110">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:scale-105" />
            </div>

            <div className="pointer-events-none absolute top-full mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 whitespace-nowrap">
              <span className="rounded-md bg-[#0F172A] border border-[#93C5FD]/30 px-2 py-0.5 text-[10px] font-mono font-semibold text-[#CBD5E1] shadow-md">
                {integration.name}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export function VisualContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-[564/440] sm:aspect-[564/410] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#0F172A]/80 border border-[#CBD5E1]/15 p-4 sm:p-6 backdrop-blur-md",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle, #93C5FD 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_center] from-[#3B82F6]/15 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0F172A]/70 via-transparent to-[#0F172A]/80" />

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export interface HeroIntegrationCardProps {
  hubTitle?: string;
  eyebrow?: string;
  subBadge?: string;
  nodes?: IntegrationItem[];
  footerPills?: string[];
  className?: string;
}

export function HeroIntegrationCard({
  hubTitle = "P41",
  eyebrow = "ORCHESTRATION ENGINE",
  subBadge = "MULTI-AGENT MESH",
  nodes = defaultAiNodes,
  footerPills = ["Frontier LLMs", "Vector Memory", "Enterprise APIs"],
  className,
}: HeroIntegrationCardProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-xl mx-auto rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-[#CBD5E1]/20 shadow-2xl shadow-blue-950/40 backdrop-blur-xl",
        className
      )}
    >
      {/* Top Status Header */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-[#CBD5E1]/10 text-xs mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
          <span className="font-mono text-[11px] font-semibold tracking-wider text-[#93C5FD] uppercase">
            {eyebrow}
          </span>
        </div>
        <span className="font-mono text-[10px] text-[#CBD5E1]/70 uppercase">
          {subBadge}
        </span>
      </div>

      {/* Visual Canvas */}
      <VisualContainer className="border-0 bg-[#0B132B]/90">
        <Integration nodes={nodes} hubTitle={hubTitle} />
      </VisualContainer>

      {/* Bottom Sub-panel */}
      <div className="mt-3 px-3 sm:px-4 py-2 flex items-center justify-between text-[11px] font-mono text-[#CBD5E1]/80 border-t border-[#CBD5E1]/10">
        {footerPills.map((pill, idx) => (
          <span key={idx} className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                idx % 2 === 0 ? "bg-[#3B82F6]" : "bg-[#93C5FD]"
              }`}
            />
            <span>{pill}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export interface IntegrationCardProps {
  title?: string;
  description?: string;
  url?: string;
  className?: string;
}

export function IntegrationCard({
  title = "Unified AI Integration Engine",
  description = "Connect proprietary databases, frontier reasoning models, and business APIs into governed enterprise autonomous pipelines.",
  url = "/contact",
  className,
}: IntegrationCardProps) {
  return (
    <Card
      className={cn(
        "mx-auto flex w-full flex-col max-w-xl rounded-3xl overflow-hidden p-0 border border-[#CBD5E1]/20 bg-[#1E293B]/90 shadow-2xl backdrop-blur-xl text-white",
        className
      )}
    >
      <VisualContainer className="border-0 bg-[#0F172A]/90">
        <Integration />
      </VisualContainer>

      <CardContent className="p-6 sm:p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="text-xs font-mono font-bold text-[#93C5FD] uppercase tracking-wider">
            ECOSYSTEM ORCHESTRATION
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            {title}
          </h3>
          <p className="text-sm sm:text-base leading-relaxed text-[#CBD5E1]">
            {description}
          </p>
        </div>

        <div>
          <a
            href={url}
            className="inline-flex items-center justify-center gap-2 h-10 px-6 rounded-full font-bold text-sm text-white bg-[#3B82F6] hover:bg-[#2563EB] transition-colors shadow-lg shadow-blue-500/25"
          >
            <span>Explore Integration Architecture</span>
            <span>→</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export default HeroIntegrationCard;
