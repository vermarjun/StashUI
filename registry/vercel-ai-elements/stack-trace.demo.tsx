"use client";

import {
  StackTrace,
  StackTraceActions,
  StackTraceContent,
  StackTraceCopyButton,
  StackTraceError,
  StackTraceErrorMessage,
  StackTraceErrorType,
  StackTraceExpandButton,
  StackTraceFrames,
  StackTraceHeader,
} from "./stack-trace";

const trace = `TypeError: Cannot read properties of undefined (reading 'lineItems')
    at calculateTotals (/app/src/lib/cart/totals.ts:48:27)
    at CheckoutSummary (/app/src/components/checkout/summary.tsx:112:19)
    at renderWithHooks (/app/node_modules/react-dom/cjs/react-dom.development.js:16305:18)
    at mountIndeterminateComponent (/app/node_modules/react-dom/cjs/react-dom.development.js:20069:13)
    at handleCheckout (/app/src/app/checkout/actions.ts:31:9)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async POST (/app/src/app/api/orders/route.ts:22:5)`;

export default function StackTraceDemo() {
  return (
    <div className="flex w-full items-center justify-center p-6">
      <StackTrace className="w-full max-w-2xl" defaultOpen trace={trace}>
        <StackTraceHeader>
          <StackTraceError>
            <StackTraceErrorType />
            <StackTraceErrorMessage />
          </StackTraceError>
          <StackTraceActions>
            <StackTraceCopyButton />
            <StackTraceExpandButton />
          </StackTraceActions>
        </StackTraceHeader>
        <StackTraceContent>
          <StackTraceFrames />
        </StackTraceContent>
      </StackTrace>
    </div>
  );
}
