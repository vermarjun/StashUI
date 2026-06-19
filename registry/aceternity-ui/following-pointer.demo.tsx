import { FollowerPointerCard } from "@/registry/aceternity-ui/following-pointer";

export default function Demo() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-background p-8">
      <FollowerPointerCard
        title="Read more →"
        className="max-w-sm rounded-2xl border border-border bg-card shadow-md"
      >
        <div className="overflow-hidden rounded-t-2xl">
          <div className="h-44 w-full bg-gradient-to-br from-violet-500 via-sky-400 to-emerald-400" />
        </div>
        <div className="p-5">
          <span className="mb-2 inline-block rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
            Design Systems
          </span>
          <h3 className="mb-1 text-lg font-semibold text-foreground">
            Building with Motion
          </h3>
          <p className="text-sm text-muted-foreground">
            Hover anywhere on this card — a custom pointer trails your cursor
            with a coloured label in tow.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-500" />
            <span className="text-xs text-muted-foreground">Jane Doe · 3 min read</span>
          </div>
        </div>
      </FollowerPointerCard>
    </div>
  );
}
