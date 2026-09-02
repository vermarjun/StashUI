import { cn } from "@/lib/utils";
import { PreviewClient } from "@/components/site/preview-client";

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{
    theme?: string;
    view?: string;
    align?: string;
    scroll?: string;
  }>;
}) {
  const { name } = await params;
  const { theme, view, align, scroll } = await searchParams;
  const dark = theme === "dark";
  const decoded = decodeURIComponent(name);

  // Detail view: the iframe is the component's real viewport. No scaling, no
  // forced aspect — the component fills the box's width and either centers
  // (self-contained widgets) or top-aligns and scrolls (multi-screen heroes).
  if (view === "detail") {
    const topAligned = align === "top";
    const scrollable = scroll === "true";
    return (
      <div
        className={cn(
          "min-h-screen w-full bg-background text-foreground",
          scrollable ? "overflow-y-auto" : "overflow-hidden",
          topAligned
            ? "flex flex-col"
            : "flex items-center justify-center p-4",
          dark && "dark",
        )}
      >
        <PreviewClient name={decoded} />
      </div>
    );
  }

  // Default (grid thumbnail / capture) view: centered and clipped.
  return (
    <div
      className={cn(
        "relative flex h-screen w-screen items-center justify-center overflow-hidden bg-background text-foreground p-6",
        dark && "dark",
      )}
    >
      <PreviewClient name={decoded} />
    </div>
  );
}
