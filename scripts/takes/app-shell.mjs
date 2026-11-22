// app-shell — open a collapsible nav group, then collapse the sidebar to icons and back
export default async (film) => {
  await film.click({ role: "button", name: /^conversations$/i }, { hold: 1100 });
  film.mark("hero");
  await film.click({ role: "button", name: /toggle sidebar/i }, { hold: 1300 });
  await film.click({ role: "button", name: /toggle sidebar/i }, { hold: 900 });
};
