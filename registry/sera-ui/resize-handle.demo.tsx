import ResizeHandle from "./resize-handle";

export default function ResizeHandleDemo() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 py-10">
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
        Design something
      </p>
      <ResizeHandle duration={2200} />
      <p className="max-w-md text-center text-sm text-muted-foreground">
        The selection box springs to fit every new word, just like resizing a
        text layer on a canvas.
      </p>
    </div>
  );
}
