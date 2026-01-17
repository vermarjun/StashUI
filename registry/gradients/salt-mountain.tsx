import * as React from "react";
import { cn } from "@/lib/utils";

/** "Salt Mountain" gradient. */
export const GradientSaltMountain_CSS = "linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)";

export function GradientSaltMountain({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%)", ...style }}
      {...props}
    />
  );
}
