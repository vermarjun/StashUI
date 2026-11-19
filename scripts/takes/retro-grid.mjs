// retro-grid — ambient: the perspective grid streams toward the horizon
export default async (film) => {
  await film.hideCursor();
  await film.hold(1500);
  film.mark("hero");
  await film.hold(4000);
};
