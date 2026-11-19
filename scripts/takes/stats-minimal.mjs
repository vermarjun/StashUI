// sweep across the minimal stat columns to show each hover highlight
export default async (film) => {
  await film.hover({ text: "Active Users" }, { hold: 1300 });
  film.mark("hero");
  await film.hover({ text: "Uptime" }, { hold: 1400 });
  await film.hover({ text: "Response Time" }, { hold: 1400 });
};
