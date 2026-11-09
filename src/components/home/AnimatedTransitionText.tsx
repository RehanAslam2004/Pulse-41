'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Scroll-driven right-to-center statement bridging the Hero Video and the Core Advantage section.
 * Uses Pulse41's Inter typography and Navy/Blue theme palette, with zero SSR/client hydration mismatch.
 */
export function AnimatedTransitionText() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Each line glides from right to center as the user scrolls down from the video hero
  const xLine1 = useTransform(smoothProgress, [0, 1], ['22%', '0%']);
  const xLine2 = useTransform(smoothProgress, [0, 1], ['32%', '0%']);
  const xLine3 = useTransform(smoothProgress, [0, 1], ['42%', '0%']);
  const opacityAll = useTransform(smoothProgress, [0, 0.35, 1], [0.2, 0.85, 1]);

  return (
    <section
      ref={sectionRef}
      aria-label="What Pulse41 builds"
      className="relative overflow-hidden bg-[#F8FAFC] py-24 sm:py-32 border-b border-slate-200/80"
      style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}
    >
      {/* Subtle Pulse41 ambient blue radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[320px] w-[680px] rounded-full bg-blue-500/5 blur-[110px]"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 text-center">
        <motion.h2
          style={{ opacity: opacityAll }}
          className="mx-auto max-w-[1180px] font-extrabold text-[#0F172A] leading-[1.06] tracking-[-0.035em] text-[clamp(34px,5.6vw,84px)]"
        >
          {/* Line 1 */}
          <motion.span style={{ x: xLine1 }} className="relative block will-change-transform">
            We architect digital
          </motion.span>

          {/* Line 2 */}
          <motion.span style={{ x: xLine2 }} className="block will-change-transform">
            platforms{' '}
            <span className="bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] bg-clip-text text-transparent">
              &amp; AI systems
            </span>
          </motion.span>

          {/* Line 3 */}
          <motion.span style={{ x: xLine3 }} className="block will-change-transform">
            that deliver{' '}
            <span className="relative inline-block px-[0.12em] text-[#0F172A]">
              results
              {/* Hand-drawn Pulse41 Blue ring around "results" */}
              <svg
                aria-hidden="true"
                viewBox="0 0 400 120"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -inset-x-[0.16em] -inset-y-[0.14em] h-[calc(100%+0.28em)] w-[calc(100%+0.32em)] overflow-visible"
              >
                <motion.path
                  d="M30 70 C 20 25, 160 8, 260 14 C 360 20, 395 50, 380 80 C 362 112, 180 116, 80 104 C 20 96, 8 70, 40 50"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.35 }}
                />
              </svg>

              {/* Sparkle accent */}
              <motion.svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ type: 'spring', stiffness: 220, damping: 12, delay: 0.65 }}
                className="absolute -right-[0.5em] -top-[0.3em] size-[0.45em] text-[#3B82F6]"
              >
                <path
                  fill="currentColor"
                  d="M50 0 C52 34 66 48 100 50 C66 52 52 66 50 100 C48 66 34 52 0 50 C34 48 48 34 50 0 Z"
                />
              </motion.svg>
            </span>
          </motion.span>
        </motion.h2>
      </div>
    </section>
  );
}
