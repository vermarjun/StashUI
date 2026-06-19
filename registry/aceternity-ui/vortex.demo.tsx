import { Vortex } from "@/registry/aceternity-ui/vortex";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <Vortex containerClassName="h-full w-full">
        <p className="text-foreground text-2xl font-semibold">Vortex</p>
      </Vortex>
    </div>
  );
}
