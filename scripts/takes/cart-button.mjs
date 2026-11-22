// cart-button — "Add" opens into a quantity stepper; bump it twice and the total rolls
export default async (film) => {
  await film.click({ role: "button", name: /^Add Oat milk to cart/ }, { hold: 800 });
  await film.click({ role: "button", name: "One more Oat milk" }, { hold: 600 });
  await film.click({ role: "button", name: "One more Oat milk" }, { hold: 1000 });
  film.mark("hero");
};
