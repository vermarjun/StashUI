"use client";

import { ImagesSlider } from "@/registry/inspira-react/images-slider";
import { motion } from "motion/react";

const IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&h=500&fit=crop",
];

export default function ImagesSliderDemo() {
  return (
    <ImagesSlider
      images={IMAGES}
      className="h-[400px] w-full rounded-2xl"
      autoplay={4000}
      direction="vertical"
      overlayClass="bg-black/40"
    >
      {(currentIndex) => (
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex h-full flex-col items-center justify-center gap-4 text-white"
        >
          <h2 className="text-center text-4xl font-bold drop-shadow-lg">
            Beautiful Landscapes
          </h2>
          <p className="text-center text-lg opacity-80">
            Slide {currentIndex + 1} of {IMAGES.length}
          </p>
        </motion.div>
      )}
    </ImagesSlider>
  );
}
