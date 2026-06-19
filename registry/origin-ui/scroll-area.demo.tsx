import { ScrollArea } from "@/registry/origin-ui/scroll-area";

const tags = Array.from({ length: 30 }, (_, i) => `v1.2.0-beta.${30 - i}`);

export default function Demo() {
  return (
    <ScrollArea className="h-72 w-64 rounded-md border border-border">
      <div className="p-4">
        <h4 className="mb-3 text-sm font-medium leading-none text-foreground">
          Releases
        </h4>
        {tags.map((tag) => (
          <div
            key={tag}
            className="border-b border-border py-2 text-sm text-muted-foreground last:border-0"
          >
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
