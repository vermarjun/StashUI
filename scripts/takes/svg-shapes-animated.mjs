// Three line-art shapes draw themselves in, then hold as static artwork.
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  await film.hold(5200);
};
