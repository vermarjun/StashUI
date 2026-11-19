// range presets: Last 30 days paints a full range, then pick another preset
export default async (film) => {
  await film.click({ role: "button", name: /^Last 30 days$/ }, { hold: 1400 });
  film.mark("hero");
  await film.click({ role: "button", name: /^Last month$/ }, { hold: 1300 });
};
