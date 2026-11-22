// Audio meters: ambient, synthetic mix drives the master + channel meters, clip light fires near the end of each phrase
export default async (film) => {
  film.hideCursor();
  await film.hold(2600);
  film.mark("hero");
  await film.hold(3000);
};
