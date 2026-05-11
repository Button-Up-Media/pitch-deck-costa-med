import { motion } from "framer-motion";
import {
  Check,
  Sparkles,
  Megaphone,
  Search,
  Globe,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { Panel, HrSoft } from "../components/Panel";
import { config } from "../config/client";
import { SERVICE_ORDER } from "../config/services";

function blank(value: number | null, prefix = "$") {
  if (value === null || value === 0) {
    return (
      <span className="inline-block rounded-md border border-dashed border-cream-300/40 bg-bg-2 px-3 py-1 text-base font-normal text-cream-300">
        ____
      </span>
    );
  }
  return (
    <span>
      {prefix}
      {value.toLocaleString()}
    </span>
  );
}

const REASONS = [
  {
    title: "It's the cheapest option that solves everything",
    body: "Bundling your organic posts, your ads, and the website into one program costs less than running each as a separate project with three different vendors.",
  },
  {
    title: "All three pieces reinforce each other",
    body: "The boost you saw on the Ecosystem slide only happens when one team owns all three. Otherwise each piece runs alone — and the work doesn't add up.",
  },
  {
    title: "One point of contact for everything",
    body: "Stop translating between vendors. One strategist, one Slack channel, one weekly call covering the entire program.",
  },
  {
    title: "One set of numbers everyone agrees on",
    body: "Tracking, results, and reports all live in one place. No more debating which agency's dashboard is right.",
  },
];

const PILLARS: { icon: LucideIcon; label: string; sub: string; accent: string }[] = [
  {
    icon: Megaphone,
    label: "Organic Social",
    sub: "Community and content engine",
    accent: "from-coral to-gold-500",
  },
  {
    icon: Search,
    label: "Google Ads",
    sub: "Capture guests actively searching where to eat right now",
    accent: "from-gold-400 to-gold-600",
  },
  {
    icon: Globe,
    label: "Website",
    sub: "Where bookings happen + SEO (Google ranking) + ongoing management",
    accent: "from-gold-500 to-coral",
  },
];

export function LetsGoPage() {
  const enabled = SERVICE_ORDER.filter((k) => config.services[k].enabled);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 pb-32 md:px-8 md:py-20 md:pb-28 lg:px-16 2xl:px-20">
      <SectionHeading
        eyebrow="Let's Go"
        title={
          <>
            <span className="block">Everything together.</span>
            <span className="block shimmer-text">One program. One price.</span>
          </>
        }
        subtitle={`The all-in-one program for ${config.client.name}: every piece in this deck wrapped into one program — one team, one plan, one invoice.`}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="mt-12 md:mt-16"
      >
        <Panel motion={false}>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-gold-soft px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-gold-400">
                <Sparkles className="size-3" />
                Recommended for {config.client.shortName}
              </div>

              <h3 className="mt-5 font-display text-3xl font-bold leading-[1.08] tracking-[-0.03em] text-cream-50 md:text-4xl lg:text-5xl">
                The All-In-One Program
              </h3>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-cream-200 md:text-base">
                The fastest way to fix every gap from the Opportunities slide,
                the cleanest way to operate, and almost always the cheapest.
                One contract, one invoice, one strategist who owns the whole
                picture.
              </p>

              <div className="mt-8 space-y-3">
                {PILLARS.map((p) => (
                  <div
                    key={p.label}
                    className="flex items-center gap-4 rounded-xl border border-line bg-bg-2 p-4"
                  >
                    <div
                      className={`flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${p.accent} shadow-md`}
                    >
                      <p.icon className="size-5 text-bg-0" strokeWidth={2.4} />
                    </div>
                    <div>
                      <div className="font-display text-sm font-bold text-cream-50">
                        {p.label}
                      </div>
                      <div className="text-xs text-cream-300">{p.sub}</div>
                    </div>
                  </div>
                ))}
                {/* Social Ads add-on note */}
                <div className="flex items-center gap-4 rounded-xl border border-dashed border-line/60 bg-bg-1 p-4 opacity-70">
                  <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl border border-dashed border-cream-300/20 bg-bg-2">
                    <span className="text-xs text-cream-300/60">+</span>
                  </div>
                  <div>
                    <div className="font-display text-sm font-bold text-cream-300">
                      Social Ads
                    </div>
                    <div className="text-xs text-cream-300/60">
                      Meta + TikTok — available as a separate add-on
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gold-500/20 bg-gradient-to-br from-bg-3 to-bg-2 p-6 md:p-8">
              <div className="eyebrow">The Investment</div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="stat-num text-5xl md:text-6xl">
                  {blank(config.bundle.monthlyPrice)}
                </span>
                <span className="text-sm text-cream-300">/ month</span>
              </div>
              <p className="mt-1 text-xs text-cream-300">
                Everything in the program, fully managed. Your ad budget is
                separate and goes straight to Google or Meta.
              </p>

              <div className="mt-6 space-y-1">
                <PriceRow
                  label="One-time setup"
                  value={blank(config.bundle.setupFee)}
                />
                <PriceRow
                  label="Initial term"
                  value={
                    config.bundle.contractMonths
                      ? `${config.bundle.contractMonths} months`
                      : blank(null, "")
                  }
                />
                <PriceRow
                  label="Brands covered"
                  value={`${config.brands.length}`}
                />
                <PriceRow label="Pieces in the program" value={`${enabled.length}`} />
              </div>

              <CallTextCtas />
            </div>
          </div>
        </Panel>
      </motion.div>

      <SavingsComparison />

      <div className="mt-16 md:mt-20">
        <SectionHeading
          eyebrow="Why this option"
          title={<>Four reasons most clients land here.</>}
          subtitle="It's not just bundling for the sake of bundling. These are the structural advantages that show up the second the program is live."
        />
        <div className="mt-10 space-y-4 md:space-y-5">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
            >
              <Panel padding="compact" motion={false}>
                <div className="flex items-start gap-4">
                  <div className="mt-0.5 flex size-7 flex-shrink-0 items-center justify-center rounded-full bg-gold-500/15 ring-1 ring-gold-500/30">
                    <Check className="size-3.5 text-gold-400" strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-cream-50 md:text-lg">
                      {r.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-cream-200">
                      {r.body}
                    </p>
                  </div>
                </div>
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mt-16 rounded-3xl border border-gold-500/30 bg-gradient-to-br from-gold-500/10 to-coral/5 p-8 md:mt-20 md:p-12"
      >
        <p className="font-accent max-w-3xl text-balance text-2xl italic leading-snug text-cream-50 md:text-3xl">
          "Marketing isn't a vendor relationship. It's a partnership. From day
          one, your win is the only thing we're measured on."
        </p>
        <HrSoft className="my-6" />
        <p className="text-sm text-cream-300">{config.agency.name}</p>
      </motion.div>
    </div>
  );
}

/**
 * Two call/text CTAs + the phone number printed below them. The phone number
 * is a tel: link except when the template placeholder "[__]" is still in
 * place — in that case the placeholder renders as plain text so it stays
 * obviously unfilled during template editing.
 */
function CallTextCtas() {
  const phone = config.phoneNumber;
  const isBlank = phone === "[__]";
  const telHref = isBlank ? undefined : `tel:${phone.replace(/[^0-9+]/g, "")}`;

  const primaryCls =
    "inline-flex w-full items-center justify-center rounded-lg bg-gold-500 px-6 py-3 text-base font-medium text-bg-0 transition-opacity hover:opacity-90";
  const secondaryCls =
    "inline-flex w-full items-center justify-center rounded-lg border border-gold-500 bg-transparent px-6 py-3 text-center text-base font-medium text-gold-500 transition-colors hover:bg-gold-500/10";

  return (
    <div className="mt-7">
      <div className="flex flex-col gap-3 sm:flex-row">
        {isBlank ? (
          <button type="button" disabled className={`${primaryCls} cursor-default opacity-80`}>
            I'm ready — call or text us
          </button>
        ) : (
          <a href={telHref} className={primaryCls}>
            I'm ready — call or text us
          </a>
        )}
        {isBlank ? (
          <button type="button" disabled className={`${secondaryCls} cursor-default opacity-80`}>
            Have a question first? Call or text
          </button>
        ) : (
          <a href={telHref} className={secondaryCls}>
            Have a question first? Call or text
          </a>
        )}
      </div>

      {isBlank ? (
        <div className="mt-3 text-center font-display text-lg font-bold text-cream-50">
          [__]
        </div>
      ) : (
        <a
          href={telHref}
          className="mt-3 block text-center font-display text-lg font-bold text-cream-50 transition-opacity hover:opacity-80"
        >
          {phone}
        </a>
      )}
    </div>
  );
}

function PriceRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between border-t border-line-soft py-2.5 first:border-t-0">
      <span className="text-sm text-cream-300">{label}</span>
      <span className="text-right text-sm font-medium text-cream-100">{value}</span>
    </div>
  );
}

/** Inline highlighted blank, matching the Value page convention */
function BlankInline({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const cls =
    size === "lg"
      ? "px-4 py-1.5 text-3xl md:text-4xl"
      : size === "md"
        ? "px-3 py-1 text-2xl md:text-3xl"
        : "px-2 py-0.5 text-base";
  return (
    <span
      className={`inline-flex items-center rounded-lg border border-dashed border-gold-400/60 bg-gold-500/10 align-middle font-mono font-bold text-gold-300 ${cls}`}
    >
      ___
    </span>
  );
}

/**
 * À la carte vs bundle comparison. Shows a struck-through total against the
 * bundle price with a savings callout. Live sales closer — built for one glance.
 */
function SavingsComparison() {
  const bundlePrice = config.bundle.monthlyPrice;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mt-12 md:mt-16"
    >
      <div className="relative overflow-hidden rounded-2xl border border-gold-500/30 bg-gradient-to-br from-bg-2 via-bg-1 to-bg-2 p-6 md:p-10">
        {/* atmospheric gold wash */}
        <div className="pointer-events-none absolute -top-20 -right-20 size-[400px] rounded-full bg-gold-500/8 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 size-[400px] rounded-full bg-coral/6 blur-3xl" />

        <div className="relative">
          <div className="eyebrow text-gold-400">The math</div>

          <div className="mt-5 grid items-end gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-8">
            {/* à la carte */}
            <div className="md:text-right">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-cream-300/70">
                À la carte total
              </div>
              <div className="mt-2 flex items-baseline gap-1.5 md:justify-end">
                <span className="font-display text-base text-cream-300/50">$</span>
                <span className="relative font-display text-3xl font-bold text-cream-300/50 line-through decoration-coral/60 decoration-2 md:text-4xl">
                  <BlankInline size="md" />
                </span>
                <span className="text-xs text-cream-300/60">/mo</span>
              </div>
              <div className="mt-1 text-[11px] text-cream-300/60">
                Each service run as a separate project
              </div>
            </div>

            {/* arrow divider */}
            <div className="flex items-center justify-center md:py-2">
              <div className="hidden h-px w-8 bg-gradient-to-r from-transparent to-gold-500/40 md:block" />
              <div className="flex size-9 items-center justify-center rounded-full border border-gold-500/40 bg-bg-3 shadow-lg">
                <ArrowRight className="size-4 text-gold-400" strokeWidth={2.4} />
              </div>
              <div className="hidden h-px w-8 bg-gradient-to-l from-transparent to-gold-500/40 md:block" />
            </div>

            {/* bundle */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-400">
                Bundle price
              </div>
              <div className="mt-2 flex items-baseline gap-1.5">
                {bundlePrice === null || bundlePrice === 0 ? (
                  <BlankInline size="lg" />
                ) : (
                  <span className="stat-num text-4xl md:text-5xl">
                    ${bundlePrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-cream-300">/mo</span>
              </div>
              <div className="mt-1 text-[11px] text-gold-400/80">
                Everything in one program, one team, one invoice
              </div>
            </div>
          </div>

          <HrSoft className="my-6 md:my-8" />

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-baseline gap-2 font-display text-lg leading-snug text-cream-50 md:text-xl">
              <Sparkles className="size-4 flex-shrink-0 translate-y-0.5 text-gold-400" />
              <span>
                Save <BlankInline size="sm" /> per month by bundling everything
              </span>
            </div>
            <div className="text-[12px] text-cream-300/70">
              Plus a single point of contact and one set of numbers.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
