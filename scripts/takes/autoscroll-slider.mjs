// autoscroll-slider — ambient take: the Embla carousel auto-scrolls its slides
export default async (film) => {
  await film.hideCursor();
  await film.hold(5200);
};
