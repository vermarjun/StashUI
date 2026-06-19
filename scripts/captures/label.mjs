// Label (Aceternity): hover the label element to show its text rendering,
// then simulate a peer-input focus by clicking a nearby input if present,
// type a couple characters, blur, and loop clean.
export default async function capture(page, { W, H, wait }) {
  // Settle — let any entrance transition finish
  await wait(400);

  // Try to find a label element and hover it to show the text style
  try {
    const label = page.locator("label").first();
    await label.hover({ timeout: 1500 });
  } catch {
    // No label found — fall back to centre hover
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
  }
  await wait(700);

  // Try to find an associated input / textarea and focus it (triggers peer styles)
  try {
    const input = page.locator("input, textarea").first();
    await input.click({ timeout: 1500 });
    await wait(500);
    await input.type("hello", { delay: 90 });
    await wait(600);
    // Blur to reset
    await input.blur();
  } catch {
    // No input in demo — just dwell on the label
    await wait(1200);
  }

  await wait(400);

  // Return mouse to neutral so the loop seam is clean
  try {
    await page.mouse.move(W / 2, H / 2, { steps: 10 });
  } catch {
    /* ignore */
  }
  await wait(300);
}
