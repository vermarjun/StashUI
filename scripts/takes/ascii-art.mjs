// ASCII art: both panels reveal on mount (matrix rain sweep + colored-block fade); just watch. No cursor.
export default async (film) => {
  film.hideCursor();
  await film.hold(1200);
  film.mark("hero");
  await film.hold(2600);
};
