"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";

interface Circle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

interface ParticlesBgProps {
  color?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  className?: string;
}

function hexToRgb(hex: string): string {
  let h = hex.replace(/^#/, "");
  if (h.length === 3) {
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const bigint = Number.parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r} ${g} ${b}`;
}

export function ParticlesBg({
  color = "#FFF",
  quantity = 100,
  staticity = 50,
  ease = 50,
  className = "",
}: ParticlesBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const circlesRef = useRef<Circle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const canvasSizeRef = useRef({ w: 0, h: 0 });
  const pixelRatioRef = useRef(typeof window !== "undefined" ? window.devicePixelRatio : 1);
  const rafRef = useRef<number>(0);

  const rgbColor = hexToRgb(color);

  function circleParams(): Circle {
    const { w, h } = canvasSizeRef.current;
    return {
      x: Math.floor(Math.random() * w),
      y: Math.floor(Math.random() * h),
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + 1,
      alpha: 0,
      targetAlpha: Number.parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      magnetism: 0.1 + Math.random() * 4,
    };
  }

  function drawCircle(circle: Circle, update = false) {
    const ctx = contextRef.current;
    if (!ctx) return;
    const { x, y, translateX, translateY, size, alpha } = circle;
    ctx.translate(translateX, translateY);
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = `rgba(${rgbColor.split(" ").join(", ")}, ${alpha})`;
    ctx.fill();
    ctx.setTransform(pixelRatioRef.current, 0, 0, pixelRatioRef.current, 0, 0);
    if (!update) {
      circlesRef.current.push(circle);
    }
  }

  function clearContext() {
    const ctx = contextRef.current;
    const { w, h } = canvasSizeRef.current;
    if (ctx) ctx.clearRect(0, 0, w, h);
  }

  function drawParticles() {
    clearContext();
    for (let i = 0; i < quantity; i++) {
      drawCircle(circleParams());
    }
  }

  function remapValue(value: number, s1: number, e1: number, s2: number, e2: number): number {
    const r = ((value - s1) * (e2 - s2)) / (e1 - s1) + s2;
    return r > 0 ? r : 0;
  }

  const animate = useCallback(() => {
    clearContext();
    circlesRef.current.forEach((circle, i) => {
      const { w, h } = canvasSizeRef.current;
      const edge = [
        circle.x + circle.translateX - circle.size,
        w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapped = Number.parseFloat(remapValue(closestEdge, 0, 20, 0, 1).toFixed(2));

      if (remapped > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
      } else {
        circle.alpha = circle.targetAlpha * remapped;
      }

      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.translateX +=
        (mouseRef.current.x / (staticity / circle.magnetism) - circle.translateX) / ease;
      circle.translateY +=
        (mouseRef.current.y / (staticity / circle.magnetism) - circle.translateY) / ease;

      if (
        circle.x < -circle.size ||
        circle.x > w + circle.size ||
        circle.y < -circle.size ||
        circle.y > h + circle.size
      ) {
        circlesRef.current.splice(i, 1);
        drawCircle(circleParams());
      } else {
        drawCircle({ ...circle }, true);
      }
    });
    rafRef.current = window.requestAnimationFrame(animate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [staticity, ease, quantity, rgbColor]);

  function resizeCanvas() {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!container || !canvas || !ctx) return;

    const pr = window.devicePixelRatio || 1;
    pixelRatioRef.current = pr;
    circlesRef.current = [];
    canvasSizeRef.current.w = container.offsetWidth;
    canvasSizeRef.current.h = container.offsetHeight;
    canvas.width = canvasSizeRef.current.w * pr;
    canvas.height = canvasSizeRef.current.h * pr;
    canvas.style.width = `${canvasSizeRef.current.w}px`;
    canvas.style.height = `${canvasSizeRef.current.h}px`;
    ctx.scale(pr, pr);
  }

  function initCanvas() {
    resizeCanvas();
    drawParticles();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    contextRef.current = canvas.getContext("2d");
    initCanvas();
    rafRef.current = window.requestAnimationFrame(animate);

    function handleResize() {
      initCanvas();
    }

    function handleMouseMove(e: MouseEvent) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const { w, h } = canvasSizeRef.current;
      const x = e.clientX - rect.left - w / 2;
      const y = e.clientY - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouseRef.current.x = x;
        mouseRef.current.y = y;
      }
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate]);

  return (
    <div ref={containerRef} className={cn(className)} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
