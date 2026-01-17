import * as React from "react";
import { cn } from "@/lib/utils";

/** "October Silenceiver" gradient. */
export const GradientOctoberSilenceiver_CSS = "linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%)";

export function GradientOctoberSilenceiver({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%)", ...style }}
      {...props}
    />
  );
}
