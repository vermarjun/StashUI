// Lanyard: grab the badge, swing it side to side and let it go so it sways
// back. Swings stay moderate and the poster is taken once the badge has
// settled back to centre (marking on release caught it at the right edge).
export default async (film) => {
  const sx = film.W * 0.5;
  const sy = film.H * 0.58;
  await film.glide({ x: sx, y: sy }, { secs: 0.8 });
  await film.page.mouse.down();
  await film.glide({ x: sx + 150, y: sy - 30 }, { secs: 0.8 });
  await film.glide({ x: sx - 130, y: sy + 10 }, { secs: 0.8 });
  await film.glide({ x: sx, y: sy }, { secs: 0.5 });
  await film.page.mouse.up();
  await film.hold(1500);
  film.mark("hero");
  await film.hold(600);
};
