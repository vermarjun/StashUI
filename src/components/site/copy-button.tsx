"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CopyButtonProps extends React.ComponentProps<typeof Button> {
  value: string;
  label?: string;
  toastMessage?: string;
}

export function CopyButton({
  value,
  label,
  toastMessage = "Copied to clipboard",
  className,
  variant = "ghost",
  size,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(toastMessage);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy");
    }
  }

  return (
    <Button
      variant={variant}
      size={size ?? (label ? "sm" : "icon")}
      onClick={onCopy}
      className={cn(!label && "size-8", className)}
      aria-label="Copy"
      {...props}
    >
      {copied ? (
        <Check className="size-3.5 text-emerald-500" />
      ) : (
        <Copy className="size-3.5" />
      )}
      {label ? <span>{copied ? "Copied" : label}</span> : null}
    </Button>
  );
}
