// inspira-world-map (inspira-react): dotted world map with animated curved paths and
// pulsing endpoint markers between global cities. 5 arcs draw in sequentially.
// Demo also has a title/description header above the map.
export default async function capture(page, { W, H, wait }) {
  // Let the dotted-map SVG render and motion arcs begin
  await wait(700);

  // Dwell: 5 arcs × (0.5s delay + 1s draw) ≈ 3.5s; add buffer
  await wait(3500);

  // Capture pulse animations repeating
  await wait(1500);

  // Gentle mouse sweep across the map region
  try {
    await page.mouse.move(W * 0.25, H * 0.55, { steps: 20 });
    await wait(250);
    await page.mouse.move(W * 0.75, H * 0.6, { steps: 25 });
    await wait(250);
    await page.mouse.move(W * 0.5, H * 0.5, { steps: 15 });
  } catch (_) {}

  await wait(400);
}
