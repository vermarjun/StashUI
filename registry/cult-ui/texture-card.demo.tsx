import {
  TextureCard,
  TextureCardHeader,
  TextureCardTitle,
  TextureCardDescription,
  TextureCardContent,
  TextureCardFooter,
  TextureSeparator,
} from "@/registry/cult-ui/texture-card";

export default function TextureCardDemo() {
  return (
    <div className="flex items-center justify-center w-full p-8">
      <TextureCard className="w-[320px]">
        <TextureCardHeader className="px-6 pt-6 pb-3">
          <TextureCardTitle>Surface Texture</TextureCardTitle>
          <TextureCardDescription>
            Layered border rings create a subtle depth effect that works in both
            light and dark themes.
          </TextureCardDescription>
        </TextureCardHeader>
        <TextureSeparator />
        <TextureCardContent>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Each border layer is independently styled so the card feels
            tactile without relying on heavy shadows.
          </p>
        </TextureCardContent>
        <TextureSeparator />
        <TextureCardFooter>
          <span className="text-xs text-neutral-400">cult/ui</span>
          <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
            Explore →
          </span>
        </TextureCardFooter>
      </TextureCard>
    </div>
  );
}
