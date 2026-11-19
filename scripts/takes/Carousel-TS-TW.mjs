// Carousel-TS-TW — jump to slide 2 then 3 with the pagination dots
export default async (film) => {
  await film.click({ role: "button", name: "Go to slide 2" }, { hold: 1300 });
  film.mark("hero");
  await film.click({ role: "button", name: "Go to slide 3" }, { hold: 1300 });
};
