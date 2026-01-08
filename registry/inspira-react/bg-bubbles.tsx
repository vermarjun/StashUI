"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface BubblesBgProps {
  blur?: number;
  children?: React.ReactNode;
}

// Color helpers
function rgb(r: number, g: number, b: number): THREE.Color {
  return new THREE.Color(r / 255, g / 255, b / 255);
}

const BG_COLOR_BOTTOM_BLUISH = rgb(170, 215, 217);
const BG_COLOR_TOP_BLUISH = rgb(57, 167, 255);
const BG_COLOR_BOTTOM_ORANGISH = rgb(255, 160, 75);
const BG_COLOR_TOP_ORANGISH = rgb(239, 172, 53);

const SPHERE_COLOR_BOTTOM_BLUISH = rgb(120, 235, 124);
const SPHERE_COLOR_TOP_BLUISH = rgb(0, 167, 255);
const SPHERE_COLOR_BOTTOM_ORANGISH = rgb(235, 170, 0);
const SPHERE_COLOR_TOP_ORANGISH = rgb(255, 120, 0);

const SPHERE_COUNT = 250;
const SPHERE_SCALE_COEFF = 3;
const ORBIT_MIN = SPHERE_SCALE_COEFF + 2;
const ORBIT_MAX = ORBIT_MIN + 10;
const RAND_SEED = 898211544;

function seededRandom(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x9e3779b9) | 0;
    let t = a ^ (a >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735a2d97);
    return ((t = t ^ (t >>> 15)) >>> 0) / 4294967296;
  };
}

const rand = seededRandom(RAND_SEED);
function randRange(n = 1) { return rand() * n; }

const { PI, cos, sin } = Math;
const PI2 = PI * 2;

const sizes = new Array(SPHERE_COUNT).fill(0).map(() => randRange(1) * randRange() ** 3);
const thetas = new Array(SPHERE_COUNT).fill(0).map(() => randRange(PI2));
const phis = new Array(SPHERE_COUNT).fill(0).map(() => randRange(PI2));
const orbitRadii = new Array(SPHERE_COUNT).fill(0).map(() =>
  THREE.MathUtils.lerp(ORBIT_MIN, ORBIT_MAX, randRange()),
);
const positions: [number, number, number][] = orbitRadii.map((rad, i) => [
  rad * cos(thetas[i]) * sin(phis[i]),
  rad * sin(thetas[i]) * sin(phis[i]),
  rad * cos(phis[i]),
]);

function getGradientMaterial(
  colorBottomWarm: THREE.Color,
  colorTopWarm: THREE.Color,
  colorBottomCool: THREE.Color,
  colorTopCool: THREE.Color,
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      colorBottomWarm: { value: new THREE.Color().copy(colorBottomWarm) },
      colorTopWarm: { value: new THREE.Color().copy(colorTopWarm) },
      colorBottomCool: { value: new THREE.Color().copy(colorBottomCool) },
      colorTopCool: { value: new THREE.Color().copy(colorTopCool) },
      uTemperature: { value: 0.0 },
      uTemperatureVariancePeriod: { value: new THREE.Vector3(0.08, 0.1, 0.2) },
      uElapsedTime: { value: 0 },
    },
    vertexShader: `
      uniform vec4 uTemperatureVariancePeriod;
      uniform float uTemperature;
      uniform float uElapsedTime;
      varying float topBottomMix;
      varying float warmCoolMix;
      void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        topBottomMix = normal.y;
        warmCoolMix = 0.6 * uTemperature +
          0.4 * (sin(
          (uElapsedTime + gl_Position.x) * uTemperatureVariancePeriod.x +
          (uElapsedTime + gl_Position.y) * uTemperatureVariancePeriod.y +
          (uElapsedTime + gl_Position.z) * uTemperatureVariancePeriod.z) * 0.5 + 0.5);
      }
    `,
    fragmentShader: `
      uniform vec3 colorBottomWarm;
      uniform vec3 colorTopWarm;
      uniform vec3 colorBottomCool;
      uniform vec3 colorTopCool;
      varying float topBottomMix;
      varying float warmCoolMix;
      void main() {
        gl_FragColor = vec4(mix(
          mix(colorTopCool, colorTopWarm, warmCoolMix),
          mix(colorBottomCool, colorBottomWarm, warmCoolMix),
          topBottomMix), 1.0);
      }
    `,
  });
}

export const BubblesBg = ({ blur = 0, children }: BubblesBgProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = canvasContainerRef.current;
    const parent = parentRef.current;
    if (!container || !parent) return;

    const width = parent.clientWidth || 1;
    const height = parent.clientHeight || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 1, 2000);
    camera.position.set(0, 0, 23);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(BG_COLOR_BOTTOM_BLUISH);
    container.appendChild(renderer.domElement);

    const sphereMaterial = getGradientMaterial(
      SPHERE_COLOR_BOTTOM_BLUISH,
      SPHERE_COLOR_TOP_BLUISH,
      SPHERE_COLOR_BOTTOM_ORANGISH,
      SPHERE_COLOR_TOP_ORANGISH,
    );
    sphereMaterial.depthWrite = false;
    sphereMaterial.depthTest = true;

    const bgMaterial = getGradientMaterial(
      BG_COLOR_BOTTOM_BLUISH,
      BG_COLOR_TOP_BLUISH,
      BG_COLOR_BOTTOM_ORANGISH,
      BG_COLOR_TOP_ORANGISH,
    );
    bgMaterial.uniforms.uTemperatureVariancePeriod.value = new THREE.Vector3(0, 0, 0.1);

    const bgGeometry = new THREE.SphereGeometry();
    bgGeometry.scale(-1, 1, 1);
    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
    bgMesh.position.set(0, 0, -1);
    bgMesh.material.depthTest = false;
    bgMesh.renderOrder = -1;

    const distance = camera.position.z;
    const frustumHeight = 2 * distance * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    const frustumWidth = frustumHeight * camera.aspect;
    bgMesh.scale.set(
      frustumWidth / bgGeometry.parameters.radius,
      frustumHeight / bgGeometry.parameters.radius,
      1,
    );
    scene.add(bgMesh);

    const sphereGeometry = new THREE.SphereGeometry(SPHERE_SCALE_COEFF);
    const spheres: THREE.Mesh[] = [];
    for (let i = 0; i < SPHERE_COUNT; i++) {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      const [x, y, z] = positions[i];
      sphere.scale.setScalar(sizes[i]);
      sphere.position.set(x, y, z);
      spheres.push(sphere);
      scene.add(sphere);
    }

    const clock = new THREE.Clock();
    let rafId = 0;

    function animate() {
      rafId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const temperature = Math.sin(elapsed * 0.5) * 0.5 + 0.5;

      bgMaterial.uniforms.uTemperature.value = temperature;
      bgMaterial.uniforms.uElapsedTime.value = elapsed;
      sphereMaterial.uniforms.uTemperature.value = temperature;
      sphereMaterial.uniforms.uElapsedTime.value = elapsed;

      spheres.forEach((sphere, index) => {
        const basePosition = positions[index];
        sphere.position.y = basePosition[1] + Math.sin(elapsed * 0.3 + index) * 2;
      });

      renderer.render(scene, camera);
    }

    function onResize() {
      const w = parent.clientWidth || 1;
      const h = parent.clientHeight || 1;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const dist = camera.position.z;
      const fH = 2 * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
      const fW = fH * camera.aspect;
      bgMesh.scale.set(fW / bgGeometry.parameters.radius, fH / bgGeometry.parameters.radius, 1);
    }

    window.addEventListener("resize", onResize);
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={parentRef} className="relative h-72 w-full overflow-hidden">
      <div ref={canvasContainerRef} className="absolute inset-0" />
      <div
        className="absolute inset-0 z-[2] size-full"
        style={{ backdropFilter: blur > 0 ? `blur(${blur}px)` : undefined }}
      >
        {children}
      </div>
    </div>
  );
};
