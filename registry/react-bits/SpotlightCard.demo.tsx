import Cmp from "@/registry/react-bits/SpotlightCard";

export default function Demo() {
  return (
    <div className="flex flex-wrap gap-6 items-center justify-center p-8">
      <Cmp className="w-64" spotlightColor="rgba(255, 255, 255, 0.25)">
        <h3 className="text-foreground font-semibold mb-2">White spotlight</h3>
        <p className="text-muted-foreground text-sm">
          Move your cursor over this card to see the radial spotlight follow.
        </p>
      </Cmp>
      <Cmp className="w-64" spotlightColor="rgba(120, 80, 255, 0.35)">
        <h3 className="text-foreground font-semibold mb-2">Purple spotlight</h3>
        <p className="text-muted-foreground text-sm">
          The spotlight color is fully customisable via a prop.
        </p>
      </Cmp>
    </div>
  );
}
