// TearTicket: grab the perforated stub and pull it away until it tears off
export default async (film) => {
  const box = await film.page.locator("[data-rec-root] [role=button][aria-label*='Tear']").first().boundingBox();
  const sx = box.x + box.width - 65;
  const sy = box.y + box.height / 2;
  await film.glide({ x: sx, y: sy }, { secs: 0.8 });
  await film.hold(300);
  await film.page.mouse.down();
  await film.glide({ x: sx + 60, y: sy + 30 }, { secs: 0.7 });
  await film.glide({ x: sx + 190, y: sy + 110 }, { secs: 0.9 });
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(1400);
};
