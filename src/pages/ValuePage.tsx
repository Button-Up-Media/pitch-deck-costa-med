import { motion } from "framer-motion";
import { Check, Clock, Star } from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { Panel, HrSoft } from "../components/Panel";
import { config } from "../config/client";
import { SERVICES, SERVICE_ORDER } from "../config/services";

/** Renders [__] markers in deliverable strings as highlighted template blanks */
function DeliverableText({ text }: { text: string }) {
  const parts = text.split(/(\[__\])/);
  return (
    <>
      {parts.map((part, i) =>
        part === "[__]" ? (
          <span
            key={i}
            className="inline-block rounded border border-dashed border-gold-400/60 bg-gold-500/10 px-1 font-mono text-[10px] font-bold leading-none text-gold-300"
          >
            ___
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function BlankPrice() {
  return (
    <span className="inline-flex items-center rounded-lg border border-dashed border-gold-400/50 bg-gold-500/10 px-3 py-1.5 font-mono text-sm font-bold text-gold-300">
      ___
    </span>
  );
}

/** Hours estimate badge — shows above the price on each service row */
function HoursBadge({ hours }: { hours: number | null | undefined }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg-2 px-2.5 py-1 text-[11px] font-medium text-cream-200">
      <Clock className="size-3 text-gold-400" strokeWidth={2.4} />
      <span className="font-display uppercase tracking-wider text-[10px] text-cream-300">
        Est.
      </span>
      {hours == null ? (
        <span className="inline-block rounded border border-dashed border-gold-400/60 bg-gold-500/10 px-1 font-mono text-[10px] font-bold leading-none text-gold-300">
          ___
        </span>
      ) : (
        <span className="font-mono font-bold text-cream-50">{hours}</span>
      )}
      <span className="text-cream-300">hrs / mo</span>
    </div>
  );
}

export function ValuePage() {
  const enabled = SERVICE_ORDER.filter((k) => config.services[k].enabled);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 pb-32 md:px-8 md:py-20 md:pb-28 lg:px-16 2xl:px-20">
      <SectionHeading
        eyebrow="The Value"
        title={
          <>
            <span className="block">A clear price</span>
            <span className="block shimmer-text">for each piece.</span>
          </>
        }
        subtitle="Each service is priced as a standalone monthly investment, so you can see exactly what each piece contributes and what it costs to run."
      />

      <div className="mt-12 space-y-5 md:mt-16">
        {enabled.map((key, i) => {
          const svc = SERVICES[key];
          const cfg = config.services[key];
          const Icon = svc.icon;
          const price = cfg.monthlyPrice;

          const isSubService = key === "websiteManagement";

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: Math.min(i * 0.05, 0.2) }}
            >
              {/* visual connector for sub-service */}
              {isSubService && (
                <div className="mb-1 ml-8 flex items-center gap-2">
                  <div className="h-5 w-px bg-gradient-to-b from-gold-500/30 to-transparent" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-400/60">
                    add-on
                  </span>
                </div>
              )}

              <Panel motion={false} className={isSubService ? "ml-6 border-l-2 border-l-gold-500/20" : ""}>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex size-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${svc.accent} shadow-md`}
                    >
                      <Icon className="size-5 text-bg-0" strokeWidth={2.4} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-lg font-bold text-cream-50 md:text-xl">
                          {svc.label}
                        </h3>
                        {cfg.recommended && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gold-500/15 px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-gold-400">
                            <Star className="size-2.5" fill="currentColor" />
                            Our Recommendation
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-[14px] text-cream-200">
                        {svc.subhead}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-2 sm:items-end sm:text-right">
                    <HoursBadge hours={cfg.hoursPerMonth} />
                    {price === null ? (
                      <div className="flex flex-col items-start gap-1 sm:items-end">
                        <BlankPrice />
                        <span className="text-xs text-cream-300">per month</span>
                      </div>
                    ) : price === 0 ? (
                      <span className="rounded-full bg-gold-500/12 px-3 py-1.5 font-display text-xs font-bold uppercase tracking-wider text-gold-400">
                        Custom quote
                      </span>
                    ) : (
                      <div className="flex flex-col items-start gap-0.5 sm:items-end">
                        <span className="stat-num text-3xl md:text-4xl">
                          ${price.toLocaleString()}
                        </span>
                        <span className="text-xs text-cream-300">per month</span>
                        {cfg.priceNote && (
                          <span className="mt-0.5 text-[11px] leading-tight text-cream-300/70">
                            {cfg.priceNote}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <HrSoft className="my-5" />

                <div className="eyebrow mb-3">What's included</div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {svc.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <div className="mt-1 flex size-4 flex-shrink-0 items-center justify-center rounded-full bg-gold-500/15">
                        <Check
                          className="size-2.5 text-gold-400"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-[13px] leading-relaxed text-cream-200">
                        <DeliverableText text={d} />
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>
            </motion.div>
          );
        })}
      </div>

      {/* template legend */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-8"
      >
        <div className="flex items-center gap-3 rounded-xl border border-dashed border-gold-400/30 bg-gold-500/5 px-4 py-3">
          <span className="inline-block rounded border border-dashed border-gold-400/60 bg-gold-500/10 px-1.5 font-mono text-[10px] font-bold text-gold-300">
            ___
          </span>
          <p className="text-[12px] text-cream-300">
            Highlighted blanks are template fields — fill these in before presenting to a client.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
