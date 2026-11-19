// hover menu: Products opens a product card, then Resources opens links
export default async (film) => {
  await film.hover({ text: "Products", exact: true }, { hold: 1800 });
  await film.mark("hero");
  await film.hover({ text: "Resources", exact: true }, { hold: 1600 });
  await film.hover({ text: "Pricing", exact: true }, { hold: 1200 });
};
