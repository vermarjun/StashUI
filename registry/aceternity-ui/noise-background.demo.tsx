import { NoiseBackground } from "@/registry/aceternity-ui/noise-background";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <NoiseBackground className="h-full w-full flex items-center justify-center" containerClassName="w-full h-full">
        <p className="text-lg font-medium text-foreground/70">
          Noise Background
        </p>
      </NoiseBackground>
    </div>
  );
}
