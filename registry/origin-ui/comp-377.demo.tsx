import Cmp from "@/registry/origin-ui/comp-377";

export default function Demo() {
  return (
    <div className="flex min-h-[460px] w-full items-start justify-center px-6 pt-10">
      <header className="flex w-full max-w-2xl items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-3 shadow-sm">
        <div className="flex items-center gap-6">
          <span className="font-semibold text-foreground">Acme</span>
          <nav className="hidden gap-4 text-muted-foreground text-sm sm:flex">
            <span className="text-foreground">Dashboard</span>
            <span>Projects</span>
            <span>Reports</span>
          </nav>
        </div>
        <Cmp />
      </header>
    </div>
  );
}
