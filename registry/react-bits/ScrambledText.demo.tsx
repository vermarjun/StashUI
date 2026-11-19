"use client";
import ScrambledText from "@/registry/react-bits/ScrambledText";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full min-h-[380px] bg-background p-8">
      <ScrambledText
        className="!m-0 max-w-[760px] text-foreground font-mono leading-tight"
        style={{ fontSize: "clamp(22px, 4.2vw, 48px)" }}
        radius={110}
        duration={1.0}
        speed={0.5}
        scrambleChars=".:"
      >
        Move your cursor across the text to scramble it.
      </ScrambledText>
    </div>
  );
}
