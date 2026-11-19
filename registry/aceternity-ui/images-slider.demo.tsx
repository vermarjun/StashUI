"use client";

import { ImagesSlider } from "@/registry/aceternity-ui/images-slider";
import { motion } from "motion/react";

export default function Demo() {
  const images = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=700&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=700&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=700&fit=crop&auto=format&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&h=700&fit=crop&auto=format&q=80",
  ];

  return (
    <div className="relative h-[700px] w-full overflow-hidden">
      <ImagesSlider images={images} className="h-full">
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            Places worth <br /> the long flight
          </motion.p>
          <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
            <span>Plan your trip →</span>
            <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
          </button>
        </motion.div>
      </ImagesSlider>
    </div>
  );
}
