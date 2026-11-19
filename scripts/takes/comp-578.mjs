// mega-menu header: open Features (descriptions), then the simple Pricing menu
export default async (film) => {
  await film.hover({ role: "button", name: /features/i }, { hold: 1600 });
  await film.mark("hero");
  await film.hover({ role: "button", name: /pricing/i }, { hold: 1500 });
  await film.hover({ role: "button", name: /about/i }, { hold: 1200 });
};
