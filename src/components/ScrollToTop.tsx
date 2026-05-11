import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Resets window scroll to the top on every route change.
 *
 * Mounted directly inside <BrowserRouter> so the effect fires before
 * Layout / Outlet children render their own scroll-aware effects.
 *
 * Uses useLayoutEffect (pre-paint) + behavior: "instant" so the user
 * never sees a flash of the previous scroll position.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // Belt-and-suspenders: both the modern API and the legacy properties,
    // because Safari historically has been flaky about scrollTo on full-page
    // route swaps mid-animation.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
