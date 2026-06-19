// InteractiveHoverButton: on hover the dot scales to flood the button with the
// primary color, the original label slides right and fades out, and a new
// "<label> →" slides in from the right. Off hover everything reverses. The
// transition is 300ms. Show: idle → hover dwell (label swap visible) → away →
// pause → hover again → away for loop seam.
export default async function capture(page, { W, H, cfg, wait }) {
  const cx = Math.round(W / 2);
  const cy = Math.round(H / 2);

  // Start with mouse off the button so idle state is shown first.
  try {
    await page.mouse.move(cx + 220, cy + 90, { steps: 5 });
  } catch (_) {}

  // Idle dwell — show resting state with the dot + label.
  await wait(800);

  // --- First hover ---
  try {
    await page.mouse.move(cx, cy, { steps: 20 });
  } catch (_) {}

  // Dwell 1.2s: let the 300ms transition complete, then show the swapped state.
  await wait(1200);

  // Move away — transition reverses.
  try {
    await page.mouse.move(cx + 220, cy + 90, { steps: 20 });
  } catch (_) {}

  // Wait for the reverse transition to finish + brief idle.
  await wait(700);

  // --- Second hover pass ---
  try {
    await page.mouse.move(cx, cy, { steps: 18 });
  } catch (_) {}

  await wait(1200);

  // Final away — end in resting state for clean loop seam.
  try {
    await page.mouse.move(cx - 220, cy - 90, { steps: 18 });
  } catch (_) {}

  await wait(500);
}
