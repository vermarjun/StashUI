"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  Smartphone,
  Tablet,
  Monitor,
  RotateCw,
  ArrowUpRight,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "@/components/site/code-block";
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

/** Smallest stage we ever show, and how much of the window it may take. */
const MIN_STAGE = 520;

/**
 * The detail-page stage: the real, fully interactive component plus its usage
 * code, behind a Preview / Code switch.
 *
 * The iframe is sized to the chosen device width and the stage height and is
 * NOT transform-scaled, so inside it `100vw`/`100vh` are the stage and the
 * component reflows like a real screen. The stage fills the content column and
 * most of the window height, so a hero gets a laptop-sized viewport rather
 * than a tablet-sized one. Taller layouts scroll inside.
 */
export function DetailPreview({
  name,
  title,
  demoHtml,
  demoCode,
}: {
  name: string;
  title: string;
  demoHtml?: string;
  demoCode?: string;
}) {
  const cfg = getPreview(name);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "light" ? "light" : "dark";

  const boxRef = React.useRef<HTMLDivElement>(null);
  const [boxWidth, setBoxWidth] = React.useState(0);
  const [device, setDevice] = React.useState<PreviewDevice>(cfg.device);
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const [mounted, setMounted] = React.useState(false);
  const [nonce, setNonce] = React.useState(0);
  const [loaded, setLoaded] = React.useState(false);
  const [fullscreen, setFullscreen] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setBoxWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [tab]);

  React.useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === boxRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // Desktop fills the stage; narrower devices render at their real width,
  // centered (never wider than the stage — no horizontal scroll).
  const targetWidth =
    device === "desktop" ? boxWidth : Math.min(DEVICE_WIDTHS[device], boxWidth);
  const frameWidth = boxWidth ? Math.max(280, targetWidth) : 0;

  const src =
    `/preview/${encodeURIComponent(name)}` +
    `?view=detail&theme=${theme}&align=${cfg.align}&scroll=${cfg.scroll}`;

  const frameKey = `${theme}-${device}-${nonce}`;
  React.useEffect(() => setLoaded(false), [frameKey]);

  const stageHeight = fullscreen
    ? "100vh"
    : `clamp(${MIN_STAGE}px, calc(100vh - 220px), ${Math.max(cfg.height, 640)}px)`;

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="inline-flex items-center rounded-lg border border-border bg-muted/30 p-0.5 text-sm">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              aria-pressed={tab === t}
              className={cn(
                "rounded-md px-3 py-1 capitalize text-muted-foreground transition-colors hover:text-foreground",
                tab === t && "bg-background text-foreground shadow-sm",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "preview" && (
          <div className="flex items-center gap-1">
            <div className="hidden items-center gap-0.5 rounded-lg border border-border bg-muted/30 p-0.5 sm:inline-flex">
              {DEVICES.map(({ key, icon: Icon, label }) => (
                <ToolButton
                  key={key}
                  label={label}
                  pressed={device === key}
                  onClick={() => setDevice(key)}
                >
                  <Icon className="size-3.5" />
                </ToolButton>
              ))}
            </div>
            <div className="inline-flex items-center gap-0.5 rounded-lg border border-border bg-muted/30 p-0.5">
              <ToolButton label="Replay" onClick={() => setNonce((n) => n + 1)}>
                <RotateCw className="size-3.5" />
              </ToolButton>
              <ToolButton
                label={fullscreen ? "Exit full screen" : "Full screen"}
                onClick={() => {
                  if (document.fullscreenElement) void document.exitFullscreen();
                  else void boxRef.current?.requestFullscreen?.();
                }}
              >
                {fullscreen ? (
                  <Minimize2 className="size-3.5" />
                ) : (
                  <Maximize2 className="size-3.5" />
                )}
              </ToolButton>
              <a
                href={src}
                target="_blank"
                rel="noreferrer"
                aria-label="Open in a new tab"
                title="Open in a new tab"
                className="inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
              >
                <ArrowUpRight className="size-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>

      {tab === "preview" ? (
        <div
          ref={boxRef}
          className={cn(
            "relative flex w-full justify-center overflow-hidden rounded-xl border border-border bg-background",
            fullscreen && "rounded-none border-0",
            BACKDROP[cfg.background],
          )}
          style={{ height: stageHeight }}
        >
          {mounted && frameWidth > 0 ? (
            <iframe
              key={frameKey}
              src={src}
              title={`${title} preview`}
              onLoad={() => setLoaded(true)}
              style={{ width: fullscreen ? "100%" : frameWidth, height: "100%" }}
              className={cn(
                "border-0 bg-background transition-opacity duration-300",
                loaded ? "opacity-100" : "opacity-0",
                device !== "desktop" && "border-x border-border",
              )}
            />
          ) : null}
          {!loaded && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="size-5 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground" />
            </div>
          )}
        </div>
      ) : demoHtml && demoCode ? (
        <CodeBlock
          html={demoHtml}
          code={demoCode}
          maxHeight={9999}
          className="min-h-[320px]"
        />
      ) : (
        <p className="rounded-xl border border-border p-8 text-sm text-muted-foreground">
          No usage example for this component.
        </p>
      )}
    </div>
  );
}

function ToolButton({
  label,
  pressed,
  onClick,
  children,
}: {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={pressed}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground",
        pressed && "bg-background text-foreground shadow-sm",
      )}
    >
      {children}
    </button>
  );
}
