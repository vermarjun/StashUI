import { LightRays } from "@/registry/magic-ui/light-rays";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-background rounded-lg">
      <LightRays
        count={8}
        color="rgba(160, 210, 255, 0.25)"
        blur={40}
        speed={12}
        length="80%"
      />
    </div>
  );
}
