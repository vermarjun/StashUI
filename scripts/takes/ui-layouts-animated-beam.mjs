// Beams travel between the nodes; slow push-in so the thin gradient lines read.
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  await film.hold(5200);
};
