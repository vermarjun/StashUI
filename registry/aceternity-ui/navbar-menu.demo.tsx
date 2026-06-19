"use client";
import { useState } from "react";
import {
  Menu,
  MenuItem,
  ProductItem,
  HoveredLink,
} from "@/registry/aceternity-ui/navbar-menu";

export default function Demo() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="relative w-full flex items-start justify-center pt-12 pb-64 bg-gray-50 dark:bg-neutral-950 min-h-[420px]">
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="flex flex-col gap-3 p-2">
            <ProductItem
              title="Design System"
              description="Accessible, composable component primitives."
              href="#"
              src="https://assets.aceternity.com/demos/algochurn.webp"
            />
            <ProductItem
              title="Analytics"
              description="Real-time insights for your application."
              href="#"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
            />
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Resources">
          <div className="flex flex-col gap-2 p-2 text-sm">
            <HoveredLink href="#">Documentation</HoveredLink>
            <HoveredLink href="#">Changelog</HoveredLink>
            <HoveredLink href="#">Blog</HoveredLink>
            <HoveredLink href="#">Community</HoveredLink>
          </div>
        </MenuItem>

        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col gap-2 p-2 text-sm">
            <HoveredLink href="#">Free Tier</HoveredLink>
            <HoveredLink href="#">Pro Plan</HoveredLink>
            <HoveredLink href="#">Enterprise</HoveredLink>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
