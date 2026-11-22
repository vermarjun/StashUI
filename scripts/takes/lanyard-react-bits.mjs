// Lanyard: grab the badge, swing it to the side and let it go so it sways back
export default async (film) => {
  const sx = film.W * 0.5;
  const sy = film.H * 0.58;
  await film.glide({ x: sx, y: sy }, { secs: 0.8 });
  await film.page.mouse.down();
  await film.glide({ x: sx + 220, y: sy - 40 }, { secs: 0.9 });
  await film.glide({ x: sx - 160, y: sy + 20 }, { secs: 0.7 });
  await film.page.mouse.up();
  film.mark("hero");
  await film.hold(1800);
};
