"use client";
import MotionDrawer from "@/registry/ui-layouts/motion-drawer";

export default function Demo() {
  return (
    <div className="relative min-h-[400px] w-full flex items-center justify-center bg-background overflow-hidden">
      <MotionDrawer
        direction="left"
        width={280}
        buttonOpeningVariants="merge"
        backgroundColor="hsl(var(--background))"
        overlayColor="rgba(0,0,0,0.25)"
      >
        <nav className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold mb-2 text-foreground">Menu</h2>
          {["Dashboard", "Projects", "Analytics", "Settings"].map((item) => (
            <a
              key={item}
              href="#"
              className="block px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              {item}
            </a>
          ))}
          <div className="mt-6 pt-4 border-t border-border">
            <button className="w-full px-4 py-2 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity">
              Upgrade Plan
            </button>
          </div>
        </nav>
      </MotionDrawer>
      <div className="text-center pointer-events-none select-none">
        <p className="text-2xl font-bold text-foreground">Motion Drawer</p>
        <p className="text-sm text-muted-foreground mt-1">
          Click the menu icon to open
        </p>
      </div>
    </div>
  );
}
