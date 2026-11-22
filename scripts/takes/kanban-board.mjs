// Kanban board: drag a backlog card into the "In flight" column
export default async (film) => {
  const card = film.page.getByText("Fix broken UTMs on paid search ads");
  const target = film.page.getByText("A/B test lead-gen signup forms");
  await film.hover(card, { hold: 600 });
  await film.page.mouse.down();
  await film.glide(target, { secs: 0.9 });
  film.mark("hero");
  await film.hold(400);
  await film.page.mouse.up();
  await film.hold(1400);
};
