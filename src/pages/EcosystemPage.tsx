import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  Megaphone,
  Target,
  ArrowRight,
  X,
  AlertTriangle,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "../components/SectionHeading";
import { Panel, HrSoft } from "../components/Panel";

type NodeKey = "website" | "organic" | "paid";

type NodeMeta = {
  key: NodeKey;
  title: string;
  short: string;
  role: string;
  icon: LucideIcon;
  angle: number;
  accentClass: string;
  accentBg: string;
  accentText: string;
  pillars: { title: string; body: string }[];
  failure: string;
};

const NODES: Record<NodeKey, NodeMeta> = {
  website: {
    key: "website",
    title: "Website",
    short: "Where bookings happen",
    role: "Where every other piece sends visitors. This is where browsers turn into bookings, orders, and inquiries.",
    icon: Globe,
    angle: 0,
    accentClass: "from-gold-400 to-gold-600",
    accentBg: "bg-gold-500/12 ring-gold-500/30",
    accentText: "text-gold-400",
    pillars: [
      {
        title: "The simplest possible path to a reservation",
        body: "Phone-first, fast-loading, with one obvious next action on every screen: book a table, place an order, or submit an inquiry. Nothing between wanting to act and acting.",
      },
      {
        title: "Clear photos of the food and the room",
        body: "Real photography of the dishes and the space. Guests decide where to eat with their eyes — the site has to do the same job a window display does for a storefront.",
      },
      {
        title: "Found by both Google and AI",
        body: "We tag every part of the site so Google understands exactly what you serve. The result: you show up in Google search and get recommended by name in ChatGPT, Perplexity, and Google's AI answers.",
      },
    ],
    failure:
      "If the website is weak, every ad click and every social follower lands in a leaking bucket. The traffic shows up — but no one books.",
  },
  organic: {
    key: "organic",
    title: "Organic Social",
    short: "The brand builder",
    role: "Earns attention and turns scrollers into people who actually care about your restaurant. When they're ready, the website is one tap away.",
    icon: Megaphone,
    angle: 240,
    accentClass: "from-coral to-gold-500",
    accentBg: "bg-coral/12 ring-coral/30",
    accentText: "text-coral",
    pillars: [
      {
        title: "Build brand loyalty and awareness",
        body: "The whole point of organic (unpaid) social is to get people to care about the brand — not to sell. We post content that informs, entertains, or shows off the team and the room.",
      },
      {
        title: "Get followers to actually feel something",
        body: "A follower who doesn't care isn't worth much. We focus on posts that build a relationship — so when they see an ad later, or a friend recommends you, the name is already in their head.",
      },
      {
        title: "Hand them off to the website",
        body: "Every piece needs a finish line. Organic sends people who already trust you to the website — to book, order, or join the list. That's where the relationship turns into revenue.",
      },
    ],
    failure:
      "If organic is weak, no one knows your name when an ad shows up. Ads then cost more to get the same result — because you're starting from zero every time.",
  },
  paid: {
    key: "paid",
    title: "Paid Advertising",
    short: "The fast lane to bookings",
    role: "Google Ads + Meta + TikTok ads. Catches people who are already looking and turns them into a reservation today.",
    icon: Target,
    angle: 120,
    accentClass: "from-teal to-gold-500",
    accentBg: "bg-teal/12 ring-teal/30",
    accentText: "text-teal",
    pillars: [
      {
        title: "Built for people who are already looking",
        body: "Search ads catch guests the moment they type 'best brunch near me.' Social ads put offers in front of people who already know your name. The right message at the right moment.",
      },
      {
        title: "Turn the click into a booking, fast",
        body: "A paid ad has one job: turn the click into a customer. Every ad sends straight to a page built for that one action. No tour, no detour.",
      },
      {
        title: "Point everything at the website",
        body: "Just like organic, every paid ad sends people to the website to actually book. The site closes the deal. Paid just brings them to the door.",
      },
    ],
    failure:
      "If paid is weak, the slow burn of social never reaches dollars fast enough. Cash flow lags behind brand momentum, and you can't see the marketing actually paying off.",
  },
};

const ORDER: NodeKey[] = ["website", "organic", "paid"];

export function EcosystemPage() {
  const [open, setOpen] = useState<NodeKey | null>(null);
  const [broken, setBroken] = useState<NodeKey | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  function scrollToDetail() {
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  }

  function handleNodeClick(k: NodeKey) {
    const next = open === k ? null : k;
    setOpen(next);
    setBroken(null);
    if (next) scrollToDetail();
  }

  function handleBreakClick(k: NodeKey) {
    const next = broken === k ? null : k;
    setBroken(next);
    setOpen(null);
    if (next) scrollToDetail();
  }

  const hasDetail = open !== null || broken !== null;

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 pb-32 md:px-8 md:py-20 md:pb-28 lg:px-16 2xl:px-20">
      <SectionHeading
        eyebrow="The Ecosystem"
        title={
          <>
            <span className="block">Three channels.</span>
            <span className="block shimmer-text">One living system.</span>
          </>
        }
        subtitle="Marketing isn't three things bolted together. It works like a system: each piece feeds the others. Click any node to see what it does, or break one and see what happens to the rest."
      />

      <Diagram open={open} onNodeClick={handleNodeClick} broken={broken} />

      {/* Break-the-ecosystem controls */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <span className="eyebrow">Try this →</span>
        {ORDER.map((k) => {
          const isBroken = broken === k;
          return (
            <button
              key={k}
              onClick={() => handleBreakClick(k)}
              className={`group rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                isBroken
                  ? "border-coral/50 bg-coral/15 text-coral"
                  : "border-line text-cream-200 hover:border-coral/40 hover:text-coral"
              }`}
            >
              {isBroken ? "✕ " : ""}Break {NODES[k].title}
            </button>
          );
        })}
        {hasDetail && (
          <button
            onClick={() => { setOpen(null); setBroken(null); }}
            className="ml-2 text-xs text-cream-300 underline-offset-4 hover:underline"
          >
            Reset
          </button>
        )}
      </motion.div>

      {/* Unified detail panel — break warning and node detail are mutually exclusive */}
      <div ref={detailRef} className="scroll-mt-6">
        <AnimatePresence mode="wait">
          {open && (
            <motion.div
              key={`node-${open}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8"
            >
              <NodeDetail node={NODES[open]} onClose={() => setOpen(null)} />
            </motion.div>
          )}
          {broken && !open && (
            <motion.div
              key={`break-${broken}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mx-auto mt-8 max-w-3xl"
            >
              <Panel
                motion={false}
                padding="compact"
                className="border-coral/40 bg-coral/8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-coral/15 ring-1 ring-coral/30">
                    <AlertTriangle className="size-5 text-coral" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-coral">
                      What happens when {NODES[broken].title} breaks
                    </div>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-cream-100">
                      {NODES[broken].failure}
                    </p>
                  </div>
                </div>
              </Panel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mt-16 md:mt-20"
      >
        <Panel>
          <div className="flex items-start gap-4">
            <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-xl bg-gold-500/15 ring-1 ring-gold-500/30">
              <Sparkles className="size-5 text-gold-400" />
            </div>
            <div>
              <div className="font-display text-lg font-bold text-cream-50 md:text-xl">
                Pull on one. The others move with it.
              </div>
              <p className="mt-2 text-[15px] leading-relaxed text-cream-200">
                When all three are healthy, each one performs better than it
                would on its own. When one is weak, the others carry the load
                until they can't. That's why the rest of this deck shows one
                program — not three separate invoices.
              </p>
            </div>
          </div>
        </Panel>
      </motion.div>
    </div>
  );
}

/* ─────── The interactive diagram ─────── */

function Diagram({
  open,
  onNodeClick,
  broken,
}: {
  open: NodeKey | null;
  onNodeClick: (k: NodeKey) => void;
  broken: NodeKey | null;
}) {
  return (
    <div className="relative mx-auto mt-12 aspect-square w-full max-w-[560px] md:mt-16">
      {/* Orbiting ring */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2a84d" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#d06a50" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#45b08c" stopOpacity="0.4" />
          </linearGradient>
          <marker
            id="arrowGold"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#e2a84d" />
          </marker>
          <marker
            id="arrowDim"
            viewBox="0 0 10 10"
            refX="6"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#9a6f2e" opacity="0.4" />
          </marker>
        </defs>

        {/* Outer animated ring */}
        <motion.circle
          cx="200"
          cy="200"
          r="160"
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="1.5"
          strokeDasharray="3 7"
          animate={{ rotate: broken ? 0 : 360 }}
          transition={{
            duration: 60,
            repeat: broken ? 0 : Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "200px 200px" }}
          opacity={broken ? 0.25 : 1}
        />

        {/* Three arc segments going around */}
        {ORDER.map((k, i) => {
          const fromAngle = NODES[k].angle;
          const toAngle = NODES[ORDER[(i + 1) % ORDER.length]].angle;
          const isBrokenSegment = broken === k || broken === ORDER[(i + 1) % ORDER.length];
          return (
            <ArcArrow
              key={k}
              fromAngle={fromAngle}
              toAngle={toAngle}
              dimmed={!!broken && isBrokenSegment}
            />
          );
        })}

        {/* Inward arrows: organic → website, paid → website */}
        <InwardArrow
          fromAngle={NODES.organic.angle}
          dimmed={broken === "organic" || broken === "website"}
        />
        <InwardArrow
          fromAngle={NODES.paid.angle}
          dimmed={broken === "paid" || broken === "website"}
        />
      </svg>

      {/* Center label */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="eyebrow text-[10px]">The Ecosystem</div>
        <div className="font-accent mt-1 text-base italic text-cream-300 md:text-lg">
          everything points to{" "}
          <span className="text-gold-400">bookings</span>
        </div>
      </div>

      {/* Three nodes positioned on the circle */}
      {ORDER.map((k) => {
        const node = NODES[k];
        const isOpen = open === k;
        const isBroken = broken === k;
        const a = (node.angle - 90) * (Math.PI / 180);
        const cx = 50 + (Math.cos(a) * 40);
        const cy = 50 + (Math.sin(a) * 40);
        return (
          <button
            key={k}
            onClick={() => onNodeClick(k)}
            className={`group absolute flex flex-col items-center transition-all ${
              isBroken ? "opacity-40 grayscale" : ""
            }`}
            style={{
              left: `${cx}%`,
              top: `${cy}%`,
              transform: "translate(-50%, -50%)",
            }}
            aria-label={`${node.title}: click to expand`}
          >
            <motion.div
              animate={{
                scale: isOpen ? 1.08 : 1,
                rotate: isBroken ? -5 : 0,
              }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3 }}
              className={`flex size-20 items-center justify-center rounded-full bg-gradient-to-br ${
                node.accentClass
              } shadow-2xl ring-4 transition-all md:size-24 ${
                isOpen
                  ? "ring-gold-500/60"
                  : "ring-bg-0/60 group-hover:ring-gold-500/40"
              }`}
            >
              <node.icon
                className="size-9 text-bg-0 md:size-10"
                strokeWidth={2.4}
              />
            </motion.div>
            <div className="mt-3 text-center">
              <div className="font-display text-sm font-bold tracking-tight text-cream-50 md:text-base">
                {node.title}
              </div>
              <div className="text-[10px] text-cream-300 md:text-[11px]">
                {node.short}
              </div>
            </div>
            {isBroken && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full border border-coral/50 bg-bg-0 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-coral">
                Broken
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ArcArrow({
  fromAngle,
  toAngle,
  dimmed,
}: {
  fromAngle: number;
  toAngle: number;
  dimmed: boolean;
}) {
  const r = 130;
  const cx = 200;
  const cy = 200;
  const a1 = (fromAngle - 90) * (Math.PI / 180);
  const a2 = (toAngle - 90) * (Math.PI / 180);
  const offset = 0.35;
  const start = {
    x: cx + Math.cos(a1 + offset) * r,
    y: cy + Math.sin(a1 + offset) * r,
  };
  const end = {
    x: cx + Math.cos(a2 - offset) * r,
    y: cy + Math.sin(a2 - offset) * r,
  };
  return (
    <path
      d={`M ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y}`}
      fill="none"
      stroke={dimmed ? "#9a6f2e" : "#e2a84d"}
      strokeOpacity={dimmed ? 0.3 : 0.7}
      strokeWidth="2"
      markerEnd={dimmed ? "url(#arrowDim)" : "url(#arrowGold)"}
      strokeDasharray={dimmed ? "4 6" : ""}
    />
  );
}

function InwardArrow({
  fromAngle,
  dimmed,
}: {
  fromAngle: number;
  dimmed: boolean;
}) {
  const r = 130;
  const cx = 200;
  const cy = 200;
  const a = (fromAngle - 90) * (Math.PI / 180);
  const fromX = cx + Math.cos(a) * (r - 28);
  const fromY = cy + Math.sin(a) * (r - 28);
  const wAngle = (NODES.website.angle - 90) * (Math.PI / 180);
  const toX = cx + Math.cos(wAngle) * (r - 28);
  const toY = cy + Math.sin(wAngle) * (r - 28);
  return (
    <line
      x1={fromX}
      y1={fromY}
      x2={toX}
      y2={toY}
      stroke={dimmed ? "#9a6f2e" : "#e8b65e"}
      strokeOpacity={dimmed ? 0.3 : 0.55}
      strokeWidth="1.5"
      markerEnd={dimmed ? "url(#arrowDim)" : "url(#arrowGold)"}
      strokeDasharray={dimmed ? "3 5" : "5 5"}
    />
  );
}

function NodeDetail({ node, onClose }: { node: NodeMeta; onClose: () => void }) {
  return (
    <Panel motion={false}>
      <div className="flex items-start gap-4">
        <div
          className={`flex size-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${node.accentClass} shadow-lg`}
        >
          <node.icon className="size-6 text-bg-0" strokeWidth={2.4} />
        </div>
        <div className="flex-1">
          <div className={`eyebrow ${node.accentText}`}>{node.short}</div>
          <h3 className="mt-1 font-display text-2xl font-bold text-cream-50 md:text-3xl">
            {node.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-cream-200 md:text-base">
            {node.role}
          </p>
        </div>
        <button
          onClick={onClose}
          className="flex size-9 items-center justify-center rounded-full border border-line bg-surface text-cream-300 transition hover:border-cream-100 hover:text-cream-50"
          aria-label="Close detail"
        >
          <X className="size-4" />
        </button>
      </div>

      <HrSoft className="my-6" />

      <div className="space-y-5">
        {node.pillars.map((p, i) => (
          <div key={p.title}>
            {i > 0 && <HrSoft className="mb-5" />}
            <div className="flex items-start gap-4">
              <div
                className={`flex size-7 flex-shrink-0 items-center justify-center rounded-full ring-1 ${node.accentBg}`}
              >
                <span
                  className={`font-display text-xs font-bold ${node.accentText}`}
                >
                  {i + 1}
                </span>
              </div>
              <div>
                <h4 className="font-display text-base font-bold text-cream-50">
                  {p.title}
                </h4>
                <p className="mt-1.5 text-[15px] leading-relaxed text-cream-200">
                  {p.body}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {node.key !== "website" && (
        <div className="mt-6 flex items-center gap-2 rounded-xl border border-line-soft bg-surface p-4">
          <div className="flex items-center gap-2 text-[13px] text-cream-200">
            <span className={`font-display font-bold ${node.accentText}`}>
              {node.title}
            </span>
            <ArrowRight className="size-3.5 text-gold-500" />
            <span className="font-display font-bold text-gold-400">Website</span>
            <span className="text-cream-300">that's where the booking happens.</span>
          </div>
        </div>
      )}
    </Panel>
  );
}
