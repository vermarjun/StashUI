// comp-135: a deliberately disabled checkbox; hold on it with a slow push-in.
export default async (film) => {
  film.mark("kenburns");
  await film.hover({ text: "Disabled checkbox" }, { hold: 1800 });
  film.mark("hero");
  await film.hold(1600);
};
