"use client";

import Lanyard from "./lanyard-react-bits";

export default function LanyardDemo() {
  return (
    <div className="relative h-[680px] w-full overflow-hidden bg-black">
      <Lanyard
        frontImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=900&q=80"
        finish="glossy"
        strapColor="#18181b"
        metal="silver"
      />
    </div>
  );
}
