"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  CSSProperties,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

// Lazy-load @splinetool/runtime only in the browser
// to avoid SSR issues. The Application type is used for typing only.

interface SplineProps {
  scene: string;
  onLoad?: (app: unknown) => void;
  renderOnDemand?: boolean;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode; // shown while loading
}

export function Spline({
  scene,
  onLoad,
  renderOnDemand = true,
  style,
  className,
  children,
}: SplineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<unknown>(null);
  const [isLoading, setIsLoading] = useState(true);
  const cleanupRef = useRef<() => void>(() => {});

  const initSpline = useCallback(async () => {
    if (!canvasRef.current) return;
    setIsLoading(true);
    try {
      // Dynamically import to keep bundle split-friendly
      const { Application } = await import("@splinetool/runtime" as string as never) as {
        Application: new (
          canvas: HTMLCanvasElement,
          options?: { renderOnDemand?: boolean },
        ) => {
          load: (url: string) => Promise<void>;
          dispose: () => void;
          requestRender: () => void;
          setSize: (w: number, h: number) => void;
        };
      };

      // Dispose previous instance
      if (appRef.current) {
        (appRef.current as { dispose: () => void }).dispose();
        appRef.current = null;
      }

      const app = new Application(canvasRef.current, { renderOnDemand });
      await app.load(scene);
      appRef.current = app;
      setIsLoading(false);
      onLoad?.(app);
    } catch (err) {
      console.error("Spline initialization error:", err);
      setIsLoading(false);
    }
  }, [scene, renderOnDemand, onLoad]);

  useEffect(() => {
    initSpline();

    // IntersectionObserver: re-init when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !appRef.current) {
          initSpline();
        }
      },
      { threshold: 0.1 },
    );
    if (canvasRef.current) observer.observe(canvasRef.current);

    // ResizeObserver for canvas size sync
    const resizeObserver = new ResizeObserver(() => {
      if (canvasRef.current && appRef.current) {
        const app = appRef.current as { setSize: (w: number, h: number) => void; requestRender: () => void };
        app.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
        app.requestRender();
      }
    });
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    cleanupRef.current = () => {
      observer.disconnect();
      resizeObserver.disconnect();
      if (appRef.current) {
        (appRef.current as { dispose: () => void }).dispose();
        appRef.current = null;
      }
    };

    return () => cleanupRef.current();
  }, [initSpline]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full overflow-hidden", className)}
      style={style}
    >
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
      {isLoading && children}
    </div>
  );
}

export default Spline;
