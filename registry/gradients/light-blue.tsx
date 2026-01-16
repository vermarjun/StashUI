import * as React from "react";
import { cn } from "@/lib/utils";

/** "Light Blue" gradient. */
export const GradientLightBlue_CSS = "linear-gradient(-225deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 100%)";

export function GradientLightBlue({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 100%)", ...style }}
      {...props}
    />
  );
}
