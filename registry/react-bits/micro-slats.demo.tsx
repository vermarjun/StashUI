"use client";

import MicroSlats from "./micro-slats";

export default function MicroSlatsDemo() {
  return (
    <div className="relative h-[640px] w-full overflow-hidden bg-black">
      <MicroSlats preset="swell" />
    </div>
  );
}
