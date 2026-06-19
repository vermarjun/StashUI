// comp-34: Input with character limit counter (maxLength 50, shows X/50)
// Type: TEXT — click + type realistic text to watch counter increment
// Sequence: click → type progressively → counter climbs → end near start

export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  // Click the input
  try {
    const input = page.locator('input[type="text"]').first();
    await input.waitFor({ state: "visible", timeout: 3000 });
    await input.click();
    await wait(300);
  } catch (_) {}

  // Type realistic text — watch the counter climb toward 50
  try {
    await page.keyboard.type("Minimal design system", { delay: 70 });
    await wait(400);
    await page.keyboard.type(" for React", { delay: 80 });
    await wait(400);
    await page.keyboard.type(" and Next.js", { delay: 80 });
    await wait(600);
  } catch (_) {}

  // Move mouse away slightly so counter is fully visible
  try {
    await page.mouse.move(cx, cy + 70, { steps: 8 });
    await wait(400);
  } catch (_) {}

  // Return near start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
