// Feedback popover: pick a mood so the pill morphs into a form, type a note, submit for the thank-you state
export default async (film) => {
  const faces = film.page.locator("[data-rec-root] button");
  await film.click(faces.nth(1), { hold: 700 });
  await film.type("[data-rec-root] textarea", "Checkout felt really fast today!");
  film.mark("hero");
  await film.click({ role: "button", name: /submit/i }, { hold: 1800 });
};
