"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

interface FluidCursorProps {
  simResolution?: number;
  dyeResolution?: number;
  captureResolution?: number;
  densityDissipation?: number;
  velocityDissipation?: number;
  pressure?: number;
  pressureIterations?: number;
  curl?: number;
  splatRadius?: number;
  splatForce?: number;
  shading?: boolean;
  colorUpdateSpeed?: number;
  backColor?: ColorRGB;
  transparent?: boolean;
  className?: string;
}

interface Pointer {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: ColorRGB;
}

function pointerPrototype(): Pointer {
  return {
    id: -1,
    texcoordX: 0,
    texcoordY: 0,
    prevTexcoordX: 0,
    prevTexcoordY: 0,
    deltaX: 0,
    deltaY: 0,
    down: false,
    moved: false,
    color: { r: 0, g: 0, b: 0 },
  };
}

export function FluidCursor({
  simResolution = 128,
  dyeResolution = 1440,
  captureResolution = 512,
  densityDissipation = 3.5,
  velocityDissipation = 2,
  pressure = 0.1,
  pressureIterations = 20,
  curl = 3,
  splatRadius = 0.2,
  splatForce = 6000,
  shading = true,
  colorUpdateSpeed = 10,
  backColor = { r: 0.5, g: 0, b: 0 },
  transparent = true,
  className,
}: FluidCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pointers: Pointer[] = [pointerPrototype()];
    const config = {
      SIM_RESOLUTION: simResolution,
      DYE_RESOLUTION: dyeResolution,
      CAPTURE_RESOLUTION: captureResolution,
      DENSITY_DISSIPATION: densityDissipation,
      VELOCITY_DISSIPATION: velocityDissipation,
      PRESSURE: pressure,
      PRESSURE_ITERATIONS: pressureIterations,
      CURL: curl,
      SPLAT_RADIUS: splatRadius,
      SPLAT_FORCE: splatForce,
      SHADING: shading,
      COLOR_UPDATE_SPEED: colorUpdateSpeed,
      PAUSED: false,
      BACK_COLOR: backColor,
      TRANSPARENT: transparent,
    };

    function getWebGLContext(canvas: HTMLCanvasElement) {
      const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
      let gl = canvas.getContext("webgl2", params) as WebGL2RenderingContext | null;
      if (!gl) {
        gl = (canvas.getContext("webgl", params) || canvas.getContext("experimental-webgl", params)) as WebGL2RenderingContext | null;
      }
      if (!gl) throw new Error("Unable to initialize WebGL.");
      const isWebGL2 = "drawBuffers" in gl;
      let supportLinearFiltering = false;
      let halfFloat = null;
      if (isWebGL2) {
        (gl as WebGL2RenderingContext).getExtension("EXT_color_buffer_float");
        supportLinearFiltering = !!(gl as WebGL2RenderingContext).getExtension("OES_texture_float_linear");
      } else {
        halfFloat = gl.getExtension("OES_texture_half_float");
        supportLinearFiltering = !!gl.getExtension("OES_texture_half_float_linear");
      }
      gl.clearColor(0, 0, 0, 1);
      const halfFloatTexType = isWebGL2
        ? (gl as WebGL2RenderingContext).HALF_FLOAT
        : (halfFloat && halfFloat.HALF_FLOAT_OES) || 0;

      function getSupportedFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type: number): { internalFormat: number; format: number } | null {
        if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
          if ("drawBuffers" in gl) {
            const gl2 = gl as WebGL2RenderingContext;
            switch (internalFormat) {
              case gl2.R16F: return getSupportedFormat(gl2, gl2.RG16F, gl2.RG, type);
              case gl2.RG16F: return getSupportedFormat(gl2, gl2.RGBA16F, gl2.RGBA, type);
              default: return null;
            }
          }
          return null;
        }
        return { internalFormat, format };
      }

      function supportRenderTextureFormat(gl: WebGLRenderingContext | WebGL2RenderingContext, internalFormat: number, format: number, type: number) {
        const texture = gl.createTexture();
        if (!texture) return false;
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
        const fbo = gl.createFramebuffer();
        if (!fbo) return false;
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        return gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
      }

      let formatRGBA: { internalFormat: number; format: number } | null;
      let formatRG: { internalFormat: number; format: number } | null;
      let formatR: { internalFormat: number; format: number } | null;
      if (isWebGL2) {
        const gl2 = gl as WebGL2RenderingContext;
        formatRGBA = getSupportedFormat(gl2, gl2.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl2, gl2.RG16F, gl2.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl2, gl2.R16F, gl2.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
      }

      return { gl, ext: { formatRGBA, formatRG, formatR, halfFloatTexType, supportLinearFiltering } };
    }

    const { gl, ext } = getWebGLContext(canvas);
    if (!gl || !ext) return;

    if (!ext.supportLinearFiltering) {
      config.DYE_RESOLUTION = 256;
      config.SHADING = false;
    }

    function hashCode(s: string) {
      let hash = 0;
      for (let i = 0; i < s.length; i++) { hash = (hash << 5) - hash + s.charCodeAt(i); hash |= 0; }
      return hash;
    }

    function addKeywords(source: string, keywords: string[] | null) {
      if (!keywords) return source;
      return keywords.map((k) => `#define ${k}`).join("\n") + "\n" + source;
    }

    function compileShader(type: number, source: string, keywords: string[] | null = null): WebGLShader | null {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, addKeywords(source, keywords));
      gl.compileShader(shader);
      return shader;
    }

    function createProgram(vs: WebGLShader | null, fs: WebGLShader | null): WebGLProgram | null {
      if (!vs || !fs) return null;
      const p = gl.createProgram();
      if (!p) return null;
      gl.attachShader(p, vs);
      gl.attachShader(p, fs);
      gl.linkProgram(p);
      return p;
    }

    function getUniforms(program: WebGLProgram) {
      const uniforms: Record<string, WebGLUniformLocation | null> = {};
      const n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) {
        const info = gl.getActiveUniform(program, i);
        if (info) uniforms[info.name] = gl.getUniformLocation(program, info.name);
      }
      return uniforms;
    }

    class GLProgram {
      program: WebGLProgram | null;
      uniforms: Record<string, WebGLUniformLocation | null>;
      constructor(vs: WebGLShader | null, fs: WebGLShader | null) {
        this.program = createProgram(vs, fs);
        this.uniforms = this.program ? getUniforms(this.program) : {};
      }
      bind() { if (this.program) gl.useProgram(this.program); }
    }

    class Material {
      vertexShader: WebGLShader | null;
      fragmentShaderSource: string;
      programs: Record<number, WebGLProgram | null>;
      activeProgram: WebGLProgram | null;
      uniforms: Record<string, WebGLUniformLocation | null>;
      constructor(vs: WebGLShader | null, fsSrc: string) {
        this.vertexShader = vs; this.fragmentShaderSource = fsSrc;
        this.programs = {}; this.activeProgram = null; this.uniforms = {};
      }
      setKeywords(keywords: string[]) {
        let hash = 0;
        for (const kw of keywords) hash += hashCode(kw);
        let program = this.programs[hash];
        if (program == null) {
          const fs = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords);
          program = createProgram(this.vertexShader, fs);
          this.programs[hash] = program;
        }
        if (program === this.activeProgram) return;
        if (program) this.uniforms = getUniforms(program);
        this.activeProgram = program;
      }
      bind() { if (this.activeProgram) gl.useProgram(this.activeProgram); }
    }

    const baseVertexShader = compileShader(gl.VERTEX_SHADER, `
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv, vL, vR, vT, vB;
      uniform vec2 texelSize;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        vL = vUv - vec2(texelSize.x, 0.0);
        vR = vUv + vec2(texelSize.x, 0.0);
        vT = vUv + vec2(0.0, texelSize.y);
        vB = vUv - vec2(0.0, texelSize.y);
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }`);

    const copyShader = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; uniform sampler2D uTexture; void main() { gl_FragColor = texture2D(uTexture, vUv); }`);
    const clearShader = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value; void main() { gl_FragColor = value * texture2D(uTexture, vUv); }`);
    const splatShader = compileShader(gl.FRAGMENT_SHADER, `precision highp float; precision highp sampler2D; varying vec2 vUv; uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius; void main() { vec2 p = vUv - point.xy; p.x *= aspectRatio; vec3 splat = exp(-dot(p,p)/radius)*color; vec3 base = texture2D(uTarget,vUv).xyz; gl_FragColor = vec4(base+splat,1.0); }`);
    const advectionShader = compileShader(gl.FRAGMENT_SHADER, `
      precision highp float; precision highp sampler2D;
      varying vec2 vUv; uniform sampler2D uVelocity, uSource; uniform vec2 texelSize, dyeTexelSize; uniform float dt, dissipation;
      vec4 bilerp(sampler2D sam, vec2 uv, vec2 tsize) {
        vec2 st = uv/tsize - 0.5; vec2 iuv = floor(st); vec2 fuv = fract(st);
        vec4 a = texture2D(sam,(iuv+vec2(0.5,0.5))*tsize); vec4 b = texture2D(sam,(iuv+vec2(1.5,0.5))*tsize);
        vec4 c = texture2D(sam,(iuv+vec2(0.5,1.5))*tsize); vec4 d = texture2D(sam,(iuv+vec2(1.5,1.5))*tsize);
        return mix(mix(a,b,fuv.x),mix(c,d,fuv.x),fuv.y);
      }
      void main() {
        #ifdef MANUAL_FILTERING
          vec2 coord = vUv - dt*bilerp(uVelocity,vUv,texelSize).xy*texelSize;
          vec4 result = bilerp(uSource,coord,dyeTexelSize);
        #else
          vec2 coord = vUv - dt*texture2D(uVelocity,vUv).xy*texelSize;
          vec4 result = texture2D(uSource,coord);
        #endif
        gl_FragColor = result / (1.0 + dissipation * dt);
      }`, ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"]);
    const divergenceShader = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv,vL,vR,vT,vB; uniform sampler2D uVelocity; void main() { float L=texture2D(uVelocity,vL).x,R=texture2D(uVelocity,vR).x,T=texture2D(uVelocity,vT).y,B=texture2D(uVelocity,vB).y; vec2 C=texture2D(uVelocity,vUv).xy; if(vL.x<0.0)L=-C.x; if(vR.x>1.0)R=-C.x; if(vT.y>1.0)T=-C.y; if(vB.y<0.0)B=-C.y; gl_FragColor=vec4(0.5*(R-L+T-B),0,0,1); }`);
    const curlShader = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv,vL,vR,vT,vB; uniform sampler2D uVelocity; void main() { float L=texture2D(uVelocity,vL).y,R=texture2D(uVelocity,vR).y,T=texture2D(uVelocity,vT).x,B=texture2D(uVelocity,vB).x; gl_FragColor=vec4(0.5*(R-L-T+B),0,0,1); }`);
    const vorticityShader = compileShader(gl.FRAGMENT_SHADER, `precision highp float; precision highp sampler2D; varying vec2 vUv,vL,vR,vT,vB; uniform sampler2D uVelocity,uCurl; uniform float curl,dt; void main() { float L=texture2D(uCurl,vL).x,R=texture2D(uCurl,vR).x,T=texture2D(uCurl,vT).x,B=texture2D(uCurl,vB).x,C=texture2D(uCurl,vUv).x; vec2 force=0.5*vec2(abs(T)-abs(B),abs(R)-abs(L)); force/=length(force)+0.0001; force*=curl*C; force.y*=-1.0; vec2 vel=texture2D(uVelocity,vUv).xy; vel+=force*dt; vel=min(max(vel,-1000.0),1000.0); gl_FragColor=vec4(vel,0,1); }`);
    const pressureShader = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv,vL,vR,vT,vB; uniform sampler2D uPressure,uDivergence; void main() { float L=texture2D(uPressure,vL).x,R=texture2D(uPressure,vR).x,T=texture2D(uPressure,vT).x,B=texture2D(uPressure,vB).x,div=texture2D(uDivergence,vUv).x; gl_FragColor=vec4((L+R+B+T-div)*0.25,0,0,1); }`);
    const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, `precision mediump float; precision mediump sampler2D; varying highp vec2 vUv,vL,vR,vT,vB; uniform sampler2D uPressure,uVelocity; void main() { float L=texture2D(uPressure,vL).x,R=texture2D(uPressure,vR).x,T=texture2D(uPressure,vT).x,B=texture2D(uPressure,vB).x; vec2 vel=texture2D(uVelocity,vUv).xy; vel.xy-=vec2(R-L,T-B); gl_FragColor=vec4(vel,0,1); }`);
    const displayShaderSource = `
      precision highp float; precision highp sampler2D;
      varying vec2 vUv,vL,vR,vT,vB;
      uniform sampler2D uTexture; uniform vec2 texelSize;
      vec3 linearToGamma(vec3 color) { color=max(color,vec3(0)); return max(1.055*pow(color,vec3(0.416666667))-0.055,vec3(0)); }
      void main() {
        vec3 c = texture2D(uTexture,vUv).rgb;
        #ifdef SHADING
          vec3 lc=texture2D(uTexture,vL).rgb,rc=texture2D(uTexture,vR).rgb,tc=texture2D(uTexture,vT).rgb,bc=texture2D(uTexture,vB).rgb;
          float dx=length(rc)-length(lc),dy=length(tc)-length(bc);
          vec3 n=normalize(vec3(dx,dy,length(texelSize))); float diffuse=clamp(dot(n,vec3(0,0,1))+0.7,0.7,1.0); c*=diffuse;
        #endif
        float a=max(c.r,max(c.g,c.b)); gl_FragColor=vec4(c,a);
      }`;

    // Setup blit
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    const elemBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elemBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    interface FBO {
      texture: WebGLTexture; fbo: WebGLFramebuffer;
      width: number; height: number; texelSizeX: number; texelSizeY: number;
      attach: (id: number) => number;
    }
    interface DoubleFBO {
      width: number; height: number; texelSizeX: number; texelSizeY: number;
      read: FBO; write: FBO; swap: () => void;
    }

    const blit = (target: FBO | null, doClear = false) => {
      if (!target) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      } else {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      }
      if (doClear) { gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT); }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };

    function createFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): FBO {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h); gl.clear(gl.COLOR_BUFFER_BIT);
      return { texture, fbo, width: w, height: h, texelSizeX: 1/w, texelSizeY: 1/h, attach(id) { gl.activeTexture(gl.TEXTURE0+id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; } };
    }

    function createDoubleFBO(w: number, h: number, internalFormat: number, format: number, type: number, param: number): DoubleFBO {
      const f1 = createFBO(w, h, internalFormat, format, type, param);
      const f2 = createFBO(w, h, internalFormat, format, type, param);
      return { width: w, height: h, texelSizeX: f1.texelSizeX, texelSizeY: f1.texelSizeY, read: f1, write: f2, swap() { const t = this.read; this.read = this.write; this.write = t; } };
    }

    function resizeFBO(target: FBO, w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      const n = createFBO(w, h, internalFormat, format, type, param);
      copyProg.bind();
      if (copyProg.uniforms.uTexture) gl.uniform1i(copyProg.uniforms.uTexture, target.attach(0));
      blit(n);
      return n;
    }

    function resizeDoubleFBO(target: DoubleFBO, w: number, h: number, internalFormat: number, format: number, type: number, param: number) {
      if (target.width === w && target.height === h) return target;
      target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param);
      target.write = createFBO(w, h, internalFormat, format, type, param);
      target.width = w; target.height = h; target.texelSizeX = 1/w; target.texelSizeY = 1/h;
      return target;
    }

    const copyProg = new GLProgram(baseVertexShader, copyShader);
    const clearProg = new GLProgram(baseVertexShader, clearShader);
    const splatProg = new GLProgram(baseVertexShader, splatShader);
    const advectionProg = new GLProgram(baseVertexShader, advectionShader);
    const divergenceProg = new GLProgram(baseVertexShader, divergenceShader);
    const curlProg = new GLProgram(baseVertexShader, curlShader);
    const vorticityProg = new GLProgram(baseVertexShader, vorticityShader);
    const pressureProg = new GLProgram(baseVertexShader, pressureShader);
    const gradSubtractProg = new GLProgram(baseVertexShader, gradientSubtractShader);
    const displayMat = new Material(baseVertexShader, displayShaderSource);

    function getResolution(res: number) {
      const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
      const ar = w / h, aspect = ar < 1 ? 1 / ar : ar;
      const min = Math.round(res), max = Math.round(res * aspect);
      return w > h ? { width: max, height: min } : { width: min, height: max };
    }

    function scaleByPixelRatio(input: number) { return Math.floor(input * (window.devicePixelRatio || 1)); }

    let dye: DoubleFBO, velocity: DoubleFBO, divergenceFBO: FBO, curlFBO: FBO, pressFBO: DoubleFBO;

    function initFramebuffers() {
      const simRes = getResolution(config.SIM_RESOLUTION);
      const dyeRes = getResolution(config.DYE_RESOLUTION);
      const texType = ext.halfFloatTexType;
      const rgba = ext.formatRGBA!;
      const rg = ext.formatRG!;
      const r = ext.formatR!;
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
      gl.disable(gl.BLEND);
      if (!dye) dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
      else dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering);
      if (!velocity) velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
      else velocity = resizeDoubleFBO(velocity, simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering);
      divergenceFBO = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      curlFBO = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
      pressFBO = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST);
    }

    function updateKeywords() {
      const kw: string[] = [];
      if (config.SHADING) kw.push("SHADING");
      displayMat.setKeywords(kw);
    }

    updateKeywords();
    initFramebuffers();

    let lastUpdateTime = Date.now();
    let colorUpdateTimer = 0;
    let animFrameId: number;

    function calcDeltaTime() {
      const now = Date.now();
      let dt = (now - lastUpdateTime) / 1000;
      dt = Math.min(dt, 0.016666);
      lastUpdateTime = now;
      return dt;
    }

    function resizeCanvas() {
      const w = scaleByPixelRatio(canvas.clientWidth), h = scaleByPixelRatio(canvas.clientHeight);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; return true; }
      return false;
    }

    function HSVtoRGB(h: number, s: number, v: number): ColorRGB {
      const i = Math.floor(h * 6), f = h * 6 - i, p = v * (1-s), q = v * (1-f*s), t = v * (1-(1-f)*s);
      let r = 0, g = 0, b = 0;
      switch (i % 6) {
        case 0: r=v; g=t; b=p; break; case 1: r=q; g=v; b=p; break; case 2: r=p; g=v; b=t; break;
        case 3: r=p; g=q; b=v; break; case 4: r=t; g=p; b=v; break; case 5: r=v; g=p; b=q; break;
      }
      return { r, g, b };
    }

    function generateColor(): ColorRGB {
      const c = HSVtoRGB(Math.random(), 1.0, 1.0);
      return { r: c.r * 0.15, g: c.g * 0.15, b: c.b * 0.15 };
    }

    function wrap(v: number, min: number, max: number) { const range = max - min; if (!range) return min; return ((v-min) % range) + min; }

    function correctRadius(radius: number) {
      const ar = canvas.width / canvas.height;
      if (ar > 1) radius *= ar;
      return radius;
    }

    function correctDeltaX(d: number) { const ar = canvas.width / canvas.height; if (ar < 1) d *= ar; return d; }
    function correctDeltaY(d: number) { const ar = canvas.width / canvas.height; if (ar > 1) d /= ar; return d; }

    function updatePointerDownData(p: Pointer, id: number, posX: number, posY: number) {
      p.id = id; p.down = true; p.moved = false;
      p.texcoordX = posX / canvas.width; p.texcoordY = 1 - posY / canvas.height;
      p.prevTexcoordX = p.texcoordX; p.prevTexcoordY = p.texcoordY;
      p.deltaX = 0; p.deltaY = 0; p.color = generateColor();
    }

    function updatePointerMoveData(p: Pointer, posX: number, posY: number, color: ColorRGB) {
      p.prevTexcoordX = p.texcoordX; p.prevTexcoordY = p.texcoordY;
      p.texcoordX = posX / canvas.width; p.texcoordY = 1 - posY / canvas.height;
      p.deltaX = correctDeltaX(p.texcoordX - p.prevTexcoordX);
      p.deltaY = correctDeltaY(p.texcoordY - p.prevTexcoordY);
      p.moved = Math.abs(p.deltaX) > 0 || Math.abs(p.deltaY) > 0;
      p.color = color;
    }

    function splat(x: number, y: number, dx: number, dy: number, color: ColorRGB) {
      splatProg.bind();
      if (splatProg.uniforms.uTarget) gl.uniform1i(splatProg.uniforms.uTarget, velocity.read.attach(0));
      if (splatProg.uniforms.aspectRatio) gl.uniform1f(splatProg.uniforms.aspectRatio, canvas.width / canvas.height);
      if (splatProg.uniforms.point) gl.uniform2f(splatProg.uniforms.point, x, y);
      if (splatProg.uniforms.color) gl.uniform3f(splatProg.uniforms.color, dx, dy, 0);
      if (splatProg.uniforms.radius) gl.uniform1f(splatProg.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100));
      blit(velocity.write); velocity.swap();
      if (splatProg.uniforms.uTarget) gl.uniform1i(splatProg.uniforms.uTarget, dye.read.attach(0));
      if (splatProg.uniforms.color) gl.uniform3f(splatProg.uniforms.color, color.r, color.g, color.b);
      blit(dye.write); dye.swap();
    }

    function splatPointer(p: Pointer) {
      splat(p.texcoordX, p.texcoordY, p.deltaX * config.SPLAT_FORCE, p.deltaY * config.SPLAT_FORCE, p.color);
    }

    function clickSplat(p: Pointer) {
      const color = generateColor();
      color.r *= 10; color.g *= 10; color.b *= 10;
      splat(p.texcoordX, p.texcoordY, 10*(Math.random()-0.5), 30*(Math.random()-0.5), color);
    }

    function step(dt: number) {
      gl.disable(gl.BLEND);
      curlProg.bind();
      if (curlProg.uniforms.texelSize) gl.uniform2f(curlProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (curlProg.uniforms.uVelocity) gl.uniform1i(curlProg.uniforms.uVelocity, velocity.read.attach(0));
      blit(curlFBO);
      vorticityProg.bind();
      if (vorticityProg.uniforms.texelSize) gl.uniform2f(vorticityProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (vorticityProg.uniforms.uVelocity) gl.uniform1i(vorticityProg.uniforms.uVelocity, velocity.read.attach(0));
      if (vorticityProg.uniforms.uCurl) gl.uniform1i(vorticityProg.uniforms.uCurl, curlFBO.attach(1));
      if (vorticityProg.uniforms.curl) gl.uniform1f(vorticityProg.uniforms.curl, config.CURL);
      if (vorticityProg.uniforms.dt) gl.uniform1f(vorticityProg.uniforms.dt, dt);
      blit(velocity.write); velocity.swap();
      divergenceProg.bind();
      if (divergenceProg.uniforms.texelSize) gl.uniform2f(divergenceProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (divergenceProg.uniforms.uVelocity) gl.uniform1i(divergenceProg.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergenceFBO);
      clearProg.bind();
      if (clearProg.uniforms.uTexture) gl.uniform1i(clearProg.uniforms.uTexture, pressFBO.read.attach(0));
      if (clearProg.uniforms.value) gl.uniform1f(clearProg.uniforms.value, config.PRESSURE);
      blit(pressFBO.write); pressFBO.swap();
      pressureProg.bind();
      if (pressureProg.uniforms.texelSize) gl.uniform2f(pressureProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (pressureProg.uniforms.uDivergence) gl.uniform1i(pressureProg.uniforms.uDivergence, divergenceFBO.attach(0));
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        if (pressureProg.uniforms.uPressure) gl.uniform1i(pressureProg.uniforms.uPressure, pressFBO.read.attach(1));
        blit(pressFBO.write); pressFBO.swap();
      }
      gradSubtractProg.bind();
      if (gradSubtractProg.uniforms.texelSize) gl.uniform2f(gradSubtractProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (gradSubtractProg.uniforms.uPressure) gl.uniform1i(gradSubtractProg.uniforms.uPressure, pressFBO.read.attach(0));
      if (gradSubtractProg.uniforms.uVelocity) gl.uniform1i(gradSubtractProg.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write); velocity.swap();
      advectionProg.bind();
      if (advectionProg.uniforms.texelSize) gl.uniform2f(advectionProg.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY);
      if (!ext.supportLinearFiltering && advectionProg.uniforms.dyeTexelSize) gl.uniform2f(advectionProg.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY);
      const velId = velocity.read.attach(0);
      if (advectionProg.uniforms.uVelocity) gl.uniform1i(advectionProg.uniforms.uVelocity, velId);
      if (advectionProg.uniforms.uSource) gl.uniform1i(advectionProg.uniforms.uSource, velId);
      if (advectionProg.uniforms.dt) gl.uniform1f(advectionProg.uniforms.dt, dt);
      if (advectionProg.uniforms.dissipation) gl.uniform1f(advectionProg.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write); velocity.swap();
      if (!ext.supportLinearFiltering && advectionProg.uniforms.dyeTexelSize) gl.uniform2f(advectionProg.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY);
      if (advectionProg.uniforms.uVelocity) gl.uniform1i(advectionProg.uniforms.uVelocity, velocity.read.attach(0));
      if (advectionProg.uniforms.uSource) gl.uniform1i(advectionProg.uniforms.uSource, dye.read.attach(1));
      if (advectionProg.uniforms.dissipation) gl.uniform1f(advectionProg.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(dye.write); dye.swap();
    }

    function drawDisplay(target: FBO | null) {
      const width = target ? target.width : gl.drawingBufferWidth;
      const height = target ? target.height : gl.drawingBufferHeight;
      displayMat.bind();
      if (config.SHADING && displayMat.uniforms.texelSize) gl.uniform2f(displayMat.uniforms.texelSize, 1/width, 1/height);
      if (displayMat.uniforms.uTexture) gl.uniform1i(displayMat.uniforms.uTexture, dye.read.attach(0));
      blit(target, false);
    }

    function render(target: FBO | null) {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      drawDisplay(target);
    }

    function updateFrame() {
      const dt = calcDeltaTime();
      if (resizeCanvas()) initFramebuffers();
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED;
      if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1);
        pointers.forEach((p) => { p.color = generateColor(); });
      }
      for (const p of pointers) { if (p.moved) { p.moved = false; splatPointer(p); } }
      step(dt);
      render(null);
      animFrameId = requestAnimationFrame(updateFrame);
    }

    // Events
    const onMouseDown = (e: MouseEvent) => {
      const p = pointers[0];
      updatePointerDownData(p, -1, scaleByPixelRatio(e.clientX), scaleByPixelRatio(e.clientY));
      clickSplat(p);
    };
    const onMouseMove = (e: MouseEvent) => {
      const p = pointers[0];
      updatePointerMoveData(p, scaleByPixelRatio(e.clientX), scaleByPixelRatio(e.clientY), p.color);
    };
    const onTouchStart = (e: TouchEvent) => {
      for (let i = 0; i < e.targetTouches.length; i++) {
        updatePointerDownData(pointers[0], e.targetTouches[i].identifier, scaleByPixelRatio(e.targetTouches[i].clientX), scaleByPixelRatio(e.targetTouches[i].clientY));
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      for (let i = 0; i < e.targetTouches.length; i++) {
        updatePointerMoveData(pointers[0], scaleByPixelRatio(e.targetTouches[i].clientX), scaleByPixelRatio(e.targetTouches[i].clientY), pointers[0].color);
      }
    };
    const onTouchEnd = () => { pointers[0].down = false; };

    function handleFirstMouseMove(e: MouseEvent) {
      const p = pointers[0];
      updateFrame();
      updatePointerMoveData(p, scaleByPixelRatio(e.clientX), scaleByPixelRatio(e.clientY), generateColor());
      document.body.removeEventListener("mousemove", handleFirstMouseMove);
    }

    window.addEventListener("mousedown", onMouseDown);
    document.body.addEventListener("mousemove", handleFirstMouseMove);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchstart", onTouchStart, false);
    window.addEventListener("touchmove", onTouchMove, false);
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("pointer-events-none fixed top-0 left-0 z-50 size-full", className)}>
      <canvas ref={canvasRef} className="block h-screen w-screen" />
    </div>
  );
}
