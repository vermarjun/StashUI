// Security checkpoint: ambient traffic lines into the card
export default async (film) => {
  film.hideCursor();
  await film.hold(2500);
  film.mark("hero");
  await film.hold(2500);
};
