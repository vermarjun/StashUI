// Pixelated canvas: sweep across the enlarged portrait so the dot grid visibly swirls under the cursor
export default async (film) => {
  const c = await film.page.locator("[data-rec-root] canvas").first().boundingBox();
  const cx = c.x + c.width / 2, cy = c.y + c.height / 2;
  await film.glide({ x: c.x + c.width * 0.2, y: cy }, { secs: 0.7 });
  await film.glide({ x: c.x + c.width * 0.8, y: cy - c.height * 0.15 }, { secs: 1.6 });
  film.mark("hero");
  await film.drift({ secs: 3.2, cx, cy, rx: c.width * 0.3, ry: c.height * 0.25 });
};
