// hover across questions so the preview card on the right swaps its answer
export default async (film) => {
  await film.hover({ text: "How do I get started?" }, { hold: 1500 });
  film.mark("hero");
  await film.hover({ text: "Is it mobile responsive?" }, { hold: 1500 });
  await film.hover({ text: "What technologies are used?" }, { hold: 1300 });
};
