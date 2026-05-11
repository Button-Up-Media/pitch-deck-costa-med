import { motion } from "framer-motion";
import {
  AlertCircle,
  LineChart,
  FlaskConical,
  Percent,
  FileBarChart,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { Panel } from "../components/Panel";
import { DeviceMockupHero } from "../components/DeviceMockupHero";
import { DeviceMockupSplit } from "../components/DeviceMockupSplit";
import { GoogleAdsHero } from "../components/GoogleAdsHero";
import { CompactVideo } from "../components/CompactVideo";
import {
  PillarsNumbered,
  PillarsGrid,
  PillarsStack,
  PillarsFlow,
} from "../components/PillarsVariants";
import { SocialFunnelDiagram } from "../components/SocialFunnelDiagram";
import { LandingPageDropoffGraphic } from "../components/LandingPageDropoffGraphic";
import { SERVICES } from "../config/services";
import type { ServiceKey } from "../config/client";

export function ServicePage({ serviceKey }: { serviceKey: ServiceKey }) {
  const svc = SERVICES[serviceKey];
  const Icon = svc.icon;

  // Different intro framings per service to break the templated feel
  const pillarsHeading = getPillarsHeading(serviceKey);

  // Renders the right hero background based on heroVariant
  function renderHero() {
    switch (svc.heroVariant) {
      case "deviceMockup":
        return <DeviceMockupHero />;
      case "deviceSplit":
        return <DeviceMockupSplit />;
      case "googleAdsSerp":
        return <GoogleAdsHero />;
      default:
        return (
          <>
            <img
              src={svc.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          </>
        );
    }
  }

  function renderPillars() {
    switch (svc.pillarLayout) {
      case "grid":
        return <PillarsGrid pillars={svc.pillars} accent={svc.accent} />;
      case "stack":
        return <PillarsStack pillars={svc.pillars} />;
      case "flow":
        return <PillarsFlow pillars={svc.pillars} accent={svc.accent} />;
      default:
        return <PillarsNumbered pillars={svc.pillars} accent={svc.accent} />;
    }
  }

  return (
    <div className="relative">
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden md:h-[60vh]">
        {renderHero()}

        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-12 md:px-16 md:pb-16 lg:max-w-[60vw] lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex size-9 items-center justify-center rounded-lg bg-gradient-to-br ${svc.accent} shadow-lg`}
              >
                <Icon className="size-4 text-bg-0" strokeWidth={2.4} />
              </div>
              <div className="eyebrow">{svc.label}</div>
            </div>
            <h1 className="mt-5 max-w-2xl text-balance font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-cream-50 md:text-5xl lg:text-6xl">
              {svc.headline}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-[1.7] text-cream-200 md:text-[17px]">
              {svc.subhead}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12 pb-32 md:px-8 md:py-16 md:pb-28 lg:px-16 2xl:px-20">
        <Panel>
          <div className="eyebrow">Role in the ecosystem</div>
          <p className="mt-3 text-[15px] leading-relaxed text-cream-100 md:text-base">
            {svc.ecosystemRole}
          </p>
        </Panel>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Panel motion={false}>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-coral">
              The gap today
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-cream-200 md:text-base">
              {svc.problem}
            </p>
          </Panel>
          <Panel motion={false}>
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-500">
              How we close it
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-cream-100 md:text-base">
              {svc.solution}
            </p>
          </Panel>
        </div>

        {svc.processVideo && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-10"
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-bg-1">
              <div className="grid items-stretch md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px]">
                {/* Left column — stretches to match video height, splits into
                    top/middle/bottom on md+ so the panel feels intentionally used */}
                <div className="flex flex-col px-5 py-5 md:px-8 md:py-8 md:justify-between lg:px-10 lg:py-10">
                  {/* TOP — eyebrow anchored to top */}
                  <div className="eyebrow">How It Works</div>

                  {/* MIDDLE — display heading + subtitle, centered in remaining space on md+ */}
                  <div className="mt-6 md:my-auto md:mt-0">
                    <h3 className="font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-cream-50 md:text-4xl lg:text-5xl">
                      {svc.processVideo.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-cream-200 md:mt-4 md:text-base">
                      {svc.processVideo.description}
                    </p>
                  </div>

                  {/* BOTTOM — anchor line */}
                  <div className="mt-6 text-sm text-cream-300 md:mt-0">
                    Every shoot is planned, produced, and delivered — start to finish.
                  </div>
                </div>

                <div className="px-5 pb-5 md:px-3 md:py-3">
                  <CompactVideo src={svc.processVideo.url} />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-16">
          {serviceKey === "organicSocial" ? (
            <SocialFunnelDiagram />
          ) : (
            <>
              <SectionHeading
                eyebrow={pillarsHeading.eyebrow}
                title={pillarsHeading.title}
                subtitle={pillarsHeading.subtitle}
              />
              <div className="mt-10">{renderPillars()}</div>
            </>
          )}
        </div>

        {/* Google Ads page: investment + ROI expectations */}
        {serviceKey === "googleAds" && <GoogleAdsInvestment />}

        {/* Website page: embed Web Management as a subsection at the bottom */}
        {serviceKey === "websiteCreation" && <WebManagementSubsection />}

        {/* Organic Social: included correlation-analysis deliverable */}
        {serviceKey === "organicSocial" && <CorrelationAnalysisSection />}
      </div>
    </div>
  );
}

const EXPECTATIONS: {
  eyebrow: string;
  stat: string;
  body: string;
  gold?: boolean;
}[] = [
  {
    eyebrow: "Reservations / general",
    stat: "2–3x return",
    body: "For every dollar in ad spend, expect two to three back in tracked reservation revenue within the first 60–90 days of a tuned-up campaign. This is what we mean by return on ad spend (ROAS).",
    gold: true,
  },
  {
    eyebrow: "Private events / high-ticket",
    stat: "7–8x return",
    body: "Event campaigns produce bookings at a much higher rate than dinner reservations. A single private event booking can pay back the entire monthly ad budget.",
    gold: true,
  },
  {
    eyebrow: "How fast",
    stat: "30–60 days",
    body: "Google Ads is the fastest way to drive revenue in restaurant marketing. Unlike social media, which builds over months, ads bring measurable bookings almost immediately.",
  },
  {
    eyebrow: "What we do",
    stat: "Full management",
    body: "Campaign setup, daily bid tuning, new campaigns for every push (Mother's Day, Thanksgiving, events), and biweekly review calls if you want them.",
  },
];

function GoogleAdsInvestment() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="mt-16 md:mt-20"
    >
      <SectionHeading
        eyebrow="Investment"
        title={<>What does this actually cost?</>}
        subtitle="Two numbers. Your ad budget — and our management fee. That's it."
      />

      {/* Two-part cost breakdown */}
      <div className="mt-10 grid items-stretch gap-4 md:grid-cols-2 md:gap-5">
        {/* LEFT — Management fee (neutral) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex h-full flex-col rounded-2xl border border-line bg-bg-1 p-6 md:p-7"
        >
          <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-cream-300">
            BUM management fee
          </div>
          <div className="mt-3 flex items-baseline gap-1.5">
            <span className="stat-num text-4xl text-cream-50 md:text-5xl">$500</span>
            <span className="text-sm text-cream-300">/mo</span>
          </div>
          <p className="mt-4 flex-1 text-[14px] leading-relaxed text-cream-200">
            We build your campaigns, monitor them daily, optimize bids, and report
            results every month. This is our fee regardless of your ad budget.
          </p>
          <div className="mt-5 border-t border-line-soft pt-4 text-[12px] italic text-cream-300/80">
            Scales for larger accounts — ask us about it.
          </div>
        </motion.div>

        {/* RIGHT — Ad budget (gold accent — their money) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.06 }}
          className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold-500/40 bg-gradient-to-br from-bg-1 to-bg-2 p-6 md:p-7"
        >
          {/* atmospheric gold glow */}
          <div className="pointer-events-none absolute -top-16 -right-12 size-48 rounded-full bg-gold-500/10 blur-3xl" />

          <div className="relative">
            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-400">
              Recommended ad spend
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="stat-num bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-3xl text-transparent md:text-4xl lg:text-5xl">
                $1,000 – $3,000
              </span>
              <span className="text-sm text-cream-300">/mo</span>
            </div>
            <p className="mt-4 flex-1 text-[14px] leading-relaxed text-cream-200">
              This goes directly to Google — not to us. We recommend starting here for
              a single location. You control the budget and can adjust at any time.
            </p>
            <div className="mt-5 border-t border-gold-500/20 pt-4 text-[12px] italic text-gold-400/85">
              This is your money working in the market.
            </div>
          </div>
        </motion.div>
      </div>

      {/* What you should expect back */}
      <div className="mt-12 md:mt-16">
        <Panel motion={false}>
          <div className="eyebrow">What you should expect back</div>
          <h4 className="mt-2 font-display text-xl font-bold leading-tight text-cream-50 md:text-2xl">
            Real numbers, not aspirations.
          </h4>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:gap-5">
            {EXPECTATIONS.map((e, i) => (
              <motion.div
                key={e.eyebrow}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="rounded-xl border border-line-soft bg-bg-2 p-5 md:p-6"
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-cream-300">
                  {e.eyebrow}
                </div>
                <div
                  className={`mt-3 stat-num text-3xl md:text-4xl ${
                    e.gold
                      ? "bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent"
                      : "text-cream-50"
                  }`}
                >
                  {e.stat}
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-cream-200">
                  {e.body}
                </p>
              </motion.div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Caveat bar — landing page check */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mt-8 overflow-hidden rounded-xl border border-gold-500/40 bg-gradient-to-r from-gold-500/8 via-gold-500/12 to-gold-500/8"
      >
        <div className="flex items-start gap-3 px-5 py-4 md:px-6 md:py-5">
          <div className="flex size-7 flex-shrink-0 items-center justify-center rounded-full bg-gold-500/20 ring-1 ring-gold-400/40">
            <AlertCircle className="size-4 text-gold-300" strokeWidth={2.4} />
          </div>
          <p className="text-[13.5px] leading-relaxed text-cream-100 md:text-[14px]">
            <span className="font-display font-bold text-gold-300">
              One thing we always check first: your landing page.
            </span>{" "}
            A great ad with a weak landing page produces zero bookings. We
            audit your booking flow as part of onboarding — and if there are
            gaps, we'll tell you before we spend a dollar.
          </p>
        </div>
      </motion.div>

      {/* Footer disclaimer */}
      <p className="mt-6 text-[12px] italic text-cream-300/70">
        Ad spend budgets sit alongside the management fee. Landing page builds and
        updates are handled under Website Management.
      </p>
    </motion.div>
  );
}

function WebManagementSubsection() {
  const wm = SERVICES.websiteManagement;
  const Icon = wm.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55 }}
      className="mt-16 md:mt-20"
    >
      <div className="rounded-2xl border border-line bg-gradient-to-br from-bg-1 to-bg-2 p-6 md:p-8 lg:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
          <div className="md:w-1/2">
            <div className="flex items-center gap-3">
              <div
                className={`flex size-10 items-center justify-center rounded-xl bg-gradient-to-br ${wm.accent} shadow-md`}
              >
                <Icon className="size-5 text-bg-0" strokeWidth={2.4} />
              </div>
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-400">
                Also included with the website
              </div>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold leading-[1.15] tracking-[-0.02em] text-cream-50 md:text-3xl">
              Website Management
            </h3>
            <p className="mt-3 text-[15px] leading-relaxed text-cream-200">
              The site never goes stale. Text us when you need a change — new
              menu, updated hours, a new event, a new homepage photo — and it
              lands in the next batch. No tickets, no per-change fees, no
              waiting on a vendor.
            </p>
          </div>

          <div className="grid flex-1 gap-3">
            <SubItem
              title="Landing pages for your ads"
              body="Every Google or social ad campaign gets its own dedicated landing page. Generic homepages kill ad performance — pages built for one offer produce bookings."
            />
            <SubItem
              title="Landing pages built to book"
              body="A Google Ad is only as good as the page it sends people to. We build and maintain landing pages designed to turn clicks into bookings — the right headline, one clear button, fast load time, phone-first. Without this, ad spend leaks."
            />
            <SubItem
              title="Batch revision cycles"
              body="Send your team's update list as a batch — text, photos, menus, hours — and it ships on a predictable schedule."
            />
            <SubItem
              title="Always-on monitoring"
              body="Site speed, uptime, and the path from visitor to reservation are watched monthly. Things that break get caught before they cost you bookings."
            />
          </div>
        </div>
      </div>

      {/* "Why this matters" coral callout — sits below the outer panel */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mt-6 overflow-hidden rounded-xl border border-line border-l-4 border-l-coral bg-gradient-to-r from-coral/8 via-bg-1 to-bg-1 p-5 md:p-7"
      >
        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-coral">
          Why this matters
        </div>
        <h4 className="mt-2 font-display text-lg font-bold leading-[1.2] tracking-[-0.01em] text-cream-50 md:text-xl lg:text-2xl">
          Your ads can be perfect. Your landing page is where the money is made.
        </h4>
        <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-cream-200 md:text-[15px]">
          We've seen ads with a 6%+ click-through rate (the percentage of
          people who click after seeing the ad) produce zero reservations —
          because the landing page had no clear button to book. Great ads
          drive traffic. Great landing pages drive revenue. We make sure you
          have both.
        </p>
      </motion.div>

      {/* Visual proof: the drop-off funnel */}
      <LandingPageDropoffGraphic />
    </motion.div>
  );
}

function SubItem({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-line-soft bg-bg-2 px-4 py-3.5 md:px-5 md:py-4">
      <div className="font-display text-[14px] font-bold text-cream-50">{title}</div>
      <p className="mt-1 text-[13px] leading-relaxed text-cream-200">{body}</p>
    </div>
  );
}

/** Different intro copy per service so the section doesn't feel templated */
function getPillarsHeading(key: ServiceKey): {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
} {
  switch (key) {
    case "organicSocial":
      return {
        eyebrow: "How we approach it",
        title: <>Four ideas the program is built around.</>,
        subtitle:
          "These aren't steps in order. They're four ideas we apply at the same time, every day, on every brand.",
      };
    case "googleAds":
      return {
        eyebrow: "Inside the program",
        title: <>What we run, and why.</>,
        subtitle:
          "Each piece of the campaign does a different job. Together they catch every guest who's searching right now.",
      };
    case "paidSocial":
      return {
        eyebrow: "How the funnel works",
        title: <>From awareness to booking.</>,
        subtitle:
          "Social ads work in stages: get on people's radar, follow up after they visit your site, close the booking. Each stage feeds the next.",
      };
    case "websiteCreation":
      return {
        eyebrow: "What we build",
        title: <>The four jobs the site has to do.</>,
        subtitle:
          "Every layout choice, every integration, every SEO decision points back to one of these four jobs.",
      };
    default:
      return {
        eyebrow: "The Four Pillars",
        title: <>Built on a foundation that doesn't move.</>,
        subtitle: "Every program rests on these four. Tweaked per brand, never skipped.",
      };
  }
}

// ---------- Correlation Analysis section (Organic Social only) ----------

const CORRELATION_FEATURES: {
  icon: LucideIcon;
  label: string;
  description: string;
}[] = [
  {
    icon: LineChart,
    label: "Revenue correlation",
    description:
      "We test whether your social metrics statistically predict revenue changes — not just correlate with them.",
  },
  {
    icon: FlaskConical,
    label: "Granger causality test",
    description:
      "A statistical method that asks: does social media activity actually cause revenue movement, or is it coincidence?",
  },
  {
    icon: Percent,
    label: "P-value significance",
    description:
      "We report the confidence level of every finding. You'll know exactly how strong the evidence is.",
  },
  {
    icon: FileBarChart,
    label: "Plain-language summary",
    description:
      "Every number gets explained in plain English. You'll understand what it means for your business — no statistics background required.",
  },
];

function CorrelationAnalysisSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16 md:mt-20"
    >
      <SectionHeading
        eyebrow="Included in your service"
        title={
          <>We prove what your social media is actually doing for your revenue.</>
        }
        subtitle="After 6 months, you get something no other agency offers — a statistical analysis that connects your social media activity to real business revenue."
      />

      <div className="mt-10">
        <Panel motion={false}>
          {/* Two-column main explanation */}
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            {/* Left column — what it is */}
            <div className="flex-1">
              <h3 className="font-display text-lg font-bold text-cream-50">
                The Correlation Analysis
              </h3>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-cream-300">
                <p>
                  Most agencies tell you your content performed well based on
                  likes and views. We go further. After your first 6 months, we
                  run a full statistical analysis that correlates your social
                  media metrics — views, engagement, follower growth — directly
                  to your revenue data.
                </p>
                <p>
                  We use AI-assisted statistics including Granger causality
                  testing and p-value analysis to determine whether your social
                  media activity is genuinely driving revenue, and at what
                  confidence level. This is the kind of analysis applied in
                  academic research and financial modeling — now applied to
                  your restaurant.
                </p>
                <p>
                  This is included in your Organic Social service. You do not
                  pay extra for it.
                </p>
              </div>
            </div>

            {/* Right column — what's in the report */}
            <div className="w-full flex-shrink-0 md:w-80">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-500">
                What's in the report
              </div>
              <div className="mt-4">
                {CORRELATION_FEATURES.map((f, i) => {
                  const Icon = f.icon;
                  const isLast = i === CORRELATION_FEATURES.length - 1;
                  return (
                    <div
                      key={f.label}
                      className={`flex items-start gap-3 ${
                        isLast ? "" : "mb-3 border-b border-line pb-3"
                      }`}
                    >
                      <Icon
                        className="mt-0.5 size-[18px] flex-shrink-0 text-gold-500"
                        strokeWidth={2.2}
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-cream-50">
                          {f.label}
                        </div>
                        <p className="mt-0.5 text-xs leading-relaxed text-cream-400">
                          {f.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Trust / NDA callout — full width */}
          <div className="mt-8 rounded-r-lg border-l-2 border-gold-500 bg-bg-1 px-4 py-3">
            <p className="text-sm leading-relaxed text-cream-300">
              <Lock
                className="mr-1.5 inline-block size-[14px] -translate-y-0.5 text-gold-500"
                strokeWidth={2.4}
              />
              <span>
                Participation is optional. Some clients prefer to keep revenue
                data private — and we respect that completely. If you choose to
                participate, we sign a mutual NDA before any data is shared.
                Your numbers stay between us.
              </span>
            </p>
          </div>

          {/* Why we're different */}
          <div className="mt-8">
            <p className="mx-auto max-w-2xl text-center font-display text-base font-medium text-cream-50">
              We are the only marketing agency applying this kind of statistical
              rigor to social media at this scale. Because we believe
              data-driven decisions should mean something.
            </p>
          </div>
        </Panel>
      </div>
    </motion.div>
  );
}
