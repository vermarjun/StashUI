// Merging bubbles: static liquid-join illustration, slow push-in
export default async (film) => {
  film.hideCursor();
  film.mark("kenburns");
  await film.hold(2000);
  film.mark("hero");
  await film.hold(2500);
};
