"use client";

import CrystalizedBall from "@/registry/react-bits/crystalized-ball";

export default function Demo() {
  return (
    <div className="relative h-[620px] w-full overflow-hidden bg-black">
      <CrystalizedBall preset="plasma" theme="dark" size={0.72} />
    </div>
  );
}
