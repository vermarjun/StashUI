// Hover the button and dwell on the always-dark tooltip.
export default async (film) => {
  await film.hover({ role: "button", name: /^dark$/i }, { hold: 2000 });
  film.mark("hero");
  await film.hold(600);
};
