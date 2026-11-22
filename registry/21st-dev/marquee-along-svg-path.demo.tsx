"use client";

import MarqueeAlongSvgPath from "./marquee-along-svg-path";

const IMAGES = [
  "1506905925346-21bda4d32df4",
  "1709949908058-a08659bfa922",
  "1693581176773-a5f2362209e6",
  "1548192746-dd526f154ed9",
  "1761882725885-d3d8bd2032d1",
  "1761775915848-467e41c1c4db",
  "1760389005000-bf02bf24f463",
  "1517849845537-4d257902454a",
  "1761882835101-02ab45ac0726",
  "1761078980679-e89e25fe279b",
];

// A loose figure-eight swoop across a 1000 x 560 canvas.
const PATH =
  "M -40 380 C 120 120, 320 80, 460 260 S 760 520, 900 300 S 1060 40, 1040 120";

export default function MarqueeAlongSvgPathDemo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-x-0 top-10 z-0 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Field notes · 2026</p>
        <h3 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">Ten places, one line</h3>
      </div>
      <MarqueeAlongSvgPath
        path={PATH}
        viewBox="0 0 1000 560"
        responsive
        showPath
        baseVelocity={8}
        slowdownOnHover
        draggable
        repeat={2}
        enableRollingZIndex
        className="absolute inset-0"
      >
        {IMAGES.map((id, i) => (
          <img
            key={id}
            src={`https://images.unsplash.com/photo-${id}?w=400&q=80`}
            alt={`Travel photo ${i + 1}`}
            draggable={false}
            className="h-28 w-20 rounded-lg object-cover shadow-xl ring-1 ring-white/10"
          />
        ))}
      </MarqueeAlongSvgPath>
    </div>
  );
}
