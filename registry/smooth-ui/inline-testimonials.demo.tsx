"use client";

import InlineTestimonials, { type Testimonial } from "./inline-testimonials";

const TESTIMONIALS: Testimonial[] = [
  {
    avatar: "https://i.pravatar.cc/120?img=32",
    id: "sofia",
    name: "Sofia Alvarez",
    quote:
      "We replaced three internal tools in a week. Our support queue dropped by a third before the end of the first month.",
    rating: 5,
    role: "Head of Ops, Northwind",
  },
  {
    avatar: "https://i.pravatar.cc/120?img=12",
    id: "daniel",
    name: "Daniel Okafor",
    quote:
      "The API is the cleanest I've integrated this year. Two engineers, one sprint, and it was in production.",
    rating: 5,
    role: "CTO, Fieldnote",
  },
  {
    avatar: "https://i.pravatar.cc/120?img=47",
    id: "hana",
    name: "Hana Sato",
    quote:
      "Finally a dashboard my finance team opens without being asked. The weekly digest alone paid for the plan.",
    rating: 4,
    role: "VP Finance, Kettle & Co",
  },
];

export default function InlineTestimonialsDemo() {
  return (
    <div className="flex w-full items-center justify-center px-8 py-16">
      <InlineTestimonials
        className="max-w-2xl text-2xl"
        testimonials={TESTIMONIALS}
        text="Teams like {{sofia}} at Northwind cut their support queue by a third, engineers like {{daniel}} ship integrations in a single sprint, and finance leads like {{hana}} actually read the weekly numbers."
      />
    </div>
  );
}
