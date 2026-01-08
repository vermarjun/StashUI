"use client"

import { AnimatedTestimonials } from "@/registry/inspira-react/animated-testimonials"

const testimonials = [
  {
    quote: "This component library has completely transformed how our team builds UIs. The animations are buttery smooth and the developer experience is outstanding.",
    name: "Sarah Chen",
    designation: "Lead Frontend Engineer at Vercel",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
  },
  {
    quote: "I was blown away by how easy it was to integrate these components into our existing codebase. The TypeScript support is first-class and the docs are excellent.",
    name: "Marcus Johnson",
    designation: "CTO at TechCorp",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
  },
  {
    quote: "The animated testimonials component alone saved us days of work. Highly recommend this library to any team building modern React applications.",
    name: "Priya Patel",
    designation: "Product Designer at Figma",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop",
  },
]

export default function AnimatedTestimonialsDemo() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <AnimatedTestimonials testimonials={testimonials} autoplay duration={4000} />
    </div>
  )
}
