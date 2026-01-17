import * as React from "react";
import { cn } from "@/lib/utils";

/** "Teen Party" gradient. */
export const GradientTeenParty_CSS = "linear-gradient(-225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)";

export function GradientTeenParty({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)", ...style }}
      {...props}
    />
  );
}
