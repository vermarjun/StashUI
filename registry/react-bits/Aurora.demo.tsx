"use client";
import Aurora from "@/registry/react-bits/Aurora";

export default function Demo() {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-black" style={{ height: "400px" }}>
      <Aurora
        colorStops={["#5227FF", "#7cff67", "#00c8ff"]}
        amplitude={1.2}
        blend={0.5}
        speed={1.0}
      />
    </div>
  );
}
