import * as React from "react";
import { cn } from "@/lib/utils";

/** "Sea Lord" gradient. */
export const GradientSeaLord_CSS = "linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%)";

export function GradientSeaLord({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%)", ...style }}
      {...props}
    />
  );
}
