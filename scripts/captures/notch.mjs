/**
 * Choreography: notch
 * The Notch renders fixed at bottom-center of the demo container (position:fixed,
 * inset-x-0, bottom-0 in the viewport the iframe occupies).
 * Two groups: "Theme" and "Language". Clicking a trigger replaces the bar with
 * an options panel. Strategy: click first trigger, dwell, click back (ESC/outside),
 * click second trigger, dwell, close.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  await wait(800); // allow reveal entrance animation

  // Notch sits near the bottom of the viewport, centered.
  // Approximate pill bar center:
  const notchY = H - 40; // ~40px from bottom of viewport
  const notchCenterX = Math.round(W / 2);

  // The "Theme" trigger is left of center, "Language" is right of center.
  // Estimated widths: "Theme · Dark" ~90px, divider ~8px, "Language · English" ~120px
  const themeX = notchCenterX - 70;
  const langX = notchCenterX + 70;

  // Click "Theme" to open options panel
  try {
    await page.mouse.move(themeX, notchY, { steps: 15 });
    await wait(300);
    await page.mouse.click(themeX, notchY);
    await wait(700); // stagger animation for options
  } catch (_) {}

  // Click the "System" option in the panel (third option, appears above the notch)
  try {
    // Options appear above the notch bar; "System" is ~3rd row, ~60px above notch
    const optionY = notchY - 100;
    await page.mouse.move(notchCenterX, optionY, { steps: 12 });
    await wait(300);
    await page.mouse.click(notchCenterX, optionY);
    await wait(500); // closeOnSelect collapses back to bar
  } catch (_) {}

  // Click "Language" trigger
  try {
    await page.mouse.move(langX, notchY, { steps: 15 });
    await wait(300);
    await page.mouse.click(langX, notchY);
    await wait(700);
  } catch (_) {}

  // Click "Spanish" option (second option, ~one row above notch bar)
  try {
    const optionY = notchY - 70;
    await page.mouse.move(notchCenterX, optionY, { steps: 12 });
    await wait(300);
    await page.mouse.click(notchCenterX, optionY);
    await wait(600);
  } catch (_) {}

  // Dwell on final state
  try {
    await page.mouse.move(notchCenterX, notchY - 80, { steps: 10 });
    await wait(400);
  } catch (_) {}
}
