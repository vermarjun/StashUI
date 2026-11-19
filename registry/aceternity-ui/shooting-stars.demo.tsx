import { ShootingStars } from "@/registry/aceternity-ui/shooting-stars";
import { StarsBackground } from "@/registry/aceternity-ui/stars-background";

export default function Demo() {
  return (
    <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden bg-neutral-950">
      {/* Render the star canvas at half size and scale it up so the stars read on video. */}
      <div className="absolute left-0 top-0 h-1/2 w-1/2 origin-top-left scale-[2]">
        <StarsBackground starDensity={0.0006} />
      </div>
      <h2 className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-2 bg-gradient-to-b from-neutral-50 via-neutral-200 to-neutral-500 bg-clip-text text-center text-3xl font-medium tracking-tight text-transparent md:flex-row md:gap-8 md:text-5xl">
        <span>Shooting Star</span>
        <span className="text-lg font-thin text-white md:text-3xl">x</span>
        <span>Star Background</span>
      </h2>
      <ShootingStars minDelay={400} maxDelay={1000} starWidth={28} starHeight={2} minSpeed={14} maxSpeed={22} />
      <ShootingStars
        minDelay={500}
        maxDelay={1100}
        starWidth={24}
        starHeight={2}
        minSpeed={12}
        maxSpeed={20}
        starColor="#38bdf8"
        trailColor="#6366f1"
      />
      <ShootingStars
        minDelay={600}
        maxDelay={1200}
        starWidth={22}
        starHeight={2}
        minSpeed={12}
        maxSpeed={20}
        starColor="#ffffff"
        trailColor="#f0abfc"
      />
    </div>
  );
}
