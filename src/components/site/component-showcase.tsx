"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComponentPreview } from "@/components/site/component-preview";
import { CodeBlock, InstallCommand } from "@/components/site/code-block";
import { CopyButton } from "@/components/site/copy-button";
import { FrameworkBadges } from "@/components/site/framework-badges";

export interface ShowcaseEntry {
  name: string;
  title: string;
  description: string;
  category: string;
  frameworks: string[];
  code: string;
}

interface ComponentShowcaseProps {
  entry: ShowcaseEntry;
  codeHtml: string;
}

export function ComponentShowcase({ entry, codeHtml }: ComponentShowcaseProps) {
  return (
    <section id={entry.name} className="scroll-mt-24">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold tracking-tight">
              {entry.title}
            </h3>
            <Badge
              variant="secondary"
              className="font-mono text-[10px] font-normal"
            >
              {entry.category}
            </Badge>
            <FrameworkBadges frameworks={entry.frameworks} />
          </div>
          <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">
            {entry.description}
          </p>
        </div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="shrink-0 text-muted-foreground"
        >
          <Link href={`/c/${entry.name}`}>
            Details
            <ArrowUpRight className="size-3.5" />
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="preview" className="gap-3">
        <div className="flex items-center justify-between gap-2">
          <TabsList className="h-8">
            <TabsTrigger value="preview" className="text-xs">
              Preview
            </TabsTrigger>
            <TabsTrigger value="code" className="text-xs">
              Code
            </TabsTrigger>
          </TabsList>
          <CopyButton
            value={entry.code}
            label="Copy"
            toastMessage="Component code copied"
            className="text-muted-foreground"
          />
        </div>

        <TabsContent value="preview">
          <ComponentPreview name={entry.name} />
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock html={codeHtml} code={entry.code} />
        </TabsContent>
      </Tabs>

      <div className="mt-3">
        <InstallCommand name={entry.name} />
      </div>
    </section>
  );
}
