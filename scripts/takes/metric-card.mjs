// metric-card — scrub across the days, then drag out a range: the number rolls and the line re-shades
export default async (film) => {
  const page = film.page;
  const chart = page.locator('[aria-label^="Revenue over the last"]');
  const b = await chart.boundingBox();
  const y = b.y + b.height * 0.55;
  await film.glide({ x: b.x + b.width * 0.15, y }, { secs: 0.7 });
  await film.glide({ x: b.x + b.width * 0.8, y }, { secs: 1.4 });
  await film.hold(400);
  await film.glide({ x: b.x + b.width * 0.3, y }, { secs: 0.5 });
  await page.mouse.down();
  for (let i = 1; i <= 20; i++) {
    await page.mouse.move(b.x + b.width * (0.3 + 0.45 * (i / 20)), y);
    await film.hold(30);
  }
  await page.mouse.up();
  film.mark("hero");
  await film.hold(1500);
};
