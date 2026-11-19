// privilege footer: hover the contact CTA, then the maker link
export default async (film) => {
  await film.hover({ role: "button", name: /contact us/i }, { hold: 1500 });
  await film.mark("hero");
  await film.hover({ role: "link", name: /naymur/i }, { hold: 1300 });
};
