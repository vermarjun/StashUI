"use client";

import { ImagesSlider } from "@/registry/aceternity-ui/images-slider";
import { motion } from "motion/react";

export default function Demo() {
  const images = [
    "https://picsum.photos/seed/slider1/1200/700",
    "https://picsum.photos/seed/slider2/1200/700",
    "https://picsum.photos/seed/slider3/1200/700",
    "https://picsum.photos/seed/slider4/1200/700",
  ];

  return (
    <div className="w-full max-w-3xl mx-auto" style={{ height: "400px" }}>
      <ImagesSlider images={images} className="h-full">
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            The hero section slideshow <br /> nobody asked for
          </motion.p>
          <button className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4">
            <span>Explore now</span>
            <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
          </button>
        </motion.div>
      </ImagesSlider>
    </div>
  );
}
