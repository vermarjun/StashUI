// Swapy: drag the Subscribers card by its handle into the next slot, showing
// the animated swap. (The photo cards' images cover their handles, so drag a
// stat card, whose handle is reachable.)
export default async (film) => {
  const handle = film.page.locator('[data-swapy-slot="c"] [data-swapy-handle]').first();
  const slotD = film.page.locator('[data-swapy-slot="d"]').first();

  const from = await handle.boundingBox();
  const to = await slotD.boundingBox();
  if (!from || !to) throw new Error("swapy slots not found");
  const ax = from.x + from.width / 2;
  const ay = from.y + from.height / 2;
  const bx = to.x + to.width / 2;
  const by = to.y + to.height / 2;

  await film.glide({ x: ax, y: ay });
  await film.page.mouse.down();
  for (let i = 1; i <= 10; i++) {
    await film.glide({ x: ax + ((bx - ax) * i) / 10, y: ay + ((by - ay) * i) / 10 }, { secs: 0.06 });
  }
  await film.page.mouse.up();
  film.mark("hero");
  await film.hold(1600);
  await film.glide({ x: film.W * 0.5, y: film.H * 0.15 }, { secs: 0.6 });
};
