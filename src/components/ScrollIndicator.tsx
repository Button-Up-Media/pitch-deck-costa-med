import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Floating bounce-arrow that hints "there's more below."
 *
 * Visibility rules:
 *   - Hidden once user has scrolled past 300px from the top (they've shown they
 *     know how to scroll, so it gets out of the way)
 *   - Hidden once user is within 200px of the bottom (no more content below)
 *   - Hidden on pages where the document doesn't actually scroll (no point)
 *
 * Respects prefers-reduced-motion: the bounce keyframe is suppressed via CSS.
 */
export function ScrollIndicator() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const compute = () => {
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      // If the page barely scrolls, never show the hint.
      if (docHeight - viewport < 80) {
        setVisible(false);
        return;
      }
      const distanceFromBottom = docHeight - (scrollY + viewport);
      const show = scrollY < 300 && distanceFromBottom > 200;
      setVisible(show);
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    // Recompute after layout settles (images, fonts, etc.)
    const t = window.setTimeout(compute, 400);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll for more"
      onClick={() =>
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" })
      }
      className="scroll-indicator-fab"
      style={{ pointerEvents: visible ? "auto" : "none", opacity: visible ? 0.7 : 0 }}
    >
      <ChevronDown className="scroll-indicator-icon" strokeWidth={2.4} />
    </button>
  );
}

/**
 * Inline "scroll to explore" hint shown below a section heading. Disappears
 * permanently once it scrolls out of view (via IntersectionObserver) so it
 * never lingers after the user has already proven they're scrolling.
 */
export function SectionScrollHint({ label = "scroll to explore" }: { label?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // Once it leaves the viewport, hide permanently.
          if (!e.isIntersecting && e.boundingClientRect.top < 0) {
            setHidden(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={ref}
      className="mt-4 flex items-center justify-center gap-2 text-xs italic text-cream-400 md:justify-start"
    >
      <ChevronDown className="size-3.5 scroll-indicator-bounce" strokeWidth={2.4} />
      <span>{label}</span>
    </div>
  );
}
