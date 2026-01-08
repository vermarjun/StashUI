"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Disc {
  p: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Point {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  sx: number;
  dx: number;
  y: number;
  vy: number;
  p: number;
  r: number;
  c: string;
}

interface State {
  discs: Disc[];
  lines: Point[][];
  particles: Particle[];
  clip: { disc?: Disc; path?: Path2D };
  startDisc: Disc;
  endDisc: Disc;
  rect: { width: number; height: number };
  render: { width: number; height: number; dpi: number };
  particleArea: { sw?: number; ew?: number; h?: number; sx?: number; ex?: number };
  linesCanvas?: HTMLCanvasElement;
}

interface BlackHoleBackgroundProps {
  strokeColor?: string;
  numberOfLines?: number;
  numberOfDiscs?: number;
  particleRGBColor?: [number, number, number];
  className?: string;
  children?: React.ReactNode;
}

function linear(p: number) { return p; }
function easeInExpo(p: number) { return p === 0 ? 0 : 2 ** (10 * (p - 1)); }
function tweenValue(start: number, end: number, p: number, ease: "inExpo" | null = null) {
  const delta = end - start;
  const easeFn = ease === "inExpo" ? easeInExpo : linear;
  return start + delta * easeFn(p);
}

export const BlackHoleBackground = ({
  strokeColor = "#737373",
  numberOfLines = 50,
  numberOfDiscs = 50,
  particleRGBColor = [255, 255, 255],
  className,
  children,
}: BlackHoleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const stateRef = useRef<State>({
    discs: [],
    lines: [],
    particles: [],
    clip: {},
    startDisc: { p: 0, x: 0, y: 0, w: 0, h: 0 },
    endDisc: { p: 0, x: 0, y: 0, w: 0, h: 0 },
    rect: { width: 0, height: 0 },
    render: { width: 0, height: 0, dpi: 1 },
    particleArea: {},
  });

  function tweenDisc(disc: Disc) {
    const { startDisc, endDisc } = stateRef.current;
    disc.x = tweenValue(startDisc.x, endDisc.x, disc.p);
    disc.y = tweenValue(startDisc.y, endDisc.y, disc.p, "inExpo");
    disc.w = tweenValue(startDisc.w, endDisc.w, disc.p);
    disc.h = tweenValue(startDisc.h, endDisc.h, disc.p);
  }

  function setSize() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    stateRef.current.rect = { width: rect.width, height: rect.height };
    stateRef.current.render = {
      width: rect.width,
      height: rect.height,
      dpi: window.devicePixelRatio || 1,
    };
    canvas.width = rect.width * stateRef.current.render.dpi;
    canvas.height = rect.height * stateRef.current.render.dpi;
  }

  function setDiscs() {
    const { width, height } = stateRef.current.rect;
    if (width <= 0 || height <= 0) return;
    stateRef.current.discs = [];
    stateRef.current.startDisc = { p: 0, x: width * 0.5, y: height * 0.45, w: width * 0.75, h: height * 0.7 };
    stateRef.current.endDisc = { p: 0, x: width * 0.5, y: height * 0.95, w: 0, h: 0 };
    let prevBottom = height;
    stateRef.current.clip = {};
    for (let i = 0; i < numberOfDiscs; i++) {
      const p = i / numberOfDiscs;
      const disc = { p, x: 0, y: 0, w: 0, h: 0 };
      tweenDisc(disc);
      const bottom = disc.y + disc.h;
      if (bottom <= prevBottom) {
        stateRef.current.clip = { disc: { ...disc } };
      }
      prevBottom = bottom;
      stateRef.current.discs.push(disc);
    }
    if (stateRef.current.clip.disc) {
      const clipPath = new Path2D();
      const disc = stateRef.current.clip.disc;
      clipPath.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2);
      clipPath.rect(disc.x - disc.w, 0, disc.w * 2, disc.y);
      stateRef.current.clip.path = clipPath;
    }
  }

  function setLines() {
    const { width, height } = stateRef.current.rect;
    if (width <= 0 || height <= 0) return;
    stateRef.current.lines = [];
    const linesAngle = (Math.PI * 2) / numberOfLines;
    for (let i = 0; i < numberOfLines; i++) stateRef.current.lines.push([]);
    stateRef.current.discs.forEach((disc) => {
      for (let i = 0; i < numberOfLines; i++) {
        const angle = i * linesAngle;
        stateRef.current.lines[i].push({
          x: disc.x + Math.cos(angle) * disc.w,
          y: disc.y + Math.sin(angle) * disc.h,
        });
      }
    });
    const offCanvas = document.createElement("canvas");
    offCanvas.width = Math.max(1, width);
    offCanvas.height = Math.max(1, height);
    const ctx = offCanvas.getContext("2d");
    if (!ctx || !stateRef.current.clip.path) { stateRef.current.linesCanvas = undefined; return; }
    ctx.clearRect(0, 0, offCanvas.width, offCanvas.height);
    stateRef.current.lines.forEach((line) => {
      ctx.save();
      let lineIsIn = false;
      line.forEach((p1, j) => {
        if (j === 0) return;
        const p0 = line[j - 1];
        if (!lineIsIn && (ctx.isPointInPath(stateRef.current.clip.path!, p1.x, p1.y) || ctx.isPointInStroke(stateRef.current.clip.path!, p1.x, p1.y))) {
          lineIsIn = true;
        } else if (lineIsIn) {
          ctx.clip(stateRef.current.clip.path!);
        }
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
      });
      ctx.restore();
    });
    stateRef.current.linesCanvas = offCanvas;
  }

  function initParticle(start = false): Particle {
    const sx = (stateRef.current.particleArea.sx || 0) + (stateRef.current.particleArea.sw || 0) * Math.random();
    const ex = (stateRef.current.particleArea.ex || 0) + (stateRef.current.particleArea.ew || 0) * Math.random();
    const dx = ex - sx;
    const y = start ? (stateRef.current.particleArea.h || 0) * Math.random() : stateRef.current.particleArea.h || 0;
    const r = 0.5 + Math.random() * 4;
    const vy = 0.5 + Math.random();
    return {
      x: sx, sx, dx, y, vy, p: 0, r,
      c: `rgba(${particleRGBColor[0]}, ${particleRGBColor[1]}, ${particleRGBColor[2]}, ${Math.random()})`,
    };
  }

  function setParticles() {
    const { width, height } = stateRef.current.rect;
    stateRef.current.particles = [];
    const disc = stateRef.current.clip.disc;
    if (!disc) return;
    stateRef.current.particleArea = {
      sw: disc.w * 0.5,
      ew: disc.w * 2,
      h: height * 0.85,
    };
    stateRef.current.particleArea.sx = (width - (stateRef.current.particleArea.sw || 0)) / 2;
    stateRef.current.particleArea.ex = (width - (stateRef.current.particleArea.ew || 0)) / 2;
    for (let i = 0; i < 100; i++) stateRef.current.particles.push(initParticle(true));
  }

  function drawDiscs(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    const outerDisc = stateRef.current.startDisc;
    ctx.beginPath();
    ctx.ellipse(outerDisc.x, outerDisc.y, outerDisc.w, outerDisc.h, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
    stateRef.current.discs.forEach((disc, i) => {
      if (i % 5 !== 0) return;
      if (disc.w < (stateRef.current.clip.disc?.w || 0) - 5) {
        ctx.save();
        ctx.clip(stateRef.current.clip.path!);
      }
      ctx.beginPath();
      ctx.ellipse(disc.x, disc.y, disc.w, disc.h, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
      if (disc.w < (stateRef.current.clip.disc?.w || 0) - 5) ctx.restore();
    });
  }

  function drawLines(ctx: CanvasRenderingContext2D) {
    const lc = stateRef.current.linesCanvas;
    if (lc && lc.width > 0 && lc.height > 0) ctx.drawImage(lc, 0, 0);
  }

  function drawParticles(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.clip(stateRef.current.clip.path!);
    stateRef.current.particles.forEach((p) => {
      ctx.fillStyle = p.c;
      ctx.beginPath();
      ctx.rect(p.x, p.y, p.r, p.r);
      ctx.closePath();
      ctx.fill();
    });
    ctx.restore();
  }

  function moveDiscs() {
    stateRef.current.discs.forEach((disc) => {
      disc.p = (disc.p + 0.001) % 1;
      tweenDisc(disc);
    });
  }

  function moveParticles() {
    stateRef.current.particles.forEach((particle, idx) => {
      particle.p = 1 - particle.y / (stateRef.current.particleArea.h || 1);
      particle.x = particle.sx + particle.dx * particle.p;
      particle.y -= particle.vy;
      if (particle.y < 0) stateRef.current.particles[idx] = initParticle();
    });
  }

  function tick() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.scale(stateRef.current.render.dpi, stateRef.current.render.dpi);
    moveDiscs();
    moveParticles();
    drawDiscs(ctx);
    drawLines(ctx);
    drawParticles(ctx);
    ctx.restore();
    rafRef.current = requestAnimationFrame(tick);
  }

  function init() {
    setSize();
    setDiscs();
    setLines();
    setParticles();
  }

  function handleResize() {
    setSize();
    setDiscs();
    setLines();
    setParticles();
  }

  useEffect(() => {
    init();
    tick();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafRef.current);
    };
  }, [strokeColor, numberOfLines, numberOfDiscs, particleRGBColor]);

  return (
    <div
      className={cn(
        "relative size-full overflow-hidden before:absolute before:top-1/2 before:left-1/2 before:block before:size-[140%] before:translate-x-[-50%] before:translate-y-[-50%] before:content-[''] before:[background:radial-gradient(ellipse_at_50%_55%,transparent_10%,white_50%)] after:absolute after:top-1/2 after:left-1/2 after:z-[5] after:block after:size-full after:translate-x-[-50%] after:translate-y-[-50%] after:mix-blend-overlay after:content-[''] after:[background:radial-gradient(ellipse_at_50%_75%,#a900ff_20%,transparent_75%)] dark:before:[background:radial-gradient(ellipse_at_50%_55%,transparent_10%,black_50%)]",
        className,
      )}
    >
      {children}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block size-full opacity-10 dark:opacity-20"
      />
      <motion.div
        className="absolute top-[-71.5%] left-1/2 z-[3] h-[140%] w-[30%] translate-x-[-50%] rounded-b-full opacity-75 mix-blend-plus-darker blur-3xl dark:mix-blend-plus-lighter"
        style={{
          background:
            "linear-gradient(20deg,#00f8f1,#ffbd1e40 16.5%,#fe848f 33%,#fe848f40 49.5%,#00f8f1 66%,#00f8f180 85.5%,#ffbd1e 100%) 0 100%/100% 200%",
        }}
        animate={{ backgroundPosition: "0% 300%" }}
        transition={{ duration: 5, ease: "linear", repeat: Infinity }}
      />
      <div className="absolute top-0 left-0 z-[7] size-full opacity-50 mix-blend-overlay dark:[background:repeating-linear-gradient(transparent,transparent_1px,white_1px,white_2px)]" />
    </div>
  );
};
