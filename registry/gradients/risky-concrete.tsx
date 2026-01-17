import * as React from "react";
import { cn } from "@/lib/utils";

/** "Risky Concrete" gradient. */
export const GradientRiskyConcrete_CSS = "linear-gradient(0deg, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%)";

export function GradientRiskyConcrete({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%)", ...style }}
      {...props}
    />
  );
}
