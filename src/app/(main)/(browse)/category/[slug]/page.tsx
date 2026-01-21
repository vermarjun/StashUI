import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { componentsMeta } from "@/__registry__/meta.gen";
import { categoryConfig, CATEGORY_CONFIG } from "@/lib/categories";
import { ComponentGrid } from "@/components/site/component-grid";

export function generateStaticParams() {
  return CATEGORY_CONFIG.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: categoryConfig(slug).label };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const items = componentsMeta.filter((m) => m.category === slug);
  if (!items.length) notFound();
  const cfg = categoryConfig(slug);

  return (
    <div className="w-full py-10">
      <div className="mb-8 border-b border-border pb-6">
        <h1 className="text-3xl font-semibold tracking-tight">{cfg.label}</h1>
        <p className="mt-1.5 font-mono text-sm text-muted-foreground">
          {items.length} components · every library, one type
        </p>
      </div>
      <ComponentGrid items={items} cols={cfg.cols} designWidth={cfg.designWidth} />
    </div>
  );
}
