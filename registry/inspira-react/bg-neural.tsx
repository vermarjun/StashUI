"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Camera, Mesh, Plane, Program, Renderer, Transform } from "ogl";

export interface BgNeuralProps {
  hue?: number;
  saturation?: number;
  chroma?: number;
  className?: string;
}

const vertexShader = `
  precision mediump float;
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec2 vUv;
  uniform float u_time;
  uniform float u_ratio;
  uniform vec2 u_pointer_position;
  uniform float u_scroll_progress;
  uniform float u_hue;
  uniform float u_saturation;
  uniform float u_chroma;

  vec2 rotate(vec2 uv, float th) {
      return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
  }

  float neuro_shape(vec2 uv, float t, float p) {
      vec2 sine_acc = vec2(0.);
      vec2 res = vec2(0.);
      float scale = 8.;
      for (int j = 0; j < 15; j++) {
          uv = rotate(uv, 1.);
          sine_acc = rotate(sine_acc, 1.);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc += sin(layer) + 2.4 * p;
          res += (.5 + .5 * cos(layer)) / scale;
          scale *= (1.2);
      }
      return res.x + res.y;
  }

  vec3 hsl2rgb(vec3 c) {
      vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0);
      return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
  }

  void main() {
      vec2 uv = .5 * vUv;
      uv.x *= u_ratio;

      vec2 pointer = vUv - u_pointer_position;
      pointer.x *= u_ratio;
      float p = clamp(length(pointer), 0., 1.);
      p = .5 * pow(1. - p, 2.);

      float t = .001 * u_time;
      vec3 color = vec3(0.);

      float noise = neuro_shape(uv, t, p);
      noise = 1.2 * pow(noise, 3.);
      noise += pow(noise, 10.);
      noise = max(.0, noise - .5);
      noise *= (1. - length(vUv - .5));

      float normalizedHue = u_hue / 360.0;
      vec3 hsl = vec3(
          normalizedHue + 0.1 * sin(3.0 * u_scroll_progress + 1.5),
          u_saturation,
          u_chroma * 0.5 + 0.2 * sin(2.0 * u_scroll_progress)
      );
      color = hsl2rgb(hsl);
      color = color * noise;

      gl_FragColor = vec4(color, noise);
  }
`;

export function BgNeural({
  hue = 200,
  saturation = 0.8,
  chroma = 0.6,
  className,
}: BgNeuralProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const animationRef = React.useRef<number | null>(null);
  const rendererRef = React.useRef<Renderer | null>(null);
  const sceneRef = React.useRef<Transform | null>(null);
  const meshRef = React.useRef<Mesh | null>(null);
  const cameraRef = React.useRef<Camera | null>(null);
  const pointerRef = React.useRef({ x: 0, y: 0, tX: 0, tY: 0 });

  // Keep a ref to current prop values so the render loop reads up-to-date values
  const propsRef = React.useRef({ hue, saturation, chroma });
  React.useEffect(() => {
    propsRef.current = { hue, saturation, chroma };
    const mesh = meshRef.current;
    if (mesh?.program?.uniforms) {
      const u = mesh.program.uniforms;
      if (u.u_hue) u.u_hue.value = hue;
      if (u.u_saturation) u.u_saturation.value = saturation;
      if (u.u_chroma) u.u_chroma.value = chroma;
    }
  }, [hue, saturation, chroma]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        canvas,
        width: canvas.clientWidth,
        height: canvas.clientHeight,
        dpr: Math.min(window.devicePixelRatio, 2),
      });
    } catch (e) {
      console.error("OGL Renderer init error:", e);
      return;
    }

    const camera = new Camera(renderer.gl);
    const scene = new Transform();
    const geometry = new Plane(renderer.gl, { width: 2, height: 2 });
    const program = new Program(renderer.gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        u_time: { value: 0 },
        u_ratio: { value: window.innerWidth / window.innerHeight },
        u_pointer_position: { value: [0, 0] },
        u_scroll_progress: { value: 0 },
        u_hue: { value: propsRef.current.hue },
        u_saturation: { value: propsRef.current.saturation },
        u_chroma: { value: propsRef.current.chroma },
      },
    });
    const mesh = new Mesh(renderer.gl, { geometry, program });
    mesh.setParent(scene);

    rendererRef.current = renderer;
    cameraRef.current = camera;
    sceneRef.current = scene;
    meshRef.current = mesh;

    function resizeCanvas() {
      if (!canvas || !renderer || !mesh) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h);
      if (mesh.program?.uniforms?.u_ratio) {
        mesh.program.uniforms.u_ratio.value = w / h;
      }
    }

    function render() {
      const pointer = pointerRef.current;
      pointer.x += (pointer.tX - pointer.x) * 0.2;
      pointer.y += (pointer.tY - pointer.y) * 0.2;

      if (mesh.program?.uniforms) {
        const u = mesh.program.uniforms;
        if (u.u_time) u.u_time.value = performance.now();
        if (u.u_pointer_position) {
          u.u_pointer_position.value = [
            pointer.x / window.innerWidth,
            1 - pointer.y / window.innerHeight,
          ];
        }
        if (u.u_scroll_progress) {
          u.u_scroll_progress.value = window.scrollY / (2 * window.innerHeight);
        }
      }

      renderer.render({ scene, camera });
      animationRef.current = requestAnimationFrame(render);
    }

    function updateMouse(x: number, y: number) {
      pointerRef.current.tX = x;
      pointerRef.current.tY = y;
    }

    const onPointerMove = (e: PointerEvent) => updateMouse(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => updateMouse(e.touches[0].clientX, e.touches[0].clientY);
    const onClick = (e: MouseEvent) => updateMouse(e.clientX, e.clientY);

    resizeCanvas();
    render();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("click", onClick);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("click", onClick);
      rendererRef.current = null;
      meshRef.current = null;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 size-full opacity-95", className)}
    />
  );
}
