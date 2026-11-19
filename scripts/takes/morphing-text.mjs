// Ambient: words melt into each other through the gooey threshold blur.
export default async (film) => {
  film.hideCursor();
  await film.hold(1500);
  film.mark("hero");
  await film.hold(3500);
};
