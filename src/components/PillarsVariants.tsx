import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Panel } from "./Panel";
import type { ServiceMeta } from "../config/services";

type Pillar = ServiceMeta["pillars"][number];

/** Numbered cards (default — used by no service now, kept as fallback) */
export function PillarsNumbered({ pillars, accent }: { pillars: Pillar[]; accent: string }) {
  return (
    <div className="space-y-5">
      {pillars.map((p, i) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: i * 0.05 }}
        >
          <Panel padding="compact" motion={false}>
            <div className="flex items-start gap-4 md:gap-6">
              <div
                className={`flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accent} font-display text-sm font-bold text-bg-0 shadow-md md:size-12 md:text-base`}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-cream-50 md:text-lg">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-cream-200">{p.body}</p>
              </div>
            </div>
          </Panel>
        </motion.div>
      ))}
    </div>
  );
}

/** 2x2 grid — for Organic Social. No numbers, just concept cards */
export function PillarsGrid({ pillars, accent }: { pillars: Pillar[]; accent: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-5">
      {pillars.map((p, i) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: i * 0.05 }}
        >
          <Panel padding="compact" motion={false} className="h-full">
            <div
              className={`mb-3 inline-flex h-1 w-10 rounded-full bg-gradient-to-r ${accent}`}
            />
            <h3 className="font-display text-base font-bold text-cream-50 md:text-lg">
              {p.title}
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-cream-200">{p.body}</p>
          </Panel>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Stack layout — for Google Ads. Each pillar is a horizontal row with a category
 * label on the left and the body on the right, separated by a soft rule.
 */
export function PillarsStack({ pillars }: { pillars: Pillar[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-bg-1">
      {pillars.map((p, i) => (
        <motion.div
          key={p.title}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className={`relative grid items-start gap-4 p-5 md:grid-cols-[200px_1fr] md:gap-8 md:p-7 ${
            i > 0 ? "border-t border-line-soft" : ""
          }`}
        >
          {/* left rail: number + title */}
          <div className="flex items-start gap-3 md:flex-col md:gap-2">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-gold-400/80">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-display text-base font-bold text-cream-50 md:text-[17px]">
              {p.title}
            </h3>
          </div>
          {/* body */}
          <p className="text-[14px] leading-relaxed text-cream-200 md:text-[15px]">{p.body}</p>
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Flow layout — for Social Ads. Renders pillars as 4 stages connected by arrows.
 * Visualizes the funnel: Awareness → Engagement → Retargeting → Conversion.
 */
export function PillarsFlow({ pillars, accent }: { pillars: Pillar[]; accent: string }) {
  return (
    <div className="space-y-4">
      {/* horizontal stage strip */}
      <div className="hidden items-stretch gap-2 lg:flex">
        {pillars.map((p, i) => (
          <div key={p.title} className="flex flex-1 items-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-1 flex-col items-center gap-2 rounded-xl border border-line bg-bg-2 px-3 py-4 text-center"
            >
              <div
                className={`flex size-8 items-center justify-center rounded-full bg-gradient-to-br ${accent} font-display text-[11px] font-bold text-bg-0`}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-display text-[12px] font-bold leading-tight text-cream-50">
                {p.title}
              </div>
            </motion.div>
            {i < pillars.length - 1 && (
              <ArrowRight className="size-4 flex-shrink-0 text-gold-500/60" strokeWidth={2.4} />
            )}
          </div>
        ))}
      </div>

      {/* detail cards — alternating left/right indent for rhythm */}
      <div className="space-y-3">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={`flex items-start gap-4 rounded-xl border border-line bg-bg-1 p-5 md:p-6 ${
              i % 2 === 1 ? "md:ml-12" : ""
            }`}
          >
            <div
              className={`flex size-9 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${accent} font-display text-[12px] font-bold text-bg-0 shadow-md`}
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <h3 className="font-display text-[15px] font-bold text-cream-50 md:text-base">
                {p.title}
              </h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-cream-200">{p.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
