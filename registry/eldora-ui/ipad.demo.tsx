import { Ipad } from "./ipad"

export default function IpadDemo() {
  return (
    <div className="relative w-full max-w-[640px] text-neutral-900">
      <Ipad
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
        className="size-full"
      />
    </div>
  )
}
