import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";

/**
 * Interactive landing-page drop-off graphic.
 *
 * Two stages: ad clicks → conversions. Toggle between a "bad landing page"
 * default (5% conversion bar, coral) and a "good landing page" (65% conversion
 * bar, teal). The width transition uses a satisfying spring; the bar color
 * animates via Tailwind's transition-colors. Header stats, labels, sublabels,
 * and the bottom callout fade in/out via AnimatePresence on scenario change.
 *
 * Pure-div bars (no SVG), Tailwind-only.
 */
export function LandingPageDropoffGraphic() {
  const [scenario, setScenario] = useState<Scenario>("bad");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const s = SCENARIOS[scenario];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.55 }}
      className="mt-6 rounded-2xl border border-line bg-bg-1 p-6 md:p-8 lg:p-10"
    >
      {/* Nudge — small gold call-to-action above the toggle */}
      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-400">
        See the difference a landing page makes
        <ArrowRight className="size-3" strokeWidth={2.6} />
      </div>

      {/* Scenario toggle */}
      <div
        className="mt-3 flex flex-wrap gap-2"
        role="group"
        aria-label="Landing page scenario"
      >
        <ToggleButton
          active={scenario === "bad"}
          onClick={() => setScenario("bad")}
        >
          Bad landing page
        </ToggleButton>
        <ToggleButton
          active={scenario === "good"}
          onClick={() => setScenario("good")}
        >
          Good landing page
        </ToggleButton>
      </div>

      {/* Dashboard-style header strip */}
      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-6">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-cream-300">
          <span className="size-2 rounded-full bg-teal" />
          Real campaign example
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={scenario}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10.5px] text-cream-300"
          >
            <span>
              CTR (click rate){" "}
              <span className="font-bold text-teal">6.6%</span>
            </span>
            <span>
              Conversion rate{" "}
              <span
                className={`font-bold ${
                  s.headerConv.color === "teal" ? "text-teal" : "text-coral"
                }`}
              >
                {s.headerConv.value}
              </span>
            </span>
            <span>
              Return{" "}
              <span
                className={`font-bold ${
                  s.headerRoas.color === "teal" ? "text-teal" : "text-coral"
                }`}
              >
                {s.headerRoas.value}
              </span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Funnel — two stages */}
      <div className="mt-8">
        <FunnelBar
          pct={100}
          color="teal"
          inView={inView}
          leftLabel="People who clicked your ad"
          rightLabel="167 people"
          sublabel="Your ad was compelling. 6.6% of people who saw it clicked."
        />
        <ArrowConnector label="visited your landing page" />
        <FunnelBar
          pct={s.stage2Pct}
          color={s.stage2Color}
          inView={inView}
          leftLabel="People who made a reservation"
          rightLabel={s.stage2RightLabel}
          sublabel={s.stage2Sublabel}
        />
      </div>

      {/* Bottom callout */}
      <div className="mt-8 border-t border-line-soft pt-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={scenario}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="space-y-2"
          >
            <div className="flex items-baseline gap-2.5">
              <span
                className={`size-1.5 flex-shrink-0 translate-y-1.5 rounded-full ${
                  s.bottomLineColor === "teal" ? "bg-teal" : "bg-coral"
                }`}
              />
              <p
                className={`font-display text-[15px] font-bold leading-snug md:text-base ${
                  s.bottomLineColor === "teal" ? "text-teal" : "text-coral"
                }`}
              >
                {s.bottomLine}
              </p>
            </div>
            {s.bottomSubline && (
              <p className="ml-4 text-[13px] leading-relaxed text-cream-300">
                {s.bottomSubline}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ---------- scenario data ----------

type Scenario = "bad" | "good";
type BarColor = "teal" | "coral";
type AccentColor = "teal" | "coral";

const SCENARIOS: Record<
  Scenario,
  {
    stage2Pct: number;
    stage2Color: BarColor;
    stage2RightLabel: string;
    stage2Sublabel: string;
    headerConv: { value: string; color: AccentColor };
    headerRoas: { value: string; color: AccentColor };
    bottomLine: string;
    bottomLineColor: AccentColor;
    bottomSubline?: string;
  }
> = {
  bad: {
    stage2Pct: 5,
    stage2Color: "coral",
    stage2RightLabel: "0 bookings",
    stage2Sublabel:
      "The landing page was confusing. No clear button. No easy way to book. They left.",
    headerConv: { value: "0.0%", color: "coral" },
    headerRoas: { value: "0.00x", color: "coral" },
    bottomLine: "The ad worked. The landing page lost everyone.",
    bottomLineColor: "coral",
  },
  good: {
    stage2Pct: 65,
    stage2Color: "teal",
    stage2RightLabel: "12 bookings",
    stage2Sublabel:
      "Clear headline. One button. Mobile-friendly. Visitors knew exactly what to do.",
    headerConv: { value: "7.2%", color: "teal" },
    headerRoas: { value: "8.4x", color: "teal" },
    bottomLine: "Same ad. Same budget. 12 bookings instead of 0.",
    bottomLineColor: "teal",
    bottomSubline:
      "This is why we audit your landing page before we run a single ad.",
  },
};

// ---------- subcomponents ----------

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
        active
          ? "bg-gold-500 text-bg-0 shadow-lg ring-1 ring-gold-400/40"
          : "border border-line bg-transparent text-cream-300 hover:border-cream-300/50 hover:text-cream-100"
      }`}
    >
      {children}
    </button>
  );
}

const BAR_FILL: Record<BarColor, string> = {
  teal: "bg-teal",
  coral: "bg-coral",
};

const BAR_GLOW: Record<BarColor, string> = {
  teal: "shadow-[0_0_24px_-6px_rgba(69,176,140,0.55)]",
  coral: "shadow-[0_0_24px_-6px_rgba(208,106,80,0.55)]",
};

const VALUE_TEXT: Record<BarColor, string> = {
  teal: "text-teal",
  coral: "text-coral",
};

function FunnelBar({
  pct,
  color,
  inView,
  leftLabel,
  rightLabel,
  sublabel,
}: {
  pct: number;
  color: BarColor;
  inView: boolean;
  leftLabel: string;
  rightLabel: string;
  sublabel: string;
}) {
  return (
    <div>
      {/* labels above bar */}
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-cream-200 md:text-[11px]">
          {leftLabel}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={rightLabel}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.22 }}
            className={`font-display text-base font-bold tabular-nums transition-colors duration-300 md:text-lg ${VALUE_TEXT[color]}`}
          >
            {rightLabel}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* track + animated fill */}
      <div className="relative h-9 w-full overflow-hidden rounded-md bg-bg-2 ring-1 ring-inset ring-line-soft md:h-10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 18 }}
          className={`relative h-full rounded-md transition-colors duration-300 ${BAR_FILL[color]} ${BAR_GLOW[color]}`}
          style={{ minWidth: pct > 0 ? "10px" : 0 }}
        >
          {/* gloss highlight along the top edge */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-md bg-gradient-to-b from-cream-50/15 to-transparent" />
        </motion.div>
      </div>

      {/* sublabel below */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={sublabel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="mt-2 text-[11.5px] leading-snug text-cream-300 md:text-xs"
        >
          {sublabel}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ArrowConnector({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 py-3 pl-1">
      <ArrowDown className="size-3.5 text-cream-300/70" strokeWidth={2.4} />
      <span className="text-[11px] italic text-cream-300/70">{label}</span>
    </div>
  );
}
