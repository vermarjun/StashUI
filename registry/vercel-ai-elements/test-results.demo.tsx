"use client";

import {
  Test,
  TestError,
  TestErrorMessage,
  TestErrorStack,
  TestResults,
  TestResultsContent,
  TestResultsDuration,
  TestResultsHeader,
  TestResultsProgress,
  TestResultsSummary,
  TestSuite,
  TestSuiteContent,
  TestSuiteName,
  TestSuiteStats,
} from "./test-results";

export default function TestResultsDemo() {
  return (
    <div className="flex w-full items-center justify-center p-6">
      <TestResults
        className="w-full max-w-2xl"
        summary={{ passed: 21, failed: 2, skipped: 1, total: 24, duration: 3842 }}
      >
        <TestResultsHeader>
          <TestResultsSummary />
          <TestResultsDuration />
        </TestResultsHeader>
        <div className="border-b px-4 py-3">
          <TestResultsProgress />
        </div>
        <TestResultsContent>
          <TestSuite name="checkout/cart.test.ts" status="failed" defaultOpen>
            <TestSuiteName>
              <span className="flex items-center gap-3">
                checkout/cart.test.ts
                <TestSuiteStats className="ml-0 font-normal" passed={6} failed={2} />
              </span>
            </TestSuiteName>
            <TestSuiteContent>
              <Test name="adds an item to an empty cart" status="passed" duration={12} />
              <Test name="merges duplicate SKUs into one line" status="passed" duration={9} />
              <Test name="applies the SPRING20 discount code" status="failed" duration={41} />
              <div className="px-4 pb-3">
                <TestError className="mt-0">
                  <TestErrorMessage>Expected total 79.20, received 99.00</TestErrorMessage>
                  <TestErrorStack>{`  at Object.<anonymous> (src/checkout/cart.test.ts:58:31)
  at applyDiscount (src/checkout/discounts.ts:22:11)`}</TestErrorStack>
                </TestError>
              </div>
              <Test name="recalculates tax when the region changes" status="running" />
              <Test name="keeps the cart after sign-in" status="skipped" />
            </TestSuiteContent>
          </TestSuite>
          <TestSuite name="auth/session.test.ts" status="passed">
            <TestSuiteName>
              <span className="flex items-center gap-3">
                auth/session.test.ts
                <TestSuiteStats className="ml-0 font-normal" passed={9} />
              </span>
            </TestSuiteName>
            <TestSuiteContent>
              <Test name="issues a session cookie on sign-in" status="passed" duration={18} />
              <Test name="rotates the refresh token" status="passed" duration={24} />
            </TestSuiteContent>
          </TestSuite>
          <TestSuite name="search/query-parser.test.ts" status="passed">
            <TestSuiteName>
              <span className="flex items-center gap-3">
                search/query-parser.test.ts
                <TestSuiteStats className="ml-0 font-normal" passed={6} skipped={1} />
              </span>
            </TestSuiteName>
            <TestSuiteContent>
              <Test name="parses quoted phrases" status="passed" duration={4} />
              <Test name="supports field:value filters" status="passed" duration={6} />
            </TestSuiteContent>
          </TestSuite>
        </TestResultsContent>
      </TestResults>
    </div>
  );
}
