"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { animate, useMotionValue, useMotionValueEvent } from "motion/react";

export type DropdownItem = {
  label: string;
  onClick?: () => void;
};

type SpringConfig = {
  type: "spring";
  stiffness?: number;
  damping?: number;
  mass?: number;
  bounce?: number;
  visualDuration?: number;
};

export type GooDropdownProps = {
  trigger?: string;
  items?: DropdownItem[];
  width?: number;
  align?: "start" | "end";
  gap?: number;
  itemHeight?: number;
  buttonRadius?: number;
  panelRadius?: number;
  fill?: string;
  gooStrength?: number;
  spring?: SpringConfig;
  className?: string;
};

const BTN_W = 78;
const BTN_H = 34;
const PANEL_PAD = 6;
const FILL = "#ececef";

const DEFAULT_ITEMS: DropdownItem[] = [
  { label: "Copy link", onClick: () => {} },
  { label: "Share on X", onClick: () => {} },
  { label: "Embed", onClick: () => {} },
];

const DEFAULT_SPRING: SpringConfig = {
  type: "spring",
  visualDuration: 0.3,
  bounce: 0.3,
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** A rounded rectangle as a CSS `shape()`, corners drawn with cubic beziers. */
function roundedRectShape(
  x: number,
  y: number,
  w: number,
  h: number,
  radius: number,
) {
  const r = Math.max(0, Math.min(radius, w / 2, h / 2));
  const k = r * 0.5523; // circle-arc bezier constant
  const x1 = x;
  const y1 = y;
  const x2 = x + w;
  const y2 = y + h;
  const p = (n: number) => `${n.toFixed(3)}px`;

  return (
    `shape(from ${p(x1 + r)} ${p(y1)}, ` +
    `line to ${p(x2 - r)} ${p(y1)}, ` +
    `curve to ${p(x2)} ${p(y1 + r)} with ${p(x2 - r + k)} ${p(y1)} / ${p(x2)} ${p(y1 + r - k)}, ` +
    `line to ${p(x2)} ${p(y2 - r)}, ` +
    `curve to ${p(x2 - r)} ${p(y2)} with ${p(x2)} ${p(y2 - r + k)} / ${p(x2 - r + k)} ${p(y2)}, ` +
    `line to ${p(x1 + r)} ${p(y2)}, ` +
    `curve to ${p(x1)} ${p(y2 - r)} with ${p(x1 + r - k)} ${p(y2)} / ${p(x1)} ${p(y2 - r + k)}, ` +
    `line to ${p(x1)} ${p(y1 + r)}, ` +
    `curve to ${p(x1 + r)} ${p(y1)} with ${p(x1)} ${p(y1 + r - k)} / ${p(x1 + r - k)} ${p(y1)}, ` +
    `close)`
  );
}

export function GooDropdown({
  trigger = "Share",
  items = DEFAULT_ITEMS,
  width = 240,
  align = "end",
  gap = 18,
  itemHeight = 40,
  buttonRadius = 12,
  panelRadius = 20,
  fill = FILL,
  gooStrength = 8,
  spring = DEFAULT_SPRING,
  className,
}: GooDropdownProps) {
  const [open, setOpen] = useState(false);
  const filterId = useId().replace(/[:]/g, "");

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const geo = useMemo(() => {
    const panelTop = BTN_H + gap;
    const panelH = items.length * itemHeight + PANEL_PAD * 2;
    const btnX = align === "end" ? width - BTN_W : 0;
    const closed = { x: btnX, y: 0, w: BTN_W, h: BTN_H, r: buttonRadius };
    const open = { x: 0, y: panelTop, w: width, h: panelH, r: panelRadius };
    return { panelTop, panelH, btnX, closed, open, layerH: panelTop + panelH };
  }, [items.length, width, align, gap, itemHeight, buttonRadius, panelRadius]);

  const shapeAt = useMemo(() => {
    const { closed, open } = geo;
    return (t: number) =>
      roundedRectShape(
        lerp(closed.x, open.x, t),
        lerp(closed.y, open.y, t),
        lerp(closed.w, open.w, t),
        lerp(closed.h, open.h, t),
        lerp(closed.r, open.r, t),
      );
  }, [geo]);

  const closedShape = shapeAt(0);

  const progress = useMotionValue(0);

  useMotionValueEvent(progress, "change", (v) => {
    const shape = shapeAt(v);
    if (panelRef.current) panelRef.current.style.clipPath = shape;
    if (contentRef.current) contentRef.current.style.clipPath = shape;
  });

  useEffect(() => {
    const animation = animate(progress, open ? 1 : 0, spring);
    return () => animation.stop();
  }, [open, progress, spring]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (item: DropdownItem) => {
    item.onClick?.();
    setOpen(false);
  };

  return (
    <div
      ref={rootRef}
      className={`relative select-none ${className ?? ""}`}
      style={{ width, height: geo.layerH }}
    >
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id={filterId}>
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={gooStrength}
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* goo blob layer: trigger pill + morphing panel */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ filter: `url(#${filterId})` }}
      >
        <div
          className="absolute top-0"
          style={{
            left: geo.btnX,
            width: BTN_W,
            height: BTN_H,
            borderRadius: buttonRadius,
            background: fill,
          }}
        />
        <div
          ref={panelRef}
          className="absolute inset-0"
          style={{ background: fill, clipPath: closedShape }}
        />
      </div>

      {/* crisp content layer */}
      <div className="absolute inset-0">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="absolute top-0 flex items-center justify-center text-[15px] text-neutral-900"
          style={{
            left: geo.btnX,
            width: BTN_W,
            height: BTN_H,
            borderRadius: buttonRadius,
          }}
        >
          {trigger}
        </button>

        {/* items are always rendered; the clip-path reveals them */}
        <div
          ref={contentRef}
          role="menu"
          className="absolute inset-0"
          style={{
            clipPath: closedShape,
            pointerEvents: open ? "auto" : "none",
          }}
        >
          <div
            className="absolute inset-x-0"
            style={{
              top: geo.panelTop,
              height: geo.panelH,
              padding: PANEL_PAD,
            }}
          >
            {items.map((item) => (
              <button
                key={item.label}
                role="menuitem"
                type="button"
                tabIndex={open ? 0 : -1}
                onClick={() => select(item)}
                style={{ height: itemHeight }}
                className="flex w-full items-center rounded-[14px] px-3 text-left text-[15px] text-neutral-500 transition-colors hover:bg-black/5 hover:text-neutral-900"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const controls = {
  width: [240, 160, 360, 10],
  align: { type: "select", options: ["start", "end"], default: "end" },
  gap: [18, 0, 60, 1],
  itemHeight: [40, 28, 64, 1],
  buttonRadius: [12, 0, 24, 1],
  panelRadius: [20, 0, 32, 1],
  gooStrength: [8, 0, 20, 1],
  fill: FILL,
  spring: { type: "spring", visualDuration: 0.3, bounce: 0.3 },
};

export default function GooeyDropdown(props: GooDropdownProps) {
  return (
    <div className="flex h-dvh w-full items-center justify-center">
      <GooDropdown {...props} />
    </div>
  );
}
