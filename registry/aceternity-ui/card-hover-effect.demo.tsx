"use client";
import { HoverEffect } from "@/registry/aceternity-ui/card-hover-effect";

const projects = [
  {
    title: "Stripe",
    description:
      "A technology company that builds economic infrastructure for the internet.",
    link: "https://stripe.com",
  },
  {
    title: "Netflix",
    description:
      "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more.",
    link: "https://netflix.com",
  },
  {
    title: "Google",
    description:
      "A multinational technology company that specializes in Internet-related services and products.",
    link: "https://google.com",
  },
  {
    title: "Meta",
    description:
      "A technology company that connects billions of people around the world through social platforms.",
    link: "https://meta.com",
  },
  {
    title: "Amazon",
    description:
      "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and AI.",
    link: "https://amazon.com",
  },
  {
    title: "Microsoft",
    description:
      "A multinational technology corporation producing computer software, consumer electronics, and personal computers.",
    link: "https://microsoft.com",
  },
];

export default function Demo() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <HoverEffect items={projects} />
    </div>
  );
}
