import GridLayoutAccordion from "@/registry/ui-layouts/gridlayout";

export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-5xl px-8 py-10">
      <h2 className="mb-1 text-2xl font-semibold tracking-tight text-foreground">
        Everything about UI components
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Two independent columns of questions, one answer open per column.
      </p>
      <GridLayoutAccordion />
    </div>
  );
}
