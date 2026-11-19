"use client";
import { useEffect, useState } from "react";
import { TextFlippingBoard } from "@/registry/aceternity-ui/text-flipping-board";

const MESSAGES = [
  "NOW BOARDING\nGATE 12 - LISBON\nDEPARTS 09:45",
  "SHIP FASTER\nWITH STASHUI\n{R}{O}{Y}{G}{B}{V}",
  "FLIGHT SQ 318\nDELAYED 20 MIN\nTHANK YOU",
];

export default function Demo() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % MESSAGES.length), 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex min-h-[520px] w-full items-center justify-center px-6">
      <TextFlippingBoard text={MESSAGES[i]} className="max-w-4xl" duration={1.6} />
    </div>
  );
}
