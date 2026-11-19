// drag the 3D menu round to spin through its items, then drag back
export default async (film) => {
  const cx = film.W * 0.5;
  const cy = film.H * 0.52;
  await film.glide({ x: cx, y: cy });
  await film.page.mouse.down();
  await film.glide({ x: cx + 280, y: cy }, { secs: 1.4 });
  await film.page.mouse.up();
  await film.hold(1200);
  film.mark("hero");
  await film.page.mouse.down();
  await film.glide({ x: cx - 120, y: cy }, { secs: 1.2 });
  await film.page.mouse.up();
  await film.hold(700);
};
