// shifting-dropdown — hover across the tabs; the panel stays open and slides its content sideways
export default async (film) => {
  await film.hover({ role: "button", name: "Products" }, { hold: 1200 });
  await film.hover({ role: "button", name: "Pricing" }, { hold: 1100 });
  film.mark("hero");
  await film.hover({ role: "button", name: "Blog" }, { hold: 1300 });
  await film.hover({ role: "button", name: "Pricing" }, { hold: 900 });
};
