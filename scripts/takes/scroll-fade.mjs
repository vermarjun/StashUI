// scroll-fade — scroll the changelog down so the top fade appears, then back up so it eases away.
// One down + one up keeps the take ~6 s (the old 3-scroll version ran 14.5 s and hit the list end).
export default async (film) => {
  await film.hover({ text: "Reduced motion everywhere" }, { hold: 300 });
  await film.scroll(240, { secs: 1.3, hold: 600 });
  film.mark("hero");
  await film.scroll(-240, { secs: 1.3, hold: 400 });
};
