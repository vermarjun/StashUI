import { GradientHeading } from "@/registry/cult-ui/gradient-heading";

export default function Demo() {
  return (
    <div className="flex min-h-[300px] w-full flex-col items-center justify-center gap-6 px-8 py-12">
      <GradientHeading size="xl" weight="bold">
        Ship faster with beautiful UI
      </GradientHeading>
      <GradientHeading size="md" variant="secondary" weight="semi">
        Composable components for every project
      </GradientHeading>
      <GradientHeading size="sm" variant="pink" weight="base">
        Designed with Tailwind v4 & Radix
      </GradientHeading>
    </div>
  );
}
