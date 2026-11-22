// Thought Line: steps tick in under a live clock, then fold into one line with the answer
export default async (film) => {
  await film.hideCursor();
  await film.hold(3300);
  film.mark("hero");
  await film.hold(2200);
};
