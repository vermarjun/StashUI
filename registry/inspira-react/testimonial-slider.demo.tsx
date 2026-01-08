"use client";

import React from "react";
import { TestimonialSlider, Testimonial } from "@/registry/inspira-react/testimonial-slider";

const TESTIMONIALS: Testimonial[] = [
  {
    img: "https://i.pravatar.cc/60?img=1",
    quote: "This component library is incredible. The animations are smooth and the DX is fantastic.",
    name: "Alice Johnson",
    role: "Frontend Engineer at Acme",
  },
  {
    img: "https://i.pravatar.cc/60?img=2",
    quote: "Shipping UI has never been faster. Highly recommended for any React project.",
    name: "Bob Martinez",
    role: "Lead Developer at StartupCo",
  },
  {
    img: "https://i.pravatar.cc/60?img=3",
    quote: "Beautiful, polished components right out of the box. Our design team loves it.",
    name: "Carol Liu",
    role: "Product Designer at DesignHub",
  },
];

export default function TestimonialSliderDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-white dark:bg-zinc-900 rounded-xl">
      <TestimonialSlider
        testimonials={TESTIMONIALS}
        autoRotate={true}
        duration={5}
      />
    </div>
  );
}
