import NeumorphButton from "@/registry/cult-ui/neumorph-button";

export default function Demo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 p-8">
      <NeumorphButton intent="primary">Primary</NeumorphButton>
      <NeumorphButton intent="default">Default</NeumorphButton>
      <NeumorphButton intent="secondary">Secondary</NeumorphButton>
      <NeumorphButton intent="danger">Danger</NeumorphButton>
    </div>
  );
}
