// flipcountdown: watch the flip digits tick for several seconds.
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  await film.hold(5600);
};
