import Cmp from "@/registry/ui-layouts/buy-me-coffee";

export default function Demo() {
  // Shrink the card and drop its large default margins so it sits comfortably
  // inside the preview box instead of overflowing it.
  return (
    <div className="flex items-center justify-center p-6">
      <Cmp classname="my-0! h-72! w-72!" />
    </div>
  );
}
