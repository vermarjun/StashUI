// Mock browser window: a static product mockup; slow camera push-in.
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  await film.hold(4600);
};
