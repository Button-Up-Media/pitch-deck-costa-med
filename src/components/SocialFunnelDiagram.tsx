import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  HeartHandshake,
  Users,
  Eye,
  Award,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { Panel } from "./Panel";
import { SectionHeading } from "./SectionHeading";

const TOP_TAGS = ["Entertaining", "Educational", "Relatable", "No selling"];
const BOTTOM_TAGS = ["Promotions", "Reservations", "Events", "Direct CTA"];

const STATS: { icon: LucideIcon; label: string; sub: string }[] = [
  { icon: Users, label: "Followers", sub: "Organic community" },
  { icon: Eye, label: "Reach", sub: "Views at scale" },
  { icon: Award, label: "Authority", sub: "Trusted in the niche" },
  { icon: Heart, label: "Likability", sub: "Brand people enjoy" },
];

/**
 * Two-stage funnel diagram explaining BUM's content philosophy.
 * Top of funnel (~95%) earns trust. Trust bridge gates the transition.
 * Bottom of funnel (~5%) converts the warm audience.
 *
 * Each stage is independently click-to-expand. Top opens by default; bottom
 * collapsed. The taper is achieved purely through centered widths narrowing
 * down each tier — no clip-path, no SVG trapezoids.
 */
export function SocialFunnelDiagram() {
  const [topOpen, setTopOpen] = useState(true);
  const [bottomOpen, setBottomOpen] = useState(false);

  return (
    <Panel motion={false}>
      <SectionHeading
        eyebrow="The Approach"
        title={<>Earn trust first, then convert.</>}
      />

      <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-12">
        {/* Funnel column — narrows in three centered tiers */}
        <div className="min-w-0 flex-1">
          <div className="space-y-3">
            <FunnelStage
              widthClass="w-full max-w-[500px]"
              accent="gold"
              eyebrow="Top of funnel"
              label="Cast the net wide"
              percentage="~95%"
              tags={TOP_TAGS}
              isOpen={topOpen}
              onToggle={() => setTopOpen((v) => !v)}
            >
              <p className="text-[14px] leading-relaxed text-cream-200">
                Think of this like casting a wide fishing net. Your content is
                the net—funny, educational, or visually stunning posts that
                anyone can enjoy. A sushi restaurant showing knife technique. A
                bar capturing Friday night energy. Content that earns attention
                before ever asking for anything in return.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <PathCard
                  letter="A"
                  title="Likability"
                  body="Funny, relatable content makes the brand likable. People follow accounts they enjoy."
                />
                <PathCard
                  letter="B"
                  title="Authority"
                  body="Educational niche content makes the brand credible. People trust accounts that teach them something."
                />
              </div>
            </FunnelStage>

            <TrustBridge />

            <FunnelStage
              widthClass="w-[68%] max-w-[320px]"
              accent="teal"
              eyebrow="Bottom of funnel"
              label="Convert the warm audience"
              percentage="~5%"
              tags={BOTTOM_TAGS}
              isOpen={bottomOpen}
              onToggle={() => setBottomOpen((v) => !v)}
            >
              <p className="text-[14px] leading-relaxed text-cream-200">
                Once trust is built, a small slice of content can sell—and it
                works because the audience is warm. A reservation link, a
                weekend special, a private dining promo. Selling to a cold
                audience burns budget. Selling to people who already like you
                converts.
              </p>
              <div className="mt-4 rounded-xl border border-line-soft bg-bg-1 p-4">
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-400">
                  Why this ratio matters
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed text-cream-200">
                  Flip it and the audience disappears. Too much selling on
                  social and people unfollow. The ~95/5 split keeps the
                  community alive while still driving real revenue.
                </p>
              </div>
            </FunnelStage>
          </div>
        </div>

        {/* Right stat column — desktop only */}
        <div className="hidden lg:block lg:w-[220px] lg:flex-shrink-0">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-cream-300">
            What top-of-funnel builds
          </div>
          <div className="mt-3 space-y-2">
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function FunnelStage({
  widthClass,
  accent,
  eyebrow,
  label,
  percentage,
  tags,
  isOpen,
  onToggle,
  children,
}: {
  widthClass: string;
  accent: "gold" | "teal";
  eyebrow: string;
  label: string;
  percentage: string;
  tags: string[];
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const isGold = accent === "gold";
  const accentText = isGold ? "text-gold-400" : "text-teal";
  const accentBg = isGold ? "bg-gold-500/10" : "bg-teal/10";
  const accentBorder = isGold ? "border-gold-500/30" : "border-teal/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`mx-auto ${widthClass}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className={`block w-full rounded-2xl border ${accentBorder} bg-bg-1 p-5 text-left transition hover:opacity-95 md:p-6`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div
              className={`text-[10px] font-bold uppercase tracking-[0.22em] ${accentText}`}
            >
              {eyebrow}
            </div>
            <h3 className="mt-1.5 font-display text-lg font-bold leading-tight text-cream-50 md:text-xl">
              {label}
            </h3>
          </div>
          <div
            className={`flex flex-shrink-0 flex-col items-center gap-0 rounded-xl ${accentBg} px-3 py-1.5 ring-1 ring-inset ${accentBorder}`}
          >
            <span className={`font-mono text-sm font-bold ${accentText}`}>
              {percentage}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-cream-300">
              of content
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line-soft bg-bg-2 px-2.5 py-0.5 text-[11px] font-medium text-cream-200"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-1.5 text-[11px] text-cream-300">
          <ChevronDown
            className={`size-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            strokeWidth={2.4}
          />
          <span>{isOpen ? "Hide details" : "Show details"}</span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-2xl border border-line-soft bg-bg-2/60 p-5 md:p-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function PathCard({
  letter,
  title,
  body,
}: {
  letter: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-line-soft bg-bg-1 p-4">
      <div className="flex items-center gap-2">
        <span className="flex size-6 items-center justify-center rounded-md bg-gold-500/15 font-mono text-[11px] font-bold text-gold-400">
          {letter}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-cream-300">
          Path {letter}
        </span>
      </div>
      <div className="mt-2 font-display text-[14px] font-bold text-cream-50">
        {title}
      </div>
      <p className="mt-1 text-[13px] leading-relaxed text-cream-200">{body}</p>
    </div>
  );
}

/** The trust bridge — slim gold callout that sits between the two stages */
function TrustBridge() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0.95 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-[80%] max-w-[400px]"
    >
      <div className="relative overflow-hidden rounded-xl border border-gold-500/40 bg-gradient-to-r from-gold-500/10 via-gold-500/20 to-gold-500/10 px-4 py-3">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(226,168,77,0.18), transparent 70%)",
          }}
        />
        <div className="relative flex items-start gap-3">
          <div className="flex size-7 flex-shrink-0 items-center justify-center rounded-full bg-gold-500/20 ring-1 ring-gold-400/40">
            <HeartHandshake
              className="size-3.5 text-gold-300"
              strokeWidth={2.4}
            />
          </div>
          <p className="text-[12.5px] leading-snug text-cream-100 md:text-[13px]">
            <span className="font-display font-bold text-gold-300">
              Trust is earned here.
            </span>{" "}
            Only once the audience knows and likes you does bottom-funnel
            content actually convert.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({
  icon: Icon,
  label,
  sub,
}: {
  icon: LucideIcon;
  label: string;
  sub: string;
}) {
  return (
    <div className="rounded-xl border border-line-soft bg-bg-2 p-3 transition hover:border-gold-500/30">
      <div className="flex items-center gap-2.5">
        <div className="flex size-7 flex-shrink-0 items-center justify-center rounded-md bg-gold-500/12">
          <Icon className="size-3.5 text-gold-400" strokeWidth={2.4} />
        </div>
        <div className="min-w-0">
          <div className="font-display text-[13px] font-bold text-cream-50">
            {label}
          </div>
          <div className="text-[11px] leading-tight text-cream-300">{sub}</div>
        </div>
      </div>
    </div>
  );
}
