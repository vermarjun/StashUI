// a disabled button is deliberately inert: slow camera push-in instead of clicks
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  await film.hold(4200);
};
