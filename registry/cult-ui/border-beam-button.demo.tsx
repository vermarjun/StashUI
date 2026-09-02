import { BorderBeamButton } from "@/registry/cult-ui/border-beam-button";

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <BorderBeamButton>Get Started</BorderBeamButton>
      <BorderBeamButton variant="outline">Documentation</BorderBeamButton>
    </div>
  );
}
