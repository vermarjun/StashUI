// inspira-bento-grid — hover two bento cells so the footer CTA lifts into view
export default async (film) => {
  await film.hover(film.page.getByText("Fast Performance", { exact: true }).first(), { hold: 1200 });
  film.mark("hero");
  await film.hover(film.page.getByText("Accessible by Default", { exact: true }).first(), { hold: 1200 });
};
