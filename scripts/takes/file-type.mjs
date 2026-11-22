// File-type icons: a static set of colour-coded badges, so a slow camera push-in
export default async (film) => {
  film.hideCursor();
  film.mark("kenburns");
  film.mark("hero");
  await film.hold(4200);
};
