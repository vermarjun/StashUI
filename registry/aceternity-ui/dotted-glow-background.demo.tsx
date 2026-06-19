import { DottedGlowBackground } from "@/registry/aceternity-ui/dotted-glow-background";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-background">
      <DottedGlowBackground />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <p className="text-lg font-medium text-foreground/50">
          Dotted Glow Background
        </p>
      </div>
    </div>
  );
}
