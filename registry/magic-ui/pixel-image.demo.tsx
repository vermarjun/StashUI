import { PixelImage } from "@/registry/magic-ui/pixel-image";

export default function Demo() {
  return (
    <div className="flex items-center justify-center p-8">
      <PixelImage
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&auto=format"
        grid="6x4"
        grayscaleAnimation={true}
        pixelFadeInDuration={900}
        maxAnimationDelay={1100}
        colorRevealDelay={1200}
      />
    </div>
  );
}
