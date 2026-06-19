import { Scales } from "@/registry/aceternity-ui/scales";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-background">
      <Scales />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-lg font-medium text-foreground/50">Scales Pattern</p>
      </div>
    </div>
  );
}
