// Ambient: the component animates on its own, so keep the cursor out of frame
export default async (film) => {
  await film.hideCursor();
  await film.hold(2600);
  film.mark("hero");
  await film.hold(2600);
};
