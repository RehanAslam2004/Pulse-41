'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { studioCards, studioSocialLinks } from '@/content/studio';

/**
 * Webphase-inspired "Inside the Studio" fanned social showcase,
 * tailored to Pulse41's light (#F8FAFC) theme with interactive mouse drag left/right & touch swipe.
 */
export function InsideStudioSection() {
  const [activeIdx, setActiveIdx] = useState(2); // Center card active initially
  const [dragOffsetX, setDragOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    currentDx: number;
    hasMoved: boolean;
    didDrag: boolean;
  } | null>(null);

  const n = studioCards.length;

  const step = (dir: number) => {
    setActiveIdx((prev) => (prev + dir + n) % n);
  };

  // Signed circular offset (-2, -1, 0, +1, +2) around activeIdx
  const getOffset = (idx: number) => {
    let diff = (idx - activeIdx + n) % n;
    if (diff > Math.floor(n / 2)) diff -= n;
    return diff;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragStateRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      currentDx: 0,
      hasMoved: false,
      didDrag: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    // On touch devices, only lock drag if gesture is primarily horizontal
    if (!drag.hasMoved) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      if (e.pointerType !== 'mouse' && Math.abs(dy) > Math.abs(dx)) {
        dragStateRef.current = null;
        return;
      }
      drag.hasMoved = true;
      drag.didDrag = true;
      setIsDragging(true);
      try {
        stageRef.current?.setPointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture is unavailable
      }
    }

    const clamped = Math.max(-180, Math.min(180, dx));
    drag.currentDx = clamped;
    setDragOffsetX(clamped);
  };

  const finishDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragStateRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;

    const dx = drag.currentDx;
    const wasDrag = drag.didDrag;
    dragStateRef.current = null;
    setIsDragging(false);
    setDragOffsetX(0);

    try {
      if (stageRef.current?.hasPointerCapture(e.pointerId)) {
        stageRef.current.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore cleanup errors
    }

    if (wasDrag) {
      // Dragging right brings previous card; dragging left brings next card
      if (dx <= -45) step(1);
      else if (dx >= 45) step(-1);
    }
  };

  const activeCard = studioCards[activeIdx];

  return (
    <section
      aria-labelledby="inside-studio-heading"
      className="relative overflow-hidden bg-[#F8FAFC] py-20 sm:py-28 border-b border-slate-200/80"
      style={{ fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}
    >
      {/* Subtle Pulse41 ambient radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 h-[380px] w-[620px] rounded-full bg-blue-500/[0.08] blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* ── Fanned Interactive 5-Card Studio Deck (Drag Left/Right or Click) ── */}
        <div
          ref={stageRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
          onDragStart={(e) => e.preventDefault()}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') step(-1);
            else if (e.key === 'ArrowRight') step(1);
          }}
          tabIndex={0}
          role="region"
          aria-label="Inside the Studio draggable card stack"
          className={`relative mx-auto flex h-[380px] sm:h-[460px] w-full max-w-[820px] items-center justify-center select-none touch-pan-y outline-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {/* Subtle architectural sparkle accent behind right card */}
          <svg
            aria-hidden="true"
            viewBox="0 0 180 180"
            className="pointer-events-none absolute right-2 sm:right-14 bottom-8 w-28 sm:w-40 text-[#DBEAFE]"
          >
            <path
              fill="currentColor"
              d="M90 0 C96 62 118 84 180 90 C118 96 96 118 90 180 C84 118 62 96 0 90 C62 84 84 62 90 0 Z"
            />
          </svg>

          {studioCards.map((card, idx) => {
            const offset = getOffset(idx);
            const isCenter = offset === 0;
            const dragProgress = dragOffsetX / 140; // normalized -1.28..+1.28
            const rotateDeg = offset * 8.5 + (isCenter ? dragOffsetX * 0.05 : dragProgress * 2);
            const translateXPercent = offset * 34;
            const liveXOffset = isCenter
              ? dragOffsetX * 0.92
              : dragOffsetX * (Math.abs(offset) === 1 ? 0.35 : 0.15);
            const translateY = Math.abs(offset) * 14;
            const scale = isCenter
              ? Math.max(0.92, 1 - Math.abs(dragProgress) * 0.04)
              : Math.max(0.82, 1 - Math.abs(offset) * 0.08 + Math.abs(dragProgress) * 0.02);
            const zIndex = 30 - Math.abs(offset) * 5;
            const opacity = Math.abs(offset) > 2 ? 0 : 1 - Math.abs(offset) * 0.1;

            return (
              <motion.div
                key={card.id}
                role="button"
                tabIndex={-1}
                onClick={() => {
                  if (!isDragging && Math.abs(dragOffsetX) < 6) {
                    setActiveIdx(idx);
                  }
                }}
                aria-label={`View ${card.title} (${card.platform})`}
                animate={{
                  x: `calc(${translateXPercent}% + ${liveXOffset}px)`,
                  y: translateY,
                  rotate: rotateDeg,
                  scale,
                  opacity,
                }}
                transition={
                  isDragging
                    ? { type: 'tween', duration: 0 }
                    : { type: 'spring', stiffness: 280, damping: 26 }
                }
                style={{ zIndex }}
                className="group absolute w-[220px] sm:w-[270px] aspect-[3/4] overflow-hidden rounded-[22px] sm:rounded-[26px] border-2 border-white bg-slate-900 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.28)]"
              >
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  draggable={false}
                  className="h-full w-full object-cover pointer-events-none transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay strongest on center card for readable caption */}
                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                    isCenter
                      ? 'bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/25 to-transparent opacity-100'
                      : 'bg-slate-950/35 opacity-80'
                  }`}
                />

                {/* Top-right platform indicator */}
                {isCenter && (
                  <span className="pointer-events-none absolute top-3.5 right-3.5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#0F172A] shadow-sm backdrop-blur-md">
                    {card.platform}
                  </span>
                )}

                {/* Bottom card copy on active card */}
                {isCenter && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5 text-left">
                    <div className="text-sm sm:text-base font-bold text-white leading-snug mb-1">
                      {card.title}
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-200/90 leading-relaxed line-clamp-2 m-0">
                      {card.caption}
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* ── Centered Editorial Title & Controls ─────────────────────── */}
        <div className="mt-6 sm:mt-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous studio story"
              className="flex size-9 items-center justify-center rounded-full border border-slate-300 bg-white text-[#0F172A] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              <ArrowLeft className="size-4" />
            </button>

            <span className="text-xs font-semibold text-slate-500 min-w-[44px] tabular-nums">
              {activeIdx + 1} / {n}
            </span>

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next studio story"
              className="flex size-9 items-center justify-center rounded-full border border-slate-300 bg-white text-[#0F172A] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors cursor-pointer"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>

          <h2
            id="inside-studio-heading"
            className="text-[clamp(32px,4.5vw,56px)] font-extrabold tracking-[-0.035em] text-[#0F172A] leading-[1.08] m-0"
          >
            Inside the <span className="text-[#2563EB]">Studio</span>
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm sm:text-base text-slate-600 leading-relaxed">
            Drag cards left or right to browse how our engineers and delivery teams ship across products, AI, and design systems.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={activeCard.href}
              className="inline-flex items-center gap-2 rounded-full bg-[#0F172A] hover:bg-[#2563EB] px-6 py-2.5 text-sm font-semibold text-white transition-colors"
              style={{ textDecoration: 'none' }}
            >
              <span>Explore {activeCard.platform} Highlight</span>
              <ArrowUpRight className="size-4" />
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-semibold text-slate-600">
              {studioSocialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="hover:text-[#2563EB] transition-colors underline underline-offset-4 decoration-slate-300 hover:decoration-[#2563EB]"
                  style={{ textDecoration: 'underline' }}
                >
                  {social.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
