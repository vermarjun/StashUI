// numbers count up on mount; then hover the three stat tiles so they lift in turn
export default async (film) => {
  await film.hold(900);
  film.mark("hero");
  await film.hover({ text: "Ads Optimized Daily" }, { hold: 900 });
  await film.hover({ text: "Campaigns Built" }, { hold: 900 });
  await film.hover({ text: "Happy Customers" }, { hold: 1000 });
};
