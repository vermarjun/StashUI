// bento grid: hovers the tiles so each header mini-UI reacts and the text slides
export default async (film) => {
  await film.hover({ text: "Ship at the speed of thought" }, { hold: 1100 });
  await film.hover({ text: "Composable primitives" }, { hold: 1200 });
  film.mark("hero");
  await film.hover({ text: "Dark mode included" }, { hold: 1200 });
};
