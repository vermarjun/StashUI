// Footer blocks: switch to the link-search footer and filter it, then flip to the contact layout
export default async (film) => {
  await film.click("[data-variant=search]", { hold: 700 });
  await film.type("input[type=search]", "api");
  film.mark("hero");
  await film.hold(1100);
  await film.click("[data-variant=contact]", { hold: 1200 });
};
