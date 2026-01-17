import * as React from "react";
import { cn } from "@/lib/utils";

/** "Soft Cherish" gradient. */
export const GradientSoftCherish_CSS = "linear-gradient(0deg, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%)";

export function GradientSoftCherish({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #dbdcd7 0%, #dddcd7 24%, #e2c9cc 30%, #e7627d 46%, #b8235a 59%, #801357 71%, #3d1635 84%, #1c1a27 100%)", ...style }}
      {...props}
    />
  );
}
