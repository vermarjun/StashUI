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
    mount?: string;
  }>;
}) {
  const { name } = await params;
  const { theme, view, align, scroll, mount } = await searchParams;
  const manual = mount === "manual";
  const dark = theme === "dark";
  const decoded = decodeURIComponent(name);

  // Detail view: the iframe is the component's real viewport. No scaling, no
  // forced aspect: the component fills the box's width and either centers
  // (self-contained widgets) or top-aligns and scrolls (multi-screen heroes).
  if (view === "detail") {
    const topAligned = align === "top";
    const scrollable = scroll === "true";
    return (
      <div
        data-rec-root=""
        className={cn(
          "min-h-screen w-full bg-background text-foreground",
          // Scrollable previews let the document itself scroll: an inner
          // overflow container would become the scroll root and silently
          // break every position:sticky in the demo (sticky navbars, scroll
          // stacks). Fixed-height previews just clip.
          scrollable ? "overflow-x-clip" : "overflow-hidden",
          topAligned
            ? "flex flex-col"
            : "flex h-screen items-center justify-center",
          dark && "dark",
        )}
      >
        <PreviewClient
          name={decoded}
          manual={manual}
          dark={dark}
          fillViewport={!topAligned}
        />
      </div>
    );
  }

  // Default (grid thumbnail / capture) view: centered and clipped.
  return (
    <div
      data-rec-root=""
      className={cn(
        "relative flex h-screen w-screen items-center justify-center overflow-hidden bg-background text-foreground p-6",
        dark && "dark",
      )}
    >
      <PreviewClient name={decoded} manual={manual} dark={dark} />
    </div>
  );
}
