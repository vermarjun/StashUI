"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { FXAAShader } from "three/addons/shaders/FXAAShader.js";
import { cn } from "@/lib/utils";

interface PortalParams {
  portalComplexity: number;
  crystalCount: number;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  vortexColor: string;
  rotationSpeed: number;
  bloomStrength: number;
  bloomRadius: number;
  bloomThreshold: number;
  dimensionShift: number;
}

interface CosmicPortalProps extends Partial<PortalParams> {
  className?: string;
  containerClass?: string;
}

export interface CosmicPortalRef {
  activatePortal: () => void;
  shiftDimensions: () => void;
}

export const CosmicPortal = forwardRef<CosmicPortalRef, CosmicPortalProps>(
  function CosmicPortal(
    {
      portalComplexity = 4,
      crystalCount = 12,
      primaryColor = "#9b59b6",
      secondaryColor = "#3498db",
      accentColor = "#e74c3c",
      vortexColor = "#2ecc71",
      rotationSpeed = 0.3,
      bloomStrength = 1.2,
      bloomRadius = 0.7,
      bloomThreshold = 0.2,
      dimensionShift = 4,
      className,
      containerClass,
    },
    ref,
  ) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stateRef = useRef<{
      scene: THREE.Scene;
      camera: THREE.PerspectiveCamera;
      renderer: THREE.WebGLRenderer;
      composer: EffectComposer;
      controls: OrbitControls;
      bloomPass: UnrealBloomPass;
      fxaaPass: ShaderPass;
      clock: THREE.Clock;
      meshes: THREE.Object3D[];
      materials: THREE.Material[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      portalMaterials: any[];
      portalLights: THREE.Light[];
      animationId: number;
      time: number;
      params: PortalParams;
      resizeObserver: ResizeObserver | null;
    } | null>(null);

    useImperativeHandle(ref, () => ({
      activatePortal() {
        const s = stateRef.current;
        if (!s) return;
        s.portalMaterials.forEach((mat) => {
          if (mat.uniforms?.pulseTime) mat.uniforms.pulseTime.value = s.time;
        });
      },
      shiftDimensions() {
        const s = stateRef.current;
        if (!s) return;
        const colors = [
          "#9b59b6", "#3498db", "#e74c3c", "#2ecc71",
          "#f39c12", "#e67e22", "#1abc9c", "#34495e",
        ];
        s.params.primaryColor = colors[Math.floor(Math.random() * colors.length)];
        s.params.secondaryColor = colors[Math.floor(Math.random() * colors.length)];
        s.params.accentColor = colors[Math.floor(Math.random() * colors.length)];
        s.params.vortexColor = colors[Math.floor(Math.random() * colors.length)];
        s.params.dimensionShift = Math.random();
        createPortalScene(s);
      },
    }));

    useEffect(() => {
      if (!canvasRef.current) return;

      const params: PortalParams = {
        portalComplexity, crystalCount, primaryColor, secondaryColor,
        accentColor, vortexColor, rotationSpeed, bloomStrength,
        bloomRadius, bloomThreshold, dimensionShift,
      };

      const canvas = canvasRef.current;
      const container = canvas.parentElement!;
      const width = container.clientWidth || 600;
      const height = container.clientHeight || 400;

      // Scene
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x0a0015);
      scene.fog = new THREE.FogExp2(0x1a0033, 0.001);

      // Camera
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.set(0, 0, 15);

      // Lights
      scene.add(new THREE.AmbientLight(0x330066, 0.2));
      const mainLight = new THREE.DirectionalLight(0xffffff, 0.6);
      mainLight.position.set(10, 10, 5);
      scene.add(mainLight);

      const portalLights: THREE.Light[] = [];
      const lightColors = [params.primaryColor, params.secondaryColor, params.accentColor, params.vortexColor];
      for (let i = 0; i < 6; i++) {
        const light = new THREE.PointLight(new THREE.Color(lightColors[i % 4]), 0.8, 20);
        scene.add(light);
        portalLights.push(light);
      }

      // Renderer
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      // Controls
      const controls = new OrbitControls(camera, canvas);
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.minDistance = 8;
      controls.maxDistance = 40;

      // Post-processing
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(width, height), params.bloomStrength, params.bloomRadius, params.bloomThreshold,
      );
      composer.addPass(bloomPass);

      const fxaaPass = new ShaderPass(FXAAShader);
      const pixelRatio = renderer.getPixelRatio();
      fxaaPass.material.uniforms.resolution.value.set(1 / (width * pixelRatio), 1 / (height * pixelRatio));
      composer.addPass(fxaaPass);

      const clock = new THREE.Clock();

      const s = {
        scene, camera, renderer, composer, controls, bloomPass, fxaaPass,
        clock, meshes: [] as THREE.Object3D[], materials: [] as THREE.Material[],
        portalMaterials: [] as unknown[], portalLights, animationId: 0, time: 0, params,
        resizeObserver: null as ResizeObserver | null,
      };
      stateRef.current = s;

      createPortalScene(s);

      // Resize
      const resizeObserver = new ResizeObserver(() => handleResize(s));
      resizeObserver.observe(container);
      s.resizeObserver = resizeObserver;

      // Animate
      function animate() {
        s.animationId = requestAnimationFrame(animate);
        const delta = s.clock.getDelta();
        s.time = s.clock.getElapsedTime();

        s.portalMaterials.forEach((mat: unknown) => {
          const m = mat as { uniforms?: Record<string, { value: unknown }> };
          if (m.uniforms?.time) m.uniforms.time.value = s.time;
          if (m.uniforms?.dimensionShift) m.uniforms.dimensionShift.value = s.params.dimensionShift;
        });

        s.portalLights.forEach((light, i) => {
          const angle = s.time * 0.3 + (i / 6) * Math.PI * 2;
          const radius = 10 + Math.sin(s.time * 0.5 + i) * 3;
          light.position.x = Math.cos(angle) * radius;
          light.position.z = Math.sin(angle) * radius;
          light.position.y = Math.sin(s.time * 0.4 + i * 0.7) * 5;
        });

        s.meshes.forEach((mesh, i) => {
          if (!mesh.rotation) return;
          const speed = s.params.rotationSpeed;
          mesh.rotation.y += delta * speed * (i % 2 ? -1 : 1) * 0.3;
          mesh.rotation.x += delta * speed * 0.1;

          const pts = (mesh as THREE.Points);
          if (pts.material && (pts.material as THREE.Material).type === "PointsMaterial") {
            const positions = pts.geometry.attributes.position.array as Float32Array;
            for (let j = 0; j < positions.length; j += 3) {
              positions[j] += Math.sin(s.time + j) * 0.001;
              positions[j + 1] += Math.cos(s.time + j) * 0.001;
              positions[j + 2] += Math.sin(s.time * 0.7 + j) * 0.001;
            }
            pts.geometry.attributes.position.needsUpdate = true;
          }
        });

        s.controls.update();
        s.composer.render();
      }
      animate();

      return () => {
        cancelAnimationFrame(s.animationId);
        s.resizeObserver?.disconnect();
        s.meshes.forEach((mesh) => {
          const m = mesh as THREE.Mesh;
          m.geometry?.dispose();
          if (Array.isArray(m.material)) m.material.forEach((mat) => mat.dispose());
          else (m.material as THREE.Material)?.dispose();
        });
        s.materials.forEach((mat) => mat.dispose());
        s.renderer.dispose();
        s.controls.dispose();
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className={cn("relative h-full w-full overflow-hidden", containerClass)}>
        <canvas
          ref={canvasRef}
          className={cn("absolute inset-0 block h-full w-full", className)}
        />
      </div>
    );
  },
);

// ---- Helpers (module-level) ----
type SceneState = NonNullable<ReturnType<typeof useRef<unknown>>["current"]> & {
  scene: THREE.Scene;
  params: {
    primaryColor: string; secondaryColor: string; accentColor: string; vortexColor: string;
    crystalCount: number; rotationSpeed: number; dimensionShift: number;
  };
  meshes: THREE.Object3D[];
  materials: THREE.Material[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  portalMaterials: any[];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function addPortalShader(material: any, portalMaterials: any[], params: SceneState["params"]) {
  material.onBeforeCompile = (shader: { uniforms: Record<string, { value: unknown }>; vertexShader: string; fragmentShader: string }) => {
    shader.uniforms.time = { value: 0 };
    shader.uniforms.pulseTime = { value: -1000 };
    shader.uniforms.portalSpeed = { value: 8.0 };
    shader.uniforms.portalColor = { value: new THREE.Color(params.accentColor) };
    shader.uniforms.dimensionShift = { value: 0 };
    shader.vertexShader = `varying vec3 vWorldPosition;\n${shader.vertexShader}`;
    shader.fragmentShader = `uniform float time;\nuniform float pulseTime;\nuniform float portalSpeed;\nuniform vec3 portalColor;\nuniform float dimensionShift;\nvarying vec3 vWorldPosition;\n${shader.fragmentShader}`;
    shader.vertexShader = shader.vertexShader.replace(
      "#include <begin_vertex>",
      `#include <begin_vertex>\n vWorldPosition = (modelMatrix * vec4(transformed, 1.0)).xyz;`,
    );
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <emissivemap_fragment>",
      `#include <emissivemap_fragment>\nfloat timeSincePortal = time - pulseTime;\nif(timeSincePortal > 0.0 && timeSincePortal < 3.0) {\n  float portalRadius = timeSincePortal * portalSpeed;\n  float currentRadius = length(vWorldPosition);\n  float portalWidth = 1.5;\n  float portalEffect = smoothstep(portalRadius - portalWidth, portalRadius, currentRadius) - smoothstep(portalRadius, portalRadius + portalWidth, currentRadius);\n  vec3 dimensionalColor = mix(portalColor, vec3(1.0, 0.5, 1.0), sin(dimensionShift * 3.14159) * 0.5 + 0.5);\n  totalEmissiveRadiance += dimensionalColor * portalEffect * 4.0;\n}`,
    );
    portalMaterials.push(shader);
  };
}

function createPortalScene(s: SceneState) {
  s.meshes.forEach((mesh) => s.scene.remove(mesh));
  s.materials.forEach((mat) => mat.dispose());
  s.meshes = [];
  s.materials = [];
  s.portalMaterials = [];

  const { scene, params, meshes, materials, portalMaterials } = s;

  // Cosmic background
  const count = 4000;
  const bgGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const r = 80 + Math.random() * 50;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = r * Math.cos(phi);
    const temp = Math.random();
    const color = new THREE.Color();
    if (temp < 0.15) color.setHSL(0.8, 0.8, 0.9);
    else if (temp < 0.4) color.setHSL(0.6, 0.6, 0.8);
    else if (temp < 0.7) color.setHSL(0.1, 0.3, 0.9);
    else color.setHSL(0.3, 0.7, 0.6);
    color.toArray(colors, i3);
  }
  bgGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  bgGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const bgMat = new THREE.PointsMaterial({ size: 0.3, vertexColors: true, sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true });
  const stars = new THREE.Points(bgGeo, bgMat);
  scene.add(stars); meshes.push(stars); materials.push(bgMat);

  // Portal core
  const coreGeo = new THREE.SphereGeometry(0.8, 32, 32);
  const coreMat = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 }, pulseTime: { value: -1000 }, dimensionShift: { value: 0 },
      color1: { value: new THREE.Color(params.primaryColor) },
      color2: { value: new THREE.Color(params.secondaryColor) },
      color3: { value: new THREE.Color(params.accentColor) },
    },
    vertexShader: `uniform float time;uniform float dimensionShift;varying vec3 vPos;varying vec3 vNorm;void main(){vPos=position;vNorm=normal;float warp=sin(position.x*10.0+time*3.0)*0.1;float shift=sin(dimensionShift*6.28318)*0.3;vec3 p=position*(1.0+warp+shift);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}`,
    fragmentShader: `uniform float time;uniform float pulseTime;uniform float dimensionShift;uniform vec3 color1;uniform vec3 color2;uniform vec3 color3;varying vec3 vPos;varying vec3 vNorm;void main(){float noise=sin(vPos.x*20.0+time*4.0)*cos(vPos.z*15.0+time*3.0);vec3 baseColor=mix(color1,color2,0.5+0.5*sin(time*2.0+dimensionShift));vec3 finalColor=mix(baseColor,color3,noise*0.3);float fresnel=pow(1.0-abs(dot(vNorm,normalize(cameraPosition-vPos))),3.0);finalColor=mix(finalColor,vec3(1.0),fresnel*0.5);float timeSincePortal=time-pulseTime;if(timeSincePortal>0.0&&timeSincePortal<1.0){float burst=1.0-timeSincePortal;finalColor+=vec3(1.0)*burst*3.0;}gl_FragColor=vec4(finalColor,0.9);}`,
    transparent: true,
  });
  portalMaterials.push(coreMat);
  const core = new THREE.Mesh(coreGeo, coreMat);
  scene.add(core); meshes.push(core);

  // Vortex rings
  const ringColors = [params.primaryColor, params.secondaryColor, params.accentColor, params.vortexColor];
  for (let ring = 0; ring < 5; ring++) {
    const rGeo = new THREE.TorusGeometry(2 + ring * 0.8, 0.05, 16, 64);
    const rMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(ringColors[ring % 4]), transparent: true, opacity: 0.7, metalness: 0.8, roughness: 0.2, clearcoat: 0.8, clearcoatRoughness: 0.1, emissive: new THREE.Color(ringColors[ring % 4]).multiplyScalar(0.2) });
    addPortalShader(rMat, portalMaterials, params);
    const rMesh = new THREE.Mesh(rGeo, rMat);
    rMesh.rotation.x = Math.PI * 0.1 * ring;
    rMesh.rotation.z = Math.PI * 0.15 * ring;
    scene.add(rMesh); meshes.push(rMesh);
  }

  // Floating crystals
  const crystalColors = [params.accentColor, params.vortexColor, params.primaryColor, params.secondaryColor];
  for (let i = 0; i < params.crystalCount; i++) {
    const cGeo = new THREE.OctahedronGeometry(0.3 + Math.random() * 0.4, 1);
    const cMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(crystalColors[i % 4]), transparent: true, opacity: 0.8, metalness: 0.9, roughness: 0.1, clearcoat: 1.0, clearcoatRoughness: 0.0, emissive: new THREE.Color(crystalColors[i % 4]).multiplyScalar(0.3) });
    addPortalShader(cMat, portalMaterials, params);
    const cMesh = new THREE.Mesh(cGeo, cMat);
    const angle = (i / params.crystalCount) * Math.PI * 2;
    const radius = 6 + Math.random() * 4;
    cMesh.position.set(Math.cos(angle) * radius, (Math.random() - 0.5) * 8, Math.sin(angle) * radius);
    cMesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    scene.add(cMesh); meshes.push(cMesh);
  }

  // Portal frame
  const frameGeo = new THREE.TorusGeometry(7, 0.2, 16, 64);
  const frameMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(params.primaryColor), transparent: true, opacity: 0.4, metalness: 1.0, roughness: 0.1, clearcoat: 1.0, clearcoatRoughness: 0.0, emissive: new THREE.Color(params.primaryColor).multiplyScalar(0.5) });
  addPortalShader(frameMat, portalMaterials, params);
  const frame = new THREE.Mesh(frameGeo, frameMat);
  scene.add(frame); meshes.push(frame);

  // Energy particles
  const pCount = 1500;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount; i++) {
    const r = 2 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pPos[i * 3 + 2] = r * Math.cos(phi);
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.08, color: params.vortexColor, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.8 });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles); meshes.push(particles); materials.push(pMat);
}

function handleResize(s: {
  camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer; composer: EffectComposer; fxaaPass: ShaderPass;
}) {
  const canvas = s.renderer.domElement;
  const container = canvas.parentElement;
  if (!container) return;
  const width = container.clientWidth;
  const height = container.clientHeight;
  s.camera.aspect = width / height;
  s.camera.updateProjectionMatrix();
  s.renderer.setSize(width, height);
  s.composer.setSize(width, height);
  const pixelRatio = s.renderer.getPixelRatio();
  s.fxaaPass.material.uniforms.resolution.value.set(1 / (width * pixelRatio), 1 / (height * pixelRatio));
}
