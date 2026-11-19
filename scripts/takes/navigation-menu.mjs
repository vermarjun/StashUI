// navigation menu: open Products, browse its links, then Docs
export default async (film) => {
  await film.hover({ role: "button", name: /products/i }, { hold: 1500 });
  await film.mark("hero");
  await film.hover({ role: "link", name: /analytics/i }, { hold: 800 });
  await film.hover({ role: "button", name: /docs/i }, { hold: 1600 });
};
