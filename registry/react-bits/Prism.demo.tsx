"use client";

import Prism from "@/registry/react-bits/Prism";

export default function Demo() {
  return (
    <div className="w-full h-[400px] relative overflow-hidden rounded-xl bg-black">
      <Prism
        animationType="rotate"
        glow={1}
        noise={0.5}
        transparent={true}
        scale={3.6}
        timeScale={0.5}
      />
    </div>
  );
}
