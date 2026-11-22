"use client";

import { useEffect, useState } from "react";

import { DrawLineText } from "./draw-line-text";

export default function DrawLineTextDemo() {
    // Replay the handwriting every few seconds so the stroke is always in motion.
    const [run, setRun] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setRun((r) => r + 1), 8500);
        return () => clearInterval(id);
    }, []);

    return (
        <div className="flex min-h-[460px] w-full flex-col items-center justify-center gap-6 p-6">
            <DrawLineText
                key={run}
                text="Hello"
                color="var(--foreground)"
                fontSize={140}
                strokeWidth={1.2}
                oneByOne
                className="font-serif italic"
            />
            <p className="text-sm text-muted-foreground">Drawn stroke by stroke, then filled in.</p>
        </div>
    );
}
