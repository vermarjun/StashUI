// open the sign-up dialog and fill the form
export default async (film) => {
  await film.hover({ role: "button", name: /Sign up/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Sign up/ }, { hold: 1200 });
  await film.type("input[placeholder='Matt Welsh']", "Maya Chen", { delay: 26, hold: 250 });
  await film.type("input[placeholder*='yourcompany']", "maya@northwind.dev", { delay: 20, hold: 250 });
  await film.type("input[placeholder='Enter your password']", "correct-horse-42", { delay: 26, hold: 500 });
  await film.mark("hero");
  await film.press("Escape", { hold: 300 });
};
