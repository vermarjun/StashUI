import Cmp from "@/registry/origin-ui/comp-481";

export default function Demo() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10">
      {/* the table is wider than the stage: keep it inside a scrollable box, starting from the first column */}
      <div className="w-full overflow-x-auto">
        <Cmp />
      </div>
    </div>
  );
}
