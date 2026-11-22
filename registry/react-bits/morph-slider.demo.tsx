"use client";

import MorphSlider from "./morph-slider";

const ITEMS = [
  { image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80", caption: "Dolomites at first light" },
  { image: "https://images.unsplash.com/photo-1709949908058-a08659bfa922?w=1600&q=80", caption: "Coastline, late afternoon" },
  { image: "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?w=1600&q=80", caption: "Desert road, golden hour" },
  { image: "https://images.unsplash.com/photo-1548192746-dd526f154ed9?w=1600&q=80", caption: "Forest after the rain" },
];

export default function MorphSliderDemo() {
  return (
    <div className="flex min-h-[600px] w-full items-center justify-center bg-background p-6">
      <div className="h-[540px] w-full max-w-5xl">
        <MorphSlider items={ITEMS} transition="melt" autoplay autoplayDelay={3500} />
      </div>
    </div>
  );
}
