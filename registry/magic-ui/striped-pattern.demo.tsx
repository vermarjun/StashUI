import { StripedPattern } from "@/registry/magic-ui/striped-pattern";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden text-muted-foreground/40">
      <StripedPattern direction="left" width={12} height={12} />
    </div>
  );
}
