// icon band renders statically here (its keyframe class is missing); show it
// with a slow push-in so the grid clip still reads
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  await film.hold(5200);
};
