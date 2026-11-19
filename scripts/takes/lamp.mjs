// scripts/takes/lamp.mjs — static composition: slow camera push-in keeps it alive
export default async (film) => {
  film.mark("kenburns");
  await film.hold(5200);
};
