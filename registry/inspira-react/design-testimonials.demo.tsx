"use client";

import { DesignTestimonials, type TestimonialItem } from "@/registry/inspira-react/design-testimonials";

const testimonials: TestimonialItem[] = [
  {
    quote: "This component library completely transformed how we build UIs. Absolutely stunning.",
    author: "Sarah Chen",
    role: "Lead Designer",
    company: "Acme Corp",
  },
  {
    quote: "The attention to detail and animation quality is unmatched. Our team loves it.",
    author: "Marcus Johnson",
    role: "Frontend Engineer",
    company: "Vercel",
  },
  {
    quote: "From prototype to production in record time. The components just work.",
    author: "Priya Patel",
    role: "Product Manager",
    company: "Linear",
  },
];

export default function DesignTestimonialsDemo() {
  return <DesignTestimonials testimonials={testimonials} title="What they say" duration={5000} />;
}
