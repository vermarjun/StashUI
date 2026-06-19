"use client";

import Iridescence from "@/registry/react-bits/Iridescence";

export default function Demo() {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden">
      <Iridescence
        color={[1, 1, 1]}
        speed={1.0}
        amplitude={0.1}
        mouseReact={true}
      />
    </div>
  );
}
