"use client";

import type { ComponentType } from "react";
import {
  Dotm3x3_1,
  Dotm3x3_11,
  Dotm3x3_14,
  DotmCircular1,
  DotmCircular15,
  DotmCircular3,
  DotmCircular9,
  DotmHex1,
  DotmHex4,
  DotmSquare1,
  DotmSquare13,
  DotmSquare19,
  DotmSquare2,
  DotmSquare20,
  DotmSquare7,
  DotmSquare9,
  DotmTriangle1,
  DotmTriangle6,
  DotmTriangle8,
  type DotMatrixCommonProps,
} from "./dotmatrix-loaders";

type Loader = {
  Cmp: ComponentType<DotMatrixCommonProps>;
  name: string;
  props?: DotMatrixCommonProps;
};

const LOADERS: Loader[] = [
  { Cmp: DotmSquare1, name: "Diagonal sweep" },
  { Cmp: DotmSquare2, name: "Square 02", props: { colorPreset: "grad-ocean", bloom: true } },
  { Cmp: DotmSquare7, name: "Square 07" },
  { Cmp: DotmSquare9, name: "Square 09", props: { colorPreset: "grad-sunset", bloom: true } },
  { Cmp: DotmSquare13, name: "Square 13" },
  { Cmp: DotmSquare19, name: "Square 19", props: { colorPreset: "grad-neon", bloom: true } },
  { Cmp: DotmSquare20, name: "Square 20" },
  { Cmp: DotmCircular1, name: "Circular 01", props: { colorPreset: "solid-mint" } },
  { Cmp: DotmCircular3, name: "Circular 03" },
  { Cmp: DotmCircular9, name: "Circular 09", props: { colorPreset: "grad-aurora", bloom: true } },
  { Cmp: DotmCircular15, name: "Circular 15" },
  { Cmp: DotmTriangle1, name: "Triangle 01", props: { colorPreset: "grad-fire", bloom: true } },
  { Cmp: DotmTriangle6, name: "Triangle 06" },
  { Cmp: DotmTriangle8, name: "Triangle 08", props: { colorPreset: "grad-prism" } },
  { Cmp: DotmHex1, name: "Hex 01" },
  { Cmp: DotmHex4, name: "Hex 04", props: { colorPreset: "grad-ocean", bloom: true } },
  { Cmp: Dotm3x3_1, name: "3x3 01" },
  { Cmp: Dotm3x3_11, name: "3x3 11", props: { colorPreset: "solid-mint" } },
  { Cmp: Dotm3x3_14, name: "3x3 14" },
];

export default function DotmatrixLoadersDemo() {
  return (
    <div className="flex w-full items-center justify-center p-8">
      <div className="grid w-full max-w-3xl grid-cols-4 gap-3 sm:grid-cols-5">
        {LOADERS.map(({ Cmp, name, props }) => (
          <div
            className="flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card/60 text-foreground"
            key={name}
          >
            <Cmp ariaLabel={`${name} loader`} size={44} {...props} />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {name}
            </span>
          </div>
        ))}
        <div className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border border-border border-dashed text-center">
          <span className="font-semibold text-foreground text-lg">19</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
            loaders
          </span>
        </div>
      </div>
    </div>
  );
}
