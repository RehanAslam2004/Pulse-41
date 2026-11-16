'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clients, type ClientCard } from '@/content/clients';

function LogoCard({ client }: { client: ClientCard }) {
  const isLightInk = client.tone === 'light';

  return (
    <div
      className="group relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-[20px] sm:rounded-[24px] p-5 sm:p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.18)]"
      style={{
        background: client.background,
        border: `1px solid ${client.borderColor || 'rgba(203, 213, 225, 0.6)'}`,
      }}
    >
      {/* Top inner highlight sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/60 to-transparent"
      />

      {client.logoSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={client.logoSrc}
          alt={`${client.name} logo`}
          className="relative z-10 max-h-[42%] max-w-[74%] object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <span
          className={`relative z-10 text-base sm:text-lg font-extrabold tracking-tight ${
            isLightInk ? 'text-white' : 'text-[#0F172A]'
          }`}
        >
          {client.name}
        </span>
      )}

      <span
        className={`relative z-10 mt-3 sm:mt-4 text-[10px] font-semibold tracking-[0.06em] text-center ${
          isLightInk ? 'text-blue-100/80' : 'text-slate-500'
        }`}
      >
        {client.category}
      </span>
    </div>
  );
}

/** Vertical endlessly scrolling column of partner cards. */
function LogoColumn({
  items,
  reverse,
  duration,
}: {
  items: ClientCard[];
  reverse?: boolean;
  duration: number;
}) {
  const loop = [...items, ...items];

  return (
    <div className="relative h-full overflow-hidden">
      <motion.div
        className="flex flex-col gap-3.5 sm:gap-4 pb-3.5 sm:pb-4 will-change-transform"
        animate={{ y: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {loop.map((client, i) => (
          <LogoCard key={`${client.name}-${i}`} client={client} />
        ))}
      </motion.div>
    </div>
  );
}

export function ProudClientsSection() {
  const left = clients.filter((_, i) => i % 2 === 0);
  const right = clients.filter((_, i) => i % 2 === 1);

  return (
    <section
      aria-labelledby="proud-clients-heading"
      className="relative overflow-hidden bg-[#F8FAFC] py-16 sm:py-24 lg:py-28 border-y border-slate-200/80"
      style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}
    >
      {/* Subtle ambient Pulse41 radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 -translate-y-1/2 h-[380px] w-[380px] rounded-full bg-blue-500/10 blur-[110px]"
      />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 sm:gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        {/* ── Left: Tech-aligned architectural backdrop + headline ── */}
        <div className="relative flex min-h-[260px] sm:min-h-[400px] items-center">
          {/* Tech-aligned geometric circuit & orbital node backdrop */}
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 440 440"
            className="pointer-events-none absolute -left-10 sm:-left-16 top-1/2 w-[300px] sm:w-[430px] -translate-y-1/2 opacity-90"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 0.9, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <defs>
              <radialGradient id="p41TechCore" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.32" />
                <stop offset="65%" stopColor="#DBEAFE" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#F8FAFC" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="p41CircuitStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Soft luminous aura */}
            <circle cx="220" cy="220" r="200" fill="url(#p41TechCore)" />

            {/* Architectural orbital & isometric rings */}
            <circle cx="220" cy="220" r="176" fill="none" stroke="url(#p41CircuitStroke)" strokeWidth="1.25" strokeDasharray="6 6" />
            <circle cx="220" cy="220" r="132" fill="none" stroke="#BFDBFE" strokeWidth="1.25" strokeOpacity="0.7" />
            <circle cx="220" cy="220" r="88" fill="none" stroke="#93C5FD" strokeWidth="1.5" strokeOpacity="0.45" />

            {/* Geometric circuit axes */}
            <line x1="28" y1="220" x2="412" y2="220" stroke="#BFDBFE" strokeWidth="1" strokeOpacity="0.55" />
            <line x1="220" y1="28" x2="220" y2="412" stroke="#BFDBFE" strokeWidth="1" strokeOpacity="0.55" />
            <path d="M96 96 L156 156 M284 284 L344 344 M344 96 L284 156 M156 284 L96 344" stroke="#93C5FD" strokeWidth="1.2" strokeOpacity="0.5" />

            {/* Hexagonal glass frame */}
            <polygon
              points="220,74 346,147 346,293 220,366 94,293 94,147"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="1.25"
              strokeOpacity="0.22"
            />

            {/* Precision node markers */}
            <circle cx="220" cy="74" r="4.5" fill="#3B82F6" fillOpacity="0.55" />
            <circle cx="346" cy="147" r="4.5" fill="#3B82F6" fillOpacity="0.45" />
            <circle cx="346" cy="293" r="4" fill="#60A5FA" fillOpacity="0.55" />
            <circle cx="220" cy="366" r="4.5" fill="#3B82F6" fillOpacity="0.45" />
            <circle cx="94" cy="293" r="4" fill="#60A5FA" fillOpacity="0.45" />
            <circle cx="94" cy="147" r="4.5" fill="#3B82F6" fillOpacity="0.55" />
          </motion.svg>

          <div className="relative z-10 pl-1 sm:pl-6">
            <motion.h2
              id="proud-clients-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="text-[clamp(34px,4.8vw,62px)] font-extrabold leading-[1.06] tracking-[-0.035em] text-[#0F172A]"
            >
              Proud to have
              <br />
              worked{' '}
              <span className="relative inline-block italic text-[#2563EB]">
                with:
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 20"
                  preserveAspectRatio="none"
                  className="absolute -bottom-[0.12em] left-0 h-[0.16em] w-full"
                >
                  <path
                    d="M4 12 C 60 4, 140 4, 196 10"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h2>

            <p className="mt-4 max-w-md text-sm sm:text-base text-slate-600 leading-relaxed">
              Partnering with ambitious enterprises, high-growth technology teams, and global institutions to deliver resilient digital platforms.
            </p>
          </div>
        </div>

        {/* ── Right: two scrolling columns of Pulse41-themed partner cards ── */}
        <div
          className="relative mx-auto grid h-[380px] sm:h-[520px] w-full max-w-[480px] grid-cols-2 gap-3.5 sm:gap-4"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0, #000 10%, #000 90%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0, #000 10%, #000 90%, transparent 100%)',
          }}
        >
          <LogoColumn items={left} duration={24} />
          <LogoColumn items={right} duration={28} reverse />
        </div>
      </div>
    </section>
  );
}
