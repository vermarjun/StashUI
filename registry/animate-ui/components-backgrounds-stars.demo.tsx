import { StarsBackground } from "@/registry/animate-ui/components-backgrounds-stars";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <StarsBackground className="absolute inset-0 h-full w-full" />
    </div>
  );
}
