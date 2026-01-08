"use client";
import React from "react";
import { WorldMap } from "@/registry/inspira-react/world-map";

export default function WorldMapDemo() {
  return (
    <div className="flex w-full flex-col items-center justify-center bg-white p-8 dark:bg-black">
      <h2 className="mb-2 text-center text-2xl font-bold text-black dark:text-white">
        Global Connections
      </h2>
      <p className="mb-8 text-center text-sm text-neutral-500 dark:text-neutral-400">
        Visualize connections between locations around the world.
      </p>
      <WorldMap
        mapColor="#3b82f6"
        mapBgColor="transparent"
        lineColor="#0EA5E9"
        dots={[
          {
            start: { lat: 40.7128, lng: -74.006, label: "New York" },
            end: { lat: 51.5074, lng: -0.1278, label: "London" },
          },
          {
            start: { lat: 35.6762, lng: 139.6503, label: "Tokyo" },
            end: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
          },
          {
            start: { lat: 48.8566, lng: 2.3522, label: "Paris" },
            end: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
          },
          {
            start: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
            end: { lat: 1.3521, lng: 103.8198, label: "Singapore" },
          },
          {
            start: { lat: -23.5505, lng: -46.6333, label: "São Paulo" },
            end: { lat: 51.5074, lng: -0.1278, label: "London" },
          },
        ]}
      />
    </div>
  );
}
