// hold through the character, word and line reveals (last line has a delay)
export default async (film) => {
  await film.hideCursor();
  await film.hold(2200);
};
