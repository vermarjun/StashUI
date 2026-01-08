"use client";

import * as React from "react";
import type { HexColor, HslaColor, HsvaColor, RgbaColor } from "@uiw/color-convert";
import {
  hexToHsva,
  hslaToHsva,
  hsvaToHex,
  hsvaToHsla,
  hsvaToRgba,
  rgbaToHsva,
} from "@uiw/color-convert";
import { ContrastRatio, ObjectColorInput } from "@/registry/inspira-react/color-picker-internals";

// ── Types ──────────────────────────────────────────────────────────────────

export interface ColorPickerValue {
  hex: string;
  hsl: HslaColor;
  hsla: HslaColor;
  rgb: RgbaColor;
  rgba: RgbaColor;
}

export type ColorType = "hsl" | "hsla" | "rgb" | "rgba" | "hex";

export interface ColorPickerProps {
  /** Controlled colour value. */
  value?: `#${string}` | HsvaColor | HslaColor | RgbaColor;
  /** Default output format shown in the input. */
  type?: ColorType;
  /** Extra swatches to show (hex strings). */
  swatches?: HexColor[];
  /** Hide the WCAG contrast ratio panel. */
  hideContrastRatio?: boolean;
  /** Hide the built-in swatch row. */
  hideDefaultSwatches?: boolean;
  /** Controlled open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onValueChange?: (value: ColorPickerValue) => void;
  /** Trigger element – wrapped in a click handler to open the picker. */
  children?: React.ReactNode;
}

const COLOR_TYPES: { value: ColorType; label: string }[] = [
  { value: "hex", label: "HEX" },
  { value: "hsl", label: "HSL" },
  { value: "hsla", label: "HSLA" },
  { value: "rgb", label: "RGB" },
  { value: "rgba", label: "RGBA" },
];

const DEFAULT_SWATCHES = ["#F8371A", "#F97C1B", "#FAC81C", "#3FD0B6", "#2CADF6", "#6462FC"];

function toHsva(color: ColorPickerProps["value"]): HsvaColor {
  if (!color) return { h: 0, s: 0, v: 0, a: 1 };
  if (typeof color === "string") return hexToHsva(color);
  if ("v" in color) return color as HsvaColor;
  if ("r" in color) return rgbaToHsva(color);
  return hslaToHsva(color);
}

// ── Component ──────────────────────────────────────────────────────────────

export function ColorPicker({
  value,
  type = "hsl",
  swatches = [],
  hideContrastRatio = false,
  hideDefaultSwatches = false,
  open: controlledOpen,
  onOpenChange,
  onValueChange,
  children,
}: ColorPickerProps) {
  const [isOpen, setIsOpenRaw] = React.useState(controlledOpen ?? false);
  const [colorType, setColorType] = React.useState<ColorType>(type);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [hsv, setHsv] = React.useState<HsvaColor>(toHsva(value));

  // Sync controlled open
  React.useEffect(() => {
    if (controlledOpen !== undefined) setIsOpenRaw(controlledOpen);
  }, [controlledOpen]);

  // Sync controlled value
  React.useEffect(() => {
    if (value !== undefined) setHsv(toHsva(value));
  }, [value]);

  function setIsOpen(next: boolean) {
    setIsOpenRaw(next);
    onOpenChange?.(next);
  }

  function handleValueChange(color: HsvaColor) {
    setHsv(color);
    const hsl = hsvaToHsla(color);
    const rgb = hsvaToRgba(color);
    onValueChange?.({
      hex: hsvaToHex(color),
      hsl: { ...hsl, a: Math.round(hsl.a * 100) / 100 },
      hsla: { ...hsl, a: Math.round(hsl.a * 100) / 100 },
      rgb: { ...rgb, a: Math.round(rgb.a * 100) / 100 },
      rgba: { ...rgb, a: Math.round(rgb.a * 100) / 100 },
    });
  }

  // ── drag helpers ───────────────────────────────────────────────────────

  function makeDragHandler(
    ref: React.RefObject<HTMLElement | null>,
    updater: (rel: { x: number; y: number }) => void,
  ) {
    return function start(e: React.MouseEvent | React.TouchEvent) {
      e.preventDefault();
      update(e);

      function update(ev: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const clientX = "touches" in ev ? ev.touches[0].clientX : ev.clientX;
        const clientY = "touches" in ev ? ev.touches[0].clientY : ev.clientY;
        updater({
          x: Math.max(0.01, Math.min(0.99, (clientX - rect.left) / rect.width)),
          y: Math.max(0.01, Math.min(0.99, (clientY - rect.top) / rect.height)),
        });
      }

      function end() {
        document.removeEventListener("mousemove", update as EventListener);
        document.removeEventListener("mouseup", end);
        document.removeEventListener("touchmove", update as EventListener);
        document.removeEventListener("touchend", end);
      }

      document.addEventListener("mousemove", update as EventListener);
      document.addEventListener("mouseup", end);
      document.addEventListener("touchmove", update as EventListener);
      document.addEventListener("touchend", end);
    };
  }

  const satRef = React.useRef<HTMLDivElement>(null);
  const hueRef = React.useRef<HTMLDivElement>(null);
  const alphaRef = React.useRef<HTMLDivElement>(null);

  const onSatDrag = makeDragHandler(satRef, ({ x, y }) => {
    handleValueChange({ ...hsv, s: x * 100, v: (1 - y) * 100 });
  });

  const onHueDrag = makeDragHandler(hueRef, ({ x }) => {
    handleValueChange({ ...hsv, h: x * 360 });
  });

  const onAlphaDrag = makeDragHandler(alphaRef, ({ x }) => {
    handleValueChange({ ...hsv, a: x });
  });

  // ── derived values ─────────────────────────────────────────────────────
  const hexValue = hsvaToHex(hsv);
  const hslValue = hsvaToHsla(hsv);
  const rgbValue = hsvaToRgba(hsv);

  const sortedSwatches = React.useMemo(() => {
    const all = [...DEFAULT_SWATCHES, ...swatches];
    return all.sort((a, b) => hexToHsva(a).h - hexToHsva(b).h);
  }, [swatches]);

  const showAlpha = colorType === "rgba" || colorType === "hsla";

  // ── render ─────────────────────────────────────────────────────────────

  return (
    <div className="relative">
      {/* Trigger */}
      <div onClick={() => setIsOpen(!isOpen)}>{children}</div>

      {isOpen && (
        <div className="bg-popover absolute top-full left-1/2 z-50 mt-2 w-80 -translate-x-1/2 rounded-md border p-4 shadow-md">
          <div className="space-y-4">
            {/* Saturation/Value picker */}
            <div
              ref={satRef}
              className="relative aspect-[4/2] w-full cursor-crosshair rounded border"
              style={{
                background: `linear-gradient(to right, #fff, hsl(${hsv.h},100%,50%)), linear-gradient(to top, #000, transparent)`,
              }}
              onMouseDown={onSatDrag}
              onTouchStart={onSatDrag}
            >
              <div
                className="pointer-events-none absolute size-4 rounded-full border-2 border-white"
                style={{
                  left: `${hsv.s}%`,
                  top: `${100 - hsv.v}%`,
                  transform: "translate(-50%,-50%)",
                }}
              />
            </div>

            {/* Hue slider */}
            <div
              ref={hueRef}
              className="relative h-4 w-full cursor-pointer rounded"
              style={{
                background:
                  "linear-gradient(to right,#f00 0%,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,#f00 100%)",
              }}
              onMouseDown={onHueDrag}
              onTouchStart={onHueDrag}
            >
              <div
                className="border-foreground pointer-events-none absolute size-4 rounded-full border-2 bg-white"
                style={{
                  left: `${(hsv.h / 360) * 100}%`,
                  top: "50%",
                  transform: "translate(-50%,-50%)",
                }}
              />
            </div>

            {/* Format selector + input */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  type="button"
                  className="border-input bg-background inline-flex h-8 w-20 items-center justify-between gap-2 rounded-md border px-2 py-1 text-xs font-medium uppercase"
                  onClick={() => setDropdownOpen((v) => !v)}
                >
                  <span>{colorType}</span>
                  <span className="text-[10px]">▾</span>
                </button>
                {dropdownOpen && (
                  <div className="border-input bg-popover absolute top-full left-0 z-50 mt-1 w-full rounded-md border shadow-md">
                    <div className="p-1">
                      {COLOR_TYPES.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          className="hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-xs font-medium uppercase select-none"
                          onClick={() => {
                            setColorType(opt.value);
                            setDropdownOpen(false);
                          }}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex grow">
                {colorType === "hex" ? (
                  <input
                    value={hexValue}
                    type="text"
                    className="border-input bg-background placeholder:text-muted-foreground flex h-8 w-full rounded-md border px-3 py-1 text-sm focus:outline-none"
                    placeholder="#000000"
                    onChange={(e) => {
                      try { handleValueChange(hexToHsva(e.target.value)); } catch {}
                    }}
                  />
                ) : (
                  <ObjectColorInput
                    label={colorType as "hsl" | "hsla" | "rgb" | "rgba"}
                    value={
                      colorType === "hsl" || colorType === "hsla" ? hslValue : rgbValue
                    }
                    onValueChange={(v) => {
                      try {
                        handleValueChange("r" in v ? rgbaToHsva(v) : hslaToHsva(v));
                      } catch {}
                    }}
                  />
                )}
              </div>
            </div>

            {/* Alpha slider */}
            {showAlpha && (
              <div
                ref={alphaRef}
                className="relative h-4 w-full cursor-pointer rounded"
                style={{
                  background: `linear-gradient(to right, rgba(${rgbValue.r},${rgbValue.g},${rgbValue.b},0) 0%, rgba(${rgbValue.r},${rgbValue.g},${rgbValue.b},1) 100%), repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%) 50% / 8px 8px`,
                }}
                onMouseDown={onAlphaDrag}
                onTouchStart={onAlphaDrag}
              >
                <div
                  className="border-foreground pointer-events-none absolute size-4 rounded-full border-2 bg-white"
                  style={{
                    left: `${hsv.a * 100}%`,
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                />
              </div>
            )}

            {/* Swatches */}
            {!hideDefaultSwatches && (
              <>
                <div className="bg-border h-px" />
                <div className="flex flex-wrap justify-start gap-2 pt-1">
                  {sortedSwatches.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className="ring-offset-background size-5 cursor-pointer rounded ring-2 ring-transparent ring-offset-1 transition-all duration-100 hover:ring-current"
                      style={{ backgroundColor: c }}
                      aria-label={`Set color to ${c}`}
                      onClick={() => handleValueChange(hexToHsva(c))}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Contrast ratio */}
            {!hideContrastRatio && (
              <>
                <div className="bg-border h-px" />
                <ContrastRatio color={hsv} />
              </>
            )}
          </div>
        </div>
      )}

      {/* Backdrop close */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
