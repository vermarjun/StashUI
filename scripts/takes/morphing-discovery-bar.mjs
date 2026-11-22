// Discovery bar: switch tab, morph into search and type, then close
export default async (film) => {
  await film.click({ role: "button", name: /Music/ }, { hold: 700 });
  await film.click("[data-rec-root] button.absolute.inset-0", { hold: 700 });
  await film.type(null, "jazz brunch near me");
  film.mark("hero");
  await film.hold(600);
  await film.click("[data-rec-root] button.shrink-0", { hold: 900 });
};
