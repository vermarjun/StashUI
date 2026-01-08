"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ShaderToy } from "@/registry/inspira-react/shader-toy";

const SINGULARITY_SHADER = `
// "Singularity" by @XorDev
// ShaderToy: https://www.shadertoy.com/view/3csSWB

void mainImage(out vec4 O, vec2 F)
{
  float i = .2, a;
  vec2 r = iResolution.xy,
    p = (F + F - r) / r.y / .7,
    d = vec2(-1, 1),
    b = p - i * d,
    c = p * mat2(1, 1, d / (.1 + i / dot(b, b))),
    v = c * mat2(cos(.5 * log(a = dot(c, c)) + iTime * iSpeed * i + vec4(0, 33, 11, 0))) / i,
    w;

  for (; i++ < 9.; w += 1. + sin(v))
    v += .7 * sin(v.yx * i + iTime * iSpeed) / i + .5;
  i = length(sin(v / .3) * .4 + c * (3. + d));
  O = 1. - exp(-exp(c.x * vec4(.6, -.4, -1, 0))
    / w.xyyx
    / (2. + i * i / 4. - i)
    / (.5 + 1. / a)
    / (.03 + abs(length(p) - .7))
  );
}
`;

export interface BgSingularityProps {
  className?: string;
  hue?: number;
  saturation?: number;
  brightness?: number;
  speed?: number;
  mouseSensitivity?: number;
  damping?: number;
  noise?: { opacity: number; scale: number };
}

export function BgSingularity({
  className,
  hue = 0,
  saturation = 1,
  brightness = 1,
  speed = 1,
  mouseSensitivity = 0.5,
  damping = 1,
  noise,
}: BgSingularityProps) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <ShaderToy
        shaderCode={SINGULARITY_SHADER}
        hue={hue}
        saturation={saturation}
        brightness={brightness}
        speed={speed}
        mouseSensitivity={mouseSensitivity}
        damping={damping}
        noise={noise}
      />
    </div>
  );
}
