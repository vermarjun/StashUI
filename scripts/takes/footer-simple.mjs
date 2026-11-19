// simple footer: glide across the social and legal link columns
export default async (film) => {
  await film.hover({ role: "link", name: /twitter/i }, { hold: 900 });
  await film.hover({ role: "link", name: /instagram/i }, { hold: 900 });
  await film.mark("hero");
  await film.hover({ role: "link", name: /terms/i }, { hold: 1200 });
};
