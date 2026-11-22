// Move the pointer around the headline: it becomes a lamp and the letter shadows swing away from it.
export default async (film) => {
  const h = film.page.locator("[data-rec-root] h2").first();
  const b = await h.boundingBox();
  const cx = b.x + b.width / 2;
  const cy = b.y + b.height / 2;
  await film.glide({ x: cx - b.width * 0.45, y: cy - 90 }, { secs: 0.8 });
  await film.glide({ x: cx + b.width * 0.45, y: cy - 90 }, { secs: 1.6 });
  film.mark("hero");
  await film.drift({ secs: 2.2, cx, cy: cy + 40, rx: b.width * 0.4, ry: 90 });
};
