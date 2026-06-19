/**
 * Capture choreography for comp-357
 * A small outline button ("W/ title") with a rich tooltip containing a title
 * "Tooltip with title" and a long description paragraph.
 * Sequence: hover button → dwell 2s (rich tooltip fully visible) → move away → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    const btn = page.getByRole("button", { name: /w\/ title|with title/i });
    await btn.waitFor({ state: "visible", timeout: 3000 });

    // Hover to show the rich tooltip with title + description
    await btn.hover();
    // Dwell longer so the multi-line content is readable
    await wait(2000);

    // Move away to dismiss
    await page.mouse.move(cx + 100, cy - 70, { steps: 12 });
    await wait(500);
  } catch (err) {
    try {
      const btn = page.locator("button").first();
      await btn.hover();
      await wait(2000);
      await page.mouse.move(cx + 100, cy - 70, { steps: 12 });
      await wait(400);
    } catch (_) {}
  }

  // End near start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
