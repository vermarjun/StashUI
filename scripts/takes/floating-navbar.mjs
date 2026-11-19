// floating-navbar — scroll down (bar stays hidden), nudge up so the pill slides in, down again so it hides, up again.
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.6 }, { secs: 0.5 });
  await film.scroll(700, { secs: 1.0 });
  await film.hold(300);
  await film.scroll(-180, { secs: 0.6 });
  film.mark("hero");
  await film.hold(1200);
  await film.scroll(320, { secs: 0.8 });
  await film.hold(600);
  await film.scroll(-200, { secs: 0.6 });
  await film.hold(1100);
};
