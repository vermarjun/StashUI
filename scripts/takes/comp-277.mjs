// comp-277 — static password-requirements alert
export default async (film) => {
  film.mark("kenburns");
  film.mark("hero");
  await film.hideCursor();
  await film.hold(4500);
};
