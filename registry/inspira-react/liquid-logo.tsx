"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { parseLogoImage } from "@/registry/inspira-react/liquid-logo-parse"
import { liquidFragSource, vertexShaderSource } from "@/registry/inspira-react/liquid-logo-shader"

interface LiquidLogoProps {
  className?: string
  imageUrl: string
  patternScale?: number
  refraction?: number
  edge?: number
  patternBlur?: number
  liquid?: number
  speed?: number
  showProcessing?: boolean
}

export function LiquidLogo({
  className,
  imageUrl,
  patternScale = 2,
  refraction = 0.015,
  edge = 0.4,
  patternBlur = 0.005,
  liquid = 0.07,
  speed = 0.3,
  showProcessing = true,
}: LiquidLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const glRef = useRef<WebGL2RenderingContext | null>(null)
  const uniformsRef = useRef<Record<string, WebGLUniformLocation>>({})
  const imageDataRef = useRef<ImageData | null>(null)
  const totalAnimationTimeRef = useRef(0)
  const lastRenderTimeRef = useRef(0)
  const renderIdRef = useRef(0)
  const cleanUpTextureRef = useRef<(() => void) | undefined>()
  const [processing, setProcessing] = useState(false)

  const updateUniforms = useCallback(() => {
    const gl = glRef.current
    const uniforms = uniformsRef.current
    if (!gl || !uniforms) return
    gl.uniform1f(uniforms.u_edge, edge)
    gl.uniform1f(uniforms.u_patternBlur, patternBlur)
    gl.uniform1f(uniforms.u_time, 0)
    gl.uniform1f(uniforms.u_patternScale, patternScale)
    gl.uniform1f(uniforms.u_refraction, refraction)
    gl.uniform1f(uniforms.u_liquid, liquid)
  }, [edge, patternBlur, patternScale, refraction, liquid])

  function initShader() {
    const canvas = canvasRef.current
    const gl = canvas?.getContext("webgl2", { antialias: true, alpha: true })
    if (!canvas || !gl) return

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    function createShader(gl: WebGL2RenderingContext, sourceCode: string, type: number) {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, sourceCode)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = createShader(gl, liquidFragSource, gl.FRAGMENT_SHADER)
    const program = gl.createProgram()
    if (!program || !vertexShader || !fragmentShader) return

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return

    const uniforms: Record<string, WebGLUniformLocation> = {}
    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
    for (let i = 0; i < uniformCount; i++) {
      const uniformName = gl.getActiveUniform(program, i)?.name
      if (!uniformName) continue
      uniforms[uniformName] = gl.getUniformLocation(program, uniformName) as WebGLUniformLocation
    }
    uniformsRef.current = uniforms

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    gl.useProgram(program)
    const positionLocation = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(positionLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    glRef.current = gl
  }

  function resizeCanvas() {
    const canvasEl = canvasRef.current
    const gl = glRef.current
    const uniforms = uniformsRef.current
    if (!canvasEl || !gl || !uniforms) return

    const imgRatio = imageDataRef.current
      ? imageDataRef.current.width / imageDataRef.current.height
      : 1

    const side = 1000
    canvasEl.width = side * devicePixelRatio
    canvasEl.height = side * devicePixelRatio
    gl.viewport(0, 0, canvasEl.height, canvasEl.height)
    gl.uniform1f(uniforms.u_ratio, 1)
    gl.uniform1f(uniforms.u_img_ratio, imgRatio)
  }

  async function setupTexture() {
    const gl = glRef.current
    const uniforms = uniformsRef.current
    if (!gl || !uniforms || !imageDataRef.current) return

    const existingTexture = gl.getParameter(gl.TEXTURE_BINDING_2D)
    if (existingTexture) gl.deleteTexture(existingTexture)

    const imageTexture = gl.createTexture()
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, imageTexture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)

    try {
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        imageDataRef.current.width,
        imageDataRef.current.height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        imageDataRef.current.data,
      )
      gl.uniform1i(uniforms.u_image_texture, 0)
    } catch {
      // ignore texture error
    }

    cleanUpTextureRef.current = () => {
      if (imageTexture) gl.deleteTexture(imageTexture)
    }
  }

  function render(currentTime: number) {
    const deltaTime = currentTime - lastRenderTimeRef.current
    lastRenderTimeRef.current = currentTime
    totalAnimationTimeRef.current += deltaTime * speed
    const gl = glRef.current
    const uniforms = uniformsRef.current
    if (gl && uniforms.u_time) {
      gl.uniform1f(uniforms.u_time, totalAnimationTimeRef.current)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    renderIdRef.current = requestAnimationFrame(render)
  }

  useEffect(() => {
    let active = true

    async function init() {
      setProcessing(true)
      try {
        const { imageData } = await parseLogoImage(imageUrl)
        if (!active) return
        imageDataRef.current = imageData
      } catch {
        // ignore
      }

      initShader()
      updateUniforms()
      await setupTexture()

      if (active) {
        setProcessing(false)
        window.addEventListener("resize", resizeCanvas)
        resizeCanvas()
        lastRenderTimeRef.current = performance.now()
        renderIdRef.current = requestAnimationFrame(render)
      }
    }

    init()

    return () => {
      active = false
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(renderIdRef.current)
      cleanUpTextureRef.current?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl])

  useEffect(() => {
    updateUniforms()
  }, [updateUniforms])

  return (
    <>
      {processing && showProcessing && (
        <div className="text-primary/50 flex size-full items-center justify-center text-2xl font-bold">
          <span>Processing Logo</span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={cn("block size-full object-contain", className, processing ? "hidden" : "")}
      />
    </>
  )
}
