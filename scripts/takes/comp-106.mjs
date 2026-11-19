// Hover both halves of the fused icon button group.
export default async (film) => {
  await film.hover({ role: "button", name: /flip horizontal/i }, { hold: 1000 });
  await film.mark("hero");
  await film.click({ role: "button", name: /flip horizontal/i }, { hold: 600 });
  await film.hover({ role: "button", name: /flip vertical/i }, { hold: 1100 });
};
