// Edit the last question to fork a new branch; the reply streams in on the new version.
export default async (film) => {
  await film.hover({ text: "Make day 3 less touristy." }, { hold: 500 });
  await film.click(film.page.locator('[data-rec-root] button[aria-label="Edit message"]').last(), { hold: 400 });
  await film.press("ControlOrMeta+A");
  await film.type(null, "Make day 3 all about food.", { delay: 40 });
  await film.press("Enter");
  await film.hold(1600);
  film.mark("hero");
  await film.hold(600);
};
