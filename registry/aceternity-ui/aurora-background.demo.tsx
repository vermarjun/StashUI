import { AuroraBackground } from "@/registry/aceternity-ui/aurora-background";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <AuroraBackground className="h-full">
        <p className="text-foreground text-2xl font-semibold">Aurora Background</p>
      </AuroraBackground>
    </div>
  );
}
