// Characters-left input: a 9-char name hits the 8-char limit, counter drops to 0
export default async (film) => {
  await film.type("input", "Maya Chen", { hold: 1400 });
};
