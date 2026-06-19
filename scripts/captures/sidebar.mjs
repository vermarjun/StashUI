/**
 * Choreography: sidebar
 * The DesktopSidebar collapses to 60px and expands to 300px on mouseenter/mouseleave.
 * Strategy: hover over sidebar to expand it, dwell, move away to collapse.
 */
export default async function capture(page, { W, H, cfg, wait }) {
  await wait(600);

  // Sidebar renders on the left side of the demo container.
  // In collapsed state it is 60px wide; let's target x=30 (center of collapsed bar).
  const sidebarX = 30;
  const midY = Math.round(H / 2);

  // Start away from sidebar
  try {
    await page.mouse.move(Math.round(W * 0.6), midY, { steps: 10 });
    await wait(300);
  } catch (_) {}

  // Move onto the sidebar to trigger expand
  try {
    await page.mouse.move(sidebarX, midY, { steps: 20 });
    await wait(900); // wait for width animation to settle
  } catch (_) {}

  // Hover over individual links while expanded
  try {
    await page.mouse.move(sidebarX, Math.round(H * 0.35), { steps: 10 });
    await wait(400);
    await page.mouse.move(sidebarX, Math.round(H * 0.5), { steps: 10 });
    await wait(400);
    await page.mouse.move(sidebarX, Math.round(H * 0.65), { steps: 10 });
    await wait(400);
  } catch (_) {}

  // Move away to collapse
  try {
    await page.mouse.move(Math.round(W * 0.5), midY, { steps: 25 });
    await wait(700);
  } catch (_) {}

  // Brief dwell at start position
  try {
    await page.mouse.move(Math.round(W * 0.5), midY, { steps: 5 });
    await wait(300);
  } catch (_) {}
}
