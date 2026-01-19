import { cn } from "@/lib/utils";
import { PreviewClient } from "@/components/site/preview-client";

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ theme?: string }>;
}) {
  const { name } = await params;
  const { theme } = await searchParams;
  const dark = theme === "dark";

  return (
    <div
      className={cn(
        "relative flex h-screen w-screen items-center justify-center overflow-hidden bg-background p-6",
        dark && "dark",
      )}
    >
      <PreviewClient name={decodeURIComponent(name)} />
    </div>
  );
}
