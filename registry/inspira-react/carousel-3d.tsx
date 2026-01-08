"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// Three.js is loaded dynamically so the component works in SSR environments.
// The actual Three.js + CSS3DRenderer objects live entirely in a ref and are
// never stored in React state, keeping renders fast.

export interface Carousel3DProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Array of image URLs to display as carousel faces. */
  items?: string[];
  /** Card width in px. */
  width?: number;
  /** Card height in px. */
  height?: number;
  containerClassName?: string;
}

/**
 * A draggable 3-D carousel powered by Three.js CSS3DRenderer.
 * Pass an array of image URLs via `items`.
 */
export const Carousel3D = React.forwardRef<HTMLDivElement, Carousel3DProps>(
  (
    {
      className,
      containerClassName,
      items = [],
      width = 450,
      height = 600,
      ...props
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    // Combine external ref with internal one
    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    const stateRef = React.useRef<{
      scene: import("three").Scene;
      camera: import("three").PerspectiveCamera;
      renderer: import("three/addons/renderers/CSS3DRenderer.js").CSS3DRenderer;
      carousel: import("three").Object3D;
      animControls: { stop: () => void } | null;
      isDragging: boolean;
      currentX: number;
    } | null>(null);

    React.useEffect(() => {
      if (!containerRef.current) return;

      let cancelled = false;

      async function init() {
        const THREE = await import("three");
        const { CSS3DObject, CSS3DRenderer } = await import(
          "three/addons/renderers/CSS3DRenderer.js"
        );
        const { animate } = await import("motion/react");

        if (cancelled || !containerRef.current) return;

        const el = containerRef.current;
        const w = el.clientWidth;
        const h = el.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, 1, 1, 5000);
        camera.position.z = 550;
        camera.position.y = 70;

        const renderer = new CSS3DRenderer();
        renderer.setSize(w, h);
        el.appendChild(renderer.domElement);

        const carousel = new THREE.Object3D();
        scene.add(carousel);

        const radius = 750;
        items.forEach((imgUrl, i) => {
          const div = document.createElement("div");
          div.style.width = `${width}px`;
          div.style.height = `${height}px`;
          div.classList.add("rounded-lg");
          div.style.backgroundImage = `url(${imgUrl})`;
          div.style.backgroundSize = "cover";

          const obj = new CSS3DObject(div);
          const angle = (i / items.length) * Math.PI * 2;
          obj.position.setFromSphericalCoords(radius, Math.PI / 2, angle);
          obj.lookAt(carousel.position);
          carousel.add(obj);
        });

        carousel.rotation.x = THREE.MathUtils.degToRad(20);

        function startRotation() {
          const from = carousel.rotation.y;
          const to = from + Math.PI * 2;
          const ctrl = animate(from, to, {
            duration: 20,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            onUpdate: (v) => {
              carousel.rotation.y = v;
              renderer.render(scene, camera);
            },
          });
          stateRef.current!.animControls = ctrl;
        }

        stateRef.current = {
          scene,
          camera,
          renderer,
          carousel,
          animControls: null,
          isDragging: false,
          currentX: 0,
        };

        startRotation();

        function onResize() {
          if (!el) return;
          const nw = el.clientWidth;
          const nh = el.clientHeight;
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();
          renderer.setSize(nw, nh);
        }
        window.addEventListener("resize", onResize);

        return () => {
          window.removeEventListener("resize", onResize);
        };
      }

      let cleanup: (() => void) | void;
      init().then((c) => { cleanup = c; });

      return () => {
        cancelled = true;
        cleanup?.();
        const s = stateRef.current;
        if (s) {
          s.animControls?.stop();
          if (containerRef.current && s.renderer) {
            try { containerRef.current.removeChild(s.renderer.domElement); } catch {}
          }
          stateRef.current = null;
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items, width, height]);

    // ── drag handlers ──────────────────────────────────────────────────────
    const sensitivity = 0.0025;

    function handleDrag(clientX: number) {
      const s = stateRef.current;
      if (!s) return;
      const delta = clientX - s.currentX;
      s.currentX = clientX;
      s.carousel.rotation.y += -delta * sensitivity;
      s.renderer.render(s.scene, s.camera);
    }

    async function startDrag(clientX: number) {
      const s = stateRef.current;
      if (!s) return;
      s.isDragging = true;
      s.currentX = clientX;
      s.animControls?.stop();
      s.animControls = null;
    }

    async function endDrag() {
      const s = stateRef.current;
      if (!s || !s.isDragging) return;
      s.isDragging = false;

      const { animate } = await import("motion/react");
      const from = s.carousel.rotation.y;
      const to = from + Math.PI * 2;
      const ctrl = animate(from, to, {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
        onUpdate: (v) => {
          s.carousel.rotation.y = v;
          s.renderer.render(s.scene, s.camera);
        },
      });
      s.animControls = ctrl;
    }

    return (
      <div
        ref={containerRef}
        className={cn("relative h-[60vh] w-full", containerClassName)}
        {...props}
      >
        {/* Transparent drag surface on top of the Three.js canvas */}
        <div
          className={cn(
            "absolute top-[40%] left-0 z-[100] h-[80%] w-full translate-y-[-50%]",
            className,
          )}
          onMouseDown={(e) => startDrag(e.clientX)}
          onMouseUp={() => endDrag()}
          onMouseLeave={() => endDrag()}
          onMouseMove={(e) => {
            if (stateRef.current?.isDragging) handleDrag(e.clientX);
          }}
          onTouchStart={(e) => startDrag(e.touches[0].clientX)}
          onTouchEnd={() => endDrag()}
          onTouchMove={(e) => {
            e.preventDefault();
            if (stateRef.current?.isDragging) handleDrag(e.touches[0].clientX);
          }}
        />
      </div>
    );
  },
);
Carousel3D.displayName = "Carousel3D";
