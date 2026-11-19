// open the command palette, filter to billing, pick it
export default async (film) => {
  await film.hover({ role: "button", name: /Search commands/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Search commands/ }, { hold: 1200 });
  await film.type("input[placeholder*='Type a command']", "billing", { delay: 45, hold: 500 });
  await film.mark("hero");
  await film.click({ role: "option", name: /Billing/ }, { hold: 800 });
};
