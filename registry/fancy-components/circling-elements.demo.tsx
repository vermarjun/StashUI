"use client"

import CirclingElements from "./circling-elements"

const images = [
  "photo-1506905925346-21bda4d32df4",
  "photo-1548192746-dd526f154ed9",
  "photo-1460999158988-6f0380f81f4d",
  "photo-1517849845537-4d257902454a",
  "photo-1618220649687-ba860f3176e7",
  "photo-1572851899646-a1f69c664e1e",
]

export default function CirclingElementsDemo() {
  return (
    <div className="flex h-[560px] w-full items-center justify-center bg-background">
      <CirclingElements radius={150} duration={10} easing="linear" pauseOnHover>
        {images.map((id, index) => (
          <div
            key={id}
            className="relative h-28 w-28 cursor-pointer overflow-hidden duration-200 ease-out hover:scale-125"
          >
            <img
              src={`https://images.unsplash.com/${id}?w=400&q=80`}
              alt={`Gallery image ${index + 1}`}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </CirclingElements>
    </div>
  )
}
