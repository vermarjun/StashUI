"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { createNoise3D } from "simplex-noise";
import { cn } from "@/lib/utils";

interface VortexProps {
  children?: React.ReactNode;
  className?: string;
  containerClass?: string;
  particleCount?: number;
  rangeY?: number;
  baseHue?: number;
  baseSpeed?: number;
  rangeSpeed?: number;
  baseRadius?: number;
  rangeRadius?: number;
  backgroundColor?: string;
}

const TAU = 2 * Math.PI;
const BASE_TTL = 50;
const RANGE_TTL = 150;
const PARTICLE_PROP_COUNT = 9;
const RANGE_HUE = 100;
const NOISE_STEPS = 3;
const X_OFF = 0.00125;
const Y_OFF = 0.00125;
const Z_OFF = 0.0005;

function rand(n: number) {
  return n * Math.random();
}
function randRange(n: number) {
  return n - rand(2 * n);
}
function fadeInOut(t: number, m: number) {
  const hm = 0.5 * m;
  return Math.abs(((t + hm) % m) - hm) / hm;
}
function lerp(n1: number, n2: number, speed: number) {
  return (1 - speed) * n1 + speed * n2;
}

export function Vortex({
  children,
  className,
  containerClass,
  particleCount = 700,
  rangeY = 100,
  baseSpeed = 0.0,
  rangeSpeed = 1.5,
  baseRadius = 1,
  rangeRadius = 2,
  baseHue = 220,
  backgroundColor = "#000000",
}: VortexProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const tickRef = useRef(0);
  const particlePropsRef = useRef<Float32Array | null>(null);
  const centerRef = useRef<[number, number]>([0, 0]);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const noise3D = useRef(createNoise3D());

  // Store props in refs for use in animation loop without re-creating
  const propsRef = useRef({
    particleCount,
    rangeY,
    baseSpeed,
    rangeSpeed,
    baseRadius,
    rangeRadius,
    baseHue,
    backgroundColor,
  });
  propsRef.current = {
    particleCount,
    rangeY,
    baseSpeed,
    rangeSpeed,
    baseRadius,
    rangeRadius,
    baseHue,
    backgroundColor,
  };

  function initParticle(i: number) {
    const canvas = canvasRef.current;
    const particleProps = particlePropsRef.current;
    if (!particleProps || !canvas) return;

    const p = propsRef.current;
    particleProps[i] = rand(canvas.width);
    particleProps[i + 1] = centerRef.current[1] + randRange(p.rangeY);
    particleProps[i + 2] = 0;
    particleProps[i + 3] = 0;
    particleProps[i + 4] = 0;
    particleProps[i + 5] = BASE_TTL + rand(RANGE_TTL);
    particleProps[i + 6] = p.baseSpeed + rand(p.rangeSpeed);
    particleProps[i + 7] = p.baseRadius + rand(p.rangeRadius);
    particleProps[i + 8] = p.baseHue + rand(RANGE_HUE);
  }

  function updateParticle(i: number) {
    const canvas = canvasRef.current;
    const particleProps = particlePropsRef.current;
    const ctx = ctxRef.current;
    if (!particleProps || !canvas || !ctx) return;

    const x = particleProps[i]!;
    const y = particleProps[i + 1]!;
    const vx = particleProps[i + 2]!;
    const vy = particleProps[i + 3]!;
    const life = particleProps[i + 4]!;
    const ttl = particleProps[i + 5]!;
    const speed = particleProps[i + 6]!;
    const radius = particleProps[i + 7]!;
    const hue = particleProps[i + 8]!;

    const n =
      noise3D.current(x * X_OFF, y * Y_OFF, tickRef.current * Z_OFF) *
      NOISE_STEPS *
      TAU;

    const nextVx = lerp(vx, Math.cos(n), 0.5);
    const nextVy = lerp(vy, Math.sin(n), 0.5);
    const nextX = x + nextVx * speed;
    const nextY = y + nextVy * speed;

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineWidth = radius;
    ctx.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(nextX, nextY);
    ctx.stroke();
    ctx.restore();

    particleProps[i] = nextX;
    particleProps[i + 1] = nextY;
    particleProps[i + 2] = nextVx;
    particleProps[i + 3] = nextVy;
    particleProps[i + 4] = life + 1;

    if (
      nextX > canvas.width ||
      nextX < 0 ||
      nextY > canvas.height ||
      nextY < 0 ||
      life > ttl
    ) {
      initParticle(i);
    }
  }

  function draw() {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const particleProps = particlePropsRef.current;
    if (!canvas || !ctx || !particleProps) return;

    tickRef.current++;

    ctx.fillStyle = propsRef.current.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particleProps.length; i += PARTICLE_PROP_COUNT) {
      updateParticle(i);
    }

    ctx.save();
    ctx.filter = "blur(8px) brightness(200%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.filter = "blur(4px) brightness(200%)";
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();

    animationFrameRef.current = requestAnimationFrame(draw);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    ctxRef.current = canvas.getContext("2d");
    if (!ctxRef.current) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    centerRef.current = [0.5 * canvas.width, 0.5 * canvas.height];

    const particlePropsLength = particleCount * PARTICLE_PROP_COUNT;
    particlePropsRef.current = new Float32Array(particlePropsLength);
    for (let i = 0; i < particlePropsLength; i += PARTICLE_PROP_COUNT) {
      initParticle(i);
    }

    draw();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        centerRef.current = [0.5 * canvas.width, 0.5 * canvas.height];
      }, 150);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
      ctxRef.current = null;
      particlePropsRef.current = null;
    };
  }, [particleCount]);

  return (
    <div className={cn("relative h-full w-full", containerClass)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 z-0 flex size-full items-center justify-center bg-transparent"
      >
        <canvas ref={canvasRef} />
      </motion.div>
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
