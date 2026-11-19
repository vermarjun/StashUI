"use client";
import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  NavbarLogo,
  NavbarButton,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/registry/aceternity-ui/resizable-navbar";

const navItems = [
  { name: "Features", link: "#features" },
  { name: "Pricing", link: "#pricing" },
  { name: "About", link: "#about" },
  { name: "Blog", link: "#blog" },
];

export default function Demo() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="relative w-full bg-gray-50 dark:bg-neutral-950">
      {/* fixed (not sticky) so it pins to the viewport even inside a scrolling wrapper */}
      <Navbar className="fixed top-5">
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2">
            <NavbarButton variant="secondary" href="#">Sign in</NavbarButton>
            <NavbarButton variant="dark" href="#">Get Started</NavbarButton>
          </div>
        </NavBody>
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
            {navItems.map((item) => (
              <a key={item.name} href={item.link} className="text-neutral-700 dark:text-neutral-300 font-medium">
                {item.name}
              </a>
            ))}
            <NavbarButton variant="dark" href="#" className="w-full">Get Started</NavbarButton>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-24">
        <h1 className="text-center text-5xl font-bold tracking-tight text-neutral-900 md:text-6xl dark:text-white">
          Plan, build and ship in one place
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-center text-neutral-500 dark:text-neutral-400">
          Scroll the page: the full-width navbar shrinks into a floating
          blurred pill and expands again at the top.
        </p>
        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            "Roadmaps",
            "Sprints",
            "Docs",
            "Analytics",
            "Automations",
            "Integrations",
            "Releases",
            "Feedback",
            "Goals",
          ].map((t) => (
            <div
              key={t}
              className="h-56 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <p className="font-medium text-neutral-900 dark:text-white">{t}</p>
              <div className="mt-4 space-y-2">
                <div className="h-2 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
                <div className="h-2 w-1/2 rounded bg-neutral-200 dark:bg-neutral-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
