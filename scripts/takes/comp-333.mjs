// open the command dialog, filter, pick a command
export default async (film) => {
  await film.hover({ role: "button", name: /Search/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Search/ }, { hold: 1200 });
  await film.type("input[placeholder*='Type a command']", "import", { delay: 45, hold: 500 });
  await film.mark("hero");
  await film.click({ role: "option", name: /Import document/ }, { hold: 800 });
};
