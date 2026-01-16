import * as React from "react";
import { cn } from "@/lib/utils";

/** "Le Cocktail" gradient. */
export const GradientLeCocktail_CSS = "linear-gradient(45deg, #874da2 0%, #c43a30 100%)";

export function GradientLeCocktail({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(45deg, #874da2 0%, #c43a30 100%)", ...style }}
      {...props}
    />
  );
}
