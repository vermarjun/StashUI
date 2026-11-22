// CallChip: the demo cycles the tool call through running, done and error on its own
export default async (film) => {
  await film.hideCursor();
  await film.hold(2600);
  film.mark("hero");
  await film.hold(3400);
};
