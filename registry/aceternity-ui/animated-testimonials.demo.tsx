"use client";
import { AnimatedTestimonials } from "@/registry/aceternity-ui/animated-testimonials";

const testimonials = [
  {
    quote:
      "This product has completely transformed how our team collaborates. The intuitive design and powerful features make every workflow effortless.",
    name: "Sarah Johnson",
    designation: "Product Manager at TechCorp",
    src: "https://picsum.photos/seed/t1/500/500",
  },
  {
    quote:
      "I've tried many tools over the years, but nothing comes close to the simplicity and effectiveness of this platform. Truly outstanding.",
    name: "Michael Chen",
    designation: "Lead Engineer at StartupXYZ",
    src: "https://picsum.photos/seed/t2/500/500",
  },
  {
    quote:
      "Outstanding customer support and a product that truly delivers on its promises. Highly recommended for any growing team.",
    name: "Emily Rodriguez",
    designation: "CTO at InnovateCo",
    src: "https://picsum.photos/seed/t3/500/500",
  },
];

export default function Demo() {
  return (
    <div className="w-full max-w-4xl">
      <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
    </div>
  );
}
