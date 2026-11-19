"use client";
import { Archive, Home, Mail, Music, Settings, User } from "lucide-react";

import Dock from "@/registry/react-bits/Dock";

const icon = "size-[22px] text-white";

const dockItems = [
  { icon: <Home className={icon} />, label: "Home", onClick: () => {} },
  { icon: <Archive className={icon} />, label: "Archive", onClick: () => {} },
  { icon: <Mail className={icon} />, label: "Inbox", onClick: () => {} },
  { icon: <Music className={icon} />, label: "Music", onClick: () => {} },
  { icon: <User className={icon} />, label: "Profile", onClick: () => {} },
  { icon: <Settings className={icon} />, label: "Settings", onClick: () => {} },
];

export default function Demo() {
  return (
    <div className="relative flex h-[420px] w-full items-end justify-center pb-6">
      <Dock items={dockItems} panelHeight={76} baseItemSize={58} magnification={88} distance={180} />
    </div>
  );
}
