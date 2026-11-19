// Hover the button and dwell on the compact tooltip.
export default async (film) => {
  await film.hover({ role: "button", name: /^tiny$/i }, { hold: 2000 });
  film.mark("hero");
  await film.hold(600);
};
