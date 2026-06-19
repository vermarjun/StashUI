import { GradientBackground } from "@/registry/animate-ui/components-backgrounds-gradient";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <GradientBackground className="absolute inset-0 h-full w-full" />
    </div>
  );
}
