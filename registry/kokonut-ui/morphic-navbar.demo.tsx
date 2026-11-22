import { MorphicNavbar } from "./morphic-navbar";

export default function MorphicNavbarDemo() {
  return (
    <div className="flex min-h-[360px] w-full flex-col items-center justify-center gap-6 p-6">
      <MorphicNavbar defaultPath="#work" />
      <p className="text-muted-foreground text-sm">
        Click a link, or press and drag across the bar to scrub.
      </p>
    </div>
  );
}
