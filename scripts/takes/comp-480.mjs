// pin the Name column to the left, then scroll the table sideways so Name stays put while the rest slides under it
export default async (film) => {
  await film.click("[data-rec-root] [aria-label='Pin options for Name column']", { hold: 1000 });
  await film.click({ text: "Stick to left" }, { hold: 1000 });
  await film.glide({ text: "Lars Nielsen" }, { secs: 0.6 });
  await film.hold(300);
  for (let i = 0; i < 8; i++) {
    await film.page.mouse.wheel(70, 0);
    await film.hold(70);
  }
  film.mark("hero");
  await film.hold(1300);
};
