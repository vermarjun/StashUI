// chat-coss — send a message: it animates in, ticks sending → read, Priya types and replies
export default async (film) => {
  await film.type('[data-rec-root] input[aria-label="Message"]', "Post is live, link is in the channel");
  await film.press("Enter");
  await film.hold(2200);
  film.mark("hero");
  await film.hold(1600);
};
