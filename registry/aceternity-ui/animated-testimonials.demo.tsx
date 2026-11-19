"use client";
import { AnimatedTestimonials } from "@/registry/aceternity-ui/animated-testimonials";

const testimonials = [
  {
    quote:
      "This product has completely transformed how our team collaborates. The intuitive design and powerful features make every workflow effortless.",
    name: "Sarah Johnson",
    designation: "Product Manager at TechCorp",
    src: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&h=500&fit=crop&auto=format&q=80",
  },
  {
    quote:
      "I've tried many tools over the years, but nothing comes close to the simplicity and effectiveness of this platform. Truly outstanding.",
    name: "Michael Chen",
    designation: "Lead Engineer at StartupXYZ",
    src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=500&h=500&fit=crop&auto=format&q=80",
  },
  {
    quote:
      "Outstanding customer support and a product that truly delivers on its promises. Highly recommended for any growing team.",
    name: "Emily Rodriguez",
    designation: "CTO at InnovateCo",
    src: "https://images.unsplash.com/photo-1508873881324-c92a3fc536ba?w=500&h=500&fit=crop&auto=format&q=80",
  },
];

export default function Demo() {
  return (
    <div className="w-full max-w-4xl">
      <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
    </div>
  );
}
