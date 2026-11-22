// spring-element — drag the ball away, the coil stretches, release and it springs home
export default async (film) => {
  const ball = film.page.locator('[data-rec-root] [aria-label="Drag me"]').first();
  const b = await ball.boundingBox();
  const x = b.x + b.width / 2, y = b.y + b.height / 2;
  await film.glide({ x, y }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.glide({ x: x + 230, y: y - 120 }, { secs: 0.9 });
  film.mark("hero");
  await film.hold(400);
  await film.page.mouse.up();
  await film.hold(1200);
  await film.glide({ x, y }, { secs: 0.6 });
  await film.page.mouse.down();
  await film.glide({ x: x - 210, y: y + 110 }, { secs: 0.8 });
  await film.page.mouse.up();
  await film.hold(1200);
};
