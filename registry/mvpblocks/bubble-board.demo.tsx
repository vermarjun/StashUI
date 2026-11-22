import BubbleBoard from "./bubble-board"

export default function BubbleBoardDemo() {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <BubbleBoard />
      <p className="text-muted-foreground -mt-2 text-sm">
        Drag the board: bubbles swell toward the centre and shrink at the edges.
      </p>
    </div>
  )
}
