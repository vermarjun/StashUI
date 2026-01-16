import * as React from "react";
import { cn } from "@/lib/utils";

/** "Angel Care" gradient. */
export const GradientAngelCare_CSS = "linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)";

export function GradientAngelCare({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)", ...style }}
      {...props}
    />
  );
}
