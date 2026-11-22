"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/*
 * React port of Inspira UI's RibbonBackground (Vue). Upstream renders the
 * fragment shader below through its ShaderToy wrapper with custom uniforms;
 * this port drives it with a small self-contained WebGL loop instead, so the
 * component has no helper-file dependency.
 */

export interface RibbonBackgroundProps {
  className?: string;
  /** Up to five ribbon colours (hex), back to front. */
  colors?: string[];
  backgroundColor?: string;
  transparent?: boolean;
  enableShadows?: boolean;
  /** Rotation of the ribbon field in degrees. */
  angle?: number;
  offsetX?: number;
  offsetY?: number;
  speed?: number;
}

const DEFAULT_COLORS = ["#355070", "#6d597a", "#b56576", "#e56b6f", "#eaac8b"];

function toRgb(color: string): [number, number, number] {
  const trimmed = color.trim();
  const value = trimmed.startsWith("#") ? trimmed.slice(1) : trimmed;
  const normalized =
    value.length === 3
      ? value
          .split("")
          .map((character) => character.repeat(2))
          .join("")
      : value;
  const parsed = Number.parseInt(normalized, 16);

  if (normalized.length !== 6 || Number.isNaN(parsed)) return [0, 0, 0];

  return [((parsed >> 16) & 255) / 255, ((parsed >> 8) & 255) / 255, (parsed & 255) / 255];
}

const VERTEX_SHADER = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const SHADER_CODE = `
precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform vec3 uRibbonColor0;
uniform vec3 uRibbonColor1;
uniform vec3 uRibbonColor2;
uniform vec3 uRibbonColor3;
uniform vec3 uRibbonColor4;
uniform vec3 uBackgroundColor;
uniform float uTransparent;
uniform float uEnableShadows;
uniform float uAngle;
uniform vec2 uOffset;

vec3 ribbonColor(int index) {
  if (index == 0) return uRibbonColor0;
  if (index == 1) return uRibbonColor1;
  if (index == 2) return uRibbonColor2;
  if (index == 3) return uRibbonColor3;
  return uRibbonColor4;
}

void mainImage(out vec4 outputColor, in vec2 fragmentCoordinate) {
  float aspect = iResolution.x / iResolution.y;
  vec2 center = vec2(0.5 * aspect, 0.5);
  vec2 uv = fragmentCoordinate / iResolution.xy;
  uv.x *= aspect;
  uv += vec2(-uOffset.x * aspect, uOffset.y);

  float sine = sin(uAngle);
  float cosine = cos(uAngle);
  uv = mat2(cosine, -sine, sine, cosine) * (uv - center) + center;

  float time = iTime * 0.25;
  vec3 color = uTransparent > 0.5 ? vec3(0.0) : uBackgroundColor;
  float alpha = 1.0 - uTransparent;

  for (int index = 0; index < 5; index++) {
    float ribbonIndex = float(index);
    float depth = (5.0 - ribbonIndex) / 5.0;
    float line = 0.5
      + 0.3 * sin(3.0 * time + 2.0 * uv.x + 0.3 * ribbonIndex)
      * sin(2.0 * time + uv.x);
    float width = 1.4 * (
      0.14
      + 0.12 * sin(1.5 * time + sin(0.5 * time) * 1.5 * uv.x + ribbonIndex)
      * sin(0.5 * time + 0.5 * uv.x)
    );
    float spacing = 0.3 * sin(time + 2.0 * uv.x) * depth;
    float distanceToRibbon = abs(uv.y - line + spacing) - width * depth * 0.5;

    if (distanceToRibbon > 0.0) {
      if (uEnableShadows > 0.5) {
        float shadowDrop = 20.0 / (abs(spacing) + 0.1);
        color *= vec3(mix(0.75, 1.0, 1.0 - exp(-shadowDrop * distanceToRibbon)));
      }
    } else {
      color = ribbonColor(index);
      alpha = 1.0;
    }
  }

  outputColor = vec4(color, alpha);
}

void main() {
  mainImage(gl_FragColor, gl_FragCoord.xy);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function RibbonBackground({
  className,
  colors = DEFAULT_COLORS,
  backgroundColor = "#282828",
  transparent = false,
  enableShadows = true,
  angle = 0,
  offsetX = 0,
  offsetY = 0,
  speed = 1,
}: RibbonBackgroundProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  // Latest props, read every frame so changes never restart the GL context.
  const settings = React.useRef({
    colors,
    backgroundColor,
    transparent,
    enableShadows,
    angle,
    offsetX,
    offsetY,
    speed,
  });
  React.useEffect(() => {
    settings.current = {
      colors,
      backgroundColor,
      transparent,
      enableShadows,
      angle,
      offsetX,
      offsetY,
      speed,
    };
  }, [colors, backgroundColor, transparent, enableShadows, angle, offsetX, offsetY, speed]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement("canvas");
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: true });
    if (!gl) {
      container.removeChild(canvas);
      return;
    }

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, SHADER_CODE);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) {
      container.removeChild(canvas);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      container.removeChild(canvas);
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const loc = (name: string) => gl.getUniformLocation(program, name);
    const uResolution = loc("iResolution");
    const uTime = loc("iTime");
    const uColors = [0, 1, 2, 3, 4].map((i) => loc(`uRibbonColor${i}`));
    const uBackground = loc("uBackgroundColor");
    const uTransparent = loc("uTransparent");
    const uShadows = loc("uEnableShadows");
    const uAngle = loc("uAngle");
    const uOffset = loc("uOffset");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(container.clientWidth * dpr));
      const height = Math.max(1, Math.floor(container.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    let frame = 0;
    let elapsed = 0;
    let last = performance.now();

    const render = (now: number) => {
      const s = settings.current;
      elapsed += ((now - last) / 1000) * s.speed;
      last = now;

      gl.uniform3f(uResolution, canvas.width, canvas.height, 1);
      gl.uniform1f(uTime, elapsed);
      DEFAULT_COLORS.forEach((fallback, i) => {
        gl.uniform3fv(uColors[i], toRgb(s.colors[i] ?? fallback));
      });
      gl.uniform3fv(uBackground, toRgb(s.backgroundColor));
      gl.uniform1f(uTransparent, s.transparent ? 1 : 0);
      gl.uniform1f(uShadows, s.enableShadows ? 1 : 0);
      gl.uniform1f(uAngle, (s.angle * Math.PI) / 180);
      gl.uniform2f(uOffset, s.offsetX, s.offsetY);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      if (canvas.parentNode === container) container.removeChild(canvas);
    };
  }, []);

  return <div ref={containerRef} className={cn("absolute inset-0", className)} />;
}

export default RibbonBackground;
