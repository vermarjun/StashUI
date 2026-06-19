import { StarsBackground } from "@/registry/aceternity-ui/stars-background";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-neutral-950">
      <StarsBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-lg font-medium text-white/70">Stars Background</p>
      </div>
    </div>
  );
}
