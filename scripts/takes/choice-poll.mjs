// hover a couple of choices, vote for React, then hold while the result bars and percentages animate in
export default async (film) => {
  await film.hover({ role: "option", name: /Vue/i }, { hold: 600 });
  await film.hover({ role: "option", name: /Svelte/i }, { hold: 500 });
  await film.click({ role: "option", name: /React/i }, { hold: 1200 });
  film.mark("hero");
  await film.hold(1500);
};
