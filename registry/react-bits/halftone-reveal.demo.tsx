"use client";

import HalftoneReveal from "@/registry/react-bits/halftone-reveal";

export default function Demo() {
  return (
    <div className="relative h-[620px] w-full overflow-hidden bg-black">
      <HalftoneReveal
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1400&q=80"
        fit="cover"
        mode="duotone"
        paperColor="#0b0b0f"
        inkColor="#f5f5f5"
        accentColor="#ff4f2a"
        wander
      />
    </div>
  );
}
