// inspira-interactive-hover-button: dot expands to fill the button on hover,
// text slides out and the arrow label slides in.
// Choreography: hover dwell ~1.2 s → away → hover second button → away.
export default async function capture(page, { W, H, wait }) {
  // Brief resting pause so idle state is visible before interaction
  await wait(500);

  // Hover over the first button ("Get Started")
  try {
    const btn = page.getByRole("button", { name: /get started/i });
    await btn.hover({ force: true });
  } catch (_) {
    try {
      await page.mouse.move(W * 0.38, H / 2, { steps: 18 });
    } catch (_2) {}
  }

  // Dwell — let the dot-expand + text-slide animation play through
  await wait(1200);

  // Move away to reset hover state
  try {
    await page.mouse.move(W * 0.08, H * 0.08, { steps: 16 });
  } catch (_) {}
  await wait(500);

  // Hover over the second button ("Learn More")
  try {
    const btn2 = page.getByRole("button", { name: /learn more/i });
    await btn2.hover({ force: true });
  } catch (_) {
    try {
      await page.mouse.move(W * 0.62, H / 2, { steps: 18 });
    } catch (_2) {}
  }

  // Hover dwell
  await wait(1200);

  // Return to resting state — end near idle for a clean loop seam
  try {
    await page.mouse.move(W * 0.08, H * 0.08, { steps: 16 });
  } catch (_) {}
  await wait(600);
}
