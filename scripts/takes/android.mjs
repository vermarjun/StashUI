// Static device mockup: slow camera push-in on the phone.
export default async (film) => {
  film.hideCursor();
  film.mark("kenburns");
  film.mark("hero");
  await film.hold(4500);
};
