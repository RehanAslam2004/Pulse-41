"use client";

import Timeline from "@/components/ui/timeline";

const settings = {
  textColor: "#ffffff",
  mutedTextColor: "#a1a1aa",
  activeColor: "#2563eb",
  backgroundColor: "#0A0F1D",
  duration: 1.4,
};

export default function TimelineDemo(props: Partial<typeof settings>) {
  const s = { ...settings, ...props };
  return (
    <main className="bg-background text-foreground">
      {/* Lead-in section so the pinned timeline has somewhere to scroll in from. */}
      <section className="flex h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400">
          Delivery Methodology
        </p>
        <h1 className="max-w-[18ch] text-4xl font-semibold leading-tight tracking-tight sm:text-6xl text-white">
          Nine steps, one horizontal scroll.
        </h1>
        <p className="max-w-md text-sm leading-relaxed text-slate-400">
          Keep scrolling — the section pins, the track slides sideways, and each
          milestone draws its stem and reveals its copy as it reaches centre.
        </p>
        <span className="mt-2 animate-bounce text-blue-400">&darr;</span>
      </section>

      {/* Realistic usage: custom copy, a branded accent, tuned reveal speed. */}
      <Timeline
        title="FROM DISCOVERY TO IMPACT"
        periodLabel="01 — 09 / DELIVERY LIFECYCLE"
        backgroundColor={s.backgroundColor}
        textColor={s.textColor}
        mutedTextColor={s.mutedTextColor}
        activeColor={s.activeColor}
        imageUrl="/images/process/isometric-cubes.jpg"
        imageAlt="Pulse41 Disciplined Engineering Architecture"
        duration={s.duration}
      />

      <section className="flex h-screen items-center justify-center px-6 text-center text-sm text-slate-400">
        From discovery to verified production impact.
      </section>
    </main>
  );
}

export { FeatureBento } from "@/components/ui/feature-bento";

