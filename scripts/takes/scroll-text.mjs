// three blocks blur and slide into view on mount (the content fits, no scroll)
export default async (film) => {
  await film.hideCursor();
  await film.hold(2400);
};
