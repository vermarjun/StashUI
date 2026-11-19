// default-marquee — ambient take: both review rows drift in opposite directions
export default async (film) => {
  await film.hideCursor();
  await film.hold(5200);
};
