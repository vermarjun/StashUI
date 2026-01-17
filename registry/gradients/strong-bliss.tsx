import * as React from "react";
import { cn } from "@/lib/utils";

/** "Strong Bliss" gradient. */
export const GradientStrongBliss_CSS = "linear-gradient(0deg, #f78ca0 0%, #f9748f 19%, #fd868c 60%)";

export function GradientStrongBliss({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #f78ca0 0%, #f9748f 19%, #fd868c 60%)", ...style }}
      {...props}
    />
  );
}
