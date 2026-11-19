"use client";
import ElectricBorder from "@/registry/react-bits/ElectricBorder";

export default function Demo() {
  return (
    <ElectricBorder borderRadius={16} chaos={0.12} color="#7df9ff" speed={1}>
      <div className="flex w-[340px] flex-col gap-3 rounded-2xl p-8">
        <span className="w-fit rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          Featured
        </span>
        <h3 className="text-2xl font-semibold text-foreground">Electric Border</h3>
        <p className="text-sm leading-relaxed text-muted-foreground">
          A noise-driven, crackling outline drawn on a canvas around any content.
          Tune its colour, speed and chaos.
        </p>
      </div>
    </ElectricBorder>
  );
}
