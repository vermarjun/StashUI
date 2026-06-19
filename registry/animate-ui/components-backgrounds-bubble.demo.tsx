import { BubbleBackground } from "@/registry/animate-ui/components-backgrounds-bubble";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <BubbleBackground className="absolute inset-0 h-full w-full" />
    </div>
  );
}
