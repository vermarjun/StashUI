// screensaver — photos bounce off the edges like an old DVD screensaver
export default async (film) => {
  film.hideCursor();
  await film.hold(2500);
  film.mark("hero");
  await film.hold(2500);
};
