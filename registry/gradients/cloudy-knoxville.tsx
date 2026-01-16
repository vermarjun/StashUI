import * as React from "react";
import { cn } from "@/lib/utils";

/** "Cloudy Knoxville" gradient. */
export const GradientCloudyKnoxville_CSS = "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)";

export function GradientCloudyKnoxville({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)", ...style }}
      {...props}
    />
  );
}
