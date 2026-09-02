import { MetalButton } from "@/registry/cult-ui/metal-button";

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <MetalButton>Get Started</MetalButton>
      <MetalButton variant="secondary">Learn More</MetalButton>
    </div>
  );
}
