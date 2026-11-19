// dynamic-island — the island morphs to large, then snaps back to compact
export default async (film) => {
  await film.click({ role: "button", name: /^large$/ }, { hold: 1500 });
  await film.mark("hero");
  await film.click({ role: "button", name: /^compact$/ }, { hold: 1200 });
};
