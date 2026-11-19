// Hover Stats and dwell on the build-stats tooltip.
export default async (film) => {
  await film.hover({ role: "button", name: /^stats$/i }, { hold: 2400 });
  film.mark("hero");
  await film.hold(600);
};
