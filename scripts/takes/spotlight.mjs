// spotlight — the light cone sweeps in from the top-left over the headline; slow push-in.
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  await film.hold(2200);
  film.mark("hero");
  await film.hold(2400);
};
