// image-reveal: a list of text labels; hovering each row reveals a
// corresponding image that follows the cursor via motion spring. Move mouse
// across each row in sequence, dwell briefly per row.
export default async function capture(page, { W, H, cfg, wait }) {
  // Let the demo settle and Unsplash images start loading.
  try { await wait(600); } catch (_) {}

  // The list is ~4/5 of the viewport width, centered. Approx Y positions
  // for 4 rows at 5 py each (each row ~py-5 = ~80px on a 750 H viewport).
  // List starts near H*0.2 and each row is ~H*0.14 apart.
  const rows = [
    { y: 0.28 },
    { y: 0.42 },
    { y: 0.56 },
    { y: 0.70 },
  ];

  for (const row of rows) {
    // Hover the row — enter from left edge.
    try {
      await page.mouse.move(Math.round(W * 0.25), Math.round(H * row.y), { steps: 14 });
    } catch (_) {}
    try { await wait(200); } catch (_) {}

    // Sweep slowly right across the row — image follows cursor.
    try {
      await page.mouse.move(Math.round(W * 0.7), Math.round(H * row.y), { steps: 30 });
    } catch (_) {}
    try { await wait(500); } catch (_) {}
  }

  // Dwell on the last revealed image.
  try { await wait(800); } catch (_) {}

  // Move off all rows to hide image (opacity → 0).
  try {
    await page.mouse.move(Math.round(W * 0.5), Math.round(H * 0.88), { steps: 16 });
  } catch (_) {}
  try { await wait(400); } catch (_) {}
}
