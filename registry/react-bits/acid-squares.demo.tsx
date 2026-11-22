"use client";

import AcidSquares from "./acid-squares";

export default function AcidSquaresDemo() {
  return (
    <div className="relative h-[640px] w-full overflow-hidden bg-black">
      <AcidSquares
        accentColor="#ff4fb8"
        secondaryColor="#3b6bff"
        tileSize={46}
        pulse={1}
        hoverEffect="press"
        pulseOnClick
      />
    </div>
  );
}
