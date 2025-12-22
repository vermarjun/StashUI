import { ArrowRight } from "lucide-react";
import { GradientButton } from "@/registry/buttons/gradient-button";

export default function GradientButtonDemo() {
  return (
    <GradientButton>
      Get started
      <ArrowRight className="size-4" />
    </GradientButton>
  );
}
