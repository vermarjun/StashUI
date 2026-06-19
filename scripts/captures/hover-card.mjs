/**
 * Capture choreography for hover-card
 * A basic HoverCard with a "Hover me" button trigger. The card content
 * (title + description) appears after hovering the trigger.
 * Sequence: hover trigger → dwell 1.8s (card visible) → move away → rest.
 */
export default async function capture(page, { W, H, wait }) {
  const cx = W / 2;
  const cy = H / 2;

  await wait(400);

  try {
    const trigger = page.getByRole("button", { name: /hover me/i });
    await trigger.waitFor({ state: "visible", timeout: 3000 });

    // Hover to open the hover card
    await trigger.hover();
    // Dwell while the card animates in and is fully visible
    await wait(1800);

    // Move away to dismiss
    await page.mouse.move(cx + 120, cy - 80, { steps: 12 });
    await wait(500);
  } catch (err) {
    try {
      await page.mouse.move(cx, cy, { steps: 8 });
      await wait(1800);
      await page.mouse.move(cx + 120, cy - 80, { steps: 12 });
      await wait(400);
    } catch (_) {}
  }

  // End near start
  try {
    await page.mouse.move(cx, cy, { steps: 8 });
    await wait(300);
  } catch (_) {}
}
