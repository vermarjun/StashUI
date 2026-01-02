"use client";
import { SpinningText } from "@/registry/magic-ui/spinning-text";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full max-w-md p-16">
      <SpinningText radius={6} duration={8} className="text-sm font-medium">
        {"Magic UI • Component Library • React • "}
      </SpinningText>
    </div>
  );
}
