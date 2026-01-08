"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  vx: number;
  vy: number;
  phase: number;
  phaseSpeed: number;
}

interface SparklesProps {
  background?: string;
  particleColor?: string;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  particleDensity?: number;
  className?: string;
}

export function Sparkles({
  background = "#0d47a1",
  particleColor = "#ffffff",
  minSize = 1,
  maxSize = 3,
  speed = 4,
  particleDensity = 120,
  className,
}: SparklesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const rafRef = useRef<number>(0);

  const resizeCanvas = useCallback(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = containerRef.current.getBoundingClientRect();
    canvasRef.current.width = rect.width * dpr;
    canvasRef.current.height = rect.height * dpr;
    if (ctxRef.current) {
      ctxRef.current.scale(dpr, dpr);
    }
  }, []);

  const generateParticles = useCallback(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleDensity; i++) {
      const baseSpeed = 0.05;
      const speedVariance = Math.random() * 0.3 + 0.7;
      newParticles.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * (maxSize - minSize) + minSize,
        opacity: Math.random() * 0.5 + 0.3,
        vx: (Math.random() - 0.5) * baseSpeed * speedVariance * speed,
        vy: ((Math.random() - 0.5) * baseSpeed - baseSpeed * 0.3) * speedVariance * speed,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.015,
      });
    }
    particlesRef.current = newParticles;
  }, [particleDensity, maxSize, minSize, speed]);

  const updateAndDraw = useCallback(() => {
    if (!ctxRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = particlesRef.current.map((particle) => {
      let newX = particle.x + particle.vx;
      let newY = particle.y + particle.vy;
      if (newX < -2) newX = 102;
      if (newX > 102) newX = -2;
      if (newY < -2) newY = 102;
      if (newY > 102) newY = -2;

      const newPhase = (particle.phase + particle.phaseSpeed) % (Math.PI * 2);
      const opacity = 0.3 + (Math.sin(newPhase) * 0.3 + 0.3);

      ctxRef.current!.beginPath();
      ctxRef.current!.arc(
        (newX * canvas.width) / 100,
        (newY * canvas.height) / 100,
        particle.size,
        0,
        Math.PI * 2,
      );
      ctxRef.current!.fillStyle = `${particleColor}${Math.floor(opacity * 255)
        .toString(16)
        .padStart(2, "0")}`;
      ctxRef.current!.fill();

      return { ...particle, x: newX, y: newY, phase: newPhase, opacity };
    });

    rafRef.current = requestAnimationFrame(updateAndDraw);
  }, [particleColor]);

  useEffect(() => {
    if (!canvasRef.current) return;
    ctxRef.current = canvasRef.current.getContext("2d");
    resizeCanvas();
    generateParticles();

    const observer = new ResizeObserver(resizeCanvas);
    if (containerRef.current) observer.observe(containerRef.current);

    rafRef.current = requestAnimationFrame(updateAndDraw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [resizeCanvas, generateParticles, updateAndDraw]);

  return (
    <div
      ref={containerRef}
      className={cn("relative size-full overflow-hidden will-change-transform", className)}
      style={{ background }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  );
}

export default Sparkles;
