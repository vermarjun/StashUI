// hold while the text scrambles, then resolves letter by letter
export default async (film) => {
  await film.hideCursor();
  await film.hold(2300);
};
