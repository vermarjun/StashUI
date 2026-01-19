"use client";

import * as React from "react";
import { TriangleAlert } from "lucide-react";

interface Props {
  children: React.ReactNode;
  /** Component name — reported to window.__broken for the audit script. */
  name?: string;
}

interface State {
  hasError: boolean;
}

declare global {
  interface Window {
    __broken?: { name: string; message: string }[];
  }
}

/**
 * Isolates a single component preview. With thousands of imported components,
 * some demos will throw (missing props, browser-only APIs) — this keeps one bad
 * preview from taking down the whole gallery page, and records the failure so
 * an audit can drop demos that can't render.
 */
export class PreviewErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (typeof window !== "undefined" && this.props.name) {
      (window.__broken ??= []).push({
        name: this.props.name,
        message: String(
          (error as Error)?.message ?? error ?? "",
        ).slice(0, 200),
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center gap-1.5 text-center text-muted-foreground">
          <TriangleAlert className="size-4" />
          <span className="text-xs">Preview unavailable</span>
        </div>
      );
    }
    return this.props.children;
  }
}
