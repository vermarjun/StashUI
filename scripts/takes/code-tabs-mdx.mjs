// code-tabs-mdx — switching install-command tabs and copying one
export default async (film) => {
  await film.click({ role: "tab", name: "shadcn" }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: "Copy code" }, { hold: 1100 });
  await film.click({ role: "tab", name: "ui-layouts" }, { hold: 1000 });
};
