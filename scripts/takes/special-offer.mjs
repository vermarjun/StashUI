// Special offer: let the live countdown tick while the camera pushes in.
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  await film.hold(5200);
};
