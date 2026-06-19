"use client"

import ShapeBlur from "@/registry/react-bits/ShapeBlur";

export default function Demo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden bg-black">
      <ShapeBlur
        variation={0}
        shapeSize={1.2}
        roundness={0.4}
        borderSize={0.05}
        circleSize={0.3}
        circleEdge={0.5}
      />
    </div>
  );
}
