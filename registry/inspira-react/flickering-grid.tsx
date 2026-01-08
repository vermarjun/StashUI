"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  width?: number;
  height?: number;
  className?: string;
  maxOpacity?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function colorToRgba(color: string): string {
  // If it's already rgb/rgba, parse it
  const rgbMatch = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgbMatch) {
    return `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]},`;
  }
  // If it's hex
  const hex = color.replace(/^#/, "");
  if (hex.length === 6) {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b},`;
  }
  // Fallback
  return `rgba(0, 0, 0,`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(0, 0, 0)",
  width,
  height,
  className,
  maxOpacity = 0.3,
}: FlickeringGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const gridParamsRef = useRef<{
    cols: number;
    rows: number;
    squares: Float32Array;
    dpr: number;
  } | null>(null);
  const rafIdRef = useRef<number | undefined>(undefined);
  const isInViewRef = useRef(false);
  const lastTimeRef = useRef(0);
  const colorRef = useRef(colorToRgba(color));

  // Update color ref when color prop changes
  useEffect(() => {
    colorRef.current = colorToRgba(color);
  }, [color]);

  const setupCanvas = useCallback(
    (canvas: HTMLCanvasElement, w: number, h: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const cols = Math.floor(w / (squareSize + gridGap));
      const rows = Math.floor(h / (squareSize + gridGap));
      const squares = new Float32Array(cols * rows);
      for (let i = 0; i < squares.length; i++) {
        squares[i] = Math.random() * maxOpacity;
      }
      return { cols, rows, squares, dpr };
    },
    [squareSize, gridGap, maxOpacity]
  );

  const updateSquares = useCallback(
    (squares: Float32Array, deltaTime: number) => {
      for (let i = 0; i < squares.length; i++) {
        if (Math.random() < flickerChance * deltaTime) {
          squares[i] = Math.random() * maxOpacity;
        }
      }
    },
    [flickerChance, maxOpacity]
  );

  const drawGrid = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      canvasWidth: number,
      canvasHeight: number,
      cols: number,
      rows: number,
      squares: Float32Array,
      dpr: number
    ) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const opacity = squares[i * rows + j];
          ctx.fillStyle = `${colorRef.current}${opacity})`;
          ctx.fillRect(
            i * (squareSize + gridGap) * dpr,
            j * (squareSize + gridGap) * dpr,
            squareSize * dpr,
            squareSize * dpr
          );
        }
      }
    },
    [squareSize, gridGap]
  );

  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const w = width || container.clientWidth;
    const h = height || container.clientHeight;
    gridParamsRef.current = setupCanvas(canvas, w, h);
  }, [width, height, setupCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    contextRef.current = canvas.getContext("2d");
    if (!contextRef.current) return;

    updateCanvasSize();

    function animate(time: number) {
      if (!isInViewRef.current || !gridParamsRef.current || !contextRef.current || !canvasRef.current) return;
      const deltaTime = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      updateSquares(gridParamsRef.current.squares, deltaTime);
      drawGrid(
        contextRef.current,
        canvasRef.current.width,
        canvasRef.current.height,
        gridParamsRef.current.cols,
        gridParamsRef.current.rows,
        gridParamsRef.current.squares,
        gridParamsRef.current.dpr
      );
      rafIdRef.current = requestAnimationFrame(animate);
    }

    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize();
    });

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          lastTimeRef.current = performance.now();
          rafIdRef.current = requestAnimationFrame(animate);
        } else if (rafIdRef.current) {
          cancelAnimationFrame(rafIdRef.current);
        }
      },
      { threshold: 0 }
    );

    resizeObserver.observe(container);
    intersectionObserver.observe(canvas);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [updateCanvasSize, updateSquares, drawGrid]);

  return (
    <div ref={containerRef} className={cn("h-full w-full", className)}>
      <canvas ref={canvasRef} className="pointer-events-none" />
    </div>
  );
}
