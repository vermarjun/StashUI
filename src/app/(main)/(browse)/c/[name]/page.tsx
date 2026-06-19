import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

import { getEntry } from "@/__registry__/registry.gen";
import { highlight } from "@/lib/shiki";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DetailPreview } from "@/components/site/detail-preview";
import { CodeBlock, InstallCommand } from "@/components/site/code-block";
import { CopyButton } from "@/components/site/copy-button";
import { FrameworkBadges } from "@/components/site/framework-badges";

// With ~2,000 components we don't prerender every detail page at build time —
// they render on-demand. (Flip this to return all names for a fully static export.)
export function generateStaticParams(): { name: string }[] {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const entry = getEntry(name);
  if (!entry) return {};
  return { title: entry.title, description: entry.description };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const entry = getEntry(name);
  if (!entry) notFound();

  const [codeHtml, demoHtml] = await Promise.all([
    highlight(entry.code),
    entry.demoCode ? highlight(entry.demoCode) : Promise.resolve(""),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All components
      </Link>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-semibold tracking-tight">
              {entry.title}
            </h1>
            <Badge variant="secondary" className="font-mono text-[10px]">
              {entry.category}
            </Badge>
            <FrameworkBadges frameworks={entry.frameworks} />
          </div>
          <p className="mt-1.5 max-w-xl text-muted-foreground">
            {entry.description}
          </p>
        </div>
        <CopyButton
          value={entry.code}
          label="Copy code"
          toastMessage="Component code copied"
          variant="outline"
          className="shrink-0"
        />
      </div>

      <div className="mt-8 space-y-8">
        <DetailPreview name={entry.name} />

        <div>
          <h2 className="mb-2 text-sm font-semibold">Install</h2>
          <p className="mb-3 text-sm text-muted-foreground">
            Same command in any shadcn project —{" "}
            {entry.frameworks.includes("react")
              ? "React (Vite/CRA), Next.js, Remix, Astro, and more"
              : "Next.js"}
            :
          </p>
          <InstallCommand name={entry.name} />
        </div>

        {demoHtml ? (
          <div>
            <h2 className="mb-3 text-sm font-semibold">Usage</h2>
            <CodeBlock html={demoHtml} code={entry.demoCode} maxHeight={300} />
          </div>
        ) : null}

        <div>
          <h2 className="mb-3 text-sm font-semibold">Component source</h2>
          <CodeBlock html={codeHtml} code={entry.code} maxHeight={9999} />
        </div>

        {(entry.dependencies.length > 0 ||
          entry.registryDependencies.length > 0) && (
          <>
            <Separator />
            <div className="grid gap-4 sm:grid-cols-2">
              {entry.dependencies.length > 0 && (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Dependencies
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.dependencies.map((d) => (
                      <Badge key={d} variant="outline" className="font-mono">
                        {d}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {entry.registryDependencies.length > 0 && (
                <div>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Registry dependencies
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.registryDependencies.map((d) => (
                      <Badge key={d} variant="outline" className="font-mono">
                        {d}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {entry.source?.library && (
          <p className="border-t border-border pt-4 text-xs text-muted-foreground">
            Source:{" "}
            {entry.source.url ? (
              <a
                href={entry.source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-0.5 underline decoration-muted-foreground/40 underline-offset-2 transition-colors hover:text-foreground"
              >
                {entry.source.library}
                <ArrowUpRight className="size-3" />
              </a>
            ) : (
              <span className="text-foreground">{entry.source.library}</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}
