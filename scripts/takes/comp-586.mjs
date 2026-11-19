// centered-search header: type a query and hover the voice button
export default async (film) => {
  await film.type("input[type=search]", "tailwind css", { hold: 600 });
  await film.mark("hero");
  await film.hover({ role: "button", name: /press to speak/i }, { hold: 1400 });
};
