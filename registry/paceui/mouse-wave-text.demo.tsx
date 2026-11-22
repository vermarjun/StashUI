"use client";

import { MouseWaveText } from "./mouse-wave-text";

export default function MouseWaveTextDemo() {
    return (
        <div className="flex min-h-[460px] w-full flex-col items-center justify-center gap-10 overflow-hidden p-6">
            <MouseWaveText
                className="text-8xl font-black tracking-tight"
                shadowClassName="text-muted-foreground/25"
                textClassName="text-foreground">
                Wavelength
            </MouseWaveText>
            <p className="text-sm text-muted-foreground">Move the cursor across the page. Press to squash it.</p>
        </div>
    );
}
