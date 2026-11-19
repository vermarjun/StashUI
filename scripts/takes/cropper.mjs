// Drag the photo to reframe, then zoom with the wheel and settle back.
export default async (film) => {
  const b = await film.root().boundingBox();
  const cx = b.x + b.width * 0.5;
  const cy = b.y + b.height * 0.5;
  await film.glide({ x: cx, y: cy }, { secs: 0.5 });
  await film.page.mouse.down();
  await film.glide({ x: cx + 90, y: cy - 50 }, { secs: 1.1 });
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(500);
  await film.scroll(-180, { secs: 0.9, hold: 500 });
  await film.scroll(180, { secs: 0.9, hold: 500 });
  await film.page.mouse.down();
  await film.glide({ x: cx - 90, y: cy + 50 }, { secs: 1.0 });
  await film.page.mouse.up();
  await film.hold(600);
};
