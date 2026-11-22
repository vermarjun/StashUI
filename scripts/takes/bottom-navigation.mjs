// bottom-navigation — the highlight glides between tabs, then scrolling minimizes the bar
export default async (film) => {
  await film.click({ role: "button", name: "Search" }, { hold: 700 });
  await film.click({ role: "button", name: "Wallet" }, { hold: 700 });
  film.mark("hero");
  await film.hover({ text: "Green Grocer" }, { hold: 300 });
  await film.scroll(320, { secs: 1.2 });
  await film.hold(900);
  await film.scroll(-320, { secs: 1.2 });
  await film.hold(500);
};
