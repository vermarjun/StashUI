"use client";

import AIContextMeter from "@/registry/kokonut-ui/ai-context-meter";

const MESSAGES = [
  {
    from: "user",
    text: "Can you refactor the invoice exporter so it streams rows instead of building the whole CSV in memory?",
  },
  {
    from: "assistant",
    text: "Done. exportInvoices now yields rows through a ReadableStream, and the 40k-row fixture peaks at 18 MB instead of 610 MB.",
  },
  {
    from: "user",
    text: "Nice. Add a test for the empty-month case too.",
  },
];

export default function AIContextMeterDemo() {
  return (
    <div className="flex h-[560px] w-full items-end justify-center p-6">
      <div className="flex w-full max-w-sm flex-col gap-3">
        {MESSAGES.map((message) => (
          <p
            className={
              message.from === "user"
                ? "ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-foreground px-3.5 py-2 text-background text-sm leading-relaxed"
                : "mr-auto max-w-[85%] rounded-2xl rounded-bl-md bg-muted px-3.5 py-2 text-foreground text-sm leading-relaxed"
            }
            key={message.text}
          >
            {message.text}
          </p>
        ))}
        <AIContextMeter className="mt-2" model="Atlas Pro" />
      </div>
    </div>
  );
}
