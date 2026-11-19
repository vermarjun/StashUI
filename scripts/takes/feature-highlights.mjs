// feature highlights: hovers cards so their background and arrow accent light up
export default async (film) => {
  await film.hover({ text: "Pixel Perfect Layout" }, { hold: 1300 });
  film.mark("hero");
  await film.hover({ text: "Editable Components" }, { hold: 1300 });
};
