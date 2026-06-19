import { ShootingStars } from "@/registry/aceternity-ui/shooting-stars";

export default function Demo() {
  return (
    <div className="relative h-[600px] w-full overflow-hidden bg-neutral-950">
      <ShootingStars />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-lg font-medium text-white/70">Shooting Stars</p>
      </div>
    </div>
  );
}
