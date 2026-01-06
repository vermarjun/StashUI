"use client";
import RotatingText from "@/registry/react-bits/RotatingText";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full min-h-32 gap-2 text-3xl font-bold">
      <span>We build</span>
      <RotatingText
        texts={["beautiful", "fast", "accessible", "modern"]}
        mainClassName="text-blue-500"
        rotationInterval={2000}
      />
      <span>apps.</span>
    </div>
  );
}
