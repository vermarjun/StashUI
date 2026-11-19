// stripe-bg-guides — ambient: light pulses travel down the dashed column guides behind the hero.
export default async (film) => {
  await film.hideCursor();
  await film.hold(2400);
  film.mark("hero");
  await film.hold(3200);
};
