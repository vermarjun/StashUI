"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  RefreshCw,
  RefreshCcw,
  LogIn,
  KeyRound,
  Save,
  Server,
  Zap,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Play,
  Timer,
  Cpu,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// ── Public API ────────────────────────────────────────────────────────────────

export interface ProxyAdminProps {
  /** Base path where the proxykit REST API is mounted. Default: "/api/proxy". */
  basePath?: string;
  /**
   * Drop-in replacement for the global fetch. Lets the host inject auth
   * headers at the transport level (e.g. a pre-signed fetcher).
   */
  fetcher?: typeof fetch;
  /**
   * Called before every request. Return headers that are merged into the
   * request, e.g. { Authorization: "Bearer <token>" }.
   * Can be sync or async.
   */
  getAuthHeaders?: () =>
    | Record<string, string>
    | Promise<Record<string, string>>;
  className?: string;
}

// ── REST response shapes ───────────────────────────────────────────────────────

interface ProviderModel {
  id: string;
  label?: string;
  /** Params preset to send when "thinking on" is chosen for this model. */
  think?: Record<string, unknown>;
  /** Params preset to send when "thinking off" is chosen for this model. */
  noThink?: Record<string, unknown>;
}

interface ProviderStatus {
  provider: string;
  baseURL: string;
  authKind: "oauth-pkce" | "static";
  configured: boolean;
  maskedToken: string | null;
  hasRefreshToken: boolean;
  hasAccountId: boolean;
  expiresAt: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
  models: ProviderModel[];
}

interface GatewayStatusResponse {
  providers: ProviderStatus[];
  internalKeySet: boolean;
  proxyBase: string;
}

interface TestResult {
  success: boolean;
  provider: string;
  model: string;
  latencyMs: number;
  httpStatus?: number;
  reply?: string | null;
  finishReason?: string;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  } | null;
  raw?: unknown;
  error?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function relativeTime(iso: string | null | undefined): string {
  if (!iso) return "";
  try {
    const diff = Date.now() - new Date(iso).getTime();
    const abs = Math.abs(diff);
    const future = diff < 0;
    if (abs < 60_000) return future ? "in a moment" : "just now";
    if (abs < 3_600_000) {
      const m = Math.round(abs / 60_000);
      return future ? `in ${m}m` : `${m}m ago`;
    }
    if (abs < 86_400_000) {
      const h = Math.round(abs / 3_600_000);
      return future ? `in ${h}h` : `${h}h ago`;
    }
    const d = Math.round(abs / 86_400_000);
    return future ? `in ${d}d` : `${d}d ago`;
  } catch {
    return iso;
  }
}

function isExpired(iso: string | null | undefined): boolean {
  if (!iso) return false;
  try {
    return new Date(iso).getTime() < Date.now();
  } catch {
    return false;
  }
}

function tryParseJson(
  str: string
): { ok: true; value: Record<string, unknown> } | { ok: false; error: string } {
  try {
    const parsed = JSON.parse(str) as unknown;
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return { ok: false, error: "Must be a JSON object." };
    }
    return { ok: true, value: parsed as Record<string, unknown> };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof SyntaxError ? e.message : "Invalid JSON",
    };
  }
}

// ── CopyButton ────────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);
  const handleClick = () => {
    if (typeof navigator === "undefined") return;
    void navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-0.5 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="size-3 text-green-500" />
      ) : (
        <Copy className="size-3" />
      )}
    </button>
  );
}

// ── StatusBadge ───────────────────────────────────────────────────────────────

function StatusBadge({ p }: { p: ProviderStatus }) {
  const expired = isExpired(p.expiresAt);
  if (p.configured && !expired) {
    return (
      <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
        connected
      </Badge>
    );
  }
  if (expired) {
    return (
      <Badge variant="destructive">expired</Badge>
    );
  }
  return (
    <Badge variant="outline" className="text-amber-600 border-amber-400/40">
      not connected
    </Badge>
  );
}

// ── ModelTestPanel ────────────────────────────────────────────────────────────

interface ModelTestPanelProps {
  provider: string;
  models: ProviderModel[];
  basePath: string;
  doFetch: (url: string, init: RequestInit) => Promise<Response>;
}

function ModelTestPanel({
  provider,
  models,
  basePath,
  doFetch,
}: ModelTestPanelProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedModel, setSelectedModel] = React.useState(
    models[0]?.id ?? ""
  );
  const [thinkingOn, setThinkingOn] = React.useState(false);
  const [prompt, setPrompt] = React.useState(
    'Hi! Just say "API OK" and nothing else.'
  );
  const [paramsJson, setParamsJson] = React.useState(() => {
    const first = models[0];
    const preset = first?.noThink ?? first?.think ?? {
      temperature: 0.2,
      max_tokens: 256,
    };
    return JSON.stringify(preset, null, 2);
  });
  const [running, setRunning] = React.useState(false);
  const [result, setResult] = React.useState<TestResult | null>(null);
  const [showRaw, setShowRaw] = React.useState(false);

  const paramsValid = tryParseJson(paramsJson).ok;

  // When model or thinking toggle changes, auto-fill params from the model preset.
  const applyPreset = React.useCallback(
    (modelId: string, thinking: boolean) => {
      const m = models.find((x) => x.id === modelId);
      if (!m) return;
      const preset = thinking ? m.think : m.noThink;
      if (preset) {
        setParamsJson(JSON.stringify(preset, null, 2));
      }
    },
    [models]
  );

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId);
    applyPreset(modelId, thinkingOn);
  };

  const handleThinkingToggle = () => {
    const next = !thinkingOn;
    setThinkingOn(next);
    applyPreset(selectedModel, next);
  };

  const selectedMeta = models.find((m) => m.id === selectedModel);
  const canToggleThinking = !!(selectedMeta?.think || selectedMeta?.noThink);

  const run = async () => {
    const parseResult = tryParseJson(paramsJson);
    if (!parseResult.ok) {
      toast.error("Fix JSON params before running.");
      return;
    }
    setRunning(true);
    setResult(null);
    try {
      const res = await doFetch(`${basePath}/admin/gateway/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          model: selectedModel,
          params: parseResult.value,
          prompt: prompt.trim() || undefined,
        }),
      });
      const data = (await res.json()) as TestResult;
      setResult(data);
      setShowRaw(false);
    } catch (err) {
      setResult({
        success: false,
        provider,
        model: selectedModel,
        latencyMs: 0,
        error: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setRunning(false);
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <Play className="size-3" />
        Test a model
      </button>
    );
  }

  return (
    <div className="space-y-3 pt-1">
      <div className="h-px bg-border" />
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold flex items-center gap-1.5">
          <Play className="size-3.5 text-muted-foreground" />
          Model test
        </p>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setResult(null);
          }}
          className="text-[11px] text-muted-foreground hover:text-foreground"
        >
          close
        </button>
      </div>

      {/* Model picker */}
      <div className="space-y-1.5">
        <Label className="text-xs">Model</Label>
        <div className="flex gap-2">
          {models.length > 0 ? (
            <Select value={selectedModel} onValueChange={handleModelChange}>
              <SelectTrigger className="h-8 text-xs flex-1">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((m) => (
                  <SelectItem key={m.id} value={m.id} className="text-xs font-mono">
                    {m.label ?? m.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input
              className="h-8 text-xs font-mono flex-1"
              placeholder="model id"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            />
          )}
          {/* Custom model override when list exists */}
          {models.length > 0 && (
            <Input
              className="h-8 text-xs font-mono w-36"
              placeholder="custom id"
              value={models.some((m) => m.id === selectedModel) ? "" : selectedModel}
              onChange={(e) => {
                if (e.target.value) setSelectedModel(e.target.value);
              }}
            />
          )}
        </div>
      </div>

      {/* Thinking toggle */}
      {canToggleThinking && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            role="switch"
            aria-checked={thinkingOn}
            onClick={handleThinkingToggle}
            className={cn(
              "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              thinkingOn ? "bg-primary" : "bg-input"
            )}
          >
            <span
              className={cn(
                "inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform",
                thinkingOn ? "translate-x-4" : "translate-x-1"
              )}
            />
          </button>
          <span className="text-xs text-muted-foreground">
            {thinkingOn ? "Thinking on" : "Thinking off"}, auto-fills the
            params preset
          </span>
        </div>
      )}

      {/* Prompt */}
      <div className="space-y-1.5">
        <Label className="text-xs">Prompt</Label>
        <textarea
          className="w-full min-h-[56px] rounded-lg border border-input px-2.5 py-2 text-xs bg-transparent resize-y focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring placeholder:text-muted-foreground"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          spellCheck={false}
          placeholder='e.g. "Say hi" or "What is 2+2?"'
        />
      </div>

      {/* Params JSON */}
      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between gap-2">
          <Label className="text-xs">Params (JSON)</Label>
          {!paramsValid && (
            <span className="text-[10px] text-destructive font-mono">
              {tryParseJson(paramsJson).ok ? "" : (tryParseJson(paramsJson) as { ok: false; error: string }).error}
            </span>
          )}
        </div>
        <textarea
          className={cn(
            "w-full min-h-[80px] rounded-lg border px-2.5 py-2 text-xs font-mono bg-transparent resize-y focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring placeholder:text-muted-foreground",
            paramsValid ? "border-input" : "border-destructive"
          )}
          value={paramsJson}
          onChange={(e) => setParamsJson(e.target.value)}
          spellCheck={false}
        />
        <p className="text-[10px] text-muted-foreground">
          temperature, max_tokens, reasoning_effort, thinking flags...
        </p>
      </div>

      {/* Run */}
      <Button
        size="sm"
        className="gap-1.5 h-8 text-xs"
        onClick={() => void run()}
        disabled={running || !selectedModel || !paramsValid}
      >
        {running ? (
          <>
            <RefreshCw className="size-3 animate-spin" />
            Running...
          </>
        ) : (
          <>
            <Sparkles className="size-3" />
            Run test
          </>
        )}
      </Button>

      {/* Result */}
      {result && (
        <div
          className={cn(
            "rounded-lg border p-3 space-y-2 text-xs",
            result.success
              ? "border-green-200 bg-green-50/50 dark:border-green-900/40 dark:bg-green-900/10"
              : "border-red-200 bg-red-50/50 dark:border-red-900/40 dark:bg-red-900/10"
          )}
        >
          {/* Status row */}
          <div className="flex items-center gap-2 flex-wrap">
            {result.success ? (
              <span className="flex items-center gap-1 font-medium text-green-700 dark:text-green-400">
                <CheckCircle2 className="size-3.5" />
                OK
              </span>
            ) : (
              <span className="flex items-center gap-1 font-medium text-red-600 dark:text-red-400">
                <AlertCircle className="size-3.5" />
                Failed
              </span>
            )}
            <span className="font-mono text-muted-foreground">{result.model}</span>
            {result.httpStatus != null && (
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded font-mono",
                  result.httpStatus < 400
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-red-100 text-red-600"
                )}
              >
                HTTP {result.httpStatus}
              </span>
            )}
            <span className="ml-auto flex items-center gap-1 text-muted-foreground">
              <Timer className="size-3" />
              {result.latencyMs}ms
            </span>
          </div>

          {/* Reply */}
          <div className="space-y-0.5">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
              reply
            </p>
            <p className="font-mono text-foreground whitespace-pre-wrap break-all bg-background/60 rounded-lg px-2 py-1.5 border text-[11px]">
              {result.reply ?? (
                <span className="text-amber-600 italic">
                  (null. Thinking models may put output in the reasoning
                  field, check raw below)
                </span>
              )}
            </p>
          </div>

          {/* Error text */}
          {result.error && (
            <div className="space-y-0.5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                error
              </p>
              <p className="font-mono text-red-600 dark:text-red-400 whitespace-pre-wrap break-all bg-background/60 rounded-lg px-2 py-1.5 border text-[11px]">
                {result.error}
              </p>
            </div>
          )}

          {/* Usage + finish reason */}
          {(result.usage || result.finishReason) && (
            <div className="flex items-center gap-3 pt-0.5 text-[10px] text-muted-foreground flex-wrap">
              {result.usage && (
                <span className="flex items-center gap-1">
                  <Cpu className="size-3" />
                  {result.usage.prompt_tokens ?? "?"} in /{" "}
                  {result.usage.completion_tokens ?? "?"} out
                  {result.usage.total_tokens
                    ? ` (${result.usage.total_tokens} total)`
                    : ""}
                </span>
              )}
              {result.finishReason && (
                <span>
                  finish:{" "}
                  <span className="font-mono">{result.finishReason}</span>
                </span>
              )}
            </div>
          )}

          {/* Raw toggle */}
          <div className="space-y-1 pt-1">
            <button
              type="button"
              onClick={() => setShowRaw((x) => !x)}
              className="text-[10px] text-sky-600 dark:text-sky-400 hover:underline font-medium"
            >
              {showRaw ? "Hide raw response" : "Show raw response"}
            </button>
            {showRaw && (
              <pre className="text-[10px] font-mono bg-muted/60 border rounded-lg p-2 overflow-auto max-h-96 whitespace-pre-wrap break-all">
                {JSON.stringify(result.raw, null, 2)}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── ProviderCard ──────────────────────────────────────────────────────────────

interface ProviderCardProps {
  p: ProviderStatus;
  basePath: string;
  doFetch: (url: string, init: RequestInit) => Promise<Response>;
  onRefetchStatus: () => void;
}

function ProviderCard({
  p,
  basePath,
  doFetch,
  onRefetchStatus,
}: ProviderCardProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [manualOpen, setManualOpen] = React.useState(false);

  // Manual paste form state
  const [token, setToken] = React.useState("");
  const [refreshTokenVal, setRefreshTokenVal] = React.useState("");
  const [accountId, setAccountId] = React.useState("");

  // In-flight state
  const [connectingOAuth, setConnectingOAuth] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const isOAuth = p.authKind === "oauth-pkce";
  const expired = isExpired(p.expiresAt);

  // OAuth popup + postMessage listener
  React.useEffect(() => {
    if (!isOAuth) return;

    const handler = (e: MessageEvent) => {
      // Guard: only accept messages matching this provider
      const { type, provider: msgProvider } = (e.data ?? {}) as {
        type?: string;
        provider?: string;
        error?: string;
      };
      if (msgProvider !== p.provider) return;

      if (type === "proxykit:connected") {
        setConnectingOAuth(false);
        toast.success(`${p.provider} connected.`);
        onRefetchStatus();
      }
      if (type === "proxykit:error") {
        setConnectingOAuth(false);
        const errMsg = (e.data as { error?: string }).error ?? "Unknown error";
        toast.error(`${p.provider} auth failed: ${errMsg}`);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("message", handler);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("message", handler);
      }
    };
  }, [isOAuth, p.provider, onRefetchStatus]);

  const startOAuth = async () => {
    try {
      const res = await doFetch(
        `${basePath}/admin/gateway/${p.provider}/start-auth`,
        { method: "POST" }
      );
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          message?: string;
        };
        toast.error(body.message ?? "Failed to start OAuth");
        return;
      }
      const { oauthUrl } = (await res.json()) as { oauthUrl: string };
      setConnectingOAuth(true);
      if (typeof window !== "undefined") {
        window.open(oauthUrl, "_blank", "width=560,height=720");
      }
    } catch (err) {
      toast.error(
        "Failed to start OAuth: " +
          (err instanceof Error ? err.message : String(err))
      );
    }
  };

  const doRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await doFetch(
        `${basePath}/admin/gateway/${p.provider}/refresh`,
        { method: "POST" }
      );
      const body = (await res.json()) as { success: boolean; error?: string };
      if (body.success) {
        toast.success("Token refreshed.");
        onRefetchStatus();
      } else {
        toast.error(body.error ?? "Refresh failed");
      }
    } catch (err) {
      toast.error(
        "Refresh failed: " +
          (err instanceof Error ? err.message : String(err))
      );
    } finally {
      setRefreshing(false);
    }
  };

  const doSaveManual = async () => {
    if (!token.trim()) return;
    setSaving(true);
    try {
      const body: Record<string, string> = { token: token.trim() };
      if (refreshTokenVal.trim()) body.refreshToken = refreshTokenVal.trim();
      if (accountId.trim()) body.accountId = accountId.trim();

      const res = await doFetch(
        `${basePath}/admin/gateway/providers/${p.provider}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as {
          message?: string;
        };
        toast.error(err.message ?? "Save failed");
        return;
      }
      toast.success(`Token saved for ${p.provider}.`);
      setToken("");
      setRefreshTokenVal("");
      setAccountId("");
      setManualOpen(false);
      onRefetchStatus();
    } catch (err) {
      toast.error(
        "Save failed: " +
          (err instanceof Error ? err.message : String(err))
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <CardTitle className="flex items-center gap-2 flex-wrap">
              <Server className="size-4 text-muted-foreground shrink-0" />
              <span className="font-mono">{p.provider}</span>
              <StatusBadge p={p} />
              {p.hasRefreshToken && (
                <Badge variant="secondary" className="text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-400/20">
                  auto-refresh
                </Badge>
              )}
              {p.hasAccountId && (
                <Badge variant="secondary" className="text-violet-600 dark:text-violet-400 bg-violet-500/10 border-violet-400/20">
                  account id set
                </Badge>
              )}
            </CardTitle>
            <CardDescription className="text-[11px]">
              {p.authKind === "oauth-pkce"
                ? "OAuth 2.0 with PKCE. Use the Connect button below."
                : "Static token. Paste via the form below."}
            </CardDescription>
          </div>

          <button
            type="button"
            onClick={() => setExpanded((x) => !x)}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            {expanded ? (
              <>
                <ChevronUp className="size-3.5" />
                Collapse
              </>
            ) : (
              <>
                <ChevronDown className="size-3.5" />
                Manage
              </>
            )}
          </button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Token status row */}
        <div className="rounded-lg bg-muted/40 border px-3 py-2 space-y-1">
          <div className="flex items-center gap-1.5">
            <KeyRound className="size-3 text-muted-foreground" />
            {p.maskedToken ? (
              <span className="text-[11px] font-mono">{p.maskedToken}</span>
            ) : (
              <span className="text-[11px] text-amber-600 dark:text-amber-400">
                no token stored
              </span>
            )}
          </div>
          {p.expiresAt && (
            <div
              className={cn(
                "text-[10px]",
                expired ? "text-red-500" : "text-muted-foreground"
              )}
            >
              {expired ? "Expired" : "Expires"} {relativeTime(p.expiresAt)}
            </div>
          )}
          {p.updatedAt && (
            <div className="text-[10px] text-muted-foreground">
              Updated {relativeTime(p.updatedAt)}
              {p.updatedBy ? ` by ${p.updatedBy}` : ""}
            </div>
          )}
        </div>

        {/* Available models list */}
        {p.models.length > 0 && (
          <div className="space-y-1.5">
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">
              available models
            </p>
            <div className="flex flex-wrap gap-1">
              {p.models.map((m) => (
                <span
                  key={m.id}
                  className="text-[10px] px-1.5 py-0.5 rounded-md bg-muted font-mono"
                >
                  {m.label ?? m.id}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Inline model test (only when configured) */}
        {p.configured && p.models.length > 0 && (
          <ModelTestPanel
            provider={p.provider}
            models={p.models}
            basePath={basePath}
            doFetch={doFetch}
          />
        )}

        {/* Actions panel (expanded) */}
        {expanded && (
          <div className="space-y-3 pt-1">
            <div className="h-px bg-border" />

            {/* OAuth flow (oauth-pkce providers) */}
            {isOAuth && (
              <div className="space-y-2">
                <Button
                  className="w-full gap-2 h-9 text-sm"
                  onClick={() => void startOAuth()}
                  disabled={connectingOAuth}
                >
                  {connectingOAuth ? (
                    <>
                      <RefreshCw className="size-3.5 animate-spin" />
                      Waiting for sign-in...
                    </>
                  ) : (
                    <>
                      <LogIn className="size-3.5" />
                      {p.configured ? `Re-connect ${p.provider}` : `Connect ${p.provider}`}
                    </>
                  )}
                </Button>
                {connectingOAuth && (
                  <p className="text-[10px] text-muted-foreground text-center">
                    Complete sign-in in the popup. This page updates
                    automatically when done.
                  </p>
                )}

                {/* Refresh button */}
                {p.hasRefreshToken && (
                  <Button
                    variant="outline"
                    className="w-full gap-2 h-8 text-xs"
                    onClick={() => void doRefresh()}
                    disabled={refreshing}
                  >
                    {refreshing ? (
                      <>
                        <RefreshCw className="size-3 animate-spin" />
                        Refreshing...
                      </>
                    ) : (
                      <>
                        <RefreshCcw className="size-3" />
                        Refresh token now
                      </>
                    )}
                  </Button>
                )}

                {/* Manual paste toggle */}
                <button
                  type="button"
                  onClick={() => setManualOpen((x) => !x)}
                  className="flex items-center justify-center gap-1 text-[11px] text-muted-foreground hover:text-foreground w-full pt-1 transition-colors"
                >
                  {manualOpen ? "Hide manual paste" : "Paste token manually instead"}
                </button>
              </div>
            )}

            {/* Manual paste form */}
            {(manualOpen || !isOAuth) && (
              <div className="space-y-2.5">
                <div className="space-y-1.5">
                  <Label className="text-xs">
                    {isOAuth ? "Access Token" : "API Key / Token"}
                  </Label>
                  <Input
                    type="password"
                    className="h-8 text-xs font-mono"
                    placeholder={
                      p.maskedToken
                        ? `${p.maskedToken} -- leave blank to keep`
                        : "Paste token or key"
                    }
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    autoComplete="new-password"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Write-only. Existing value shown masked above. Leave blank
                    to keep.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Refresh Token (optional)</Label>
                  <Input
                    type="password"
                    className="h-8 text-xs font-mono"
                    placeholder="refresh_token, if available"
                    value={refreshTokenVal}
                    onChange={(e) => setRefreshTokenVal(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Account ID (optional)</Label>
                  <Input
                    className="h-8 text-xs font-mono"
                    placeholder={
                      p.hasAccountId
                        ? "Already set -- leave blank to keep"
                        : "e.g. user-abc123"
                    }
                    value={accountId}
                    onChange={(e) => setAccountId(e.target.value)}
                    autoComplete="off"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Leave blank to auto-extract from token or keep existing.
                  </p>
                </div>

                <Button
                  size="sm"
                  className="h-7 text-xs gap-1.5"
                  onClick={() => void doSaveManual()}
                  disabled={saving || !token.trim()}
                >
                  {saving ? (
                    <>
                      <RefreshCw className="size-3 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="size-3" />
                      Save token
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── ProxyAdmin ────────────────────────────────────────────────────────────────

/**
 * ProxyAdmin is the control UI for a proxykit token-management proxy.
 * Drop it anywhere in your app -- it talks directly to the proxykit REST API
 * via fetch and needs no extra data-fetching library.
 *
 * Props:
 *   basePath         - where the proxykit API is mounted (default "/api/proxy")
 *   fetcher          - override fetch (e.g. for auth injection)
 *   getAuthHeaders   - async fn returning headers merged into every request
 *   className        - extra classes on the root element
 */
export function ProxyAdmin({
  basePath = "/api/proxy",
  fetcher,
  getAuthHeaders,
  className,
}: ProxyAdminProps) {
  const [status, setStatus] =
    React.useState<GatewayStatusResponse | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Memoized fetch wrapper: merges auth headers, forwards credentials.
  const doFetch = React.useCallback(
    async (url: string, init: RequestInit = {}): Promise<Response> => {
      const base = fetcher ?? fetch;
      let authHeaders: Record<string, string> = {};
      if (getAuthHeaders) {
        authHeaders = await Promise.resolve(getAuthHeaders());
      }
      return base(url, {
        credentials: "include",
        ...init,
        headers: {
          ...authHeaders,
          ...(init.headers as Record<string, string> | undefined),
        },
      });
    },
    [fetcher, getAuthHeaders]
  );

  const fetchStatus = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await doFetch(`${basePath}/admin/gateway/status`, {});
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as {
          message?: string;
        };
        throw new Error(
          body.message ?? `HTTP ${res.status}: ${res.statusText}`
        );
      }
      const data = (await res.json()) as GatewayStatusResponse;
      setStatus(data);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to load gateway status.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }, [basePath, doFetch]);

  React.useEffect(() => {
    void fetchStatus();
  }, [fetchStatus]);

  const totalProviders = status?.providers.length ?? 0;
  const connectedCount = status?.providers.filter(
    (p) => p.configured && !isExpired(p.expiresAt)
  ).length ?? 0;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Zap className="size-5 text-muted-foreground" />
            Proxy Admin
          </h2>
          <p className="text-sm text-muted-foreground">
            {loading
              ? "Loading gateway status..."
              : error
              ? "Could not reach the proxy API."
              : status
              ? `${connectedCount} of ${totalProviders} provider${totalProviders === 1 ? "" : "s"} connected.` +
                (status.internalKeySet
                  ? " Internal key is set."
                  : " Internal key is NOT set.")
              : "No data."}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 shrink-0"
          onClick={() => void fetchStatus()}
          disabled={loading}
        >
          <RefreshCw className={cn("size-3.5", loading && "animate-spin")} />
          Refresh
        </Button>
      </div>

      {/* Gateway meta card */}
      {status && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="size-4 text-muted-foreground" />
              Gateway
              {status.internalKeySet ? (
                <Badge className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                  key set
                </Badge>
              ) : (
                <Badge variant="destructive">key NOT set</Badge>
              )}
            </CardTitle>
            <CardDescription>
              Set <span className="font-mono">GATEWAY_INTERNAL_KEY</span> in
              your server environment. Clients authenticating to the proxy must
              supply this value as their bearer token.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] text-muted-foreground">
                Proxy base:
              </span>
              <span className="text-[11px] font-mono break-all">
                {status.proxyBase}
              </span>
              <CopyButton text={status.proxyBase} />
            </div>
            {!status.internalKeySet && (
              <p className="mt-2 text-[10px] text-amber-600 dark:text-amber-400">
                Without a key the proxy is open to anyone. Set
                GATEWAY_INTERNAL_KEY before exposing this service.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-40 rounded-xl bg-muted/40 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6 text-center space-y-3">
          <AlertCircle className="size-8 text-destructive mx-auto" />
          <p className="font-semibold text-sm">Failed to load gateway status</p>
          <p className="text-xs text-muted-foreground">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => void fetchStatus()}
          >
            Retry
          </Button>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && status && status.providers.length === 0 && (
        <div className="rounded-lg border border-dashed p-8 text-center space-y-2">
          <Server className="size-8 text-muted-foreground mx-auto" />
          <p className="text-sm font-medium">No providers configured</p>
          <p className="text-xs text-muted-foreground">
            The gateway returned an empty providers list. Check your proxykit
            server configuration.
          </p>
        </div>
      )}

      {/* Provider cards */}
      {!loading && !error && status && status.providers.length > 0 && (
        <Tabs defaultValue="providers">
          <TabsList>
            <TabsTrigger value="providers" className="gap-1.5">
              <Server className="size-3.5" />
              Providers
            </TabsTrigger>
            <TabsTrigger value="test" className="gap-1.5">
              <Play className="size-3.5" />
              Quick test
            </TabsTrigger>
          </TabsList>

          {/* Providers tab */}
          <TabsContent value="providers" className="mt-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {status.providers.map((p) => (
                <ProviderCard
                  key={p.provider}
                  p={p}
                  basePath={basePath}
                  doFetch={doFetch}
                  onRefetchStatus={() => void fetchStatus()}
                />
              ))}
            </div>
          </TabsContent>

          {/* Standalone quick-test tab (all providers, all models in one panel) */}
          <TabsContent value="test" className="mt-4">
            <QuickTestPanel
              providers={status.providers}
              basePath={basePath}
              doFetch={doFetch}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

ProxyAdmin.displayName = "ProxyAdmin";

// ── QuickTestPanel ────────────────────────────────────────────────────────────
// A standalone test panel that spans all configured providers and their models,
// useful for one-stop validation without drilling into individual provider cards.

interface QuickTestPanelProps {
  providers: ProviderStatus[];
  basePath: string;
  doFetch: (url: string, init: RequestInit) => Promise<Response>;
}

function QuickTestPanel({ providers, basePath, doFetch }: QuickTestPanelProps) {
  const configured = providers.filter(
    (p) => p.configured && !isExpired(p.expiresAt)
  );

  const [selectedProvider, setSelectedProvider] = React.useState(
    configured[0]?.provider ?? ""
  );

  const currentProvider = providers.find((p) => p.provider === selectedProvider);
  const models = currentProvider?.models ?? [];

  const [selectedModel, setSelectedModel] = React.useState(
    models[0]?.id ?? ""
  );
  const [thinkingOn, setThinkingOn] = React.useState(false);
  const [prompt, setPrompt] = React.useState(
    'Hi! Just say "API OK" and nothing else.'
  );
  const [paramsJson, setParamsJson] = React.useState(() => {
    const first = models[0];
    const preset = first?.noThink ?? first?.think ?? {
      temperature: 0.2,
      max_tokens: 256,
    };
    return JSON.stringify(preset, null, 2);
  });
  const [running, setRunning] = React.useState(false);
  const [result, setResult] = React.useState<TestResult | null>(null);
  const [showRaw, setShowRaw] = React.useState(false);

  const paramsValid = tryParseJson(paramsJson).ok;

  // Sync model list when provider changes
  React.useEffect(() => {
    const newModels = providers.find((p) => p.provider === selectedProvider)?.models ?? [];
    setSelectedModel(newModels[0]?.id ?? "");
    const first = newModels[0];
    const preset = first?.noThink ?? first?.think ?? {
      temperature: 0.2,
      max_tokens: 256,
    };
    setParamsJson(JSON.stringify(preset, null, 2));
    setThinkingOn(false);
    setResult(null);
  }, [selectedProvider, providers]);

  const currentModelMeta = models.find((m) => m.id === selectedModel);
  const canToggleThinking = !!(
    currentModelMeta?.think || currentModelMeta?.noThink
  );

  const handleThinkingToggle = () => {
    const next = !thinkingOn;
    setThinkingOn(next);
    if (currentModelMeta) {
      const preset = next ? currentModelMeta.think : currentModelMeta.noThink;
      if (preset) setParamsJson(JSON.stringify(preset, null, 2));
    }
  };

  const run = async () => {
    const parseResult = tryParseJson(paramsJson);
    if (!parseResult.ok) {
      toast.error("Fix JSON params before running.");
      return;
    }
    setRunning(true);
    setResult(null);
    try {
      const res = await doFetch(`${basePath}/admin/gateway/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: selectedProvider,
          model: selectedModel,
          params: parseResult.value,
          prompt: prompt.trim() || undefined,
        }),
      });
      const data = (await res.json()) as TestResult;
      setResult(data);
      setShowRaw(false);
    } catch (err) {
      setResult({
        success: false,
        provider: selectedProvider,
        model: selectedModel,
        latencyMs: 0,
        error: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setRunning(false);
    }
  };

  if (configured.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center space-y-2">
        <Play className="size-8 text-muted-foreground mx-auto" />
        <p className="text-sm font-medium">No connected providers</p>
        <p className="text-xs text-muted-foreground">
          Connect at least one provider to use the quick test panel.
        </p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Sparkles className="size-4 text-muted-foreground" />
          Quick test
        </CardTitle>
        <CardDescription>
          Send a one-off completion request through the proxy to verify a
          provider and model are working.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Provider + model selectors */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Provider</Label>
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                {configured.map((p) => (
                  <SelectItem key={p.provider} value={p.provider} className="text-xs font-mono">
                    {p.provider}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Model</Label>
            {models.length > 0 ? (
              <Select
                value={models.some((m) => m.id === selectedModel) ? selectedModel : ""}
                onValueChange={(v) => {
                  setSelectedModel(v);
                  const m = models.find((x) => x.id === v);
                  if (m) {
                    const preset = thinkingOn ? m.think : m.noThink;
                    if (preset) setParamsJson(JSON.stringify(preset, null, 2));
                  }
                }}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map((m) => (
                    <SelectItem key={m.id} value={m.id} className="text-xs font-mono">
                      {m.label ?? m.id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                className="h-8 text-xs font-mono"
                placeholder="model id"
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
              />
            )}
          </div>
        </div>

        {/* Thinking toggle */}
        {canToggleThinking && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              role="switch"
              aria-checked={thinkingOn}
              onClick={handleThinkingToggle}
              className={cn(
                "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                thinkingOn ? "bg-primary" : "bg-input"
              )}
            >
              <span
                className={cn(
                  "inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform",
                  thinkingOn ? "translate-x-4" : "translate-x-1"
                )}
              />
            </button>
            <span className="text-xs text-muted-foreground">
              {thinkingOn ? "Thinking on" : "Thinking off"}
            </span>
          </div>
        )}

        {/* Prompt */}
        <div className="space-y-1.5">
          <Label className="text-xs">Prompt</Label>
          <textarea
            className="w-full min-h-[56px] rounded-lg border border-input px-2.5 py-2 text-xs bg-transparent resize-y focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring placeholder:text-muted-foreground"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Params JSON */}
        <div className="space-y-1.5">
          <div className="flex items-baseline justify-between gap-2">
            <Label className="text-xs">Params (JSON)</Label>
            {!paramsValid && (
              <span className="text-[10px] text-destructive font-mono">
                Invalid JSON
              </span>
            )}
          </div>
          <textarea
            className={cn(
              "w-full min-h-[80px] rounded-lg border px-2.5 py-2 text-xs font-mono bg-transparent resize-y focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring placeholder:text-muted-foreground",
              paramsValid ? "border-input" : "border-destructive"
            )}
            value={paramsJson}
            onChange={(e) => setParamsJson(e.target.value)}
            spellCheck={false}
          />
        </div>

        {/* Run */}
        <Button
          className="gap-1.5 text-sm"
          onClick={() => void run()}
          disabled={running || !selectedProvider || !selectedModel || !paramsValid}
        >
          {running ? (
            <>
              <RefreshCw className="size-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Sparkles className="size-4" />
              Run test
            </>
          )}
        </Button>

        {/* Result */}
        {result && (
          <div
            className={cn(
              "rounded-lg border p-3 space-y-2 text-xs",
              result.success
                ? "border-green-200 bg-green-50/50 dark:border-green-900/40 dark:bg-green-900/10"
                : "border-red-200 bg-red-50/50 dark:border-red-900/40 dark:bg-red-900/10"
            )}
          >
            <div className="flex items-center gap-2 flex-wrap">
              {result.success ? (
                <span className="flex items-center gap-1 font-medium text-green-700 dark:text-green-400">
                  <CheckCircle2 className="size-3.5" />
                  OK
                </span>
              ) : (
                <span className="flex items-center gap-1 font-medium text-red-600 dark:text-red-400">
                  <AlertCircle className="size-3.5" />
                  Failed
                </span>
              )}
              <span className="font-mono text-muted-foreground">
                {result.provider} / {result.model}
              </span>
              {result.httpStatus != null && (
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded font-mono",
                    result.httpStatus < 400
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-600"
                  )}
                >
                  HTTP {result.httpStatus}
                </span>
              )}
              <span className="ml-auto flex items-center gap-1 text-muted-foreground">
                <Timer className="size-3" />
                {result.latencyMs}ms
              </span>
            </div>

            <div className="space-y-0.5">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                reply
              </p>
              <p className="font-mono text-foreground whitespace-pre-wrap break-all bg-background/60 rounded-lg px-2 py-1.5 border text-[11px]">
                {result.reply ?? (
                  <span className="text-amber-600 italic">
                    (null -- check raw below for reasoning-only models)
                  </span>
                )}
              </p>
            </div>

            {result.error && (
              <p className="font-mono text-red-600 dark:text-red-400 whitespace-pre-wrap break-all bg-background/60 rounded-lg px-2 py-1.5 border text-[11px]">
                {result.error}
              </p>
            )}

            {(result.usage || result.finishReason) && (
              <div className="flex items-center gap-3 pt-0.5 text-[10px] text-muted-foreground flex-wrap">
                {result.usage && (
                  <span className="flex items-center gap-1">
                    <Cpu className="size-3" />
                    {result.usage.prompt_tokens ?? "?"} in /{" "}
                    {result.usage.completion_tokens ?? "?"} out
                    {result.usage.total_tokens
                      ? ` (${result.usage.total_tokens} total)`
                      : ""}
                  </span>
                )}
                {result.finishReason && (
                  <span>
                    finish: <span className="font-mono">{result.finishReason}</span>
                  </span>
                )}
              </div>
            )}

            <div className="space-y-1 pt-1">
              <button
                type="button"
                onClick={() => setShowRaw((x) => !x)}
                className="text-[10px] text-sky-600 dark:text-sky-400 hover:underline font-medium"
              >
                {showRaw ? "Hide raw response" : "Show raw response"}
              </button>
              {showRaw && (
                <pre className="text-[10px] font-mono bg-muted/60 border rounded-lg p-2 overflow-auto max-h-96 whitespace-pre-wrap break-all">
                  {JSON.stringify(result.raw, null, 2)}
                </pre>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
