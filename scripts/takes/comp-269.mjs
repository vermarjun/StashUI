// comp-269: static error alert; slow camera push-in.
export default async (film) => {
  film.mark("kenburns");
  await film.hideCursor();
  await film.hold(4200);
};
