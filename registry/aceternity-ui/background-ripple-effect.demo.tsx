import { BackgroundRippleEffect } from "@/registry/aceternity-ui/background-ripple-effect";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-background">
      <BackgroundRippleEffect />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-lg font-medium text-foreground/50">
          Click the grid to ripple
        </p>
      </div>
    </div>
  );
}
