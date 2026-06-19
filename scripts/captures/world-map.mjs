// world-map (aceternity-ui): dotted world map with animated arc paths between cities.
// Arcs draw in sequentially (0.5s delay each, 5 arcs = ~3s total draw time).
// Pulse circles repeat on a 1.5s loop. Dwell to capture all arcs + pulses.
export default async function capture(page, { W, H, wait }) {
  // Allow SVG map image to load and motion arcs to begin animating
  await wait(800);

  // Dwell while arcs draw in one by one (5 × 0.5s delay + 1s each = ~3.5s)
  await wait(3500);

  // Let pulse animations loop for a visible beat
  await wait(1500);

  // Gentle mouse drift across the map for visual interest (no interactivity, just camera)
  try {
    await page.mouse.move(W * 0.3, H * 0.4, { steps: 20 });
    await wait(300);
    await page.mouse.move(W * 0.7, H * 0.5, { steps: 25 });
    await wait(300);
  } catch (_) {}

  await wait(500);
}
