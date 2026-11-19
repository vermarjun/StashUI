// Password strength: type a strong password, reveal it, then hide it again
export default async (film) => {
  await film.type("input[type=password]", "StashUI-2026!", { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: /show password/i }, { hold: 1400 });
  await film.click({ role: "button", name: /hide password/i }, { hold: 700 });
};
