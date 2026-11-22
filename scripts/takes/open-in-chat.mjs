// open-in-chat — open the menu of AI chat targets and hover one, then show the inline icon bar
export default async (film) => {
  await film.click({ role: "button", name: /open in chat/i }, { hold: 900 });
  film.mark("hero");
  await film.hover({ role: "menuitem", name: /perplexity/i }, { hold: 1100 });
  await film.press("Escape");
  await film.hover('[data-rec-root] a[aria-label^="Open in"] >> nth=1', { hold: 1200 });
};
