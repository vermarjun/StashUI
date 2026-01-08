"use client";
import React, { useEffect, useRef } from "react";

interface Snowflake {
  x: number;
  y: number;
  size: number;
  alpha: number;
  dx: number;
  dy: number;
}

interface SnowfallBgProps {
  color?: string;
  quantity?: number;
  speed?: number;
  maxRadius?: number;
  minRadius?: number;
  className?: string;
}

function hexToRgb(hex: string): string {
  const clean = hex.replace(/^#/, "").padStart(6, "0");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

export function SnowfallBg({
  color = "#FFF",
  quantity = 100,
  speed = 1,
  maxRadius = 3,
  minRadius = 1,
  className = "",
}: SnowfallBgProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const snowflakesRef = useRef<Snowflake[]>([]);
  const canvasSizeRef = useRef({ w: 0, h: 0 });

  const rgbColor = hexToRgb(color);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resizeCanvas() {
      if (!canvas || !container || !ctx) return;
      snowflakesRef.current = [];
      canvasSizeRef.current.w = container.offsetWidth;
      canvasSizeRef.current.h = container.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvasSizeRef.current.w * dpr;
      canvas.height = canvasSizeRef.current.h * dpr;
      canvas.style.width = `${canvasSizeRef.current.w}px`;
      canvas.style.height = `${canvasSizeRef.current.h}px`;
      ctx.scale(dpr, dpr);
    }

    function createSnowflake(): Snowflake {
      const { w, h } = canvasSizeRef.current;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * (maxRadius - minRadius) + minRadius,
        alpha: Math.random() * 0.5 + 0.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: Math.random() * 0.25 + speed,
      };
    }

    function createSnowflakes() {
      for (let i = 0; i < quantity; i++) {
        snowflakesRef.current.push(createSnowflake());
      }
    }

    function drawSnowflake(sf: Snowflake) {
      if (!ctx) return;
      ctx.beginPath();
      ctx.arc(sf.x, sf.y, sf.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgbColor}, ${sf.alpha})`;
      ctx.fill();
    }

    function animate() {
      if (!ctx) return;
      const { w, h } = canvasSizeRef.current;
      ctx.clearRect(0, 0, w, h);

      snowflakesRef.current.forEach((sf) => {
        sf.x += sf.dx;
        sf.y += sf.dy;
        if (sf.y > h) {
          sf.y = -sf.size;
          sf.x = Math.random() * w;
        }
        drawSnowflake(sf);
      });

      animFrameRef.current = requestAnimationFrame(animate);
    }

    resizeCanvas();
    createSnowflakes();
    animate();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, quantity, speed, maxRadius, minRadius]);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
