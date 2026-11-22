// Emoji chips: pick three interests, each launches floating emoji and the counter pill grows
export default async (film) => {
  await film.click({ text: "Coffee" }, { hold: 700 });
  film.mark("hero");
  await film.click({ text: "Travel" }, { hold: 700 });
  await film.click({ text: "Live music" }, { hold: 1200 });
};
