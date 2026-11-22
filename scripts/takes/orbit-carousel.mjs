// Orbit carousel: step forward twice, then jump by clicking an avatar on the ring
export default async (film) => {
  await film.click({ role: "button", name: "Next" }, { hold: 1100 });
  await film.click({ role: "button", name: "Next" }, { hold: 1100 });
  await film.click('img[alt="Amara Nwosu"]', { hold: 1300 });
  film.mark("hero");
};
