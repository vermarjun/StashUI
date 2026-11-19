// Static masked artwork: let the camera push in so the shapes read.
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  await film.hold(4800);
};
