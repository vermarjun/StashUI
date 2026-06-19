"use client";
import { SquigglyText } from "@/registry/aceternity-ui/squiggly-text";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full max-w-xl py-16">
      <p className="text-4xl font-bold tracking-tight text-foreground">
        Make your text{" "}
        <SquigglyText className="text-4xl font-bold tracking-tight">
          squiggly
        </SquigglyText>{" "}
        and fun
      </p>
    </div>
  );
}
