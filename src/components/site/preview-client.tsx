"use client";

import * as React from "react";
import { demos, demoLoaders } from "@/__registry__/demos.gen";
import { PreviewErrorBoundary } from "@/components/site/preview-error-boundary";

declare global {
  interface Window {
    /** Set once the demo module + fonts are loaded (manual-mount mode). */
    __stashuiReady?: boolean;
    /** Mount the demo now (manual-mount mode). Used by the video recorder. */
    __stashuiMount?: () => void;
  }
}

/**
 * Renders a component's demo.
 *
 * `manual` (used by the video recorder via `?mount=manual`): load the demo's
 * code and fonts first, render nothing, and only mount when the recorder calls
 * `window.__stashuiMount()`. The take then starts on a page that is already
 * loaded, and any entrance animation plays on camera instead of a reload.
 */
export function PreviewClient({
  name,
  manual = false,
  dark = false,
}: {
  name: string;
  manual?: boolean;
  /** Put the theme on <html> so portalled UI (popovers, drawers, toasts) that
   *  renders outside the preview wrapper gets it too. */
  dark?: boolean;
}) {
  const Demo = demos[name];
  const [mounted, setMounted] = React.useState(!manual);

  React.useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  // Recording mode: links must not behave like links. Hovering an <a href>
  // makes Chrome paint its URL status bubble into the take, and a take that
  // clicks one navigates the recording away. Park every href on data-href
  // (keeping the pointer cursor) for the whole take, including links that
  // mount later.
  React.useEffect(() => {
    if (!manual) return;
    const park = (root: ParentNode) => {
      root.querySelectorAll?.("a[href]:not([href^='#'])").forEach((a) => {
        a.setAttribute("data-href", a.getAttribute("href") ?? "");
        a.removeAttribute("href");
        // keep it a link for the take scripts (getByRole("link"))
        if (!a.hasAttribute("role")) a.setAttribute("role", "link");
        (a as HTMLElement).style.cursor = "pointer";
      });
    };
    park(document);
    const mo = new MutationObserver(() => park(document));
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["href"] });
    return () => mo.disconnect();
  }, [manual]);

  React.useEffect(() => {
    if (!manual) return;
    let cancelled = false;
    const load = demoLoaders[name];
    Promise.all([load ? load() : null, document.fonts?.ready]).then(() => {
      if (cancelled) return;
      window.__stashuiMount = () => setMounted(true);
      window.__stashuiReady = true;
    });
    return () => {
      cancelled = true;
    };
  }, [manual, name]);

  if (!Demo) {
    return (
      <span className="text-sm text-muted-foreground">No preview available</span>
    );
  }
  if (!mounted) return null;
  return (
    <PreviewErrorBoundary name={name}>
      <React.Suspense fallback={null}>
        <Demo />
      </React.Suspense>
    </PreviewErrorBoundary>
  );
}
