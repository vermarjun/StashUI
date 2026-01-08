"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  AmbientLight,
  BoxGeometry,
  InstancedBufferAttribute,
  InstancedMesh,
  MathUtils,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Plane,
  PointLight,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

export interface BgParticleWhirlpoolProps {
  particleCount?: number;
  blur?: number;
  className?: string;
  children?: React.ReactNode;
}

const { randFloat: rnd, randFloatSpread: rndFS } = MathUtils;

interface Instance {
  position: Vector3;
  scale: number;
  scaleZ: number;
  velocity: Vector3;
  attraction: number;
  vLimit: number;
}

export function BgParticleWhirlpool({
  particleCount = 2000,
  blur = 0,
  className,
  children,
}: BgParticleWhirlpoolProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const instances: Instance[] = [];
    const target = new Vector3();
    const dummyO = new Object3D();
    const dummyV = new Vector3();
    const pointer = new Vector2();
    const raycaster = new Raycaster();
    const light = new PointLight(0x0060ff, 0.5);

    for (let i = 0; i < particleCount; i++) {
      instances.push({
        position: new Vector3(rndFS(200), rndFS(200), rndFS(200)),
        scale: rnd(0.2, 1),
        scaleZ: rnd(0.1, 1),
        velocity: new Vector3(rndFS(2), rndFS(2), rndFS(2)),
        attraction: 0.03 + rnd(-0.01, 0.01),
        vLimit: 1.2 + rnd(-0.1, 0.1),
      });
    }

    const width = canvasRef.current.clientWidth;
    const height = canvasRef.current.clientHeight;

    const renderer = new WebGLRenderer({ canvas: canvasRef.current!, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.autoClear = false;

    const camera = new PerspectiveCamera();
    camera.aspect = width / height;
    camera.position.set(0, 0, 200);
    camera.updateProjectionMatrix();

    const ambientLight = new AmbientLight(0x808080);
    const pointLight1 = new PointLight(0xff6000);
    const pointLight2 = new PointLight(0xff6000, 0.5);
    pointLight2.position.set(100, 0, 0);
    const pointLight3 = new PointLight(0x0000ff, 0.5);
    pointLight3.position.set(-100, 0, 0);

    const boxGeometry = new BoxGeometry(2, 2, 10);
    const standardMaterial = new MeshBasicMaterial({ transparent: true, opacity: 0.9 });
    const imesh = new InstancedMesh(boxGeometry, standardMaterial, particleCount);

    const scene = new Scene();
    scene.add(ambientLight, pointLight1, light, pointLight2, pointLight3, imesh);

    const controls = new OrbitControls(camera, renderer.domElement);

    const effectComposer = new EffectComposer(renderer);
    effectComposer.setSize(width, height);
    effectComposer.addPass(new RenderPass(scene, camera));
    effectComposer.addPass(new UnrealBloomPass(new Vector2(width, height), 1, 0, 0));

    // Init positions
    for (let i = 0; i < particleCount; i++) {
      const { position, scale, scaleZ } = instances[i];
      dummyO.position.copy(position);
      dummyO.scale.set(scale, scale, scaleZ);
      dummyO.updateMatrix();
      imesh.setMatrixAt(i, dummyO.matrix);
    }

    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      colors[i * 3] = rnd(0, 1);
      colors[i * 3 + 1] = rnd(0, 1);
      colors[i * 3 + 2] = rnd(0, 1);
    }
    imesh.instanceColor = new InstancedBufferAttribute(colors, 3);
    imesh.instanceMatrix.needsUpdate = true;

    let rafId: number;

    function animate() {
      rafId = requestAnimationFrame(animate);
      controls.update();
      light.position.copy(target);

      for (let i = 0; i < particleCount; i++) {
        const { position, scale, scaleZ, velocity, attraction, vLimit } = instances[i];
        dummyV.copy(target).sub(position).normalize().multiplyScalar(attraction);
        velocity.add(dummyV).clampScalar(-vLimit, vLimit);
        position.add(velocity);
        dummyO.position.copy(position);
        dummyO.scale.set(scale, scale, scaleZ);
        dummyO.lookAt(dummyV.copy(position).add(velocity));
        dummyO.updateMatrix();
        imesh.setMatrixAt(i, dummyO.matrix);
      }
      imesh.instanceMatrix.needsUpdate = true;
      effectComposer.render();
    }

    animate();

    function onPointerMove(event: MouseEvent | TouchEvent) {
      let clientX: number, clientY: number;
      if (event instanceof TouchEvent) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else {
        clientX = (event as MouseEvent).clientX;
        clientY = (event as MouseEvent).clientY;
      }

      const rect = containerRef.current!.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        pointer.x = (x / rect.width) * 2 - 1;
        pointer.y = -(y / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const planeZ = new Plane(new Vector3(0, 0, 1), 0);
        const point = new Vector3();
        raycaster.ray.intersectPlane(planeZ, point);
        target.copy(point);
      } else {
        target.set(0, 0, 0);
      }
    }

    function onWindowResize() {
      if (!canvasRef.current || !containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      effectComposer.setSize(w, h);
    }

    containerRef.current.addEventListener("mousemove", onPointerMove);
    containerRef.current.addEventListener("touchmove", onPointerMove);
    window.addEventListener("resize", onWindowResize);

    return () => {
      cancelAnimationFrame(rafId);
      containerRef.current?.removeEventListener("mousemove", onPointerMove);
      containerRef.current?.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particleCount]);

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full", className)}
    >
      <canvas ref={canvasRef} className="size-full" />
      <div
        className="absolute inset-0 backdrop-blur-[var(--whirlpool-blur)]"
        style={{ "--whirlpool-blur": `${blur}px` } as React.CSSProperties}
      />
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
