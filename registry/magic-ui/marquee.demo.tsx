import { Marquee } from "@/registry/magic-ui/marquee";

const companies = [
  "Acme Corp",
  "Globex",
  "Initech",
  "Umbrella",
  "Stark Industries",
  "Wayne Enterprises",
  "Oscorp",
  "Aperture Science",
];

export default function Demo() {
  return (
    <div className="w-full py-8 overflow-hidden">
      <Marquee pauseOnHover className="[--duration:25s]">
        {companies.map((name) => (
          <div
            key={name}
            className="mx-4 flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm"
          >
            <div className="h-4 w-4 rounded-full bg-muted-foreground/30" />
            {name}
          </div>
        ))}
      </Marquee>
    </div>
  );
}
