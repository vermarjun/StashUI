// Ambient: the split-flap board scrambles and settles on a new message every ~4s.
export default async (film) => {
  film.hideCursor();
  await film.hold(2600);
  film.mark("hero");
  await film.hold(3200);
};
