"use client";
import Cmp from "@/registry/react-bits/FluidGlass";

export default function Demo() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "560px" }}>
      <Cmp mode="lens" />
    </div>
  );
}
