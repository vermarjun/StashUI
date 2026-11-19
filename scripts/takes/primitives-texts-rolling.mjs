// hold while the letters roll up into place
export default async (film) => {
  await film.hideCursor();
  await film.hold(1800);
};
