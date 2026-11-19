// team-expert — scroll to the expert cards and hover two into their orange state
export default async (film) => {
  await film.glide({ x: film.W * 0.5, y: film.H * 0.6 }, { secs: 0.6 });
  await film.scroll(230, { secs: 1.3 });
  await film.hover(film.page.getByText("Eskild Ebbesen", { exact: true }).first(), { hold: 1200 });
  film.mark("hero");
  await film.hover(film.page.getByText("Henrik Duer", { exact: true }).first(), { hold: 1200 });
};
