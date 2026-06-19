// inspira-ripple-button: click produces an expanding ripple overlay.
// Choreography: hover → click (ripple fires) → wait for ripple to fade → hover next → click.
export default async function capture(page, { W, H, wait }) {
  // Brief idle so resting state is visible
  await wait(400);

  // Hover over the default "Click me" button
  try {
    const btn = page.getByRole("button", { name: /^click me$/i });
    await btn.hover({ force: true });
    await wait(400);
    await btn.click({ force: true });
  } catch (_) {
    try {
      await page.mouse.move(W * 0.2, H / 2, { steps: 16 });
      await wait(400);
      await page.mouse.click(W * 0.2, H / 2);
    } catch (_2) {}
  }

  // Wait for ripple animation to expand and fade (600 ms default duration)
  await wait(800);

  // Move away briefly to reset
  try {
    await page.mouse.move(W * 0.08, H * 0.08, { steps: 12 });
  } catch (_) {}
  await wait(300);

  // Hover and click the "Indigo ripple" button
  try {
    const btn2 = page.getByRole("button", { name: /indigo ripple/i });
    await btn2.hover({ force: true });
    await wait(350);
    await btn2.click({ force: true });
  } catch (_) {
    try {
      await page.mouse.move(W * 0.4, H / 2, { steps: 16 });
      await wait(350);
      await page.mouse.click(W * 0.4, H / 2);
    } catch (_2) {}
  }
  await wait(800);

  // Hover and click the "Rose ripple (slow)" button
  try {
    const btn3 = page.getByRole("button", { name: /rose ripple/i });
    await btn3.hover({ force: true });
    await wait(350);
    await btn3.click({ force: true });
  } catch (_) {
    try {
      await page.mouse.move(W * 0.6, H / 2, { steps: 16 });
      await wait(350);
      await page.mouse.click(W * 0.6, H / 2);
    } catch (_2) {}
  }
  await wait(1000);

  // Return to resting state — end idle for a clean loop seam
  try {
    await page.mouse.move(W * 0.08, H * 0.08, { steps: 14 });
  } catch (_) {}
  await wait(500);
}
