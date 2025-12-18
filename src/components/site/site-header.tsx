import Link from "next/link";
import { SiGithub } from "@/components/site/icons";
import { CommandMenu } from "@/components/site/command-menu";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono text-sm font-semibold tracking-tight">
            my<span className="text-muted-foreground">/</span>ui
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-1.5">
          <CommandMenu />
          <div className="mx-1 hidden h-5 w-px bg-border sm:block" />
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="size-8 text-muted-foreground"
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <SiGithub className="size-4" />
            </a>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
