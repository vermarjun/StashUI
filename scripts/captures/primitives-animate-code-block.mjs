export default async function capture(page, { W, H, cfg, wait }) {
  // animate-ui CodeBlock with writing=true and duration=4000ms types its code
  // character-by-character over 4 seconds once isInView becomes true.
  // inView=true prop means animation begins immediately on mount.
  // The sample code is ~120 chars; with duration=4000ms each char ≈ 33ms.

  // Initial settle
  await wait(300);

  // Dwell while code types out (4000ms) plus shiki re-highlights on each tick
  try {
    await wait(4200);
  } catch (_) {}

  // Brief pause on the fully-typed, syntax-highlighted result
  await wait(800);

  // No scroll needed; component is centered and non-scrollable.
  // End near start — the video loop will cut back to blank/typing.
}
