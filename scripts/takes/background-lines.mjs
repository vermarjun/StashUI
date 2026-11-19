// background-lines — ambient: coloured strokes race outward along the flowing SVG paths.
export default async (film) => {
  await film.hideCursor();
  await film.hold(3000);
  film.mark("hero");
  await film.hold(3200);
};
