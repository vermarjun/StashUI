"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { InspiraShaderToy, type MouseMode } from "@/registry/inspira-react/inspira-shader-toy";

interface NoiseConfig {
  opacity: number;
  scale: number;
}

export interface ShaderToyProps {
  shaderCode: string;
  className?: string;
  mouseMode?: MouseMode;
  hue?: number;
  saturation?: number;
  brightness?: number;
  speed?: number;
  mouseSensitivity?: number;
  damping?: number;
  noise?: NoiseConfig;
}

export const ShaderToy = React.forwardRef<HTMLDivElement, ShaderToyProps>(
  (
    {
      shaderCode,
      className,
      mouseMode = "click",
      hue = 0,
      saturation = 1,
      brightness = 1,
      speed = 1,
      mouseSensitivity = 1,
      damping = 0,
      noise,
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const shaderRef = React.useRef<InspiraShaderToy | null>(null);

    React.useImperativeHandle(ref, () => containerRef.current!);

    React.useEffect(() => {
      if (!containerRef.current) return;

      let toy: InspiraShaderToy | null = null;
      try {
        toy = new InspiraShaderToy(containerRef.current, mouseMode);
        const success = toy.setShader({ source: shaderCode });
        if (!success) {
          console.error("Failed to compile shader");
          return;
        }
        toy.setHSV({ hue, saturation, brightness });
        toy.setSpeed(speed);
        toy.setMouseSensitivity(mouseSensitivity);
        toy.setMouseDamping(damping);
        toy.play();
        shaderRef.current = toy;
      } catch (err) {
        console.error("ShaderToy init error:", err);
      }

      return () => {
        toy?.dispose();
        shaderRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shaderCode, mouseMode]);

    React.useEffect(() => {
      shaderRef.current?.setHue(hue);
    }, [hue]);

    React.useEffect(() => {
      shaderRef.current?.setSaturation(saturation);
    }, [saturation]);

    React.useEffect(() => {
      shaderRef.current?.setBrightness(brightness);
    }, [brightness]);

    React.useEffect(() => {
      shaderRef.current?.setSpeed(speed);
    }, [speed]);

    React.useEffect(() => {
      shaderRef.current?.setMouseSensitivity(mouseSensitivity);
    }, [mouseSensitivity]);

    React.useEffect(() => {
      shaderRef.current?.setMouseDamping(damping);
    }, [damping]);

    const backgroundSize = noise ? `${noise.scale * 200}%` : undefined;

    return (
      <div
        ref={containerRef}
        className={cn(
          "shadertoy-container isolate relative block h-full w-full [&_canvas]:block [&_canvas]:max-w-full [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:cursor-pointer",
          className,
        )}
      >
        {noise && noise.opacity > 0 && (
          <div
            className="absolute inset-0 z-10 bg-[url(https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png)] bg-repeat"
            style={{
              backgroundSize,
              backgroundPosition: "center",
              opacity: noise.opacity / 2,
            }}
          />
        )}
      </div>
    );
  },
);

ShaderToy.displayName = "ShaderToy";
