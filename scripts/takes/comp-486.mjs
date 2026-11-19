// Range inputs: enter a min and max price for the filter
export default async (film) => {
  await film.type('input[placeholder="From"]', "100", { hold: 400 });
  await film.type('input[placeholder="To"]', "500", { hold: 1000 });
  film.mark("hero");
};
