"use client";

import Lightning from "@/registry/react-bits/Lightning";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-black">
      <Lightning hue={230} speed={1} intensity={1} size={1} xOffset={0} />
    </div>
  );
}
