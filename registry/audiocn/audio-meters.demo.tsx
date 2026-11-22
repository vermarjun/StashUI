"use client";

import { type CSSProperties, useEffect, useMemo } from "react";
import {
  LevelMeter,
  LevelMeterBar,
  LevelMeterChannel,
  LevelMeterChannels,
  LevelMeterClip,
  LevelMeterHold,
  LevelMeterScale,
  LevelMeterTrack,
  LevelMeterValue,
} from "./audio-meters";
import { createFrameEmitter } from "./audio-meters-frame-source";
import type { MeterFrame } from "./audio-meters-types";

// The meter colours audiocn ships as theme cssVars (dark values), set here so
// the gallery renders without them in globals.css.
const METER_VARS = {
  "--meter-clip": "var(--destructive)",
  "--meter-clip-foreground": "var(--destructive)",
  "--meter-ok": "oklch(0.765 0.177 163.223)",
  "--meter-warn": "oklch(0.852 0.199 91.936)",
} as CSSProperties;

const STRIPS = [
  { base: -14, beat: 2, name: "Kick", swing: 16 },
  { base: -18, beat: 1, name: "Snare", swing: 14 },
  { base: -16, beat: 0.5, name: "Bass", swing: 6 },
  { base: -24, beat: 0.25, name: "Keys", swing: 8 },
  { base: -12, beat: 0.33, name: "Vocal", swing: 10 },
  { base: -28, beat: 0.2, name: "FX", swing: 12 },
];

const BPM = 112;

// Synthetic programme material: a pulse on the beat plus slow movement and a
// little noise, in dBFS. Enough to exercise attack, release and peak hold.
const levelAt = (t: number, base: number, swing: number, beat: number) => {
  const beatPhase = (t * (BPM / 60) * beat) % 1;
  const pulse = Math.exp(-beatPhase * 7) * swing;
  const drift = Math.sin(t * 0.7 + base) * 3;
  const noise = (Math.random() - 0.5) * 2.5;
  return Math.min(0, base + pulse + drift + noise - swing * 0.35);
};

export default function AudioMetersDemo() {
  const master = useMemo(() => createFrameEmitter<MeterFrame>(), []);
  const strips = useMemo(
    () => STRIPS.map(() => createFrameEmitter<MeterFrame>()),
    []
  );

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      let loudest = -60;
      STRIPS.forEach((strip, i) => {
        const peakDb = levelAt(t, strip.base, strip.swing, strip.beat);
        loudest = Math.max(loudest, peakDb);
        strips[i].emit({ channels: [{ peakDb, rmsDb: peakDb - 6 }] });
      });
      // Every third bar the mix pushes into the red so the clip light fires.
      const bar = Math.floor((t * BPM) / 60 / 4) % 3;
      const push = bar === 2 ? 9 : 0;
      const left = Math.min(0, loudest - 2 + push + Math.sin(t * 3) * 1.5);
      const right = Math.min(0, loudest - 3 + push + Math.cos(t * 2.6) * 1.5);
      master.emit({
        channels: [
          { peakDb: left, rmsDb: left - 7 },
          { peakDb: right, rmsDb: right - 7 },
        ],
      });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [master, strips]);

  return (
    <div className="flex w-full items-center justify-center p-8" style={METER_VARS}>
      <div className="flex w-full max-w-2xl flex-col gap-6 rounded-2xl border border-border bg-card p-6">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-medium text-foreground text-sm">Master bus</span>
            <span className="text-muted-foreground text-xs">Stereo · {BPM} BPM</span>
          </div>
          <LevelMeter
            channelCount={2}
            segments={48}
            size="lg"
            source={master}
            variant="segmented"
          >
            <LevelMeterChannels>
              {[0, 1].map((index) => (
                <LevelMeterChannel index={index} key={index}>
                  <LevelMeterTrack>
                    <LevelMeterBar />
                    <LevelMeterHold />
                  </LevelMeterTrack>
                </LevelMeterChannel>
              ))}
              <LevelMeterScale />
            </LevelMeterChannels>
            <LevelMeterValue className="w-16 text-right text-muted-foreground text-xs tabular-nums" />
            <LevelMeterClip showCount />
          </LevelMeter>
        </div>

        <div className="grid grid-cols-6 gap-3 border-border border-t pt-5">
          {STRIPS.map((strip, i) => (
            <div className="flex flex-col items-center gap-2" key={strip.name}>
              <LevelMeter
                className="h-44"
                orientation="vertical"
                source={strips[i]}
                variant="gradient"
              />
              <span className="text-foreground text-xs">{strip.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
