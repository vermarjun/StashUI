"use client";

import * as React from "react";
import { ProxyAdmin } from "@/registry/dashboards/proxy-admin";

// A self-contained demo: the dashboard normally talks to a live proxykit
// backend over REST, but here we inject a mock `fetcher` that returns canned
// responses so the preview renders a fully-populated control panel with no
// server attached. The shapes below match the proxykit gateway API exactly.

function json(data: unknown): Response {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function buildStatus() {
  const now = Date.now();
  const iso = (offsetMs: number) => new Date(now + offsetMs).toISOString();
  return {
    internalKeySet: true,
    proxyBase: "https://api.myapp.com/api/proxy/gateway/proxy",
    providers: [
      {
        provider: "codex",
        baseURL: "https://chatgpt.com/backend-api/codex",
        authKind: "oauth-pkce",
        configured: true,
        maskedToken: "sk-proj-…a9F2",
        hasRefreshToken: true,
        hasAccountId: true,
        expiresAt: iso(6 * 60 * 60 * 1000), // 6h from now
        updatedAt: iso(-12 * 60 * 1000), // 12m ago
        updatedBy: "admin",
        models: [
          {
            id: "gpt-5-codex",
            label: "gpt-5-codex",
            think: { reasoning_effort: "high", max_tokens: 4096 },
            noThink: { reasoning_effort: "low", max_tokens: 1024 },
          },
          { id: "gpt-5", label: "gpt-5" },
          { id: "o4-mini", label: "o4-mini" },
        ],
      },
      {
        provider: "opencode",
        baseURL: "https://opencode.ai/v1",
        authKind: "static",
        configured: true,
        maskedToken: "oc-live-…4B1a",
        hasRefreshToken: false,
        hasAccountId: false,
        expiresAt: null,
        updatedAt: iso(-2 * 60 * 60 * 1000), // 2h ago
        updatedBy: "admin",
        models: [
          { id: "claude-opus-4-8", label: "claude-opus-4-8" },
          { id: "claude-sonnet-4-6", label: "claude-sonnet-4-6" },
        ],
      },
    ],
  };
}

const mockFetcher: typeof fetch = async (input, init) => {
  const url = typeof input === "string" ? input : input.toString();
  const method = (init?.method ?? "GET").toUpperCase();

  if (url.includes("/admin/gateway/status")) {
    await sleep(450); // let the loading skeleton flash, then populate
    return json(buildStatus());
  }
  if (url.includes("/admin/gateway/test")) {
    await sleep(600); // simulate a round-trip
    return json({
      success: true,
      provider: "codex",
      model: "gpt-5-codex",
      latencyMs: 612,
      httpStatus: 200,
      reply: "API OK",
      finishReason: "stop",
      usage: { prompt_tokens: 14, completion_tokens: 3, total_tokens: 17 },
      raw: {
        id: "chatcmpl-demo",
        object: "chat.completion",
        choices: [
          { index: 0, message: { role: "assistant", content: "API OK" }, finish_reason: "stop" },
        ],
      },
    });
  }
  if (url.includes("/start-auth")) {
    return json({ oauthUrl: "https://example.com/oauth/authorize?demo=1" });
  }
  if (url.includes("/refresh")) {
    await sleep(400);
    return json({ success: true, maskedToken: "sk-proj-…b7C3" });
  }
  if (method === "PUT" && url.includes("/admin/gateway/providers/")) {
    return json({ success: true, provider: url.split("/").pop() });
  }
  return new Response("Not mocked", { status: 404 });
};

export default function ProxyAdminDemo() {
  return (
    <div className="mx-auto w-full max-w-4xl p-6">
      <ProxyAdmin basePath="/api/proxy" fetcher={mockFetcher} />
    </div>
  );
}
