// RubberSegment: hop the thumb across segments so it stretches and squashes
export default async (film) => {
  await film.click({ role: "radio", name: "Year" }, { hold: 800 });
  film.mark("hero");
  await film.click({ role: "radio", name: "Day" }, { hold: 800 });
  await film.click({ role: "radio", name: "Week" }, { hold: 900 });
};
