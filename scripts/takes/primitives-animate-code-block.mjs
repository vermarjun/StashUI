// Animate code block: watch the snippet type itself out with live syntax highlighting. No cursor.
export default async (film) => {
  film.hideCursor();
  await film.hold(3200);
  film.mark("hero");
  await film.hold(2400);
};
