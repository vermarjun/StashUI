"use client";

import { HeroParallax } from "@/registry/aceternity-ui/hero-parallax";

export default function Demo() {
  const products = [
    {
      title: "Moonbeam",
      link: "https://gomoonbeam.com",
      thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop&auto=format&q=80",
    },
    {
      title: "Cursor",
      link: "https://cursor.so",
      thumbnail: "https://images.unsplash.com/photo-1569292316763-0b667e9e960c?w=600&h=600&fit=crop&auto=format&q=80",
    },
    {
      title: "Rogue",
      link: "https://userogue.com",
      thumbnail: "https://images.unsplash.com/photo-1752440093057-1c188e7137e9?w=600&h=600&fit=crop&auto=format&q=80",
    },
    {
      title: "Editorially",
      link: "https://editorially.org",
      thumbnail: "https://images.unsplash.com/photo-1604076984203-587c92ab2e58?w=600&h=600&fit=crop&auto=format&q=80",
    },
    {
      title: "Editrix AI",
      link: "https://editrix.ai",
      thumbnail: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&h=600&fit=crop&auto=format&q=80",
    },
    {
      title: "Pixel Perfect",
      link: "https://app.pixelperfect.quest",
      thumbnail: "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?w=600&h=600&fit=crop&auto=format&q=80",
    },
    {
      title: "Algochurn",
      link: "https://algochurn.com",
      thumbnail: "https://images.unsplash.com/photo-1628965882741-570e75becd5d?w=600&h=600&fit=crop&auto=format&q=80",
    },
    {
      title: "Aceternity UI",
      link: "https://ui.aceternity.com",
      thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop&auto=format&q=80",
    },
    {
      title: "Tailwind Master Kit",
      link: "https://tailwindmasterkit.com",
      thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=600&fit=crop&auto=format&q=80",
    },
    {
      title: "SmartBridge",
      link: "https://smartbridgetech.com",
      thumbnail: "https://images.unsplash.com/photo-1516705486637-7b01bf9b9d13?w=600&h=600&fit=crop&auto=format&q=80",
    },
    {
      title: "Renderwork Studio",
      link: "https://renderwork.studio",
      thumbnail: "https://images.unsplash.com/photo-1695239510467-f1e93d649c2b?w=600&h=600&fit=crop&auto=format&q=80",
    },
    {
      title: "Creme Digital",
      link: "https://cremedigital.com",
      thumbnail: "https://images.unsplash.com/photo-1504198266287-1659872e6590?w=600&h=600&fit=crop&auto=format&q=80",
    },
    {
      title: "Golden Bells Academy",
      link: "https://goldenbellsacademy.com",
      thumbnail: "https://images.unsplash.com/photo-1718838541476-d04e71caa347?w=600&h=600&fit=crop&auto=format&q=80",
    },
    {
      title: "Invoker Labs",
      link: "https://invoker.lol",
      thumbnail: "https://images.unsplash.com/photo-1554931670-4ebfabf6e7a9?w=600&h=600&fit=crop&auto=format&q=80",
    },
    {
      title: "E Free Invoice",
      link: "https://efreeinvoice.com",
      thumbnail: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=600&h=600&fit=crop&auto=format&q=80",
    },
  ];

  return (
    <div className="w-full">
      <HeroParallax products={products} />
    </div>
  );
}
