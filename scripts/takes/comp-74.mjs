// Characters-left textarea: write a real note and watch the counter drop
export default async (film) => {
  await film.type("textarea", "The new charts load much faster now — great work, team.", { hold: 1400 });
};
