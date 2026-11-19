// click the integration card to check it: the checkbox fills and the card border lights up
export default async (film) => {
  await film.hover({ text: "Supabase" }, { hold: 700 });
  await film.click({ role: "checkbox" }, { hold: 1400 });
  film.mark("hero");
  await film.click(null, { hold: 1000 });
};
