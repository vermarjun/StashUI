"use client";
import ColourfulText from "@/registry/aceternity-ui/colourful-text";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full max-w-xl p-8">
      <h1 className="text-4xl font-bold">
        <ColourfulText text="Hello World" />
      </h1>
    </div>
  );
}
