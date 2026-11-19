import React from "react";

const GridBackgroundPreview = () => {
  return (
    <div
      className="relative flex h-full min-h-[40rem] w-full items-center justify-center bg-black"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.18) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    >
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
        Backgrounds
      </p>
    </div>
  );
};

export default GridBackgroundPreview;
