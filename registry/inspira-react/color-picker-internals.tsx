"use client";

/**
 * Internal helpers for ColorPicker — ObjectColorInput and ContrastRatio.
 * Not intended to be imported directly by consumers; use color-picker.tsx.
 */

import * as React from "react";
import type { HslaColor, HsvaColor, RgbaColor } from "@uiw/color-convert";
import { hsvaToRgba } from "@uiw/color-convert";

// ── ObjectColorInput ───────────────────────────────────────────────────────

interface ObjectColorInputProps {
  label: "hsl" | "hsla" | "rgb" | "rgba";
  value: HslaColor | RgbaColor;
  onValueChange: (value: HslaColor | RgbaColor) => void;
}

function getInputClass(index: number, total: number) {
  const base =
    "flex-1 w-0 h-8 px-2 py-1 text-xs border border-input bg-background text-center overflow-hidden focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0";
  const isFirst = index === 0;
  const isLast = index === total - 1;
  if (isFirst) return `${base} rounded-l-md -mr-px`;
  if (isLast) return `${base} rounded-r-md`;
  return `${base} rounded-none -mr-px`;
}

export function ObjectColorInput({ label, value, onValueChange }: ObjectColorInputProps) {
  const isHsl = label === "hsl" || label === "hsla";
  const hasAlpha = label === "hsla" || label === "rgba";

  type InputDef = { key: string; prop: string; min: number; max: number; displayValue: number };

  const inputs: InputDef[] = React.useMemo(() => {
    if (isHsl) {
      const hsl = value as HslaColor;
      const arr: InputDef[] = [
        { key: "h", prop: "h", min: 0, max: 360, displayValue: Math.round(hsl.h) },
        { key: "s", prop: "s", min: 0, max: 100, displayValue: Math.round(hsl.s) },
        { key: "l", prop: "l", min: 0, max: 100, displayValue: Math.round(hsl.l) },
      ];
      if (hasAlpha) arr.push({ key: "a", prop: "a", min: 0, max: 100, displayValue: Math.round(hsl.a * 100) });
      return arr;
    } else {
      const rgb = value as RgbaColor;
      const arr: InputDef[] = [
        { key: "r", prop: "r", min: 0, max: 255, displayValue: Math.round(rgb.r) },
        { key: "g", prop: "g", min: 0, max: 255, displayValue: Math.round(rgb.g) },
        { key: "b", prop: "b", min: 0, max: 255, displayValue: Math.round(rgb.b) },
      ];
      if (hasAlpha) arr.push({ key: "a", prop: "a", min: 0, max: 100, displayValue: Math.round(rgb.a * 100) });
      return arr;
    }
  }, [value, isHsl, hasAlpha]);

  function handleChange(idx: number, e: React.ChangeEvent<HTMLInputElement>) {
    const raw = Number(e.target.value);
    if (Number.isNaN(raw)) return;
    const inp = inputs[idx];
    const clamped = Math.max(inp.min, Math.min(inp.max, raw));
    const final = inp.prop === "a" ? clamped / 100 : clamped;
    onValueChange({ ...value, [inp.prop]: final } as HslaColor | RgbaColor);
  }

  return (
    <div className="flex w-full min-w-0">
      {inputs.map((inp, idx) => (
        <input
          key={inp.key}
          value={inp.displayValue}
          min={inp.min}
          max={inp.max}
          step={1}
          className={getInputClass(idx, inputs.length)}
          onChange={(e) => handleChange(idx, e)}
        />
      ))}
    </div>
  );
}

// ── ContrastRatio ──────────────────────────────────────────────────────────

interface ContrastRatioProps {
  color: HsvaColor;
}

export function ContrastRatio({ color }: ContrastRatioProps) {
  const rgba = hsvaToRgba(color);

  function toLinear(c: number) {
    const ch = c / 255;
    return ch <= 0.03928 ? ch / 12.92 : ((ch + 0.055) / 1.055) ** 2.4;
  }

  function blend(fg: number, bg: number, a: number) {
    return fg * a + bg * (1 - a);
  }

  const lightR = blend(rgba.r, 255, rgba.a);
  const lightG = blend(rgba.g, 255, rgba.a);
  const lightB = blend(rgba.b, 255, rgba.a);
  const darkR = blend(rgba.r, 32, rgba.a);
  const darkG = blend(rgba.g, 32, rgba.a);
  const darkB = blend(rgba.b, 32, rgba.a);

  const lightL = 0.2126 * toLinear(lightR) + 0.7152 * toLinear(lightG) + 0.0722 * toLinear(lightB);
  const darkL = 0.2126 * toLinear(darkR) + 0.7152 * toLinear(darkG) + 0.0722 * toLinear(darkB);

  const darkRatio = Number(((Math.max(1, darkL) + 0.05) / (Math.min(1, darkL) + 0.05)).toFixed(2));
  const lightRatio = Number(((Math.max(0, lightL) + 0.05) / (Math.min(0, lightL) + 0.05)).toFixed(2));
  const ratio = Math.max(darkRatio, lightRatio);

  const aa = ratio >= 4.5;
  const aaa = ratio >= 7;

  const shouldUseWhite = (() => {
    const r = rgba.r / 255;
    const g = rgba.g / 255;
    const b = rgba.b / 255;
    const rL = r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4;
    const gL = g <= 0.03928 ? g / 12.92 : ((g + 0.055) / 1.055) ** 2.4;
    const bL = b <= 0.03928 ? b / 12.92 : ((b + 0.055) / 1.055) ** 2.4;
    return 0.2126 * rL + 0.7152 * gL + 0.0722 * bL < 0.5;
  })();

  return (
    <div className="flex items-center justify-between gap-4 pt-2 select-none">
      <div className="flex items-center gap-4">
        <div
          className="flex size-10 items-center justify-center rounded border"
          style={{ backgroundColor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})` }}
        >
          <span className="font-medium" style={{ color: shouldUseWhite ? "white" : "black" }}>
            A
          </span>
        </div>
        <div className="flex flex-col justify-between">
          <span className="text-muted-foreground text-xs whitespace-nowrap">Contrast Ratio</span>
          <span className="text-sm">{ratio}</span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-1">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${aa ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
        >
          {aa ? "✓" : "✗"} AA
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${aaa ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
        >
          {aaa ? "✓" : "✗"} AAA
        </span>
      </div>
    </div>
  );
}
