"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "motion/react";

interface CardProps {
  number: string;
  title: string;
  description: string;
  colorTheme?: "blue" | "navy" | "sky";
  className?: string;
  rotate?: string;
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

const Pin = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

const Card = ({
  number,
  title,
  description,
  colorTheme = "blue",
  className,
  rotate,
  colors: customColors,
}: CardProps) => {
  const defaultBgColors = {
    blue: "bg-blue-50/80",
    navy: "bg-slate-100/70",
    sky: "bg-sky-50/80",
  };
  const defaultTextColors = {
    blue: "text-[#3B82F6]",
    navy: "text-[#1E293B]",
    sky: "text-[#2563EB]",
  };
  const defaultBorderColors = {
    blue: "border-blue-100",
    navy: "border-slate-200/60",
    sky: "border-sky-100",
  };

  const bgColor = customColors?.bg || defaultBgColors[colorTheme];
  const textColor = customColors?.text || defaultTextColors[colorTheme];
  const borderColor = customColors?.border || defaultBorderColors[colorTheme];

  return (
    <div
      className={`relative w-full md:w-[280px] transition-transform duration-300 hover:z-30 hover:scale-105 ${rotate} ${className}`}
    >
      <div className="bg-white p-2 rounded-[25px] shadow-[0px_10px_20px_0px_#D3D3D3] border border-neutral-100">
        <Pin className={`w-8 h-8 ${textColor} z-20 mb-6 mx-auto`} />
        <div
          className={`${bgColor} border ${borderColor} rounded-[15px] p-[18px] h-full flex flex-col relative overflow-hidden`}
        >
          <span
            className={`${textColor} text-4xl font-semibold mb-4 tracking-tight`}
          >
            {number}
          </span>
          <h3 className="text-2xl font-semibold text-neutral-800 leading-none mb-[10px]">
            {title}
          </h3>
          <p className="text-neutral-500 text-sm/5 tracking-tight">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export interface Step {
  title: string;
  description: string;
  colorTheme?: "blue" | "navy" | "sky";
  colors?: {
    bg: string;
    text: string;
    border: string;
  };
}

export interface StepPosition {
  className?: string;
  rotate?: string;
}

export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}

const DEFAULT_CARD_POSITIONS_6: StepPosition[] = [
  { className: "md:absolute md:top-0 md:left-[12%] lg:left-[15%]", rotate: "rotate-8" },
  { className: "md:absolute md:top-[160px] md:right-[12%] lg:right-[15%]", rotate: "-rotate-8" },
  { className: "md:absolute md:top-[420px] md:left-[12%] lg:left-[15%]", rotate: "rotate-8" },
  { className: "md:absolute md:top-[580px] md:right-[12%] lg:right-[15%]", rotate: "-rotate-8" },
  { className: "md:absolute md:top-[840px] md:left-[12%] lg:left-[15%]", rotate: "rotate-8" },
  { className: "md:absolute md:top-[1000px] md:right-[12%] lg:right-[15%]", rotate: "-rotate-8" },
];

export const defaultDeploymentSteps: Step[] = [
  {
    title: "Discover",
    description: "Map operational bottlenecks, evaluate workflows, and model economic feasibility.",
    colorTheme: "blue",
  },
  {
    title: "Data Audit",
    description: "Audit corporate datasets, verify privacy boundaries, and isolate sensitive data.",
    colorTheme: "navy",
  },
  {
    title: "Model & Architect",
    description: "Design retrieval pipelines, test embeddings, and build agentic workflows.",
    colorTheme: "sky",
  },
  {
    title: "Security Lock",
    description: "Run adversarial testing, establish guardrails, and enforce strict compliance.",
    colorTheme: "blue",
  },
  {
    title: "Deployment",
    description: "Zero-downtime integration with your existing ERP, CRM, and cloud systems.",
    colorTheme: "navy",
  },
  {
    title: "Continuous Learning",
    description: "Monitor telemetry, track real-world accuracy, and continuously tune performance.",
    colorTheme: "sky",
  },
];

export default function HowItWorks({
  features,
  className,
  stepPositions,
}: HowItWorksProps) {
  const data = features && features.length > 0 ? features : defaultDeploymentSteps;
  const positions = stepPositions || DEFAULT_CARD_POSITIONS_6;

  // Desktop canvas height calculated for 6 steps
  const height = data.length >= 6 ? 1380 : data.length * 240 + 100;

  return (
    <LazyMotion features={domAnimation}>
      <div className={`relative px-4 sm:px-8 py-16 sm:py-24 bg-white ${className}`}>
        {/* Subtle Horizontal Line Rules */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: "linear-gradient(#000 1px, transparent 1px)",
            backgroundSize: "100% 32px",
            marginTop: "4px",
          }}
        />

        {/* Ambient edge fades */}
        <div className="from-white pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r" />
        <div className="from-white pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div
            className="relative w-full max-w-[1000px] mx-auto flex flex-col space-y-8 md:space-y-0 md:block h-auto md:h-[var(--md-height)]"
            style={{ "--md-height": `${height}px` } as React.CSSProperties}
          >
            {/* Animated Dashed Bézier Conduit */}
            {data.length > 1 && (
              <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-0"
                viewBox={`0 0 1000 ${height}`}
                preserveAspectRatio="none"
              >
                {(() => {
                  let pathD = "M 280 140 C 480 140, 540 300, 720 300"; // 1 -> 2
                  if (data.length >= 3) {
                    pathD += " C 850 300, 480 430, 280 560"; // 2 -> 3
                  }
                  if (data.length >= 4) {
                    pathD += " C 280 700, 540 720, 720 720"; // 3 -> 4
                  }
                  if (data.length >= 5) {
                    pathD += " C 850 720, 480 850, 280 980"; // 4 -> 5
                  }
                  if (data.length >= 6) {
                    pathD += " C 280 1120, 540 1140, 720 1140"; // 5 -> 6
                  }

                  return (
                    <m.path
                      d={pathD}
                      stroke="currentColor"
                      className="text-neutral-300"
                      strokeWidth="2"
                      strokeDasharray="8 6"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{
                        strokeDashoffset: -140, // Seamless loop multiple of 14 (8+6)
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  );
                })()}
              </svg>
            )}

            {/* Pinned Step Cards */}
            {data.map((step, index) => {
              const position = positions[index % positions.length];

              return (
                <Card
                  key={step.title}
                  number={`0${index + 1}`}
                  title={step.title}
                  description={step.description}
                  colorTheme={step.colorTheme || "blue"}
                  colors={step.colors}
                  rotate={position.rotate}
                  className={position.className}
                />
              );
            })}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}

export { HowItWorks };
