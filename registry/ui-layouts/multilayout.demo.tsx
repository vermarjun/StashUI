import MultiLayoutAccordion from "@/registry/ui-layouts/multilayout";

export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-10">
      <h2 className="mb-1 text-2xl font-semibold tracking-tight text-foreground">
        Frequently asked questions
      </h2>
      <p className="mb-6 text-sm text-muted-foreground">
        Open as many answers as you like at once.
      </p>
      <MultiLayoutAccordion />
    </div>
  );
}
