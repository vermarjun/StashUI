// open checkout and apply a coupon code
export default async (film) => {
  await film.hover({ role: "button", name: /Checkout/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Checkout/ }, { hold: 1200 });
  await film.click({ role: "button", name: /Add coupon/ }, { hold: 500 });
  await film.type("input[placeholder='Enter your code']", "SAVE20", { delay: 85, hold: 600 });
  await film.mark("hero");
  await film.press("Escape", { hold: 300 });
};
