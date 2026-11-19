// open the delete dialog and type the confirmation name
export default async (film) => {
  await film.hover({ role: "button", name: /Delete project/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Delete project/ }, { hold: 1200 });
  await film.type("input[placeholder*='Type coss-ui']", "coss-ui", { delay: 45, hold: 500 });
  await film.mark("hero");
  await film.click({ role: "button", name: /^Delete$/ }, { hold: 800 });
};
