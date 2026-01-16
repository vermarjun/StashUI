import * as React from "react";
import { cn } from "@/lib/utils";

/** "Happy Acid" gradient. */
export const GradientHappyAcid_CSS = "linear-gradient(0deg, #37ecba 0%, #72afd3 100%)";

export function GradientHappyAcid({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #37ecba 0%, #72afd3 100%)", ...style }}
      {...props}
    />
  );
}
