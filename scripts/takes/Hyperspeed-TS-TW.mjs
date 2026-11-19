// Hyperspeed — let the light-trail road settle in, then hold the mouse down to punch it into hyperspeed.
export default async (film) => {
  await film.hold(900);
  await film.glide({ x: film.W * 0.5, y: film.H * 0.55 }, { secs: 0.6 });
  await film.page.mouse.down();
  await film.hold(1400);
  film.mark("hero");
  await film.hold(900);
  await film.page.mouse.up();
  await film.hold(1400);
};
