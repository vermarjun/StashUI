// scroll stack: scrolls the stack so the cards pin and scale into place
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.55 }, { secs: 0.6 });
  await film.scroll(420, { secs: 1.6, hold: 400 });
  film.mark("hero");
  await film.scroll(520, { secs: 2.2, hold: 1300 });
};
