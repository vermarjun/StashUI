"use client";

import ArcadePixel, { ARCADE_SPRITES } from "./arcade-pixel";

export default function ArcadePixelDemo() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="flex w-full max-w-2xl flex-col items-center gap-7 rounded-3xl border border-border bg-black px-8 py-10">
        <div className="flex items-end gap-6">
          <ArcadePixel
            glow
            palette={["transparent", "#4ade80"]}
            pixelSize={6}
            sprite={ARCADE_SPRITES.alien}
          />
          <ArcadePixel
            glow
            palette={["transparent", "#f472b6"]}
            pixelSize={6}
            sprite={ARCADE_SPRITES.alienAlt}
          />
          <ArcadePixel
            glow
            palette={["transparent", "#facc15"]}
            pixelSize={6}
            sprite={ARCADE_SPRITES.heart}
          />
        </div>
        <ArcadePixel
          animate="type"
          crt
          glow={0.8}
          loop
          palette={["transparent", "oklch(0.72 0.2 352.53)"]}
          pixelSize={9}
          scanlines
          text="GAME OVER"
        />
        <ArcadePixel
          animate="marquee"
          columns={64}
          glow
          palette={["transparent", "#38bdf8"]}
          pixelSize={4}
          text="HIGH SCORE 098400   PLAYER 1   "
        />
        <ArcadePixel
          animate="blink"
          loop
          palette={["transparent", "#fafafa"]}
          pixelSize={3}
          text="INSERT COIN"
        />
      </div>
    </div>
  );
}
