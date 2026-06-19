"use client";

import Threads from "@/registry/react-bits/Threads";

export default function Demo() {
  return (
    <div className="w-full h-[600px] bg-black rounded-xl overflow-hidden">
      <Threads
        color={[1, 1, 1]}
        amplitude={1}
        distance={0}
        enableMouseInteraction={true}
      />
    </div>
  );
}
