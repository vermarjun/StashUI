// scroll-images-reveal-003 — one steady scroll so the photo cards stack, stick and tilt away.
// No mid-take holds: the stack is the whole show, so keep it moving.
export default async (film) => {
  await film.glide({ x: film.W * 0.55, y: film.H * 0.55 }, { secs: 0.6 });
  await film.scroll(1300, { secs: 2.2, hold: 0 });
  film.mark("hero");
  await film.scroll(1100, { secs: 2.0, hold: 500 });
};
