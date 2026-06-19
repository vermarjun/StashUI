"use client";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/registry/aceternity-ui/sidebar";
import {
  HomeIcon,
  LayoutDashboardIcon,
  FileTextIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";

const links = [
  { label: "Home", href: "#", icon: <HomeIcon className="h-5 w-5 shrink-0 text-neutral-500 dark:text-neutral-400" /> },
  { label: "Dashboard", href: "#", icon: <LayoutDashboardIcon className="h-5 w-5 shrink-0 text-neutral-500 dark:text-neutral-400" /> },
  { label: "Documents", href: "#", icon: <FileTextIcon className="h-5 w-5 shrink-0 text-neutral-500 dark:text-neutral-400" /> },
  { label: "Profile", href: "#", icon: <UserIcon className="h-5 w-5 shrink-0 text-neutral-500 dark:text-neutral-400" /> },
  { label: "Settings", href: "#", icon: <SettingsIcon className="h-5 w-5 shrink-0 text-neutral-500 dark:text-neutral-400" /> },
];

export default function Demo() {
  return (
    <div className="flex h-64 w-full overflow-hidden rounded-xl border border-border bg-background">
      <Sidebar>
        <SidebarBody className="h-full">
          <div className="flex flex-col gap-1 pt-2">
            {links.map((link) => (
              <SidebarLink key={link.label} link={link} />
            ))}
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        Main content area
      </div>
    </div>
  );
}
