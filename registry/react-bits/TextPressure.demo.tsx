"use client";
import TextPressure from "@/registry/react-bits/TextPressure";

export default function Demo() {
  return (
    <div className="flex w-full items-center justify-center px-10">
      <div className="relative h-[300px] w-full max-w-4xl">
        <TextPressure
          text="Pressure"
          weight
          width
          italic
          flex
          textColor="#fafafa"
          minFontSize={48}
        />
      </div>
    </div>
  );
}
