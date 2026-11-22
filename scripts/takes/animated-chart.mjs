// Animated chart: the line draws in and the area fades up (the demo replays every 4s)
export default async (film) => {
  film.hideCursor();
  await film.hold(2400);
  film.mark("hero");
  await film.hold(2600);
};
