import Cmp from "@/registry/react-bits/TiltedCard";

export default function Demo() {
  return (
    <div className="flex flex-wrap gap-12 items-center justify-center p-8">
      <Cmp
        imageSrc="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80"
        altText="Mountain landscape"
        containerHeight="320px"
        imageHeight="300px"
        imageWidth="220px"
        captionText="Mountains · Unsplash"
      />
      <Cmp
        imageSrc="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&q=80"
        altText="Starry night"
        captionText="Starry Night · Unsplash"
        containerHeight="320px"
        imageHeight="300px"
        imageWidth="220px"
      />
    </div>
  );
}
