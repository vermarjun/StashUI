// hold through the word and character entrance animations
export default async (film) => {
  await film.hideCursor();
  await film.hold(2200);
};
