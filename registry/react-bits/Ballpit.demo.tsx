"use client";
import Cmp from "@/registry/react-bits/Ballpit";

export default function Demo() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: "560px" }}>
      <Cmp followCursor />
    </div>
  );
}
