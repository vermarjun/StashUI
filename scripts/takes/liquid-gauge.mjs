// Liquid gauge: drag the level up and back down so the liquid sloshes and bubbles
export default async (film) => {
  const g = await film.page.locator("[data-rec-root] [role=slider]").first().boundingBox();
  const x = g.x + g.width * 0.5;
  await film.glide({ x, y: g.y + g.height * 0.36 });
  await film.page.mouse.down();
  await film.glide({ x: x + 40, y: g.y + g.height * 0.12 }, { secs: 0.8 });
  film.mark("hero");
  await film.glide({ x: x - 40, y: g.y + g.height * 0.55 }, { secs: 0.9 });
  await film.page.mouse.up();
  await film.hold(1200);
};
