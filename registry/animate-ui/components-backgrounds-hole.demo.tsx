import { HoleBackground } from "@/registry/animate-ui/components-backgrounds-hole";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <HoleBackground className="absolute inset-0 h-full w-full" />
    </div>
  );
}
