// Self-drawing SVG lines: long dwell so several strokes are visible at once.
export default async (film) => {
  await film.hideCursor();
  await film.hold(8200);
  film.mark("hero");
};
