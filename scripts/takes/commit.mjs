// Commit card: collapse the file list, then open it again
export default async (film) => {
  await film.click({ text: "feat(auth): rotate refresh tokens" }, { hold: 1000 });
  await film.click({ text: "feat(auth): rotate refresh tokens" }, { hold: 1200 });
  film.mark("hero");
  await film.hover({ text: "src/app/api/auth/refresh/route.ts" }, { hold: 900 });
};
