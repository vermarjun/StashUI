import { GravityStarsBackground } from "@/registry/animate-ui/components-backgrounds-gravity-stars";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <GravityStarsBackground className="absolute inset-0 h-full w-full" />
    </div>
  );
}
