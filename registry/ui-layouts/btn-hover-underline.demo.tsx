import ButtonHoverUnderLine from "@/registry/ui-layouts/btn-hover-underline";

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
        Have a project in mind?
      </p>
      <div className="text-5xl font-semibold tracking-tight text-foreground">
        <ButtonHoverUnderLine />
      </div>
      <p className="text-sm text-muted-foreground">Hover to draw the underline</p>
    </div>
  );
}
