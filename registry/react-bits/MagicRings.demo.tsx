"use client"

import MagicRings from "@/registry/react-bits/MagicRings";

export default function Demo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden bg-black">
      <MagicRings
        color="#fc42ff"
        colorTwo="#42fcff"
        ringCount={6}
        followMouse
        clickBurst
      />
    </div>
  );
}
