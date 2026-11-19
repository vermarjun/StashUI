// drag the infinite grid sideways so its cards glide past, then drift back
export default async (film) => {
  const cx = film.W * 0.5;
  const cy = film.H * 0.5;
  await film.glide({ x: cx, y: cy });
  await film.page.mouse.down();
  await film.glide({ x: cx - 320, y: cy }, { secs: 1.6 });
  await film.page.mouse.up();
  await film.hold(1000);
  film.mark("hero");
  await film.page.mouse.down();
  await film.glide({ x: cx + 140, y: cy }, { secs: 1.2 });
  await film.page.mouse.up();
  await film.hold(600);
};
