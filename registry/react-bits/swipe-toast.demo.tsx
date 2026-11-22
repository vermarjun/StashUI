"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import SwipeToast from "@/registry/react-bits/swipe-toast";

export default function Demo() {
  const [toasts, setToasts] = useState<number[]>([1]);
  const [next, setNext] = useState(2);

  return (
    <div className="flex min-h-[460px] w-full flex-col items-center justify-end gap-4 bg-background px-6 pb-12">
      <div className="flex w-[356px] flex-col">
        {toasts.map(id => (
          <SwipeToast
            key={id}
            inline
            title="Q3-report.pdf archived"
            description="Moved to Archive. Swipe down to dismiss."
            actionLabel="Undo"
            duration={6000}
            onClose={() => setToasts(list => list.filter(t => t !== id))}
          />
        ))}
      </div>
      <Button
        variant="outline"
        onClick={() => {
          setToasts(list => [...list.slice(-2), next]);
          setNext(n => n + 1);
        }}
      >
        Archive file
      </Button>
    </div>
  );
}
