import * as React from "react";
import { cn } from "@/lib/utils";

/** "Rich Metal" gradient. */
export const GradientRichMetal_CSS = "linear-gradient(0deg, #d7d2cc 0%, #304352 100%)";

export function GradientRichMetal({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #d7d2cc 0%, #304352 100%)", ...style }}
      {...props}
    />
  );
}
