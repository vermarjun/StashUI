"use client";

import AISources, { type AISource } from "./ai-sources";

const tile = (letter: string, bg: string) => (
  <span
    className="flex items-center justify-center font-semibold text-[9px] text-white"
    style={{ background: bg }}
  >
    {letter}
  </span>
);

const SOURCES: AISource[] = [
  {
    favicon: tile("N", "#e11d48"),
    id: "nature",
    snippet: "Deep-sea mineral nodules produce measurable oxygen in darkness",
    title: "Dark oxygen production at the abyssal seafloor",
    url: "https://journal.example.org/articles/dark-oxygen",
  },
  {
    favicon: tile("O", "#0284c7"),
    id: "noaa",
    snippet: "Survey of the Clarion-Clipperton Zone, 2013-2024",
    title: "Polymetallic nodule fields: a field report",
    url: "https://ocean.example.gov/ccz-survey",
  },
  {
    favicon: tile("W", "#52525b"),
    id: "wiki",
    snippet: "Overview of formation, composition and distribution",
    title: "Manganese nodule",
    url: "https://encyclopedia.example.org/wiki/Manganese_nodule",
  },
  {
    favicon: tile("S", "#16a34a"),
    id: "sci",
    snippet: "Electrolysis hypothesis and the voltage measured on nodules",
    title: "How rocks could split seawater",
    url: "https://science-news.example.com/rocks-split-seawater",
  },
  {
    favicon: tile("G", "#ca8a04"),
    id: "geo",
    snippet: "Why mining moratorium talks stalled in Kingston",
    title: "Seabed mining and the oxygen question",
    url: "https://geo-weekly.example.com/seabed-mining",
  },
];

export default function AISourcesDemo() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-5">
        <p className="text-foreground text-sm leading-relaxed">
          Yes. In 2024 researchers measured oxygen being produced 4,000 m below
          the surface, with no sunlight, around metallic nodules on the Pacific
          seafloor. The leading explanation is that the nodules act like tiny
          batteries, carrying enough voltage to split seawater into hydrogen and
          oxygen.
        </p>
        <AISources className="mt-3" sources={SOURCES} />
      </div>
    </div>
  );
}
