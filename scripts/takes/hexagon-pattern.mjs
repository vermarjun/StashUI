// scripts/takes/hexagon-pattern.mjs — static pattern: slow camera push-in keeps it alive
export default async (film) => {
  film.mark("kenburns");
  await film.hold(5200);
};
