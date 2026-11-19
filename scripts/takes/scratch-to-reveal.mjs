// scratch-to-reveal — scrubbing the foil away in rows reveals the prize
export default async (film) => {
  const c = await film.page.locator("[data-rec-root] canvas").first().boundingBox();
  const x0 = c.x + c.width * 0.12, x1 = c.x + c.width * 0.88;
  await film.glide({ x: x0, y: c.y + c.height * 0.2 }, { secs: 0.6 });
  await film.page.mouse.down();
  for (let r = 0; r < 4; r++) {
    const y = c.y + c.height * (0.2 + r * 0.2);
    await film.glide({ x: r % 2 ? x0 : x1, y }, { secs: 0.55 });
  }
  await film.mark("hero");
  await film.page.mouse.up();
  await film.hold(1000);
};
