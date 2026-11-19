// ambient: the three logo columns blur-swap through the brand list on their own
export default async (film) => {
  film.hideCursor();
  await film.hold(2400);
  film.mark("hero");
  await film.hold(2600);
};
