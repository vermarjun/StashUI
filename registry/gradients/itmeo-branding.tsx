import * as React from "react";
import { cn } from "@/lib/utils";

/** "Itmeo Branding" gradient. */
export const GradientItmeoBranding_CSS = "linear-gradient(180deg, #2af598 0%, #009efd 100%)";

export function GradientItmeoBranding({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("h-40 w-full rounded-xl", className)}
      style={{ backgroundImage: "linear-gradient(180deg, #2af598 0%, #009efd 100%)", ...style }}
      {...props}
    />
  );
}
