"use client";
import TextPressure from "@/registry/react-bits/TextPressure";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full h-[340px] bg-background">
      <TextPressure
        text="Compressa"
        weight
        width
        italic
        flex
        className="text-foreground"
        minFontSize={36}
      />
    </div>
  );
}
