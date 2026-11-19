// spotlight-new — ambient: the two beam fans sway in from the top corners over the hero copy
export default async (film) => {
  await film.hideCursor();
  await film.hold(2400);
  film.mark("hero");
  await film.hold(2600);
};
