// Squiggle arrow: a static doodle set; slow camera push-in.
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  await film.hold(4400);
};
