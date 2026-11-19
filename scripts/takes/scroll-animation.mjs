// the cards all enter on mount and fit the frame; hold the revealed stack with a slow push-in
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  film.mark("hero");
  await film.hold(5200);
};
