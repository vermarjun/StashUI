"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Smartphone, Tablet, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getPreview,
  DEVICE_WIDTHS,
  type PreviewDevice,
} from "@/__registry__/previews.gen";

const DEVICES: { key: PreviewDevice; icon: typeof Monitor; label: string }[] = [
  { key: "mobile", icon: Smartphone, label: "Mobile" },
  { key: "tablet", icon: Tablet, label: "Tablet" },
  { key: "desktop", icon: Monitor, label: "Desktop" },
];

const BACKDROP: Record<string, string> = {
  none: "",
  dots: "bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] [background-size:16px_16px]",
  grid: "bg-[linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] [background-size:24px_24px]",
  checker: "bg-muted/30",
};

/**
 * The detail-page live preview.
 *
 * Unlike the grid thumbnail, this is the real, fully-interactive component. The
 * iframe is sized to the chosen device width and the box height — and is NOT
 * transform-scaled — so inside it `100vw`/`100vh` map to the box and the
 * component reflows to it like a real screen. Taller-than-box / multi-screen
 * layouts (heroes) scroll inside the box. The device toggle re-sizes the
 * viewport live, so media queries respond exactly as they would in a browser.
 */
export function DetailPreview({ name }: { name: string }) {
  const cfg = getPreview(name);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  const boxRef = React.useRef<HTMLDivElement>(null);
  const [boxWidth, setBoxWidth] = React.useState(0);
  const [device, setDevice] = React.useState<PreviewDevice>(cfg.device);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setBoxWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Desktop fills the box; narrower devices render at their real width, centered
  // (never wider than the box — no horizontal scroll).
  const targetWidth =
    device === "desktop" ? boxWidth : Math.min(DEVICE_WIDTHS[device], boxWidth);
  const frameWidth = boxWidth ? Math.max(280, targetWidth) : 0;

  const src =
    `/preview/${encodeURIComponent(name)}` +
    `?view=detail&theme=${theme}&align=${cfg.align}&scroll=${cfg.scroll}`;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-0.5 rounded-lg border border-border bg-card/40 p-0.5">
          {DEVICES.map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setDevice(key)}
              aria-pressed={device === key}
              aria-label={label}
              title={label}
              className={cn(
                "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground",
                device === key && "bg-muted text-foreground",
              )}
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
        <span className="font-mono text-xs text-muted-foreground">
          {device === "desktop" ? "responsive" : `${DEVICE_WIDTHS[device]}px`} ·{" "}
          {cfg.height}px
        </span>
      </div>

      <div
        ref={boxRef}
        className={cn(
          "relative flex w-full justify-center overflow-hidden rounded-xl border border-border",
          BACKDROP[cfg.background],
        )}
        style={{ height: cfg.height }}
      >
        {mounted && frameWidth > 0 ? (
          <iframe
            key={`${theme}-${device}`}
            src={src}
            title={name}
            style={{ width: frameWidth, height: cfg.height }}
            className={cn(
              "border-0 bg-background",
              device !== "desktop" && "border-x border-border",
            )}
          />
        ) : (
          <div className="absolute inset-0 animate-pulse bg-muted/10" />
        )}
      </div>
    </div>
  );
}
