"use client";
import FlyingPosters from "@/registry/react-bits/FlyingPosters";

const posterImages = [
  "https://images.unsplash.com/photo-1642849206045-d34279481967?w=600&h=760&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=760&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1572025442646-866d16c84a54?w=600&h=760&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1573496358322-6d530124361d?w=600&h=760&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?w=600&h=760&fit=crop&auto=format&q=80",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=760&fit=crop&auto=format&q=80",
];

export default function Demo() {
  return (
    <div className="w-full overflow-hidden" style={{ height: "700px" }}>
      <FlyingPosters
        items={posterImages}
        planeWidth={300}
        planeHeight={380}
        distortion={3}
        scrollEase={0.03}
      />
    </div>
  );
}
