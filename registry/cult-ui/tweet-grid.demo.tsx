"use client";

import { TweetGrid, type TweetData } from "@/registry/cult-ui/tweet-grid";

const tweets: TweetData[] = [
  {
    id: "1",
    name: "Maya Chen",
    handle: "mayabuilds",
    avatar: "https://i.pravatar.cc/96?img=47",
    verified: true,
    text: "Rebuilt our marketing site in a weekend with copy-paste components. The masonry testimonial grid alone saved me a day of fiddling with CSS columns.",
    date: "9:41 AM · Oct 12, 2026",
    replies: 24,
    reposts: 61,
    likes: "1.2K",
  },
  {
    id: "2",
    name: "Diego Alvarez",
    handle: "diegoalv",
    avatar: "https://i.pravatar.cc/96?img=12",
    text: "Hot take: the best UI libraries are the ones you own. Copy the source, change the tokens, ship.",
    date: "4:18 PM · Oct 9, 2026",
    replies: 88,
    reposts: 140,
    likes: "2.9K",
  },
  {
    id: "3",
    name: "Priya Raman",
    handle: "priyadesigns",
    avatar: "https://i.pravatar.cc/96?img=32",
    verified: true,
    text: "Our activation went up 18% after we redid onboarding.\n\nNot because of a new feature. Because the empty states finally looked like someone cared.",
    date: "11:02 AM · Oct 7, 2026",
    replies: 41,
    reposts: 203,
    likes: "4.7K",
  },
  {
    id: "4",
    name: "Tom Becker",
    handle: "tbecker",
    avatar: "https://i.pravatar.cc/96?img=59",
    text: "Dark mode that just works, keyboard focus that just works, motion that respects reduced-motion. That's the whole wishlist.",
    date: "7:55 PM · Oct 5, 2026",
    replies: 9,
    reposts: 17,
    likes: 342,
  },
  {
    id: "5",
    name: "Aisha Bello",
    handle: "aishacodes",
    avatar: "https://i.pravatar.cc/96?img=45",
    verified: true,
    text: "Shipped v2 of our dashboard today 🚀 Charts, tables, command palette, all themed from one tokens file.",
    date: "2:30 PM · Oct 3, 2026",
    replies: 57,
    reposts: 92,
    likes: "1.8K",
  },
  {
    id: "6",
    name: "Lucas Moreau",
    handle: "lucasmoreau",
    avatar: "https://i.pravatar.cc/96?img=15",
    text: "Whoever made the hover states on these cards: thank you. Small details, huge difference.",
    date: "10:12 AM · Sep 30, 2026",
    replies: 6,
    reposts: 11,
    likes: 268,
  },
];

export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-5xl p-4">
      <TweetGrid tweets={tweets} columns={3} spacing="md" />
    </div>
  );
}
