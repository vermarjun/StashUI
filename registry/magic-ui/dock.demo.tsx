"use client";
import { Dock, DockIcon } from "@/registry/magic-ui/dock";
import {
  HomeIcon,
  SearchIcon,
  BellIcon,
  UserIcon,
  SettingsIcon,
  MailIcon,
  BookmarkIcon,
} from "lucide-react";

const iconClass = "h-full w-full text-neutral-600 dark:text-neutral-300";

export default function Demo() {
  return (
    <div className="flex items-center justify-center w-full min-h-[200px] py-12">
      <Dock>
        <DockIcon><HomeIcon className={iconClass} /></DockIcon>
        <DockIcon><SearchIcon className={iconClass} /></DockIcon>
        <DockIcon><MailIcon className={iconClass} /></DockIcon>
        <DockIcon><BellIcon className={iconClass} /></DockIcon>
        <DockIcon><BookmarkIcon className={iconClass} /></DockIcon>
        <DockIcon><UserIcon className={iconClass} /></DockIcon>
        <DockIcon><SettingsIcon className={iconClass} /></DockIcon>
      </Dock>
    </div>
  );
}
