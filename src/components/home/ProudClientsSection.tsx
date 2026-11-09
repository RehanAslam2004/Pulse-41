'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { clients, type ClientCard } from '@/content/clients';

function LogoCard({ client }: { client: ClientCard }) {
  const isLightInk = client.tone === 'light';

  return (
    <div
      className="group relative flex aspect-square w-full flex-col items-center justify-center overflow-hidden rounded-[24px] p-7 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.18)]"
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
          className={`relative z-10 text-lg font-extrabold tracking-tight ${
            isLightInk ? 'text-white' : 'text-[#0F172A]'
          }`}
        >
          {client.name}
        </span>
      )}

      <span
        className={`relative z-10 mt-4 text-[10px] font-bold uppercase tracking-[0.14em] ${
          isLightInk ? 'text-blue-100/80' : 'text-slate-500'
        }`}
      >
        {client.category}
      </span>
    </div>
  );
}

/** Vertical endlessly scrolling column of partner cards (hydration-safe, works regardless of OS reduced-motion setting). */
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
        className="flex flex-col gap-4 pb-4 will-change-transform"
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
      className="relative overflow-hidden bg-[#F8FAFC] py-20 sm:py-28 border-y border-slate-200/80"
      style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}
    >
      {/* Subtle architectural grid & radial blue glow matching Pulse41 theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-[110px]"
      />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        {/* ── Left: Pulse41 blue organic shape, headline, sticker and looping arrow ── */}
        <div className="relative flex min-h-[360px] items-center sm:min-h-[440px]">
          {/* Organic Pulse41 Blue flower/cloud backdrop */}
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 400 400"
            className="pointer-events-none absolute -left-14 top-1/2 w-[330px] -translate-y-1/2 sm:-left-16 sm:w-[420px]"
            initial={{ scale: 0.88, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <defs>
              <linearGradient id="p41BlobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DBEAFE" />
                <stop offset="55%" stopColor="#BFDBFE" />
                <stop offset="100%" stopColor="#93C5FD" />
              </linearGradient>
            </defs>
            <path
              fill="url(#p41BlobGrad)"
              d="M206 22c40-6 62 34 58 70 34-26 86-16 96 26 10 40-24 66-56 74 42 10 74 50 54 92-20 40-70 34-98 10 4 44-30 84-74 76-46-8-58-58-44-96-36 22-92 14-104-30-12-46 32-74 66-78-36-14-56-62-26-96 28-32 76-20 98 8-6-26 2-50 30-56z"
            />
          </motion.svg>

          <div className="relative z-10 pl-2 sm:pl-6">
            <motion.h2
              id="proud-clients-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="text-[clamp(38px,4.8vw,62px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-[#0F172A]"
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
          className="relative mx-auto grid h-[440px] w-full max-w-[480px] grid-cols-2 gap-4 sm:h-[540px]"
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
