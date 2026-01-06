"use client";
import Balatro from "@/registry/react-bits/Balatro";

export default function Demo() {
  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ height: "400px" }}>
      <Balatro
        color1="#DE443B"
        color2="#006BB4"
        color3="#162325"
        spinSpeed={7.0}
        spinAmount={0.25}
        contrast={3.5}
        lighting={0.4}
        isRotate={true}
        mouseInteraction={true}
      />
    </div>
  );
}
