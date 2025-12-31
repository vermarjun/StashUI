import "server-only";
import { createHighlighter, type Highlighter } from "shiki";

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark"],
      langs: ["tsx", "bash", "json", "css"],
    });
  }
  return highlighterPromise;
}

/**
 * Highlight code to dual-theme HTML. Colors are emitted as CSS variables so
 * the same markup adapts to light/dark via the `.dark` class (see globals.css).
 */
export async function highlight(code: string, lang = "tsx"): Promise<string> {
  const hl = await getHighlighter();
  return hl.codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
