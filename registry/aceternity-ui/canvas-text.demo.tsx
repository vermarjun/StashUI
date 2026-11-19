"use client";
import { CanvasText } from "@/registry/aceternity-ui/canvas-text";

export default function Demo() {
  return (
    <div className="flex min-h-[560px] w-full items-center justify-center px-8">
      <h2 className="max-w-4xl text-center text-6xl font-bold leading-[1.1] tracking-tight text-foreground md:text-[92px]">
        Turn rough ideas into{" "}
        <CanvasText
          text="living visuals"
          backgroundClassName="bg-sky-700"
          colors={[
            "rgba(125, 211, 252, 1)",
            "rgba(56, 189, 248, 0.9)",
            "rgba(14, 165, 233, 0.8)",
            "rgba(186, 230, 253, 0.9)",
            "rgba(99, 102, 241, 0.8)",
          ]}
          lineGap={4}
          lineWidth={1.2}
          curveIntensity={50}
          animationDuration={6}
        />
      </h2>
    </div>
  );
}
