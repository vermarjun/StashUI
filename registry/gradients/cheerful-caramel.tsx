import * as React from "react";
import { cn } from "@/lib/utils";

/** "Cheerful Caramel" gradient. */
export const GradientCheerfulCaramel_CSS = "linear-gradient(0deg, #e6b980 0%, #eacda3 100%)";

export function GradientCheerfulCaramel({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(0deg, #e6b980 0%, #eacda3 100%)", ...style }}
      {...props}
    />
  );
}
