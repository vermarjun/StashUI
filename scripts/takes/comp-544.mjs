// Cover-image dropzone: start on the empty zone, hover it, drop a cover in so the
// preview fills the zone, and hold on the result (the loop dissolves back to empty).
async function addFiles(page, n) {
  await page.evaluate(async (n) => {
    const palettes = [["#6366f1", "#0ea5e9"], ["#f59e0b", "#ef4444"], ["#10b981", "#14b8a6"]];
    const dt = new DataTransfer();
    for (let i = 0; i < n; i++) {
      const c = document.createElement("canvas");
      c.width = 1200;
      c.height = 800;
      const g = c.getContext("2d");
      const grad = g.createLinearGradient(0, 0, 1200, 800);
      grad.addColorStop(0, palettes[i % 3][0]);
      grad.addColorStop(1, palettes[i % 3][1]);
      g.fillStyle = grad;
      g.fillRect(0, 0, 1200, 800);
      g.fillStyle = "rgba(255,255,255,0.45)";
      g.fillRect(110, 540, 520, 26);
      g.fillRect(110, 590, 340, 18);
      g.beginPath();
      g.arc(920, 220, 130, 0, Math.PI * 2);
      g.fill();
      const blob = await new Promise((r) => c.toBlob(r, "image/png"));
      dt.items.add(new File([blob], `cover-${i + 1}.png`, { type: "image/png" }));
    }
    const input = document.querySelector("[data-rec-root] input[type=file]");
    input.files = dt.files;
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }, n);
}

export default async (film) => {
  await film.hold(500);
  await film.hover("[data-rec-root] .border-dashed", { hold: 900 });
  await addFiles(film.page, 1);
  await film.hold(900);
  film.mark("hero");
  await film.glide({ x: film.W * 0.5, y: film.H * 0.88 }, { secs: 0.8 });
  await film.hold(1600);
};
