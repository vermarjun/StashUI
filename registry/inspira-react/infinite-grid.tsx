"use client";

import { useEffect, useMemo, useRef } from "react";
import { InfiniteGridClass } from "@/registry/inspira-react/infinite-grid-helpers/InfiniteGridClass";
import type { CardData, InfiniteGridOptions } from "@/registry/inspira-react/infinite-grid-helpers/types";

export type { CardData, InfiniteGridOptions };

interface InfiniteGridProps {
  cardData: CardData[];
  options?: Partial<InfiniteGridOptions>;
  onTilesLoaded?: () => void;
  onTileClicked?: (detail: unknown) => void;
  className?: string;
}

const DEFAULT_OPTIONS: InfiniteGridOptions = {
  gridCols: 4,
  gridRows: 4,
  gridGap: 0,
  tileSize: 3,
  baseCameraZ: 10,
  enablePostProcessing: true,
  postProcessParams: {
    distortionIntensity: -0.2,
    vignetteOffset: 0.0,
    vignetteDarkness: 0.0,
  },
};

export function InfiniteGrid({
  cardData,
  options,
  onTilesLoaded,
  onTileClicked,
  className,
}: InfiniteGridProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<InfiniteGridClass | null>(null);

  const mergedOptions = useMemo<InfiniteGridOptions>(
    () => ({
      ...DEFAULT_OPTIONS,
      ...options,
      postProcessParams: {
        ...DEFAULT_OPTIONS.postProcessParams,
        ...options?.postProcessParams,
      },
    }),
    [options]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mounted = true;

    const handleTileClicked = (event: Event) => {
      const customEvent = event as CustomEvent;
      onTileClicked?.(customEvent.detail);
    };

    async function init() {
      if (!container || !mounted) return;

      instanceRef.current = new InfiniteGridClass(
        container,
        cardData,
        mergedOptions
      );
      await instanceRef.current.init();

      if (!mounted) {
        instanceRef.current?.dispose();
        return;
      }

      onTilesLoaded?.();
      container.addEventListener("tileClicked", handleTileClicked);
    }

    init();

    return () => {
      mounted = false;
      container.removeEventListener("tileClicked", handleTileClicked);
      if (instanceRef.current) {
        instanceRef.current.dispose();
        instanceRef.current = null;
      }
    };
  }, [cardData, mergedOptions, onTilesLoaded, onTileClicked]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        background: "#000",
      }}
    />
  );
}
