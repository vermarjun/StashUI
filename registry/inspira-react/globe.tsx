"use client";

import React, { useCallback, useEffect, useRef } from "react";
import createGlobe from "cobe";
import type { COBEOptions } from "cobe";
import { cn } from "@/lib/utils";

interface GlobeProps {
  className?: string;
  config?: Partial<COBEOptions>;
  mass?: number;
  tension?: number;
  friction?: number;
  precision?: number;
}

const DEFAULT_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1.2, 1.2, 1.2],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
};

export function Globe({
  className,
  config,
  mass = 1,
  tension = 280,
  friction = 100,
  precision = 0.001,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef<number | null>(null);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);

  // Simple spring implementation (replaces vue-use-spring)
  const springR = useRef(0);
  const springTarget = useRef(0);

  const onResize = useCallback(() => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth;
    }
  }, []);

  const updatePointerInteraction = useCallback((clientX: number | null) => {
    if (clientX !== null) {
      pointerInteracting.current =
        clientX - (pointerInteractionMovement.current ?? clientX);
    } else {
      pointerInteracting.current = null;
    }
    if (canvasRef.current) {
      canvasRef.current.style.cursor = clientX ? "grabbing" : "grab";
    }
  }, []);

  const updateMovement = useCallback((clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - (pointerInteracting.current ?? clientX);
      pointerInteractionMovement.current = delta;
      springTarget.current = delta / 200;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    const mergedConfig = { ...DEFAULT_CONFIG, ...config };

    const onRender = (state: Record<string, unknown>) => {
      if (!pointerInteracting.current) {
        phiRef.current += 0.005;
      }
      // Simple spring damping
      const diff = springTarget.current - springR.current;
      springR.current += diff * (1 - friction / (friction + tension));

      state.phi = phiRef.current + springR.current;
      state.width = widthRef.current * 2;
      state.height = widthRef.current * 2;
    };

    globeRef.current = createGlobe(canvasRef.current!, {
      ...mergedConfig,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender,
    });

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });

    return () => {
      globeRef.current?.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [config, friction, onResize, tension]);

  return (
    <div className={cn("absolute inset-0 mx-auto aspect-square w-full max-w-[600px]", className)}>
      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-1000 ease-in-out [contain:layout_paint_size]"
        onPointerDown={(e) => updatePointerInteraction(e.clientX)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => {
          if (e.touches[0]) updateMovement(e.touches[0].clientX);
        }}
      />
    </div>
  );
}
