"use client"

import Antigravity from "@/registry/react-bits/Antigravity";

export default function Demo() {
  return (
    <div className="relative h-[560px] w-full overflow-hidden bg-black">
      <Antigravity
        count={300}
        color="#FF9FFC"
        particleShape="capsule"
        autoAnimate
        ringRadius={10}
        magnetRadius={10}
      />
    </div>
  );
}
