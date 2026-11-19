// GlassSurface — drag the glass panel across photos and type so the edge refraction bends what's behind it
export default async (film) => {
  const page = film.page;
  const b = await page.locator("[data-glass]").boundingBox();
  const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
  await film.glide({ x: cx, y: cy }, { secs: 0.7 });
  await page.mouse.down();
  await film.glide({ x: cx - film.W * 0.25, y: cy - film.H * 0.18 }, { secs: 1.3 });
  film.mark("hero");
  await film.glide({ x: cx + film.W * 0.22, y: cy + film.H * 0.12 }, { secs: 1.8 });
  await film.glide({ x: cx, y: cy }, { secs: 1.1 });
  await page.mouse.up();
  await film.hold(500);
};
