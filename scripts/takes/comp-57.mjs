// Inner tag input: add two more inline tags with Enter
export default async (film) => {
  await film.type('input[placeholder="Add a tag"]', "Design", { hold: 300 });
  await film.press("Enter", { hold: 900 });
  await film.type('input[placeholder="Add a tag"]', "Motion", { hold: 300 });
  await film.press("Enter", { hold: 900 });
  film.mark("hero");
  await film.hold(900);
};
