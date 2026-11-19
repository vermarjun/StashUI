// Ambient: the line field ripples through the lettering on its own.
export default async (film) => {
  film.hideCursor();
  await film.hold(2600);
  film.mark("hero");
  await film.hold(2400);
};
