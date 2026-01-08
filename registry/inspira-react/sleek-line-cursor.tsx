"use client";
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SleekLineCursorProps {
  friction?: number;
  trails?: number;
  size?: number;
  dampening?: number;
  tension?: number;
  className?: string;
}

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface WaveOptions {
  phase?: number;
  offset?: number;
  frequency?: number;
  amplitude?: number;
}

class Wave {
  phase: number;
  offset: number;
  frequency: number;
  amplitude: number;
  private e: number = 0;

  constructor(options: WaveOptions = {}) {
    this.phase = options.phase ?? 0;
    this.offset = options.offset ?? 0;
    this.frequency = options.frequency ?? 0.001;
    this.amplitude = options.amplitude ?? 1;
  }

  update(): number {
    this.phase += this.frequency;
    this.e = this.offset + Math.sin(this.phase) * this.amplitude;
    return this.e;
  }

  value(): number {
    return this.e;
  }
}

export function SleekLineCursor({
  friction = 0.5,
  trails = 20,
  size = 50,
  dampening = 0.25,
  tension = 0.98,
  className,
}: SleekLineCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D & {
      running?: boolean;
      frame?: number;
    };

    ctx.running = true;
    ctx.frame = 1;

    const E = { friction, trails, size, dampening, tension };
    const pos = { x: 0, y: 0 };
    let lines: ReturnType<typeof createLine>[] = [];

    function createNode(): NodePoint {
      return { x: pos.x, y: pos.y, vx: 0, vy: 0 };
    }

    function createLine(spring: number) {
      const lineSpring = spring + 0.1 * Math.random() - 0.02;
      const lineFriction = E.friction + 0.01 * Math.random() - 0.002;
      const nodes: NodePoint[] = Array.from({ length: E.size }, createNode);

      function update() {
        let e = lineSpring;
        let t = nodes[0];
        t.vx += (pos.x - t.x) * e;
        t.vy += (pos.y - t.y) * e;

        for (let i = 0; i < nodes.length; i++) {
          t = nodes[i];
          if (i > 0) {
            const n = nodes[i - 1];
            t.vx += (n.x - t.x) * e;
            t.vy += (n.y - t.y) * e;
            t.vx += n.vx * E.dampening;
            t.vy += n.vy * E.dampening;
          }
          t.vx *= lineFriction;
          t.vy *= lineFriction;
          t.x += t.vx;
          t.y += t.vy;
          e *= E.tension;
        }
      }

      function draw() {
        let n = nodes[0].x;
        let i = nodes[0].y;
        ctx.beginPath();
        ctx.moveTo(n, i);

        for (let a = 1; a < nodes.length - 2; a++) {
          const e = nodes[a];
          const t = nodes[a + 1];
          n = 0.5 * (e.x + t.x);
          i = 0.5 * (e.y + t.y);
          ctx.quadraticCurveTo(e.x, e.y, n, i);
        }

        const e2 = nodes[nodes.length - 2];
        const t2 = nodes[nodes.length - 1];
        ctx.quadraticCurveTo(e2.x, e2.y, t2.x, t2.y);
        ctx.stroke();
        ctx.closePath();
      }

      return { update, draw };
    }

    const f = new Wave({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    function createLines() {
      lines = [];
      for (let e = 0; e < E.trails; e++) {
        lines.push(createLine(0.4 + (e / E.trails) * 0.025));
      }
    }

    function updatePosition(e: MouseEvent | TouchEvent) {
      if ("touches" in e) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      } else {
        pos.x = (e as MouseEvent).clientX;
        pos.y = (e as MouseEvent).clientY;
      }
      e.preventDefault();
    }

    function handleTouchMove(e: TouchEvent) {
      if (e.touches.length === 1) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      }
    }

    function render() {
      if (!ctx.running) return;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";
      ctx.strokeStyle = `hsla(${Math.round(f.update())},50%,50%,0.2)`;
      ctx.lineWidth = 1;

      lines.forEach((line) => {
        line.update();
        line.draw();
      });

      ctx.frame = (ctx.frame ?? 0) + 1;
      window.requestAnimationFrame(render);
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth - 20;
      canvas.height = window.innerHeight;
    }

    let started = false;

    function onMouseMove(e: MouseEvent | TouchEvent) {
      if (!started) {
        document.removeEventListener("mousemove", onMouseMove as EventListener);
        document.removeEventListener("touchstart", onMouseMove as EventListener);
        document.addEventListener("mousemove", updatePosition as EventListener);
        document.addEventListener("touchmove", updatePosition as EventListener);
        document.addEventListener("touchstart", handleTouchMove as EventListener);
        started = true;
      }
      updatePosition(e);
      createLines();
      render();
    }

    function handleFocus() {
      if (!ctx.running) {
        ctx.running = true;
        render();
      }
    }

    function handleBlur() {
      ctx.running = true;
    }

    document.addEventListener("mousemove", onMouseMove as EventListener);
    document.addEventListener("touchstart", onMouseMove as EventListener);
    document.body.addEventListener("orientationchange", resizeCanvas);
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    resizeCanvas();

    return () => {
      ctx.running = false;
      document.removeEventListener("mousemove", onMouseMove as EventListener);
      document.removeEventListener("mousemove", updatePosition as EventListener);
      document.removeEventListener("touchstart", onMouseMove as EventListener);
      document.removeEventListener("touchstart", handleTouchMove as EventListener);
      document.removeEventListener("touchmove", updatePosition as EventListener);
      document.body.removeEventListener("orientationchange", resizeCanvas);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none fixed inset-0 z-50", className)}
    />
  );
}
