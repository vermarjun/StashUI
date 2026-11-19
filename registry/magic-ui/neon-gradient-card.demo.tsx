import { NeonGradientCard } from "@/registry/magic-ui/neon-gradient-card";

export default function Demo() {
  return (
    <div className="flex min-h-[520px] w-full items-center justify-center p-10">
      <NeonGradientCard className="max-w-sm items-center justify-center text-center">
        <span className="pointer-events-none z-10 block h-full bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text py-6 text-center text-6xl leading-none font-bold tracking-tighter whitespace-pre-wrap text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
          Neon Gradient Card
        </span>
      </NeonGradientCard>
    </div>
  );
}
