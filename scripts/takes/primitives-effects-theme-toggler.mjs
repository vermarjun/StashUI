// Switch Light then Dark so the view-transition wipe plays.
export default async (film) => {
  await film.click({ role: "button", name: /^light$/i }, { hold: 1300 });
  film.mark("hero");
  await film.hold(400);
  await film.click({ role: "button", name: /^dark$/i }, { hold: 1400 });
};
