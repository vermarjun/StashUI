// terminal-ui — ambient: an onboarding sequence types itself out with shimmering progress bars
export default async (film) => {
  film.hideCursor();
  await film.hold(3500);
  film.mark("hero");
  await film.hold(3000);
};
