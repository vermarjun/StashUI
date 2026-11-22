"use client";

import { Compass, Flame, Music, Utensils } from "lucide-react";
import {
  MorphingDiscoveryBar,
  type Category,
} from "@/registry/watermelon-ui/morphing-discovery-bar";

const categories: Category[] = [
  { id: "explore", label: "Explore", icon: <Compass size={18} />, activeColor: "#EEF4FF", activeTextColor: "#3B82F6" },
  { id: "trending", label: "Trending", icon: <Flame size={18} />, activeColor: "#FFF1EC", activeTextColor: "#F97316" },
  { id: "music", label: "Music", icon: <Music size={18} />, activeColor: "#F5EEFF", activeTextColor: "#A855F7" },
  { id: "food", label: "Food", icon: <Utensils size={18} />, activeColor: "#ECFDF3", activeTextColor: "#22C55E" },
];

export default function MorphingDiscoveryBarDemo() {
  return (
    <div className="flex w-full items-center justify-center">
      <MorphingDiscoveryBar categories={categories} />
    </div>
  );
}
