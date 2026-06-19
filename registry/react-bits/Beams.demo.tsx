"use client";
import Cmp from "@/registry/react-bits/Beams";

export default function Demo() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "560px" }}>
      <Cmp beamNumber={12} beamWidth={2} beamHeight={15} lightColor="#ffffff" speed={2} />
    </div>
  );
}
