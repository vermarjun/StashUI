// comp-28: Number input with plus/minus buttons (react-aria, defaultValue 2048)
// Type: NUMBER — click +/- stepper buttons to adjust value
// Sequence: hover minus → click × 3 → pause → hover plus → click × 5 → end near start

export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(500);

  // Hover and click the minus (decrement) button
  try {
    const decrementBtn = page.locator('[slot="decrement"]')
      .or(page.getByRole("button", { name: /decrease/i }));
    await decrementBtn.waitFor({ state: "visible", timeout: 3000 });
    await decrementBtn.hover();
    await wait(300);
    await decrementBtn.click();
    await wait(200);
    await decrementBtn.click();
    await wait(200);
    await decrementBtn.click();
    await wait(400);
  } catch (_) {}

  // Hover and click the plus (increment) button
  try {
    const incrementBtn = page.locator('[slot="increment"]')
      .or(page.getByRole("button", { name: /increase/i }));
    await incrementBtn.hover();
    await wait(300);
    await incrementBtn.click();
    await wait(200);
    await incrementBtn.click();
    await wait(200);
    await incrementBtn.click();
    await wait(200);
    await incrementBtn.click();
    await wait(200);
    await incrementBtn.click();
    await wait(400);
  } catch (_) {}

  // Move away to rest
  try {
    await page.mouse.move(cx, cy + 80, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
