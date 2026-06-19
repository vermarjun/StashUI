"use client";

import { Highlight, HeroHighlight } from "@/registry/aceternity-ui/hero-highlight";
import { motion } from "motion/react";

export default function Demo() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-4xl text-center text-2xl font-bold leading-relaxed text-neutral-700 dark:text-white md:text-4xl lg:text-5xl lg:leading-snug"
      >
        Build beautiful products with{" "}
        <Highlight>modern&nbsp;tooling</Highlight>
        <br />
        and ship faster than ever.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        className="mx-auto mt-6 max-w-xl text-center text-base text-neutral-500 dark:text-neutral-400"
      >
        A curated component library for engineers who care about craft.
      </motion.p>
    </HeroHighlight>
  );
}
