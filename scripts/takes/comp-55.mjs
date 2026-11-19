// Masked timestamp: type six digits and watch the 99:99:99 mask format them
export default async (film) => {
  await film.type("input", "093000", { delay: 90, hold: 1500 });
};
