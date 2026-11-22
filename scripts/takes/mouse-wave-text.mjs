// mouse-wave-text — sweep the cursor across so the wave follows it, then press to squash
export default async (film) => {
  const { W, H } = film;
  await film.glide({ x: W * 0.15, y: H * 0.5 }, { secs: 0.7 });
  await film.glide({ x: W * 0.85, y: H * 0.45 }, { secs: 1.6 });
  film.mark("hero");
  await film.glide({ x: W * 0.35, y: H * 0.55 }, { secs: 1.2 });
  await film.page.mouse.down();
  await film.hold(500);
  await film.page.mouse.up();
  await film.hold(900);
};
