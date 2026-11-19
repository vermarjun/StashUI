// centered-logo header: hover the icon nav, then open the user menu
export default async (film) => {
  await film.hover({ role: "link", name: /inbox/i }, { hold: 900 });
  await film.hover({ role: "link", name: /insights/i }, { hold: 900 });
  await film.mark("hero");
  await film.click("button:has-text('KK')", { hold: 1600 });
};
