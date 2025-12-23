"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps {
  name: string;
  className?: string;
  /** Viewport width the component renders at before being scaled to fit. */
  designWidth?: number;
  /** Always active (detail page) — never deactivates. */
  eager?: boolean;
  /** Allow interacting with the component (detail page). Grid cards are not. */
  interactive?: boolean;
}

/**
 * Isolated, auto-fitting component preview.
 *
 * - Isolation: renders `/preview/<name>` in its own <iframe>; styles, portals,
 *   fixed elements, and listeners can't leak onto the gallery.
 * - Fit: the iframe is a fixed 1200×750 viewport, then transform-scaled to the
 *   card's measured width — so any component (tiny button → giant hero) fits the
 *   box at the right aspect ratio with no overflow.
 * - Compute: only mounted while in/near view; unmounts ~0.7s after leaving,
 *   stopping its animation/WebGL work.
 */
export function ComponentPreview({
  name,
  className,
  designWidth = 900,
  eager = false,
  interactive = false,
}: ComponentPreviewProps) {
  const { resolvedTheme } = useTheme();
  const ref = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [active, setActive] = React.useState(eager);
  const [scale, setScale] = React.useState(0);

  const DESIGN_W = designWidth;
  const DESIGN_H = Math.round((designWidth * 5) / 8); // 16:10

  React.useEffect(() => setMounted(true), []);

  // measure the box width → scale the design viewport to fit it
  React.useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      if (w) setScale(w / DESIGN_W);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [DESIGN_W]);

  // activate only while near the viewport
  React.useEffect(() => {
    if (eager) return;
    const el = ref.current;
    if (!el) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries[0]?.isIntersecting;
        clearTimeout(timer);
        if (inView) setActive(true);
        else timer = setTimeout(() => setActive(false), 700);
      },
      { rootMargin: "250px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, [eager]);

  const theme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <div
      ref={ref}
      className={cn(
        "relative aspect-[8/5] w-full overflow-hidden bg-background",
        className,
      )}
    >
      {active && mounted && scale > 0 ? (
        <iframe
          key={theme}
          src={`/preview/${encodeURIComponent(name)}?theme=${theme}`}
          title={name}
          loading="lazy"
          style={{
            width: DESIGN_W,
            height: DESIGN_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          className={cn(
            "absolute left-0 top-0 border-0 bg-background",
            !interactive && "pointer-events-none",
          )}
        />
      ) : (
        // blends with the cell while loading/off-screen — no boxed outline
        <div className="absolute inset-0 animate-pulse bg-muted/10" />
      )}
    </div>
  );
}
