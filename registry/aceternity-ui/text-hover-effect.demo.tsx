"use client";
import { TextHoverEffect } from "@/registry/aceternity-ui/text-hover-effect";

export default function Demo() {
  return (
    <div className="flex h-48 w-full max-w-2xl items-center justify-center">
      <TextHoverEffect text="HOVER ME" duration={0} />
    </div>
  );
}
