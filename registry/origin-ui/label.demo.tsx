import { Label } from "@/registry/origin-ui/label";

export default function Demo() {
  return (
    <div className="w-full max-w-sm space-y-2">
      <Label htmlFor="username">
        Username <span className="text-destructive">*</span>
      </Label>
      <input
        id="username"
        type="text"
        placeholder="your_handle"
        className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      />
      <p className="text-xs text-muted-foreground">
        This is your public display name.
      </p>
    </div>
  );
}
