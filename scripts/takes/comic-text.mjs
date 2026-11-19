// The comic word springs in on mount; hold on the halftone lettering with a slow push-in.
export default async (film) => {
  film.hideCursor();
  film.mark("kenburns");
  await film.hold(1600);
  film.mark("hero");
  await film.hold(3000);
};
