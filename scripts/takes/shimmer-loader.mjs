// shimmer-loader — ambient: three terminal-style bars shimmer while their labels and percentages tick up
export default async (film) => {
  film.hideCursor();
  await film.hold(2000);
  film.mark("hero");
  await film.hold(3000);
};
