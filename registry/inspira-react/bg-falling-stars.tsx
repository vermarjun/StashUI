"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Star {
  x: number;
  y: number;
  z: number;
  speed: number;
}

interface FallingStarsBgProps {
  color?: string;
  count?: number;
  className?: string;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let h = (hex || "#000").replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const bigint = parseInt(h, 16) || 0;
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

export const FallingStarsBg = ({
  color = "#FFF",
  count = 200,
  className,
}: FallingStarsBgProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef(0);
  const perspectiveRef = useRef(0);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rgbRef = useRef(hexToRgb(color));

  useEffect(() => {
    rgbRef.current = hexToRgb(color);
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let dpr = window.devicePixelRatio || 1;

    function resizeCanvas() {
      if (!canvas) return;
      dpr = window.devicePixelRatio || 1;
      const width = Math.max(1, Math.floor(canvas.clientWidth));
      const height = Math.max(1, Math.floor(canvas.clientHeight));
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctxRef.current = canvas.getContext("2d");
      if (ctxRef.current) ctxRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      perspectiveRef.current = canvas.width / dpr / 2;
    }

    window.addEventListener("resize", resizeCanvas, { passive: true });
    resizeCanvas();

    const cssWidth = canvas.clientWidth;
    const cssHeight = canvas.clientHeight;
    starsRef.current = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 2 * cssWidth,
      y: (Math.random() - 0.5) * 2 * cssHeight,
      z: Math.random() * (cssWidth || 1),
      speed: Math.random() * 5 + 2,
    }));

    function drawStar(star: Star, width: number, height: number) {
      const ctx = ctxRef.current;
      if (!ctx) return;
      const perspective = perspectiveRef.current;
      const scale = perspective / (perspective + star.z);
      const x2d = width / 2 + star.x * scale;
      const y2d = height / 2 + star.y * scale;
      const size = Math.max(scale * 3, 0.5);
      const prevScale = perspective / (perspective + star.z + star.speed * 15);
      const xPrev = width / 2 + star.x * prevScale;
      const yPrev = height / 2 + star.y * prevScale;
      const rgb = rgbRef.current;
      const layerAlphas = [0.08, 0.14, 0.22];
      for (let i = 0; i < layerAlphas.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${layerAlphas[i]})`;
        ctx.lineWidth = size * (1.4 + i * 1.2);
        ctx.moveTo(x2d, y2d);
        ctx.lineTo(xPrev, yPrev);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6)`;
      ctx.lineWidth = Math.max(1, size);
      ctx.moveTo(x2d, y2d);
      ctx.lineTo(xPrev, yPrev);
      ctx.stroke();
      ctx.beginPath();
      ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`;
      ctx.arc(x2d, y2d, Math.max(0.5, size / 4), 0, Math.PI * 2);
      ctx.fill();
    }

    function loop() {
      if (!canvas) return;
      const ctx = ctxRef.current ?? canvas.getContext("2d");
      if (!ctx) return;
      ctxRef.current = ctx;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);
      for (const star of starsRef.current) {
        drawStar(star, width, height);
        star.z -= star.speed;
        if (star.z <= 0) {
          star.z = width || 1;
          star.x = (Math.random() - 0.5) * 2 * width;
          star.y = (Math.random() - 0.5) * 2 * height;
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 h-full w-full", className)}
    />
  );
};
