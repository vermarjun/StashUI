import { BackgroundBeams } from "@/registry/aceternity-ui/background-beams";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-neutral-950">
      <BackgroundBeams />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-foreground text-2xl font-semibold">Background Beams</p>
      </div>
    </div>
  );
}
