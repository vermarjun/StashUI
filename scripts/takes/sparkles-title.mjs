// sparkles-title — ambient: particles rise through the glowing horizon behind the title
export default async (film) => {
  film.hideCursor();
  await film.hold(2600);
  film.mark("hero");
  await film.hold(2400);
};
