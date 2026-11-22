// Resize handle: ambient, the selection box springs to fit each flipped word
export default async (film) => {
  film.hideCursor();
  await film.hold(2600);
  film.mark("hero");
  await film.hold(2400);
};
