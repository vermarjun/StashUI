// tree-code-viewer — pick files in the tree and the highlighted source swaps on the right
export default async (film) => {
  await film.hold(600); // shiki finishes highlighting
  await film.click({ text: "button.tsx" }, { hold: 1300 });
  film.mark("hero");
  await film.click({ text: "use-billing-cycle.ts" }, { hold: 1300 });
  await film.click({ text: "pricing-card.tsx" }, { hold: 1000 });
};
