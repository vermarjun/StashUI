import { FireworksBackground } from "@/registry/animate-ui/components-backgrounds-fireworks";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <FireworksBackground className="absolute inset-0 h-full w-full" />
    </div>
  );
}
