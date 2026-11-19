// Native selects render their popup outside the page, so show the value changes directly.
export default async (film) => {
  const selects = film.page.locator("[data-rec-root] select");
  await film.glide(selects.nth(0));
  await selects.nth(0).selectOption("us");
  await film.hold(900);
  await film.glide(selects.nth(1));
  await selects.nth(1).selectOption("express");
  await film.hold(900);
  await film.glide(selects.nth(2));
  await selects.nth(2).selectOption(["gift", "insurance"]);
  film.mark("hero");
  await film.hold(1000);
};
