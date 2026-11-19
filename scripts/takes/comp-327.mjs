// open the invite dialog and add a teammate email
export default async (film) => {
  await film.hover({ role: "button", name: /Invite members/ }, { hold: 1500 });
  await film.click({ role: "button", name: /Invite members/ }, { hold: 1200 });
  await film.type("input[placeholder*='yourcompany']", "sam@northwind.dev", { delay: 24, hold: 500 });
  await film.mark("hero");
  await film.click({ role: "button", name: /Send invites/ }, { hold: 700 });
  await film.press("Escape", { hold: 300 });
};
