import * as React from "react";
import { cn } from "@/lib/utils";

/** "Happy Unicorn" gradient. */
export const GradientHappyUnicorn_CSS = "linear-gradient(0deg, #b3ffab 0%, #12fff7 100%)";

export function GradientHappyUnicorn({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #b3ffab 0%, #12fff7 100%)", ...style }}
      {...props}
    />
  );
}
