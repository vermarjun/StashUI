// Drag the dome around and bring it back, so the photos rotate both ways.
export default async (film) => {
  const cx = film.W / 2;
  const cy = film.H / 2;
  await film.glide({ x: cx + 170, y: cy }, { secs: 0.5 });
  await film.page.mouse.down();
  await film.glide({ x: cx - 210, y: cy }, { secs: 1.3 });
  film.mark("hero");
  await film.page.mouse.up();
  await film.hold(700);
  await film.page.mouse.down();
  await film.glide({ x: cx + 170, y: cy }, { secs: 1.3 });
  await film.page.mouse.up();
  await film.hold(2200);
};
