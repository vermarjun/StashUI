import { ExpandableGallery } from "@/registry/inspira-react/expandable-gallery";

const IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
  "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&q=80",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80",
];

export default function ExpandableGalleryDemo() {
  return (
    <div className="w-full p-8">
      <p className="mb-4 text-sm text-muted-foreground">Hover over a panel to expand it</p>
      <ExpandableGallery images={IMAGES} />
    </div>
  );
}
