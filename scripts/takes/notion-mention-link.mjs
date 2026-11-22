// Notion mention: hover the inline link to open its rich page preview
export default async (film) => {
  await film.hover("[data-rec-root] [data-mention=alps]", { hold: 2200 });
  film.mark("hero");
  await film.hold(800);
};
