/**
 * Capture choreography for card-3d.
 *
 * The CardContainer responds to onMouseMove by applying rotateY/rotateX transforms
 * proportional to cursor distance from card centre. CardItem children translate on Z.
 * Strategy: enter the card → sweep diagonals so the tilt is clearly visible from
 * multiple angles → finish near centre and leave so the card resets to flat.
 */
export default async function capture(page, { W, H, wait }) {
  await wait(600);

  // Locate the perspective wrapper (CardContainer outer div)
  let box;
  try {
    const container = page.locator("[style*='perspective']").first();
    await container.waitFor({ state: "visible", timeout: 8000 });
    box = await container.boundingBox();
  } catch {
    box = null;
  }

  // Fall back to a reasonable estimate around page centre
  const cardW = 320;
  const cardH = 360;
  if (!box) {
    box = {
      x: W / 2 - cardW / 2,
      y: H / 2 - cardH / 2,
      width: cardW,
      height: cardH,
    };
  }

  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;
  const left = box.x + 8;
  const right = box.x + box.width - 8;
  const top = box.y + 8;
  const bottom = box.y + box.height - 8;

  // Enter centre first
  try {
    await page.mouse.move(cx, cy, { steps: 10 });
    await wait(300);
  } catch {
    // continue
  }

  // Diagonal sweep: top-left → bottom-right
  try {
    await page.mouse.move(left, top, { steps: 20 });
    await wait(350);
    await page.mouse.move(right, bottom, { steps: 30 });
    await wait(350);
  } catch {
    // continue
  }

  // Diagonal sweep: top-right → bottom-left
  try {
    await page.mouse.move(right, top, { steps: 25 });
    await wait(350);
    await page.mouse.move(left, bottom, { steps: 30 });
    await wait(350);
  } catch {
    // continue
  }

  // Horizontal sweep through centre
  try {
    await page.mouse.move(left, cy, { steps: 18 });
    await wait(250);
    await page.mouse.move(right, cy, { steps: 28 });
    await wait(250);
  } catch {
    // continue
  }

  // Vertical sweep through centre
  try {
    await page.mouse.move(cx, top, { steps: 18 });
    await wait(250);
    await page.mouse.move(cx, bottom, { steps: 24 });
    await wait(250);
  } catch {
    // continue
  }

  // Return to centre briefly then leave — card resets to 0deg
  try {
    await page.mouse.move(cx, cy, { steps: 14 });
    await wait(300);
    await page.mouse.move(W * 0.05, H * 0.05, { steps: 18 });
  } catch {
    // continue
  }

  await wait(500);
}
