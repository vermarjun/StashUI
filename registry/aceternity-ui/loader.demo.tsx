import {
  LoaderFive,
  LoaderFour,
  LoaderOne,
  LoaderThree,
  LoaderTwo,
} from "@/registry/aceternity-ui/loader";

const loaders = [
  { label: "Bounce", node: <LoaderOne /> },
  { label: "Slide", node: <LoaderTwo /> },
  { label: "Bolt", node: <LoaderThree /> },
  { label: "Glitch", node: <LoaderFour text="Loading..." /> },
  { label: "Shimmer", node: <LoaderFive text="Generating chat..." /> },
];

export default function Demo() {
  return (
    <div className="grid w-full max-w-4xl grid-cols-2 gap-5 p-6 sm:grid-cols-3">
      {loaders.map((l) => (
        <div
          key={l.label}
          className="flex h-48 flex-col items-center justify-center gap-6 rounded-xl border border-border bg-card"
        >
          <div className="flex h-16 scale-[1.6] items-center justify-center">{l.node}</div>
          <span className="text-sm text-muted-foreground">{l.label}</span>
        </div>
      ))}
    </div>
  );
}
