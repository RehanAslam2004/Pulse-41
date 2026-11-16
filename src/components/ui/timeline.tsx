"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

export type JourneyItem = {
  id: string;
  stepNumber: string;
  stepTitle: string;
  category?: string;
  year?: string;
  month?: string;
  content: string;
  focus?: string;
};

export type TimelineProps = {
  title?: string;
  subtitle?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  duration?: number;
  scrollDuration?: number;
  topData?: JourneyItem[];
  bottomData?: JourneyItem[];
};

/* ── Pulse41 9-Step Delivery Methodology ── */
export const defaultTopJourneyData: JourneyItem[] = [
  {
    id: "step-01",
    stepNumber: "01",
    stepTitle: "Discover",
    content: "Objectives, constraints, stakeholders, systems and business context.",
  },
  {
    id: "step-03",
    stepNumber: "03",
    stepTitle: "Architect",
    content: "Solution, data, integration, security and hosting architecture.",
  },
  {
    id: "step-05",
    stepNumber: "05",
    stepTitle: "Build & Configure",
    content: "Software, integrations, automations, content and data pipeline.",
  },
  {
    id: "step-07",
    stepNumber: "07",
    stepTitle: "Accept & Deploy",
    content: "Client acceptance, release management, production launch and rollback readiness.",
  },
  {
    id: "step-09",
    stepNumber: "09",
    stepTitle: "Support & Improve",
    content: "Hypercare, ongoing support, telemetry monitoring and optimization cycles.",
  },
];

export const defaultBottomJourneyData: JourneyItem[] = [
  {
    id: "step-02",
    stepNumber: "02",
    stepTitle: "Define",
    content: "Scope, user journeys, requirements, acceptance criteria and metrics.",
  },
  {
    id: "step-04",
    stepNumber: "04",
    stepTitle: "Plan",
    content: "Roadmap, sprints, milestones, risk register and resource allocation.",
  },
  {
    id: "step-06",
    stepNumber: "06",
    stepTitle: "Verify",
    content: "Quality assurance, regression, performance, security review and UAT support.",
  },
  {
    id: "step-08",
    stepNumber: "08",
    stepTitle: "Enable",
    content: "Knowledge transfer, documentation, team training and handover checklist.",
  },
];

function DesktopStepNode({
  item,
  index,
  total,
  progress,
}: {
  item: JourneyItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const isTop = index % 2 === 0;
  // Sync step activation physically with the traveling blue orb along the rail
  const threshold = total > 1 ? 0.13 + (index / (total - 1)) * 0.73 : 0.13;
  const start = Math.max(0, threshold - 0.05);
  const end = Math.min(1, threshold + 0.03);

  const stemScaleY = useTransform(progress, [start, end], [0, 1]);
  const nodeScale = useTransform(progress, [start, start + 0.03], [0.45, 1]);
  const nodeOpacity = useTransform(progress, [start, start + 0.03], [0.25, 1]);
  const textOpacity = useTransform(progress, [start, end], [0.35, 1]);
  const titleColor = useTransform(progress, [start, end], ["#64748B", "#2563EB"]);
  const textY = useTransform(progress, [start, end], [isTop ? -6 : 6, 0]);

  return (
    <div className="relative h-full w-[250px] lg:w-[270px] shrink-0 select-none">
      {/* Junction node directly on the horizontal light rail (y = 50%) */}
      <motion.div
        aria-hidden="true"
        style={{ scale: nodeScale, opacity: nodeOpacity }}
        className="absolute left-6 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex size-3.5 items-center justify-center rounded-full bg-[#2563EB] shadow-[0_0_16px_rgba(37,99,235,0.65)] ring-4 ring-white"
      />

      {/* Vertical light ray stem from rail to step content */}
      {isTop ? (
        <motion.div
          aria-hidden="true"
          style={{ scaleY: stemScaleY, originY: 1 }}
          className="absolute left-[23px] bottom-1/2 h-[42px] w-[2px] rounded-full bg-gradient-to-t from-[#2563EB] via-[#3B82F6] to-[#93C5FD] shadow-[0_0_12px_rgba(59,130,246,0.5)] z-10"
        />
      ) : (
        <motion.div
          aria-hidden="true"
          style={{ scaleY: stemScaleY, originY: 0 }}
          className="absolute left-[23px] top-1/2 h-[42px] w-[2px] rounded-full bg-gradient-to-b from-[#2563EB] via-[#3B82F6] to-[#93C5FD] shadow-[0_0_12px_rgba(59,130,246,0.5)] z-10"
        />
      )}

      {/* Content block placed either cleanly above or cleanly below the rail */}
      {isTop ? (
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute left-2 right-4 bottom-[calc(50%+52px)]"
        >
          <motion.h4
            style={{ color: titleColor }}
            className="text-2xl lg:text-[26px] font-extrabold tracking-tight leading-tight mb-2"
          >
            {item.stepTitle}
          </motion.h4>
          <p className="text-sm leading-relaxed text-slate-600 m-0">
            {item.content}
          </p>
        </motion.div>
      ) : (
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute left-2 right-4 top-[calc(50%+52px)]"
        >
          <motion.h4
            style={{ color: titleColor }}
            className="text-2xl lg:text-[26px] font-extrabold tracking-tight leading-tight mb-2"
          >
            {item.stepTitle}
          </motion.h4>
          <p className="text-sm leading-relaxed text-slate-600 m-0">
            {item.content}
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default function Timeline({
  title = "FROM DISCOVERY TO IMPACT.",
  subtitle = "OUR PROCESS",
  periodLabel = "Nine-stage governed delivery lifecycle",
  imageUrl = "/images/process/isometric-cubes.jpg",
  imageAlt = "Pulse41 Disciplined Engineering Architecture",
  topData = defaultTopJourneyData,
  bottomData = defaultBottomJourneyData,
}: TimelineProps) {
  const desktopSectionRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileListRef = useRef<HTMLDivElement>(null);

  const [maxTranslate, setMaxTranslate] = useState(1400);

  const allJourneyItems: JourneyItem[] = [...topData, ...bottomData].sort((a, b) =>
    a.stepNumber.localeCompare(b.stepNumber)
  );

  // Measure horizontal track overflow dynamically so any screen width finishes cleanly
  useEffect(() => {
    const updateBounds = () => {
      if (!viewportRef.current || !trackRef.current) return;
      const overflow = Math.max(
        0,
        trackRef.current.scrollWidth - viewportRef.current.clientWidth + 48
      );
      setMaxTranslate(overflow);
    };

    updateBounds();
    const ro = new ResizeObserver(updateBounds);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", updateBounds);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateBounds);
    };
  }, [allJourneyItems.length]);

  // Desktop sticky scroll progress (immune to CSS transform ancestors)
  const { scrollYProgress: desktopProgressRaw } = useScroll({
    target: desktopSectionRef,
    offset: ["start start", "end end"],
  });

  const desktopProgress = useSpring(desktopProgressRaw, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });

  const trackX = useTransform(desktopProgress, [0, 1], [0, -maxTranslate]);
  const desktopRayScaleX = useTransform(desktopProgress, [0, 0.94], [0, 1]);
  const desktopRayOrbLeft = useTransform(desktopProgress, [0, 0.94], ["0%", "100%"]);

  // Mobile vertical scroll progress for downward blue light ray
  const { scrollYProgress: mobileProgressRaw } = useScroll({
    target: mobileListRef,
    offset: ["start 80%", "end 70%"],
  });
  const mobileRayScaleY = useSpring(mobileProgressRaw, {
    stiffness: 120,
    damping: 28,
  });

  const sectionStyle: CSSProperties = {
    backgroundColor: "#FFFFFF",
    color: "#0F172A",
    fontFamily: "var(--font-inter, 'Inter', sans-serif)",
  };

  return (
    <section
      id="our-process"
      aria-labelledby="our-process-heading"
      className="relative w-full border-y border-slate-200/80"
      style={sectionStyle}
    >
      {/* ── DESKTOP PINNED HORIZONTAL TIMELINE (md+) ───────────────────── */}
      <div ref={desktopSectionRef} className="hidden md:block relative h-[320vh] w-full">
        <div
          ref={viewportRef}
          className="sticky top-0 h-screen w-full pt-[72px] overflow-hidden flex items-center bg-white"
        >
          {/* Soft ambient blue glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/3 top-1/2 -translate-y-1/2 h-[360px] w-[720px] rounded-full bg-blue-500/[0.04] blur-[120px]"
          />

          <motion.div
            ref={trackRef}
            style={{ x: trackX }}
            className="relative flex items-center gap-10 lg:gap-14 pl-8 lg:pl-14 pr-20 h-[470px] will-change-transform"
          >
            {/* Left Anchor Visual Card (Clean white-theme architectural framing, zero pill badges) */}
            <div className="relative h-[430px] w-[310px] lg:w-[350px] shrink-0 overflow-hidden rounded-[24px] border border-slate-200 bg-slate-900 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.16)] flex flex-col justify-end p-6 group select-none">
              <img
                src={imageUrl}
                alt={imageAlt}
                draggable={false}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/95 via-[#0F172A]/35 to-transparent" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-white tracking-tight mb-1.5">
                  P41 Delivery Discipline
                </h3>
                <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed m-0">
                  Structured governance, automated testing, and verified production rollouts at every gate.
                </p>
              </div>
            </div>

            {/* Header + Interactive Steps sharing one continuous y=50% Blue Light Ray */}
            <div className="relative flex items-center h-full pr-12">
              {/* Base subtle grey rail extending from Header anchor node through Step 9 */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 right-12 top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 rounded-full"
              />

              {/* Start anchor dot under heading */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 size-3 rounded-full bg-[#2563EB] shadow-[0_0_16px_rgba(37,99,235,0.65)] z-20"
              />

              {/* Animated Blue Light Ray */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 right-12 top-1/2 -translate-y-1/2 h-[3px] z-10"
              >
                <motion.div
                  style={{ scaleX: desktopRayScaleX, originX: 0 }}
                  className="h-full w-full rounded-full bg-gradient-to-r from-[#3B82F6] via-[#2563EB] to-[#60A5FA] shadow-[0_0_18px_rgba(37,99,235,0.6)]"
                />
                {/* Traveling blue ray leading head */}
                <motion.div
                  style={{ left: desktopRayOrbLeft }}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 size-4 rounded-full bg-[#60A5FA]/45 flex items-center justify-center"
                >
                  <span className="size-2 rounded-full bg-[#2563EB] shadow-[0_0_16px_#2563EB]" />
                </motion.div>
              </div>

              {/* Header Block Anchoring the Left of the Continuous Rail */}
              <div className="relative h-full w-[300px] lg:w-[340px] shrink-0 mr-8 select-none">
                <div className="absolute left-0 right-4 bottom-[calc(50%+26px)]">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#2563EB] mb-3">
                    {subtitle}
                  </div>
                  <h2
                    id="our-process-heading"
                    className="text-3xl lg:text-4xl font-extrabold text-[#0F172A] leading-[1.06] tracking-tight m-0"
                  >
                    {title}
                  </h2>
                </div>

                <div className="absolute left-0 right-4 top-[calc(50%+26px)]">
                  <div className="text-sm font-bold text-[#2563EB] mb-1.5">
                    {periodLabel}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed m-0">
                    Every stage is gated by clear acceptance criteria, security checks, and client sign-off.
                  </p>
                </div>
              </div>

              {allJourneyItems.map((item, idx) => (
                <DesktopStepNode
                  key={item.id}
                  item={item}
                  index={idx}
                  total={allJourneyItems.length}
                  progress={desktopProgress}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MOBILE VERTICAL BLUE LIGHT-RAY TIMELINE (< md) ────────────── */}
      <div className="relative md:hidden px-4 py-14">
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#2563EB] mb-2">
            {subtitle}
          </div>
          <h2 className="text-3xl font-extrabold text-[#0F172A] leading-tight tracking-tight mb-3">
            {title}
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed m-0">
            {periodLabel} — gated by clear acceptance criteria, security checks, and sign-off.
          </p>
        </div>

        <div ref={mobileListRef} className="relative pl-7 space-y-7">
          {/* Base rail */}
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-slate-200 rounded-full"
          />

          {/* Vertical glowing blue light ray */}
          <motion.div
            aria-hidden="true"
            style={{ scaleY: mobileRayScaleY, originY: 0 }}
            className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#3B82F6] via-[#2563EB] to-[#60A5FA] shadow-[0_0_14px_rgba(37,99,235,0.55)] rounded-full"
          />

          {allJourneyItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0.35, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[25px] top-1.5 size-3 rounded-full bg-[#2563EB] ring-4 ring-white shadow-[0_0_12px_rgba(37,99,235,0.5)]"
              />
              <h3 className="text-lg font-extrabold text-[#2563EB] tracking-tight mb-1">
                {item.stepTitle}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed m-0">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
