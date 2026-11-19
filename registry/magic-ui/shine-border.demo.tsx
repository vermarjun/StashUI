"use client";
import { ShineBorder } from "@/registry/magic-ui/shine-border";

const keyframes = `
@keyframes shine { 0% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } to { background-position: 0% 0%; } }
@media (prefers-reduced-motion: no-preference) { .motion-safe\\:animate-shine { animation: shine var(--duration) infinite linear; } }
`;

export default function Demo() {
  return (
    <div className="relative w-[360px] overflow-hidden rounded-xl border border-border bg-card p-6 text-card-foreground">
      <style>{keyframes}</style>
      <ShineBorder borderWidth={2} duration={8} shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
      <h3 className="text-xl font-semibold">Login</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter your credentials to access your account
      </p>
      <div className="mt-6 grid gap-4">
        <label className="grid gap-1.5 text-sm">
          Email
          <input
            className="h-9 rounded-md border border-input bg-transparent px-3 text-sm outline-none"
            placeholder="name@example.com"
            type="email"
          />
        </label>
        <label className="grid gap-1.5 text-sm">
          Password
          <input
            className="h-9 rounded-md border border-input bg-transparent px-3 text-sm outline-none"
            type="password"
          />
        </label>
        <button
          className="mt-2 h-9 rounded-md bg-primary text-sm font-medium text-primary-foreground"
          type="button"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
