// Copy to clipboard: hover for the tooltip, click, the icon flips to a check
export default async (film) => {
  await film.hover({ role: "button", name: /copy to clipboard/i }, { hold: 1100 });
  await film.click({ role: "button", name: /copy to clipboard/i }, { hold: 1600 });
  film.mark("hero");
};
