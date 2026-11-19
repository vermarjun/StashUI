// draggable card: grabs the top polaroid off the pile, tosses it aside so it springs, revealing the text underneath
export default async (film) => {
  const card = film.page.getByText("Canada", { exact: true }).first();
  const b = await card.boundingBox();
  const sx = b.x + b.width / 2, sy = b.y - 120;
  await film.glide({ x: sx, y: sy }, { secs: 0.7 });
  await film.hold(300);
  await film.page.mouse.down();
  await film.glide({ x: sx - 220, y: sy + 140 }, { secs: 0.7 });
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(1200);
  const c2 = film.page.getByText("Greece", { exact: true }).first();
  const b2 = await c2.boundingBox();
  await film.glide({ x: b2.x + b2.width / 2, y: b2.y - 120 }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.glide({ x: b2.x + b2.width / 2 + 200, y: b2.y + 20 }, { secs: 0.5 });
  await film.page.mouse.up();
  await film.hold(1200);
};
