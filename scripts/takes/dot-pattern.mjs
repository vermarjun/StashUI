// scripts/takes/dot-pattern.mjs — glowing dot grid pulses under the heading; slow push-in
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  await film.hold(2400);
  film.mark("hero");
  await film.hold(2800);
};
