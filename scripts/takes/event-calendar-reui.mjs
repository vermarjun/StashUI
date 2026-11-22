// Event calendar: month view, switch to the week time grid, add an event
export default async (film) => {
  await film.click('[data-slot="event-calendar-view-switcher"]', { hold: 800 });
  await film.click({ role: "menuitem", name: /^week/i }, { hold: 1100 });
  film.mark("hero");
  await film.click({ role: "button", name: /new event/i }, { hold: 1300 });
};
