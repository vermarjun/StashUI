// background-beams-with-collision — ambient: beams fall and burst into sparks where they hit the floor.
export default async (film) => {
  await film.hideCursor();
  await film.hold(1600);
  film.mark("hero");
  await film.hold(4600);
};
