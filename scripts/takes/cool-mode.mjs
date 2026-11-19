// cool-mode — press and hold on each button, wiggling inside it, so the particle stream keeps spraying
export default async (film) => {
  const page = film.page;
  const cool = await page.getByRole("button", { name: /cool mode/i }).boundingBox();
  const cx = cool.x + cool.width / 2, cy = cool.y + cool.height / 2;
  const dx = cool.width * 0.3, dy = cool.height * 0.2;
  await film.glide({ x: cx, y: cy }, { secs: 0.7 });
  await page.mouse.down();
  // stay inside the button: leaving it stops the spray (mouseleave)
  await film.glide({ x: cx + dx, y: cy - dy }, { secs: 0.7 });
  await film.glide({ x: cx - dx, y: cy + dy }, { secs: 0.9 });
  film.mark("hero");
  await film.glide({ x: cx + dx * 0.6, y: cy }, { secs: 0.8 });
  await page.mouse.up();
  const stars = await page.getByRole("button", { name: /stars/i }).boundingBox();
  const sx = stars.x + stars.width / 2, sy = stars.y + stars.height / 2;
  await film.glide({ x: sx, y: sy }, { secs: 0.6 });
  await page.mouse.down();
  await film.glide({ x: sx + stars.width * 0.25, y: sy - 4 }, { secs: 0.8 });
  await film.glide({ x: sx - stars.width * 0.25, y: sy + 4 }, { secs: 0.8 });
  await page.mouse.up();
  await film.hold(600);
};
