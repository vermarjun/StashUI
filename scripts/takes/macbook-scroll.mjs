// Scrolling flips the lid open and the screen slides out over the page.
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.6 }, { secs: 0.5 });
  await film.hold(400);
  await film.scroll(220, { secs: 1.6, hold: 400 });
  film.mark("hero");
  await film.scroll(220, { secs: 1.6, hold: 500 });
  await film.scroll(260, { secs: 1.6, hold: 700 });
};
