// Hover Chart and dwell on the chart-style tooltip.
export default async (film) => {
  await film.hover({ role: "button", name: /^chart$/i }, { hold: 2400 });
  film.mark("hero");
  await film.hold(600);
};
