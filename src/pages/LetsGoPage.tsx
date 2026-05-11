import { motion } from "framer-motion";
import {
  Check,
  Sparkles,
  Megaphone,
  Search,
  Globe,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { Panel, HrSoft } from "../components/Panel";
import { config } from "../config/client";

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
    sub: "Where bookings happen + ongoing web management",
    accent: "from-gold-500 to-coral",
  },
];

export function LetsGoPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12 pb-32 md:px-8 md:py-20 md:pb-28 lg:px-16 2xl:px-20">
      <SectionHeading
        eyebrow="Let's Go"
        title={
          <>
            <span className="block">The full growth plan</span>
            <span className="block shimmer-text">— everything working together.</span>
          </>
        }
        subtitle={`The all-in-one program for ${config.client.name}: every piece in this deck wrapped into one program — one team, one plan, one invoice.`}
      />

      {/* Pillars + CTA block — the bundled program at a glance */}
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
                {/* Included free */}
                <div className="mt-1 rounded-xl border border-gold-500/25 bg-gold-500/5 p-4">
                  <div className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                    Included free in your bundle
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Check className="mt-0.5 size-3.5 flex-shrink-0 text-gold-400" strokeWidth={3} />
                      <span className="text-[12px] text-cream-200">
                        <span className="font-medium text-cream-100">Web Management</span>
                        {" "}— $200/mo value — active months 2–6
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="mt-0.5 size-3.5 flex-shrink-0 text-gold-400" strokeWidth={3} />
                      <span className="text-[12px] text-cream-200">
                        <span className="font-medium text-cream-100">Correlation Analysis</span>
                        {" "}— delivered end of month 6, at no extra charge
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gold-500/20 bg-gradient-to-br from-bg-3 to-bg-2 p-6 md:p-8">
              <div className="eyebrow">The Investment</div>

              <div className="mt-3 flex items-baseline gap-2">
                <span className="stat-num text-5xl md:text-6xl">
                  ${(config.bundle.monthlyPrice ?? 0).toLocaleString()}
                </span>
                <span className="text-sm text-cream-300">/ month</span>
              </div>
              <p className="mt-1 text-xs text-cream-300">
                Everything in the program, fully managed. Your $600/mo Google ad
                budget is part of this total — it goes directly to Google, not
                to us.
              </p>

              <div className="mt-6 space-y-1">
                <PriceRow
                  label="Initial term"
                  value={
                    config.bundle.contractMonths
                      ? `${config.bundle.contractMonths} months`
                      : "—"
                  }
                />
                <PriceRow label="6-month total" value="$19,200" />
                <PriceRow label="À la carte equivalent" value="$23,000" />
                <PriceRow
                  label="You save"
                  value={
                    <span className="font-display font-bold text-gold-400">
                      $3,800
                    </span>
                  }
                />
              </div>

              <CallTextCtas />
            </div>
          </div>
        </Panel>
      </motion.div>

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
