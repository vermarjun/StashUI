import * as React from "react";
import { cn } from "@/lib/utils";

/** "New Life" gradient. */
export const GradientNewLife_CSS = "linear-gradient(0deg, #43e97b 0%, #38f9d7 100%)";

export function GradientNewLife({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #43e97b 0%, #38f9d7 100%)", ...style }}
      {...props}
    />
  );
}
