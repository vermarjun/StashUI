// Hover the icon button and dwell on its label tooltip.
export default async (film) => {
  await film.hover({ role: "button", name: /add new item/i }, { hold: 2000 });
  film.mark("hero");
  await film.hold(600);
};
