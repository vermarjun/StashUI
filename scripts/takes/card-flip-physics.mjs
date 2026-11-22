// card-flip-physics — flick the ticket to spin it over, then flick it back
export default async (film) => {
  const page = film.page;
  const b = await page.getByLabel("Event ticket").first().boundingBox();
  const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
  const flick = async (dir) => {
    await film.glide({ x: cx - dir * 50, y: cy }, { secs: 0.6 });
    await page.mouse.down();
    for (let i = 1; i <= 8; i++) {
      await page.mouse.move(cx - dir * 50 + dir * i * 22, cy);
      await film.hold(14);
    }
    await page.mouse.up();
  };
  await flick(1);
  await film.hold(1300);
  film.mark("hero");
  await flick(-1);
  await film.hold(1300);
};
