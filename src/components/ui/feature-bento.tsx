"use client";

import React from "react";
import Link from "next/link";
import { Cloud, ShoppingBag, ArrowUpRight } from "lucide-react";

export interface FeatureBentoProps {
  className?: string;
}

export const FeatureBento: React.FC<FeatureBentoProps> = ({ className = "" }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-auto md:auto-rows-[290px]">
        {/* ── CARD 1: HERO CARD (2x2) — Technology & Cloud Infrastructure ── */}
        <div className="md:col-span-2 md:row-span-2 rounded-3xl p-7 sm:p-10 text-white flex flex-col justify-end relative overflow-hidden group shadow-xl border border-slate-800/40 bg-slate-950">
          {/* High-Tech Datacenter Photography Background */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700 ease-out"
            style={{ backgroundImage: `url('/images/industries/datacenter-cloud.jpg')` }}
          />

          {/* Cinematic Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />

          {/* Content */}
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs font-mono font-semibold tracking-wider uppercase text-blue-200 shadow-sm w-fit">
              <span className="size-2 bg-emerald-400 rounded-full animate-pulse" />
              10+ Global Sectors
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.05]">
              Architected for
              <br />
              Industry Scale
            </h3>

            <p className="max-w-xl text-slate-200 text-sm sm:text-base leading-relaxed">
              From high-growth SaaS and enterprise healthcare to unified digital commerce and regulated compliance platforms — purpose-built engineering across high-stakes industries.
            </p>

            {/* Sector Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                "Technology & SaaS",
                "Healthcare & Care",
                "Retail & Commerce",
                "Certification & Compliance",
                "Education & Training",
              ].map((sector) => (
                <span
                  key={sector}
                  className="text-xs font-medium px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15 text-white/90"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── CARD 2: STATS CARD 1 (Top-Right) — Cloud SLA ── */}
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-3xl p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden group shadow-lg transition-all hover:shadow-xl">
          <div className="absolute -right-8 -top-8 size-32 bg-white/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="size-13 text-white rounded-2xl bg-white/20 backdrop-blur-md border border-white/25 flex items-center justify-center mb-6 shadow-sm">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-1">
                99.99%
              </h4>
              <p className="text-blue-100 font-bold text-base">
                Cloud & Infrastructure SLA
              </p>
              <p className="text-xs text-blue-200/80 mt-1">
                High-availability zero unplanned downtime design
              </p>
            </div>
          </div>
        </div>

        {/* ── CARD 3: FEATURE CARD (Middle-Right) — Retail & Commerce ── */}
        <div className="bg-white rounded-3xl p-7 sm:p-8 flex flex-col justify-between border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group">
          <div className="size-13 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <ShoppingBag className="w-6 h-6 text-white" />
          </div>
          <div className="space-y-2 mt-6">
            <h4 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Unified Commerce & Retail
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed">
              Headless catalog pipelines, automated inventory workflows, and intelligent customer journey optimization.
            </p>
          </div>
        </div>

        {/* ── CARD 4: CTA CARD (Bottom-Left) — Explore All 10 Sectors ── */}
        <Link
          href="/industries"
          className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 rounded-3xl p-7 sm:p-8 text-white flex flex-col justify-between transition-all cursor-pointer group hover:shadow-2xl border border-slate-800 relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-white/10 border border-white/15 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-blue-300">
              Sector Directory
            </span>
            <div className="size-11 bg-white/10 border border-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
          <div className="mt-8">
            <h4 className="text-2xl sm:text-3xl font-extrabold leading-tight tracking-tight text-white group-hover:text-blue-300 transition-colors">
              Explore All 10
              <br />
              Industry Sectors
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Detailed architectures, relevant capabilities & case studies &rarr;
            </p>
          </div>
        </Link>

        {/* ── CARD 5: STATS CARD 2 (Bottom-Middle) — Verified Transactions ── */}
        <div className="bg-slate-950 rounded-3xl p-7 sm:p-8 text-white flex flex-col justify-center gap-3 relative overflow-hidden group border border-slate-800/80 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <span className="absolute top-6 right-6 flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-blue-500" />
          </span>
          <div className="relative z-10">
            <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent tracking-tight">
              50M+
            </span>
            <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-300 font-bold mt-2">
              Verified Transactions
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Cryptographic audit logs & tamper-proof credentials
            </p>
          </div>
        </div>

        {/* ── CARD 6: STATS CARD 3 (Bottom-Right) — Delivery Commitment ── */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-7 sm:p-8 text-white flex flex-col justify-center gap-3 relative overflow-hidden group shadow-lg hover:shadow-xl transition-all">
          <div className="absolute -bottom-10 -right-10 size-40 bg-white/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              100%
            </span>
            <p className="text-xs sm:text-sm uppercase tracking-widest text-blue-100 font-bold mt-2">
              Delivery Commitment
            </p>
            <p className="text-xs text-blue-200/90 mt-1">
              Disciplined code craft with SLA-backed deliverables
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureBento;
