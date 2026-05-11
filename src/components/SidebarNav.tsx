import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useDeckOrder, SLIDE_LABELS } from "../lib/useDeckOrder";
import { SERVICES, SERVICE_ORDER } from "../config/services";
import { config } from "../config/client";
import { Logo } from "./Logo";

function labelFor(path: string) {
  if (SLIDE_LABELS[path]) return SLIDE_LABELS[path];
  const svc = SERVICE_ORDER.find((k) => SERVICES[k].route === path);
  return svc ? SERVICES[svc].short : path;
}

export function SidebarNav() {
  const location = useLocation();
  const order = useDeckOrder();
  const idx = order.indexOf(location.pathname);

  return (
    <aside className="fixed right-0 top-0 z-40 hidden h-screen w-64 md:block xl:w-72">
      <div className="absolute left-0 top-1/2 h-72 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />
      <div className="relative flex h-full flex-col px-5 pt-10 xl:px-7 xl:pt-12">
        <div className="flex items-center gap-3">
          <Logo size="nav" />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-[13px] font-bold tracking-[-0.02em] text-cream-50">
              {config.agency.name}
            </span>
            <span className="text-[10px] tracking-[0.18em] text-cream-300">
              for {config.client.shortName}
            </span>
          </div>
        </div>

        <div className="nav-scroll mt-10 flex-1 space-y-0.5 overflow-y-auto">
          <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream-300">
            Slides
          </div>
          {order.map((path, i) => {
            const active = i === idx;
            return (
              <Link
                key={path}
                to={path}
                className={`group flex items-center gap-3 rounded-lg py-2 pl-2 pr-2 transition-colors ${
                  active
                    ? "bg-gold-soft text-cream-50"
                    : "text-cream-300 hover:text-cream-100"
                }`}
              >
                <span
                  className={`w-7 font-display text-[10px] tracking-wider ${
                    active ? "text-gold-400" : "text-cream-300/60"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`block h-px flex-shrink-0 transition-all ${
                    active
                      ? "w-4 bg-gold-500"
                      : "w-2 bg-cream-300/30 group-hover:w-3 group-hover:bg-gold-500/60"
                  }`}
                />
                <span className="truncate text-[13px] font-semibold">
                  {labelFor(path)}
                </span>
              </Link>
            );
          })}
        </div>

        <NavCta />

        <div className="border-t border-line-soft px-2 py-4 text-[10px] tracking-wider text-cream-300/60">
          Use ← → to navigate
        </div>
      </div>
    </aside>
  );
}

/**
 * Persistent "call or text us" CTA pinned above the keyboard-hint footer in
 * the desktop sidebar. Hidden on mobile (the parent <aside> is already md+).
 *
 * Renders as a non-clickable styled block when phoneNumber is "[__]" so the
 * template placeholder stays visible during editing.
 */
function NavCta() {
  const phone = config.phoneNumber;
  const isBlank = phone === "[__]";
  const cls =
    "block w-full rounded-lg border border-gold-500/40 bg-gold-500/15 px-3 py-3 text-center transition-colors";

  const inner = (
    <>
      <div className="text-xs font-medium text-gold-500">
        Ready to move forward?
      </div>
      <div className="mt-0.5 text-xs text-cream-400">Call or text us</div>
    </>
  );

  if (isBlank) {
    return <div className={`${cls} mt-4 cursor-default`}>{inner}</div>;
  }
  return (
    <a
      href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
      className={`${cls} mt-4 cursor-pointer hover:bg-gold-500/25`}
    >
      {inner}
    </a>
  );
}

export function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = useDeckOrder();
  const idx = order.indexOf(location.pathname);
  if (idx === -1) return null;
  const prev = order[idx - 1];
  const next = order[idx + 1];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-line-soft bg-[rgba(10,10,10,0.92)] backdrop-blur-md md:hidden">
      <div className="flex items-center justify-between px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <button
          onClick={() => prev && navigate(prev)}
          disabled={!prev}
          className="flex min-w-0 items-center gap-2 text-cream-300 transition-colors active:text-cream-50 disabled:opacity-30"
          aria-label="Previous slide"
        >
          <ArrowLeft className="size-5 flex-shrink-0" />
          <span className="truncate text-[13px]">
            {prev ? labelFor(prev) : ""}
          </span>
        </button>
        <span className="px-3 font-display text-[10px] tracking-widest text-gold-400">
          {String(idx + 1).padStart(2, "0")} / {String(order.length).padStart(2, "0")}
        </span>
        <button
          onClick={() => next && navigate(next)}
          disabled={!next}
          className="flex min-w-0 items-center justify-end gap-2 text-cream-100 transition-colors active:text-cream-50 disabled:opacity-30"
          aria-label="Next slide"
        >
          <span className="truncate text-[13px] font-semibold">
            {next ? labelFor(next) : ""}
          </span>
          <ArrowRight className="size-5 flex-shrink-0" />
        </button>
      </div>
    </nav>
  );
}
