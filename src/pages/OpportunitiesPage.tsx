import { motion } from "framer-motion";
import {
  ArrowRight,
  HandHelping,
  ShieldAlert,
  type LucideIcon,
  Target,
  Crown,
  HeartHandshake,
} from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { Panel, HrSoft } from "../components/Panel";
import { SectionScrollHint } from "../components/ScrollIndicator";
import { config, type ClientPath, type GrowthGoal } from "../config/client";

type PathInfo = {
  icon: LucideIcon;
  badge: string;
  title: string;
  body: string;
};

const PATHS: Record<Exclude<ClientPath, "custom">, PathInfo> = {
  wordOfMouth: {
    icon: HandHelping,
    badge: "Path A",
    title: "Word-of-mouth has carried you this far",
    body: "You've built a real business off regulars and referrals. It's working, but the next chapter needs more than that. You know it's time to add real marketing, you just don't have a clear playbook yet.",
  },
  burnedByPriorAgency: {
    icon: ShieldAlert,
    badge: "Path B",
    title: "You've been burned by an agency before",
    body: "You've tried marketing the paid way. It was expensive, the reporting was a black box, and you ended the engagement feeling like you got little to nothing for what you spent. You're rightfully cautious about doing it again.",
  },
};

type GoalInfo = {
  icon: LucideIcon;
  label: string;
  body: string;
};

const GOALS: Record<GrowthGoal, GoalInfo> = {
  acquisition: {
    icon: Target,
    label: "Acquire new customers",
    body: "Fill more seats. Drive more first-time visits. Get more people through the door — and turn that into covers, orders, and reservations.",
  },
  brandValidity: {
    icon: Crown,
    label: "Build (or protect) brand value",
    body: "Be seen as a higher-end concept. Earn the right to charge more, attract better staff, and stand out from the average restaurant down the street.",
  },
  retention: {
    icon: HeartHandshake,
    label: "Keep the regulars you have",
    body: "Don't grow recklessly. Keep your base happy and visiting often. Repeat visits, loyalty, and a community that doesn't drift to the next opening down the street.",
  },
};

type Problem = {
  number: string;
  problem: string;
  problemDetail: string;
  opportunity: string;
  opportunityDetail: string;
};

const PROBLEMS: Problem[] = [
  {
    number: "01",
    problem: "Your digital presence isn't pulling its weight",
    problemDetail:
      "Maybe the social feed has gone quiet. Maybe the website looks a few years behind. Maybe you've never run a real ad campaign. Whatever the mix, the basics aren't in place, and guests who don't already know you can't easily find a reason to choose you.",
    opportunity: "A coordinated three-piece program",
    opportunityDetail:
      "We rebuild the foundation: a website built to turn visitors into reservations, a social feed that earns attention, and ads that fill in the gaps. Not three separate efforts — one program where every part makes the others stronger.",
  },
  {
    number: "02",
    problem: "You can't tell what's working and what isn't",
    problemDetail:
      "Reservations come in, but you don't know why. Marketing budget gets spent, but no one can show you how it turned into revenue. Without tracking, every dollar is an act of faith.",
    opportunity: "Real proof of what's working, in plain English",
    opportunityDetail:
      "We install tracking on your site so every reservation, call, and inquiry is connected back to where it came from — Google, Instagram, your website, or a friend. Monthly reviews turn that data into clear decisions, not charts you scroll past.",
  },
  {
    number: "03",
    problem: "Marketing without a clear goal",
    problemDetail:
      "Are you trying to fill more seats? Strengthen the brand? Hold on to the regulars you already have? Each of those needs a different plan. Without naming the goal, marketing chases numbers that look good but don't move the business.",
    opportunity: "A plan built around your actual goal",
    opportunityDetail:
      "We start by naming what you actually want. Then every campaign, post, and ad gets pointed at that outcome. Whatever the goal, the plan flows from there.",
  },
];

export function OpportunitiesPage() {
  const path = config.client.path;
  const goal = GOALS[config.client.primaryGoal];

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 pb-32 md:px-8 md:py-20 md:pb-28 lg:px-16 2xl:px-20">
      <SectionHeading
        eyebrow="Where We Are Today"
        title={
          <>
            <span className="block">Every problem</span>
            <span className="block shimmer-text">is an opportunity.</span>
          </>
        }
        subtitle="From the first conversation we had, here's what we heard: what's getting in the way today, and what we'd do about it together."
      />

      <SectionScrollHint />

      {/* Two client paths */}
      <div className="mt-14">
        <div className="eyebrow mb-5">Where you're starting from</div>
        <div className="grid gap-5 md:grid-cols-2 md:items-stretch md:gap-6">
          {(["wordOfMouth", "burnedByPriorAgency"] as const).map((key) => {
            const info = PATHS[key];
            const isActive = path === key;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="h-full"
              >
                <Panel
                  motion={false}
                  className={
                    isActive
                      ? "h-full border-gold-500/40 bg-gold-soft"
                      : "h-full opacity-70"
                  }
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex size-11 flex-shrink-0 items-center justify-center rounded-xl ${
                        isActive
                          ? "bg-gold-500/15 text-gold-400 ring-1 ring-gold-500/30"
                          : "bg-cream-300/5 text-cream-300"
                      }`}
                    >
                      <info.icon className="size-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <div className="eyebrow">{info.badge}</div>
                        {isActive && (
                          <span className="rounded-full bg-gold-500/15 px-2 py-0.5 font-display text-[10px] font-bold tracking-wider text-gold-400">
                            ★ THIS IS YOU
                          </span>
                        )}
                      </div>
                      <h3 className="mt-2 font-display text-lg font-bold text-cream-50 md:text-xl">
                        {info.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-cream-200">
                        {info.body}
                      </p>
                    </div>
                  </div>
                </Panel>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Primary goal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mt-12"
      >
        <div className="eyebrow mb-5">What you actually want</div>
        <Panel motion={false}>
          <div className="grid gap-5 md:grid-cols-3">
            {(["acquisition", "brandValidity", "retention"] as const).map(
              (key) => {
                const info = GOALS[key];
                const isPrimary = config.client.primaryGoal === key;
                return (
                  <div
                    key={key}
                    className={`rounded-2xl p-5 ${
                      isPrimary
                        ? "border border-gold-500/40 bg-gold-soft"
                        : "border border-line-soft"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex size-9 items-center justify-center rounded-xl ${
                          isPrimary
                            ? "bg-gold-500/15 text-gold-400"
                            : "bg-cream-300/5 text-cream-300"
                        }`}
                      >
                        <info.icon className="size-4" />
                      </div>
                      <div className="font-display text-sm font-bold text-cream-50">
                        {info.label}
                      </div>
                    </div>
                    <p className="mt-3 text-[14px] leading-relaxed text-cream-200">
                      {info.body}
                    </p>
                    {isPrimary && (
                      <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                        Primary goal for this engagement
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
          <HrSoft className="my-6" />
          <p className="text-[15px] leading-relaxed text-cream-200">
            <span className="font-semibold text-cream-50">
              Naming the goal is the most important thing on this slide.
            </span>{" "}
            For{" "}
            <span className="font-display font-bold text-gold-400">
              {config.client.shortName}
            </span>
            , the program below is built around{" "}
            <span className="font-semibold text-cream-50">
              {goal.label.toLowerCase()}
            </span>
            . Channels, creative, and budget all flow from that.
          </p>
        </Panel>
      </motion.div>

      {/* Problems → Opportunities */}
      <div className="mt-16 md:mt-20">
        <SectionHeading
          eyebrow="Problems → Opportunities"
          title={<>Three things to fix. Three wins to take.</>}
          subtitle="Every problem on the left is a sentence we've heard from operators in your seat. Every opportunity on the right is what we'd actually do about it."
        />

        <div className="mt-10 space-y-5 md:space-y-6">
          {PROBLEMS.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: Math.min(i * 0.06, 0.18) }}
            >
              <Panel motion={false}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="font-display text-3xl font-bold text-gold-500/30 md:text-4xl">
                    {p.number}
                  </div>
                  <HrSoft className="flex-1" />
                </div>

                <div className="grid gap-6 md:grid-cols-2 md:gap-10">
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-coral">
                      The Problem
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold text-cream-50 md:text-2xl">
                      {p.problem}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-cream-200">
                      {p.problemDetail}
                    </p>
                  </div>

                  <div className="relative md:border-l md:border-line md:pl-10">
                    <div className="absolute -left-3 top-0 hidden size-6 items-center justify-center rounded-full border border-gold-500/40 bg-bg-0 md:flex">
                      <ArrowRight className="size-3 text-gold-400" />
                    </div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-500">
                      The Opportunity
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold text-cream-50 md:text-2xl">
                      {p.opportunity}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-cream-200">
                      {p.opportunityDetail}
                    </p>
                  </div>
                </div>
              </Panel>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 rounded-2xl border border-gold-500/30 bg-gold-soft p-6 md:p-8"
      >
        <p className="text-[15px] leading-relaxed text-cream-100 md:text-base">
          <span className="font-display font-bold text-gold-400">
            Next →
          </span>{" "}
          The Ecosystem slide shows how the program runs as one unit — these
          three opportunities turned into one team, one plan, one invoice.
        </p>
      </motion.div>
    </div>
  );
}
