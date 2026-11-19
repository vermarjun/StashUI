// comp-371 — checkbox dropdown: tick Next.js, reopen, tick Astro, show both ticked
export default async (film) => {
  await film.click({ role: "button", name: /Checkbox items/ }, { hold: 1000 });
  await film.click({ role: "menuitemcheckbox", name: /Next\.js/ }, { hold: 700 });
  await film.click({ role: "button", name: /Checkbox items/ }, { hold: 800 });
  await film.click({ role: "menuitemcheckbox", name: /Astro/ }, { hold: 700 });
  await film.click({ role: "button", name: /Checkbox items/ }, { hold: 1300 });
  film.mark("hero");
  await film.press("Escape", { hold: 900 });
};
