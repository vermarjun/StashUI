// let the staggered blur-in sequence play, then push in on the finished panel
export default async (film) => {
  await film.hideCursor();
  await film.hold(2400);
  film.mark("hero");
  film.mark("kenburns");
  await film.hold(2600);
};
