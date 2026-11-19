// static gradient headings: slow push-in across the three lines
export default async (film) => {
  film.mark("kenburns");
  await film.hover({ text: "Ship faster with beautiful UI" }, { hold: 1400 });
  film.mark("hero");
  await film.hover({ text: "Composable components for every project" }, { hold: 1000 });
  await film.hover({ text: "Designed with Tailwind v4 & Radix" }, { hold: 900 });
};
