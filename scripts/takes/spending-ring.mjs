// Spin the donut like a dial; it settles with a category under the marker.
export default async (film) => {
  const ring = film.page.locator("[data-rec-root] [role=slider]").first();
  const b = await ring.boundingBox();
  const cx = b.x + b.width / 2;
  const cy = b.y + b.height / 2;
  const r = Math.min(b.width, b.height) * 0.42;
  await film.glide({ x: cx, y: cy - r }, { secs: 0.7 });
  await film.page.mouse.down();
  for (let i = 1; i <= 5; i++) {
    const a = -Math.PI / 2 + (i / 5) * Math.PI * 1.1;
    await film.glide({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r }, { secs: 0.09 });
  }
  await film.page.mouse.up();
  film.mark("hero");
  await film.hold(2000);
};
