"use client";
import {
  DirectionalDrawer,
  DrawerContent,
  DrawerTrigger,
} from "@/registry/ui-layouts/directional-drawer";

export default function Demo() {
  return (
    <div className="flex items-center justify-center min-h-[400px] bg-background">
      <DirectionalDrawer direction="left" outsideClose={true}>
        <DrawerTrigger>
          <button className="px-6 py-3 rounded-md bg-foreground text-background font-medium hover:opacity-90 transition-opacity">
            Open Drawer
          </button>
        </DrawerTrigger>
        <DrawerContent className="p-8 pt-12 flex flex-col gap-6 h-full">
          <div>
            <h2 className="text-xl font-semibold mb-1">Navigation</h2>
            <p className="text-sm text-muted-foreground">
              Slide-in panel from the left side of the screen.
            </p>
          </div>
          <nav className="flex flex-col gap-2">
            {["Dashboard", "Projects", "Settings", "Profile"].map((item) => (
              <a
                key={item}
                href="#"
                className="px-4 py-2 rounded-md hover:bg-muted text-sm font-medium transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="mt-auto">
            <button className="w-full px-4 py-2 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">
              Get Started
            </button>
          </div>
        </DrawerContent>
      </DirectionalDrawer>
    </div>
  );
}
