"use client";
import Counter from "@/registry/react-bits/Counter";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full min-h-40 p-8">
      <Counter
        value={12345}
        fontSize={64}
        textColor="#ffffff"
        gradientFrom="#000000"
        gradientTo="transparent"
      />
      <Counter
        value={9.99}
        fontSize={48}
        textColor="#22c55e"
        gradientFrom="#000000"
        gradientTo="transparent"
      />
    </div>
  );
}
