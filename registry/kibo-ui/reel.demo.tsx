"use client";

import { useState } from "react";
import {
  Reel,
  ReelContent,
  ReelControls,
  ReelFooter,
  ReelHeader,
  ReelImage,
  ReelMuteButton,
  ReelNextButton,
  ReelPlayButton,
  ReelPreviousButton,
  type ReelItem,
  ReelNavigation,
  ReelProgress,
  ReelVideo,
} from "./reel";

// All stills (no remote video): a slow CDN video played as a black slide in
// recordings. Every image is preloaded below so a slide never opens blank.
const items: ReelItem[] = [
  {
    id: "dolomites",
    type: "image",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
    duration: 4,
    alt: "Mountain ridge above the clouds",
    title: "Sunrise over the Dolomites",
    description: "4:52 am, Rifugio Lagazuoi. Worth every step.",
  },
  {
    id: "valley",
    type: "image",
    src: "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?w=900&q=80",
    duration: 4,
    alt: "Green valley between snowy peaks",
    title: "Down into the valley",
    description: "Eleven kilometres of switchbacks, one long lunch.",
  },
  {
    id: "horses",
    type: "image",
    src: "https://images.unsplash.com/photo-1460999158988-6f0380f81f4d?w=900&q=80",
    duration: 4,
    alt: "Horses grazing in a meadow",
    title: "Locals on the trail",
    description: "They followed us for a good half mile.",
  },
  {
    id: "lotus",
    type: "image",
    src: "https://images.unsplash.com/photo-1518599904199-0ca897819ddb?w=900&q=80",
    duration: 4,
    alt: "Blue lotus at dusk",
    title: "Last light at the lake",
    description: "Last night of the trip.",
  },
];

export default function ReelDemo() {
  const [index, setIndex] = useState(0);
  const current = items[index];
  return (
    <div className="flex h-[640px] w-full items-center justify-center p-6">
      <div aria-hidden className="hidden">
        {items.map((it) => (
          <img alt="" key={it.id} src={it.src} />
        ))}
      </div>
      <Reel
        className="h-full rounded-2xl"
        data={items}
        index={index}
        onIndexChange={setIndex}
      >
        <ReelProgress />
        <ReelHeader>
          <div className="flex items-center gap-2 text-white">
            <img
              alt="Maya Chen"
              className="size-8 rounded-full border border-white/40"
              src="https://i.pravatar.cc/150?img=47"
            />
            <div className="leading-tight">
              <p className="font-semibold text-sm">maya.chen</p>
              <p className="text-xs opacity-75">Italy · 2h</p>
            </div>
          </div>
        </ReelHeader>
        <ReelContent>
          {(item) =>
            item.type === "video" ? (
              <ReelVideo src={item.src} />
            ) : (
              <ReelImage
                alt={item.alt ?? ""}
                duration={item.duration}
                src={item.src}
              />
            )
          }
        </ReelContent>
        <ReelNavigation />
        <ReelFooter className="pb-16 text-white">
          <h3 className="font-semibold text-lg">{current.title}</h3>
          <p className="mt-1 text-sm opacity-90">{current.description}</p>
        </ReelFooter>
        <ReelControls>
          <div className="flex gap-1">
            <ReelPreviousButton />
            <ReelPlayButton />
            <ReelNextButton />
          </div>
          <ReelMuteButton />
        </ReelControls>
      </Reel>
    </div>
  );
}
