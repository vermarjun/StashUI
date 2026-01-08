"use client"

import {
  AnimatedModal,
  AnimatedModalBody,
  AnimatedModalContent,
  AnimatedModalFooter,
  AnimatedModalTrigger,
} from "@/registry/inspira-react/animated-modal"

export default function AnimatedModalDemo() {
  return (
    <div className="flex min-h-[300px] items-center justify-center p-8">
      <AnimatedModal>
        <AnimatedModalTrigger className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-700">
          Open Modal
        </AnimatedModalTrigger>

        <AnimatedModalBody>
          <AnimatedModalContent>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome to Animated Modal
            </h2>
            <p className="mt-4 text-gray-600 dark:text-neutral-400">
              This modal animates in with a spring-based 3D flip effect. It supports
              click-outside to close, ESC key to close, and scroll locking.
            </p>
            <p className="mt-2 text-gray-600 dark:text-neutral-400">
              The content area is scrollable when content overflows the max height.
            </p>
          </AnimatedModalContent>

          <AnimatedModalFooter>
            <button
              type="button"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Confirm
            </button>
          </AnimatedModalFooter>
        </AnimatedModalBody>
      </AnimatedModal>
    </div>
  )
}
