// Masked input: type a licence plate, the AA99 AAA mask spaces it for you
export default async (film) => {
  await film.type("input", "AB12CDE", { delay: 90, hold: 1500 });
};
