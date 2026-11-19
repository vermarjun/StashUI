// walk the stepper forward two steps so completed states and checks appear
export default async (film) => {
  await film.click({ role: "button", name: /next/i }, { hold: 1400 });
  film.mark("hero");
  await film.click({ role: "button", name: /next/i }, { hold: 1600 });
};
