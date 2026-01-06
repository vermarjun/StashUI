import CircularText from "@/registry/react-bits/CircularText"

export default function Demo() {
  return (
    <div className="flex items-center justify-center gap-16 p-12 min-h-[300px]">
      <CircularText
        text="HOVER TO SPEED UP • CIRCULAR TEXT • "
        spinDuration={20}
        onHover="speedUp"
        className="text-blue-600"
      />
      <CircularText
        text="PAUSE ON HOVER • SLOW AND STEADY • "
        spinDuration={30}
        onHover="pause"
        className="text-purple-600"
      />
    </div>
  )
}
