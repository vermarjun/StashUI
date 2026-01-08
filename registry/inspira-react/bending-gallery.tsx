"use client";
import React, { useEffect, useRef } from "react";

// ---- Types ----

type GL = WebGLRenderingContext;

interface GalleryItem {
  image: string;
  text: string;
}

interface BendingGalleryProps {
  items?: GalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  font?: string;
}

// ---- Utility Functions ----

function debounce<T extends (...args: unknown[]) => void>(func: T, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: unknown, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function getFontSize(font: string): number {
  const match = font.match(/(\d+)px/);
  return match ? parseInt(match[1], 10) : 30;
}

// ---- OGL-like mini WebGL helpers ----
// We implement just enough to replicate the OGL approach without adding the dep.

interface DiscData {
  p: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface ScreenSize {
  width: number;
  height: number;
}

interface Viewport {
  width: number;
  height: number;
}

interface ScrollState {
  ease: number;
  current: number;
  target: number;
  last: number;
  position?: number;
}

// Because ogl is a heavy dependency, we re-implement using raw WebGL + Canvas2D
// for text labels (same approach as the original).

class TextLabel {
  canvas: HTMLCanvasElement;
  texture: WebGLTexture | null = null;
  width: number;
  height: number;
  aspect: number;

  constructor(
    private gl: WebGLRenderingContext,
    text: string,
    font: string,
    color: string,
  ) {
    this.canvas = document.createElement("canvas");
    const ctx = this.canvas.getContext("2d")!;
    ctx.font = font;
    const metrics = ctx.measureText(text);
    const fontSize = getFontSize(font);
    this.width = Math.ceil(metrics.width) + 20;
    this.height = Math.ceil(fontSize * 1.2) + 20;
    this.aspect = this.width / this.height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    const ctx2 = this.canvas.getContext("2d")!;
    ctx2.font = font;
    ctx2.fillStyle = color;
    ctx2.textBaseline = "middle";
    ctx2.textAlign = "center";
    ctx2.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx2.fillText(text, this.canvas.width / 2, this.canvas.height / 2);
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }
}

interface PlaneGeometry {
  vao?: unknown;
  vertices: Float32Array;
  uvs: Float32Array;
  indices: Uint16Array;
}

function buildPlaneGeometry(wSeg: number, hSeg: number): PlaneGeometry {
  const verts: number[] = [];
  const uvArr: number[] = [];
  const idxArr: number[] = [];
  for (let iy = 0; iy <= hSeg; iy++) {
    for (let ix = 0; ix <= wSeg; ix++) {
      const u = ix / wSeg;
      const v = iy / hSeg;
      verts.push(u - 0.5, 0.5 - v, 0);
      uvArr.push(u, 1 - v);
    }
  }
  for (let iy = 0; iy < hSeg; iy++) {
    for (let ix = 0; ix < wSeg; ix++) {
      const a = iy * (wSeg + 1) + ix;
      const b = a + wSeg + 1;
      idxArr.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }
  return {
    vertices: new Float32Array(verts),
    uvs: new Float32Array(uvArr),
    indices: new Uint16Array(idxArr),
  };
}

// ---- WebGL App ----

class BendingGalleryApp {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext;
  private scroll: ScrollState;
  private onCheckDebounce: () => void;
  private isDown = false;
  private startX = 0;
  private raf = 0;
  private screen: ScreenSize = { width: 1, height: 1 };
  private viewport: Viewport = { width: 1, height: 1 };
  private camera = { fov: 45, aspect: 1, z: 20 };
  private items: GalleryItem[];
  private bend: number;
  private textColor: string;
  private borderRadius: number;
  private font: string;
  // Per-item state
  private planes: PlaneMesh[] = [];
  private planeGeo!: PlaneGeometry;
  private imgProgram!: WebGLProgram;
  private textProgram!: WebGLProgram;

  constructor(
    container: HTMLElement,
    { items, bend = 3, textColor = "#ffffff", borderRadius = 0.05, font = "bold 30px DM Sans" }: BendingGalleryProps,
  ) {
    this.container = container;
    this.items = (items && items.length ? items : BendingGalleryApp.defaultItems()).concat(
      items && items.length ? items : BendingGalleryApp.defaultItems(),
    );
    this.bend = bend;
    this.textColor = textColor;
    this.borderRadius = borderRadius;
    this.font = font;
    this.scroll = { ease: 0.05, current: 0, target: 0, last: 0 };
    this.onCheckDebounce = debounce(this.onCheck.bind(this), 200);

    this.canvas = document.createElement("canvas");
    this.container.appendChild(this.canvas);
    const gl = this.canvas.getContext("webgl", { alpha: true });
    if (!gl) throw new Error("WebGL not supported");
    this.gl = gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this.setSize();
    this.planeGeo = buildPlaneGeometry(100, 50);
    this.imgProgram = this.createImgProgram();
    this.textProgram = this.createTextProgram();
    this.createPlanes();
    this.addEventListeners();
    this.update();
  }

  static defaultItems(): GalleryItem[] {
    return [
      { image: "https://picsum.photos/seed/1/800/600?grayscale", text: "Bridge" },
      { image: "https://picsum.photos/seed/2/800/600?grayscale", text: "Desk Setup" },
      { image: "https://picsum.photos/seed/3/800/600?grayscale", text: "Waterfall" },
      { image: "https://picsum.photos/seed/4/800/600?grayscale", text: "Strawberries" },
      { image: "https://picsum.photos/seed/5/800/600?grayscale", text: "Deep Diving" },
      { image: "https://picsum.photos/seed/16/800/600?grayscale", text: "Train Track" },
    ];
  }

  private setSize() {
    const w = this.container.clientWidth || 1;
    const h = this.container.clientHeight || 1;
    this.screen = { width: w, height: h };
    this.canvas.width = w;
    this.canvas.height = h;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.gl.viewport(0, 0, w, h);
    this.camera.aspect = w / h;
    const fov = (this.camera.fov * Math.PI) / 180;
    const vpH = 2 * Math.tan(fov / 2) * this.camera.z;
    const vpW = vpH * this.camera.aspect;
    this.viewport = { width: vpW, height: vpH };
  }

  private createShader(type: number, src: string): WebGLShader {
    const sh = this.gl.createShader(type)!;
    this.gl.shaderSource(sh, src);
    this.gl.compileShader(sh);
    return sh;
  }

  private createProgram(vert: string, frag: string): WebGLProgram {
    const prog = this.gl.createProgram()!;
    this.gl.attachShader(prog, this.createShader(this.gl.VERTEX_SHADER, vert));
    this.gl.attachShader(prog, this.createShader(this.gl.FRAGMENT_SHADER, frag));
    this.gl.linkProgram(prog);
    return prog;
  }

  private createImgProgram(): WebGLProgram {
    return this.createProgram(
      `
      precision highp float;
      attribute vec3 position;
      attribute vec2 uv;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uTime;
      uniform float uSpeed;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 p = position;
        p.z = (sin(p.x*4.0+uTime)*1.5+cos(p.y*2.0+uTime)*1.5)*(0.1+uSpeed*0.5);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p,1.0);
      }`,
      `
      precision highp float;
      uniform vec2 uImageSizes;
      uniform vec2 uPlaneSizes;
      uniform sampler2D tMap;
      uniform float uBorderRadius;
      varying vec2 vUv;
      float roundedBoxSDF(vec2 p, vec2 b, float r) {
        vec2 d = abs(p)-b;
        return length(max(d,vec2(0.0)))+min(max(d.x,d.y),0.0)-r;
      }
      void main() {
        vec2 ratio = vec2(
          min((uPlaneSizes.x/uPlaneSizes.y)/(uImageSizes.x/uImageSizes.y),1.0),
          min((uPlaneSizes.y/uPlaneSizes.x)/(uImageSizes.y/uImageSizes.x),1.0)
        );
        vec2 uv = vec2(vUv.x*ratio.x+(1.0-ratio.x)*0.5, vUv.y*ratio.y+(1.0-ratio.y)*0.5);
        vec4 color = texture2D(tMap,uv);
        float d = roundedBoxSDF(vUv-0.5, vec2(0.5-uBorderRadius), uBorderRadius);
        if(d>0.0) discard;
        gl_FragColor = vec4(color.rgb,1.0);
      }`,
    );
  }

  private createTextProgram(): WebGLProgram {
    return this.createProgram(
      `
      attribute vec3 position;
      attribute vec2 uv;
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }`,
      `
      precision highp float;
      uniform sampler2D tMap;
      varying vec2 vUv;
      void main() {
        vec4 color = texture2D(tMap,vUv);
        if(color.a<0.1) discard;
        gl_FragColor = color;
      }`,
    );
  }

  private createPlanes() {
    const gl = this.gl;
    const n = this.items.length;
    for (let i = 0; i < n; i++) {
      const scale = this.screen.height / 1500;
      const planeH = (this.viewport.height * (900 * scale)) / this.screen.height;
      const planeW = (this.viewport.width * (700 * scale)) / this.screen.width;
      const padding = 2;
      const label = new TextLabel(gl, this.items[i].text, this.font, this.textColor);
      const imgTex = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, imgTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([200, 200, 200, 255]));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = this.items[i].image;
      const imgNatural = { w: 800, h: 600 };
      img.onload = () => {
        imgNatural.w = img.naturalWidth;
        imgNatural.h = img.naturalHeight;
        gl.bindTexture(gl.TEXTURE_2D, imgTex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
        gl.generateMipmap(gl.TEXTURE_2D);
        plane.imgSizes = [imgNatural.w, imgNatural.h];
      };
      const plane: PlaneMesh = {
        posX: (planeW + padding) * i,
        posY: 0,
        rotZ: 0,
        scaleW: planeW,
        scaleH: planeH,
        extra: 0,
        index: i,
        length: n,
        width: planeW + padding,
        widthTotal: (planeW + padding) * n,
        imgTex,
        imgSizes: [800, 600],
        label,
        uTime: Math.random() * 100,
        uSpeed: 0,
        isBefore: false,
        isAfter: false,
      };
      this.planes.push(plane);
    }
  }

  private ortho(l: number, r: number, b: number, t: number, n: number, f: number): Float32Array {
    const mat = new Float32Array(16);
    mat[0] = 2 / (r - l); mat[5] = 2 / (t - b); mat[10] = -2 / (f - n);
    mat[12] = -(r + l) / (r - l); mat[13] = -(t + b) / (t - b); mat[14] = -(f + n) / (f - n); mat[15] = 1;
    return mat;
  }

  private identity(): Float32Array {
    const m = new Float32Array(16);
    m[0] = m[5] = m[10] = m[15] = 1;
    return m;
  }

  private translate(m: Float32Array, x: number, y: number, z: number): Float32Array {
    const r = new Float32Array(m);
    r[12] = m[0] * x + m[4] * y + m[8] * z + m[12];
    r[13] = m[1] * x + m[5] * y + m[9] * z + m[13];
    r[14] = m[2] * x + m[6] * y + m[10] * z + m[14];
    return r;
  }

  private scale(m: Float32Array, sx: number, sy: number, sz: number): Float32Array {
    const r = new Float32Array(m);
    r[0] = m[0] * sx; r[1] = m[1] * sx; r[2] = m[2] * sx;
    r[4] = m[4] * sy; r[5] = m[5] * sy; r[6] = m[6] * sy;
    r[8] = m[8] * sz; r[9] = m[9] * sz; r[10] = m[10] * sz;
    return r;
  }

  private rotateZ(m: Float32Array, angle: number): Float32Array {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const r = new Float32Array(m);
    r[0] = m[0] * c + m[4] * s;
    r[1] = m[1] * c + m[5] * s;
    r[4] = m[0] * -s + m[4] * c;
    r[5] = m[1] * -s + m[5] * c;
    return r;
  }

  private uploadGeometry(prog: WebGLProgram) {
    const gl = this.gl;
    const geo = this.planeGeo;
    const vBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuf);
    gl.bufferData(gl.ARRAY_BUFFER, geo.vertices, gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
    const uvBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuf);
    gl.bufferData(gl.ARRAY_BUFFER, geo.uvs, gl.STATIC_DRAW);
    const uvLoc = gl.getAttribLocation(prog, "uv");
    if (uvLoc >= 0) {
      gl.enableVertexAttribArray(uvLoc);
      gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);
    }
    const iBuf = gl.createBuffer()!;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, geo.indices, gl.STATIC_DRAW);
    return geo.indices.length;
  }

  private drawPlane(
    plane: PlaneMesh,
    proj: Float32Array,
    view: Float32Array,
    time: number,
  ) {
    const gl = this.gl;
    gl.useProgram(this.imgProgram);
    const count = this.uploadGeometry(this.imgProgram);
    let mv = this.identity();
    mv = this.translate(mv, plane.posX, plane.posY, 0);
    mv = this.rotateZ(mv, plane.rotZ);
    mv = this.scale(mv, plane.scaleW, plane.scaleH, 1);
    const mvFinal = this.multiplyMat4(view, mv);
    gl.uniformMatrix4fv(gl.getUniformLocation(this.imgProgram, "projectionMatrix"), false, proj);
    gl.uniformMatrix4fv(gl.getUniformLocation(this.imgProgram, "modelViewMatrix"), false, mvFinal);
    gl.uniform1f(gl.getUniformLocation(this.imgProgram, "uTime"), plane.uTime);
    gl.uniform1f(gl.getUniformLocation(this.imgProgram, "uSpeed"), plane.uSpeed);
    gl.uniform2fv(gl.getUniformLocation(this.imgProgram, "uPlaneSizes"), [plane.scaleW, plane.scaleH]);
    gl.uniform2fv(gl.getUniformLocation(this.imgProgram, "uImageSizes"), plane.imgSizes);
    gl.uniform1f(gl.getUniformLocation(this.imgProgram, "uBorderRadius"), this.borderRadius);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, plane.imgTex);
    gl.uniform1i(gl.getUniformLocation(this.imgProgram, "tMap"), 0);
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);

    // Draw text label
    if (plane.label.texture) {
      gl.useProgram(this.textProgram);
      const tc = this.uploadGeometry(this.textProgram);
      const textH = plane.scaleH * 0.15;
      const textW = textH * plane.label.aspect;
      let tmv = this.identity();
      tmv = this.translate(tmv, plane.posX, plane.posY - plane.scaleH * 0.5 - textH * 0.5 - 0.05, 0);
      tmv = this.rotateZ(tmv, plane.rotZ);
      tmv = this.scale(tmv, textW, textH, 1);
      const tmvFinal = this.multiplyMat4(view, tmv);
      gl.uniformMatrix4fv(gl.getUniformLocation(this.textProgram, "projectionMatrix"), false, proj);
      gl.uniformMatrix4fv(gl.getUniformLocation(this.textProgram, "modelViewMatrix"), false, tmvFinal);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, plane.label.texture);
      gl.uniform1i(gl.getUniformLocation(this.textProgram, "tMap"), 0);
      gl.drawElements(gl.TRIANGLES, tc, gl.UNSIGNED_SHORT, 0);
    }
  }

  private multiplyMat4(a: Float32Array, b: Float32Array): Float32Array {
    const r = new Float32Array(16);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        let s = 0;
        for (let k = 0; k < 4; k++) s += a[i + k * 4] * b[k + j * 4];
        r[i + j * 4] = s;
      }
    }
    return r;
  }

  private update = () => {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? "right" : "left";

    const gl = this.gl;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const vp = this.viewport;
    const proj = this.ortho(-vp.width / 2, vp.width / 2, -vp.height / 2, vp.height / 2, -100, 100);
    const view = this.identity();

    const time = performance.now() * 0.001;
    const H = vp.width / 2;

    for (const plane of this.planes) {
      const baseX = plane.width * plane.index;
      const x = baseX - this.scroll.current - plane.extra;
      plane.posX = x;
      plane.uTime += 0.04;
      plane.uSpeed = this.scroll.current - this.scroll.last;

      if (this.bend === 0) {
        plane.posY = 0;
        plane.rotZ = 0;
      } else {
        const B_abs = Math.abs(this.bend);
        const R = (H * H + B_abs * B_abs) / (2 * B_abs);
        const effectiveX = Math.min(Math.abs(x), H);
        const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
        if (this.bend > 0) {
          plane.posY = -arc;
          plane.rotZ = -Math.sign(x) * Math.asin(effectiveX / R);
        } else {
          plane.posY = arc;
          plane.rotZ = Math.sign(x) * Math.asin(effectiveX / R);
        }
      }

      const planeOffset = plane.scaleW / 2;
      const vpOffset = vp.width / 2;
      plane.isBefore = plane.posX + planeOffset < -vpOffset;
      plane.isAfter = plane.posX - planeOffset > vpOffset;
      if (direction === "right" && plane.isBefore) {
        plane.extra -= plane.widthTotal;
        plane.isBefore = plane.isAfter = false;
      }
      if (direction === "left" && plane.isAfter) {
        plane.extra += plane.widthTotal;
        plane.isBefore = plane.isAfter = false;
      }

      this.drawPlane(plane, proj, view, time);
    }

    this.scroll.last = this.scroll.current;
    this.raf = requestAnimationFrame(this.update);
  };

  private onCheck() {
    if (!this.planes[0]) return;
    const width = this.planes[0].width;
    const itemIndex = Math.round(Math.abs(this.scroll.target) / width);
    const item = width * itemIndex;
    this.scroll.target = this.scroll.target < 0 ? -item : item;
  }

  private onWheel = () => {
    this.scroll.target += 2;
    this.onCheckDebounce();
  };

  private onTouchDown = (e: MouseEvent | TouchEvent) => {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.startX = "touches" in e ? e.touches[0].clientX : e.clientX;
  };

  private onTouchMove = (e: MouseEvent | TouchEvent) => {
    if (!this.isDown) return;
    const x = "touches" in e ? e.touches[0].clientX : e.clientX;
    const distance = (this.startX - x) * 0.05;
    this.scroll.target = (this.scroll.position ?? 0) + distance;
  };

  private onTouchUp = () => {
    this.isDown = false;
    this.onCheck();
  };

  private onResize = () => {
    this.setSize();
    const scale = this.screen.height / 1500;
    const planeH = (this.viewport.height * (900 * scale)) / this.screen.height;
    const planeW = (this.viewport.width * (700 * scale)) / this.screen.width;
    const padding = 2;
    for (const plane of this.planes) {
      plane.scaleW = planeW;
      plane.scaleH = planeH;
      plane.width = planeW + padding;
      plane.widthTotal = (planeW + padding) * plane.length;
    }
  };

  private addEventListeners() {
    window.addEventListener("resize", this.onResize);
    window.addEventListener("wheel", this.onWheel);
    window.addEventListener("mousedown", this.onTouchDown);
    window.addEventListener("mousemove", this.onTouchMove);
    window.addEventListener("mouseup", this.onTouchUp);
    window.addEventListener("touchstart", this.onTouchDown);
    window.addEventListener("touchmove", this.onTouchMove);
    window.addEventListener("touchend", this.onTouchUp);
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("wheel", this.onWheel);
    window.removeEventListener("mousedown", this.onTouchDown);
    window.removeEventListener("mousemove", this.onTouchMove);
    window.removeEventListener("mouseup", this.onTouchUp);
    window.removeEventListener("touchstart", this.onTouchDown);
    window.removeEventListener("touchmove", this.onTouchMove);
    window.removeEventListener("touchend", this.onTouchUp);
    if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
  }
}

interface PlaneMesh {
  posX: number;
  posY: number;
  rotZ: number;
  scaleW: number;
  scaleH: number;
  extra: number;
  index: number;
  length: number;
  width: number;
  widthTotal: number;
  imgTex: WebGLTexture;
  imgSizes: [number, number];
  label: TextLabel;
  uTime: number;
  uSpeed: number;
  isBefore: boolean;
  isAfter: boolean;
}

// ---- React component ----

export const BendingGallery = ({
  items,
  bend = 3,
  textColor = "#ffffff",
  borderRadius = 0.05,
  font = "bold 30px DM Sans",
}: BendingGalleryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<BendingGalleryApp | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    try {
      appRef.current = new BendingGalleryApp(containerRef.current, {
        items,
        bend,
        textColor,
        borderRadius,
        font,
      });
    } catch (e) {
      console.warn("BendingGallery: WebGL not available", e);
    }
    return () => {
      appRef.current?.destroy();
      appRef.current = null;
    };
  }, [items, bend, textColor, borderRadius, font]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full cursor-grab overflow-hidden active:cursor-grabbing"
    />
  );
};
