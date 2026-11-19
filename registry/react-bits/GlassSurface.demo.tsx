"use client";
import { useEffect, useRef, useState } from "react";
import GlassSurface from "@/registry/react-bits/GlassSurface";

const photos = [
  "1506905925346-21bda4d32df4",
  "1469474968028-56623f02e42e",
  "1504198266287-1659872e6590",
  "1543508282-6319a3e2621f",
  "1498019559366-a1cbd07b5160",
  "1476180814856-a36609db0493",
  "1475727946784-2890c8fdb9c8",
  "1540553016722-983e48a2cd10",
];

export default function Demo() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number } | null>(null);
  // GlassSurface picks its styles from browser feature checks, so mount it client-side only
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className="relative h-[560px] w-full touch-none select-none overflow-hidden bg-background"
      onPointerMove={(e) => {
        if (!drag.current) return;
        setPos({ x: e.clientX - drag.current.x, y: e.clientY - drag.current.y });
      }}
      onPointerUp={() => (drag.current = null)}
      onPointerLeave={() => (drag.current = null)}
    >
      {/* busy content behind the glass so the refraction has something to bend */}
      <div className="absolute inset-0 grid grid-cols-4 gap-3 p-3">
        {photos.map((id) => (
          <img
            key={id}
            src={`https://images.unsplash.com/photo-${id}?w=420&h=360&fit=crop&auto=format&q=80`}
            alt=""
            draggable={false}
            className="h-full w-full rounded-xl object-cover"
          />
        ))}
      </div>
      <h2 className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-7xl font-black uppercase tracking-tight text-white mix-blend-difference">
        Through the glass
      </h2>

      <div
        data-glass
        className="absolute left-1/2 top-1/2 cursor-grab active:cursor-grabbing"
        style={{ transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))` }}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
        }}
      >
        {mounted && (
        <GlassSurface
          width={360}
          height={180}
          borderRadius={40}
          distortionScale={-180}
          brightness={50}
          opacity={0.93}
          blur={11}
          displace={0.5}
          backgroundOpacity={0.1}
          saturation={1}
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="text-lg font-semibold text-white drop-shadow">Drag me around</p>
            <p className="text-sm text-white/80 drop-shadow">Liquid glass refraction</p>
          </div>
        </GlassSurface>
        )}
      </div>
    </div>
  );
}
