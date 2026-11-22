// File icons: hover a few tiles and file rows
export default async (film) => {
  film.mark("kenburns");
  await film.hover({ text: "button.tsx" }, { hold: 900 });
  film.mark("hero");
  await film.hover({ text: "package.json" }, { hold: 900 });
  await film.hover({ text: "globals.css" }, { hold: 900 });
};
