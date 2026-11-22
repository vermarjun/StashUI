"use client";

import AppleInvites, { type Event } from "./apple-invites";

const avatar = (n: number) => ({ avatar: `https://i.pravatar.cc/80?img=${n}` });

const EVENTS: Event[] = [
  {
    badge: "Hosting",
    id: 1,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    location: "Rifugio Lagazuoi",
    participants: [avatar(12), avatar(32), avatar(45)],
    subtitle: "Sat, Jun 14 · 6:30 AM",
    title: "Sunrise Hike",
  },
  {
    badge: "Going",
    id: 2,
    image:
      "https://images.unsplash.com/photo-1478028928718-7bfdb1b32095?w=800&q=80",
    location: "Reine Harbour",
    participants: [avatar(5), avatar(16)],
    subtitle: "Fri, Jun 20 · 11:00 PM",
    title: "Aurora Watch",
  },
  {
    badge: "Invited",
    id: 3,
    image:
      "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=800&q=80",
    location: "Torres del Paine",
    participants: [avatar(23), avatar(47), avatar(8)],
    subtitle: "Sun, Jul 6 · 9:00 AM",
    title: "Basecamp Brunch",
  },
  {
    backgroundClassName:
      "bg-gradient-to-br from-fuchsia-500 via-rose-500 to-amber-400",
    badge: "Hosting",
    id: 4,
    location: "The Loft, Brooklyn",
    participants: [avatar(33), avatar(41)],
    subtitle: "Thu, Jul 17 · 8:00 PM",
    title: "Maya's 30th",
  },
  {
    image:
      "https://images.unsplash.com/photo-1460999158988-6f0380f81f4d?w=800&q=80",
    badge: "Going",
    id: 5,
    location: "Pier 57 Rooftop",
    participants: [avatar(14), avatar(28), avatar(52)],
    subtitle: "Sat, Aug 2 · 7:30 PM",
    title: "Summer Screening",
  },
];

export default function AppleInvitesDemo() {
  return (
    <div className="relative h-[520px] w-full overflow-hidden">
      <AppleInvites events={EVENTS} interval={2200} />
    </div>
  );
}
