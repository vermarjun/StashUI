// Staggered blur-in reveal of the timeline copy; slow push-in so the still reads as motion.
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  await film.hold(5200);
};
