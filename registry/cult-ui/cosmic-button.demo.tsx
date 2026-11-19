import { CosmicButton } from "@/registry/cult-ui/cosmic-button";

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-12">
      <CosmicButton as="button" type="button" className="scale-125">
        Launch your agent
      </CosmicButton>
    </div>
  );
}
