// feature bento: hovers the bento tiles so their image zoom and lift play
export default async (film) => {
  await film.hover({ text: "Instant Routes" }, { hold: 1200 });
  film.mark("hero");
  await film.hover({ text: "Peaks Conquered" }, { hold: 1200 });
};
