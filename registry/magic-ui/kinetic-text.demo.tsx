import { KineticText } from "@/registry/magic-ui/kinetic-text"

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-12 min-h-[200px]">
      <KineticText text="Hover over me!" as="h1" className="text-4xl" />
      <KineticText text="Kinetic Typography" as="h2" className="text-2xl" />
      <KineticText text="Each letter reacts independently" as="p" className="text-lg" />
    </div>
  )
}
