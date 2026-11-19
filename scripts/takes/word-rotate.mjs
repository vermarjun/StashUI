// ~13s hold: the 2.5s cycle lands back on the first word so the loop dissolve matches
export default async (film) => {
  await film.hideCursor();
  await film.hold(10800);
};
