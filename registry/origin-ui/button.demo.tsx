import { Button } from "@/registry/origin-ui/button";

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="default">Button</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
