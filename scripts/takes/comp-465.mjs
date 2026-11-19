// pagination with go-to-page field: clear it with backspace and type a page number
export default async (film) => {
  await film.hover({ role: "link", name: "4" }, { hold: 600 });
  await film.click("input.w-14", { hold: 400 });
  await film.press("End", { hold: 200 });
  await film.press("Backspace", { hold: 200 });
  await film.type(null, "7", { hold: 500 });
  await film.mark("hero");
  await film.press("Enter", { hold: 1300 });
};
