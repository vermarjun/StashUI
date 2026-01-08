"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type DitheringMode = "bayer" | "halftone" | "noise" | "crosshatch";
export type ColorMode = "original" | "grayscale" | "duotone" | "custom";

export interface DitherShaderProps {
  /** Source image URL */
  src: string;
  /** Size of the dithering grid cells */
  gridSize?: number;
  /** Type of dithering pattern */
  ditherMode?: DitheringMode;
  /** Color processing mode */
  colorMode?: ColorMode;
  /** Invert the dithered output colors */
  invert?: boolean;
  /** Pixelation multiplier */
  pixelRatio?: number;
  /** Primary color for duotone mode */
  primaryColor?: string;
  /** Secondary color for duotone mode */
  secondaryColor?: string;
  /** Custom color palette array for custom mode */
  customPalette?: string[];
  /** Brightness adjustment (-1 to 1) */
  brightness?: number;
  /** Contrast adjustment (0 to 2, 1 = normal) */
  contrast?: number;
  /** Background color */
  backgroundColor?: string;
  /** Object fit behavior */
  objectFit?: "cover" | "contain" | "fill" | "none";
  /** Threshold bias (0 to 1) */
  threshold?: number;
  /** Enable animation effect */
  animated?: boolean;
  /** Animation speed */
  animationSpeed?: number;
  /** Additional CSS classes for the container */
  className?: string;
}

// 4x4 Bayer matrix
const BAYER_4: number[][] = [
  [0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5],
];
// 8x8 Bayer matrix
const BAYER_8: number[][] = [
  [0, 32, 8, 40, 2, 34, 10, 42], [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38], [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41], [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37], [63, 31, 55, 23, 61, 29, 53, 21],
];

function parseColor(color: string): [number, number, number] {
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16),
        parseInt(hex[1] + hex[1], 16),
        parseInt(hex[2] + hex[2], 16),
      ];
    }
    return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
  }
  const m = color.match(/rgb\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)/i);
  if (m) return [parseInt(m[1]), parseInt(m[2]), parseInt(m[3])];
  return [0, 0, 0];
}

function getLuminance(r: number, g: number, b: number): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function DitherShader({
  src,
  gridSize = 4,
  ditherMode = "bayer",
  colorMode = "original",
  invert = false,
  pixelRatio = 1,
  primaryColor = "#000000",
  secondaryColor = "#ffffff",
  customPalette = ["#000000", "#ffffff"],
  brightness = 0,
  contrast = 1,
  backgroundColor = "transparent",
  objectFit = "cover",
  threshold = 0.5,
  animated = false,
  animationSpeed = 0.02,
  className,
}: DitherShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const imageDataRef = useRef<ImageData | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const parsedPrimary = useMemo(() => parseColor(primaryColor), [primaryColor]);
  const parsedSecondary = useMemo(() => parseColor(secondaryColor), [secondaryColor]);
  const parsedPalette = useMemo(() => customPalette.map(parseColor), [customPalette]);

  function applyDithering(
    ctx: CanvasRenderingContext2D,
    displayWidth: number,
    displayHeight: number,
    time: number = 0,
  ) {
    if (!imageDataRef.current) return;

    if (backgroundColor !== "transparent") {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, displayWidth, displayHeight);
    } else {
      ctx.clearRect(0, 0, displayWidth, displayHeight);
    }

    const { data: src_, width: srcW, height: srcH } = imageDataRef.current;
    const effectivePixelSize = Math.max(1, Math.floor(gridSize * pixelRatio));
    const matrixSize = gridSize <= 4 ? 4 : 8;
    const bayerMatrix = gridSize <= 4 ? BAYER_4 : BAYER_8;
    const matrixScale = matrixSize === 4 ? 16 : 64;

    for (let y = 0; y < displayHeight; y += effectivePixelSize) {
      for (let x = 0; x < displayWidth; x += effectivePixelSize) {
        const srcX = Math.floor((x / displayWidth) * srcW);
        const srcY = Math.floor((y / displayHeight) * srcH);
        const idx = (srcY * srcW + srcX) * 4;

        let r = src_[idx] ?? 0;
        let g = src_[idx + 1] ?? 0;
        let b = src_[idx + 2] ?? 0;
        const a = src_[idx + 3] ?? 0;
        if (a < 10) continue;

        r = clamp((r - 128) * contrast + 128 + brightness * 255, 0, 255);
        g = clamp((g - 128) * contrast + 128 + brightness * 255, 0, 255);
        b = clamp((b - 128) * contrast + 128 + brightness * 255, 0, 255);

        const luminance = getLuminance(r, g, b) / 255;

        const mx = Math.floor(x / gridSize) % matrixSize;
        const my = Math.floor(y / gridSize) % matrixSize;
        let dt: number;

        switch (ditherMode) {
          case "bayer":
            dt = bayerMatrix[my][mx] / matrixScale;
            break;
          case "halftone": {
            const angle = Math.PI / 4;
            const scale = gridSize * 2;
            const rx = x * Math.cos(angle) + y * Math.sin(angle);
            const ry = -x * Math.sin(angle) + y * Math.cos(angle);
            dt = (Math.sin(rx / scale) + Math.sin(ry / scale) + 2) / 4;
            break;
          }
          case "noise": {
            const nv = Math.sin(x * 12.9898 + y * 78.233 + time * 100) * 43758.5453;
            dt = nv - Math.floor(nv);
            break;
          }
          case "crosshatch": {
            const l1 = (x + y) % (gridSize * 2) < gridSize ? 1 : 0;
            const l2 = (x - y + gridSize * 4) % (gridSize * 2) < gridSize ? 1 : 0;
            dt = (l1 + l2) / 2;
            break;
          }
          default:
            dt = bayerMatrix[my][mx] / matrixScale;
        }

        dt = dt * (1 - threshold) + threshold * 0.5;

        let out: [number, number, number];
        switch (colorMode) {
          case "grayscale":
            out = luminance < dt ? [0, 0, 0] : [255, 255, 255];
            break;
          case "duotone":
            out = luminance < dt ? parsedPrimary : parsedSecondary;
            break;
          case "custom":
            if (parsedPalette.length === 2) {
              out = luminance < dt ? parsedPalette[0] : parsedPalette[1];
            } else {
              const adj = clamp(luminance + (dt - 0.5) * 0.5, 0, 1);
              const pi = Math.floor(adj * (parsedPalette.length - 1));
              out = parsedPalette[pi];
            }
            break;
          default: {
            const da = dt - 0.5;
            const levels = 4;
            out = [
              Math.round(clamp(r + da * 64, 0, 255) / (255 / levels)) * (255 / levels),
              Math.round(clamp(g + da * 64, 0, 255) / (255 / levels)) * (255 / levels),
              Math.round(clamp(b + da * 64, 0, 255) / (255 / levels)) * (255 / levels),
            ];
          }
        }

        if (invert) out = [255 - out[0], 255 - out[1], 255 - out[2]];

        ctx.fillStyle = `rgb(${out[0]},${out[1]},${out[2]})`;
        ctx.fillRect(x, y, effectivePixelSize, effectivePixelSize);
      }
    }
  }

  function processImage(img: HTMLImageElement, dW: number, dH: number) {
    const canvas = canvasRef.current;
    if (!canvas || dW === 0 || dH === 0) return;

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(dW * dpr);
    canvas.height = Math.floor(dH * dpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.resetTransform();
    ctx.scale(dpr, dpr);

    const offscreen = document.createElement("canvas");
    const iw = img.naturalWidth || dW;
    const ih = img.naturalHeight || dH;

    let dw = dW, dh = dH, dx = 0, dy = 0;
    if (objectFit === "cover") {
      const scale = Math.max(dW / iw, dH / ih);
      dw = Math.ceil(iw * scale); dh = Math.ceil(ih * scale);
      dx = Math.floor((dW - dw) / 2); dy = Math.floor((dH - dh) / 2);
    } else if (objectFit === "contain") {
      const scale = Math.min(dW / iw, dH / ih);
      dw = Math.ceil(iw * scale); dh = Math.ceil(ih * scale);
      dx = Math.floor((dW - dw) / 2); dy = Math.floor((dH - dh) / 2);
    } else if (objectFit === "none") {
      dw = iw; dh = ih;
      dx = Math.floor((dW - dw) / 2); dy = Math.floor((dH - dh) / 2);
    }

    offscreen.width = dW; offscreen.height = dH;
    const offCtx = offscreen.getContext("2d");
    if (!offCtx) return;
    offCtx.drawImage(img, dx, dy, dw, dh);

    try {
      imageDataRef.current = offCtx.getImageData(0, 0, dW, dH);
    } catch {
      console.error("DitherShader: CORS issue getting image data");
      return;
    }

    applyDithering(ctx, dW, dH, 0);

    if (animated) {
      const animate = () => {
        timeRef.current += animationSpeed;
        applyDithering(ctx, dW, dH, timeRef.current);
        animationRef.current = requestAnimationFrame(animate);
      };
      animationRef.current = requestAnimationFrame(animate);
    }
  }

  // Load image whenever src or key props change
  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => processImage(img, dimensions.width, dimensions.height);
    img.onerror = () => console.error("DitherShader: failed to load", src);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    src, dimensions, objectFit, animated, animationSpeed,
    gridSize, ditherMode, colorMode, invert, pixelRatio,
    primaryColor, secondaryColor, customPalette, brightness, contrast,
    backgroundColor, threshold,
  ]);

  // ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) setDimensions({ width, height });
      }
    });
    ro.observe(container);
    return () => {
      ro.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative h-full w-full", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ imageRendering: "pixelated" }}
        aria-label="Dithered image"
        role="img"
      />
    </div>
  );
}
