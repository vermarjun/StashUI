// inspira-gradient-button: rotating conic-gradient rainbow border spins continuously.
// Dwell to show the animation, then hover the first button, move away, hover second.
export default async function capture(page, { W, H, wait }) {
  // Initial dwell — let the spinning rainbow border establish itself
  await wait(1800);

  // Hover the first button (top-center of the demo layout)
  try {
    const btn = page.getByRole("button", { name: /click me/i });
    await btn.hover({ force: true });
  } catch (_) {
    try {
      await page.mouse.move(W / 2, H * 0.42, { steps: 18 });
    } catch (_2) {}
  }

  // Hover dwell — gradient still animating under the hover
  await wait(1400);

  // Move away to clear hover state
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 14 });
  } catch (_) {}
  await wait(600);

  // Hover the second button (Custom Colors)
  try {
    const btn2 = page.getByRole("button", { name: /custom colors/i });
    await btn2.hover({ force: true });
  } catch (_) {
    try {
      await page.mouse.move(W / 2, H * 0.62, { steps: 16 });
    } catch (_2) {}
  }
  await wait(1200);

  // Return to resting state — animation loops cleanly at idle
  try {
    await page.mouse.move(W * 0.1, H * 0.1, { steps: 14 });
  } catch (_) {}
  await wait(700);
}
