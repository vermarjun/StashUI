// primitives-effects-highlight: Highlight (parent mode) slides a background
// pill between nav items on hover. Hover across all items left-to-right, then
// reverse, to show the spring-animated highlight tracking each item.
export default async function capture(page, { W, H, wait }) {
  const cy = Math.round(H * 0.5);

  // Item approximate x-positions for 5 items centered at W/2.
  // Items: Dashboard, Analytics, Settings, Profile, Help — ~80px wide each + gaps.
  const itemOffsets = [-180, -90, 0, 90, 180];
  const positions = itemOffsets.map((dx) => Math.round(W * 0.5 + dx));

  // Let the component mount.
  try {
    await wait(500);
  } catch (_) {}

  // Hover across items left → right.
  for (const x of positions) {
    try {
      await page.mouse.move(x, cy, { steps: 12 });
      await wait(500);
    } catch (_) {}
  }

  // Pause on the last item.
  try {
    await wait(400);
  } catch (_) {}

  // Hover right → left (reverse).
  for (const x of [...positions].reverse()) {
    try {
      await page.mouse.move(x, cy, { steps: 12 });
      await wait(450);
    } catch (_) {}
  }

  // Dwell on the first item.
  try {
    await wait(500);
  } catch (_) {}

  // Move cursor away so the highlight exits (AnimatePresence fade out).
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.2), { steps: 15 });
    await wait(500);
  } catch (_) {}
}
