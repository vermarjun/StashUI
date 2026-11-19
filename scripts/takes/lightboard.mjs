// LED marquee scrolls on its own (hovering pauses it), so keep the pointer off the board.
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.12 }, { secs: 0.5 });
  film.hideCursor();
  await film.hold(2400);
  film.mark("hero");
  await film.hold(2600);
};
