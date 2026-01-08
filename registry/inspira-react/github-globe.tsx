"use client";

import React, { useEffect, useRef } from "react";
import {
  AmbientLight,
  Color,
  DirectionalLight,
  PerspectiveCamera,
  PointLight,
  Scene,
  WebGLRenderer,
} from "three";
import ThreeGlobe from "three-globe";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { cn } from "@/lib/utils";

interface Position {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
}

interface GlobeData {
  size: number | undefined;
  order: number;
  color: (t: number) => string;
  lat: number;
  lng: number;
}

interface GlobeConfig {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

interface GithubGlobeProps {
  globeConfig?: GlobeConfig;
  data?: Position[];
  className?: string;
}

function hexToRgb(color: string) {
  let hex = color.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  const bigint = Number.parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function genRandomNumbers(min: number, max: number, count: number) {
  const arr: number[] = [];
  while (arr.length < count) {
    const r = Math.floor(Math.random() * (max - min)) + min;
    if (!arr.includes(r)) arr.push(r);
  }
  return arr;
}

function latLngToCartesian(lat: number, lng: number, radius = 400) {
  const phi = (lat * Math.PI) / 180;
  const theta = (lng * Math.PI) / 180;
  return {
    x: radius * Math.cos(phi) * Math.sin(theta),
    y: radius * Math.sin(phi),
    z: radius * Math.cos(phi) * Math.cos(theta),
  };
}

export function GithubGlobe({
  globeConfig = {},
  data = [],
  className,
}: GithubGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const defaultConfig: Required<GlobeConfig> = {
    pointSize: 1,
    atmosphereColor: "#ffffff",
    showAtmosphere: true,
    atmosphereAltitude: 0.1,
    polygonColor: "rgba(255,255,255,0.7)",
    globeColor: "#1d072e",
    emissive: "#000000",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    arcTime: 2000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    ambientLight: "#ffffff",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    autoRotate: false,
    autoRotateSpeed: 2.0,
    initialPosition: undefined as unknown as { lat: number; lng: number },
    ...globeConfig,
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Renderer
    const renderer = new WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.autoClear = false;

    const scene = new Scene();

    const camera = new PerspectiveCamera();
    camera.aspect = width / height;
    camera.position.set(0, 0, 400);

    scene.add(new AmbientLight(defaultConfig.ambientLight, 0.6));

    const dLight1 = new DirectionalLight(defaultConfig.directionalLeftLight, 1);
    dLight1.position.set(-400, 100, 400);
    camera.add(dLight1);

    const dLight2 = new DirectionalLight(defaultConfig.directionalTopLight, 1);
    dLight2.position.set(-200, 500, 200);
    camera.add(dLight2);

    const pLight = new PointLight(defaultConfig.pointLight, 0.8);
    pLight.position.set(-200, 500, 200);
    camera.add(pLight);

    if (defaultConfig.initialPosition) {
      const { lat, lng } = defaultConfig.initialPosition;
      const pos = latLngToCartesian(lat, lng, 400);
      camera.position.set(pos.x, pos.y, pos.z);
      camera.lookAt(0, 0, 0);
    }

    camera.updateProjectionMatrix();
    scene.add(camera);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.01;
    controls.minDistance = 200;
    controls.maxDistance = 500;
    controls.rotateSpeed = defaultConfig.autoRotateSpeed;
    controls.autoRotate = false;
    controls.autoRotateSpeed = defaultConfig.autoRotateSpeed;
    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    // Build globe data
    const points: GlobeData[] = [];
    for (const arc of data) {
      const rgb = hexToRgb(arc.color);
      const colorFn = (t: number) => `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${1 - t})`;
      points.push({ size: globeConfig.pointSize, order: arc.order, color: colorFn, lat: arc.startLat, lng: arc.startLng });
      points.push({ size: globeConfig.pointSize, order: arc.order, color: colorFn, lat: arc.endLat, lng: arc.endLng });
    }
    const filteredPoints = points.filter(
      (v, i, a) =>
        a.findIndex((v2) => ["lat", "lng"].every((k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"])) === i,
    );

    // Lazy-load countries GeoJSON to avoid bundling large JSON
    const globe = new ThreeGlobe({ waitForGlobeReady: true, animateIn: true })
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(defaultConfig.showAtmosphere)
      .atmosphereColor(defaultConfig.atmosphereColor)
      .atmosphereAltitude(defaultConfig.atmosphereAltitude)
      .hexPolygonColor(() => defaultConfig.polygonColor);

    const mat = globe.globeMaterial() as unknown as {
      color: Color;
      emissive: Color;
      emissiveIntensity: number;
      shininess: number;
    };
    mat.color = new Color(defaultConfig.globeColor);
    mat.emissive = new Color(defaultConfig.emissive);
    mat.emissiveIntensity = defaultConfig.emissiveIntensity;
    mat.shininess = defaultConfig.shininess;

    scene.add(globe);

    // Arcs + rings
    const numberOfRings = genRandomNumbers(0, data.length, Math.floor((data.length * 4) / 5));

    globe
      .arcsData(data)
      .arcStartLat((d: unknown) => (d as Position).startLat)
      .arcStartLng((d: unknown) => (d as Position).startLng)
      .arcEndLat((d: unknown) => (d as Position).endLat)
      .arcEndLng((d: unknown) => (d as Position).endLng)
      .arcColor((e: unknown) => (e as Position).color)
      .arcAltitude((e: unknown) => (e as Position).arcAlt)
      .arcStroke(() => [0.32, 0.28, 0.3][Math.round(Math.random() * 4)] ?? null)
      .arcDashLength(defaultConfig.arcLength)
      .arcDashInitialGap((e: unknown) => (e as Position).order)
      .arcDashGap(15)
      .arcDashAnimateTime(defaultConfig.arcTime)
      .pointsData(data)
      .pointColor((e: unknown) => (e as Position).color)
      .pointsMerge(true)
      .pointAltitude(0.0)
      .pointRadius(2)
      .ringsData(filteredPoints.filter((_, i) => numberOfRings.includes(i)))
      .ringColor((e: unknown) => (t: number) => (e as GlobeData).color(t))
      .ringMaxRadius(defaultConfig.maxRings)
      .ringPropagationSpeed(3)
      .ringRepeatPeriod((defaultConfig.arcTime * defaultConfig.arcLength) / defaultConfig.rings);

    const onWindowResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onWindowResize);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (defaultConfig.autoRotate) {
        globe.rotation.y += (defaultConfig.autoRotateSpeed ?? 2.0) * 0.001;
      }
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("h-96 w-96", className)}
    />
  );
}
