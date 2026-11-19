// Drag the auto-rotating globe to reveal the arc network.
export default async (film) => {
  await film.hold(1800);
  await film.mark("hero");
  const cx = film.W * 0.5;
  const cy = film.H * 0.5;
  await film.glide({ x: cx - 90, y: cy }, { secs: 0.7 });
  await film.page.mouse.down();
  await film.glide({ x: cx + 80, y: cy }, { secs: 1.2 });
  await film.page.mouse.up();
  await film.hold(1100);
  await film.glide({ x: cx + 140, y: cy - 90 }, { secs: 0.8 });
};
