// Show/hide password: type a password, toggle the eye to reveal and re-hide it
export default async (film) => {
  await film.type("#pass", "correct-horse-42", { hold: 700 });
  await film.click("[data-rec-root] .cursor-pointer", { hold: 1500 });
  film.mark("hero");
  await film.click("[data-rec-root] .cursor-pointer", { hold: 800 });
};
