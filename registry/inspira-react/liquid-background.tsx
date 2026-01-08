"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

// OGL-based liquid background using WebGL
// Dynamically imports ogl to avoid SSR issues

interface LiquidBackgroundProps {
  className?: string
}

const vert = `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0, 1);
  }
`

const frag = `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uResolution;
  varying vec2 vUv;
  void main() {
    float mr = min(uResolution.x, uResolution.y);
    vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;
    float d = -uTime * 1.2;
    float a = 0.0;
    for (float i = 0.0; i < 8.0; ++i) {
      a += cos(i - d - a * uv.x);
      d += sin(uv.y * i + a);
    }
    d += uTime * 1.0;
    vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
    col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);
    gl_FragColor = vec4(col, 1.0);
  }
`

export function LiquidBackground({ className }: LiquidBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let animateId: number
    let cleanup: (() => void) | undefined

    async function init() {
      const { Renderer, Triangle, Program, Mesh, Color } = await import("ogl")

      const renderer = new Renderer()
      const gl = renderer.gl
      gl.clearColor(1, 1, 1, 1)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let mesh: any

      function resize() {
        const scale = 1
        renderer.setSize(container.offsetWidth * scale, container.offsetHeight * scale)
        if (mesh) {
          mesh.program.uniforms.uResolution.value = [
            gl.canvas.width,
            gl.canvas.height,
            gl.canvas.width / gl.canvas.height,
          ]
        }
      }

      window.addEventListener("resize", resize, false)
      resize()

      const geometry = new Triangle(gl)
      const program = new Program(gl, {
        vertex: vert,
        fragment: frag,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: new Color(0.3, 0.2, 0.5) },
          uResolution: {
            value: [gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height],
          },
        },
      })

      mesh = new Mesh(gl, { geometry, program })

      function update(t: number) {
        animateId = requestAnimationFrame(update)
        if (mesh) {
          mesh.program.uniforms.uTime.value = t * 0.001
          renderer.render({ scene: mesh })
        }
      }

      animateId = requestAnimationFrame(update)
      container.appendChild(gl.canvas)

      cleanup = () => {
        cancelAnimationFrame(animateId)
        window.removeEventListener("resize", resize)
        if (container.contains(gl.canvas)) {
          container.removeChild(gl.canvas)
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(gl as any).getExtension?.("WEBGL_lose_context")?.loseContext()
      }
    }

    init()

    return () => {
      cleanup?.()
    }
  }, [])

  return <div ref={containerRef} className={cn("block size-full", className)} />
}
