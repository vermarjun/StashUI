"use client";
import Cmp from "@/registry/react-bits/BounceCards";

const IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=300&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=300&h=300&fit=crop&auto=format",
];

export default function Demo() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <Cmp
        images={IMAGES}
        containerWidth={500}
        containerHeight={300}
        animationDelay={0.3}
        animationStagger={0.06}
        enableHover
        transformStyles={[
          "rotate(10deg) translate(-170px)",
          "rotate(5deg) translate(-85px)",
          "rotate(-3deg)",
          "rotate(-10deg) translate(85px)",
          "rotate(2deg) translate(170px)",
        ]}
      />
    </div>
  );
}
