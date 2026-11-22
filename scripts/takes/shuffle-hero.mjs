// shuffle-hero — ambient: the photo grid reshuffles itself with springy layout moves every 3 s
export default async (film) => {
  film.hideCursor();
  await film.hold(3200);
  film.mark("hero");
  await film.hold(3000);
};
