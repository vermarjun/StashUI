import { Label } from "@/registry/aceternity-ui/label";

export default function Demo() {
  return (
    <form className="w-full max-w-sm space-y-2">
      <Label htmlFor="email">Email address</Label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <p className="text-xs text-muted-foreground">
        We&apos;ll never share your email with anyone else.
      </p>
    </form>
  );
}
