// Playful todolist: tick two tasks so the wavy strikethroughs draw across, then untick one
export default async (film) => {
  await film.click("#checkbox-1", { hold: 1300 });
  await film.click("#checkbox-3", { hold: 1400 });
  film.mark("hero");
  await film.click("#checkbox-1", { hold: 1200 });
};
