// border beam: ambient; a thin coloured beam travels around each card's border on its own
export default async (film) => {
  film.hideCursor();
  await film.hold(2000);
  film.mark("hero");
  await film.hold(3200);
};
