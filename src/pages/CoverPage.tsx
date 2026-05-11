import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { config } from "../config/client";
import { Logo } from "../components/Logo";

export function CoverPage() {
  const heroImage =
    config.brands[0]?.imageUrl ??
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80";

  return (
    <section className="relative min-h-screen overflow-hidden">
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-[#0a0a0a]/30" />

      <div className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-28 md:px-16 md:pb-32 lg:max-w-[58vw] lg:px-24 2xl:max-w-[50vw]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-3"
        >
          <Logo size="lg" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05 }}
          className="font-accent text-base italic text-gold-400 md:text-lg"
        >
          Prepared for {config.client.preparedFor}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-cream-50 sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-[5.5rem]"
        >
          {config.client.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="mt-6 max-w-xl text-base leading-[1.75] text-cream-200 md:text-[17px]"
        >
          A complete {config.client.industry.toLowerCase()} growth program
          built around three things: your social media, your ads on Google
          and Instagram, and a website that ties them together. One team,
          one plan, results explained in plain English.
        </motion.p>

        {/* Compact phone CTA — sits above the primary action so it's visible without scrolling */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-8 flex min-h-[44px] items-center gap-2 text-sm text-cream-300 md:gap-2.5"
        >
          <Phone className="size-4 flex-shrink-0 text-gold-500" strokeWidth={2.2} />
          <span>
            Questions before you dive in? Call or text us:{" "}
            {config.phoneNumber === "[__]" ? (
              <span className="font-medium text-cream-50">
                {config.phoneNumber}
              </span>
            ) : (
              <a
                href={`tel:${config.phoneNumber.replace(/[^0-9+]/g, "")}`}
                className="inline-block py-2 font-medium text-cream-50 underline-offset-4 transition-colors hover:text-gold-400 hover:underline"
              >
                {config.phoneNumber}
              </a>
            )}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-6 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-6"
        >
          <Link
            to="/opportunities"
            className="group inline-flex min-h-[44px] items-center justify-center gap-3 rounded-full border border-gold-500/40 bg-gold-soft px-5 py-2.5 text-sm font-semibold tracking-wide text-cream-50 transition-all hover:border-gold-400 hover:bg-gold-500/20 sm:justify-start sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:py-0 sm:hover:bg-transparent"
          >
            <span>Begin walkthrough</span>
            <span className="flex size-9 items-center justify-center rounded-full border border-gold-500/40 bg-gold-soft transition-all group-hover:border-gold-400 group-hover:bg-gold-500/20">
              <ArrowRight className="size-4 text-gold-400 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
          <Link
            to="/lets-go"
            className="inline-flex min-h-[44px] items-center justify-center text-sm text-cream-300 underline-offset-4 transition hover:text-cream-100 hover:underline sm:justify-start"
          >
            Skip to proposal
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-16 border-t border-line-soft pt-7"
        >
          <div className="eyebrow mb-5 text-[10px] tracking-[0.28em]">
            Trusted by restaurants across {config.client.industry}
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:flex md:flex-wrap md:gap-x-12">
            {config.agency.stats.map((s) => (
              <div key={s.label}>
                <div className="stat-num text-3xl md:text-4xl lg:text-[44px]">
                  {s.value}
                </div>
                <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream-300">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
