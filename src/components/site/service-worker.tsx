"use client";

import * as React from "react";

/**
 * Registers /sw.js (production only: in dev it would cache stale chunks).
 * The worker keeps grid posters and hashed build assets in a durable cache;
 * see public/sw.js for what it caches and why video is left to HTTP.
 */
export function ServiceWorker() {
  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    // A worker left behind by `next start` on localhost would keep serving its
    // cached chunks to a later `next dev` on the same port, so skip local hosts.
    // Opt in on a local host with ?sw=1 (remembered for the tab's session).
    const local = /^(localhost|127\.|\[::1\]|.*\.local$)/.test(location.hostname);
    if (new URLSearchParams(location.search).has("sw")) {
      try { sessionStorage.setItem("stashui:sw", "1"); } catch {}
    }
    let optIn = false;
    try { optIn = sessionStorage.getItem("stashui:sw") === "1"; } catch {}
    if (local && !optIn) return;
    const register = () =>
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    if (document.readyState === "complete") register();
    else window.addEventListener("load", register, { once: true });
  }, []);
  return null;
}
