// Static device mockup: slow camera push-in, no cursor
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  await film.hold(2600);
  film.mark("hero");
  await film.hold(2600);
};
