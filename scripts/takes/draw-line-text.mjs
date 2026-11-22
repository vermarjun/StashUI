// draw-line-text — ambient: the word is handwritten stroke by stroke, then filled
export default async (film) => {
  await film.hideCursor();
  await film.hold(4600);
  film.mark("hero");
  await film.hold(1600);
};
