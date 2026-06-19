export default async function capture(page, { W, H, cfg, wait }) {
  // The magic-ui Terminal sequences its children via SequenceContext.
  // Each TypingAnimation types character-by-character (60ms/char default);
  // AnimatedSpans fade in after the previous item completes (300ms each).
  // Sequence:
  //   "$ npx shadcn@latest init"  → 24 chars × 60ms ≈ 1440ms
  //   6 AnimatedSpans × 300ms each ≈ 1800ms
  //   "$ npx shadcn@latest add button" → 30 chars × 60ms ≈ 1800ms
  //   1 AnimatedSpan × 300ms ≈ 300ms
  // Total ≈ ~5.5s — dwell 6s to be safe.

  // Initial settle; startOnView=true fires once IntersectionObserver triggers
  await wait(400);

  // Dwell while the full sequence types out
  try {
    await wait(6000);
  } catch (_) {}

  // Brief pause on completed state
  await wait(700);

  // Reset to top for loop
  try {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  } catch (_) {}

  await wait(300);
}
