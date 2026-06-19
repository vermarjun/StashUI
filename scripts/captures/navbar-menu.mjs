/**
 * Choreography: navbar-menu
 * The Menu renders horizontally with MenuItem triggers at the top.
 * Hovering each trigger opens a dropdown panel below.
 * Demo aligns content at top with extra padding, so the Menu bar lives near y~60–80.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  await wait(600);

  // The Menu is centered horizontally, near top of the demo.
  // Three items: "Products", "Resources", "Pricing" — spaced ~120px apart.
  const menuY = Math.round(H * 0.12); // ~90px from top
  const menuCenterX = Math.round(W / 2);

  // Hover "Products" (leftmost of the three ~centered items)
  try {
    await page.mouse.move(menuCenterX - 150, menuY, { steps: 18 });
    await wait(900); // allow spring animation to settle + panel to render
  } catch (_) {}

  // Move to "Resources" (middle item)
  try {
    await page.mouse.move(menuCenterX, menuY, { steps: 18 });
    await wait(900);
  } catch (_) {}

  // Move to "Pricing" (rightmost item)
  try {
    await page.mouse.move(menuCenterX + 140, menuY, { steps: 18 });
    await wait(700);
  } catch (_) {}

  // Move away to close (onMouseLeave on Menu)
  try {
    await page.mouse.move(menuCenterX, Math.round(H * 0.85), { steps: 20 });
    await wait(400);
  } catch (_) {}

  // Return near center-top
  try {
    await page.mouse.move(menuCenterX, menuY, { steps: 15 });
    await wait(300);
  } catch (_) {}
}
