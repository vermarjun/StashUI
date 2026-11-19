// grid-beam — ambient: coloured beams streak along the grid lines behind the card.
export default async (film) => {
  await film.hideCursor();
  await film.hold(2400);
  film.mark("hero");
  await film.hold(3000);
};
