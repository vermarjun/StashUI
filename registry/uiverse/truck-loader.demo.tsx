import { TruckLoader } from "./truck-loader"

export default function TruckLoaderDemo() {
  return (
    <div className="flex flex-col items-center gap-10">
      <TruckLoader className="scale-[2]" />
      <div className="mt-6 text-center">
        <p className="text-sm font-medium text-foreground">Out for delivery</p>
        <p className="text-xs text-muted-foreground">Order #48213 · arriving between 2:00 and 4:00 pm</p>
      </div>
    </div>
  )
}
