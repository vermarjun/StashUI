// background-beams — ambient light beams sweep along the curved paths behind the waitlist hero.
export default async (film) => {
  await film.hideCursor();
  await film.hold(2600);
  film.mark("hero");
  await film.hold(3000);
};
