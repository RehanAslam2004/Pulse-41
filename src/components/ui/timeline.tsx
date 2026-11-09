"use client";

import {
  type CSSProperties,
  useEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function getServerReducedMotionSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getServerReducedMotionSnapshot
  );
}

/* ── Pulse41 9-Step Delivery Methodology (Alternating 5 Top & 4 Bottom) ── */
export const defaultTopJourneyData: JourneyItem[] = [
  {
    id: "step-01",
    stepNumber: "01",
    stepTitle: "DISCOVER",
    category: "PHASE 01",
    content: "Objectives, constraints, stakeholders, systems and business context.",
    focus: "Stakeholder interviews, legacy audit & scope",
  },
  {
    id: "step-03",
    stepNumber: "03",
    stepTitle: "ARCHITECT",
    category: "PHASE 03",
    content: "Solution, data, integration, security and hosting architecture.",
    focus: "Resilient infra, schema design & API mapping",
  },
  {
    id: "step-05",
    stepNumber: "05",
    stepTitle: "BUILD & CONFIGURE",
    category: "PHASE 05",
    content: "Software, integrations, automations, content and data pipeline.",
    focus: "Disciplined craft, unit tests & CI/CD pipeline",
  },
  {
    id: "step-07",
    stepNumber: "07",
    stepTitle: "ACCEPT & DEPLOY",
    category: "PHASE 07",
    content: "Client acceptance, release management, production launch and rollback readiness.",
    focus: "Formal sign-off, zero downtime & rollback check",
  },
  {
    id: "step-09",
    stepNumber: "09",
    stepTitle: "SUPPORT & IMPROVE",
    category: "PHASE 09",
    content: "Hypercare, ongoing support, telemetry monitoring and optimization cycles.",
    focus: "SLA maintenance, uptime telemetry & iteration",
  },
];

export const defaultBottomJourneyData: JourneyItem[] = [
  {
    id: "step-02",
    stepNumber: "02",
    stepTitle: "DEFINE",
    category: "PHASE 02",
    content: "Scope, user journeys, requirements, acceptance criteria and metrics.",
    focus: "Functional specs, KPIs & boundary setting",
  },
  {
    id: "step-04",
    stepNumber: "04",
    stepTitle: "PLAN",
    category: "PHASE 04",
    content: "Roadmap, sprints, milestones, risk register and resource allocation.",
    focus: "Sprint cadence, governance & gate reviews",
  },
  {
    id: "step-06",
    stepNumber: "06",
    stepTitle: "VERIFY",
    category: "PHASE 06",
    content: "Quality assurance, regression, performance, security review and UAT support.",
    focus: "End-to-end tests, audits & vulnerability scans",
  },
  {
    id: "step-08",
    stepNumber: "08",
    stepTitle: "ENABLE",
    category: "PHASE 08",
    content: "Knowledge transfer, documentation, team training and handover checklist.",
    focus: "Admin runbooks, code transfer & readiness",
  },
];

export default function Timeline({
  title = "FROM DISCOVERY TO IMPACT.",
  subtitle = "OUR PROCESS",
  periodLabel = "01 — 09 / DELIVERY LIFECYCLE",
  textColor = "#FFFFFF",
  mutedTextColor = "#CBD5E1",
  activeColor = "#2563EB",
  backgroundColor = "#0A0F1D",
  imageUrl = "/images/process/isometric-cubes.jpg",
  imageAlt = "Pulse41 Disciplined Engineering Architecture",
  topData = defaultTopJourneyData,
  bottomData = defaultBottomJourneyData,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };

  const allJourneyItems: JourneyItem[] = [...topData, ...bottomData].sort((a, b) =>
    a.stepNumber.localeCompare(b.stepNumber)
  );

  useEffect(() => {
    const section = sectionRef.current;
    const slider = wholeSliderRef.current;
    if (!section || !slider) return;

    const ctx = gsap.context(() => {
      const items = allJourneyItems;

      if (reducedMotion) {
        items.forEach((item) => {
          gsap.set(`.jl-${item.id}`, { scaleY: 1 });
          gsap.set(`.jd-${item.id}`, { scale: 1 });
          gsap.set(`.title-${item.id}`, { opacity: 1, y: 0 });
          gsap.set(`.description-${item.id}`, { opacity: 1, y: 0 });
          gsap.set(`.badge-${item.id}`, { opacity: 1 });
        });
        gsap.set(".journey-line", { width: "100%" });
        return;
      }

      // Initial state: hide lines and dots, soften unactivated phase text
      items.forEach((item) => {
        const isTop = topData.some((topItem) => topItem.id === item.id);
        gsap.set(`.jl-${item.id}`, {
          scaleY: 0,
          transformOrigin: isTop ? "bottom center" : "top center",
        });
        gsap.set(`.jd-${item.id}`, { scale: 0 });
        gsap.set(`.title-${item.id}`, { opacity: 0.35, y: 8 });
        gsap.set(`.description-${item.id}`, { opacity: 0.35, y: 5 });
        gsap.set(`.badge-${item.id}`, { opacity: 0.45 });
      });

      gsap.set(".journey-line", { width: "0%" });

      // Calculate translation dynamically so all phases scroll into view on any screen
      const getScrollAmount = () => {
        const sliderWidth = slider.scrollWidth;
        const viewportWidth = window.innerWidth;
        const offset = viewportWidth < 600 ? 40 : 80;
        return -(sliderWidth - viewportWidth + offset);
      };

      // ONE unified master timeline tied to the sticky section scroll
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      // 1. Move the horizontal slider across the screen
      masterTl.to(
        slider,
        {
          x: getScrollAmount,
          ease: "none",
          duration: 10,
        },
        0
      );

      // 2. Extend the glowing central wire seamlessly along the track
      masterTl.to(
        ".journey-line",
        {
          width: "100%",
          ease: "none",
          duration: 10,
        },
        0
      );

      // 3. Sequentially activate each step as the pulse line reaches it
      // Timeline runs from 0 to 10. Steps 1 through 9 are evenly mapped:
      const stepTimings = [
        { start: 0.25, dur: 0.65 }, // Step 01: Discover
        { start: 1.15, dur: 0.65 }, // Step 02: Define
        { start: 2.15, dur: 0.65 }, // Step 03: Architect
        { start: 3.15, dur: 0.65 }, // Step 04: Plan
        { start: 4.15, dur: 0.65 }, // Step 05: Build & Configure
        { start: 5.15, dur: 0.65 }, // Step 06: Verify
        { start: 6.15, dur: 0.65 }, // Step 07: Accept & Deploy
        { start: 7.15, dur: 0.65 }, // Step 08: Enable
        { start: 8.15, dur: 0.70 }, // Step 09: Support & Improve
      ];

      items.forEach((item, idx) => {
        if (idx >= stepTimings.length) return;
        const { start, dur } = stepTimings[idx];

        // Vertical stem line grows from central rail
        masterTl.to(
          `.jl-${item.id}`,
          {
            scaleY: 1,
            duration: dur * 0.7,
            ease: "power1.out",
          },
          start
        );

        // Connection dot blooms with glowing scale
        masterTl.to(
          `.jd-${item.id}`,
          {
            scale: 1,
            duration: dur * 0.5,
            ease: "back.out(2)",
          },
          start + dur * 0.3
        );

        // Phase titles and copy illuminate to 100% white
        masterTl.to(
          `.title-${item.id}`,
          {
            opacity: 1,
            y: 0,
            duration: dur * 0.6,
            ease: "power2.out",
          },
          start + dur * 0.2
        );

        masterTl.to(
          `.description-${item.id}`,
          {
            opacity: 1,
            y: 0,
            duration: dur * 0.6,
            ease: "power2.out",
          },
          start + dur * 0.25
        );

        masterTl.to(
          `.badge-${item.id}`,
          {
            opacity: 1,
            duration: dur * 0.4,
            ease: "power1.out",
          },
          start + dur * 0.2
        );
      });
    }, sectionRef);

    // Refresh ScrollTrigger when images and fonts finish loading
    const handleLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", handleLoad);
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.removeEventListener("load", handleLoad);
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="our-process"
      className="h-[280vw] max-[600px]:h-[480vh] w-full relative selection:bg-blue-500 selection:text-white"
      style={sectionStyle}
    >
      {/* Pinned Viewport Container (Sticky top with navbar offset) */}
      <div className="h-screen w-full sticky top-0 pt-[72px] overflow-hidden flex items-center">
        {/* Horizontal Moving Slider Track */}
        <div
          ref={wholeSliderRef}
          className="mr-[2vw] flex h-[36vw] w-[320vw] items-center gap-[4vw] px-[4vw] max-[600px]:h-[82vh] max-[600px]:w-[940vw] max-[600px]:px-[6vw] will-change-transform"
        >
          {/* Left Anchor Hero Card with 3D Isometric Blue Glass Blocks */}
          <div className="relative h-full w-[28vw] shrink-0 overflow-hidden rounded-[1.2vw] border border-blue-500/20 bg-slate-900/60 shadow-2xl max-[600px]:h-[65vw] max-[600px]:w-[80vw] max-[600px]:rounded-[4vw] flex flex-col justify-end p-[1.8vw] pb-[2.2vw] max-[600px]:p-[4vw] max-[600px]:pb-[5vw] group select-none">
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
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1D] via-[#0A0F1D]/40 to-transparent" />
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0A0F1D]/30 to-[#0A0F1D]" />

            <div className="relative z-10 space-y-[0.4vw] max-[600px]:space-y-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.7vw] max-[600px]:text-[2.4vw] font-mono font-semibold uppercase tracking-wider bg-blue-500/20 border border-blue-400/30 text-blue-300">
                <span className="size-1.5 rounded-full bg-blue-400 animate-pulse" />
                Continuous Rigor
              </span>
              <h3 className="text-[1.3vw] max-[600px]:text-[4.2vw] font-bold text-white tracking-tight leading-snug">
                P41 Delivery Discipline
              </h3>
              <p className="text-[0.8vw] max-[600px]:text-[2.8vw] text-slate-300 leading-relaxed">
                Standardized governance, automated testing, zero-drift pipelines, and verified production rollouts.
              </p>
            </div>
          </div>

          {/* Interactive Timeline Rail & Alternating Cards */}
          <div className="relative h-full w-full">
            {/* Central Horizontal Glowing Line Track */}
            <div className="w-full absolute left-0 top-[49%] -translate-y-1/2 flex items-center h-fit z-10 pointer-events-none">
              {/* Subtle background rail path */}
              <div className="absolute inset-x-0 h-[2px] bg-slate-800/80 rounded-full" />

              {/* Start anchor node */}
              <div
                className="h-[.9vw] max-[600px]:h-[2.4vw] max-[600px]:w-[2.4vw] w-[.9vw] rounded-full shadow-[0_0_16px_#3b82f6] shrink-0 relative z-10"
                style={activeStyle}
              />
              {/* Expanding glowing progress wire */}
              <div
                className="h-[2px] w-[0%] rounded-full journey-line shadow-[0_0_12px_#3b82f6] relative z-10 will-change-[width]"
                style={activeStyle}
              />
              {/* Leading traveling node */}
              <div
                className="h-[.9vw] max-[600px]:h-[2.4vw] max-[600px]:w-[2.4vw] w-[.9vw] rounded-full shadow-[0_0_20px_#60a5fa] shrink-0 relative z-10"
                style={activeStyle}
              />
            </div>

            {/* TOP BRANCH: Header + Top Steps (01, 03, 05, 07, 09) */}
            <div className="flex h-1/2 w-full items-end justify-start gap-[1vw] pb-[2.5vw] max-[600px]:pb-[6vw]">
              {/* Header Anchor */}
              <div className="h-full w-[24vw] shrink-0 flex flex-col justify-end pr-[2vw] max-[600px]:w-[70vw] max-[600px]:pr-[4vw]">
                <div className="text-[0.75vw] max-[600px]:text-[2.8vw] font-mono uppercase tracking-[0.25em] text-blue-400 font-semibold mb-[0.6vw]">
                  {subtitle}
                </div>
                <h2 className="text-[2.5vw] max-[600px]:text-[7vw] font-extrabold text-white leading-[0.95] tracking-tight">
                  {title}
                </h2>
              </div>

              {/* Top Steps Row */}
              <div className="flex h-full gap-x-[12vw] max-[600px]:gap-x-[32vw]">
                {topData.map((item) => (
                  <div
                    key={`top-${item.id}`}
                    className="relative h-full w-[26vw] px-[1.5vw] max-[600px]:w-[68vw] max-[600px]:px-[4vw] flex flex-col justify-between"
                  >
                    {/* Vertical Stem Line & Dot connecting to central wire */}
                    <div className="w-full absolute left-0 bottom-[-2.5vw] max-[600px]:bottom-[-6vw] top-0 h-[calc(100%+2.5vw)] max-[600px]:h-[calc(100%+6vw)] pointer-events-none">
                      <div
                        className={`size-[1vw] max-[600px]:size-[2.6vw] -translate-x-1/2 relative aspect-square rounded-full shadow-[0_0_14px_#3b82f6] jd-${item.id} will-change-transform`}
                        style={{ ...activeStyle, transform: "scale(0)" }}
                      />
                      <div
                        className={`h-[94%] w-[2px] origin-bottom rounded-full shadow-[0_0_10px_#3b82f6] jl-${item.id} will-change-transform`}
                        style={{ ...activeStyle, transform: "scaleY(0)" }}
                      />
                    </div>

                    {/* Step Card Content */}
                    <div className="space-y-[0.8vw] max-[600px]:space-y-[2vw]">
                      <div className="flex items-center gap-[0.8vw]">
                        <span
                          className={`badge-${item.id} font-mono text-[0.9vw] max-[600px]:text-[3.2vw] font-extrabold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded transition-opacity duration-300`}
                        >
                          {item.stepNumber}
                        </span>
                        <span className="text-[0.7vw] max-[600px]:text-[2.5vw] font-mono tracking-widest text-slate-400 uppercase">
                          {item.category || `PHASE ${item.stepNumber}`}
                        </span>
                      </div>

                      <h4
                        className={`title-${item.id} text-[2.2vw] font-extrabold text-white leading-tight tracking-tight max-[600px]:text-[5.8vw] transition-colors duration-300 will-change-transform`}
                      >
                        {item.stepTitle}
                      </h4>

                      <p
                        className={`description-${item.id} text-[1.1vw] leading-relaxed text-slate-200 font-normal max-[600px]:text-[4vw] max-w-[26vw] max-[600px]:max-w-[70vw] transition-colors duration-300 will-change-transform`}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOTTOM BRANCH: Period Subtitle + Bottom Steps (02, 04, 06, 08) */}
            <div className="flex h-1/2 w-full items-start justify-start gap-[1vw] pt-[2.5vw] max-[600px]:pt-[6vw]">
              {/* Period Label Anchor */}
              <div className="h-full w-[24vw] shrink-0 flex flex-col justify-start pr-[2vw] max-[600px]:w-[70vw] max-[600px]:pr-[4vw]">
                <p className="text-[1.2vw] font-mono tracking-wider font-semibold uppercase leading-none max-[600px]:text-[3.6vw] text-blue-400">
                  {periodLabel}
                </p>
                <p className="mt-[1vw] text-[0.95vw] max-[600px]:text-[3vw] text-slate-300 leading-relaxed">
                  Every phase is gated by acceptance criteria, security reviews, and verification milestones.
                </p>
              </div>

              {/* Bottom Steps Row (Indented for alternating zig-zag rhythm) */}
              <div className="flex h-full gap-x-[14vw] ml-[5vw] max-[600px]:gap-x-[32vw] max-[600px]:ml-[6vw]">
                {bottomData.map((item) => (
                  <div
                    key={`bottom-${item.id}`}
                    className="relative h-full w-[24vw] px-[1.5vw] max-[600px]:w-[68vw] max-[600px]:px-[4vw] flex flex-col justify-start"
                  >
                    {/* Vertical Stem Line & Dot connecting to central wire */}
                    <div className="w-full absolute left-0 top-[-2.5vw] max-[600px]:top-[-6vw] bottom-0 h-[calc(100%+2.5vw)] max-[600px]:h-[calc(100%+6vw)] pointer-events-none">
                      <div
                        className={`h-[94%] origin-top w-[2px] rounded-full shadow-[0_0_10px_#3b82f6] jl-${item.id} will-change-transform`}
                        style={{ ...activeStyle, transform: "scaleY(0)" }}
                      />
                      <div
                        className={`size-[1vw] max-[600px]:size-[2.6vw] -translate-x-1/2 relative aspect-square rounded-full shadow-[0_0_14px_#3b82f6] jd-${item.id} will-change-transform`}
                        style={{ ...activeStyle, transform: "scale(0)" }}
                      />
                    </div>

                    {/* Step Card Content */}
                    <div className="space-y-[0.8vw] max-[600px]:space-y-[2vw]">
                      <div className="flex items-center gap-[0.8vw]">
                        <span
                          className={`badge-${item.id} font-mono text-[0.9vw] max-[600px]:text-[3.2vw] font-extrabold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded transition-opacity duration-300`}
                        >
                          {item.stepNumber}
                        </span>
                        <span className="text-[0.7vw] max-[600px]:text-[2.5vw] font-mono tracking-widest text-slate-300 uppercase">
                          {item.category || `PHASE ${item.stepNumber}`}
                        </span>
                      </div>

                      <h4
                        className={`title-${item.id} text-[2.2vw] font-extrabold text-white leading-tight tracking-tight max-[600px]:text-[5.8vw] transition-colors duration-300 will-change-transform`}
                      >
                        {item.stepTitle}
                      </h4>

                      <p
                        className={`description-${item.id} text-[1.1vw] leading-relaxed text-slate-200 font-normal max-[600px]:text-[4vw] max-w-[26vw] max-[600px]:max-w-[70vw] transition-colors duration-300 will-change-transform`}
                      >
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
