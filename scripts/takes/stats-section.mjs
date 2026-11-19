// static stats section: slow push-in so the grid clip reads on the section
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  await film.hold(5200);
  film.mark("hero");
};
