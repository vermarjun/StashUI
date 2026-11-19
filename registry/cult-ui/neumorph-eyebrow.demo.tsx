import { NeumorphEyebrow } from "@/registry/cult-ui/neumorph-eyebrow";

export default function Demo() {
  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-10 text-center">
      <div className="flex flex-col items-center">
        <NeumorphEyebrow>Introducing Cult UI</NeumorphEyebrow>
        <h2 className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
          Components with a little soul
        </h2>
        <p className="mt-3 text-muted-foreground">
          A soft, embossed eyebrow label to sit above your section headings.
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <NeumorphEyebrow>Default</NeumorphEyebrow>
        <NeumorphEyebrow intent="primary">New release</NeumorphEyebrow>
        <NeumorphEyebrow intent="secondary">v2.0 is live</NeumorphEyebrow>
      </div>
    </div>
  );
}
