// dotted-glow-background — ambient: the dot field pulses and individual dots glow sky-blue.
export default async (film) => {
  await film.hideCursor();
  await film.hold(2400);
  film.mark("hero");
  await film.hold(3000);
};
