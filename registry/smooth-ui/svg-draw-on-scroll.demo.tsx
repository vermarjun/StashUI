"use client";

import { useRef } from "react";
import SvgDrawOnScroll from "./svg-draw-on-scroll";

// A wide, shallow route: the whole path fits inside the 560px panel once it is
// drawn, so the end of the scroll shows the complete route centred instead of
// a narrow column running off the top edge.
const ROUTE =
  "M 40 300 C 140 300, 180 80, 300 90 S 440 320, 560 300 S 700 70, 820 100 S 940 260, 960 220";

const STOPS = [
  { label: "Trailhead · 0 km", top: "86%", left: "0%" },
  { label: "Lake Sorapis · 6.2 km", top: "6%", left: "22%" },
  { label: "Forcella Marcuoira · 11 km", top: "86%", left: "46%" },
  { label: "Summit hut · 18.4 km", top: "66%", right: "0%" },
];

export default function SvgDrawOnScrollDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-[560px] w-full overflow-y-auto overscroll-contain [scrollbar-width:none]"
      ref={scrollRef}
    >
      <div className="mx-auto flex h-[440px] max-w-xl flex-col items-center justify-center text-center">
        <p className="text-muted-foreground text-sm uppercase tracking-[0.25em]">
          Day 3 · Dolomites
        </p>
        <h3 className="mt-3 font-semibold text-5xl tracking-tight text-foreground">
          The long way to the hut
        </h3>
        <p className="mt-4 text-base text-muted-foreground">Scroll to walk the route ↓</p>
      </div>

      <div className="relative mx-auto h-[400px] w-full max-w-4xl px-6">
        <SvgDrawOnScroll
          className="h-full w-full text-foreground"
          container={scrollRef}
          marker={
            <span className="block size-5 rounded-full border-2 border-background bg-[oklch(0.72_0.2_352.53)] shadow-[0_0_0_6px_color-mix(in_oklab,oklch(0.72_0.2_352.53)_30%,transparent)]" />
          }
          offset={["start 0.8", "end 0.95"]}
          path={ROUTE}
          strokeWidth={4}
          viewBox="0 0 1000 400"
        />
        {STOPS.map((stop) => (
          <span
            className="absolute rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground"
            key={stop.label}
            style={{ left: stop.left, right: stop.right, top: stop.top }}
          >
            {stop.label}
          </span>
        ))}
      </div>

      <div className="flex h-[360px] items-start justify-center pt-10 text-base text-muted-foreground">
        18.4 km · 1,240 m elevation gain · 7h 10m
      </div>
    </div>
  );
}
