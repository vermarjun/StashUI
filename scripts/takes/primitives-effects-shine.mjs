// Shine — the plan card shines on a loop; hover one button (looping shine) and click the other (one sweep)
export default async (film) => {
  await film.hover({ role: "button", name: /hover me/i }, { hold: 1900 });
  film.mark("hero");
  await film.click({ role: "button", name: /click me/i }, { hold: 1000 });
  await film.click(null, { hold: 1000 });
};
