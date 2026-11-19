// comp-455: pagination row; hover the Next / Previous controls as the camera pushes in.
export default async (film) => {
  film.mark("kenburns");
  await film.hover({ role: "button", name: /next/i }, { hold: 1000 });
  film.mark("hero");
  await film.hover({ role: "button", name: /previous/i }, { hold: 1000 });
  await film.hold(900);
};
