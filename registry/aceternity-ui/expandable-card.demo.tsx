"use client";

import { ExpandableCard, type ExpandableCardItem } from "./expandable-card";

const cards: ExpandableCardItem[] = [
  {
    title: "Northern Lights",
    description: "Maya Lindqvist",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    ctaText: "Play",
    ctaLink: "#",
    content: (
      <p>
        Recorded over three winters in a cabin above the Arctic Circle,
        Northern Lights is Maya Lindqvist&apos;s quietest record yet: felt
        piano, tape hiss and a voice that barely rises above a whisper.
        <br />
        <br />
        The title track was written in a single night during a geomagnetic
        storm and kept almost exactly as the first take.
      </p>
    ),
  },
  {
    title: "Paper Satellites",
    description: "The Slow Hours",
    src: "https://images.unsplash.com/photo-1478028928718-7bfdb1b32095?w=1200&q=80",
    ctaText: "Play",
    ctaLink: "#",
    content: (
      <p>
        A four-piece from Lisbon, The Slow Hours blend dream pop with
        shimmering twelve-string guitar. Paper Satellites opens their second
        album and has become the closer of every live set since.
        <br />
        <br />
        Over 40 million streams and a slot on the main stage at this
        year&apos;s summer festivals.
      </p>
    ),
  },
  {
    title: "Concrete Garden",
    description: "Idris Okafor",
    src: "https://images.unsplash.com/photo-1460999158988-6f0380f81f4d?w=1200&q=80",
    ctaText: "Play",
    ctaLink: "#",
    content: (
      <p>
        Producer Idris Okafor sampled field recordings from rooftop gardens
        across Lagos and London to build this warm, percussive track.
        <br />
        <br />
        Concrete Garden is the lead single from his debut LP, out this
        spring on vinyl and every streaming service.
      </p>
    ),
  },
  {
    title: "Low Tide",
    description: "Ana Ferreira",
    src: "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=1200&q=80",
    ctaText: "Play",
    ctaLink: "#",
    content: (
      <p>
        Ana Ferreira&apos;s fado-inflected ballad was written on a fishing
        pier in Nazaré. Strings arranged by the Porto Chamber Ensemble.
        <br />
        <br />
        Low Tide earned her a nomination for Best New Artist and a sold-out
        European tour.
      </p>
    ),
  },
];

export default function ExpandableCardDemo() {
  return (
    <div className="flex min-h-[620px] w-full items-center justify-center px-6 py-10">
      <ExpandableCard cards={cards} variant="list" />
    </div>
  );
}
