/**
 * Choreography: inspira-meteors  (file: meteors.tsx)
 * Pure CSS animation — meteors streak diagonally via @keyframes.
 * Animation begins immediately on mount; just dwell to capture mid-flight meteors.
 * animationDelay range: 0.2–0.8 s, so meteors start entering within ~1 s.
 */
export default async function choreograph({ page, W, H }) {
  // Brief settle for React render + injected <style> tag
  await new Promise((r) => setTimeout(r, 800));

  // Park mouse at centre (no interaction, keeps page focus)
  try {
    await page.mouse.move(W / 2, H / 2);
  } catch (e) {
    console.warn("mouse.move failed", e.message);
  }

  // Dwell — meteors with short durations (2–3 s) will be mid-streak
  await new Promise((r) => setTimeout(r, 3000));
}
