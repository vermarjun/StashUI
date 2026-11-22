// plucked-text — pull the string down and let it twang, then sweep across to strum
export default async (film) => {
  const page = film.page;
  const b = await page.locator("[data-rec-root] .group\\/pluck").first().boundingBox();
  const base = b.y + b.height * 0.78;
  const x = b.x + b.width * 0.45;
  await film.glide({ x, y: base }, { secs: 0.7 });
  await page.mouse.down();
  for (let i = 1; i <= 12; i++) {
    await page.mouse.move(x, base + i * 6);
    await film.hold(25);
  }
  await page.mouse.up();
  film.mark("hero");
  await film.hold(1300);
  await film.glide({ x: b.x + b.width * 0.1, y: base - 30 }, { secs: 0.5 });
  await film.glide({ x: b.x + b.width * 0.9, y: base + 30 }, { secs: 0.35 });
  await film.hold(1200);
};
