// rain-glass-background — drops slide down the pane; a drag wipes a clear streak through the fog
export default async (film) => {
  const page = film.page;
  const y = film.H * 0.72;
  await film.hold(800);
  await film.glide({ x: film.W * 0.2, y }, { secs: 0.7 });
  await page.mouse.down();
  for (let i = 1; i <= 40; i++) {
    await page.mouse.move(film.W * (0.2 + 0.6 * (i / 40)), y - Math.sin(i / 7) * 30);
    await film.hold(22);
  }
  await page.mouse.up();
  film.mark("hero");
  await film.hold(1600);
};
