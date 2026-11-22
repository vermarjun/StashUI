// underline-animation — hover down the contact list, each link draws its own underline style
export default async (film) => {
  await film.hover("[data-underline=center]", { hold: 900 });
  await film.hover("[data-underline=comes-in-right]", { hold: 900 });
  await film.hover("[data-underline=background]", { hold: 1000 });
  film.mark("hero");
  await film.hover("[data-underline=goes-out-left]", { hold: 1000 });
};
