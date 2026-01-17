import * as React from "react";
import { cn } from "@/lib/utils";

/** "Strict November" gradient. */
export const GradientStrictNovember_CSS = "linear-gradient(-225deg, #CBBACC 0%, #2580B3 100%)";

export function GradientStrictNovember({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(-225deg, #CBBACC 0%, #2580B3 100%)", ...style }}
      {...props}
    />
  );
}
