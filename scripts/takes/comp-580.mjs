// ecommerce header: type a product search, then look at the cart
export default async (film) => {
  await film.type("input[type=search]", "running shoes", { hold: 600 });
  await film.mark("hero");
  await film.hover({ role: "link", name: /cart/i }, { hold: 1400 });
};
