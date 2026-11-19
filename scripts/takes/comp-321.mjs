// open the newsletter dialog and subscribe with an email
export default async (film) => {
  await film.hover({ role: "button", name: /Newsletter/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Newsletter/ }, { hold: 1200 });
  await film.type("input[placeholder*='yourcompany']", "maya@northwind.dev", { delay: 26, hold: 500 });
  await film.mark("hero");
  await film.click({ role: "button", name: /Subscribe/ }, { hold: 700 });
  await film.press("Escape", { hold: 300 });
};
