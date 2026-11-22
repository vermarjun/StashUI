// glyph matrix: ambient grid of shifting glyphs that ignores the mouse
export default async (film) => {
  await film.hideCursor();
  film.mark("hero");
  await film.hold(5200);
};
