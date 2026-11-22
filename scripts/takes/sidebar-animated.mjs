// sidebar-animated — the highlight glides across menu items, then the sidebar collapses to icons and back
export default async (film) => {
  await film.hover({ text: "Playground" }, { hold: 500 });
  await film.hover({ text: "Documentation" }, { hold: 500 });
  await film.hover({ text: "Design Engineering" }, { hold: 600 });
  await film.click({ role: "button", name: /toggle sidebar/i }, { hold: 1100 });
  film.mark("hero");
  await film.click({ role: "button", name: /toggle sidebar/i }, { hold: 1000 });
};
