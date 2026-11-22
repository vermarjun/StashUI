// Code tabs: switch package managers so the underline glides and the code swaps, then copy
export default async (film) => {
  await film.click({ role: "tab", name: "npm" }, { hold: 1100 });
  await film.click({ role: "tab", name: "bun" }, { hold: 1100 });
  film.mark("hero");
  await film.click('[data-slot="copy-button"]', { hold: 1100 });
};
