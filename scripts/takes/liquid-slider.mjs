// liquid-slider — drag the water level up and back down; the surface sloshes as it settles
export default async (film) => {
  const page = film.page;
  const s = await page.locator('[role="slider"]').first().boundingBox();
  const x = s.x + s.width / 2;
  await film.glide({ x, y: s.y + s.height * 0.45 }, { secs: 0.7 });
  await page.mouse.down();
  for (let i = 1; i <= 18; i++) {
    await page.mouse.move(x, s.y + s.height * (0.45 - 0.3 * (i / 18)));
    await film.hold(25);
  }
  await film.hold(400);
  for (let i = 1; i <= 18; i++) {
    await page.mouse.move(x, s.y + s.height * (0.15 + 0.55 * (i / 18)));
    await film.hold(18);
  }
  await page.mouse.up();
  film.mark("hero");
  await film.hold(1600);
};
