import {
  MinimalCard,
  MinimalCardImage,
  MinimalCardTitle,
  MinimalCardDescription,
  MinimalCardContent,
} from "@/registry/cult-ui/minimal-card";

export default function MinimalCardDemo() {
  return (
    <div className="flex items-center justify-center w-full p-8">
      <MinimalCard className="w-[280px]">
        <MinimalCardImage
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
          alt="Mountain landscape"
        />
        <MinimalCardContent>
          <MinimalCardTitle>Mountain Escape</MinimalCardTitle>
          <MinimalCardDescription>
            A serene alpine retreat above the clouds. Perfect for a weekend of
            hiking and fresh air.
          </MinimalCardDescription>
        </MinimalCardContent>
      </MinimalCard>
    </div>
  );
}
