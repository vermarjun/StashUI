export default function Page() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <img src="/a.png" alt="" width={40} height={40} />
      <button className="rounded-md bg-primary text-primary-foreground transition-colors focus-visible:ring-2 motion-reduce:transition-none">Go</button>
    </main>
  );
}
