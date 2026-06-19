import { BoxesCore } from "@/registry/aceternity-ui/background-boxes";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-slate-900">
      <BoxesCore />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="text-foreground text-2xl font-semibold">Background Boxes</p>
      </div>
    </div>
  );
}
