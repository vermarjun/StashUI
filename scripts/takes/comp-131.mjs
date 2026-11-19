// split button: open the merge-strategy menu and pick Squash and merge
export default async (film) => {
  await film.click({ role: "button", name: /options/i }, { hold: 1600 });
  film.mark("hero");
  await film.click({ role: "menuitemradio", name: /Squash and merge/i }, { hold: 1500 });
};
