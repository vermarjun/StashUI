"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface LoaderStep {
  text: string;
  afterText?: string;
  async?: boolean;
  duration?: number;
  action?: () => void;
}

interface MultiStepLoaderProps {
  steps: LoaderStep[];
  loading?: boolean;
  defaultDuration?: number;
  preventClose?: boolean;
  onStateChange?: (index: number) => void;
  onComplete?: () => void;
  onClose?: () => void;
}

export function MultiStepLoader({
  steps,
  loading = false,
  defaultDuration = 1500,
  preventClose = false,
  onStateChange,
  onComplete,
  onClose,
}: MultiStepLoaderProps) {
  const [currentState, setCurrentState] = useState(0);
  const [isLastStepComplete, setIsLastStepComplete] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function clearTimer() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  async function proceedToNextStep(stateIndex: number) {
    const currentStep = steps[stateIndex];
    if (!currentStep) return;

    if (typeof currentStep.action === "function") {
      await currentStep.action();
    }

    if (stateIndex < steps.length - 1) {
      const next = stateIndex + 1;
      setCurrentState(next);
      onStateChange?.(next);
      processStep(next);
    } else {
      setIsLastStepComplete(true);
      onComplete?.();
    }
  }

  function processStep(stateIndex: number) {
    clearTimer();
    const step = steps[stateIndex];
    if (!step) return;
    const duration = step.duration ?? defaultDuration;
    if (!step.async) {
      timerRef.current = setTimeout(() => {
        proceedToNextStep(stateIndex);
      }, duration);
    }
  }

  // Watch async -> false transition
  useEffect(() => {
    const step = steps[currentState];
    if (!step || step.async) return;
    // If async just turned false for the current step, schedule
    const duration = step.duration ?? defaultDuration;
    timerRef.current = setTimeout(() => {
      proceedToNextStep(currentState);
    }, duration);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps[currentState]?.async]);

  useEffect(() => {
    if (loading) {
      setCurrentState(0);
      setIsLastStepComplete(false);
      processStep(0);
    } else {
      clearTimer();
    }
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && steps.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex size-full items-center justify-center backdrop-blur-2xl"
        >
          {/* Close button */}
          {!preventClose && (
            <button
              onClick={onClose}
              className={cn(
                "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring",
                "absolute top-4 right-4 z-[101] inline-flex h-9 items-center justify-center",
                "rounded-md px-3 text-sm font-medium whitespace-nowrap transition-colors",
                "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
                "disabled:pointer-events-none disabled:opacity-50",
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          <div className="relative h-96">
            <div className="relative mx-auto mt-40 flex max-w-xl flex-col justify-start">
              {steps.map((step, index) => (
                <div key={index}>
                  <div
                    className="mb-4 flex items-center gap-2 text-left transition-all duration-300 ease-in-out"
                    style={{
                      opacity:
                        index === currentState
                          ? 1
                          : Math.max(1 - Math.abs(index - currentState) * 0.2, 0),
                      transform: `translateY(${-(currentState * 40)}px)`,
                    }}
                  >
                    {/* Completed icon */}
                    {(index < currentState ||
                      (index === steps.length - 1 &&
                        index === currentState &&
                        isLastStepComplete)) && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-primary size-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}

                    {/* Loading spinner */}
                    {index === currentState &&
                      (!isLastStepComplete || index !== steps.length - 1) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="text-primary size-6 animate-spin"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.755 10.059a7.5 7.5 0 0 1 12.548-3.364l1.903 1.903h-3.183a.75.75 0 1 0 0 1.5h4.992a.75.75 0 0 0 .75-.75V4.356a.75.75 0 0 0-1.5 0v3.18l-1.9-1.9A9 9 0 0 0 3.306 9.67a.75.75 0 1 0 1.45.388Zm15.408 3.352a.75.75 0 0 0-.919.53 7.5 7.5 0 0 1-12.548 3.364l-1.902-1.903h3.183a.75.75 0 0 0 0-1.5H2.984a.75.75 0 0 0-.75.75v4.992a.75.75 0 0 0 1.5 0v-3.18l1.9 1.9a9 9 0 0 0 15.059-4.035.75.75 0 0 0-.53-.918Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}

                    {/* Pending icon */}
                    {index > currentState && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6 text-black opacity-50 dark:text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    )}

                    <div className="flex flex-col">
                      <span
                        className={cn(
                          "text-lg text-black dark:text-white",
                          index > currentState && "opacity-50",
                        )}
                      >
                        {step.text}
                      </span>

                      <AnimatePresence>
                        {step.afterText &&
                          (index < currentState ||
                            (index === steps.length - 1 &&
                              index === currentState &&
                              isLastStepComplete)) && (
                            <motion.span
                              key="afterText"
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                            >
                              {step.afterText}
                            </motion.span>
                          )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 -z-10 h-full bg-white bg-gradient-to-t dark:bg-black" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
