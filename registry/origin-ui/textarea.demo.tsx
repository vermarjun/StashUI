"use client";

import { Textarea } from "@/registry/origin-ui/textarea";

export default function Demo() {
  return (
    <div className="w-full max-w-xs space-y-2">
      <label
        className="text-sm font-medium text-foreground"
        htmlFor="demo-textarea"
      >
        Message
      </label>
      <Textarea
        id="demo-textarea"
        placeholder="Write your message here…"
      />
    </div>
  );
}
