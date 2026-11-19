import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight } from "lucide-react";
import type { Metadata } from "next";

import { getEntry } from "@/__registry__/registry.gen";
import { highlight } from "@/lib/shiki";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { componentsMeta } from "@/__registry__/meta.gen";
import { ComponentCard } from "@/components/site/component-card";
import { DetailPreview } from "@/components/site/detail-preview";
import { CodeBlock, InstallCommand } from "@/components/site/code-block";
import { CopyButton } from "@/components/site/copy-button";
import { categoryConfig } from "@/lib/categories";

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

  const cat = categoryConfig(entry.category);
  // Neighbours in the primary category, in gallery order, for prev/next and
  // "more like this".
  const siblings = componentsMeta.filter((m) => m.category === entry.category);
  const idx = siblings.findIndex((m) => m.name === entry.name);
  const prev = idx > 0 ? siblings[idx - 1] : null;
  const next = idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null;
  const related = siblings
    .filter((m) => m.name !== entry.name)
    .slice(Math.max(0, idx - 1), Math.max(0, idx - 1) + 3);

  return (
    <div className="w-full pb-20 pt-6">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link href="/" className="transition-colors hover:text-foreground">
          Components
        </Link>
        <ChevronRight className="size-3.5" />
        <Link
          href={`/category/${entry.category}`}
          className="transition-colors hover:text-foreground"
        >
          {cat.label}
        </Link>
      </nav>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight">{entry.title}</h1>
          {entry.description && (
            <p className="mt-2 max-w-2xl text-pretty text-muted-foreground">
              {entry.description}
            </p>
          )}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            {entry.categories.map((slug) => (
              <Badge
                key={slug}
                asChild
                variant="outline"
                className="font-normal text-muted-foreground hover:text-foreground"
              >
                <Link href={`/category/${slug}`}>
                  {categoryConfig(slug).label}
                </Link>
              </Badge>
            ))}
            {!entry.frameworks.includes("react") && (
              <Badge variant="secondary" className="font-normal">
                Next.js only
              </Badge>
            )}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {entry.source?.url && (
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground">
              <a href={entry.source.url} target="_blank" rel="noreferrer">
                {entry.source.library}
                <ArrowUpRight className="size-3.5" />
              </a>
            </Button>
          )}
          <CopyButton
            value={entry.code}
            label="Copy source"
            toastMessage="Component source copied"
            variant="outline"
          />
        </div>
      </div>

      <div className="mt-8">
        <DetailPreview
          name={entry.name}
          title={entry.title}
          demoHtml={demoHtml || undefined}
          demoCode={entry.demoCode || undefined}
        />
      </div>

      <div className="mt-12 grid gap-12">
        <section>
          <h2 className="mb-1 text-lg font-semibold tracking-tight">Installation</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            One command in any shadcn project (
            {entry.frameworks.includes("react")
              ? "React with Vite, Next.js, Remix, Astro…"
              : "Next.js"}
            ). It installs the component and its dependencies.
          </p>
          <InstallCommand name={entry.name} />
          {(entry.dependencies.length > 0 ||
            entry.registryDependencies.length > 0) && (
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-xs text-muted-foreground">Pulls in</span>
              {[...entry.dependencies, ...entry.registryDependencies].map((d) => (
                <Badge key={d} variant="outline" className="font-mono text-[11px] font-normal">
                  {d}
                </Badge>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Source</h2>
          <CodeBlock html={codeHtml} code={entry.code} maxHeight={420} collapsible />
        </section>

        {(prev || next) && (
          <nav className="grid gap-3 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/c/${prev.name}`}
                className="group rounded-xl border border-border p-4 transition-colors hover:bg-muted/30"
              >
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ArrowLeft className="size-3.5" /> Previous
                </span>
                <span className="mt-1 block truncate font-medium">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/c/${next.name}`}
                className="group rounded-xl border border-border p-4 text-right transition-colors hover:bg-muted/30"
              >
                <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
                  Next <ArrowRight className="size-3.5" />
                </span>
                <span className="mt-1 block truncate font-medium">{next.title}</span>
              </Link>
            )}
          </nav>
        )}

        {related.length > 0 && (
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold tracking-tight">More {cat.label.toLowerCase()}</h2>
              <Link
                href={`/category/${entry.category}`}
                className="flex items-center gap-0.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                View all <ChevronRight className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((m, i) => (
                <ComponentCard
                  key={m.name}
                  item={m}
                  designWidth={cat.designWidth}
                  className={i === 2 ? "hidden xl:flex" : undefined}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
