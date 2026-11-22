// Shredder: rows feed themselves into the slit and come out as curling strips
export default async (film) => {
  await film.hideCursor();
  await film.hold(2200);
  film.mark("hero");
  await film.hold(3200);
};
