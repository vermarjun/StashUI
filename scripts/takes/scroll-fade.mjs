// scroll-fade — scroll the changelog so the top fade appears, then the bottom one eases away
export default async (film) => {
  await film.hover({ text: "Reduced motion everywhere" }, { hold: 500 });
  await film.scroll(260, { secs: 1.6 });
  film.mark("hero");
  await film.hold(900);
  await film.scroll(400, { secs: 1.4 });
  await film.hold(700);
  await film.scroll(-660, { secs: 1.6 });
};
