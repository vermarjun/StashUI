// AI agent lanes: watch the lanes fan out, scrub the run forward, then hover a sub-agent bar for its tooltip
export default async (film) => {
  await film.hold(1600);
  const box = await film.page.locator('input[aria-label="Run time"]').boundingBox();
  const y = box.y + box.height / 2;
  const nowX = box.x + box.width * 0.25;
  await film.glide({ x: nowX, y }, { secs: 0.6 });
  await film.page.mouse.down();
  for (let i = 1; i <= 24; i++) {
    await film.page.mouse.move(nowX + (box.width * 0.6 * i) / 24, y);
    await film.hold(35);
  }
  await film.page.mouse.up();
  film.mark("hero");
  await film.hold(500);
  await film.hover(film.page.locator('[aria-label^="Search:"]').nth(1), { hold: 1500 });
};
