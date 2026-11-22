// Put the caret at the end, take the grey suggestion with Tab, keep writing, take the next.
export default async (film) => {
  await film.click("[data-rec-root] textarea", { hold: 200 });
  await film.press("ControlOrMeta+End");
  await film.hold(1100);
  film.mark("hero");
  await film.press("Tab");
  await film.hold(700);
  await film.type(null, "Thursday works ", { delay: 45 });
  await film.hold(1000);
  await film.press("Tab");
  await film.hold(900);
};
