"use client";

import {
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  try {
    gsap.registerPlugin(ScrollTrigger, SplitText);
  } catch {
    gsap.registerPlugin(ScrollTrigger);
  }
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* Inline stand-in for @gsap/react's useGSAP */
function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  }
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useIsomorphicLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
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

type SplitTextInstance = InstanceType<typeof SplitText>;

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
  /** Reveal animation duration, in seconds. */
  duration?: number;
  /** Fallback reveal duration when `duration` is omitted, in seconds. */
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
    getServerReducedMotionSnapshot,
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
  duration,
  scrollDuration = 1.2,
  topData = defaultTopJourneyData,
  bottomData = defaultBottomJourneyData,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const animationDuration = duration ?? scrollDuration;
  const normalizedDuration = Math.max(0.2, animationDuration);

  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };
  const mutedTextStyle: CSSProperties = {
    color: mutedTextColor,
  };

  const allJourneyItems: JourneyItem[] = [...topData, ...bottomData].sort((a, b) =>
    a.stepNumber.localeCompare(b.stepNumber)
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const isMobile = window.innerWidth < 600;
      const slidePercent = isMobile ? -68 : -72;
      const lineWidth = isMobile ? "85%" : "98%";
      const lineStart = "top top";
      const slideEnd = isMobile ? "85% 50%" : "95% bottom";
      const lineEnd = isMobile ? "85% 50%" : "95% bottom";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: slideEnd,
          scrub: 0.5,
        },
        defaults: {
          ease: "none",
        },
      });

      tl.fromTo(
        wholeSliderRef.current,
        { xPercent: 0 },
        { xPercent: slidePercent }
      );

      if (reducedMotion) {
        gsap.set(".journey-line", { width: lineWidth });
        return;
      }

      gsap.to(".journey-line", {
        width: lineWidth,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: lineStart,
          end: lineEnd,
          scrub: 0.5,
        },
      });
    },
    { dependencies: [reducedMotion], scope: sectionRef }
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const items = allJourneyItems;

      if (reducedMotion) {
        items.forEach((item) => {
          gsap.set(`.jl-${item.id}`, { scaleY: 1 });
          gsap.set(`.jd-${item.id}`, { scale: 1 });
          gsap.set(`.title-${item.id}`, { opacity: 1, clearProps: "transform" });
          gsap.set(`.description-${item.id}`, {
            opacity: 1,
            clearProps: "transform",
          });
        });
        return;
      }

      items.forEach((item) => {
        const isTop = topData.some((topItem) => topItem.id === item.id);
        gsap.set(`.jl-${item.id}`, {
          scaleY: 0,
          transformOrigin: isTop ? "bottom bottom" : "top top",
        });
        gsap.set(`.jd-${item.id}`, { scale: 0 });
        gsap.set(`.title-${item.id}`, { opacity: 0.75, y: 0 });
        gsap.set(`.description-${item.id}`, { opacity: 0.75, y: 0 });
      });

      const titleSplits: Partial<Record<string, SplitTextInstance>> = {};
      const descriptionSplits: Partial<Record<string, SplitTextInstance>> = {};
      let canUseSplitText = false;

      try {
        if (typeof SplitText !== "undefined" && SplitText) {
          items.forEach((item) => {
            titleSplits[item.id] = new SplitText(`.title-${item.id}`, {
              type: "words, lines",
              mask: "lines",
            });
            descriptionSplits[item.id] = new SplitText(
              `.description-${item.id}`,
              {
                type: "words, lines",
                mask: "lines",
              }
            );
          });
          canUseSplitText = true;
        }
      } catch {
        canUseSplitText = false;
      }

      const createItemTimeline = (
        item: JourneyItem,
        startPos: number,
        endPos: number,
        index: number
      ) => {
        const lineSelector = `.jl-${item.id}`;
        const dotSelector = `.jd-${item.id}`;
        const isTop = topData.some((topItem) => topItem.id === item.id);

        gsap.set(lineSelector, {
          transformOrigin: isTop ? "bottom bottom" : "top top",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: index === 0 ? "top top" : `${startPos}% 30%`,
            end: index === 0 ? "12% 50%" : `${endPos}% 50%`,
            scrub: 0.5,
          },
        });

        timeline
          .to(lineSelector, {
            scaleY: 1,
            duration: normalizedDuration * 0.4,
          })
          .to(
            dotSelector,
            {
              scale: 1,
              duration: normalizedDuration * 0.4,
            },
            "<"
          );

        if (canUseSplitText) {
          const titleLines = titleSplits[item.id]?.lines || [];
          const descriptionLines = descriptionSplits[item.id]?.lines || [];

          if (titleLines.length > 0) {
            timeline.fromTo(
              titleLines,
              { y: 60, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                delay: -0.8 * normalizedDuration,
                duration: normalizedDuration,
                stagger: 0.02,
                ease: "power2.out",
              }
            );
          }
          if (descriptionLines.length > 0) {
            timeline.fromTo(
              descriptionLines,
              { y: 40, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: normalizedDuration,
                stagger: 0.02,
                ease: "power2.out",
              },
              "<"
            );
          }
        } else {
          timeline.to(
            [`.title-${item.id}`, `.description-${item.id}`],
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              duration: normalizedDuration * 0.7,
              ease: "power2.out",
            },
            "-=0.2"
          );
        }

        return timeline;
      };

      const positions: ReadonlyArray<readonly [number, number]> =
        window.innerWidth < 600
          ? [
              [0, 15],
              [12, 24],
              [21, 33],
              [30, 42],
              [39, 51],
              [48, 60],
              [57, 69],
              [66, 78],
              [75, 87],
            ]
          : [
              [0, 15],
              [11, 25],
              [20, 34],
              [29, 43],
              [38, 52],
              [47, 61],
              [56, 70],
              [65, 79],
              [74, 88],
            ];

      items.forEach((item, index) => {
        if (index < positions.length) {
          const [startPos, endPos] = positions[index];
          createItemTimeline(item, startPos, endPos, index);
        }
      });

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        Object.values(titleSplits).forEach((split) => split?.revert?.());
        Object.values(descriptionSplits).forEach((split) => split?.revert?.());
        window.removeEventListener("resize", handleResize);
      };
    },
    { dependencies: [normalizedDuration, reducedMotion], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="our-process"
      className="h-[280vw] max-[600px]:h-[480vh] w-full relative selection:bg-blue-500 selection:text-white"
      style={sectionStyle}
    >
      {/* Pinned Viewport Container */}
      <div className="h-screen w-full sticky top-0 pt-[6%] overflow-hidden max-[600px]:pt-[8%] flex items-center">
        {/* Horizontal Moving Slider Track */}
        <div
          ref={wholeSliderRef}
          className="mr-[2vw] flex h-[36vw] w-[320vw] items-center gap-[4vw] px-[4vw] max-[600px]:h-[82vh] max-[600px]:w-[940vw] max-[600px]:px-[6vw]"
        >
          {/* Left Anchor Hero Card with 3D Isometric Blue Glass Blocks */}
          <div className="relative h-full w-[28vw] shrink-0 overflow-hidden rounded-[1.2vw] border border-blue-500/20 bg-slate-900/60 shadow-2xl max-[600px]:h-[65vw] max-[600px]:w-[80vw] max-[600px]:rounded-[4vw] flex flex-col justify-end p-[1.8vw] pb-[2.2vw] max-[600px]:p-[4vw] max-[600px]:pb-[5vw] group">
            <img
              src={imageUrl}
              alt={imageAlt}
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80';
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
              <div
                className="h-[.9vw] max-[600px]:h-[2.4vw] max-[600px]:w-[2.4vw] w-[.9vw] rounded-full shadow-[0_0_16px_#3b82f6] shrink-0"
                style={activeStyle}
              />
              <div
                className="h-[2px] w-[0%] rounded-full journey-line shadow-[0_0_12px_#3b82f6]"
                style={activeStyle}
              />
              <div
                className="h-[.9vw] max-[600px]:h-[2.4vw] max-[600px]:w-[2.4vw] w-[.9vw] rounded-full shadow-[0_0_16px_#3b82f6] shrink-0"
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
                        className={`size-[1vw] max-[600px]:size-[2.6vw] -translate-x-1/2 relative aspect-square rounded-full shadow-[0_0_12px_#3b82f6] jd-${item.id}`}
                        style={{ ...activeStyle, transform: "scale(0)" }}
                      />
                      <div
                        className={`h-[94%] w-[2px] origin-bottom rounded-full shadow-[0_0_8px_#3b82f6] jl-${item.id}`}
                        style={{ ...activeStyle, transform: "scaleY(0)" }}
                      />
                    </div>

                    {/* Step Card Content */}
                    <div className="space-y-[0.8vw] max-[600px]:space-y-[2vw]">
                      <div className="flex items-center gap-[0.8vw]">
                        <span className="font-mono text-[0.9vw] max-[600px]:text-[3.2vw] font-extrabold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded">
                          {item.stepNumber}
                        </span>
                        <span className="text-[0.7vw] max-[600px]:text-[2.5vw] font-mono tracking-widest text-slate-400 uppercase">
                          {item.category || `PHASE ${item.stepNumber}`}
                        </span>
                      </div>

                      <h4
                        className={`title-${item.id} text-[2.2vw] font-extrabold text-white leading-tight tracking-tight max-[600px]:text-[5.8vw]`}
                      >
                        {item.stepTitle}
                      </h4>

                      <p
                        className={`description-${item.id} text-[1.1vw] leading-relaxed text-slate-200 font-normal max-[600px]:text-[4vw] max-w-[26vw] max-[600px]:max-w-[70vw]`}
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
                <p
                  className="text-[1.2vw] font-mono tracking-wider font-semibold uppercase leading-none max-[600px]:text-[3.6vw] text-blue-400"
                >
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
                        className={`h-[94%] origin-top w-[2px] rounded-full shadow-[0_0_8px_#3b82f6] jl-${item.id}`}
                        style={{ ...activeStyle, transform: "scaleY(0)" }}
                      />
                      <div
                        className={`size-[1vw] max-[600px]:size-[2.6vw] -translate-x-1/2 relative aspect-square rounded-full shadow-[0_0_12px_#3b82f6] jd-${item.id}`}
                        style={{ ...activeStyle, transform: "scale(0)" }}
                      />
                    </div>

                    {/* Step Card Content */}
                    <div className="space-y-[0.8vw] max-[600px]:space-y-[2vw]">
                      <div className="flex items-center gap-[0.8vw]">
                        <span className="font-mono text-[0.9vw] max-[600px]:text-[3.2vw] font-extrabold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 rounded">
                          {item.stepNumber}
                        </span>
                        <span className="text-[0.7vw] max-[600px]:text-[2.5vw] font-mono tracking-widest text-slate-300 uppercase">
                          {item.category || `PHASE ${item.stepNumber}`}
                        </span>
                      </div>

                      <h4
                        className={`title-${item.id} text-[2.2vw] font-extrabold text-white leading-tight tracking-tight max-[600px]:text-[5.8vw]`}
                      >
                        {item.stepTitle}
                      </h4>

                      <p
                        className={`description-${item.id} text-[1.1vw] leading-relaxed text-slate-200 font-normal max-[600px]:text-[4vw] max-w-[26vw] max-[600px]:max-w-[70vw]`}
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
