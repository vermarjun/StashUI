// tweet-grid: hover across the masonry wall of tweet cards so their borders light up
export default async (film) => {
  await film.hover({ text: "Rebuilt our marketing site" }, { hold: 1000 });
  await film.hover({ text: "Our activation went up 18%" }, { hold: 1100 });
  film.mark("hero");
  await film.hover({ text: "Shipped v2 of our dashboard" }, { hold: 1000 });
};
