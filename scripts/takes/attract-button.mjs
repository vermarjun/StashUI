// Approach the button so the iron filings swing toward the cursor, circle it, then press.
export default async (film) => {
  const btn = film.page.locator("[data-rec-root] button").first();
  const b = await btn.boundingBox();
  const cx = b.x + b.width / 2;
  const cy = b.y + b.height / 2;
  await film.glide({ x: cx - 220, y: cy - 120 }, { secs: 0.5 });
  await film.glide({ x: cx - 70, y: cy - 40 }, { secs: 0.9 });
  await film.drift({ secs: 2.4, cx, cy, rx: 110, ry: 50 });
  film.mark("hero");
  await film.click(btn, { hold: 900 });
};
