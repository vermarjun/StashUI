import { MacbookPro } from "./macbook-pro"

export default function MacbookProDemo() {
  return (
    <div className="relative w-full max-w-[760px] text-neutral-900">
      <MacbookPro
        src="https://images.unsplash.com/photo-1460999158988-6f0380f81f4d?w=1200&q=80"
        className="size-full"
      />
    </div>
  )
}
