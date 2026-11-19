// feature hero: scrolls to the feature grid and hovers cards so highlights play
export default async (film) => {
  await film.scroll(240, { secs: 1.2, hold: 400 });
  await film.hover({ text: "AI Campaign Optimization" }, { hold: 1200 });
  film.mark("hero");
  await film.hover({ text: "AI Audience Segmentation" }, { hold: 1300 });
};
