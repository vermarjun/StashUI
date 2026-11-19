// workspace header: switch team to Junon, then flip the Sitemap/Wireframe toggle
export default async (film) => {
  await film.click({ role: "button", name: /acme inc/i }, { hold: 900 });
  await film.hover({ role: "menuitem", name: /coss\.com/i }, { hold: 600 });
  await film.mark("hero");
  await film.click({ role: "menuitem", name: /junon/i }, { hold: 1200 });
  await film.click({ text: "Wireframe", exact: true }, { hold: 1300 });
};
