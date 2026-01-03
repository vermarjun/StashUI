"use client";

import { FloatingDock } from "@/registry/aceternity-ui/floating-dock";
import {
  HomeIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
  BellIcon,
} from "lucide-react";

const items = [
  { title: "Home", icon: <HomeIcon className="h-full w-full text-neutral-500 dark:text-neutral-400" />, href: "#" },
  { title: "Search", icon: <SearchIcon className="h-full w-full text-neutral-500 dark:text-neutral-400" />, href: "#" },
  { title: "Notifications", icon: <BellIcon className="h-full w-full text-neutral-500 dark:text-neutral-400" />, href: "#" },
  { title: "Profile", icon: <UserIcon className="h-full w-full text-neutral-500 dark:text-neutral-400" />, href: "#" },
  { title: "Settings", icon: <SettingsIcon className="h-full w-full text-neutral-500 dark:text-neutral-400" />, href: "#" },
];

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-[200px] p-8">
      <FloatingDock items={items} />
    </div>
  );
}
