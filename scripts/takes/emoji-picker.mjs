// Emoji picker: browse the grid, search "rocket", pick the first match
export default async (film) => {
  await film.hover('[data-slot="emoji-picker-emoji"] >> nth=9', { hold: 700 });
  await film.type('input[placeholder="Search emoji"]', "rocket");
  await film.hold(700);
  film.mark("hero");
  await film.click('[data-slot="emoji-picker-emoji"] >> nth=0', { hold: 1100 });
};
