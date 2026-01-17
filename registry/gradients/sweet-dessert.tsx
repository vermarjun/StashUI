import * as React from "react";
import { cn } from "@/lib/utils";

/** "Sweet Dessert" gradient. */
export const GradientSweetDessert_CSS = "linear-gradient(-225deg, #7742B2 0%, #F180FF 52%, #FD8BD9 100%)";

export function GradientSweetDessert({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #7742B2 0%, #F180FF 52%, #FD8BD9 100%)", ...style }}
      {...props}
    />
  );
}
