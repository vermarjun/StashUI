export default async function capture(page, { W, H, cfg, wait }) {
  // The squiggle arrow is a static SVG with no mount animation or hover effects.
  // Choreography: let the component settle, then slowly pan focus across it
  // by hovering different regions to ensure the SVG strokes render fully in frame.

  // Wait for the SVG to be present and fully painted
  try {
    await page.locator("svg").waitFor({ state: "visible", timeout: 5000 });
  } catch (_) {}

  // Dwell at rest so the initial render is captured
  await wait(800);

  // Hover over the left portion of the arrow (squiggle start)
  try {
    const svg = page.locator("svg").first();
    const box = await svg.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.5);
    } else {
      await page.mouse.move(W * 0.3, H * 0.5);
    }
  } catch (_) {
    await page.mouse.move(W * 0.3, H * 0.5);
  }
  await wait(700);

  // Hover over the mid portion of the arrow (the squiggle body)
  try {
    const svg = page.locator("svg").first();
    const box = await svg.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width * 0.55, box.y + box.height * 0.5);
    } else {
      await page.mouse.move(W * 0.5, H * 0.5);
    }
  } catch (_) {
    await page.mouse.move(W * 0.5, H * 0.5);
  }
  await wait(700);

  // Hover over the arrowhead end (right portion)
  try {
    const svg = page.locator("svg").first();
    const box = await svg.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width * 0.85, box.y + box.height * 0.5);
    } else {
      await page.mouse.move(W * 0.75, H * 0.5);
    }
  } catch (_) {
    await page.mouse.move(W * 0.75, H * 0.5);
  }
  await wait(700);

  // Return mouse near start to loop cleanly
  try {
    const svg = page.locator("svg").first();
    const box = await svg.boundingBox();
    if (box) {
      await page.mouse.move(box.x + box.width * 0.25, box.y + box.height * 0.5);
    } else {
      await page.mouse.move(W * 0.3, H * 0.5);
    }
  } catch (_) {
    await page.mouse.move(W * 0.3, H * 0.5);
  }
  await wait(600);

  // Final dwell to fill remaining runtime (~3s total motion)
  await wait(500);
}
