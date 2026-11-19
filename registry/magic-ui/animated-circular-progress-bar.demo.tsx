"use client";

import { useEffect, useState } from "react";
import { AnimatedCircularProgressBar } from "@/registry/magic-ui/animated-circular-progress-bar";

export default function Demo() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const handleIncrement = (prev: number) => (prev === 100 ? 0 : prev + 10);
    setValue(handleIncrement);
    const interval = setInterval(() => setValue(handleIncrement), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedCircularProgressBar
      value={value}
      gaugePrimaryColor="rgb(79 70 229)"
      gaugeSecondaryColor="rgba(128, 128, 128, 0.2)"
      className="size-52 text-4xl"
    />
  );
}
