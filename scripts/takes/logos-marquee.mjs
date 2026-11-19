// the slow logo marquee: gentle push-in so the drift reads on the grid
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  await film.hold(5200);
};
