"use client";

import { HeroParallax } from "@/registry/aceternity-ui/hero-parallax";

export default function Demo() {
  const products = [
    {
      title: "Moonbeam",
      link: "https://gomoonbeam.com",
      thumbnail: "https://picsum.photos/seed/moonbeam/600/600",
    },
    {
      title: "Cursor",
      link: "https://cursor.so",
      thumbnail: "https://picsum.photos/seed/cursor/600/600",
    },
    {
      title: "Rogue",
      link: "https://userogue.com",
      thumbnail: "https://picsum.photos/seed/rogue/600/600",
    },
    {
      title: "Editorially",
      link: "https://editorially.org",
      thumbnail: "https://picsum.photos/seed/editorially/600/600",
    },
    {
      title: "Editrix AI",
      link: "https://editrix.ai",
      thumbnail: "https://picsum.photos/seed/editrix/600/600",
    },
    {
      title: "Pixel Perfect",
      link: "https://app.pixelperfect.quest",
      thumbnail: "https://picsum.photos/seed/pixel/600/600",
    },
    {
      title: "Algochurn",
      link: "https://algochurn.com",
      thumbnail: "https://picsum.photos/seed/algochurn/600/600",
    },
    {
      title: "Aceternity UI",
      link: "https://ui.aceternity.com",
      thumbnail: "https://picsum.photos/seed/aceternity/600/600",
    },
    {
      title: "Tailwind Master Kit",
      link: "https://tailwindmasterkit.com",
      thumbnail: "https://picsum.photos/seed/tailwind/600/600",
    },
    {
      title: "SmartBridge",
      link: "https://smartbridgetech.com",
      thumbnail: "https://picsum.photos/seed/smartbridge/600/600",
    },
    {
      title: "Renderwork Studio",
      link: "https://renderwork.studio",
      thumbnail: "https://picsum.photos/seed/renderwork/600/600",
    },
    {
      title: "Creme Digital",
      link: "https://cremedigital.com",
      thumbnail: "https://picsum.photos/seed/cremedigital/600/600",
    },
    {
      title: "Golden Bells Academy",
      link: "https://goldenbellsacademy.com",
      thumbnail: "https://picsum.photos/seed/goldenbells/600/600",
    },
    {
      title: "Invoker Labs",
      link: "https://invoker.lol",
      thumbnail: "https://picsum.photos/seed/invoker/600/600",
    },
    {
      title: "E Free Invoice",
      link: "https://efreeinvoice.com",
      thumbnail: "https://picsum.photos/seed/efreeinvoice/600/600",
    },
  ];

  return (
    <div className="w-full">
      <HeroParallax products={products} />
    </div>
  );
}
