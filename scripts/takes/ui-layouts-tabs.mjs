// wobbly tab highlight: Pricing -> Features -> back to Overview
export default async (film) => {
  await film.click({ text: "Pricing", exact: true }, { hold: 1300 });
  await film.click({ text: "Features", exact: true }, { hold: 1300 });
  film.mark("hero");
  await film.click({ text: "Overview", exact: true }, { hold: 1100 });
};
