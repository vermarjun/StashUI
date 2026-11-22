// json-viewer — collapse the tree, then expand everything back out
export default async (film) => {
  await film.click({ role: "button", name: "Collapse All" }, { hold: 1200 });
  await film.click({ role: "button", name: "Expand All" }, { hold: 1500 });
  film.mark("hero");
};
