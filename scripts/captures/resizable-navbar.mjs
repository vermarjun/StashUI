/**
 * Choreography: resizable-navbar
 * NavBody uses useScroll to detect scroll past 100px → animates from full-width
 * to 40% width with blur and pill shape. Strategy:
 * 1. Hover over nav items while full-width.
 * 2. Scroll down to trigger the resize.
 * 3. Hover nav items in the pill form.
 * 4. Scroll back up.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  await wait(600);

  // Nav items are absolutely centered in NavBody. Approximate positions at full width:
  // NavBody spans full width; NavItems are centered. Items: Features, Pricing, About, Blog
  const navY = Math.round(H * 0.07); // ~53px from top (sticky top-20 ~ 80px, but demo has top padding)
  const centerX = Math.round(W / 2);

  // Hover "Features" (first item, ~left-center)
  try {
    await page.mouse.move(centerX - 120, navY, { steps: 15 });
    await wait(500);
  } catch (_) {}

  // Hover "Pricing"
  try {
    await page.mouse.move(centerX - 30, navY, { steps: 12 });
    await wait(400);
  } catch (_) {}

  // Hover "About"
  try {
    await page.mouse.move(centerX + 50, navY, { steps: 12 });
    await wait(400);
  } catch (_) {}

  // Scroll down ~120px to trigger the navbar resize
  try {
    await page.mouse.move(centerX, Math.round(H * 0.5), { steps: 10 });
    await page.mouse.wheel(0, 150);
    await wait(700); // allow spring transition
  } catch (_) {}

  // Hover items in pill (resized) mode — navbar is now 40% wide, centered
  try {
    await page.mouse.move(centerX - 60, navY + 20, { steps: 12 });
    await wait(500);
    await page.mouse.move(centerX + 30, navY + 20, { steps: 12 });
    await wait(500);
  } catch (_) {}

  // Scroll back up to restore full width
  try {
    await page.mouse.wheel(0, -150);
    await wait(600);
  } catch (_) {}

  // End near top-center
  try {
    await page.mouse.move(centerX, navY, { steps: 10 });
    await wait(300);
  } catch (_) {}
}
