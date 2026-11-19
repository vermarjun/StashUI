"use client";

import ShapeGrid from "@/registry/react-bits/ShapeGrid";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-[#060010]">
      <ShapeGrid
        speed={0.5}
        squareSize={44}
        direction="diagonal"
        borderColor="#4c3a70"
        hoverFillColor="#7c3aed"
        shape="square"
        hoverTrailAmount={6}
      />
    </div>
  );
}
