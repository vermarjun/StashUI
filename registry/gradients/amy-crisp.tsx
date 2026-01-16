import * as React from "react";
import { cn } from "@/lib/utils";

/** "Amy Crisp" gradient. */
export const GradientAmyCrisp_CSS = "linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)";

export function GradientAmyCrisp({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)", ...style }}
      {...props}
    />
  );
}
